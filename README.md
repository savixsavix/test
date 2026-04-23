# Catering Recipe Recreator

Aplikacja webowa do odtwarzania dań z cateringu na podstawie zdjęć etykiet i opisów. Działa w całości w przeglądarce – bez backendu, bez API, bez logowania.

## Cel aplikacji

Pozwala użytkownikowi:

- wgrać zdjęcie etykiety lub opisu dania z cateringu
- wyciągnąć z niego tekst (OCR lokalny)
- poprawić rozpoznany tekst ręcznie
- zapisać danie jako ulubione
- wygenerować domową wersję przepisu
- wygenerować listę zakupów

## Funkcje MVP

- **Upload zdjęcia** – obsługa plików graficznych z urządzenia
- **OCR lokalny** – rozpoznawanie tekstu ze zdjęcia (Tesseract.js)
- **Edycja tekstu** – korekta wyniku OCR przed zapisem
- **Zapis dania** – przechowywanie danych lokalnie w IndexedDB
- **Generator przepisu** – reguły i szablony dopasowane do wykrytego typu dania
- **Lista zakupów** – automatycznie generowana na podstawie składników
- **Lista ulubionych dań** – przegląd i zarządzanie zapisanymi daniami

## Flow użytkownika

```
Dodaj zdjęcie → OCR → Korekta tekstu → Zapis → Przepis + Lista zakupów
```

1. Użytkownik wgrywa zdjęcie etykiety dania
2. Aplikacja uruchamia OCR i wyświetla rozpoznany tekst
3. Użytkownik poprawia tekst w edytorze
4. Aplikacja wykrywa składniki i typ dania
5. Danie zostaje zapisane
6. Generowany jest przepis i lista zakupów

## Technologie

| Warstwa | Technologia |
|---------|-------------|
| Struktura | HTML |
| Stylowanie | CSS |
| Logika | JavaScript (Vanilla) |
| OCR | Tesseract.js |
| Dane | IndexedDB |
| Hosting | GitHub Pages |

## Architektura

SPA (Single Page Application) bez backendu. Całość działa po stronie przeglądarki.

### Moduły

| Moduł | Odpowiedzialność |
|-------|-----------------|
| **UI** | Renderowanie widoków, obsługa zdarzeń |
| **OCR** | Integracja z Tesseract.js, przetwarzanie zdjęcia |
| **Parser tekstu** | Wykrywanie składników, dopasowanie typu dania |
| **Generator przepisu** | Tworzenie przepisu z szablonów |
| **Storage** | Zapis i odczyt danych z IndexedDB |

## Struktura projektu

```
catering-recreator/
├── index.html        # jedyny plik HTML – wszystkie widoki aplikacji
├── css/              # arkusze stylów
├── js/               # moduły JavaScript
└── assets/           # ikony i inne zasoby statyczne
```

## Model danych

Każde zapisane danie zawiera:

| Pole | Typ | Opis |
|------|-----|------|
| `id` | string | Unikalny identyfikator |
| `name` | string | Nazwa dania |
| `ocrText` | string | Surowy tekst z OCR |
| `ingredients` | string[] | Lista wykrytych składników |
| `recipe` | string | Wygenerowany przepis |
| `shoppingList` | string[] | Lista zakupów |
| `servings` | number | Liczba porcji |
| `savedAt` | string | Data zapisu (ISO 8601) |

Dane przechowywane są lokalnie w **IndexedDB** (lepsza obsługa zdjęć i większych zbiorów danych niż localStorage).

## Logika działania

- **Słownik składników** – mapowanie słów kluczowych na znane składniki
- **Dopasowanie typu dania** – reguły wykrywające np. curry, pasta, wrap, sałatka
- **Szablony przepisów** – generowanie kroków na podstawie wykrytego typu i składników

## Widoki UI

- **Lista dań** – przegląd zapisanych ulubionych
- **Dodanie dania** – upload zdjęcia → OCR → edycja → zapis
- **Szczegóły dania** – przepis, składniki, lista zakupów

Przełączanie widoków przez pokazywanie/ukrywanie sekcji (`display: none / block`) – bez routingu.

## Uruchomienie

Aplikacja nie wymaga instalacji ani serwera. Wystarczy otworzyć plik `index.html` w przeglądarce lub skorzystać z hostingu na **GitHub Pages**.

## Ograniczenia

- Jakość OCR zależy od jakości i czytelności zdjęcia
- Brak AI online – przepisy generowane regułowo na podstawie szablonów, nie odtwarzają oryginału 1:1
- Dane przechowywane wyłącznie lokalnie – utrata przy czyszczeniu danych przeglądarki
- Brak synchronizacji między urządzeniami

## Planowane rozszerzenia (poza MVP)

- Backend i baza danych
- Logowanie użytkowników
- Integracja z zewnętrznymi API przepisów
- Tryb PWA (Progressive Web App)
- Zaawansowana analityka składników i wartości odżywczych
