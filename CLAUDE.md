# CLAUDE.md – Zasady dla agentów tworzących kod Activity Tracker

## Kontekst projektu

Activity Tracker to lekka aplikacja webowa do logowania aktywności fizycznej. Działa wyłącznie po stronie przeglądarki – bez backendu, bez API, bez kont użytkowników. Dane przechowywane są w `localStorage`.

## Stos technologiczny

Używaj wyłącznie:
- **HTML** – struktura i semantyka
- **CSS** – stylowanie (bez frameworków, bez preprocessorów)
- **JavaScript (Vanilla)** – logika (bez frameworków: nie używaj React, Vue, Angular, jQuery ani żadnych zewnętrznych bibliotek)

Nie dodawaj zależności npm, bundlerów ani narzędzi buildowych. Aplikacja musi działać po otwarciu `index.html` bezpośrednio w przeglądarce.

## Struktura plików

Trzymaj się ustalonej struktury katalogów:

```
activity-tracker/
├── index.html        # jedyny plik HTML – cały widok aplikacji
├── css/              # arkusze stylów
├── js/               # pliki JavaScript
└── assets/           # ikony, obrazy, inne zasoby statyczne
```

Nie twórz plików poza tą strukturą. Nie dodawaj `package.json`, `node_modules` ani plików konfiguracyjnych narzędzi.

## Model danych

Każdy obiekt aktywności musi zawierać dokładnie te pola:

```js
{
  id: string,          // unikalny identyfikator (np. crypto.randomUUID())
  date: string,        // ISO 8601 (YYYY-MM-DD)
  type: string,        // typ aktywności, np. "bieg", "rower", "siłownia"
  title: string,       // krótki opis, wymagany
  duration: number,    // czas w minutach
  distance: number,    // dystans w kilometrach (0 jeśli nie dotyczy)
  notes: string,       // dowolny tekst, może być pusty
  createdAt: string,   // ISO 8601 timestamp
  updatedAt: string    // ISO 8601 timestamp
}
```

Nie dodawaj nowych pól bez wyraźnej instrukcji. Nie zmieniaj nazw istniejących pól.

## Przechowywanie danych

- Używaj wyłącznie `localStorage`.
- Klucz: `activityTrackerEntries`.
- Przechowuj dane jako tablica JSON: `JSON.stringify(entries)` / `JSON.parse(...)`.
- Zawsze obsługuj przypadek pustego lub uszkodzonego `localStorage` (fallback do `[]`).

```js
function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem('activityTrackerEntries')) || [];
  } catch {
    return [];
  }
}
```

## Operacje CRUD

Implementuj wszystkie cztery operacje:

- **Create** – generuj `id` przez `crypto.randomUUID()`, ustaw `createdAt` i `updatedAt` na aktualny timestamp
- **Read** – czytaj zawsze z `localStorage`, nie cachuj w zmiennych globalnych między sesjami
- **Update** – aktualizuj tylko zmienione pola + `updatedAt`
- **Delete** – usuwaj po `id`, nie po indeksie tablicy

## Walidacja formularza

Waliduj po stronie klienta przed zapisem:

- `title` – wymagany, niepusty string
- `date` – wymagany, poprawny format daty
- `type` – wymagany, niepusty string
- `duration` – liczba >= 0
- `distance` – liczba >= 0

Wyświetlaj komunikaty błędów w interfejsie (nie `alert()`). Nie blokuj całego formularza – zaznacz tylko błędne pola.

## Filtrowanie i sortowanie

- Filtrowanie po: `type`, `date` (zakres od–do)
- Sortowanie po: `date`, `duration`, `distance` (rosnąco i malejąco)
- Filtrowanie i sortowanie wykonuj na tablicy w pamięci, nie modyfikuj danych w `localStorage`

## Statystyki

Agreguj na żywo z aktualnej listy wpisów:

- Liczba aktywności
- Łączny czas (suma `duration`)
- Łączny dystans (suma `distance`)
- Najczęstszy typ aktywności

## Eksport i import JSON

- **Eksport**: `JSON.stringify` całej tablicy → plik `.json` pobrany przez `<a download>`
- **Import**: wczytaj plik przez `FileReader`, zwaliduj strukturę, scal lub zastąp istniejące dane
- Przed importem zawsze pytaj użytkownika o potwierdzenie (zastąpienie vs. scalenie)

## Interfejs użytkownika

- Jeden plik `index.html` zawierający wszystkie widoki (lista, formularz, statystyki)
- Przełączanie widoków przez pokazywanie/ukrywanie sekcji (`display: none / block`), nie przez routing
- Aplikacja musi być responsywna (działa na telefonie i na desktopie)
- Nie używaj `alert()`, `confirm()` ani `prompt()` – buduj własne komponenty UI

## Styl kodu JavaScript

- Używaj `const` i `let`, nigdy `var`
- Funkcje nazywaj opisowo: `saveEntry`, `deleteEntry`, `renderList`, `filterEntries`
- Oddziel logikę danych (operacje na `localStorage`) od logiki widoku (manipulacja DOM)
- Nie pisz logiki biznesowej bezpośrednio w handlerach zdarzeń – wywołuj nazwane funkcje

## Czego nie wolno

- Nie dodawaj backendu, serwera, API ani bazy danych
- Nie używaj zewnętrznych bibliotek JS ani frameworków CSS
- Nie wprowadzaj systemu logowania ani kont użytkowników
- Nie używaj `sessionStorage` ani `IndexedDB` zamiast `localStorage`
- Nie wprowadzaj mechanizmów synchronizacji między urządzeniami
- Nie dodawaj narzędzi buildowych (Webpack, Vite, Rollup itp.)

## Planowane rozszerzenia (nie implementuj teraz)

Poniższe funkcje są planowane na przyszłość – nie implementuj ich, chyba że otrzymasz wyraźne polecenie:

- Backend i baza danych
- Logowanie użytkowników
- Tryb PWA
- Integracje zewnętrzne
- Zaawansowana analityka
