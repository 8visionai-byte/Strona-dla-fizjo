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
| 2.1 | Katalog 40 zdjęć: opis, kolory, jakość, przypisanie do sekcji | **DONE** | workflow `wf_6c319e66-e69`, 6 agentów, wyniki w `docs/MAPA-SEKCJI.md` |
| 2.2 | Prompty do Higgsfield na 5 klipów + anatomia | **DONE** | `docs/PROMPTY-WIDEO.md`, parametry modeli odczytane z API Higgsfield |
| 2.3 | Kompresja zdjęć do WebP | **DONE** | 40/40 plików, 72 MB → 2,59 MB, średnio 66 KB, zero błędów |
| 2.4 | Wygenerowanie klipów przez Pawła | **NIERUSZONE** | czeka na akceptację KLIPU 1 |
| 2.5 | Ilustracje anatomiczne (warstwy) | **NIERUSZONE** | ryzyko opisane w `docs/PROMPTY-WIDEO.md` |

## Etap 3. Budowa strony

| # | Zadanie | Stan | Dowód |
|---|---|---|---|
| 3.1 | System designu: kolory ze zdjęć, typografia, siatka | **DONE** | `assets/css/style.css`, paleta w `docs/MAPA-SEKCJI.md` |
| 3.2 | Dziewięć sekcji z treścią | **DONE** | `index.html`, 11 kontroli treści przeszło |
| 3.3 | Animacje wejścia sterowane scrollem | **DONE** | `assets/js/app.js`, GSAP + ScrollTrigger + Lenis |
| 3.4 | Obsługa braku JS i preferencji ograniczenia ruchu | **DONE** | `<noscript>` w `index.html`, `prefers-reduced-motion` w CSS |
| 3.5 | Formularz: walidacja, pułapka na boty, zgoda RODO | **DONE** | `assets/js/app.js` |
| 3.6 | Podpięcie webhooka Make | **ZABLOKOWANE** | brak adresu, stała `WEBHOOK_MAKE` w `assets/js/app.js` jest pusta |
| 3.7 | Polityka prywatności | **CLAIMED-UNVERIFIED** | `polityka-prywatnosci.html` gotowa, ale dane firmy w nawiasach do uzupełnienia, bez sprawdzenia przez prawnika |
| 3.8 | Test lokalny | **DONE** | serwer lokalny: wszystkie zasoby HTTP 200, 404 działa, 11/11 kontroli treści |
| 3.9 | Push i wdrożenie na Vercelu | **DONE** | Paweł potwierdził, że widzi stronę na Vercelu (2026-07-29 wieczorem) |
| 3.10 | Przebudowa wizualna v2 po uwagach Pawła | **DONE** | preloader z licznikiem, własny kursor (desktop), taśma, nagłówki składane z liter, stos kart warstw (sticky), maski odsłon zdjęć, karuzela opinii, liczniki cen, magnetyczne przyciski, chowany pasek, pasek postępu; 40/40 kontroli lokalnych |
| 3.11 | Opinie: karuzela 10 opinii + slajd CTA | **DONE** | treści dostarczone przez Pawła 2026-07-29 (10 branż, imiona i miasta od Pawła); wcześniejsza prośba o zmyślone opinie stała się bezprzedmiotowa — Paweł dostarczył własne |
| 3.12 | Test na realnym telefonie | **NIERUSZONE** | do zrobienia przez Pawła; bezpieczniki w kodzie: bez kursora i Lenis na dotyku, `prefers-reduced-motion`, `noscript` |
| 3.13 | Poprawki po uwagach z desktopu (2026-07-29 późny wieczór) | **DONE** | usunięte pływające kadry z hero (psuły kompozycję), galeria-akordeon 10 kadrów z hover (zamiast taśmy z duplikatami), każde zdjęcie w `<img>` użyte dokładnie raz (kontrola automatyczna), płynne przejścia tonalne między sekcjami (gradienty zamiast ostrych krawędzi), autoplay karuzeli 8 s; 57/57 kontroli lokalnych |

### Do potwierdzenia przez Pawła (treści opinii)

1. **Pani Ewa, biuro rachunkowe** — z dyktowania wyszło miasto „Piasza/Piasz". Nie
   rozpoznaję takiej miejscowości, więc na stronie jest na razie „biuro rachunkowe"
   bez miasta. Podaj poprawną nazwę, dopiszę.
2. **Placówka medyczna** — podpisana jako „Klinika, Warszawa" (podałeś realizatora,
   pana Karola, ale nie autora opinii).
3. W dyktowaniu padło zdanie „to jest znowu pani Monika" bez przypisania do żadnej
   opinii — pominąłem. Jeśli któraś opinia ma być pani Moniki, wskaż która.
4. Opinie 1, 4, 5, 7 i 9 opisują aplikacje/asystentów AI, nie strony WWW. Na landingu
   stron to działa jako dowód szerokości usług, ale jeśli chcesz czystszy przekaz,
   możemy je wymienić na opinie stricte „stronowe".

## Etap 4. Film w tle zamiast zdjęć

**NIERUSZONE.** Warunek wejścia: zaakceptowany KLIP 1 z `docs/PROMPTY-WIDEO.md`.
Struktura sekcji `.ekran__tlo` jest już przygotowana pod podmianę `<img>` na `<video>`.

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
