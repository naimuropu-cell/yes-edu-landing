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
      url: "admin.yesedu.cloud/cockpit",
      badge: {
        en: { icon: "✓", title: "Attendance Today", stat: "97%", sub: "Live Biometric • 115 Present" },
        bn: { icon: "✓", title: "আজকের উপস্থিতি", stat: "৯৭%", sub: "বায়োমেট্রিক • ১১৫ জন উপস্থিত" }
      },
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
      url: "teacher.yesedu.cloud/workspace",
      badge: {
        en: { icon: "📋", title: "Classes Today", stat: "3 Classes", sub: "Class 9-A, 10-B, 8-A" },
        bn: { icon: "📋", title: "আজকের ক্লাস", stat: "৩টি ক্লাস", sub: "৯ম-ক, ১০ম-খ, ৮ম-ক" }
      },
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
      url: "guardian.yesedu.cloud/portal",
      badge: {
        en: { icon: "💳", title: "Tuition Fees", stat: "৳ 850 Due", sub: "1-Tap bKash Payment Ready" },
        bn: { icon: "💳", title: "মাসিক বেতন", stat: "৳ ৮৫০ বকেয়া", sub: "১-ট্যাপে বিকাশ পেমেন্ট" }
      },
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
      url: "accounts.yesedu.cloud/ledger",
      badge: {
        en: { icon: "💰", title: "Today's Collection", stat: "৳ 6,350.00", sub: "bKash, Nagad & Cash Reconciled" },
        bn: { icon: "💰", title: "আজকের ফি আদায়", stat: "৳ ৬,৩৫০.০০", sub: "বিকাশ, নগদ ও ক্যাশ অটো সিঙ্ক" }
      },
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

  // ==========================================================================
  // NCTB 2026 AI Question Generator & Teacher Rubric Engine
  // ==========================================================================
  const nctbKnowledgeBase = {
    physics: {
      subjectEn: "Class 9-10 • Physics",
      subjectBn: "৯ম-১০ম শ্রেণি • পদার্থবিজ্ঞান",
      chapterEn: "Chapter 4: Work, Power & Energy",
      chapterBn: "অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি",
      code: "NCTB-2026-PHY-C04",
      stimulusEn: "A teenager of mass 40 kg carrying a 20 kg sack climbs to the roof of a 20-meter high school building in 3 minutes. Another student carrying the same sack reaches the same roof using an electric lift in 30 seconds. (Take g = 9.8 m/s²).",
      stimulusBn: "৪০ কেজি ভরের একজন শিক্ষার্থী ২০ কেজি ভরের একটি বিজ্ঞান প্রজেক্টের বক্স নিয়ে ২০ মিটার উঁচু একাডেমিক ভবনের ছাদে ৩ মিনিটে উঠল। অপর একজন শিক্ষার্থী একই ভরের বক্সসহ ক্যাম্পাসের আধুনিক লিফটে চড়ে ৩০ সেকেন্ডে একই ছাদে পৌঁছাল। (g = ৯.৮ m/s²)",
      questionsEn: [
        { badge: "(A) Knowledge [1]:", text: "What is 1 Kilowatt-hour (kWh)?" },
        { badge: "(B) Comprehension [2]:", text: "Why is work done against gravitational force considered negative? Explain." },
        { badge: "(C) Application [3]:", text: "Calculate the total work done and the mechanical power expended by the first student." },
        { badge: "(D) Higher Ability [4]:", text: "Although both students performed identical total work, their power output differed significantly—verify this mathematically." }
      ],
      questionsBn: [
        { badge: "(ক) জ্ঞানমূলক [১]:", text: "১ কিলোওয়াট-ঘণ্টা (kWh) কাকে বলে?" },
        { badge: "(খ) অনুধাবনমূলক [২]:", text: "অভিকর্ষ বলের বিরুদ্ধে কৃতকাজ কেন ঋণাত্মক হয়? ব্যাখ্যা করো।" },
        { badge: "(গ) প্রয়োগমূলক [৩]:", text: "প্রথম শিক্ষার্থীর ক্ষেত্রে সম্পন্ন কাজের পরিমাণ ও ব্যয়িত ক্ষমতা নির্ণয় করো।" },
        { badge: "(ঘ) উচ্চতর দক্ষতা [৪]:", text: "'উভয় শিক্ষার্থীর কৃতকাজের মান অভিন্ন হলেও তাদের ক্ষমতার উল্লেখযোগ্য তারতম্য রয়েছে'—উদ্দীপকের আলোকে গাণিতিকভাবে বিশ্লেষণ করো।" }
      ],
      rubricEn: [
        { points: "Part A (1 Mark)", detail: "1 mark for accurate definition: 1 kWh is energy consumed by a 1 kW device running for 1 hour (= 3.6 × 10⁶ Joules)." },
        { points: "Part B (2 Marks)", detail: "1 mark for stating angle between force and displacement is 180° (cos 180° = -1); 1 mark for upward displacement vs gravity explanation." },
        { points: "Part C (3 Marks)", detail: "Total mass m = 40 + 20 = 60 kg. Work W = mgh = 60 × 9.8 × 20 = 11,760 J (1.5 marks). Power P = W/t = 11,760 / 180 = 65.33 Watts (1.5 marks)." },
        { points: "Part D (4 Marks)", detail: "Student 2 power P₂ = 11,760 / 30 = 392 Watts (1.5 marks). Comparing P₂ / P₁ = 392 / 65.33 = 6 times greater (1.5 marks). Final comparative justification (1 mark)." }
      ],
      rubricBn: [
        { points: "ক এর উত্তর (১ নম্বর)", detail: "১ কিলোওয়াট ক্ষমতাসম্পন্ন কোনো যন্ত্র ১ ঘণ্টা চললে যে পরিমাণ শক্তি ব্যয় হয়, তাকে ১ কিলোওয়াট-ঘণ্টা বলে (= ৩.৬ × ১০⁶ জুল)।" },
        { points: "খ এর ব্যাখ্যা (২ নম্বর)", detail: "অভিকর্ষ বলের দিক নিচের দিকে এবং সরণ বিপরীতমুখী (θ = ১৮০°, cos ১৮০° = -১)। বল ও সরণের দিক বিপরীত হওয়ায় কৃতকাজ ঋণাত্মক।" },
        { points: "গ এর সমাধান (৩ নম্বর)", detail: "মোট ভর m = ৪০ + ২০ = ৬০ কেজি। কৃতকাজ W = mgh = ৬০ × ৯.৮ × ২০ = ১১,৭৬০ জুল (১.৫)। ব্যয়িত ক্ষমতা P = W/t = ১১,৭৬০ / ১৮০ = ৬৫.৩৩ ওয়াট (১.৫)।" },
        { points: "ঘ এর বিশ্লেষণ (৪ নম্বর)", detail: "লিফটের শিক্ষার্থীর ব্যয়িত ক্ষমতা P₂ = ১১,৭৬০ / ৩০ = ৩৯২ ওয়াট (১.৫)। ক্ষমতা অনুপাত P₂ / P₁ = ৩৯২ / ৬৫.৩৩ = ৬ গুণ (১.৫)। সঠিক তুলনামূলক সিদ্ধান্ত উপস্থাপন (১)।" }
      ],
      pedagogicalEn: "Teacher Alert: Ensure students add the sack mass (20 kg) to body mass (40 kg) before calculating work.",
      pedagogicalBn: "শিক্ষক সহায়িকা: শিক্ষার্থীরা অনেক সময় বক্সের ভর (২০ কেজি) ও শিক্ষার্থীর ভর (৪০ কেজি) যোগ করতে ভুলে যায়। সিস্টেমের মোট ভর নির্ণয়ে সতর্ক করুন।"
    },
    math: {
      subjectEn: "Class 8 • Mathematics",
      subjectBn: "৮ম শ্রেণি • সাধারণ গণিত",
      chapterEn: "Chapter 9: Pythagorean Theorem",
      chapterBn: "অধ্যায় ৯: পিথাগোরাসের উপপাদ্য ও ত্রিভুজ",
      code: "NCTB-2026-MTH-C08",
      stimulusEn: "A rectangular campus playground is 24 meters long and 7 meters wide. A student walks diagonally across the ground from one corner to the opposite corner instead of walking along the boundary.",
      stimulusBn: "একটি ক্যাম্পাসের আয়তাকার খেলার মাঠের দৈর্ঘ্য ২৪ মিটার এবং প্রস্থ ৭ মিটার। একজন শিক্ষার্থী সীমানা বরাবর না হেঁটে মাঠের এক কোণা থেকে বিপরীত কোণায় কর্ণ বরাবর সোজা হেঁটে অপর পাশে পৌঁছাল।",
      questionsEn: [
        { badge: "(A) Knowledge [1]:", text: "State the Pythagorean Theorem." },
        { badge: "(B) Comprehension [2]:", text: "If triangle side lengths are 3 cm, 4 cm, and 5 cm, verify whether it forms a right-angled triangle." },
        { badge: "(C) Application [3]:", text: "How many meters of walking distance did the student save by taking the diagonal path?" },
        { badge: "(D) Higher Ability [4]:", text: "If the playground length is increased by 25% and width decreased by 20%, determine the percentage change in the new diagonal length." }
      ],
      questionsBn: [
        { badge: "(ক) জ্ঞানমূলক [১]:", text: "পিথাগোরাসের উপপাদ্যটি বিবৃতি করো।" },
        { badge: "(খ) অনুধাবনমূলক [২]:", text: "কোনো ত্রিভুজের বাহুর দৈর্ঘ্য ৩ সেমি, ৪ সেমি ও ৫ সেমি হলে এটি সমকোণী ত্রিভুজ কি না যাচাই করো।" },
        { badge: "(গ) প্রয়োগমূলক [৩]:", text: "মাঠের সীমানা বরাবর হাঁটার চেয়ে কর্ণ বরাবর হেঁটে ছাত্রটির কত মিটার দূরত্ব সাশ্রয় হলো?" },
        { badge: "(ঘ) উচ্চতর দক্ষতা [৪]:", text: "মাঠের দৈর্ঘ্য ২৫% বৃদ্ধি এবং প্রস্থ ২০% হ্রাস করা হলে নতুন কর্ণের দৈর্ঘ্যের শতকরা পরিবর্তন গাণিতিকভাবে নিরূপণ করো।" }
      ],
      rubricEn: [
        { points: "Part A (1 Mark)", detail: "In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides (c² = a² + b²)." },
        { points: "Part B (2 Marks)", detail: "Check 3² + 4² = 9 + 16 = 25 = 5². Since sum of squares of legs equals hypotenuse squared, it is right-angled (Converse theorem)." },
        { points: "Part C (3 Marks)", detail: "Diagonal d = √(24² + 7²) = √(576 + 49) = √625 = 25m (1.5 marks). Boundary = 24 + 7 = 31m. Distance saved = 31 - 25 = 6 meters (1.5 marks)." },
        { points: "Part D (4 Marks)", detail: "New length = 30m; New width = 5.6m. New diagonal = √(30² + 5.6²) = √931.36 ≈ 30.52m. Increase = 5.52m; % change = (5.52 / 25) × 100 = 22.08% increase (4 marks)." }
      ],
      rubricBn: [
        { points: "ক এর উত্তর (১ নম্বর)", detail: "একটি সমকোণী ত্রিভুজের অতিভুজের ওপর অঙ্কিত বর্গক্ষেত্রের ক্ষেত্রফল অপর দুই বাহুর ওপর অঙ্কিত বর্গক্ষেত্রদ্বয়ের ক্ষেত্রফলের সমষ্টির সমান (c² = a² + b²)।" },
        { points: "খ এর যাচাই (২ নম্বর)", detail: "৩² + ৪² = ৯ + ১৬ = ২৫ = ৫²। বাহুদ্বয়ের বর্গের সমষ্টি বৃহত্তম বাহুর বর্গের সমান হওয়ায় ত্রিভুজটি সমকোণী (২)।" },
        { points: "গ এর সমাধান (৩ নম্বর)", detail: "কর্ণ d = √(২৪² + ৭²) = √(৫৭৬ + ৪৯) = √৬২৫ = ২৫ মিটার (১.৫)। সীমানা পথ = ২৪ + ৭ = ৩১ মিটার। সাশ্রয়কৃত দূরত্ব = ৩১ - ২৫ = ৬ মিটার (১.৫)।" },
        { points: "ঘ এর বিশ্লেষণ (৪ নম্বর)", detail: "নতুন দৈর্ঘ্য = ৩০ মিটার; নতুন প্রস্থ = ৫.৬ মিটার। নতুন কর্ণ = √(৩০² + ৫.৬²) = √৯৩১.৩৬ ≈ ৩০.৫২ মিটার। কর্ণের বৃদ্ধি = ৫.৫২ মিটার; শতকরা বৃদ্ধি = ২২.০৮% (৪)।" }
      ],
      pedagogicalEn: "Teacher Alert: Ensure students do not round off intermediate square roots prematurely.",
      pedagogicalBn: "শিক্ষক সহায়িকা: শিক্ষার্থীদের রাউন্ড-অফ দশমিক গণনায় পূর্ণ সতর্কতা অবলম্বনের পরামর্শ দিন।"
    }
  };

  let activeAiSub = "physics";
  let activeAiMode = "question";

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

    // Sync NCTB AI Simulator display
    if (typeof renderNctbAiSimulator === "function") {
      try {
        renderNctbAiSimulator();
      } catch (err) {
        // Safe fallback if called before DOM nodes attach
      }
    }

    // Translate modal form options
    const roleSelect = document.getElementById("institutionRole");
    if (roleSelect) {
      const roleOptions = {
        principal: { en: "Principal / Headmaster / Muhtamim", bn: "অধ্যক্ষ / প্রধান শিক্ষক / মুহতামিম" },
        director: { en: "Chairman / Board Director / Trustee", bn: "চেয়ারম্যান / পরিচালনা পর্ষদ / ট্রাস্টি" },
        teacher: { en: "Senior Teacher / IT Coordinator", bn: "সিনিয়র শিক্ষক / আইটি সমন্বয়ক" },
        accounts: { en: "Accounts Officer / Bursar", bn: "হিসাব কর্মকর্তা / ক্যাশিয়ার" },
        other: { en: "Other", bn: "অন্যান্য" }
      };
      Array.from(roleSelect.options).forEach((opt) => {
        if (roleOptions[opt.value]) {
          opt.textContent = lang === "bn" ? roleOptions[opt.value].bn : roleOptions[opt.value].en;
        }
      });
    }

    const studentsSelect = document.getElementById("approxStudents");
    if (studentsSelect) {
      const studentOptions = {
        under500: { en: "Under 500 Students", bn: "৫০০ এর নিচে শিক্ষার্থী" },
        "500to1500": { en: "500 – 1,500 Students", bn: "৫০০ – ১,৫০০ শিক্ষার্থী" },
        "1500to3000": { en: "1,500 – 3,000 Students", bn: "১,৫০০ – ৩,০০০ শিক্ষার্থী" },
        over3000: { en: "3,000+ Students", bn: "৩,০০০+ শিক্ষার্থী" }
      };
      Array.from(studentsSelect.options).forEach((opt) => {
        if (studentOptions[opt.value]) {
          opt.textContent = lang === "bn" ? studentOptions[opt.value].bn : studentOptions[opt.value].en;
        }
      });
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
    const roleConf = roleData[roleKey];
    if (!roleConf) return;
    const d = roleConf[currentLang] || roleConf.en;
    if (!d) return;

    const roleTitle = document.getElementById("roleTitle");
    const roleChip = document.getElementById("roleChip");
    const roleDesc = document.getElementById("roleDescription");
    const roleUrl = document.getElementById("roleWindowUrl");

    if (roleTitle) roleTitle.textContent = d.title;
    if (roleChip) roleChip.textContent = d.chip;
    if (roleDesc) roleDesc.textContent = d.desc;
    if (roleUrl && roleConf.url) roleUrl.textContent = roleConf.url;

    ["One", "Two", "Three"].forEach((name, i) => {
      const lbl = document.getElementById("metric" + name + "Label");
      const val = document.getElementById("metric" + name);
      if (lbl && d.labels[i]) lbl.textContent = d.labels[i];
      if (val && d.values[i]) val.textContent = d.values[i];
    });

    // Cross-fade dashboard screenshot slide
    const slides = document.querySelectorAll(".role-dash-img");
    slides.forEach((slide) => {
      const isActive = slide.dataset.roleSlide === roleKey;
      slide.classList.toggle("active", isActive);
    });

    // Update Floating Badge
    const badge = document.getElementById("roleFloatingBadge");
    const badgeIcon = document.getElementById("roleBadgeIcon");
    const badgeTitle = document.getElementById("roleBadgeTitle");
    const badgeStat = document.getElementById("roleBadgeStat");
    const badgeSub = document.getElementById("roleBadgeSub");

    if (roleConf.badge) {
      const bData = roleConf.badge[currentLang] || roleConf.badge.en;
      if (bData) {
        if (badgeIcon) badgeIcon.textContent = bData.icon;
        if (badgeTitle) badgeTitle.textContent = bData.title;
        if (badgeStat) badgeStat.textContent = bData.stat;
        if (badgeSub) badgeSub.textContent = bData.sub;
        if (badge) {
          badge.classList.remove("badge-pop");
          void badge.offsetWidth; // retrigger CSS animation
          badge.classList.add("badge-pop");
        }
      }
    }
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
    const storyDuration = 10000; // 10 seconds per slide
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
        void track.offsetHeight;
        track.style.transition = "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";
      }
    }

    function goToSlide(index, manual = false) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
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

  // ==========================================================================
  // Live Biometric Gate Attendance Simulation & SMS Alert
  // ==========================================================================
  function convertToBanglaDigits(str) {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return str.toString().replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
  }

  function initBiometricPunchSimulator() {
    const btn = document.getElementById("btnSimGatePunch");
    const feedList = document.getElementById("simFeedList");
    const toast = document.getElementById("simSmsToast");
    const toastTime = document.getElementById("smsToastTime");
    const toastBody = document.getElementById("smsToastBody");
    const toastClose = document.getElementById("smsToastClose");
    const liveDot = document.getElementById("gateLiveDot");

    if (!btn || !feedList) return;

    let toastTimer = null;

    const studentPool = [
      {
        nameEn: "Farhan Ahmed",
        nameBn: "ফারহান আহমেদ",
        rollEn: "Class 10-A • Roll 01",
        rollBn: "১০ম শ্রেণি (ক শাখা) • রোল ০১",
        avatar: "FA",
        avatarCls: "avatar-blue",
        methodEn: "RFID Smart Card Punch • Device #ZK-Gate2",
        methodBn: "আরএফআইডি স্মার্ট কার্ড পাঞ্চ • গেট #০২"
      },
      {
        nameEn: "Ayesha Siddiqua",
        nameBn: "আয়েশা সিদ্দিকা",
        rollEn: "Class 9-B • Roll 05",
        rollBn: "৯ম শ্রেণি (খ শাখা) • রোল ০৫",
        avatar: "AS",
        avatarCls: "",
        methodEn: "Facial Recognition • Device #FR-Gate1",
        methodBn: "ফেসিয়াল রিকগনিশন স্ক্যান • গেট #০১"
      },
      {
        nameEn: "Tanvir Hasan",
        nameBn: "তানভীর হাসান",
        rollEn: "Class 8-A • Roll 14",
        rollBn: "৮ম শ্রেণি (ক শাখা) • রোল ১৪",
        avatar: "TH",
        avatarCls: "avatar-amber",
        methodEn: "RFID Smart Card Punch • Device #ZK-Gate2",
        methodBn: "আরএফআইডি স্মার্ট কার্ড পাঞ্চ • গেট #০২"
      },
      {
        nameEn: "Mehnaz Parveen",
        nameBn: "মেহনাজ পারভীন",
        rollEn: "Class 10-C • Roll 02",
        rollBn: "১০ম শ্রেণি (গ শাখা) • রোল ০২",
        avatar: "MP",
        avatarCls: "avatar-blue",
        methodEn: "Facial Recognition • Device #FR-Gate2",
        methodBn: "ফেসিয়াল রিকগনিশন স্ক্যান • গেট #০২"
      }
    ];

    let poolIdx = 0;

    btn.addEventListener("click", () => {
      // Trigger scan pulse
      btn.classList.add("scanning");
      if (liveDot) {
        liveDot.style.animation = "none";
        void liveDot.offsetWidth;
        liveDot.style.animation = "live-pulse 0.5s infinite";
      }
      setTimeout(() => btn.classList.remove("scanning"), 650);

      const student = studentPool[poolIdx % studentPool.length];
      poolIdx++;

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const timeBn = convertToBanglaDigits(timeStr);

      const isBn = currentLang === "bn";
      const name = isBn ? student.nameBn : student.nameEn;
      const roll = isBn ? student.rollBn : student.rollEn;
      const method = isBn ? student.methodBn : student.methodEn;
      const displayTime = isBn ? timeBn : timeStr;

      // Create new feed row
      const newRow = document.createElement("div");
      newRow.className = "sme-feed-row newly-added";
      newRow.innerHTML = `
        <div class="sme-feed-avatar ${student.avatarCls}">${student.avatar}</div>
        <div class="sme-feed-info">
          <div class="sme-feed-name">
            <span>${name}</span>
            <span class="sme-feed-roll">${roll}</span>
          </div>
          <div class="sme-feed-sub">${method}</div>
        </div>
        <div class="sme-feed-action">
          <span class="sme-time">${displayTime}</span>
          <span class="sme-status-pill success">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="lang-en ${isBn ? 'hidden' : ''}">Present • SMS Sent</span>
            <span class="lang-bn ${isBn ? '' : 'hidden'}">উপস্থিত • এসএমএস প্রেরিত</span>
          </span>
        </div>
      `;

      feedList.insertBefore(newRow, feedList.firstChild);

      // Keep max 4 rows
      const rows = feedList.querySelectorAll(".sme-feed-row");
      if (rows.length > 4) {
        for (let i = 4; i < rows.length; i++) {
          rows[i].remove();
        }
      }

      // Show SMS Toast
      if (toast && toastBody) {
        if (toastTimer) clearTimeout(toastTimer);

        if (toastTime) {
          toastTime.textContent = isBn ? "এইমাত্র" : "Just now";
        }

        const smsTextBn = `সম্মানিত অভিভাবক, আপনার সন্তান <b>${student.nameBn}</b> (${student.rollBn}) আজ সকাল ${timeBn}-এ ক্যাম্পাসে নিরাপদে প্রবেশ করেছে। - YES EDU`;
        const smsTextEn = `Dear Guardian, your ward <b>${student.nameEn}</b> (${student.rollEn}) has safely checked in to campus at ${timeStr}. - YES EDU`;

        toastBody.innerHTML = isBn ? smsTextBn : smsTextEn;
        toast.classList.add("active");
        toast.setAttribute("aria-hidden", "false");

        toastTimer = setTimeout(() => {
          toast.classList.remove("active");
          toast.setAttribute("aria-hidden", "true");
        }, 5000);
      }
    });

    if (toastClose && toast) {
      toastClose.addEventListener("click", () => {
        if (toastTimer) clearTimeout(toastTimer);
        toast.classList.remove("active");
        toast.setAttribute("aria-hidden", "true");
      });
    }
  }


  function renderNctbAiSimulator() {
    const subjectChip = document.getElementById("aiSubjectChip");
    const chapterChip = document.getElementById("aiChapterChip");
    const codeChip = document.getElementById("aiCodeChip");
    const stimulusText = document.getElementById("aiStimulusText");
    const contentList = document.getElementById("aiContentList");
    const stage = document.getElementById("smeAiCardStage");

    if (!subjectChip || !chapterChip || !contentList) return;

    const data = nctbKnowledgeBase[activeAiSub] || nctbKnowledgeBase.physics;
    const isBn = currentLang === "bn";

    subjectChip.textContent = isBn ? data.subjectBn : data.subjectEn;
    chapterChip.textContent = isBn ? data.chapterBn : data.chapterEn;
    if (codeChip) codeChip.textContent = data.code;
    if (stimulusText) stimulusText.textContent = isBn ? data.stimulusBn : data.stimulusEn;

    if (activeAiMode === "question") {
      const qList = isBn ? data.questionsBn : data.questionsEn;
      contentList.className = "sme-cq-list";
      contentList.innerHTML = qList.map((q) => `
        <div class="cq-item">
          <span class="cq-badge">${q.badge}</span>
          <span class="cq-text">${q.text}</span>
        </div>
      `).join("");
    } else {
      const rList = isBn ? data.rubricBn : data.rubricEn;
      const pedAlert = isBn ? data.pedagogicalBn : data.pedagogicalEn;
      contentList.className = "sme-rubric-card";
      contentList.innerHTML = rList.map((r) => `
        <div class="rubric-step-row">
          <span class="rubric-step-points">${r.points}</span>
          <span class="rubric-step-detail">${r.detail}</span>
        </div>
      `).join("") + `
        <div class="pedagogical-alert">
          <strong>ℹ️ ${isBn ? "শিক্ষক মূল্যায়ন নির্দেশিকা:" : "Pedagogical Note:"}</strong> ${pedAlert}
        </div>
      `;
    }

    if (stage) {
      stage.style.opacity = "0.7";
      stage.style.transform = "scale(0.99)";
      setTimeout(() => {
        stage.style.transition = "opacity 0.25s ease, transform 0.25s ease";
        stage.style.opacity = "1";
        stage.style.transform = "scale(1)";
      }, 40);
    }
  }

  function initNctbAiSimulator() {
    const subTabs = document.querySelectorAll(".ai-sub-tab");
    const modeBtns = document.querySelectorAll(".ai-mode-btn");
    const regenBtn = document.getElementById("btnRegenAiQuestion");

    subTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        subTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeAiSub = tab.dataset.sub;
        renderNctbAiSimulator();
      });
    });

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeAiMode = btn.dataset.mode;
        renderNctbAiSimulator();
      });
    });

    if (regenBtn) {
      regenBtn.addEventListener("click", () => {
        regenBtn.style.transform = "rotate(180deg)";
        regenBtn.style.transition = "transform 0.4s ease";
        setTimeout(() => {
          regenBtn.style.transform = "none";
        }, 400);

        activeAiSub = activeAiSub === "physics" ? "math" : "physics";
        subTabs.forEach((t) => {
          t.classList.toggle("active", t.dataset.sub === activeAiSub);
        });
        renderNctbAiSimulator();
      });
    }

    renderNctbAiSimulator();
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

    // 3. Update Title, Status & URL Bar
    const roleUrls = {
      admin: "admin.yesedu.cloud/cockpit",
      teacher: "teacher.yesedu.cloud/workspace",
      parent: "parent.yesedu.cloud/portal"
    };
    const urlEl = document.getElementById("dashRoleUrl");
    if (urlEl && roleUrls[roleKey]) {
      urlEl.textContent = roleUrls[roleKey];
    }

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
    initBiometricPunchSimulator();
    initNctbAiSimulator();
    initPricingCalculator();
    initDemoModal();
    initFloatingActions();
  });
})();