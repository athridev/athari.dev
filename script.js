/* ============================================================
   Athari.dev — interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Newsletter form backend ----------
     Frontend-only for now. To go live, set FORM_ENDPOINT to a
     Formspree/Beehiiv/ConvertKit/serverless endpoint that accepts
     a JSON POST of { name, email, role, interest }, e.g.:
       const FORM_ENDPOINT = "https://formspree.io/f/YOUR_ID";
  */
  const FORM_ENDPOINT = "";

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
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Form handling ---------- */
  const form = document.getElementById("subscribe-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");
  const btnLabel = submitBtn.querySelector(".btn-label");

  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    submitBtn.disabled = true;
    btnLabel.textContent = "Joining…";
    setStatus("");

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // No backend connected yet — keep the signup locally so early
        // submissions aren't lost, and behave like a successful join.
        const key = "athari-signups";
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        saved.push({ ...data, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(saved));
        await new Promise((r) => setTimeout(r, 700));
      }

      form.reset();
      btnLabel.textContent = "You're in";
      setStatus(`Welcome to Athari, ${data.name.split(" ")[0]}. The first issue is on its way.`, "ok");
      setTimeout(() => {
        btnLabel.textContent = "Join the newsletter";
        submitBtn.disabled = false;
      }, 4000);
    } catch (err) {
      btnLabel.textContent = "Join the newsletter";
      submitBtn.disabled = false;
      setStatus("Something went wrong — please try again.", "err");
    }
  });
})();
