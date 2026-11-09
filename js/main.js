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

    // Test 1: Biometric RFID Tap -> Phone SMS Live Mockup
    const punchBtn = document.getElementById("triggerGatePunchSimBtn");
    const phoneTime = document.getElementById("phoneMockupTime");
    const smsBubble = document.getElementById("punchSmsBubble");
    const latencyEl = document.getElementById("punchLatencyText");
    if (punchBtn) {
      punchBtn.addEventListener("click", () => {
        punchBtn.textContent = currentLang === "bn" ? "কার্ড স্ক্যান হচ্ছে..." : "Scanning RFID Card...";
        punchBtn.disabled = true;

        setTimeout(() => {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          if (phoneTime) phoneTime.textContent = timeStr;
          if (latencyEl) {
            const lat = (0.14 + Math.random() * 0.08).toFixed(2);
            latencyEl.textContent = `Latency: ${lat}s • Device #ZKT-02`;
          }

          if (smsBubble) {
            smsBubble.style.borderColor = "#34d399";
            smsBubble.style.boxShadow = "0 0 16px rgba(52, 211, 153, 0.4)";
            setTimeout(() => {
              smsBubble.style.borderColor = "#174230";
              smsBubble.style.boxShadow = "none";
            }, 1200);
          }

          punchBtn.textContent = currentLang === "bn" ? "পুনরায় কার্ড পাঞ্চ টেস্ট করুন" : "Touch Another Smart Card";
          punchBtn.disabled = false;
        }, 500);
      });
    }

    // Test 2: bKash Payment Simulation -> Official Digital Voucher Mockup
    const bkashBtn = document.getElementById("triggerBkashPaymentSimBtn");
    const voucherNoEl = document.getElementById("voucherNoDisplay");
    const trxIdEl = document.getElementById("voucherTrxIdDisplay");
    const paidSeal = document.getElementById("voucherPaidSeal");
    if (bkashBtn) {
      bkashBtn.addEventListener("click", () => {
        bkashBtn.textContent = currentLang === "bn" ? "বিকাশ পেমেন্ট প্রসেস হচ্ছে..." : "Processing bKash Webhook...";
        bkashBtn.disabled = true;

        setTimeout(() => {
          const randomVoucher = "#VR-" + Math.floor(100000 + Math.random() * 900000);
          const randomTrx = "8NM" + Math.random().toString(36).substring(2, 6).toUpperCase();
          if (voucherNoEl) voucherNoEl.textContent = randomVoucher;
          if (trxIdEl) trxIdEl.textContent = "TrxID: " + randomTrx;

          if (paidSeal) {
            paidSeal.style.transform = "rotate(-3deg) scale(1.2)";
            paidSeal.style.boxShadow = "0 0 20px rgba(52, 211, 153, 0.6)";
            setTimeout(() => {
              paidSeal.style.transform = "rotate(-3deg) scale(1)";
              paidSeal.style.boxShadow = "0 0 12px rgba(52, 211, 153, 0.25)";
            }, 300);
          }

          bkashBtn.textContent = currentLang === "bn" ? "পুনরায় ফি পেমেন্ট টেস্ট করুন" : "Simulate Another Fee Payment";
          bkashBtn.disabled = false;
        }, 600);
      });
    }

    // Test 3: NCTB AI Question Generator -> Print-Ready Exam Paper Mockup
    const aiBtn = document.getElementById("triggerAiQuestionSimBtn");
    const stimulusEl = document.getElementById("examStimulus");
    const questionsListEl = document.getElementById("examQuestionsList");
    let aiQuestionCycle = 0;
    if (aiBtn) {
      aiBtn.addEventListener("click", () => {
        aiBtn.textContent = currentLang === "bn" ? "এআই প্রশ্ন তৈরি করছে..." : "AI Generating NCTB Questions...";
        aiBtn.disabled = true;

        setTimeout(() => {
          aiQuestionCycle = (aiQuestionCycle + 1) % 2;

          if (aiQuestionCycle === 1) {
            if (stimulusEl) {
              stimulusEl.innerHTML = currentLang === "bn" 
                ? "<b>উদ্দীপক:</b> একটি বিদ্যালয়ের শিক্ষার্থীরা বার্ষিক ক্রীড়া প্রতিযোগিতায় ৫০ মিটার দৌড়ে অংশগ্রহণ করল। তামিম ৪ সেকেন্ডে ২০ মিটার এবং পরবর্তী ৩ সেকেন্ডে ৩০ মিটার দূরত্ব অতিক্রম করে..."
                : "<b>Stimulus:</b> Students participated in a 50m sprint track race. Tamim covered 20m in 4 seconds and the remaining 30m in 3 seconds under uniform acceleration...";
            }
            if (questionsListEl) {
              questionsListEl.innerHTML = currentLang === "bn"
                ? `<div class="cq-item"><b>(ক) জ্ঞানমূলক:</b> দ্রুতি কাকে বলে? <span class="cq-mark">[১]</span></div>
                   <div class="cq-item"><b>(খ) অনুধাবনমূলক:</b> সকল বৃত্তাকার গতিই কি পর্যায়বৃত্ত গতি? ব্যাখ্যা করো। <span class="cq-mark">[২]</span></div>
                   <div class="cq-item"><b>(গ) প্রয়োগমূলক:</b> উদ্দীপকের ১ম অংশে তামিমের ত্বরণ নির্ণয় করো। <span class="cq-mark">[৩]</span></div>
                   <div class="cq-item"><b>(ঘ) উচ্চতর দক্ষতা:</b> তামিমের সম্পূর্ণ গতির বেগ-সময় লেখচিত্র অঙ্কনপূর্বক ত্বরণের পরিবর্তন বিশ্লেষণ করো। <span class="cq-mark">[৪]</span></div>`
                : `<div class="cq-item"><b>(a) Knowledge:</b> Define Velocity. <span class="cq-mark">[1]</span></div>
                   <div class="cq-item"><b>(b) Comprehension:</b> Explain why circular motion is periodic. <span class="cq-mark">[2]</span></div>
                   <div class="cq-item"><b>(c) Application:</b> Calculate acceleration during the first 20m. <span class="cq-mark">[3]</span></div>
                   <div class="cq-item"><b>(d) Higher Ability:</b> Plot and analyze the velocity-time graph. <span class="cq-mark">[4]</span></div>`;
            }
          } else {
            if (stimulusEl) {
              stimulusEl.innerHTML = currentLang === "bn"
                ? "<b>উদ্দীপক:</b> সাকিব একটি ১৫ কেজি ভরের স্থির ট্রলির ওপর ৬০ নিউটন অনুভূমিক বল প্রয়োগ করে সমত্বরণে ৫ সেকেন্ডে ৪০ মিটার পথ অতিক্রম করালো..."
                : "<b>Stimulus:</b> A student applied 60N horizontal force on a 15kg trolley initially at rest, accelerating it 40m in 5 seconds...";
            }
            if (questionsListEl) {
              questionsListEl.innerHTML = currentLang === "bn"
                ? `<div class="cq-item"><b>(ক) জ্ঞানমূলক:</b> বলের আন্তর্জাতিক (SI) একক কী? <span class="cq-mark">[১]</span></div>
                   <div class="cq-item"><b>(খ) অনুধাবনমূলক:</b> ঘর্ষণ বলকে একটি প্রয়োজনীয় উপদ্রব বলা হয় কেন? ব্যাখ্যা করো। <span class="cq-mark">[২]</span></div>
                   <div class="cq-item"><b>(গ) প্রয়োগমূলক:</b> উদ্দীপকের ট্রলিটির ওপর প্রযুক্ত ত্বরণের মান গাণিতিকভাবে নির্ণয় করো। <span class="cq-mark">[৩]</span></div>
                   <div class="cq-item"><b>(ঘ) উচ্চতর দক্ষতা:</b> ভর দ্বিগুণ করা হলে অর্জিত ত্বরণ ও গতির প্রকৃতি কীভাবে পরিবর্তিত হবে? বিশ্লেষণ করো। <span class="cq-mark">[৪]</span></div>`
                : `<div class="cq-item"><b>(a) Knowledge:</b> What is the SI unit of Force? <span class="cq-mark">[1]</span></div>
                   <div class="cq-item"><b>(b) Comprehension:</b> Why friction is considered a necessary evil? <span class="cq-mark">[2]</span></div>
                   <div class="cq-item"><b>(c) Application:</b> Compute acceleration applied on the trolley. <span class="cq-mark">[3]</span></div>
                   <div class="cq-item"><b>(d) Higher Ability:</b> Analyze motion if mass is doubled. <span class="cq-mark">[4]</span></div>`;
            }
          }

          aiBtn.textContent = currentLang === "bn" ? "নতুন প্রশ্নপত্র তৈরি করুন" : "Generate Another Question Paper";
          aiBtn.disabled = false;
        }, 600);
      });
    }

    // Test 4: Waqf & Hostel Audit -> Dormitory Bed Matrix Mockup
    const waqfBtn = document.getElementById("triggerWaqfAuditSimBtn");
    const bed04 = document.getElementById("bed04");
    const occupancyBadge = document.getElementById("dormOccupancyBadge");
    const waqfSubtext = document.getElementById("waqfSubtext");
    let isBedAllocated = false;
    if (waqfBtn) {
      waqfBtn.addEventListener("click", () => {
        waqfBtn.textContent = currentLang === "bn" ? "ওয়াকফ অডিট সম্পন্ন হচ্ছে..." : "Auditing Waqf & Allocating Bed...";
        waqfBtn.disabled = true;

        setTimeout(() => {
          isBedAllocated = !isBedAllocated;
          if (bed04) {
            if (isBedAllocated) {
              bed04.className = "bed-card just-allocated";
              bed04.innerHTML = `
                <div class="bed-ico">🛏️</div>
                <div class="bed-info">
                  <b>Bed 04</b>
                  <small>Zubair (Orphan Fund)</small>
                </div>
                <span class="bed-status-badge waqf">Zakat Grant ✓</span>
              `;
              if (occupancyBadge) occupancyBadge.textContent = "4 / 4 Beds Occupied (Full)";
              if (waqfSubtext) waqfSubtext.textContent = "Zakat Grant Verified • Ledger Entry #WQ-442 Auto-Dispatched";
            } else {
              bed04.className = "bed-card vacant";
              bed04.innerHTML = `
                <div class="bed-ico">🛏️</div>
                <div class="bed-info">
                  <b>Bed 04</b>
                  <small>Available</small>
                </div>
                <span class="bed-status-badge vacant">Vacant</span>
              `;
              if (occupancyBadge) occupancyBadge.textContent = "3 / 4 Beds Occupied";
              if (waqfSubtext) waqfSubtext.textContent = "Lillah Orphan Boarding & Meal Subsidy • Verified Voucher #WQ-441";
            }
          }

          waqfBtn.textContent = currentLang === "bn" ? "পুনরায় অডিট পরীক্ষা করুন" : "Audit Next Dorm Room";
          waqfBtn.disabled = false;
        }, 550);
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