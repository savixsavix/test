// ─── Stan aplikacji ───────────────────────────────────────────────────────────

let currentFilters = { type: '', dateFrom: '', dateTo: '' };
let currentSort    = { field: 'date', direction: 'desc' };

// ─── Przełączanie widoków ─────────────────────────────────────────────────────

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  if (viewId === 'view-list')  renderList();
  if (viewId === 'view-stats') renderStats();
}

// ─── Formularz – otwieranie ───────────────────────────────────────────────────

function openAddForm() {
  document.getElementById('form-id').value = '';
  document.getElementById('form-title').textContent = 'Dodaj aktywność';
  document.getElementById('activity-form').reset();
  document.getElementById('field-duration').value = '0';
  document.getElementById('field-distance').value = '0';
  clearFormErrors();
  showView('view-form');
}

function openEditForm(id) {
  const entry = getEntryById(id);
  if (!entry) return;

  document.getElementById('form-id').value       = entry.id;
  document.getElementById('form-title').textContent = 'Edytuj aktywność';
  document.getElementById('field-date').value     = entry.date;
  document.getElementById('field-type').value     = entry.type;
  document.getElementById('field-title').value    = entry.title;
  document.getElementById('field-duration').value = entry.duration;
  document.getElementById('field-distance').value = entry.distance;
  document.getElementById('field-notes').value    = entry.notes;
  clearFormErrors();
  showView('view-form');
}

// ─── Formularz – walidacja ────────────────────────────────────────────────────

const FORM_FIELDS = [
  {
    id:    'field-title',
    check: v => v.trim() !== '',
    msg:   'Tytuł jest wymagany',
  },
  {
    id:    'field-date',
    check: v => v !== '' && !isNaN(Date.parse(v)),
    msg:   'Podaj poprawną datę',
  },
  {
    id:    'field-type',
    check: v => v.trim() !== '',
    msg:   'Typ aktywności jest wymagany',
  },
  {
    id:    'field-duration',
    check: v => v !== '' && Number(v) >= 0,
    msg:   'Czas musi być liczbą ≥ 0',
  },
  {
    id:    'field-distance',
    check: v => v !== '' && Number(v) >= 0,
    msg:   'Dystans musi być liczbą ≥ 0',
  },
];

function validateForm() {
  clearFormErrors();
  let valid = true;
  for (const field of FORM_FIELDS) {
    const el = document.getElementById(field.id);
    if (!field.check(el.value)) {
      showFieldError(el, field.msg);
      valid = false;
    }
  }
  return valid;
}

function showFieldError(el, msg) {
  el.classList.add('field-error');
  const errEl = el.nextElementSibling;
  if (errEl && errEl.classList.contains('error-msg')) {
    errEl.textContent    = msg;
    errEl.style.display  = 'block';
  }
}

function clearFieldError(el) {
  el.classList.remove('field-error', 'field-valid');
  const errEl = el.nextElementSibling;
  if (errEl && errEl.classList.contains('error-msg')) {
    errEl.textContent   = '';
    errEl.style.display = 'none';
  }
}

function clearFormErrors() {
  FORM_FIELDS.forEach(f => clearFieldError(document.getElementById(f.id)));
}

// ─── Formularz – zapis ────────────────────────────────────────────────────────

function handleFormSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const id   = document.getElementById('form-id').value;
  const data = {
    date:     document.getElementById('field-date').value,
    type:     document.getElementById('field-type').value.trim(),
    title:    document.getElementById('field-title').value.trim(),
    duration: document.getElementById('field-duration').value,
    distance: document.getElementById('field-distance').value,
    notes:    document.getElementById('field-notes').value,
  };

  if (id) {
    updateEntry(id, data);
  } else {
    addEntry(data);
  }

  showView('view-list');
}

// ─── Lista – renderowanie ─────────────────────────────────────────────────────

function renderList() {
  let entries = loadEntries();
  entries = filterEntries(entries, currentFilters);
  entries = sortEntries(entries, currentSort.field, currentSort.direction);

  const container = document.getElementById('entries-container');
  container.innerHTML = '';

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-msg">Brak aktywności. Dodaj pierwszą!</p>';
    return;
  }

  entries.forEach(entry => container.appendChild(createEntryCard(entry)));
}

function createEntryCard(entry) {
  const card = document.createElement('div');
  card.className  = 'entry-card';
  card.dataset.id = entry.id;
  card.setAttribute('role', 'listitem');

  const distanceHtml = entry.distance > 0
    ? `<span>${entry.distance} km</span>`
    : '';
  const notesHtml = entry.notes
    ? `<div class="entry-notes">${escapeHtml(entry.notes)}</div>`
    : '';

  card.innerHTML = `
    <div class="entry-header">
      <span class="entry-date">${escapeHtml(entry.date)}</span>
      <span class="entry-type">${escapeHtml(entry.type)}</span>
    </div>
    <div class="entry-title">${escapeHtml(entry.title)}</div>
    <div class="entry-meta">
      <span>${entry.duration} min</span>
      ${distanceHtml}
    </div>
    ${notesHtml}
    <div class="entry-actions">
      <button class="btn btn-edit"   data-id="${escapeHtml(entry.id)}">Edytuj</button>
      <button class="btn btn-delete" data-id="${escapeHtml(entry.id)}">Usuń</button>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

// ─── Usuwanie ─────────────────────────────────────────────────────────────────

function handleDelete(id) {
  const modal = document.getElementById('confirm-delete');
  modal.dataset.pendingId = id;
  modal.classList.add('active');
}

// ─── Filtrowanie ──────────────────────────────────────────────────────────────

function filterEntries(entries, filters) {
  return entries.filter(entry => {
    if (filters.type && !entry.type.toLowerCase().includes(filters.type.toLowerCase())) return false;
    if (filters.dateFrom && entry.date < filters.dateFrom) return false;
    if (filters.dateTo   && entry.date > filters.dateTo)   return false;
    return true;
  });
}

// ─── Sortowanie ───────────────────────────────────────────────────────────────

function sortEntries(entries, field, direction) {
  return [...entries].sort((a, b) => {
    let va = a[field];
    let vb = b[field];
    if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
    if (va < vb) return direction === 'asc' ? -1 : 1;
    if (va > vb) return direction === 'asc' ?  1 : -1;
    return 0;
  });
}

// ─── Statystyki ───────────────────────────────────────────────────────────────

function renderStats() {
  const entries = loadEntries();

  document.getElementById('stat-count').textContent = entries.length;

  const totalMin = entries.reduce((sum, e) => sum + e.duration, 0);
  const hours    = Math.floor(totalMin / 60);
  const mins     = totalMin % 60;
  document.getElementById('stat-duration').textContent =
    hours > 0 ? `${hours}h ${mins}min` : `${totalMin}min`;

  const totalKm = entries.reduce((sum, e) => sum + e.distance, 0);
  document.getElementById('stat-distance').textContent = `${totalKm.toFixed(1)} km`;

  if (entries.length === 0) {
    document.getElementById('stat-top-type').textContent = '–';
  } else {
    const counts = {};
    entries.forEach(e => { counts[e.type] = (counts[e.type] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    document.getElementById('stat-top-type').textContent = top;
  }
}

// ─── Eksport JSON ─────────────────────────────────────────────────────────────

function exportJSON() {
  const entries = loadEntries();
  const blob    = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = `activity-tracker-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Import JSON ──────────────────────────────────────────────────────────────

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!validateImportData(data)) {
        showImportError('Nieprawidłowa struktura pliku – brakuje wymaganych pól.');
        return;
      }
      showImportModal(data);
    } catch {
      showImportError('Nie można odczytać pliku – nieprawidłowy JSON.');
    }
  };
  reader.readAsText(file);
}

function validateImportData(data) {
  if (!Array.isArray(data)) return false;
  const required = ['id', 'date', 'type', 'title', 'duration', 'distance', 'notes', 'createdAt', 'updatedAt'];
  return data.every(entry => required.every(f => f in entry));
}

function showImportError(msg) {
  const el = document.getElementById('import-error');
  el.textContent  = msg;
  el.style.display = 'block';
}

function showImportModal(data) {
  const modal = document.getElementById('confirm-import');
  modal.dataset.pendingImport = JSON.stringify(data);
  modal.classList.add('active');
}

// ─── Inicjalizacja zdarzeń ────────────────────────────────────────────────────

function initEvents() {
  // Nawigacja
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  // Formularz
  document.getElementById('activity-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('btn-cancel').addEventListener('click', () => showView('view-list'));

  // Czyszczenie błędów przy edycji pola
  FORM_FIELDS.forEach(({ id }) => {
    document.getElementById(id).addEventListener('input', function () {
      clearFieldError(this);
    });
  });

  // Dodaj aktywność
  document.getElementById('btn-add').addEventListener('click', openAddForm);

  // Delegacja kliknięć na liście (Edytuj / Usuń)
  document.getElementById('entries-container').addEventListener('click', e => {
    const editBtn   = e.target.closest('.btn-edit');
    const deleteBtn = e.target.closest('.btn-delete');
    if (editBtn)   openEditForm(editBtn.dataset.id);
    if (deleteBtn) handleDelete(deleteBtn.dataset.id);
  });

  // Modal: potwierdzenie usunięcia
  document.getElementById('confirm-delete-yes').addEventListener('click', () => {
    const modal = document.getElementById('confirm-delete');
    deleteEntry(modal.dataset.pendingId);
    modal.classList.remove('active');
    renderList();
  });
  document.getElementById('confirm-delete-no').addEventListener('click', () => {
    document.getElementById('confirm-delete').classList.remove('active');
  });

  // Filtry
  document.getElementById('filter-type').addEventListener('input',      applyFilters);
  document.getElementById('filter-date-from').addEventListener('input', applyFilters);
  document.getElementById('filter-date-to').addEventListener('input',   applyFilters);
  document.getElementById('filter-reset').addEventListener('click',     resetFilters);

  // Sortowanie
  document.getElementById('sort-field').addEventListener('change',     applySort);
  document.getElementById('sort-direction').addEventListener('change', applySort);

  // Eksport
  document.getElementById('btn-export').addEventListener('click', exportJSON);

  // Import
  document.getElementById('btn-import-file').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });
  document.getElementById('import-file-input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('import-error').style.display = 'none';
      importJSON(file);
    }
    e.target.value = '';
  });

  // Modal: potwierdzenie importu
  document.getElementById('confirm-import-replace').addEventListener('click', () => {
    const modal = document.getElementById('confirm-import');
    saveEntries(JSON.parse(modal.dataset.pendingImport || '[]'));
    modal.classList.remove('active');
    showView('view-list');
  });
  document.getElementById('confirm-import-merge').addEventListener('click', () => {
    const modal      = document.getElementById('confirm-import');
    const incoming   = JSON.parse(modal.dataset.pendingImport || '[]');
    const existing   = loadEntries();
    const existingIds = new Set(existing.map(e => e.id));
    saveEntries([...existing, ...incoming.filter(e => !existingIds.has(e.id))]);
    modal.classList.remove('active');
    showView('view-list');
  });
  document.getElementById('confirm-import-cancel').addEventListener('click', () => {
    document.getElementById('confirm-import').classList.remove('active');
  });
}

function applyFilters() {
  currentFilters = {
    type:     document.getElementById('filter-type').value.trim(),
    dateFrom: document.getElementById('filter-date-from').value,
    dateTo:   document.getElementById('filter-date-to').value,
  };
  renderList();
}

function resetFilters() {
  document.getElementById('filter-type').value      = '';
  document.getElementById('filter-date-from').value = '';
  document.getElementById('filter-date-to').value   = '';
  currentFilters = { type: '', dateFrom: '', dateTo: '' };
  renderList();
}

function applySort() {
  currentSort = {
    field:     document.getElementById('sort-field').value,
    direction: document.getElementById('sort-direction').value,
  };
  renderList();
}

// ─── Start ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  showView('view-list');
});
