# Prompty do Higgsfield — film tła landing page

Data: 2026-07-29
Do wygenerowania: **5 klipów obowiązkowych + 1 opcjonalny**

---

## Zanim zaczniesz generować — cztery zasady

**1. Generuj z naszych zdjęć, nie z samego tekstu.**
Masz 40 gotowych obrazów w `zdjecia-zrodlowe/`. Modele `seedance_2_0`, `kling3_0`
i `cinematic_studio_video_v2` przyjmują `start_image`. Jeśli podasz nasze zdjęcie jako
pierwszą klatkę, film będzie wyglądał jak ta sama strona, a nie jak doklejony obcy
materiał. To jest różnica między „ładny film" a „spójna strona".

**2. Generuj 16:9, potem przerabiaj narzędziem reframe.**
Nie generuj osobno wersji pionowej na telefon. Wygeneruj poziomą, a potem użyj funkcji
`reframe`, żeby zrobić z niej 9:16. Kosztuje ułamek nowej generacji.

**3. Dźwięk wyłączony.**
Film na stronie leci wyciszony (przeglądarki i tak blokują dźwięk przy autoodtwarzaniu).
W `seedance_2_0` ustaw `generate_audio: false`, w `kling3_0` i `cinematic_studio_video_v2`
ustaw `sound: off`. Mniej kredytów za to samo.

**4. Prompty są po angielsku celowo.**
Modele wideo są trenowane na angielskich opisach. Polski prompt daje wyraźnie gorszy
efekt. Pod każdym promptem masz polskie tłumaczenie, żebyś wiedział, co zamawiasz.

---

## Ustawienia wspólne dla wszystkich klipów

| Parametr | Wartość | Dlaczego |
|---|---|---|
| Proporcje | `16:9` | potem `reframe` do `9:16` na telefon |
| Długość | `5` sekund | klipy lecą w pętli, dłuższe niepotrzebnie ważą |
| Rozdzielczość | `1080p` | 4K to strata, i tak kompresujemy do ~2 MB |
| Dźwięk | wyłączony | strona jest wyciszona |

**Czego pilnować przy odbiorze każdego klipu** (odrzuć i generuj ponownie, jeśli jest choć jedno):
- zdeformowane dłonie albo inna liczba palców niż pięć
- staw zginający się w złą stronę
- jakikolwiek napis, logo albo znak firmowy w kadrze
- wyraźna, rozpoznawalna twarz
- ruch, który wygląda jak zwolniony film puszczony do przodu (typowy artefakt AI)

---

## KLIP 1 — HERO. „Ostatnia dobra chwila"

**Gdzie leci:** pierwszy ekran, pod nagłówkiem. To jest te dwie sekundy, o których mówił Marcin.
**Model:** `seedance_2_0`, `mode: std`, `genre: drama`, `generate_audio: false`
**Start image:** zdjęcie ze sportowcem w ruchu (dokładny plik dobiorę po katalogu zdjęć)

```
Cinematic low-angle tracking shot following an amateur athlete sprinting across
a sunlit grass field at golden hour. Warm backlight, long shadows, fine blades of
grass kicked into the air, shallow depth of field. The camera glides smoothly
alongside at knee height with a subtle handheld energy. The face is never visible:
we see legs, torso and shoulders in motion, natural muscle definition, realistic
athletic gait. Amber and deep green palette, soft film grain, gentle anamorphic
lens flare. Calm, confident, effortless. The shot ends mid-stride so it can loop
seamlessly.
```

*Po polsku: filmowe ujęcie z niskiego kąta, kamera jedzie obok biegnącego sportowca po
nasłonecznionym boisku o złotej godzinie. Ciepłe światło pod słońce, długie cienie, źdźbła
trawy w powietrzu, mała głębia ostrości. Twarzy nie widać, tylko nogi, tors i barki w ruchu.
Kończy się w połowie kroku, żeby dało się zapętlić.*

**Unikaj:** `text, letters, logos, brand marks, stadium advertising, crowd, distorted hands, extra limbs, watermark`

---

## KLIP 2 — DIAGNOZA. „Moment przed"

**Gdzie leci:** sekcja z napisem „Pacjent szuka Cię w Google. I w ChatGPT. Nie znajduje."
**Model:** `cinematic_studio_video_v2` — ten model ma parametr `speedramp: impact`,
zrobiony dokładnie pod moment uderzenia. To jest właśnie efekt „samochód przed ścianą",
o którym mówiłeś.
**Parametry:** `genre: suspense`, `speedramp: impact`, `mode: pro`, `sound: off`, `cfg_scale: 0.6`

```
Cinematic slow motion. The same athlete plants a foot hard into the grass to change
direction. The knee rotates, the ankle rolls, body weight shifts the wrong way.
Time stretches at the instant of the plant, dust and torn grass burst outward.
The camera pushes in low and tight on the leg and the ground. Dramatic side light,
cold desaturated tones bleeding into the warm palette. The frame cuts to darkness
the moment the body begins to fall. No blood, no injury detail, no visible face,
no expression of pain. Tension without gore.
```

*Po polsku: zwolnione tempo, sportowiec twardo stawia stopę, żeby zmienić kierunek. Kolano
się skręca, kostka podwija, ciężar ciała idzie w złą stronę. Czas się rozciąga w momencie
kontaktu, kamera wjeżdża nisko na nogę i podłoże. Ciepła paleta gaśnie w zimną. Kadr ucina
się do czerni, kiedy ciało zaczyna padać. Bez krwi, bez twarzy, bez cierpienia. Napięcie,
nie brutalność.*

**Unikaj:** `blood, wound, bone, gore, screaming face, medical horror, text, logos, watermark`

### Wariant B tego samego klipu — Twój pomysł z rozproszeniem

Jeśli chcesz lżejszy ton, ten sam moment, ale przyczyną jest rozproszenie uwagi. Ludzki,
z mrugnięciem okiem, i lepiej się klika w SMS-ie. Wygeneruj oba i porównaj:

```
Cinematic shot. The athlete runs with the ball, then his head turns sharply to the
side, distracted by something off-frame. His stride breaks. The camera whip-pans
with his gaze for a fraction of a second, then snaps back as his planted foot
twists under him. Warm golden light, shallow depth of field, no faces in focus.
The frame cuts to darkness as he starts to go down. Light, human, almost comedic
timing, not dramatic.
```

*Po polsku: biegnie z piłką, gwałtownie odwraca głowę, coś go rozprasza poza kadrem. Krok
się łamie. Kamera szarpie za jego wzrokiem i wraca, kiedy stopa podwija się pod nim. Ucięcie
do czerni. Ton lekki, z przymrużeniem oka, nie dramatyczny.*

---

## KLIP 3 — LECZENIE. „Ręce, które naprawiają"

**Gdzie leci:** sekcja z czterema konkretami oferty. To najważniejszy klip dla wiarygodności:
fizjoterapeuta ma tu zobaczyć swoją własną robotę pokazaną z szacunkiem.
**Model:** `seedance_2_0`, `mode: std`, `genre: intimate` → jeśli niedostępne, użyj `auto`
**Start image:** zdjęcie zabiegu na stole z katalogu

```
Close-up cinematic shot inside a clean modern physiotherapy room. A therapist's
hands work on a patient's knee and calf resting on a treatment table. Slow,
precise, confident pressure, professional grip, skilled movement. Soft diffused
daylight from a large window, neutral interior of white walls and light wood.
The camera orbits slowly at table height with very shallow depth of field. Only
hands, forearms and the treated limb are in frame, no faces at any point.
Photorealistic skin texture, anatomically correct hands with exactly five fingers.
Calm, competent, reassuring.
```

*Po polsku: zbliżenie w czystym, nowoczesnym gabinecie. Dłonie terapeuty pracują na kolanie
i łydce pacjenta leżącego na stole. Powolny, pewny, fachowy nacisk. Miękkie światło dzienne
z dużego okna, biel i jasne drewno. Kamera powoli okrąża na wysokości stołu. W kadrze tylko
dłonie, przedramiona i leczona kończyna, żadnych twarzy. Anatomicznie poprawne dłonie,
dokładnie pięć palców.*

**Unikaj:** `six fingers, deformed hands, merged fingers, text, logos, medical branding, face, watermark`

> To jest klip, w którym AI najczęściej psuje dłonie. Zakładaj 3-4 podejścia. Jeśli po
> czterech nadal masz połamane palce, zmień kadr na samą łydkę i stopę, tam ryzyko jest mniejsze.

---

## KLIP 4 — EFEKT. „Powrót"

**Gdzie leci:** sekcja o tym, co pacjent zyskuje.
**Model:** `seedance_2_0`, `mode: std`, `genre: drama`, `generate_audio: false`

```
Cinematic shot in a bright physiotherapy room. A patient sits up on the edge of
a treatment table, slowly extends the knee, tests the joint, then stands and takes
a first careful step. Relief in the body language, no face visible, framed from
chest down. Warm daylight, soft shadows, white and light wood interior, shallow
depth of field. The camera rises gently with the movement. Hopeful, quiet, honest.
No dramatic music-video energy, no slow-motion cliche.
```

*Po polsku: pacjent siada na brzegu stołu, powoli prostuje kolano, sprawdza staw, wstaje
i robi pierwszy ostrożny krok. Ulga widoczna w postawie ciała, twarzy nie widać, kadr od
klatki piersiowej w dół. Kamera delikatnie unosi się razem z ruchem. Z nadzieją, spokojnie,
uczciwie.*

**Unikaj:** `face, text, logos, crutches, hospital equipment, sad mood, watermark`

---

## KLIP 5 — KONTAKT. „Domknięcie"

**Gdzie leci:** ostatnia sekcja, za formularzem. Domyka historię: ten sam człowiek, ta sama
łąka, ale teraz biegnie sprawnie. Widz nie musi tego rozumieć świadomie, ma to poczuć.
**Model:** `seedance_2_0`, `mode: std`, `genre: drama`
**Ważne:** użyj tej samej `start_image` co w KLIPIE 1, żeby to była wyraźnie ta sama scena.

```
The same athlete, the same grass field, but now in clear morning light instead of
golden hour. He runs with a full, even, unbroken stride, no hesitation. The camera
pulls back and rises slowly, revealing the open field around him. Cool fresh
morning tones, crisp air, light haze. Face not visible. Steady, resolved, complete.
The movement is symmetric and healthy, both legs loading equally.
```

*Po polsku: ten sam sportowiec, ta sama łąka, ale teraz w czystym porannym świetle zamiast
złotej godziny. Biegnie pełnym, równym krokiem, bez wahania. Kamera cofa się i unosi,
odsłaniając otwartą przestrzeń. Chłodne poranne barwy. Twarzy nie widać. Ruch symetryczny
i zdrowy, obie nogi obciążane tak samo.*

**Unikaj:** `limping, asymmetric gait, bandage, brace, text, logos, watermark`

---

## KLIP 6 (opcjonalny) — ANATOMIA

**Uwaga, mówię wprost:** to jest najbardziej ryzykowna część całej strony i nie obiecuję,
że AI zrobi to poprawnie. Warstwy anatomiczne muszą się na siebie nakładać co do piksela,
a modele generatywne tego nie gwarantują. Dostajesz prompt do przetestowania, ale jeśli po
kilku próbach warstwy nie będą pasować, przechodzimy na plan B: licencjonowany zestaw
ilustracji anatomicznych, albo rezygnujemy z tej sekcji na rzecz mocniejszego pokazu samych
stron. Nie będę udawał, że wiem, że to wyjdzie.

**Sposób generowania:** zamiast filmu wygeneruj **4 nieruchome obrazy** narzędziem
`generate_image`, każdy z tą samą kompozycją, i podawaj **poprzedni obraz jako referencję**,
żeby wymusić to samo kadrowanie. Kolejność: skóra → mięśnie powierzchowne → mięśnie głębokie
i przyczepy → szkielet. Stronę zrobię tak, że warstwy przenikają się przy przewijaniu.

```
Anatomical medical illustration of a standing human body, front view, centered,
full figure, neutral pose with arms slightly away from the torso. Clean neutral
dark background, even studio lighting, no shadows on the background. Medically
accurate proportions and anatomy. Style: modern medical atlas, precise, clinical,
not stylized, not cartoon. LAYER: [wstaw jedną z czterech linii poniżej].
Identical framing, identical scale, identical camera position and identical pose
in every layer.
```

Cztery warianty do wstawienia w miejsce `LAYER:`
1. `intact skin, natural skin tone, no muscles visible`
2. `skin removed, superficial muscle layer exposed, accurate muscle bellies and fascia`
3. `superficial muscles removed, deep muscle layer and tendon attachments visible`
4. `all soft tissue removed, complete skeleton with joints and ligaments`

**Unikaj:** `text, labels, arrows, numbers, watermark, cartoon, stylized, anime, incorrect anatomy`

> Napisy typu „mięsień czworogłowy" **muszą** być odrzucone. Etykiety dokładam na stronie
> jako tekst HTML, dzięki czemu są ostre na każdym ekranie, można je czytać czytnikiem
> ekranu i można je poprawić bez regenerowania obrazu.

---

## Kolejność pracy

1. Wygeneruj **KLIP 1**. Nic więcej, dopóki go nie zaakceptujesz — on ustawia paletę
   i styl wszystkich pozostałych.
2. Po akceptacji KLIPU 1: klipy 2, 3, 4, 5.
3. `reframe` każdego zaakceptowanego klipu do `9:16`.
4. Wrzuć pliki do `wideo-zrodlowe/` w tym repo. Ja skompresuję je do ~2 MB i podepnę.
5. KLIP 6 dopiero na końcu, jako eksperyment.
