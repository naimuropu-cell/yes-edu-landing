/**
 * YES EDU — Complete Education Management System & Campus OS
 * Unified Scripting Engine
 */

(function () {
  "use strict";

  // State
  let currentLang = localStorage.getItem("yes_edu_lang") || "en";
  let isAnnualBilling = false;
  let studentCount = 500;
  let activeHeroRole = "admin";
  let activeInstitution = "general";
  let renderHeroRole;
  let updateInstitutionFeature;

  // Role showcase data (bilingual)
  const roleData = {
    admin: {
      en: {
        title: "Institution Overview & Control",
        chip: "ADMIN VIEW",
        labels: ["Active Students", "Today Attendance", "Campus Status"],
        values: ["2,480", "96.8%", "Live & Active"],
        desc: "A consolidated 360° cockpit of institutional operations, biometric logs, staff attendance and real-time revenue collection shaped by strict administrative permissions."
      },
      bn: {
        title: "প্রাতিষ্ঠানিক সার্বিক নিয়ন্ত্রণ ও ড্যাশবোর্ড",
        chip: "প্রশাসনিক ভিউ",
        labels: ["বর্তমান শিক্ষার্থী", "আজকের উপস্থিতি", "ক্যাম্পাস স্ট্যাটাস"],
        values: ["২,৪৮০", "৯৬.৮%", "সচল ও সক্রিয়"],
        desc: "বায়োমেট্রিক উপস্থিতি, শিক্ষক-স্টাফ হাজিরা এবং ফি আদায়ের সার্বিক চিত্র এক নজরে দেখার জন্য আধুনিক প্রশাসনিক নিয়ন্ত্রণ ড্যাশবোর্ড।"
      }
    },
    teacher: {
      en: {
        title: "Teacher Workspace & Class Hub",
        chip: "TEACHER VIEW",
        labels: ["Assigned Classes", "Attendance Taken", "Pending Tasks"],
        values: ["06", "28 / 30", "Ready"],
        desc: "A focused daily workflow hub for lesson plans, instant 1-tap mobile attendance, grading rubrics, NCTB syllabus and student performance notes."
      },
      bn: {
        title: "শিক্ষক ওয়ার্কস্পেস ও ক্লাসরুম হাব",
        chip: "শিক্ষক ভিউ",
        labels: ["বরাদ্দকৃত ক্লাস", "উপস্থিতি গৃহীত", "আজকের করণীয়"],
        values: ["০৬", "২৮ / ৩০", "সম্পন্ন"],
        desc: "প্রতিদিনের ক্লাসরুটিন, মোবাইল অ্যাপে হাজিরা গ্রহণ, পরীক্ষার নম্বর প্রদান এবং এনসিটিবি পাঠপরিকল্পনা তৈরির সহজ সমাধান।"
      }
    },
    parent: {
      en: {
        title: "Parent Portal & Child Safety",
        chip: "PARENT VIEW",
        labels: ["Attendance Rate", "Latest Exam", "Institutional Notices"],
        values: ["98.2%", "GPA 5.00", "03 New"],
        desc: "Real-time gate punch SMS notifications, instant bKash/Nagad 1-tap fee payments, digital report cards, and direct secure messaging with class teachers."
      },
      bn: {
        title: "অভিভাবক পোর্টাল ও নিরাপত্তা ট্র্যাকিং",
        chip: "অভিভাবক ভিউ",
        labels: ["উপস্থিতির হার", "সর্বশেষ ফলাফল", "স্কুল নোটিশ"],
        values: ["৯৮.২%", "জিপিএ ৫.০০", "০৩টি নতুন"],
        desc: "গেটে কার্ড পাঞ্চের সাথে সাথে এসএমএস নোটিফিকেশন, ১-ট্যাপে বিকাশ ফি প্রদান, ডিজিটাল রিপোর্ট কার্ড এবং শিক্ষকদের সাথে সরাসরি যোগাযোগ।"
      }
    },
    accounts: {
      en: {
        title: "Finance, Fees & Audit Ledger",
        chip: "ACCOUNTS VIEW",
        labels: ["Today Collection", "Total Dues", "Daily Vouchers"],
        values: ["৳ 4.82L", "৳ 62.5K", "128 Verified"],
        desc: "Automated double-entry cash book, multi-gateway digital fee reconciliation (bKash, Nagad, Sonali Bank), scholarship waivers and automated Waqf/Zakat fund accounting."
      },
      bn: {
        title: "হিসাবরক্ষণ, ফি কালেকশন ও অডিট খতিয়ান",
        chip: "হিসাবরক্ষণ ভিউ",
        labels: ["আজকের আদায়", "মোট বকেয়া", "দৈনিক ভাউচার"],
        values: ["৳ ৪.৮২ লাখ", "৳ ৬২.৫ হাজার", "১২৮টি ভেরিফাইড"],
        desc: "স্বয়ংক্রিয় ডাবল-এন্ট্রি ক্যাশবুক, বিকাশ-নগদ ফি অটো-রিকনসিলিয়েশন, বেতন-ভাতা প্রদান এবং ওয়াকফ-দান ফান্ডের স্বচ্ছ আর্থিক হিসাব।"
      }
    }
  };

  function toBengaliNumber(num) {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num).replace(/\d/g, (d) => bengaliDigits[d]);
  }

  // 1. Language Engine
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("yes_edu_lang", lang);

    const enElements = document.querySelectorAll(".lang-en");
    const bnElements = document.querySelectorAll(".lang-bn");

    if (lang === "bn") {
      document.body.classList.add("lang-bn-active");
      enElements.forEach((el) => el.classList.add("hidden"));
      bnElements.forEach((el) => el.classList.remove("hidden"));
    } else {
      document.body.classList.remove("lang-bn-active");
      enElements.forEach((el) => el.classList.remove("hidden"));
      bnElements.forEach((el) => el.classList.add("hidden"));
    }

    // Update toggle button states
    document.querySelectorAll(".lang-opt").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === lang);
    });

    // Sync active role preview
    const activeTab = document.querySelector(".role-tab.active");
    if (activeTab) {
      updateRolePreview(activeTab.dataset.role);
    }

    // Sync pricing display
    updatePricingCalculator();

    // Sync hero multi-role cockpit display
    if (typeof renderHeroRole === "function") {
      renderHeroRole(activeHeroRole);
    }

    // Sync institution segmenter feature text
    if (typeof updateInstitutionFeature === "function") {
      updateInstitutionFeature(activeInstitution);
    }
  }

  function initLanguageSwitcher() {
    const toggleBtn = document.getElementById("langToggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        applyLanguage(currentLang === "en" ? "bn" : "en");
      });
    }

    document.querySelectorAll(".lang-opt").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        applyLanguage(opt.dataset.lang);
      });
    });

    // Apply stored language on initial boot
    applyLanguage(currentLang);
  }

  // 2. Navigation & Sticky Header
  function initNavbar() {
    const header = document.getElementById("mainHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    window.addEventListener("scroll", () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
      }
    });

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  }

  // 3. Scroll Reveal Animations
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  // 4. Role Showcase Switcher
  function updateRolePreview(roleKey) {
    const d = roleData[roleKey] ? roleData[roleKey][currentLang] : null;
    if (!d) return;

    const roleTitle = document.getElementById("roleTitle");
    const roleChip = document.getElementById("roleChip");
    const roleDesc = document.getElementById("roleDescription");

    if (roleTitle) roleTitle.textContent = d.title;
    if (roleChip) roleChip.textContent = d.chip;
    if (roleDesc) roleDesc.textContent = d.desc;

    ["One", "Two", "Three"].forEach((name, i) => {
      const lbl = document.getElementById("metric" + name + "Label");
      const val = document.getElementById("metric" + name);
      if (lbl && d.labels[i]) lbl.textContent = d.labels[i];
      if (val && d.values[i]) val.textContent = d.values[i];
    });
  }

  function initRoleShowcase() {
    const tabs = document.querySelectorAll(".role-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("active", isActive);
          t.setAttribute("aria-selected", isActive ? "true" : "false");
        });
        updateRolePreview(tab.dataset.role);
      });
    });
  }

  // 5. Interactive Enterprise Campus OS Studio (Segmented Tab Controller & Mobile Story Slider)
  function initDemoStudio() {
    let currentTab = 0;
    const tabs = Array.from(document.querySelectorAll(".studio-tab"));
    const panels = Array.from(document.querySelectorAll(".studio-panel"));
    const storySegs = Array.from(document.querySelectorAll(".story-seg"));
    const storyCurrentStep = document.getElementById("storyCurrentStep");
    const viewport = document.querySelector(".studio-viewport");
    const prevBtn = document.getElementById("storyPrevBtn");
    const nextBtn = document.getElementById("storyNextBtn");
    const container = document.getElementById("demoStudio");
    const totalTabs = tabs.length;

    if (totalTabs === 0 || panels.length === 0) return;

    let isAutoPlaying = true;
    let isUserInteracting = false;
    let autoTimer = null;
    let progressPercentage = 0;
    const slideDuration = 7500; // 7.5 seconds per slide
    const tickInterval = 60; // 60ms tick for smooth progress

    function activateTab(index, userInitiated = false, direction = "next") {
      if (index < 0) index = totalTabs - 1;
      if (index >= totalTabs) index = 0;
      currentTab = index;

      // Update Desktop Tabs
      tabs.forEach((tab, idx) => {
        const isActive = idx === currentTab;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");

        const fill = tab.querySelector(".tab-indicator-fill");
        if (fill) {
          fill.style.width = "0%";
          fill.style.transition = "none";
        }

        if (isActive && userInitiated) {
          tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      });

      // Update Mobile Story Progress Segments
      storySegs.forEach((seg, idx) => {
        const fill = seg.querySelector(".story-seg-fill");
        if (!fill) return;
        if (idx < currentTab) {
          fill.style.width = "100%";
          fill.style.transition = "width 0.25s ease";
        } else if (idx === currentTab) {
          fill.style.width = "0%";
          fill.style.transition = "none";
        } else {
          fill.style.width = "0%";
          fill.style.transition = "none";
        }
      });

      // Update Mobile Step Counter
      if (storyCurrentStep) {
        storyCurrentStep.textContent = (currentTab + 1).toString();
      }

      // Update Studio Panels with directional animation
      const animClass = direction === "prev" ? "slide-prev" : "slide-next";
      panels.forEach((panel, idx) => {
        const isActive = idx === currentTab;
        panel.classList.remove("slide-next", "slide-prev");
        if (isActive) {
          panel.classList.add("active");
          panel.setAttribute("aria-hidden", "false");
          panel.classList.add(animClass);
        } else {
          panel.classList.remove("active");
          panel.setAttribute("aria-hidden", "true");
        }
      });

      progressPercentage = 0;
    }

    function startTimer() {
      stopTimer();
      autoTimer = setInterval(() => {
        if (!isAutoPlaying || isUserInteracting) return;

        progressPercentage += (tickInterval / slideDuration) * 100;
        const boundedPct = Math.min(progressPercentage, 100);

        // Update Desktop Tab Indicator
        const activeTab = tabs[currentTab];
        if (activeTab) {
          const fill = activeTab.querySelector(".tab-indicator-fill");
          if (fill) fill.style.width = boundedPct + "%";
        }

        // Update Mobile Story Segment Fill
        const activeSeg = storySegs[currentTab];
        if (activeSeg) {
          const fill = activeSeg.querySelector(".story-seg-fill");
          if (fill) fill.style.width = boundedPct + "%";
        }

        if (progressPercentage >= 100) {
          progressPercentage = 0;
          activateTab(currentTab + 1, false, "next");
        }
      }, tickInterval);
    }

    function stopTimer() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Desktop Tab Click & Keyboard Arrow Navigation
    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => {
        const dir = idx >= currentTab ? "next" : "prev";
        activateTab(idx, true, dir);
        startTimer();
      });

      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          activateTab(currentTab + 1, true, "next");
          tabs[currentTab].focus();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          activateTab(currentTab - 1, true, "prev");
          tabs[currentTab].focus();
        }
      });
    });

    // Story Segments Click (Jump directly to slide)
    storySegs.forEach((seg, idx) => {
      seg.addEventListener("click", () => {
        const dir = idx >= currentTab ? "next" : "prev";
        activateTab(idx, true, dir);
        startTimer();
      });
    });

    // Mobile Story Prev / Next Buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        activateTab(currentTab - 1, true, "prev");
        startTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        activateTab(currentTab + 1, true, "next");
        startTimer();
      });
    }

    // Touch Swipe Gesture Detection on Viewport (Story Card Slider)
    if (viewport) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      viewport.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
          isUserInteracting = true; // Pause auto-slide while holding
        }
      }, { passive: true });

      viewport.addEventListener("touchend", (e) => {
        setTimeout(() => { isUserInteracting = false; }, 3500);

        if (e.changedTouches && e.changedTouches.length === 1) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          const elapsed = Date.now() - touchStartTime;

          // Detect genuine horizontal swipe (>40px, mostly horizontal, within 700ms)
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.2 && elapsed < 700) {
            if (diffX < 0) {
              // Swiped left -> Next
              activateTab(currentTab + 1, true, "next");
            } else {
              // Swiped right -> Previous
              activateTab(currentTab - 1, true, "prev");
            }
            startTimer();
          }
        }
      }, { passive: true });
    }

    // Pause on desktop mouse hover
    if (container) {
      container.addEventListener("mouseenter", () => {
        isUserInteracting = true;
      });
      container.addEventListener("mouseleave", () => {
        isUserInteracting = false;
      });
    }

    activateTab(0, false, "next");
    startTimer();
  }

  // 6. Interactive Pricing Calculator
  function updatePricingCalculator() {
    const slider = document.getElementById("studentSlider");
    const countDisplay = document.getElementById("studentCountDisplay");
    const starterTotalEl = document.getElementById("starterTotal");
    const proTotalEl = document.getElementById("proTotal");
    const enterpriseTotalEl = document.getElementById("enterpriseTotal");

    if (slider) studentCount = parseInt(slider.value, 10);

    const discountMultiplier = isAnnualBilling ? 0.85 : 1.0;
    const starterRate = 5 * discountMultiplier;
    const proRate = 8 * discountMultiplier;
    const enterpriseRate = 12 * discountMultiplier;

    const starterTotal = Math.round(studentCount * starterRate);
    const proTotal = Math.round(studentCount * proRate);
    const enterpriseTotal = Math.round(studentCount * enterpriseRate);

    if (countDisplay) {
      countDisplay.textContent =
        currentLang === "bn"
          ? `${toBengaliNumber(studentCount)} শিক্ষার্থী`
          : `${studentCount.toLocaleString()} Students`;
    }

    if (starterTotalEl) {
      starterTotalEl.textContent =
        currentLang === "bn"
          ? `মাসিক আনুমানিক ৳${toBengaliNumber(starterTotal.toLocaleString())}`
          : `Est. ৳${starterTotal.toLocaleString()} / month`;
    }

    if (proTotalEl) {
      proTotalEl.textContent =
        currentLang === "bn"
          ? `মাসিক আনুমানিক ৳${toBengaliNumber(proTotal.toLocaleString())}`
          : `Est. ৳${proTotal.toLocaleString()} / month`;
    }

    if (enterpriseTotalEl) {
      enterpriseTotalEl.textContent =
        currentLang === "bn"
          ? `মাসিক আনুমানিক ৳${toBengaliNumber(enterpriseTotal.toLocaleString())}`
          : `Est. ৳${enterpriseTotal.toLocaleString()} / month`;
    }
  }

  function initPricingCalculator() {
    const slider = document.getElementById("studentSlider");
    const billingSwitch = document.getElementById("billingSwitch");

    if (slider) {
      slider.addEventListener("input", () => {
        studentCount = parseInt(slider.value, 10);
        updatePricingCalculator();
      });
    }

    if (billingSwitch) {
      billingSwitch.addEventListener("click", () => {
        isAnnualBilling = !isAnnualBilling;
        billingSwitch.classList.toggle("annual", isAnnualBilling);
        updatePricingCalculator();
      });
    }

    updatePricingCalculator();
  }

  // 7. Demo Consultation Modal
  function showToast(msg) {
    const toast = document.getElementById("toastNotice");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3800);
  }

  function initDemoModal() {
    const modal = document.getElementById("demoModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("demoBookingForm");

    function openModal() {
      if (modal) modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      if (modal) modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".open-demo-modal").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector("button[type=\"submit\"]");
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = currentLang === "bn" ? "প্রক্রিয়াকরণ হচ্ছে..." : "Submitting...";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          form.reset();
          closeModal();
          showToast(
            currentLang === "bn"
              ? "ধন্যবাদ! আপনার ডেমো অনুরোধ গৃহীত হয়েছে। আমাদের টিম খুব শীঘ্রই যোগাযোগ করবে।"
              : "Thank you! Your demo request has been received. Our team will contact you shortly."
          );
        }, 800);
      });
    }
  }

  // 8. Floating Action Hub (WhatsApp & Scroll Up)
  function initFloatingActions() {
    const scrollUpBtn = document.getElementById("btnScrollUpMini");

    if (scrollUpBtn) {
      window.addEventListener("scroll", () => {
        scrollUpBtn.style.opacity = window.scrollY > 300 ? "1" : "0.3";
        scrollUpBtn.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
      });

      scrollUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }

    // Set dynamic current year in footer
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Hero Multi-Role Slider & Data Synchronization Engine (Option 3)
  // ==========================================================================
  const HERO_ROLES = {
    admin: {
      roleTitle: { en: "/ Super Admin Cockpit", bn: "/ সুপার অ্যাডমিন ককপিট" },
      status: { en: "Live • 2026", bn: "লাইভ • ২০২৬" },
      float1: {
        ico: "✓",
        title: { en: "Attendance Today", bn: "আজকের উপস্থিতি" },
        stat: "97%",
        sub: { en: "Live Biometric • 115 Present", bn: "বায়োমেট্রিক • ১১৫ জন উপস্থিত" }
      },
      float2: {
        ico: "৳",
        title: { en: "Today's Collection", bn: "আজকের ফি আদায়" },
        stat: "৳ 6,350.00",
        sub: { en: "bKash, Nagad & Cash Reconciled", bn: "বিকাশ ও নগদ অটো-রিকনসাইল" }
      },
      float3: {
        ico: "✦",
        title: { en: "AI Teaching Assistant", bn: "এআই শিক্ষক সহকারী" },
        stat: { en: "Active & Ready", bn: "সক্রিয় ও প্রস্তুত" },
        sub: { en: "NCTB Syllabus V2 Engine", bn: "এনসিটিবি সিলেবাস V2" }
      },
      mob1: { title: { en: "Attendance", bn: "উপস্থিতি" }, stat: "97%", sub: { en: "Live Biometric", bn: "বায়োমেট্রিক" } },
      mob2: { title: { en: "Collection", bn: "ফি আদায়" }, stat: "৳ 6,350", sub: { en: "bKash Verified", bn: "বিকাশ ভেরিফাইড" } },
      mob3: { title: { en: "AI Assistant", bn: "এআই সহকারী" }, stat: { en: "Active", bn: "সক্রিয়" }, sub: { en: "NCTB V2 Engine", bn: "এনসিটিবি V2" } }
    },
    teacher: {
      roleTitle: { en: "/ Teacher Workspace", bn: "/ শিক্ষক ড্যাশবোর্ড" },
      status: { en: "Active • Term 01", bn: "সক্রিয় • টার্ম ০১" },
      float1: {
        ico: "📋",
        title: { en: "Classes Today", bn: "আজকের ক্লাস" },
        stat: "3 Classes",
        sub: { en: "Class 9-A, 10-B & 8-A Routine", bn: "ক্লাস ৯-এ, ১০-বি ও ৮-এ রুটিন" }
      },
      float2: {
        ico: "👥",
        title: { en: "My Students", bn: "মোট শিক্ষার্থী" },
        stat: "43 Students",
        sub: { en: "Digital Attendance & Marks", bn: "লাইভ উপস্থিতি ও নম্বর গ্রহণ" }
      },
      float3: {
        ico: "✦",
        title: { en: "Teacher AI Engine", bn: "টিচার এআই ইঞ্জিন" },
        stat: { en: "NCTB Ready", bn: "এনসিটিবি প্রস্তুত" },
        sub: { en: "1-Tap Lesson Plan & Questions", bn: "১-ট্যাপ পাঠপরিকল্পনা ও প্রশ্ন" }
      },
      mob1: { title: { en: "Classes", bn: "আজকের ক্লাস" }, stat: "3 Classes", sub: { en: "Routine Ready", bn: "রুটিন প্রস্তুত" } },
      mob2: { title: { en: "Students", bn: "শিক্ষার্থী" }, stat: "43 Active", sub: { en: "Marksheet Ready", bn: "নম্বর এন্ট্রি" } },
      mob3: { title: { en: "Teacher AI", bn: "টিচার এআই" }, stat: { en: "Ready", bn: "প্রস্তুত" }, sub: { en: "NCTB Syllabus V2", bn: "এনসিটিবি V2" } }
    },
    parent: {
      roleTitle: { en: "/ Guardian Portal", bn: "/ অভিভাবক পোর্টাল" },
      status: { en: "Connected • 3 Children", bn: "সংযুক্ত • ৩ সন্তান" },
      float1: {
        ico: "📱",
        title: { en: "Gate SMS Alert", bn: "গেট এসএমএস অ্যালার্ট" },
        stat: "09:02 AM",
        sub: { en: "Tahmid Verified at Gate #02", bn: "তাহমিদ গেট #০২ এ প্রবেশ করেছে" }
      },
      float2: {
        ico: "৳",
        title: { en: "Fees Due (bKash)", bn: "বকেয়া ফি (বিকাশ)" },
        stat: "৳ 850.00",
        sub: { en: "1-Tap Digital QR Receipt", bn: "১-ট্যাপ ডিজিটাল মানি রিসিট" }
      },
      float3: {
        ico: "📚",
        title: { en: "Homework & Routine", bn: "হোমওয়ার্ক ও রুটিন" },
        stat: { en: "4 Pending", bn: "৪টি নির্ধারিত" },
        sub: { en: "English For Today & Bangla", bn: "ইংলিশ ও বাংলা অ্যাসাইনমেন্ট" }
      },
      mob1: { title: { en: "Gate Alert", bn: "গেট অ্যালার্ট" }, stat: "09:02 AM", sub: { en: "Tahmid Arrived", bn: "তাহমিদ উপস্থিত" } },
      mob2: { title: { en: "Fees Due", bn: "বকেয়া ফি" }, stat: "৳ 850", sub: { en: "bKash 1-Tap", bn: "বিকাশ পেমেন্ট" } },
      mob3: { title: { en: "Homework", bn: "হোমওয়ার্ক" }, stat: { en: "4 Tasks", bn: "৪টি কাজ" }, sub: { en: "English & Bangla", bn: "ইংরেজি ও বাংলা" } }
    }
  };

  const HERO_ROLES_KEYS = ["admin", "teacher", "parent"];
  let heroCarouselTimer = null;
  let isHeroPaused = false;

  function getLiveSyncStatus(roleKey) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const isAm = hours < 12;
    const h12 = hours % 12 || 12;
    const timeStrEn = `${String(h12).padStart(2, "0")}:${minutes} ${isAm ? "AM" : "PM"}`;
    const bnPeriod = hours < 12 ? "সকাল" : (hours < 15 ? "দুপুর" : (hours < 18 ? "বিকাল" : "রাত"));
    const timeStrBn = `${bnPeriod} ${toBengaliNumber(String(h12).padStart(2, "0"))}:${toBengaliNumber(minutes)}`;

    if (roleKey === "admin") {
      return {
        en: `Live • Synced ${timeStrEn}`,
        bn: `লাইভ • ${timeStrBn} এ সিঙ্ক`
      };
    } else if (roleKey === "teacher") {
      return {
        en: `Active • Term 01 (${timeStrEn})`,
        bn: `সক্রিয় • টার্ম ০১ (${timeStrBn})`
      };
    } else {
      return {
        en: `Connected • ${timeStrEn}`,
        bn: `সংযুক্ত • ${timeStrBn}`
      };
    }
  }

  function updateHeroText(el, textObj) {
    if (!el) return;
    if (typeof textObj === "string") {
      el.textContent = textObj;
      return;
    }
    const isBn = currentLang === "bn";
    el.innerHTML = `<span class="lang-en ${isBn ? "hidden" : ""}">${textObj.en}</span><span class="lang-bn ${isBn ? "" : "hidden"}">${textObj.bn}</span>`;
  }

  renderHeroRole = function (roleKey) {
    const data = HERO_ROLES[roleKey];
    if (!data) return;

    // 1. Update Buttons & Progress bar
    const buttons = document.querySelectorAll(".hero-role-btn");
    buttons.forEach((btn) => {
      const isActive = btn.dataset.role === roleKey;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        btn.classList.remove("animating");
        void btn.offsetWidth; // Trigger reflow for CSS animation restart
        btn.classList.add("animating");
      } else {
        btn.classList.remove("animating");
      }
    });

    // 2. Update Slides
    const slides = document.querySelectorAll(".dash-slide");
    slides.forEach((slide) => {
      const isSlideActive = slide.dataset.slide === roleKey;
      slide.classList.toggle("active", isSlideActive);
    });

    // 3. Update Title & Status
    const titleEl = document.getElementById("dashRoleTitle");
    if (titleEl) updateHeroText(titleEl, data.roleTitle);

    const statusEl = document.getElementById("dashStatusText");
    if (statusEl) updateHeroText(statusEl, getLiveSyncStatus(roleKey));

    // 4. Update Float Cards
    const f1Ico = document.getElementById("floatOneIco");
    if (f1Ico) f1Ico.textContent = data.float1.ico;
    updateHeroText(document.getElementById("floatOneTitle"), data.float1.title);
    const f1Stat = document.getElementById("floatOneStat");
    if (f1Stat) f1Stat.textContent = currentLang === "bn" ? toBengaliNumber(data.float1.stat) : data.float1.stat;
    updateHeroText(document.getElementById("floatOneSub"), data.float1.sub);

    const f2Ico = document.getElementById("floatTwoIco");
    if (f2Ico) f2Ico.textContent = data.float2.ico;
    updateHeroText(document.getElementById("floatTwoTitle"), data.float2.title);
    const f2Stat = document.getElementById("floatTwoStat");
    if (f2Stat) f2Stat.textContent = currentLang === "bn" ? toBengaliNumber(data.float2.stat) : data.float2.stat;
    updateHeroText(document.getElementById("floatTwoSub"), data.float2.sub);

    const f3Ico = document.getElementById("floatThreeIco");
    if (f3Ico) f3Ico.textContent = data.float3.ico;
    updateHeroText(document.getElementById("floatThreeTitle"), data.float3.title);
    updateHeroText(document.getElementById("floatThreeStat"), data.float3.stat);
    updateHeroText(document.getElementById("floatThreeSub"), data.float3.sub);

    // 5. Update Mobile KPI Cards
    updateHeroText(document.getElementById("mobKpiOneTitle"), data.mob1.title);
    const m1Stat = document.getElementById("mobKpiOneStat");
    if (m1Stat) m1Stat.textContent = currentLang === "bn" ? toBengaliNumber(data.mob1.stat) : data.mob1.stat;
    updateHeroText(document.getElementById("mobKpiOneSub"), data.mob1.sub);

    updateHeroText(document.getElementById("mobKpiTwoTitle"), data.mob2.title);
    const m2Stat = document.getElementById("mobKpiTwoStat");
    if (m2Stat) m2Stat.textContent = currentLang === "bn" ? toBengaliNumber(data.mob2.stat) : data.mob2.stat;
    updateHeroText(document.getElementById("mobKpiTwoSub"), data.mob2.sub);

    updateHeroText(document.getElementById("mobKpiThreeTitle"), data.mob3.title);
    updateHeroText(document.getElementById("mobKpiThreeStat"), data.mob3.stat);
    updateHeroText(document.getElementById("mobKpiThreeSub"), data.mob3.sub);
  };

  function startHeroTimer() {
    stopHeroTimer();
    heroCarouselTimer = setInterval(() => {
      if (isHeroPaused) return;
      const currentIndex = HERO_ROLES_KEYS.indexOf(activeHeroRole);
      const nextIndex = (currentIndex + 1) % HERO_ROLES_KEYS.length;
      activeHeroRole = HERO_ROLES_KEYS[nextIndex];
      renderHeroRole(activeHeroRole);
    }, 5500);
  }

  function stopHeroTimer() {
    if (heroCarouselTimer) {
      clearInterval(heroCarouselTimer);
      heroCarouselTimer = null;
    }
  }

  function initHeroRoleCarousel() {
    const nav = document.getElementById("heroRoleNav");
    const frame = document.getElementById("heroDashboardFrame");
    if (!nav || !frame) return;

    renderHeroRole(activeHeroRole);
    startHeroTimer();

    // Click handler for role tabs
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".hero-role-btn");
      if (!btn || !btn.dataset.role) return;
      activeHeroRole = btn.dataset.role;
      renderHeroRole(activeHeroRole);
      startHeroTimer(); // Restart timer after user interaction
    });

    // Pause auto-rotation on mouse hover so visitor can inspect calmly
    [nav, frame].forEach((container) => {
      container.addEventListener("mouseenter", () => {
        isHeroPaused = true;
      });
      container.addEventListener("mouseleave", () => {
        isHeroPaused = false;
      });
    });
  }

  // ==========================================================================
  // Institution Type Segmenter (School & College / Madrasah / Cadet)
  // ==========================================================================
  const INST_DATA = {
    general: {
      en: "<strong>Tailored for General Schools:</strong> NCTB 2026 Assessment • Auto GPA Report Card • 1-Tap bKash Fee • Biometric Gate SMS",
      bn: "<strong>স্কুল ও কলেজের জন্য:</strong> এনসিটিবি ২০২৬ নতুন মূল্যায়ন • অটো জিপিএ মার্কশিট • ১-ট্যাপে বিকাশ ফি • বায়োমেট্রিক গেট এসএমএস"
    },
    madrasah: {
      en: "<strong>Tailored for Madrasahs:</strong> Hifz Para-wise Tracker • Kitabkhana Ledger • Shariah Waqf & Zakat Fund Audit • Talimat Routine",
      bn: "<strong>মাদরাসার জন্য:</strong> হিফজ ৩য় পারা দৈনিক রেকর্ড • কিতাবখানা ও জামাত বণ্টন • শরীয়াহ ও ওয়াকফ অডিট • বোর্ডিং হিসাব"
    },
    cadet: {
      en: "<strong>Tailored for Cadet & English Med:</strong> Residential Hostel & Mess • Merit Ranking • Cambridge/Edexcel Tracking • Dual-Currency Ledger",
      bn: "<strong>ক্যাডেট ও ইংলিশ মিডিয়ামের জন্য:</strong> হোস্টেল ও মেস ম্যানেজমেন্ট • মেধা ক্রমতালিকা • ক্যামব্রিজ/এডেক্সেল ট্র্যাকিং • দ্রুত ফি লেজার"
    }
  };

  updateInstitutionFeature = function (instKey) {
    activeInstitution = instKey;
    const tagEl = document.getElementById("instTagText");
    const container = document.getElementById("instFeatureTag");
    const pills = document.querySelectorAll(".inst-pill");

    pills.forEach((p) => {
      const isActive = p.dataset.inst === instKey;
      p.classList.toggle("active", isActive);
      p.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (tagEl && INST_DATA[instKey]) {
      const data = INST_DATA[instKey];
      if (container) {
        container.style.opacity = "0.4";
        setTimeout(() => {
          tagEl.innerHTML = currentLang === "bn" ? data.bn : data.en;
          container.style.opacity = "1";
        }, 100);
      } else {
        tagEl.innerHTML = currentLang === "bn" ? data.bn : data.en;
      }
    }
  };

  function initInstitutionSegmenter() {
    const segmenter = document.getElementById("instSegmenter");
    if (!segmenter) return;

    segmenter.addEventListener("click", (e) => {
      const btn = e.target.closest(".inst-pill");
      if (!btn || !btn.dataset.inst) return;
      updateInstitutionFeature(btn.dataset.inst);
    });

    updateInstitutionFeature(activeInstitution);
  }

  // ==========================================================================
  // Interactive Dashboard Hotspots (Biometric, bKash, YesEdu Copilot)
  // ==========================================================================
  function initDashboardHotspots() {
    const hotspots = document.querySelectorAll(".dash-hotspot");
    if (!hotspots.length) return;

    hotspots.forEach((spot) => {
      const beacon = spot.querySelector(".hotspot-beacon");
      if (!beacon) return;

      beacon.addEventListener("click", (e) => {
        e.stopPropagation();
        const wasActive = spot.classList.contains("active");
        hotspots.forEach((s) => s.classList.remove("active"));
        if (!wasActive) {
          spot.classList.add("active");
        }
      });

      spot.addEventListener("mouseenter", () => {
        isHeroPaused = true;
      });

      spot.addEventListener("mouseleave", () => {
        isHeroPaused = false;
        spot.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dash-hotspot")) {
        hotspots.forEach((s) => s.classList.remove("active"));
      }
    });
  }

  // ==========================================================================
  // Mobile Progressive Disclosure for 12 ERP Modules
  // ==========================================================================
  function initModuleToggle() {
    const grid = document.getElementById("moduleGrid");
    const btn = document.getElementById("moduleToggleBtn");
    if (!grid || !btn) return;

    const collapsedTxt = btn.querySelector(".txt-collapsed");
    const expandedTxt = btn.querySelector(".txt-expanded");

    btn.addEventListener("click", () => {
      const isExpanded = grid.classList.toggle("is-expanded");
      btn.classList.toggle("is-active", isExpanded);
      btn.setAttribute("aria-expanded", isExpanded ? "true" : "false");

      if (collapsedTxt && expandedTxt) {
        collapsedTxt.style.display = isExpanded ? "none" : "inline";
        expandedTxt.style.display = isExpanded ? "inline" : "none";
      }

      if (isExpanded) {
        grid.querySelectorAll(".module").forEach((m) => {
          m.classList.add("visible");
        });
      } else {
        const modulesSection = document.getElementById("modules");
        if (modulesSection) {
          const yOffset = -70;
          const y = modulesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    });
  }

  // Initialize all subsystems when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    initNavbar();
    initScrollReveal();
    initHeroRoleCarousel();
    initInstitutionSegmenter();
    initDashboardHotspots();
    initModuleToggle();
    initRoleShowcase();
    initDemoStudio();
    initPricingCalculator();
    initDemoModal();
    initFloatingActions();
  });
})();