const STORAGE_KEY = 'activityTrackerEntries';

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function addEntry(data) {
  const entries = loadEntries();
  const now = new Date().toISOString();
  const entry = {
    id: crypto.randomUUID(),
    date: data.date,
    type: data.type,
    title: data.title,
    duration: Number(data.duration),
    distance: Number(data.distance),
    notes: data.notes || '',
    createdAt: now,
    updatedAt: now,
  };
  entries.push(entry);
  saveEntries(entries);
  return entry;
}

function updateEntry(id, data) {
  const entries = loadEntries();
  const index = entries.findIndex(e => e.id === id);
  if (index === -1) return null;
  entries[index] = {
    ...entries[index],
    date: data.date,
    type: data.type,
    title: data.title,
    duration: Number(data.duration),
    distance: Number(data.distance),
    notes: data.notes || '',
    updatedAt: new Date().toISOString(),
  };
  saveEntries(entries);
  return entries[index];
}

function deleteEntry(id) {
  saveEntries(loadEntries().filter(e => e.id !== id));
}

function getEntryById(id) {
  return loadEntries().find(e => e.id === id) || null;
}
