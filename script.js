/* =========================================================
   MAISON KOREL — interactions
   Nav swap on scroll · mobile drawer · index filter · reveals.
   ========================================================= */

(() => {
  /* ------------------------------------------------------------------
     1. nav background swap (transparent over hero → paper after scroll)
  ------------------------------------------------------------------ */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    const past = window.scrollY > window.innerHeight * 0.82;
    nav.classList.toggle("is-solid", past);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     2. mobile drawer (hamburger menu)
     - open: body.menu-open, panel slides in, backdrop fades in
     - close: any [data-close], Esc, or backdrop click
     - traps focus into the panel while open
  ------------------------------------------------------------------ */
  const body      = document.body;
  const drawer    = document.getElementById("drawer");
  const openBtn   = document.getElementById("menuOpen");
  const closeBtn  = document.getElementById("menuClose");

  const setMenu = (open) => {
    body.classList.toggle("menu-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      const first = drawer.querySelector(".drawer__nav a");
      first && first.focus({ preventScroll: true });
    } else {
      openBtn.focus({ preventScroll: true });
    }
  };

  openBtn.addEventListener("click", () => setMenu(true));
  closeBtn.addEventListener("click", () => setMenu(false));

  // close on backdrop click, link click, or any [data-close]
  drawer.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) setMenu(false);
  });

  // Esc to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) setMenu(false);
  });

  // close if viewport grows past mobile (drawer is mobile-only)
  const mq = matchMedia("(min-width: 721px)");
  mq.addEventListener("change", (e) => {
    if (e.matches && body.classList.contains("menu-open")) setMenu(false);
  });

  /* ------------------------------------------------------------------
     3. index filter
     - All / Necklaces / Earrings / Cuffs / Rings
     - hides non-matching products with fade + collapse (is-hidden class)
     - announces count via aria-live
  ------------------------------------------------------------------ */
  const filterBar = document.querySelector(".s6__filter");
  const products  = Array.from(document.querySelectorAll(".s6__grid .product"));
  const countEl   = document.getElementById("s6Count");

  // english word for small counts — gallery feel ("four" not "4")
  const numberToWord = (n) => {
    const words = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen"];
    return words[n] ?? String(n);
  };

  const labelFor = (cat) => {
    if (cat === "all") return "pieces";
    // singular form for count of 1
    return cat === "necklaces" ? "necklace"
         : cat === "earrings"  ? "pair of earrings"
         : cat === "cuffs"     ? "cuff"
         : cat === "rings"     ? "ring"
         : "piece";
  };

  const pluralFor = (cat) => {
    if (cat === "all") return "pieces";
    return cat === "necklaces" ? "necklaces"
         : cat === "earrings"  ? "pairs of earrings"
         : cat === "cuffs"     ? "cuffs"
         : cat === "rings"     ? "rings"
         : "pieces";
  };

  const updateCount = (visible, cat) => {
    if (!countEl) return;
    if (visible === 0) {
      countEl.textContent = "No pieces in this edition.";
      return;
    }
    const word = numberToWord(visible);
    const noun = visible === 1 ? labelFor(cat) : pluralFor(cat);
    countEl.textContent =
      cat === "all"
        ? `Showing all ${word} ${noun}.`
        : `Showing ${word} ${noun}.`;
  };

  const FADE_MS = 280;
  let fadeTimer;

  const applyFilter = (cat) => {
    clearTimeout(fadeTimer);
    let visible = 0;

    // Step 1: reveal items that should show (drop display:none first
    // so transitions on opacity can run on the way in).
    products.forEach((p) => {
      const match = cat === "all" || p.dataset.cat === cat;
      if (match) {
        p.classList.remove("is-hidden");
        // force layout, then on next frame drop the fade class
        requestAnimationFrame(() => p.classList.remove("is-fading"));
        visible++;
      } else {
        p.classList.add("is-fading");
      }
    });

    // Step 2: after fade-out finishes, collapse the hidden ones.
    fadeTimer = setTimeout(() => {
      products.forEach((p) => {
        if (p.classList.contains("is-fading")) p.classList.add("is-hidden");
      });
    }, FADE_MS);

    updateCount(visible, cat);
  };

  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;

      filterBar.querySelectorAll("button").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      applyFilter(btn.dataset.filter);
    });

    // initial count
    applyFilter("all");
  }

  /* ------------------------------------------------------------------
     4. progressive-enhancement reveal (subtle fade-up on intersect)
     Content is always visible without JS; this only animates new
     entries as they scroll into view.
  ------------------------------------------------------------------ */
  const supportsIO = "IntersectionObserver" in window;
  const reduced    = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (supportsIO && !reduced) {
    const targets = document.querySelectorAll(".product, .s3__card, .s5__side-meta");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 700, easing: "ease", fill: "both" }
          );
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach((el) => io.observe(el));
  }
})();
