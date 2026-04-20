# TODO – Activity Tracker

Lista zadań do wykonania w celu zbudowania aplikacji. Zadania ułożone w kolejności implementacji.

---

## 1. Inicjalizacja projektu

- [ ] Utworzyć strukturę katalogów: `activity-tracker/`, `css/`, `js/`, `assets/`
- [ ] Utworzyć pusty plik `index.html` z podstawowym szkieletem HTML5
- [ ] Utworzyć plik `css/style.css` i podłączyć go w `index.html`
- [ ] Utworzyć plik `js/storage.js` (warstwa danych)
- [ ] Utworzyć plik `js/app.js` (logika widoku i zdarzenia)
- [ ] Podłączyć skrypty JS w `index.html`

---

## 2. Warstwa danych (`js/storage.js`)

- [ ] Zaimplementować `loadEntries()` – odczyt z `localStorage` z obsługą błędów (fallback `[]`)
- [ ] Zaimplementować `saveEntries(entries)` – zapis tablicy do `localStorage`
- [ ] Zaimplementować `addEntry(data)` – tworzenie wpisu z `id` (`crypto.randomUUID()`), `createdAt`, `updatedAt`
- [ ] Zaimplementować `updateEntry(id, data)` – aktualizacja pól wpisu + `updatedAt`
- [ ] Zaimplementować `deleteEntry(id)` – usunięcie wpisu po `id`
- [ ] Zaimplementować `getEntryById(id)` – pobranie pojedynczego wpisu

---

## 3. Struktura HTML (`index.html`)

- [ ] Dodać sekcję nawigacji (przełączanie widoków: Lista / Dodaj / Statystyki)
- [ ] Dodać sekcję listy aktywności (`#view-list`)
- [ ] Dodać sekcję formularza dodawania/edycji (`#view-form`)
- [ ] Dodać sekcję statystyk (`#view-stats`)
- [ ] Dodać modal lub sekcję potwierdzenia importu (`#confirm-import`)
- [ ] Upewnić się, że wszystkie sekcje widoków są w jednym pliku HTML

---

## 4. Formularz dodawania i edycji

- [ ] Dodać pole `date` (input type="date", wymagane)
- [ ] Dodać pole `type` (input text lub select, wymagane)
- [ ] Dodać pole `title` (input text, wymagane)
- [ ] Dodać pole `duration` (input number, min="0")
- [ ] Dodać pole `distance` (input number, min="0", step="0.1")
- [ ] Dodać pole `notes` (textarea, opcjonalne)
- [ ] Dodać przycisk „Zapisz" i przycisk „Anuluj"
- [ ] Dodać ukryte pole `id` do obsługi trybu edycji

---

## 5. Walidacja formularza

- [ ] Walidować `title` – wymagany, niepusty
- [ ] Walidować `date` – wymagany, poprawny format daty
- [ ] Walidować `type` – wymagany, niepusty
- [ ] Walidować `duration` – liczba >= 0
- [ ] Walidować `distance` – liczba >= 0
- [ ] Wyświetlać komunikaty błędów przy polach (nie `alert()`)
- [ ] Podświetlać błędne pola (klasa CSS np. `.field-error`)
- [ ] Czyścić błędy po poprawieniu pola

---

## 6. Logika CRUD (`js/app.js`)

- [ ] Zaimplementować `handleFormSubmit()` – odczyt pól, walidacja, zapis lub aktualizacja
- [ ] Zaimplementować `openAddForm()` – czyszczenie formularza, przełączenie widoku
- [ ] Zaimplementować `openEditForm(id)` – wypełnienie formularza danymi wpisu, przełączenie widoku
- [ ] Zaimplementować `handleDelete(id)` – usunięcie z potwierdzeniem (własny UI, bez `confirm()`)
- [ ] Zaimplementować `renderList(entries)` – generowanie listy wpisów w DOM
- [ ] Zaimplementować przełączanie widoków `showView(viewId)`

---

## 7. Lista aktywności

- [ ] Renderować wpisy jako karty lub wiersze tabeli
- [ ] Pokazywać dla każdego wpisu: datę, typ, tytuł, czas, dystans
- [ ] Dodać przyciski „Edytuj" i „Usuń" przy każdym wpisie
- [ ] Obsłużyć stan pustej listy (komunikat „Brak aktywności")
- [ ] Odświeżać listę po każdej operacji CRUD

---

## 8. Filtrowanie i sortowanie

- [ ] Dodać kontrolkę filtrowania po `type`
- [ ] Dodać kontrolki filtrowania po zakresie dat (od / do)
- [ ] Dodać kontrolkę sortowania po: `date`, `duration`, `distance`
- [ ] Dodać przełącznik kierunku sortowania (rosnąco / malejąco)
- [ ] Zaimplementować `filterEntries(entries, filters)` – operacja na tablicy w pamięci
- [ ] Zaimplementować `sortEntries(entries, field, direction)` – operacja na tablicy w pamięci
- [ ] Dodać przycisk „Resetuj filtry"

---

## 9. Statystyki

- [ ] Wyświetlać łączną liczbę aktywności
- [ ] Wyświetlać sumę czasu (suma pola `duration`) w minutach lub godzinach
- [ ] Wyświetlać sumę dystansu (suma pola `distance`) w km
- [ ] Wyświetlać najczęściej występujący typ aktywności
- [ ] Przeliczać statystyki na żywo przy każdej zmianie danych

---

## 10. Eksport i import JSON

- [ ] Zaimplementować `exportJSON()` – serializacja tablicy, pobranie pliku przez `<a download>`
- [ ] Zaimplementować `importJSON(file)` – odczyt przez `FileReader`, parsowanie JSON
- [ ] Walidować strukturę importowanego pliku (sprawdzić obecność wymaganych pól)
- [ ] Pokazać modal potwierdzenia z wyborem: „Zastąp dane" lub „Scal z istniejącymi"
- [ ] Obsłużyć błąd nieprawidłowego pliku (komunikat w UI)

---

## 11. Stylowanie (`css/style.css`)

- [ ] Zdefiniować zmienne CSS (kolory, fonty, spacing)
- [ ] Ostylować nawigację i przełączanie widoków
- [ ] Ostylować formularz i stany walidacji (`.field-error`, `.field-valid`)
- [ ] Ostylować listę aktywności (karty lub tabela)
- [ ] Ostylować sekcję statystyk
- [ ] Ostylować modal potwierdzenia
- [ ] Zaimplementować responsywność (mobile-first, breakpoint ~768px)
- [ ] Sprawdzić czytelność na małych ekranach (telefon)

---

## 12. Wdrożenie na GitHub Pages

- [ ] Upewnić się, że `index.html` jest w głównym katalogu repozytorium lub w folderze `docs/`
- [ ] Włączyć GitHub Pages w ustawieniach repozytorium
- [ ] Zweryfikować działanie aplikacji pod publicznym URL

---

## 13. Testy manualne

- [ ] Dodanie nowej aktywności – poprawny zapis w `localStorage`
- [ ] Edycja istniejącego wpisu – aktualizacja `updatedAt`
- [ ] Usunięcie wpisu – potwierdzenie i znikanie z listy
- [ ] Walidacja – każde wymagane pole zgłasza błąd gdy puste
- [ ] Filtrowanie po typie i zakresie dat
- [ ] Sortowanie rosnąco i malejąco po każdym polu
- [ ] Poprawność statystyk po dodaniu/usunięciu wpisów
- [ ] Eksport – pobranie pliku `.json` z poprawnymi danymi
- [ ] Import – zastąpienie i scalenie danych
- [ ] Import błędnego pliku – komunikat błędu w UI
- [ ] Responsywność – weryfikacja na szerokości < 480px
- [ ] Działanie po odświeżeniu strony (dane w `localStorage` zachowane)
