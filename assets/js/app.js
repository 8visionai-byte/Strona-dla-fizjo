/* =========================================================
   Landing page dla gabinetów fizjoterapii
   SimpleFast.ai
   ========================================================= */

/* ---------------------------------------------------------
   KONFIGURACJA — jedyne miejsce, które trzeba edytować
   --------------------------------------------------------- */

/*
  Adres webhooka z Make.com. Skopiuj go z modułu "Custom webhook"
  i wklej między apostrofy poniżej.

  UWAGA, PRZECZYTAJ ZANIM WKLEISZ:
  Ten adres jest widoczny dla każdego, kto otworzy kod strony w przeglądarce.
  Tak działa każdy formularz wysyłany z przeglądarki i nie da się tego ukryć.
  Dlatego w scenariuszu Make koniecznie ustaw:
    1. filtr odrzucający zgłoszenia z pustym polem "gabinet" albo "telefon",
    2. filtr odrzucający zgłoszenia, w których pole "firma_www" NIE jest puste
       (to pułapka na boty, prawdziwy człowiek jej nie wypełni),
    3. limit operacji w Make, żeby ewentualny spam nie wyczerpał pakietu.
*/
const WEBHOOK_MAKE = '';

/* --------------------------------------------------------- */

document.documentElement.classList.add('js');

const mniejRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('ladowanie');
  if (loader) setTimeout(() => loader.classList.add('zniknij'), 250);
});

/* ---------- płynne przewijanie ---------- */
let lenis = null;
if (!mniejRuchu && typeof Lenis !== 'undefined') {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95 });
  const klatka = (t) => { lenis.raf(t); requestAnimationFrame(klatka); };
  requestAnimationFrame(klatka);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const cel = document.querySelector(link.getAttribute('href'));
      if (!cel) return;
      e.preventDefault();
      lenis.scrollTo(cel, { offset: -70 });
    });
  });
}

/* ---------- pasek górny ---------- */
const pasek = document.getElementById('pasek');
const sprawdzPasek = () => {
  if (!pasek) return;
  pasek.classList.toggle('przyklejony', window.scrollY > 40);
};
sprawdzPasek();
window.addEventListener('scroll', sprawdzPasek, { passive: true });

/* ---------- animacje wejścia ---------- */
const elementy = document.querySelectorAll('.anim');

if (mniejRuchu || typeof gsap === 'undefined') {
  elementy.forEach((el) => { el.style.opacity = '1'; });
} else {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }

  const skad = {
    lewo:  { x: -48, y: 0 },
    prawo: { x: 48,  y: 0 },
    dol:   { x: 0,   y: 36 },
  };

  elementy.forEach((el) => {
    const kierunek = skad[el.dataset.anim] || skad.dol;
    const opoznienie = parseFloat(el.dataset.opoznienie || '0');

    gsap.fromTo(el,
      { opacity: 0, x: kierunek.x, y: kierunek.y },
      {
        opacity: 1, x: 0, y: 0,
        duration: 0.9,
        delay: opoznienie,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  /* zdjęcia w tle jadą wolniej niż strona */
  document.querySelectorAll('.ekran').forEach((sekcja) => {
    const foto = sekcja.querySelector('.ekran__foto');
    if (!foto) return;
    gsap.fromTo(foto,
      { yPercent: -6, scale: 1.1 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: sekcja, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ---------- formularz ---------- */
const formularz = document.getElementById('formularz');

if (formularz) {
  const status = document.getElementById('status');
  const przycisk = document.getElementById('wyslij');
  const otwarty = Date.now();

  const pokazBlad = (nazwa, tekst) => {
    const cel = formularz.querySelector(`[data-blad-dla="${nazwa}"]`);
    const pole = formularz.elements[nazwa];
    if (cel) cel.textContent = tekst;
    if (pole && pole.type !== 'checkbox') pole.setAttribute('aria-invalid', tekst ? 'true' : 'false');
  };

  const wyczyscBledy = () => {
    formularz.querySelectorAll('.blad').forEach((b) => { b.textContent = ''; });
    formularz.querySelectorAll('[aria-invalid]').forEach((p) => p.setAttribute('aria-invalid', 'false'));
  };

  const cyfry = (tekst) => tekst.replace(/\D/g, '');

  const sprawdz = () => {
    wyczyscBledy();
    let ok = true;

    const gabinet = formularz.elements.gabinet.value.trim();
    const miasto = formularz.elements.miasto.value.trim();
    const telefon = formularz.elements.telefon.value.trim();
    const zgoda = formularz.elements.zgoda.checked;

    if (gabinet.length < 2) { pokazBlad('gabinet', 'Podaj nazwę gabinetu.'); ok = false; }
    if (miasto.length < 2) { pokazBlad('miasto', 'Podaj miasto.'); ok = false; }

    const tylkoCyfry = cyfry(telefon);
    if (tylkoCyfry.length < 9) {
      pokazBlad('telefon', 'Numer wygląda na za krótki. Podaj dziewięć cyfr.');
      ok = false;
    }

    if (!zgoda) { pokazBlad('zgoda', 'Bez zgody nie możemy oddzwonić.'); ok = false; }

    return ok;
  };

  formularz.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'formularz__status';

    if (!sprawdz()) {
      const pierwszy = formularz.querySelector('[aria-invalid="true"]');
      if (pierwszy) pierwszy.focus();
      return;
    }

    /* pułapka na boty: pole ukryte i czas wypełnienia */
    const pulapka = formularz.elements.firma_www ? formularz.elements.firma_www.value : '';
    if (pulapka !== '' || Date.now() - otwarty < 2500) {
      status.textContent = 'Nie udało się wysłać. Zadzwoń do nas: 696 674 874.';
      status.classList.add('zle');
      return;
    }

    if (!WEBHOOK_MAKE) {
      status.textContent = 'Formularz nie jest jeszcze podpięty. Zadzwoń: 696 674 874.';
      status.classList.add('zle');
      console.warn('[formularz] Brak adresu webhooka. Uzupełnij stałą WEBHOOK_MAKE w assets/js/app.js');
      return;
    }

    przycisk.disabled = true;
    przycisk.classList.add('pracuje');
    przycisk.querySelector('.btn__tekst').textContent = 'Wysyłam';

    try {
      const odpowiedz = await fetch(WEBHOOK_MAKE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gabinet: formularz.elements.gabinet.value.trim(),
          miasto: formularz.elements.miasto.value.trim(),
          telefon: formularz.elements.telefon.value.trim(),
          zgoda: true,
          zrodlo: 'landing fizjoterapeuci',
          strona: window.location.href,
          czas: new Date().toISOString(),
        }),
      });

      if (!odpowiedz.ok) throw new Error('HTTP ' + odpowiedz.status);

      formularz.reset();
      status.textContent = 'Dziękujemy. Oddzwonimy tego samego dnia roboczego.';
      status.classList.add('ok');
      przycisk.querySelector('.btn__tekst').textContent = 'Wysłane';
    } catch (blad) {
      console.error('[formularz]', blad);
      status.textContent = 'Coś poszło nie tak. Zadzwoń do nas: 696 674 874.';
      status.classList.add('zle');
      przycisk.disabled = false;
      przycisk.querySelector('.btn__tekst').textContent = 'Poproszę o sprawdzenie';
    } finally {
      przycisk.classList.remove('pracuje');
    }
  });
}
