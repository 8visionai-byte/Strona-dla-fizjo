# Landing page dla fizjoterapeutów

Strona sprzedażowa SimpleFast.ai kierowana do gabinetów fizjoterapii, które nie mają
strony internetowej albo płacą za nią za dużo. Ruch przychodzi z kampanii SMS i mailowej,
więc strona musi robić wrażenie w pierwsze dwie sekundy i działać na telefonie.

## Co to jest

Jednostronicowy landing, film w tle prowadzony przez cały ekran, napisy wjeżdżające
sekcja po sekcji. Statyczny HTML, CSS i JavaScript, bez frameworka i bez kroku budowania.

## Stack

- HTML + CSS + JavaScript, kod własny
- GSAP + ScrollTrigger (przypinanie sekcji, animacja napisów)
- Lenis (płynne przewijanie)
- Hosting: Vercel, wdrożenie z gałęzi `main`

## Struktura katalogów

| Katalog | Zawartość |
|---|---|
| `assets/img/` | zoptymalizowane WebP użyte na stronie |
| `assets/video/` | klipy MP4 tła, skompresowane |
| `assets/css/` | style |
| `assets/js/` | skrypty |
| `zdjecia-zrodlowe/` | 40 oryginalnych PNG z ChatGPT, poza repo (patrz `.gitignore`) |
| `docs/` | specyfikacja, prompty do generowania wideo, decyzje |

## Kontakt na stronie

Telefon: +48 696 674 874

## Powiązane projekty

- Aplikacja Fizjoplan: osobne repo, osobny landing (LP-2)
- Strona główna firmy: https://www.simplefast.ai/
