/* =========================================================================
   Peter's Projects · app.js  (vanilla, no build, no chart lib)

   A single long page assembled at runtime from the flat data layer:

     window.SITE_META       -> { title:{zh,en}, subtitle:{zh,en}, url, github }
     window.SITE_CATEGORIES -> [ { key, zh, en, icon, accent } ]   (ordered)
     window.SITE_DATA       -> [ { id, category, title:{zh,en}, desc:{zh,en}, created, url } ]

   buildSections() turns that into an ordered list of typed section-blocks
   (hero -> one cards section per non-empty category -> cta). app.js then has a
   SECTION-TYPE REGISTRY (one renderer per `type`) and paints each block in
   order into <main>. A single render() call repaints EVERY section + nav +
   chrome + <title> in the active language, so the zh/en toggle never leaves
   anything stuck. Cards are external links to each project's GitHub Pages site.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var META = window.SITE_META || { title: {}, subtitle: {} };
  var CATEGORIES = Array.isArray(window.SITE_CATEGORIES) ? window.SITE_CATEGORIES : [];
  var DATA = Array.isArray(window.SITE_DATA) ? window.SITE_DATA : [];

  /* ---------- i18n strings (UI chrome only) ---------- */
  var I18N = {
    zh: {
      footer: "© 2026 Peter · 持續整理更新中",
      menu: "本頁導覽",
      projects: "個專案",
    },
    en: {
      footer: "© 2026 Peter · Always curating",
      menu: "On this page",
      projects: "projects",
    },
  };

  /* ---------- safe localStorage (sandbox / file:// may throw) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- GA4 analytics: one safe wrapper for every click ----------
     gtag() is loaded in index.html. It may be missing (ad-blockers, file://,
     offline) — so we guard every call and never let analytics throw into the
     UI. Each event ships rich, snake_case params; register them as Custom
     Dimensions in GA4 Admin to see them broken down in reports. */
  function track(name, params) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    } catch (e) { /* analytics must never break the page */ }
  }
  /* GA4 user properties — sticky per-user dims (set once with the INITIAL
     language/theme so every event can be segmented by the visitor's default). */
  function trackUserProps(props) {
    try {
      if (typeof window.gtag === "function") window.gtag("set", "user_properties", props || {});
    } catch (e) { /* analytics must never break the page */ }
  }

  /* ---------- global state ---------- */
  var state = {
    lang:  lsGet("lang")  || "zh",       // default language: zh
    theme: lsGet("theme") || "light",
  };

  /* ---------- dom refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var sectionsEl = $("sections");
  var navInner   = $("sectionNavInner");

  /* ---------- helpers ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function r(n) { return Math.round(n * 100) / 100; }

  /* =======================================================================
     BUILD SECTIONS — flat data -> ordered typed blocks
     ===================================================================== */
  function buildSections() {
    var sections = [];

    /* hero with computed stats */
    var catsWithItems = CATEGORIES.filter(function (c) {
      return DATA.some(function (d) { return d.category === c.key; });
    });
    sections.push({
      type: "hero",
      id: "overview",
      navIcon: "auto_awesome",
      title: META.title,
      subtitle: META.subtitle,
      stats: [
        { label: { zh: "專案", en: "Projects" }, value: DATA.length },
        { label: { zh: "分類", en: "Categories" }, value: catsWithItems.length },
      ],
    });

    /* one cards section per non-empty category, in declared order */
    catsWithItems.forEach(function (cat) {
      var items = DATA.filter(function (d) { return d.category === cat.key; });
      sections.push({
        type: "cards",
        id: "cat-" + cat.key,
        key: cat.key,
        navIcon: cat.icon || "grid_view",
        accent: cat.accent,
        title: { zh: cat.zh, en: cat.en },
        count: items.length,
        items: items,
      });
    });

    return sections;
  }

  var SECTIONS = buildSections();

  /* a shared <header class="section-head"> for every section */
  function sectionHead(sec, extra) {
    var sub = (extra || t(sec.subtitle))
      ? '<p class="section-head__sub">' + escapeHtml(extra || t(sec.subtitle)) + "</p>"
      : "";
    return '<header class="section-head">' +
      '<h2 id="' + escapeHtml(sec.id) + '-heading">' + escapeHtml(t(sec.title)) + "</h2>" +
      sub + "</header>";
  }

  /* =======================================================================
     SECTION-TYPE REGISTRY
     ===================================================================== */
  var RENDERERS = {

    /* ---- hero: lead-in + animated stat counters ---- */
    hero: function (sec) {
      var stats = (sec.stats || []).map(function (s) {
        return '<div class="hero__stat" data-item>' +
          '<b class="hero__stat-value" data-count="' + escapeHtml(String(s.value)) + '">0</b>' +
          '<span class="hero__stat-label">' + escapeHtml(t(s.label)) + "</span>" +
        "</div>";
      }).join("");
      return sectionHead(sec) +
        (stats ? '<div class="hero__stats">' + stats + "</div>" : "");
    },

    /* ---- cards: responsive grid of EXTERNAL links (one per project) ---- */
    cards: function (sec) {
      var sub = sec.count + " " + ui("projects");
      var cards = (sec.items || []).map(function (item) {
        return '<a class="card card--link" data-item ' +
            'data-pid="' + escapeHtml(item.id) + '" ' +
            'data-cat="' + escapeHtml(sec.key) + '" ' +
            'data-cat-name="' + escapeHtml(sec.title.en) + '" ' +
            'data-name="' + escapeHtml(item.title.en || item.title.zh || item.id) + '" ' +
            'href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener" ' +
            'aria-label="' + escapeHtml(t(item.title)) + '">' +
          '<div class="card__top">' +
            '<h3 class="card__title">' + escapeHtml(t(item.title)) + "</h3>" +
            '<span class="material-symbols-rounded card__go" aria-hidden="true">arrow_outward</span>' +
          "</div>" +
          '<p class="card__summary">' + escapeHtml(t(item.desc)) + "</p>" +
        "</a>";
      }).join("");
      return sectionHead(sec, sub) + '<div class="grid">' + cards + "</div>";
    },
  };

  /* =======================================================================
     RENDER: paint nav + every section in the active language
     ===================================================================== */
  function paintSections() {
    sectionsEl.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var fn = RENDERERS[sec.type];
      if (!fn) return;                       // unknown type: skip gracefully
      var el = document.createElement("section");
      el.className = "section section--" + sec.type;
      el.id = sec.id;
      if (sec.accent) el.style.setProperty("--accent", sec.accent);
      if (sec.type !== "cta") el.setAttribute("aria-labelledby", sec.id + "-heading");
      el.innerHTML = fn(sec, state.lang);
      sectionsEl.appendChild(el);
    });
  }

  function paintNav() {
    navInner.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var a = document.createElement("a");
      a.className = "navpill";
      a.href = "#" + sec.id;
      a.dataset.target = sec.id;
      if (sec.accent) a.style.setProperty("--accent", sec.accent);
      a.innerHTML =
        '<span class="material-symbols-rounded" aria-hidden="true">' +
          (sec.navIcon || "label") + "</span>" +
        "<span>" + escapeHtml(t(sec.title)) + "</span>";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        track("nav_click", {
          section_id: sec.id,
          section_name: (sec.title && sec.title.en) || (sec.title && sec.title.zh) || sec.id,
          language: state.lang,
        });
        var target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + sec.id);
      });
      navInner.appendChild(a);
    });
  }

  function paintChrome() {
    document.documentElement.setAttribute("lang", state.lang);
    var titleStr = t(META.title);
    var subStr = t(META.subtitle);
    document.title = subStr ? titleStr + " · " + subStr : titleStr;
    var brand = $("brandName");
    if (brand) brand.textContent = titleStr;
    var foot = $("footerText");
    if (foot) foot.textContent = ui("footer");
    var nav = $("sectionNav");
    if (nav) nav.setAttribute("aria-label", ui("menu"));
  }

  /* full-page repaint — used on load AND on every language switch */
  function render() {
    paintChrome();
    paintNav();
    paintSections();
    setupScrollSpy();
    setupSectionViews();      // GA4: fire section_view once per section
    setupCardImpressions();   // GA4: fire card_impression once per card
    animateCounters();
  }

  /* =======================================================================
     HERO COUNT-UP — animate when each counter scrolls into view
     ===================================================================== */
  function animateCounters() {
    var els = [].slice.call(document.querySelectorAll(".hero__stat-value[data-count]"));
    if (!els.length) return;

    function run(el) {
      if (el.dataset.done === "1") return;
      el.dataset.done = "1";
      var target = parseFloat(el.dataset.count) || 0;
      var dur = 1100, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);              // easeOutCubic
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =======================================================================
     SCROLLSPY — highlight the active section's nav pill
     ===================================================================== */
  var spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) { spyObserver.disconnect(); spyObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    var pills = {};
    [].forEach.call(navInner.children, function (a) { pills[a.dataset.target] = a; });

    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var pill = pills[en.target.id];
        if (!pill) return;
        if (en.isIntersecting) {
          [].forEach.call(navInner.children, function (p) {
            p.classList.remove("navpill--active");
            p.removeAttribute("aria-current");
          });
          pill.classList.add("navpill--active");
          pill.setAttribute("aria-current", "true");
          if (pill.scrollIntoView) {
            pill.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    SECTIONS.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (el) spyObserver.observe(el);
    });
  }

  /* =======================================================================
     GA4 VIEWABILITY — section_view + card_impression (each fires ONCE)

     render() recreates the DOM on every language switch, so the observers are
     rebuilt each time. The `seen*` maps live at module scope (NOT inside the
     functions) so an already-counted section/card is never re-fired after a
     repaint — counts stay honest, and card_impression ÷ project_click = CTR.
     ===================================================================== */
  var seenSections = {};
  var sectionViewObserver = null;
  function setupSectionViews() {
    if (sectionViewObserver) { sectionViewObserver.disconnect(); sectionViewObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    sectionViewObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        sectionViewObserver.unobserve(en.target);
        if (seenSections[id]) return;
        seenSections[id] = true;
        var sec = SECTIONS.filter(function (s) { return s.id === id; })[0];
        track("section_view", {
          section_id: id,
          section_name: sec ? ((sec.title && (sec.title.en || sec.title.zh)) || id) : id,
          language: state.lang,
        });
      });
    }, { threshold: 0 });          // fires as soon as any part scrolls into view
    SECTIONS.forEach(function (sec) {
      if (seenSections[sec.id]) return;
      var el = document.getElementById(sec.id);
      if (el) sectionViewObserver.observe(el);
    });
  }

  var seenCards = {};
  var cardObserver = null;
  function setupCardImpressions() {
    if (cardObserver) { cardObserver.disconnect(); cardObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var card = en.target, pid = card.dataset.pid || "";
        cardObserver.unobserve(card);
        if (!pid || seenCards[pid]) return;
        seenCards[pid] = true;
        track("card_impression", {
          project_id:    pid,
          project_name:  card.dataset.name || "",
          category:      card.dataset.cat || "",
          category_name: card.dataset.catName || "",
          language:      state.lang,
        });
      });
    }, { threshold: 0.5 });        // half the card visible = a real impression
    [].forEach.call(document.querySelectorAll(".card--link"), function (card) {
      var pid = card.dataset.pid || "";
      if (pid && seenCards[pid]) return;
      cardObserver.observe(card);
    });
  }

  /* =======================================================================
     THEME + LANG
     ===================================================================== */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = $("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    lsSet("theme", state.theme);
  }
  function applyLangChrome() {
    var label = $("langLabel");
    if (label) label.textContent = state.lang === "en" ? "EN" : "中";
    lsSet("lang", state.lang);
  }

  /* =======================================================================
     WIRING
     ===================================================================== */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme();
      track("toggle_theme", { theme: state.theme });
    });

    $("langToggle").addEventListener("click", function () {
      state.lang = state.lang === "en" ? "zh" : "en";
      applyLangChrome();
      track("toggle_language", { language: state.lang });
      render();                       // repaint EVERYTHING in the new language
    });

    /* project cards: ONE delegated listener on the persistent <main> survives
       every language repaint. Records exactly which project each visitor opens. */
    sectionsEl.addEventListener("click", function (e) {
      var card = e.target.closest && e.target.closest(".card--link");
      if (!card) return;
      track("project_click", {
        project_id:    card.dataset.pid || "",
        project_name:  card.dataset.name || "",
        category:      card.dataset.cat || "",
        category_name: card.dataset.catName || "",
        link_url:      card.getAttribute("href") || "",
        language:      state.lang,
      });
    });

    /* footer social links + brand/logo */
    [].forEach.call(document.querySelectorAll(".footer__social a"), function (link) {
      link.addEventListener("click", function () {
        track("social_click", {
          network:  (link.getAttribute("aria-label") || "social").toLowerCase(),
          link_url: link.getAttribute("href") || "",
          language: state.lang,
        });
      });
    });
    var brandLink = document.querySelector(".brand");
    if (brandLink) brandLink.addEventListener("click", function () {
      track("brand_click", { language: state.lang });
    });
  }

  /* =======================================================================
     INIT
     ===================================================================== */
  function init() {
    applyTheme();
    applyLangChrome();
    trackUserProps({ ui_language: state.lang, ui_theme: state.theme });  // initial prefs
    render();
    wire();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
