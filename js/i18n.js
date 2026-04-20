const TRANSLATIONS = {
  pl: {
    // nawigacja
    'nav.list':  'Lista',
    'nav.stats': 'Statystyki',
    // toolbar
    'btn.add':    '+ Dodaj aktywność',
    'btn.export': 'Eksportuj JSON',
    'btn.import': 'Importuj JSON',
    // filtry
    'filter.type':             'Typ aktywności',
    'filter.type.placeholder': 'np. bieg',
    'filter.dateFrom':         'Data od',
    'filter.dateTo':           'Data do',
    'filter.sortBy':           'Sortuj po',
    'filter.direction':        'Kierunek',
    'filter.reset':            'Resetuj filtry',
    // opcje sortowania
    'sort.date':     'Data',
    'sort.duration': 'Czas',
    'sort.distance': 'Dystans',
    'sort.asc':      'Rosnąco',
    'sort.desc':     'Malejąco',
    // formularz
    'form.addTitle':           'Dodaj aktywność',
    'form.editTitle':          'Edytuj aktywność',
    'field.date':              'Data *',
    'field.type':              'Typ aktywności *',
    'field.type.placeholder':  'np. bieg, rower, siłownia',
    'field.title':             'Tytuł *',
    'field.title.placeholder': 'Krótki opis aktywności',
    'field.duration':          'Czas (minuty) *',
    'field.distance':          'Dystans (km)',
    'field.notes':             'Notatki',
    'field.notes.placeholder': 'Opcjonalne uwagi...',
    'btn.save':   'Zapisz',
    'btn.cancel': 'Anuluj',
    // walidacja
    'err.title':    'Tytuł jest wymagany',
    'err.date':     'Podaj poprawną datę',
    'err.type':     'Typ aktywności jest wymagany',
    'err.duration': 'Czas musi być liczbą ≥ 0',
    'err.distance': 'Dystans musi być liczbą ≥ 0',
    // lista
    'list.empty':   'Brak aktywności. Dodaj pierwszą!',
    'entry.edit':   'Edytuj',
    'entry.delete': 'Usuń',
    'entry.min':    'min',
    'entry.km':     'km',
    // statystyki
    'stats.title':    'Statystyki',
    'stats.count':    'Aktywności',
    'stats.duration': 'Łączny czas',
    'stats.distance': 'Łączny dystans',
    'stats.topType':  'Najczęstszy typ',
    'stats.none':     '–',
    // modals
    'modal.deleteTitle':   'Czy na pewno chcesz usunąć tę aktywność?',
    'modal.deleteYes':     'Usuń',
    'modal.deleteNo':      'Anuluj',
    'modal.importTitle':   'Jak chcesz zaimportować dane?',
    'modal.importSub':     '<strong>Zastąp</strong> – usuwa obecne dane i wczytuje nowe.<br><strong>Scal</strong> – dodaje nowe wpisy do istniejących (pomija duplikaty wg ID).',
    'modal.importReplace': 'Zastąp dane',
    'modal.importMerge':   'Scal z istniejącymi',
    'modal.importCancel':  'Anuluj',
    // błędy importu
    'import.errStructure': 'Nieprawidłowa struktura pliku – brakuje wymaganych pól.',
    'import.errJson':      'Nie można odczytać pliku – nieprawidłowy JSON.',
    // przełącznik języka
    'lang.toggle': 'EN',
  },

  en: {
    // navigation
    'nav.list':  'List',
    'nav.stats': 'Statistics',
    // toolbar
    'btn.add':    '+ Add activity',
    'btn.export': 'Export JSON',
    'btn.import': 'Import JSON',
    // filters
    'filter.type':             'Activity type',
    'filter.type.placeholder': 'e.g. run',
    'filter.dateFrom':         'Date from',
    'filter.dateTo':           'Date to',
    'filter.sortBy':           'Sort by',
    'filter.direction':        'Direction',
    'filter.reset':            'Reset filters',
    // sort options
    'sort.date':     'Date',
    'sort.duration': 'Duration',
    'sort.distance': 'Distance',
    'sort.asc':      'Ascending',
    'sort.desc':     'Descending',
    // form
    'form.addTitle':           'Add activity',
    'form.editTitle':          'Edit activity',
    'field.date':              'Date *',
    'field.type':              'Activity type *',
    'field.type.placeholder':  'e.g. run, cycling, gym',
    'field.title':             'Title *',
    'field.title.placeholder': 'Short activity description',
    'field.duration':          'Duration (minutes) *',
    'field.distance':          'Distance (km)',
    'field.notes':             'Notes',
    'field.notes.placeholder': 'Optional remarks...',
    'btn.save':   'Save',
    'btn.cancel': 'Cancel',
    // validation
    'err.title':    'Title is required',
    'err.date':     'Enter a valid date',
    'err.type':     'Activity type is required',
    'err.duration': 'Duration must be a number ≥ 0',
    'err.distance': 'Distance must be a number ≥ 0',
    // list
    'list.empty':   'No activities yet. Add your first one!',
    'entry.edit':   'Edit',
    'entry.delete': 'Delete',
    'entry.min':    'min',
    'entry.km':     'km',
    // stats
    'stats.title':    'Statistics',
    'stats.count':    'Activities',
    'stats.duration': 'Total duration',
    'stats.distance': 'Total distance',
    'stats.topType':  'Most frequent type',
    'stats.none':     '–',
    // modals
    'modal.deleteTitle':   'Are you sure you want to delete this activity?',
    'modal.deleteYes':     'Delete',
    'modal.deleteNo':      'Cancel',
    'modal.importTitle':   'How do you want to import the data?',
    'modal.importSub':     '<strong>Replace</strong> – removes current data and loads new.<br><strong>Merge</strong> – adds new entries to existing ones (skips duplicates by ID).',
    'modal.importReplace': 'Replace data',
    'modal.importMerge':   'Merge with existing',
    'modal.importCancel':  'Cancel',
    // import errors
    'import.errStructure': 'Invalid file structure – required fields are missing.',
    'import.errJson':      'Cannot read file – invalid JSON.',
    // language toggle
    'lang.toggle': 'PL',
  },
};

let currentLang = localStorage.getItem('activityTrackerLang') || 'pl';

function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.pl)[key] ?? key;
}

function toggleLanguage() {
  currentLang = currentLang === 'pl' ? 'en' : 'pl';
  localStorage.setItem('activityTrackerLang', currentLang);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Opcje select – zachowujemy value, tłumaczymy etykietę
  const sortField = document.getElementById('sort-field');
  if (sortField) {
    [...sortField.options].forEach(opt => { opt.textContent = t(`sort.${opt.value}`); });
  }
  const sortDir = document.getElementById('sort-direction');
  if (sortDir) {
    [...sortDir.options].forEach(opt => { opt.textContent = t(`sort.${opt.value}`); });
  }

  // Przycisk języka
  const btnLang = document.getElementById('btn-lang');
  if (btnLang) btnLang.textContent = t('lang.toggle');

  // Tytuł formularza (dynamiczny – re-tłumacz gdy formularz jest aktywny)
  const formView = document.getElementById('view-form');
  if (formView && formView.classList.contains('active')) {
    const hasId = document.getElementById('form-id').value;
    document.getElementById('form-title').textContent =
      hasId ? t('form.editTitle') : t('form.addTitle');
  }

  // Przerenderuj aktywny widok (dynamiczne treści)
  const activeView = document.querySelector('.view.active');
  if (activeView) {
    if (activeView.id === 'view-list')  renderList();
    if (activeView.id === 'view-stats') renderStats();
  }
}
