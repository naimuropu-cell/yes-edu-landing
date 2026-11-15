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
        en: { icon: "🏛️", title: "Pending Fees", stat: "115 Invoices", sub: "16 Institutional Modules Online" },
        bn: { icon: "🏛️", title: "বকেয়া ফি নোটিশ", stat: "১১৫টি ইনভয়েস", sub: "১৬টি প্রাতিষ্ঠানিক মডিউল সক্রিয়" }
      },
      en: {
        title: "Super Admin Mobile Cockpit",
        chip: "SUPER ADMIN APP",
        labels: ["Pending Fees", "Active Modules", "Today Collection"],
        values: ["115", "16 Ready", "৳ 0.00"],
        desc: "Complete administrative control directly from your pocket. Monitor live campus attendance, fee collections, biometric sync, and instant staff approvals from anywhere in Bangladesh.",
        bullets: [
          "Real-time biometric gate punch & staff attendance",
          "16 specialized institutional modules & emergency alerts",
          "Multi-branch financial oversight & audit-ready security"
        ]
      },
      bn: {
        title: "সুপার অ্যাডমিন মোবাইল ককপিট",
        chip: "সুপার অ্যাডমিন অ্যাপ",
        labels: ["বকেয়া ফি", "সচল মডিউল", "আজকের আদায়"],
        values: ["১১৫টি", "১৬টি প্রস্তুত", "৳ ০.০০"],
        desc: "আপনার পকেটেই পুরো শিক্ষাপ্রতিষ্ঠানের পূর্ণ নিয়ন্ত্রণ। রিয়েল-টাইম বায়োমেট্রিক হাজিরা, ফি কালেকশন ওভারভিউ এবং জরুরি নোটিশ পুশ করুন যেকোনো স্থান থেকে।",
        bullets: [
          "রিয়েল-টাইম বায়োমেট্রিক গেট হাজিরা ও স্টাফ ট্র্যাকিং",
          "১৬টি বিশেষায়িত প্রাতিষ্ঠানিক মডিউল ও জরুরি অ্যালার্ট",
          "মাল্টি-ব্রাঞ্চ আর্থিক মনিটরিং ও অডিট সিকিউরিটি"
        ]
      }
    },
    teacher: {
      url: "teacher.yesedu.cloud/workspace",
      badge: {
        en: { icon: "🎓", title: "Today's Classroom", stat: "118 Students", sub: "22 Present • Teacher AI Active" },
        bn: { icon: "🎓", title: "আজকের ক্লাসরুম", stat: "১১৮ শিক্ষার্থী", sub: "২২ জন উপস্থিত • শিক্ষক এআই সক্রিয়" }
      },
      en: {
        title: "Teacher AI & Classroom App",
        chip: "TEACHER APP",
        labels: ["Total Students", "Present Today", "Teacher AI"],
        values: ["118 Enrolled", "22 Marked", "Active & Ready"],
        desc: "1-tap student attendance, instant NCTB lesson planner, automated exam grading rubric, homework assignment dispatch, and AI question generator in one smooth mobile flow.",
        bullets: [
          "1-Tap mobile student attendance in under 30 seconds",
          "NCTB 2026 AI question bank & smart exam rubrics",
          "Direct assignment feedback & homework diary"
        ]
      },
      bn: {
        title: "শিক্ষক এআই ও ক্লাসরুম অ্যাপ",
        chip: "শিক্ষক অ্যাপ",
        labels: ["মোট শিক্ষার্থী", "আজকের উপস্থিতি", "শিক্ষক এআই"],
        values: ["১১৮ জন", "২২ জন", "সক্রিয় ও প্রস্তুত"],
        desc: "মোবাইল থেকেই ১-ট্যাপে শিক্ষার্থীদের হাজিরা, এনসিটিবি কারিকুলাম প্রশ্ন জেনারেটর, মার্কশিট এন্ট্রি এবং হোমওয়ার্ক অ্যাসাইনমেন্ট প্রেরণের দ্রুততম মাধ্যম।",
        bullets: [
          "৩০ সেকেন্ডের মধ্যে ১-ট্যাপে শিক্ষার্থীদের মোবাইল হাজিরা",
          "এনসিটিবি ২০২৬ এআই প্রশ্ন ব্যাংক ও স্মার্ট মার্কশিট রুব্রিক",
          "সরাসরি বাড়ির কাজ বিতরণ ও ক্লাসরুটিন আপডেট"
        ]
      }
    },
    parent: {
      url: "guardian.yesedu.cloud/portal",
      badge: {
        en: { icon: "💳", title: "1-Tap Fee Payment", stat: "৳ 1,850 Due", sub: "Instant bKash / Nagad Pay Ready" },
        bn: { icon: "💳", title: "১-ট্যাপে ফি পরিশোধ", stat: "৳ ১,৮৫০ বকেয়া", sub: "বিকাশ ও নগদ পেমেন্ট প্রস্তুত" }
      },
      en: {
        title: "Guardian Portal & Child Safety",
        chip: "PARENT APP",
        labels: ["Monthly Attendance", "Homework Pending", "Tuition Due"],
        values: ["75% (6/8 Days)", "04 Tasks", "৳ 1,850"],
        desc: "Instant gate punch SMS notifications, 1-tap bKash/Nagad fee payment, child attendance tracking, daily homework diary, and direct confidential chat with class teachers.",
        bullets: [
          "Instant gate punch SMS when child enters/leaves campus",
          "1-Tap bKash / Nagad fee payment with instant e-receipt",
          "Digital progress report card & direct teacher messaging"
        ]
      },
      bn: {
        title: "অভিভাবক পোর্টাল ও নিরাপত্তা ট্র্যাকিং",
        chip: "অভিভাবক অ্যাপ",
        labels: ["চলতি মাসের হাজিরা", "বাড়ির কাজ", "টিউশন বকেয়া"],
        values: ["৭৫% (৬/৮ দিন)", "০৪টি বাকি", "৳ ১,৮৫০"],
        desc: "গেটে কার্ড পাঞ্চের সাথে সাথে লাইভ এসএমএস নোটিফিকেশন, ১-ট্যাপে বিকাশ ও নগদ ফি পরিশোধ, ক্লাসরুটিন, বাড়ির কাজ ট্র্যাকিং এবং ক্লাস শিক্ষকের সাথে সরাসরি চ্যাট।",
        bullets: [
          "সন্তান ক্যাম্পাসে প্রবেশ ও প্রস্থানে তাৎক্ষণিক গেট এসএমএস",
          "১-ট্যাপে বিকাশ ও নগদ ফি পরিশোধ এবং ডিজিটাল রসিদ",
          "ডিজিটাল রেজাল্ট কার্ড ও শ্রেণি শিক্ষকের সাথে সরাসরি চ্যাট"
        ]
      }
    },
    accounts: {
      url: "finance.yesedu.cloud/accountant",
      badge: {
        en: { icon: "💰", title: "Net Campus Balance", stat: "৳ 2,292,200.99", sub: "Income ৳3.26M • Expenses ৳969K" },
        bn: { icon: "💰", title: "নেট ব্যালেন্স", stat: "৳ ২২,৯২,২০০.৯৯", sub: "আয় ৳৩২.৬ লাখ • ব্যয় ৳৯.৬৯ লাখ" }
      },
      en: {
        title: "Accountant Workspace & Financial Ledger",
        chip: "ACCOUNTANT APP",
        labels: ["Total Income", "Total Expenses", "Net Balance"],
        values: ["৳ 3,261,283.99", "৳ 969,083.00", "৳ 2,292,200.99"],
        desc: "Complete mobile financial oversight: real-time institutional revenue reconciliation, instant voucher recording, automated bank/bKash payment audits, and verified cashbooks.",
        bullets: [
          "Automated student fee reconciliation via bKash & bank API",
          "One-click voucher entries, expense tracking & cashbook",
          "Real-time balance ledger & board audit financial reports"
        ]
      },
      bn: {
        title: "অ্যাকাউন্ট্যান্ট ওয়ার্কস্পেস ও আর্থিক লেজার",
        chip: "অ্যাকাউন্ট্যান্ট ভিউ",
        labels: ["মোট আয়", "মোট ব্যয়", "নেট ব্যালেন্স"],
        values: ["৳ ৩২,৬১,২৮৩.৯৯", "৳ ৯,৬৯,০৮৩.০০", "৳ ২২,৯২,২০০.৯৯"],
        desc: "প্রতিষ্ঠানের সার্বিক আয়-ব্যয়ের লাইভ হিসাব, ফি কালেকশন রিকনসিলিয়েশন, ভাউচার রেকর্ডিং, ডাবল-এন্ট্রি ক্যাশবুক এবং স্বয়ংক্রিয় আর্থিক অডিট রিপোর্ট।",
        bullets: [
          "বিকাশ ও ব্যাংক এপিআই এর মাধ্যমে স্বয়ংক্রিয় ফি রিকনসিলিয়েশন",
          "এক ক্লিকে ভাউচার এন্ট্রি, ব্যয় ট্র্যাকিং ও ক্যাশবুক লেজার",
          "রিয়েল-টাইম ব্যালেন্স স্টেটমেন্ট ও বোর্ড অডিট ফাইন্যান্সিয়াল রিপোর্ট"
        ]
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

    // Sync Playground Sandbox display
    if (typeof renderPlaygroundAll === "function") {
      try {
        renderPlaygroundAll();
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

  // 4. Role Showcase Switcher (Ultra-Modern 3D Phone Stage)
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

      const bullet = document.getElementById("roleBullet" + name);
      if (bullet && d.bullets && d.bullets[i]) bullet.textContent = d.bullets[i];
    });

    // 3D Phone Swap animation trigger
    const phoneDevice = document.getElementById("rolePhoneDevice");
    if (phoneDevice) {
      phoneDevice.classList.remove("phone-swap-anim");
      void phoneDevice.offsetWidth; // force reflow for CSS animation re-trigger
      phoneDevice.classList.add("phone-swap-anim");
    }

    // Cross-fade & 3D slide mobile screenshot
    const mobileSlides = document.querySelectorAll(".role-mobile-img");
    mobileSlides.forEach((slide) => {
      const isActive = slide.dataset.roleSlide === roleKey;
      slide.classList.toggle("active", isActive);
    });

    // Support legacy slides if present
    const legacySlides = document.querySelectorAll(".role-dash-img");
    legacySlides.forEach((slide) => {
      slide.classList.toggle("active", slide.dataset.roleSlide === roleKey);
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

    // 3D Interactive Mouse Parallax on Desktop
    const wrapper = document.querySelector(".role-phone-wrapper");
    const phone = document.getElementById("rolePhoneDevice");
    if (wrapper && phone && window.matchMedia("(min-width: 861px)").matches) {
      wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / (rect.height / 2)) * 10;
        const rotY = (x / (rect.width / 2)) * 12;
        phone.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      wrapper.addEventListener("mouseleave", () => {
        phone.style.transform = "";
      });
    }

    // Ensure active role is synchronized on boot
    const activeTab = document.querySelector(".role-tab.active");
    if (activeTab) {
      updateRolePreview(activeTab.dataset.role);
    }
  }

  // 5. Interactive Playground Sandbox (Clean Story-Style Campus OS Simulation)
  const playgroundSlides = [
    {
      bn: {
        shortTab: "০১ বায়োমেট্রিক গেট",
        badge: "০১ / ০৪ • লাইভ গেটওয়ে",
        title: "বায়োমেট্রিক গেট উপস্থিতি ও তাৎক্ষণিক অভিভাবক এসএমএস",
        points: [
          "ZKTeco ও মুখমণ্ডল স্ক্যানারে রিয়েল-টাইম গেট পাঞ্চ লগ",
          "পাঞ্চ হওয়া মাত্রই অভিভাবকের মোবাইলে বাংলা এসএমএস প্রেরণ"
        ],
        btnText: "পাঞ্চ টেস্ট করুন",
        footerStatus: "ZKTeco গেট #০২ অনলাইন",
        footerMetric: "০.১৮ সে. ল্যাটেন্সি",
        samples: [
          {
            device: "ZKTeco Gate #02 • RFID",
            time: "09:02:14 AM",
            name: "তাহমিদ রহমান",
            meta: "৯ম শ্রেণী-ক • রোল ০৪",
            status: "Present • SMS Sent",
            popupTitle: "প্যারেন্ট এসএমএস",
            popupBody: "আসসালামু আলাইকুম। আপনার সন্তান তাহমিদ সকাল ০৯:০২ মিনিটে নিরাপদে ক্যাম্পাসে প্রবেশ করেছে।"
          },
          {
            device: "FaceID Gate #01 • Biometric",
            time: "09:04:38 AM",
            name: "নুসরাত জাহান",
            meta: "৮ম শ্রেণী-খ • রোল ০৯",
            status: "Present • SMS Sent",
            popupTitle: "প্যারেন্ট এসএমএস",
            popupBody: "আসসালামু আলাইকুম। আপনার সন্তান নুসরাত সকাল ০৯:০৪ মিনিটে মাদরাসায় উপস্থিত হয়েছে।"
          },
          {
            device: "ZKTeco Gate #02 • RFID",
            time: "09:06:11 AM",
            name: "আব্দুল্লাহ আল-মামুন",
            meta: "হিফজ বিভাগ • গ্রুপ-এ",
            status: "Present • SMS Sent",
            popupTitle: "প্যারেন্ট এসএমএস",
            popupBody: "আসসালামু আলাইকুম। হাফেজ আব্দুল্লাহ সকাল ০৯:০৬ মিনিটে হিফজ শাখায় উপস্থিত হয়েছে।"
          }
        ]
      },
      en: {
        shortTab: "01 Biometric Gate",
        badge: "01 / 04 • Live Gateway",
        title: "Biometric Gate Attendance & Instant Guardian SMS",
        points: [
          "Real-time gate punch sync from ZKTeco & Facial Recognition hardware",
          "Automated bilingual instant SMS delivered directly to guardian phone"
        ],
        btnText: "Test Gate Punch",
        footerStatus: "ZKTeco Gate #02 Online",
        footerMetric: "0.18s Latency",
        samples: [
          {
            device: "ZKTeco Gate #02 • RFID",
            time: "09:02:14 AM",
            name: "Tahmid Rahman",
            meta: "Class 9-A • Roll 04",
            status: "Present • SMS Sent",
            popupTitle: "Parent SMS Alert",
            popupBody: "Dear Guardian, your ward Tahmid has safely entered the campus at 09:02 AM. - YesEdu"
          },
          {
            device: "FaceID Gate #01 • Biometric",
            time: "09:04:38 AM",
            name: "Nusrat Jahan",
            meta: "Class 8-B • Roll 09",
            status: "Present • SMS Sent",
            popupTitle: "Parent SMS Alert",
            popupBody: "Dear Guardian, your ward Nusrat has safely entered the campus at 09:04 AM. - YesEdu"
          },
          {
            device: "ZKTeco Gate #02 • RFID",
            time: "09:06:11 AM",
            name: "Abdullah Al-Mamun",
            meta: "Hifz Section • Group A",
            status: "Present • SMS Sent",
            popupTitle: "Parent SMS Alert",
            popupBody: "Dear Guardian, Hafez Abdullah has safely arrived at the Hifz section at 09:06 AM. - YesEdu"
          }
        ]
      }
    },
    {
      bn: {
        shortTab: "০২ বিকাশ পেমেন্ট",
        badge: "০২ / ০৪ • ১-ট্যাপ ফিনটেক",
        title: "বিকাশ ১-ট্যাপ ফি সংগ্রহ ও স্বয়ংক্রিয় ক্যাশবুক লেজার",
        points: [
          "অভিভাবক ঘরে বসেই বিকাশ বা নগদে মাসিক বেতন পরিশোধ করবেন",
          "টাকা জমা হওয়ার সাথে সাথে অটো ভাউচার ও মূল খতিয়ান আপডেট"
        ],
        btnText: "পেমেন্ট টেস্ট করুন",
        footerStatus: "bKash মার্চেন্ট ওয়েব হুক সক্রিয়",
        footerMetric: "১০০% অটো-রিকনসাইলড",
        samples: [
          {
            device: "bKash Merchant • TxID: 8NM9X72K",
            time: "09:14:22 AM",
            name: "তাহমিদ রহমান (মাসিক বেতন)",
            meta: "রশিদ #VCR-2026 • ৳ ২,৫০০",
            status: "Paid • Ledger Updated",
            popupTitle: "ডিজিটাল মানি রিসিট",
            popupBody: "ধন্যবাদ! নভেম্বর ২০২৬-এর বেতন ৳ ২,৫০০ সফলভাবে গৃহীত হয়েছে এবং ক্যাশবুকে জমা হয়েছে।"
          },
          {
            device: "Nagad Pay • TxID: 4KP2L91M",
            time: "09:18:05 AM",
            name: "সাদমান সাকিব (আবাসিক ফি)",
            meta: "রশিদ #VCR-2027 • ৳ ৩,৫০০",
            status: "Paid • Ledger Updated",
            popupTitle: "ডিজিটাল মানি রিসিট",
            popupBody: "ধন্যবাদ! আবাসিক বোর্ডিং ও টিউশন ফি ৳ ৩,৫০০ পরিশোধিত হয়েছে। বকেয়া: ৳ ০.০০।"
          }
        ]
      },
      en: {
        shortTab: "02 bKash Payment",
        badge: "02 / 04 • 1-Tap Fintech",
        title: "1-Tap bKash Fee Collection & Auto Cashbook Ledger",
        points: [
          "Parents pay monthly tuition securely via bKash or Nagad in seconds",
          "Instant automated digital money receipts and cashbook ledger sync"
        ],
        btnText: "Test Fee Payment",
        footerStatus: "bKash Webhook Live",
        footerMetric: "100% Auto-Reconciled",
        samples: [
          {
            device: "bKash Merchant • TxID: 8NM9X72K",
            time: "09:14:22 AM",
            name: "Tahmid Rahman (Tuition)",
            meta: "Receipt #VCR-2026 • ৳ 2,500",
            status: "Paid • Ledger Updated",
            popupTitle: "Digital Money Receipt",
            popupBody: "Thank you! November 2026 tuition fee of ৳ 2,500 has been received and credited to the cashbook."
          },
          {
            device: "Nagad Pay • TxID: 4KP2L91M",
            time: "09:18:05 AM",
            name: "Sadman Sakib (Hostel Fee)",
            meta: "Receipt #VCR-2027 • ৳ 3,500",
            status: "Paid • Ledger Updated",
            popupTitle: "Digital Money Receipt",
            popupBody: "Thank you! Residential boarding fee of ৳ 3,500 has been received. Dues: ৳ 0.00."
          }
        ]
      }
    },
    {
      bn: {
        shortTab: "০৩ এআই প্রশ্ন",
        badge: "০৩ / ০৪ • Ustadh AI ইঞ্জিন",
        title: "এনসিটিবি ও মাদরাসা সিলেবাস অনুযায়ী প্রশ্নপত্র প্রণয়ন",
        points: [
          "অধ্যায় সিলেক্ট করলেই মাত্র ৩ সেকেন্ডে সৃজনশীল ও বহুনির্বাচনি প্রশ্ন",
          "প্রিন্ট-রেডি ফরম্যাটে উত্তরপত্র ও মূল্যায়ন নির্দেশিকা ডাউনলোড"
        ],
        btnText: "প্রশ্ন তৈরি করুন",
        footerStatus: "NCTB ও বেফাক সিলেবাস রেডি",
        footerMetric: "৩ সেকেন্ডে জেনারেটেড",
        samples: [
          {
            device: "Ustadh AI v2 • পদার্থবিজ্ঞান (৯ম-১০ম)",
            time: "Generated in 1.8s",
            name: "অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি",
            meta: "সৃজনশীল প্রশ্ন • পূর্ণমান: ১০",
            status: "Print Ready • PDF/DOCX",
            popupTitle: "নমুনা উদ্দীপক",
            popupBody: "৪০ কেজি ভরের একজন শিক্ষার্থী ২০ কেজি ভরের বাক্স নিয়ে ২ মিনিটে ছাদে উঠল। (ক) ১ কিলোওয়াট-ঘণ্টা কাকে বলে?"
          },
          {
            device: "Ustadh AI v2 • হিফজ ও তাজবীদ",
            time: "Generated in 1.4s",
            name: "সূরা বাকারা (আয়াত ১১০-১২০)",
            meta: "মৌখিক ও লিখিত কুইজ • পূর্ণমান: ২০",
            status: "Print Ready • PDF/DOCX",
            popupTitle: "মূল্যায়ন প্রশ্ন",
            popupBody: "১. প্রদত্ত আয়াতসমূহ থেকে ইখফা ও ইদগামের ৫টি উদাহরণ হরকতসহ চিহ্নিত করে খাতায় লেখ।"
          }
        ]
      },
      en: {
        shortTab: "03 AI Question",
        badge: "03 / 04 • Ustadh AI Engine",
        title: "Generate Exams via NCTB & Madrasah Syllabus AI",
        points: [
          "Select chapter to generate creative & MCQ exam papers in under 3 seconds",
          "Instant print-ready PDF/DOCX download with answer keys and rubric marking"
        ],
        btnText: "Generate AI Paper",
        footerStatus: "NCTB & Befaq Ready",
        footerMetric: "Generated in 1.8s",
        samples: [
          {
            device: "Ustadh AI v2 • Physics (Grade 9-10)",
            time: "Generated in 1.8s",
            name: "Chapter 4: Work, Energy & Power",
            meta: "Creative Question (CQ) • Full Marks: 10",
            status: "Print Ready • PDF/DOCX",
            popupTitle: "Stimulus Sample",
            popupBody: "A 40kg student climbs to the roof carrying a 20kg box in 2 minutes. (a) Define 1 kilowatt-hour."
          },
          {
            device: "Ustadh AI v2 • Hifz & Tajweed",
            time: "Generated in 1.4s",
            name: "Surah Al-Baqarah (110-120)",
            meta: "Oral & Written Quiz • Marks: 20",
            status: "Print Ready • PDF/DOCX",
            popupTitle: "Assessment Question",
            popupBody: "1. Identify and write down 5 examples of Ikhfa and Idgham with diacritics from the verses."
          }
        ]
      }
    },
    {
      bn: {
        shortTab: "০৪ হোস্টেল ও ওয়াকফ",
        badge: "০৪ / ০৪ • শরীয়াহ অডিট লেজার",
        title: "ছাত্রাবাস সিট বরাদ্দ ও ওয়াকফ-লিল্লাহ ফান্ড অডিট",
        points: [
          "আবাসিক রুম, খালি সিট ও দৈনিক ডাইনিং মিল টোকেনের লাইভ হিসাব",
          "লিল্লাহ বোর্ডিং ও যাকাত-ওয়াকফ তহবিলের শতভাগ স্বচ্ছ অডিট খতিয়ান"
        ],
        btnText: "সিট বরাদ্দ টেস্ট",
        footerStatus: "আবাসিক ব্লক-বি • রুম ২০৪",
        footerMetric: "১০০% শরীয়াহ সম্মত",
        samples: [
          {
            device: "Dormitory Block-B • Room 204",
            time: "Active Resident",
            name: "সিট #০৩ • আব্দুল্লাহ আল-মনসুর",
            meta: "লিল্লাহ বোর্ডিং শিক্ষার্থী (১০০% ফ্রি)",
            status: "Waqf Verified • Meal ON",
            popupTitle: "ওয়াকফ তহবিল লেজার",
            popupBody: "তহবিল: আলহাজ্ব শামসুল হক ট্রাস্ট। চলতি মাসের ডাইনিং ও আবাসন ব্যয় স্বয়ংক্রিয়ভাবে সমন্বিত।"
          },
          {
            device: "Dormitory Block-B • Room 204",
            time: "Just Allocated",
            name: "সিট #০৪ • জুবায়ের আহমেদ",
            meta: "কিতাব বিভাগ • সিট বরাদ্দ সম্পন্ন",
            status: "Seat Assigned • SMS Sent",
            popupTitle: "হোস্টেল আপডেট",
            popupBody: "রুম ২০৪-এর ৪নং সিটটি জুবায়ের আহমেদের নামে বরাদ্দ হয়েছে এবং মিল কার্ড চালু করা হয়েছে।"
          }
        ]
      },
      en: {
        shortTab: "04 Hostel & Waqf",
        badge: "04 / 04 • Shariah Audit Ledger",
        title: "Hostel Bed Allocation & Shariah Waqf Fund Audit",
        points: [
          "Real-time hostel room occupancy, vacant bed status, and daily meal tokens",
          "Transparent audit trail for Lillah boarding, Zakat, and Waqf trust accounts"
        ],
        btnText: "Allocate Test Bed",
        footerStatus: "Hostel Block-B • Room 204",
        footerMetric: "100% Shariah Compliant",
        samples: [
          {
            device: "Dormitory Block-B • Room 204",
            time: "Active Resident",
            name: "Bed #03 • Abdullah Al-Mansur",
            meta: "Lillah Boarding Scholar (100% Sponsored)",
            status: "Waqf Verified • Meal ON",
            popupTitle: "Waqf Trust Ledger",
            popupBody: "Fund: Alhaj Shamsul Haque Trust. Monthly boarding & dining expenses reconciled automatically."
          },
          {
            device: "Dormitory Block-B • Room 204",
            time: "Just Allocated",
            name: "Bed #04 • Zubair Ahmed",
            meta: "Kitab Section • Allocation Complete",
            status: "Seat Assigned • SMS Sent",
            popupTitle: "Hostel Allocation Update",
            popupBody: "Room 204 Bed #4 allocated to Zubair Ahmed with active dining pass and guardian SMS confirmed."
          }
        ]
      }
    }
  ];

  let currentPlaygroundSlide = 0;
  let playgroundSampleIndex = 0;
  let playgroundProgress = 0;
  let isPlaygroundPaused = false;
  const PLAYGROUND_DURATION = 6000; // 6 seconds per story slide
  const PLAYGROUND_TICK = 50;
  let playgroundTimer = null;

  function renderPlaygroundTabs() {
    const tabsContainer = document.getElementById("story-tabs");
    if (!tabsContainer) return;
    const langKey = currentLang === "bn" ? "bn" : "en";
    tabsContainer.innerHTML = playgroundSlides.map((slideObj, idx) => {
      const s = slideObj[langKey];
      const isActive = idx === currentPlaygroundSlide;
      const isDone = idx < currentPlaygroundSlide;
      const barWidth = isDone ? "100%" : (isActive ? `${playgroundProgress}%` : "0%");
      return `
        <button type="button" class="playground-tab-btn ${isActive ? 'active' : ''}" onclick="window.goToPlaygroundSlide(${idx})" role="tab" aria-selected="${isActive}">
          <div class="playground-bar-track">
            <div id="playground-bar-${idx}" class="playground-bar-fill" style="width: ${barWidth}"></div>
          </div>
          <div class="playground-tab-label">
            <span>${s.shortTab}</span>
          </div>
        </button>
      `;
    }).join("");
  }

  function renderPlaygroundContent() {
    const badgeEl = document.getElementById("slide-badge");
    const titleEl = document.getElementById("slide-title");
    const pointsEl = document.getElementById("slide-points");
    const actionBtnText = document.getElementById("action-btn-text");
    const counterEl = document.getElementById("slide-counter");
    const stageEl = document.getElementById("simulation-stage");
    const footerStatusEl = document.getElementById("footer-status");
    const footerMetricEl = document.getElementById("footer-metric");

    if (!badgeEl || !titleEl || !pointsEl || !stageEl) return;

    const langKey = currentLang === "bn" ? "bn" : "en";
    const slide = playgroundSlides[currentPlaygroundSlide][langKey];
    const sample = slide.samples[playgroundSampleIndex % slide.samples.length];

    badgeEl.textContent = slide.badge;
    titleEl.textContent = slide.title;
    if (actionBtnText) actionBtnText.textContent = slide.btnText;
    if (counterEl) {
      const slideNum = currentPlaygroundSlide + 1;
      const totalNum = playgroundSlides.length;
      counterEl.textContent = currentLang === "bn" 
        ? `০${slideNum}/০${totalNum}` 
        : `0${slideNum}/0${totalNum}`;
    }
    if (footerStatusEl) footerStatusEl.textContent = slide.footerStatus;
    if (footerMetricEl) footerMetricEl.textContent = slide.footerMetric;

    pointsEl.innerHTML = slide.points.map(pt => `
      <li class="playground-point-item">
        <span class="point-check-icon">✓</span>
        <span>${pt}</span>
      </li>
    `).join("");

    stageEl.innerHTML = `
      <div class="animate-pop-stage">
        <div class="stage-primary-card">
          <div class="stage-card-header">
            <span class="stage-device-tag">${sample.device}</span>
            <span class="stage-time-val">${sample.time}</span>
          </div>
          <div class="stage-card-body">
            <h4 class="stage-subject-name">${sample.name}</h4>
            <p class="stage-subject-meta">${sample.meta}</p>
          </div>
          <div>
            <span class="stage-status-badge">
              <span class="badge-icon">✓</span>
              <span>${sample.status}</span>
            </span>
          </div>
        </div>

        <div class="stage-floating-popup">
          <div class="popup-header">
            <span class="popup-title-tag">
              <span class="popup-dot"></span>
              <span>${sample.popupTitle}</span>
            </span>
            <span class="popup-icon">💬</span>
          </div>
          <p class="popup-body-text">${sample.popupBody}</p>
        </div>
      </div>
    `;
  }

  function renderPlaygroundAll() {
    renderPlaygroundTabs();
    renderPlaygroundContent();
  }

  window.goToPlaygroundSlide = function(index) {
    currentPlaygroundSlide = index;
    playgroundSampleIndex = 0;
    playgroundProgress = 0;
    renderPlaygroundAll();
  };

  window.nextPlaygroundSlide = function() {
    window.goToPlaygroundSlide((currentPlaygroundSlide + 1) % playgroundSlides.length);
  };

  window.prevPlaygroundSlide = function() {
    window.goToPlaygroundSlide((currentPlaygroundSlide - 1 + playgroundSlides.length) % playgroundSlides.length);
  };

  window.triggerPlaygroundSimulation = function() {
    playgroundSampleIndex++;
    playgroundProgress = 0;
    renderPlaygroundContent();
  };

  function initPlaygroundSandbox() {
    const cardEl = document.getElementById("story-card");
    const actionBtn = document.getElementById("action-btn");
    const prevBtn = document.getElementById("btnPlaygroundPrev");
    const nextBtn = document.getElementById("btnPlaygroundNext");

    if (!cardEl) return;

    if (actionBtn) {
      actionBtn.addEventListener("click", () => {
        window.triggerPlaygroundSimulation();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        window.prevPlaygroundSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        window.nextPlaygroundSlide();
      });
    }

    cardEl.addEventListener("mouseenter", () => { isPlaygroundPaused = true; });
    cardEl.addEventListener("mouseleave", () => { isPlaygroundPaused = false; });
    cardEl.addEventListener("touchstart", () => { isPlaygroundPaused = true; }, { passive: true });
    cardEl.addEventListener("touchend", () => { isPlaygroundPaused = false; }, { passive: true });

    if (playgroundTimer) clearInterval(playgroundTimer);
    playgroundTimer = setInterval(() => {
      if (!isPlaygroundPaused) {
        playgroundProgress += (PLAYGROUND_TICK / PLAYGROUND_DURATION) * 100;
        const activeBar = document.getElementById(`playground-bar-${currentPlaygroundSlide}`);
        if (activeBar) {
          activeBar.style.width = `${Math.min(playgroundProgress, 100)}%`;
        }
        if (playgroundProgress >= 100) {
          window.nextPlaygroundSlide();
        }
      }
    }, PLAYGROUND_TICK);

    renderPlaygroundAll();
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

  // ==========================================================================
  // Interactive 3D SaaS Hero Dashboard & Testimonials
  // ==========================================================================
  function initHeroLaptopInteractive() {
    const visual = document.querySelector(".hero-visual");
    const laptop = document.querySelector(".laptop-device-wrapper");
    const sidebarItems = document.querySelectorAll(".dash-sidebar .dash-nav-item");

    // 1. Interactive Sidebar Tabs inside Laptop
    if (sidebarItems.length) {
      sidebarItems.forEach((item) => {
        item.addEventListener("click", () => {
          sidebarItems.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        });
      });
    }

    // 2. Subtle 3D Mouse Parallax on Desktop
    if (visual && laptop && window.matchMedia("(min-width: 1024px)").matches) {
      visual.addEventListener("mousemove", (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotY = -5 + x * 8; // -9deg to -1deg
        const rotX = 2 - y * 6;  // -1deg to 5deg

        laptop.style.transform = `perspective(1200px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
      });

      visual.addEventListener("mouseleave", () => {
        laptop.style.transform = "perspective(1200px) rotateY(-5deg) rotateX(2deg)";
      });
    }

    // 3. Testimonial Quote Carousel in Floating Card
    const testimonialCard = document.querySelector(".floating-testimonial-card");
    if (testimonialCard) {
      const quoteText = testimonialCard.querySelector(".testimonial-quote-text");
      const authorName = testimonialCard.querySelector(".author-name");
      const authorTitle = testimonialCard.querySelector(".author-title");
      const dots = testimonialCard.querySelectorAll(".testimonial-carousel-dots .dot");

      const testimonials = [
        {
          quoteEn: '"YesEdu has completely transformed our institution\'s management. It\'s simple, powerful and incredibly reliable."',
          quoteBn: '"YesEdu আমাদের প্রতিষ্ঠানের সামগ্রিক ব্যবস্থাপনা সম্পূর্ণ বদলে দিয়েছে। এটি অত্যন্ত সহজ, কার্যকর এবং নির্ভরযোগ্য।"',
          nameEn: "Dr. A. Rahman",
          nameBn: "ড. এ. রহমান",
          titleEn: "Principal, Al-Noor Academy",
          titleBn: "অধ্যক্ষ, আল-নূর একাডেমি",
          avatar: "DR"
        },
        {
          quoteEn: '"From NCTB exam grading to biometric SMS, our daily manual paperwork reduced by 90% in 1 month."',
          quoteBn: '"এনসিটিবি মূল্যায়ন থেকে বায়োমেট্রিক গেট এসএমএস—আমাদের দৈনিক কাগজের কাজ ৯০% কমে গেছে।"',
          nameEn: "Engr. M. Haque",
          nameBn: "ইঞ্জি. এম. হক",
          titleEn: "Vice Principal, Cantonment Public",
          titleBn: "উপাধ্যক্ষ, ক্যান্টনমেন্ট পাবলিক",
          avatar: "MH"
        },
        {
          quoteEn: '"Tuition fees with bKash and instant auto receipts made fee collection seamless for 2,500 students."',
          quoteBn: '"বিকাশ ফি কালেকশন এবং অটো ডিজিটাল রসিদ থাকায় ২,৫০০ শিক্ষার্থীর ফি আদায় এখন ঝামেলামুক্ত।"',
          nameEn: "Prof. N. Sultana",
          nameBn: "প্রফেসর এন. সুলতানা",
          titleEn: "Director, Ideal Model College",
          titleBn: "পরিচালক, আইডিয়াল মডেল কলেজ",
          avatar: "NS"
        }
      ];

      let activeIndex = 0;
      let quoteTimer = null;

      function renderTestimonial(idx) {
        if (!quoteText || !authorName || !authorTitle) return;
        const t = testimonials[idx];
        const isBn = currentLang === "bn";

        quoteText.innerHTML = isBn ? `"${t.quoteBn.replace(/^"|"$/g, "")}"` : `"${t.quoteEn.replace(/^"|"$/g, "")}"`;
        authorName.textContent = isBn ? t.nameBn : t.nameEn;
        authorTitle.textContent = isBn ? t.titleBn : t.titleEn;

        const avatarEl = testimonialCard.querySelector(".testimonial-avatar-fallback");
        if (avatarEl) avatarEl.textContent = t.avatar;

        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === idx);
        });
      }

      function startQuoteTimer() {
        if (quoteTimer) clearInterval(quoteTimer);
        quoteTimer = setInterval(() => {
          activeIndex = (activeIndex + 1) % testimonials.length;
          renderTestimonial(activeIndex);
        }, 5500);
      }

      dots.forEach((dot, i) => {
        dot.style.cursor = "pointer";
        dot.addEventListener("click", () => {
          activeIndex = i;
          renderTestimonial(activeIndex);
          startQuoteTimer();
        });
      });

      startQuoteTimer();

      // Pause on hover
      testimonialCard.addEventListener("mouseenter", () => {
        if (quoteTimer) clearInterval(quoteTimer);
      });
      testimonialCard.addEventListener("mouseleave", () => {
        startQuoteTimer();
      });
    }
  }

  // Initialize all subsystems when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initLanguageSwitcher();
    initNavbar();
    initScrollReveal();
    initHeroRoleCarousel();
    initInstitutionSegmenter();
    initDashboardHotspots();
    initHeroLaptopInteractive();
    initModuleToggle();
    initRoleShowcase();
    initPlaygroundSandbox();
    initPricingCalculator();
    initDemoModal();
    initFloatingActions();
  });
})();