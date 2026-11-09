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
  let renderHeroRole;

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

  // 5. Interactive SME Peek Carousel (Live Campus OS Simulation)
  function initDemoStudio() {
    let currentSlide = 0;
    const cards = Array.from(document.querySelectorAll(".sme-card"));
    const totalSlides = cards.length || 4;
    const container = document.getElementById("smeCarousel");
    const track = document.getElementById("smeCarouselTrack");
    const prevBtn = document.getElementById("smePrevBtn");
    const nextBtn = document.getElementById("smeNextBtn");
    const dots = Array.from(document.querySelectorAll(".sme-dot"));
    const activeIndexEl = document.getElementById("smeActiveIndex");
    const totalCountEl = document.getElementById("smeTotalCount");
    const timerFill = document.getElementById("smeTimerFill");
    const storyPill = document.getElementById("smeStoryPill");

    if (totalCountEl) {
      totalCountEl.textContent = totalSlides < 10 ? "0" + totalSlides : totalSlides;
    }

    let isAutoStoryPlaying = true;
    let isUserInteracting = false;
    let storyTimerInterval = null;
    let progressPercentage = 0;
    const storyDuration = 10000; // 10 seconds
    const intervalTick = 100; // update every 100ms

    function updateCarouselPosition(animate = true) {
      if (!container || !track || cards.length === 0) return;

      if (!animate) {
        track.style.transition = "none";
      } else {
        track.style.transition = "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";
      }

      const activeCard = cards[currentSlide];
      if (!activeCard) return;

      const containerWidth = container.offsetWidth;
      const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
      const targetOffset = (containerWidth / 2) - cardCenter;

      track.style.transform = `translateX(${targetOffset}px)`;

      // Update card states
      cards.forEach((card, idx) => {
        const isActive = idx === currentSlide;
        card.classList.toggle("active", isActive);
        card.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      // Update counter
      if (activeIndexEl) {
        activeIndexEl.textContent = (currentSlide + 1) < 10 ? "0" + (currentSlide + 1) : (currentSlide + 1);
      }

      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });

      if (!animate) {
        // Force reflow
        void track.offsetHeight;
        track.style.transition = "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";
      }
    }

    function goToSlide(index, manual = false) {
      if (index < 0) {
        currentSlide = totalSlides - 1; // loop backwards
      } else if (index >= totalSlides) {
        currentSlide = 0; // loop forward
      } else {
        currentSlide = index;
      }

      updateCarouselPosition(true);

      if (manual) {
        resetStoryTimer();
      }
    }

    function resetStoryTimer() {
      progressPercentage = 0;
      if (timerFill) {
        timerFill.style.width = "0%";
      }
    }

    function startStoryTimer() {
      stopStoryTimer();
      storyTimerInterval = setInterval(() => {
        if (!isAutoStoryPlaying || isUserInteracting) return;

        progressPercentage += (intervalTick / storyDuration) * 100;
        if (progressPercentage >= 100) {
          progressPercentage = 0;
          goToSlide(currentSlide + 1, false);
        }

        if (timerFill) {
          timerFill.style.width = Math.min(progressPercentage, 100) + "%";
        }
      }, intervalTick);
    }

    function stopStoryTimer() {
      if (storyTimerInterval) {
        clearInterval(storyTimerInterval);
        storyTimerInterval = null;
      }
    }

    // Toggle auto-story on clicking the 10s pill
    if (storyPill) {
      storyPill.addEventListener("click", () => {
        isAutoStoryPlaying = !isAutoStoryPlaying;
        storyPill.style.opacity = isAutoStoryPlaying ? "1" : "0.6";
        const dot = storyPill.querySelector(".story-pulse-dot");
        if (dot) {
          dot.style.animationPlayState = isAutoStoryPlaying ? "running" : "paused";
        }
      });
    }

    // Pause on hover or focus
    if (container) {
      container.addEventListener("mouseenter", () => {
        isUserInteracting = true;
      });
      container.addEventListener("mouseleave", () => {
        isUserInteracting = false;
      });
    }

    // Click on cards to bring them into view
    cards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        if (idx !== currentSlide) {
          goToSlide(idx, true);
        }
      });
    });

    // Arrow buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(currentSlide - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        goToSlide(currentSlide + 1, true);
      });
    }

    // Dots indicator clicks
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.dataset.index, 10);
        goToSlide(idx, true);
      });
    });

    // Touch Swipe Support for Mobile & Tablet
    if (container) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      container.addEventListener("touchstart", (e) => {
        isUserInteracting = true;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      container.addEventListener("touchend", (e) => {
        isUserInteracting = false;
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) {
            goToSlide(currentSlide + 1, true);
          } else {
            goToSlide(currentSlide - 1, true);
          }
        }
      }, { passive: true });
    }

    // Window resize handler: recalculate exact track centering
    window.addEventListener("resize", () => {
      updateCarouselPosition(false);
    });

    // Initial position & timer boot
    setTimeout(() => {
      updateCarouselPosition(false);
      startStoryTimer();
    }, 50);
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
    if (statusEl) updateHeroText(statusEl, data.status);

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

  // Initialize all subsystems when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    initNavbar();
    initScrollReveal();
    initHeroRoleCarousel();
    initRoleShowcase();
    initDemoStudio();
    initPricingCalculator();
    initDemoModal();
    initFloatingActions();
  });
})();