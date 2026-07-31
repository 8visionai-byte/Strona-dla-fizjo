/* =========================================================
   Landing page dla gabinetów fizjoterapii — SimpleFast.ai
   Silnik animacji. Wszystko z bezpiecznikami:
   - telefon (pointer: coarse): bez własnego kursora, bez Lenis, bez magnesów
   - prefers-reduced-motion: bez animacji, treść widoczna od razu
   - brak JS: obsługuje <noscript> w index.html
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

const mniejRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dotyk = window.matchMedia('(pointer: coarse)').matches;
const maGsap = typeof gsap !== 'undefined';

/* ---------- preloader z licznikiem ---------- */
(() => {
  const loader = document.getElementById('ladowanie');
  if (!loader) return;
  const licznik = document.getElementById('licznikLad');
  const kreska = document.getElementById('kreskaLad');

  const schowaj = () => loader.classList.add('zniknij');

  if (mniejRuchu || !maGsap) {
    window.addEventListener('load', schowaj);
    setTimeout(schowaj, 1200);
    return;
  }

  const stan = { p: 0 };
  let zaladowane = false;
  window.addEventListener('load', () => { zaladowane = true; });

  gsap.to(stan, {
    p: 100,
    duration: 1.4,
    ease: 'power2.inOut',
    onUpdate() {
      /* przy 88% czekamy na realne załadowanie strony, żeby licznik nie kłamał */
      if (stan.p > 88 && !zaladowane) { this.pause(); setTimeout(() => this.resume(), 120); return; }
      const v = Math.round(stan.p);
      if (licznik) licznik.textContent = v;
      if (kreska) kreska.style.setProperty('--postep', v / 100);
    },
    onComplete() {
      if (licznik) licznik.textContent = 100;
      setTimeout(schowaj, 150);
    },
  });

  /* awaryjnie: nigdy nie trzymaj loadera dłużej niż 4 s */
  setTimeout(schowaj, 4000);
})();

/* ---------- płynne przewijanie (tylko desktop) ---------- */
let lenis = null;
if (!mniejRuchu && !dotyk && typeof Lenis !== 'undefined') {
  /* krótszy czas i pełny mnożnik: dłuższe ustawienia czuć było jak opóźnienie kółka */
  lenis = new Lenis({ duration: 0.8, smoothWheel: true, wheelMultiplier: 1 });
  const klatka = (t) => { lenis.raf(t); requestAnimationFrame(klatka); };
  requestAnimationFrame(klatka);
}

/* kotwice działają z Lenis i bez niego */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const cel = document.querySelector(link.getAttribute('href'));
    if (!cel) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(cel, { offset: -64 });
    else cel.scrollIntoView({ behavior: mniejRuchu ? 'auto' : 'smooth' });
  });
});

/* ---------- pasek: tło po przewinięciu + chowanie przy scrollu w dół ---------- */
(() => {
  const pasek = document.getElementById('pasek');
  if (!pasek) return;
  let poprzedni = 0;
  const sprawdz = () => {
    const y = window.scrollY;
    pasek.classList.toggle('przyklejony', y > 40);
    /* chowaj dopiero głębiej niż jeden ekran, pokazuj przy każdym ruchu w górę */
    pasek.classList.toggle('schowany', y > innerHeight && y > poprzedni + 4);
    poprzedni = y;
  };
  sprawdz();
  window.addEventListener('scroll', sprawdz, { passive: true });
})();

/* ---------- pasek postępu czytania ---------- */
(() => {
  const postep = document.getElementById('postep');
  if (!postep) return;
  const licz = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    postep.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  licz();
  window.addEventListener('scroll', licz, { passive: true });
  window.addEventListener('resize', licz, { passive: true });
})();

/* ---------- własny kursor (tylko precyzyjny wskaźnik) ---------- */
(() => {
  if (dotyk || mniejRuchu) return;
  const kropka = document.getElementById('kursor');
  const obwod = document.getElementById('kursorObwod');
  if (!kropka || !obwod) return;
  document.documentElement.classList.add('js-kursor');

  let mx = innerWidth / 2, my = innerHeight / 2;
  let ox = mx, oy = my;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    kropka.style.left = mx + 'px';
    kropka.style.top = my + 'px';
  }, { passive: true });

  (function plyn() {
    ox += (mx - ox) * 0.16;
    oy += (my - oy) * 0.16;
    obwod.style.left = ox + 'px';
    obwod.style.top = oy + 'px';
    requestAnimationFrame(plyn);
  })();

  const rosnace = 'a, button, summary, [data-magnes], input, label.zgoda';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(rosnace)) obwod.classList.add('duzy');
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(rosnace)) obwod.classList.remove('duzy');
  });
})();

/* ---------- dzielenie nagłówków na litery ---------- */
function podzielNaLitery(el) {
  const tekst = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', tekst);
  const slowa = tekst.split(' ');
  slowa.forEach((slowo, i) => {
    const s = document.createElement('span');
    s.className = 'slowo';
    s.setAttribute('aria-hidden', 'true');
    [...slowo].forEach((znak) => {
      const l = document.createElement('span');
      l.className = 'litera';
      l.textContent = znak;
      s.appendChild(l);
    });
    el.appendChild(s);
    if (i < slowa.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

/* ---------- animacje scrollowe ---------- */
if (!maGsap || mniejRuchu) {
  document.querySelectorAll('.anim').forEach((el) => { el.style.opacity = '1'; });
} else {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }

  /* nagłówki: litery wjeżdżają spod linii */
  document.querySelectorAll('[data-litery]').forEach((linia) => {
    podzielNaLitery(linia);
    const litery = linia.querySelectorAll('.litera');
    gsap.set(litery, { yPercent: 112 });
    gsap.to(litery, {
      yPercent: 0,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.018,
      delay: parseFloat(linia.dataset.opoznienie || '0'),
      scrollTrigger: { trigger: linia, start: 'top 88%', once: true },
    });
  });

  /* zwykłe wejścia */
  const skad = { lewo: { x: -44, y: 0 }, prawo: { x: 44, y: 0 }, dol: { x: 0, y: 34 } };
  document.querySelectorAll('.anim').forEach((el) => {
    const k = skad[el.dataset.anim] || skad.dol;
    gsap.fromTo(el,
      { opacity: 0, x: k.x, y: k.y },
      {
        opacity: 1, x: 0, y: 0,
        duration: 0.85,
        delay: parseFloat(el.dataset.opoznienie || '0'),
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
  });

  /* odsłanianie zdjęć maską + delikatny zoom w środku */
  document.querySelectorAll('.odslona[data-maska]').forEach((fig) => {
    const img = fig.querySelector('img');
    const koniec = 'inset(0 0% 0 0)';
    gsap.to(fig, {
      clipPath: koniec,
      duration: 1.1,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
    });
    if (img) {
      gsap.fromTo(img, { scale: 1.18 }, {
        scale: 1,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: fig, start: 'top 85%', once: true },
      });
    }
  });

  /* zdjęcia tła jadą wolniej niż strona + hero z powolnym zbliżeniem */
  document.querySelectorAll('.ekran').forEach((sekcja) => {
    const foto = sekcja.querySelector('.ekran__foto');
    if (!foto) return;
    gsap.fromTo(foto,
      { yPercent: -6, scale: 1.12 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: sekcja, start: 'top bottom', end: 'bottom top', scrub: true },
      });
  });
  const heroFoto = document.getElementById('heroFoto');
  if (heroFoto) gsap.fromTo(heroFoto, { scale: 1.22 }, { scale: 1.12, duration: 2.6, ease: 'power2.out' });

  /* stos warstw: karta przykryta następną maleje i gaśnie */
  const kartyStosu = gsap.utils.toArray('.stos__karta');
  kartyStosu.forEach((karta, i) => {
    const nastepna = kartyStosu[i + 1];
    if (!nastepna) return;
    gsap.to(karta, {
      scale: 0.94,
      opacity: 0.45,
      ease: 'none',
      scrollTrigger: { trigger: nastepna, start: 'top bottom', end: 'top top', scrub: true },
    });
  });

  /* liczniki cen: dojeżdżają do wartości przy wejściu w kadr */
  document.querySelectorAll('.licznik[data-cel]').forEach((el) => {
    const cel = parseInt(el.dataset.cel, 10);
    if (!Number.isFinite(cel)) return;
    const stan = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter() {
        gsap.to(stan, {
          v: cel,
          duration: 1.3,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(stan.v); },
          onComplete: () => { el.textContent = cel; },
        });
      },
    });
  });

  /* etykiety sekcji: litery losują się i układają w słowo (jak we wzorcu Azurio) */
  document.querySelectorAll('[data-scramble]').forEach((el) => {
    const koncowy = el.textContent;
    const znaki = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=<>/';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter() {
        let klatka = 0;
        const ile = 16;
        const id = setInterval(() => {
          klatka++;
          const gotowe = Math.floor((klatka / ile) * koncowy.length);
          let s = '';
          for (let i = 0; i < koncowy.length; i++) {
            if (koncowy[i] === ' ' || i < gotowe) s += koncowy[i];
            else s += znaki[Math.floor(Math.random() * znaki.length)];
          }
          el.textContent = s;
          if (klatka >= ile) { el.textContent = koncowy; clearInterval(id); }
        }, 34);
      },
    });
  });

  /* pływające kadry w hero: każdy jedzie z inną prędkością */
  document.querySelectorAll('.hero__plywak').forEach((el, i) => {
    gsap.to(el, {
      yPercent: i === 0 ? -14 : 10,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  /* magnetyczne przyciski (desktop) */
  if (!dotyk) {
    document.querySelectorAll('[data-magnes]').forEach((el) => {
      const sila = 0.32;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * sila,
          y: (e.clientY - r.top - r.height / 2) * sila,
          duration: 0.35,
          ease: 'power2.out',
        });
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, .45)' });
      });
    });
  }
}

/* ---------- karuzela opinii ---------- */
(() => {
  const tor = document.getElementById('karuzela');
  const kropkiEl = document.getElementById('kropki');
  if (!tor || !kropkiEl) return;

  const slajdy = [...tor.querySelectorAll('.slajd')];
  slajdy.forEach((_, i) => {
    const k = document.createElement('span');
    k.className = 'karuzela__kropka' + (i === 0 ? ' aktywna' : '');
    kropkiEl.appendChild(k);
  });
  const kropki = [...kropkiEl.children];

  const szerokosc = () => slajdy[0].getBoundingClientRect().width + parseFloat(getComputedStyle(tor).gap || '20');
  const indeks = () => Math.min(slajdy.length - 1, Math.max(0, Math.round(tor.scrollLeft / szerokosc())));

  const odswiezKropki = () => {
    const i = indeks();
    kropki.forEach((k, j) => k.classList.toggle('aktywna', j === i));
  };
  tor.addEventListener('scroll', odswiezKropki, { passive: true });

  const przewin = (kier) => {
    const nast = indeks() + kier;
    const cel = Math.max(0, Math.min(slajdy.length - 1, nast));
    tor.scrollTo({ left: cel * szerokosc(), behavior: mniejRuchu ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('.karuzela__strzalka').forEach((b) => {
    b.addEventListener('click', () => przewin(parseInt(b.dataset.kier, 10)));
  });

  /* autoprzewijanie: kręci się samo, zatrzymuje przy każdym dotknięciu */
  if (!mniejRuchu) {
    let auto = setInterval(() => {
      const i = indeks();
      const cel = i >= slajdy.length - 1 ? 0 : i + 1;
      tor.scrollTo({ left: cel * szerokosc(), behavior: 'smooth' });
    }, 5500);
    const stop = () => { clearInterval(auto); auto = null; };
    ['pointerdown', 'wheel', 'touchstart', 'focusin'].forEach((zd) =>
      tor.addEventListener(zd, stop, { passive: true, once: true }));
    document.querySelectorAll('.karuzela__strzalka').forEach((b) =>
      b.addEventListener('click', stop, { once: true }));
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  }
})();

/* ---------- formularz ---------- */
(() => {
  const formularz = document.getElementById('formularz');
  if (!formularz) return;

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

  const sprawdz = () => {
    wyczyscBledy();
    let ok = true;

    if (formularz.elements.gabinet.value.trim().length < 2) { pokazBlad('gabinet', 'Podaj nazwę gabinetu.'); ok = false; }
    if (formularz.elements.miasto.value.trim().length < 2) { pokazBlad('miasto', 'Podaj miasto.'); ok = false; }

    const cyfry = formularz.elements.telefon.value.replace(/\D/g, '');
    if (cyfry.length < 9) { pokazBlad('telefon', 'Numer wygląda na za krótki. Podaj dziewięć cyfr.'); ok = false; }

    if (!formularz.elements.zgoda.checked) { pokazBlad('zgoda', 'Bez zgody nie możemy oddzwonić.'); ok = false; }

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

    /* pułapka na boty: ukryte pole i czas wypełnienia */
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
})();
