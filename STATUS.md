# STATUS — Landing page dla fizjoterapeutów (LP-1)

Ostatnia aktualizacja: 2026-07-29
Repo lokalne: `c:\Users\Paweł Pieloch\CLAUDE CODE\landing page dla fizjo`
Repo zdalne: `https://github.com/8visionai-byte/Strona-dla-fizjo.git`
Hosting docelowy: Vercel, wdrożenie z gałęzi `main`

Legenda: **DONE** = zrobione i zweryfikowane dowodem · **CLAIMED-UNVERIFIED** = zrobione, bez dowodu · **W TOKU** · **NIERUSZONE**

---

## Etap 0. Rozdzielenie projektów

| # | Zadanie | Stan | Dowód |
|---|---|---|---|
| 0.1 | Nowy katalog `landing page dla fizjo` | **DONE** | folder utworzony, 40 plików PNG przeniesionych |
| 0.2 | Przeniesienie 40 zdjęć źródłowych | **DONE** | `ls zdjecia-zrodlowe \| wc -l` = 40, rozmiar 72 MB |
| 0.3 | `git init` + commit bazowy + remote | **DONE** | commit `99051d6`, remote `origin` = Strona-dla-fizjo |
| 0.4 | Push na GitHuba | **DONE** | `* [new branch] main -> main`, push zakończony bez błędu |
| 0.5 | Wycięcie folderu z repo Fizjoplan | **DONE** | commit `12aa2f3` w repo Fizjoplan, 40 plików usuniętych ze śledzenia |

## Etap 1. Ustalenia projektowe

| # | Decyzja | Stan |
|---|---|---|
| 1.1 | Dwa osobne landingi: LP-1 strony WWW, LP-2 Fizjoplan | **DONE** |
| 1.2 | LP-1 pierwszy, wspólny system designu dla obu | **DONE** |
| 1.3 | Konwersja: formularz (gabinet, miasto, telefon) + telefon bezpośredni | **DONE** |
| 1.4 | Hero: film w tle + napisy wjeżdżające sekcja po sekcji, anatomia niżej | **DONE** |
| 1.5 | Kod własny inspirowany Azurio (bez kupowania szablonu) | **DONE** |
| 1.6 | Formularz → webhook do Make → mail na Gmaila | **DONE** |
| 1.7 | Start na adresie `.vercel.app`, domena przed kampanią SMS | **DONE** |

## Etap 2. Materiały

| # | Zadanie | Stan | Dowód |
|---|---|---|---|
| 2.1 | Katalog 40 zdjęć: opis, kolory, jakość, przypisanie do sekcji | **W TOKU** | workflow `wf_6c319e66-e69` |
| 2.2 | Prompty do Higgsfield na 5 klipów + anatomia | **DONE** | `docs/PROMPTY-WIDEO.md`, parametry modeli odczytane z API Higgsfield |
| 2.3 | Wygenerowanie klipów przez Pawła | **NIERUSZONE** | czeka na akceptację KLIPU 1 |
| 2.4 | Ilustracje anatomiczne (warstwy) | **NIERUSZONE** | ryzyko opisane w `docs/PROMPTY-WIDEO.md` |
| 2.5 | Kompresja zdjęć do WebP i klipów do ~2 MB | **NIERUSZONE** | |

## Etap 3. Specyfikacja i plan

**NIERUSZONE.** Warunek wejścia: zamknięty katalog zdjęć i uzupełnione braki z sekcji poniżej.

## Etap 4. Budowa strony

**NIERUSZONE.** Kolejność: system designu → hero → sekcje → formularz → RODO → wdrożenie.

---

## Otwarte braki (blokują konkretne etapy)

1. **Nazwy klientów do sekcji z realizacjami.** Z dyktowania wyszły: „Trockenhaus",
   „Przystań Jurgen.pl", „Fischtel Gebrickshaus". Wyglądają na przekręcone przez
   rozpoznawanie mowy. **Nie wpiszę ich na stronę, dopóki nie dostanę poprawnej pisowni
   i adresów URL.** Zła nazwa klienta na stronie sprzedażowej to wstyd, a nie literówka.
2. **Treść opinii.** Paweł zapowiedział, że poda je później. Do tego czasu sekcja zostaje
   z oznaczonymi pustymi miejscami, bez zmyślonych cytatów.
3. **Zgoda klientów na pokazanie ich stron** w sekcji realizacji.
4. **Konto Make i adres webhooka** do formularza. Uwaga: Marcin w rozmowie 2026-07-29
   mówił, że jest o krok od wyłączenia Make. Jeśli go wyłączy, formularz przestanie
   dowozić leady.
5. **Dokumenty RODO:** administrator danych, treść zgody przy formularzu, polityka
   prywatności. Warunek konieczny przed wysyłką kampanii SMS.

## Dane potwierdzone przez Pawła (2026-07-29)

- Telefon na stronie: **+48 696 674 874**
- Landing page: **od 1200 zł netto**
- Strona biznesowa, kilka sekcji: **około 2000 zł netto**
- Utrzymanie: **do 50% taniej** niż klient płaci dziś
- Dodatkowa usługa: **odświeżenie istniejącej strony**

## Do zrobienia ręcznie (przez Pawła)

1. Podłącz repo `Strona-dla-fizjo` do Vercela (import z GitHuba, gałąź `main`).
2. Wygeneruj KLIP 1 wg `docs/PROMPTY-WIDEO.md` i powiedz, czy pasuje.
3. Podaj poprawne nazwy i adresy stron klientów do sekcji z realizacjami.
