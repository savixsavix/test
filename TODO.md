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

---

## Plan sesji agenta

Podział zadań na sesje zoptymalizowany pod kątem spójności kontekstu, minimalnej liczby zależności między sesjami i możliwości weryfikacji wyniku na końcu każdej sesji.

---

### Sesja 1 – Fundament: struktura projektu i warstwa danych

**Zakres:** grupy zadań 1 i 2
**Cel:** działający szkielet plików + kompletna logika `localStorage`

Zadania:
- Inicjalizacja struktury katalogów i plików
- Implementacja całego `js/storage.js` (loadEntries, saveEntries, addEntry, updateEntry, deleteEntry, getEntryById)

**Weryfikacja po sesji:** w konsoli przeglądarki można wywołać `addEntry({...})`, `loadEntries()`, `deleteEntry(id)` i zobaczyć poprawne dane w `localStorage`.

**Kontekst do przekazania następnej sesji:** gotowy `js/storage.js` z wyeksportowanymi funkcjami.

---

### Sesja 2 – Szkielet HTML i nawigacja między widokami

**Zakres:** grupy zadań 3 i fragment 6 (`showView`)
**Cel:** kompletna struktura HTML + działające przełączanie sekcji

Zadania:
- Budowa `index.html`: nawigacja, sekcje `#view-list`, `#view-form`, `#view-stats`, `#confirm-import`
- Implementacja `showView(viewId)` w `js/app.js`
- Podłączenie nawigacji do `showView`

**Weryfikacja po sesji:** kliknięcie w nawigacji przełącza widoczną sekcję, pozostałe są ukryte.

**Kontekst do przekazania następnej sesji:** gotowy `index.html` z ID wszystkich sekcji i `showView`.

---

### Sesja 3 – Formularz, walidacja i operacja Create

**Zakres:** grupy zadań 4, 5 i fragment 6 (`handleFormSubmit`, `openAddForm`)
**Cel:** można dodać pierwszą aktywność i zobaczyć ją w `localStorage`

Zadania:
- Dodanie wszystkich pól formularza w HTML
- Implementacja walidacji per-pole z komunikatami w UI
- Implementacja `openAddForm()` i `handleFormSubmit()` (tylko ścieżka Create)

**Weryfikacja po sesji:** wypełnienie i wysłanie formularza zapisuje wpis w `localStorage`; puste wymagane pola blokują zapis i pokazują błędy przy polach.

**Kontekst do przekazania następnej sesji:** działający formularz Add + walidacja.

---

### Sesja 4 – Lista, edycja i usuwanie

**Zakres:** grupy zadań 7 i pozostała część 6 (`renderList`, `openEditForm`, `handleDelete`)
**Cel:** pełny cykl CRUD widoczny w UI

Zadania:
- Implementacja `renderList(entries)` – generowanie kart/wierszy w DOM
- Obsługa stanu pustej listy
- Implementacja `openEditForm(id)` – prefill formularza, ścieżka Update w `handleFormSubmit`
- Implementacja `handleDelete(id)` z własnym UI potwierdzenia (bez `confirm()`)
- Odświeżanie listy po każdej operacji

**Weryfikacja po sesji:** dodawanie, edycja i usuwanie wpisów działa end-to-end; lista odświeża się natychmiast.

**Kontekst do przekazania następnej sesji:** działający pełny CRUD.

---

### Sesja 5 – Filtrowanie, sortowanie i statystyki

**Zakres:** grupy zadań 8 i 9
**Cel:** lista daje się filtrować i sortować; panel statystyk pokazuje poprawne dane

Zadania:
- Dodanie kontrolek filtrów i sortowania w HTML
- Implementacja `filterEntries(entries, filters)` i `sortEntries(entries, field, direction)`
- Podpięcie kontrolek – każda zmiana przelicza i re-renderuje listę
- Przycisk „Resetuj filtry"
- Implementacja widoku statystyk (4 agregaty odświeżane przy każdej zmianie danych)

**Weryfikacja po sesji:** zmiana filtru lub sortowania natychmiast aktualizuje listę; statystyki zgadzają się z danymi w `localStorage`.

**Kontekst do przekazania następnej sesji:** działające filtrowanie, sortowanie i statystyki.

---

### Sesja 6 – Eksport i import JSON

**Zakres:** grupa zadań 10
**Cel:** dane można wyeksportować do pliku i zaimportować z pliku

Zadania:
- Implementacja `exportJSON()` – pobranie pliku przez `<a download>`
- Implementacja `importJSON(file)` przez `FileReader`
- Walidacja struktury importowanego pliku
- Modal potwierdzenia z wyborem „Zastąp" / „Scal"
- Obsługa błędnego pliku (komunikat w UI)

**Weryfikacja po sesji:** eksport pobiera plik `.json`; import wczytuje plik, pyta o tryb i aktualizuje dane; błędny plik pokazuje komunikat.

**Kontekst do przekazania następnej sesji:** działający eksport i import.

---

### Sesja 7 – Stylowanie i responsywność

**Zakres:** grupa zadań 11
**Cel:** aplikacja wygląda spójnie i działa na urządzeniach mobilnych

Zadania:
- Definicja zmiennych CSS (kolory, fonty, spacing)
- Style nawigacji i przełączania widoków
- Style formularza + stany `.field-error` / `.field-valid`
- Style listy aktywności (karty)
- Style sekcji statystyk
- Style modalu potwierdzenia
- Responsywność mobile-first (breakpoint ~768px)

**Weryfikacja po sesji:** aplikacja wygląda poprawnie na szerokości 375px i 1280px; błędy walidacji są wizualnie wyróżnione.

**Kontekst do przekazania następnej sesji:** gotowe style.

---

### Sesja 8 – Testy manualne i wdrożenie

**Zakres:** grupy zadań 12 i 13
**Cel:** aplikacja zweryfikowana i dostępna publicznie

Zadania:
- Przejście przez wszystkie 12 scenariuszy testów manualnych
- Naprawienie znalezionych błędów
- Konfiguracja GitHub Pages
- Weryfikacja działania pod publicznym URL

**Weryfikacja po sesji:** wszystkie testy manualne zaliczone; aplikacja dostępna pod adresem GitHub Pages.

---

### Podsumowanie sesji

| Sesja | Grupy zadań | Główny wynik |
|-------|-------------|--------------|
| 1 | 1–2 | Warstwa danych w `localStorage` |
| 2 | 3 + fragment 6 | Szkielet HTML + nawigacja |
| 3 | 4–5 + fragment 6 | Formularz Add + walidacja |
| 4 | 7 + reszta 6 | Pełny CRUD w UI |
| 5 | 8–9 | Filtrowanie, sortowanie, statystyki |
| 6 | 10 | Eksport i import JSON |
| 7 | 11 | Style i responsywność |
| 8 | 12–13 | Testy i wdrożenie |
