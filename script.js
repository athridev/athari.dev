/* ============================================================
   Athari.dev — interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    // Stagger siblings that enter together
    const io = new IntersectionObserver(
      (entries) => {
        let delay = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.setProperty("--d", `${delay}s`);
          entry.target.classList.add("in");
          io.unobserve(entry.target);
          delay += 0.08;
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    // Only hide elements now that the observer that will un-hide them is
    // guaranteed to run — so a failed/blocked script leaves content visible.
    revealEls.forEach((el) => {
      el.classList.add("js-armed");
      io.observe(el);
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* Subscribe form is now Athari Risala's embedded iframe (see the
     SUBSCRIBE section in index.html) — Risala handles its own submit
     flow, anti-bot token, and success state, so there's nothing to wire
     up here. */

  /* ---------- Progressive iframe auto-fit ---------- */
  /* Safe no-op unless Risala's embed posts its height. The static
     min-height in CSS is the reliable floor; this only ever grows the
     frame to fit taller states (region open, error line, success copy). */
  window.addEventListener("message", (e) => {
    if (e.origin !== "https://risala.athari.dev") return;
    const h = e.data && e.data.athariEmbedHeight;
    const frame = document.getElementById("subscribe-embed");
    if (frame && typeof h === "number" && h > 0) {
      frame.style.height = h + "px";
    }
  });
})();
