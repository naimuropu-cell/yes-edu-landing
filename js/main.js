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

    // Test 1: Biometric RFID Tap
    const punchBtn = document.getElementById("triggerGatePunchSimBtn");
    const punchLog = document.getElementById("punchLogDisplay");
    if (punchBtn && punchLog) {
      punchBtn.addEventListener("click", () => {
        punchBtn.textContent = currentLang === "bn" ? "কার্ড স্ক্যান হচ্ছে..." : "Scanning RFID Card...";
        punchBtn.disabled = true;

        setTimeout(() => {
          const timeStr = new Date().toLocaleTimeString();
          if (currentLang === "bn") {
            punchLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[সফল]</span> কার্ড পাঞ্চ সম্পন্ন! <b>আইডি: YES-9041 (তাহমিদ রহমান, ৯ম শ্রেণি)</b><br>
              <span style="color:#637d71;">• সময়: ${timeStr} • গেট নং: প্রধান ফটক (ডিভাইস #ZKT-02)</span><br>
              <span style="color:#1d5243;">• অভিভাবক এসএমএস: "আপনার সন্তান তাহমিদ নিরাপদে প্রতিষ্ঠানে প্রবেশ করেছে।" [ডেলিভার্ড ✓]</span>`;
            punchBtn.textContent = "পুনরায় কার্ড পাঞ্চ টেস্ট করুন";
          } else {
            punchLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[SUCCESS]</span> RFID Punch Verified! <b>ID: YES-9041 (Tahmid Rahman, Class 9)</b><br>
              <span style="color:#637d71;">• Timestamp: ${timeStr} • Gate: Main Entrance (Device #ZKT-02)</span><br>
              <span style="color:#1d5243;">• Parent SMS: "Your child Tahmid entered campus safely at ${timeStr}." [Delivered ✓]</span>`;
            punchBtn.textContent = "Test Card Punch Again";
          }
          punchBtn.disabled = false;
        }, 600);
      });
    }

    // Test 2: bKash Payment Simulation
    const bkashBtn = document.getElementById("triggerBkashPaymentSimBtn");
    const bkashLog = document.getElementById("bkashLogDisplay");
    if (bkashBtn && bkashLog) {
      bkashBtn.addEventListener("click", () => {
        bkashBtn.textContent = currentLang === "bn" ? "পেমেন্ট প্রসেস হচ্ছে..." : "Processing bKash Webhook...";
        bkashBtn.disabled = true;

        setTimeout(() => {
          const voucher = "V-" + Math.floor(100000 + Math.random() * 900000);
          if (currentLang === "bn") {
            bkashLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[ভেরিফাইড]</span> বিকাশ ফি আদায় সফল! <b>ভাউচার: #${voucher}</b><br>
              <span style="color:#637d71;">• ট্রানজেকশন আইডি: 8NM9X72K • ফি পরিমাণ: ৳ ৩,৫০০ (টিউশন ও পরীক্ষা ফি)</span><br>
              <span style="color:#1d5243;">• হিসাব ক্যাশবুক আপডেট সম্পন্ন • অটো-মানি রিসিট এসএমএস পাঠানো হয়েছে।</span>`;
            bkashBtn.textContent = "পুনরায় ফি পেমেন্ট টেস্ট করুন";
          } else {
            bkashLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[VERIFIED]</span> bKash 1-Tap Collection Complete! <b>Voucher: #${voucher}</b><br>
              <span style="color:#637d71;">• TrxID: 8NM9X72K • Amount: ৳ 3,500 (Tuition + Exam Fee)</span><br>
              <span style="color:#1d5243;">• Double-entry ledger auto-reconciled • Digital receipt dispatched via SMS.</span>`;
            bkashBtn.textContent = "Test Fee Payment Again";
          }
          bkashBtn.disabled = false;
        }, 700);
      });
    }

    // Test 3: NCTB AI Question Generator
    const aiBtn = document.getElementById("triggerAiQuestionSimBtn");
    const aiLog = document.getElementById("aiLogDisplay");
    if (aiBtn && aiLog) {
      aiBtn.addEventListener("click", () => {
        aiBtn.textContent = currentLang === "bn" ? "এআই সৃজনশীল প্রশ্ন তৈরি করছে..." : "AI Generating NCTB Question...";
        aiBtn.disabled = true;

        setTimeout(() => {
          if (currentLang === "bn") {
            aiLog.innerHTML = `<b>বিষয়: সাধারণ বিজ্ঞান (৯ম শ্রেণি) • এনসিটিবি সৃজনশীল প্রশ্ন:</b><br>
              <span style="color:#637d71;">উদ্দীপক: সাকিব ও রাফি স্কুলের মাঠে খেলাধুলা করছিল...</span><br>
              (ক) বল কাকে বলে? [১]<br>
              (খ) জড়তা বলতে কী বোঝায়? ব্যাখ্যা করো। [২]<br>
              (গ) উদ্দীপকের ঘটনার আলোকে নিউটনের ২য় সূত্র প্রয়োগ করো। [৩]<br>
              (ঘ) বাস্তব জীবনে এই নীতির প্রয়োগ যথার্থতা বিশ্লেষণ করো। [৪]`;
            aiBtn.textContent = "নতুন প্রশ্ন জেনারেট করুন";
          } else {
            aiLog.innerHTML = `<b>Subject: General Science (Grade 9) • NCTB Creative Question:</b><br>
              <span style="color:#637d71;">Stimulus: During a laboratory test on acceleration...</span><br>
              (a) Define Force. [1]<br>
              (b) Explain inertia with a practical example. [2]<br>
              (c) Calculate the applied kinetic friction from the graph. [3]<br>
              (d) Analyze the conservation of momentum in this scenario. [4]`;
            aiBtn.textContent = "Generate Another Question";
          }
          aiBtn.disabled = false;
        }, 700);
      });
    }

    // Test 4: Waqf & Hostel Audit
    const waqfBtn = document.getElementById("triggerWaqfAuditSimBtn");
    const waqfLog = document.getElementById("waqfLogDisplay");
    if (waqfBtn && waqfLog) {
      waqfBtn.addEventListener("click", () => {
        waqfBtn.textContent = currentLang === "bn" ? "অডিট খতিয়ান আপডেট হচ্ছে..." : "Auditing Madrasa Boarding...";
        waqfBtn.disabled = true;

        setTimeout(() => {
          if (currentLang === "bn") {
            waqfLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[ওয়াকফ খতিয়ান সম্পন্ন]</span> ছাত্রাবাস রুম ২০৪ (বেড ৩) বরাদ্দকৃত!<br>
              <span style="color:#637d71;">• শিক্ষার্থী: হাফেজ আবদুল্লাহ • ক্যাটাগরি: এতিম ও দরিদ্র তহবিল (লিল্লাহ বোর্ডিং)</span><br>
              <span style="color:#1d5243;">• শরীয়াহ কমপ্লায়েন্ট অনুদান ফান্ড অটো-অডিট সম্পন্ন হয়েছে।</span>`;
            waqfBtn.textContent = "পুনরায় অডিট পরীক্ষা করুন";
          } else {
            waqfLog.innerHTML = `<span style="color:#2c9b70;font-weight:700;">[SHARIAH AUDIT VERIFIED]</span> Dorm Room 204 (Bed 03) Allocated!<br>
              <span style="color:#637d71;">• Student: Hafez Abdullah • Category: Waqf / Lillah Boarding Fund</span><br>
              <span style="color:#1d5243;">• Transparent donor ledger entry #WQ-441 auto-dispatched.</span>`;
            waqfBtn.textContent = "Audit Madrasa Fund Again";
          }
          waqfBtn.disabled = false;
        }, 650);
      });
    }
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

  // Initialize all subsystems when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    initNavbar();
    initScrollReveal();
    initRoleShowcase();
    initDemoStudio();
    initPricingCalculator();
    initDemoModal();
    initFloatingActions();
  });
})();