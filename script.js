/* =========================================================
   MAISON KOREL — interactions
   Quiet by design: nav swap, filter pills, fade-up reveals,
   smooth anchor scroll.
   ========================================================= */

(() => {
  const nav = document.getElementById("nav");

  // -- 1. nav: transparent over hero → solid after scroll ----
  const onScroll = () => {
    const past = window.scrollY > window.innerHeight * 0.82;
    nav.classList.toggle("is-solid", past);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // -- 2. subtle fade-up reveal on scroll --------------------
  // Pure progressive enhancement: only attaches if scroll happens
  // and motion is allowed. Content is always visible without JS.
  const supportsIO = "IntersectionObserver" in window;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (supportsIO && !reduced) {
    const targets = document.querySelectorAll(
      ".product, .s3__card, .s5__side-meta"
    );
    targets.forEach(el => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    });

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 700, easing: "ease", fill: "both" }
          );
          io.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );
    targets.forEach(el => io.observe(el));
  }

  // -- 3. index filter pills ---------------------------------
  const filterBar = document.querySelector(".s6__filter");
  const products = document.querySelectorAll(".s6__grid .product");

  if (filterBar) {
    filterBar.addEventListener("click", e => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      filterBar.querySelectorAll("button").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.filter;
      products.forEach(p => {
        const match = cat === "all" || p.dataset.cat === cat;
        p.style.transition = "opacity 0.25s ease";
        p.style.opacity = match ? "1" : "0.18";
        p.style.pointerEvents = match ? "" : "none";
      });
    });
  }

  // -- 4. mobile menu (placeholder open/close) ---------------
  const menuBtn = document.querySelector(".nav__menu");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      // graceful: scroll to a destination if center nav is hidden
      const target = document.querySelector("#index");
      target && target.scrollIntoView({ behavior: "smooth" });
    });
  }
})();
