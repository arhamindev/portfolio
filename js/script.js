(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const roleTrack = document.querySelector(".role-track");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const orb = document.querySelector(".cursor-orb");

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // Lightweight custom cursor: follows with a subtle lag, only on fine pointers.
  if (window.matchMedia("(pointer: fine)").matches && orb && !prefersReducedMotion) {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let targetX = x, targetY = y;
    window.addEventListener("mousemove", event => {
      targetX = event.clientX;
      targetY = event.clientY;
      orb.style.opacity = "1";
      // Hide the native cursor only once the custom one is actually running.
      document.documentElement.classList.add("has-custom-cursor");
    });
    const renderCursor = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      orb.style.left = `${x}px`;
      orb.style.top = `${y}px`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();
    document.querySelectorAll("a, button").forEach(item => {
      item.addEventListener("mouseenter", () => orb.classList.add("is-active"));
      item.addEventListener("mouseleave", () => orb.classList.remove("is-active"));
    });
    document.addEventListener("mouseleave", () => orb.style.opacity = "0");
    document.addEventListener("mouseenter", () => orb.style.opacity = "1");
  }

  // If GSAP CDN is unavailable, the page remains readable and usable.
  if (typeof gsap === "undefined" || prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Slot-machine role text: the track moves one slot at a time and holds on every role.
  // The last item is a copy of the first, so jumping back to the top is invisible.
  const ROLE_HOLD = 2.5;   // seconds each role stays still (2-3s as requested)
  const ROLE_MOVE = 0.9;   // seconds for one smooth slide
  const roleSteps = roleTrack.children.length - 1;
  const roleTimeline = gsap.timeline({ repeat: -1 });
  for (let step = 1; step <= roleSteps; step++) {
    roleTimeline.to(roleTrack, {
      yPercent: -(100 / (roleSteps + 1)) * step,
      duration: ROLE_MOVE,
      ease: "power3.inOut"
    }, `+=${ROLE_HOLD}`);
  }
  roleTimeline.set(roleTrack, { yPercent: 0 });

  // Hero entrance choreography.
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline.from(".hero-topline span", { y: 12, opacity: 0, duration: .65, stagger: .12 })
    .from(".hero-copy-left .reveal", { y: 24, opacity: 0, duration: .8, stagger: .12 }, "-=.25")
    .from(".portrait-wrap", { y: 35, opacity: 0, scale: .97, duration: 1.15 }, "-=.7")
    .from(".hero-role, .hero-link", { y: 28, opacity: 0, duration: .85, stagger: .12 }, "-=.8")
    .from(".hero-bottomline span", { opacity: 0, duration: .55, stagger: .1 }, "-=.45");

  // Scroll-triggered reveals, staggered per section.
  gsap.utils.toArray(".section-pad .reveal, .service-row, .project-card, .work-note").forEach((element) => {
    gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: .8,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });

  gsap.to(".portrait-ring", {
    rotation: 22,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });
})();