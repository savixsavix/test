# Activity Tracker

Lekka aplikacja webowa do logowania aktywności fizycznej i treningów, działająca w całości po stronie przeglądarki.

## O aplikacji

Activity Tracker umożliwia szybkie zapisywanie treningów i aktywności fizycznych. Dane przechowywane są lokalnie w przeglądarce (localStorage), bez potrzeby rejestracji czy połączenia z serwerem.

## Funkcje

- **Dodawanie aktywności** – formularz z podstawowymi polami
- **Lista aktywności** – przegląd wszystkich zapisanych wpisów
- **Edycja i usuwanie** – pełne operacje CRUD
- **Filtrowanie i sortowanie** – wyszukiwanie według typu, daty i innych kryteriów
- **Statystyki** – podstawowe agregacje danych
- **Eksport / import JSON** – przenoszenie danych między urządzeniami

## Technologie

| Warstwa | Technologia |
|---------|-------------|
| Struktura | HTML |
| Stylowanie | CSS |
| Logika | JavaScript (Vanilla) |
| Dane | localStorage |
| Hosting | GitHub Pages |

## Architektura

Aplikacja frontendowa bez backendu i bez API. Całość działa w przeglądarce – brak logowania, brak synchronizacji, brak kont użytkowników.

## Struktura projektu

```
activity-tracker/
├── index.html
├── css/
├── js/
└── assets/
```

## Model danych

Każdy wpis aktywności zawiera następujące pola:

| Pole | Opis |
|------|------|
| `id` | Unikalny identyfikator |
| `date` | Data aktywności |
| `type` | Typ aktywności (np. bieg, rower) |
| `title` | Nazwa/tytuł wpisu |
| `duration` | Czas trwania |
| `distance` | Dystans |
| `notes` | Notatki |
| `createdAt` | Data utworzenia wpisu |
| `updatedAt` | Data ostatniej modyfikacji |

Dane zapisywane są w `localStorage` pod kluczem `activityTrackerEntries`.

## Uruchomienie

Aplikacja nie wymaga instalacji ani serwera. Wystarczy otworzyć plik `index.html` w przeglądarce lub skorzystać z wersji hostowanej na GitHub Pages.

## Ograniczenia

- Dane przechowywane wyłącznie lokalnie – brak synchronizacji między urządzeniami
- Brak kont użytkowników
- Dane mogą zostać utracone po wyczyszczeniu danych przeglądarki (zalecany regularny eksport JSON)

## Planowane rozszerzenia

- Backend i baza danych
- Logowanie użytkowników
- Tryb PWA (Progressive Web App)
- Integracje z zewnętrznymi serwisami
- Zaawansowana analityka

## Wdrożenie

Aplikacja hostowana jest na **GitHub Pages** bezpośrednio z tego repozytorium.
