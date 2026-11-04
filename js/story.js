/**
 * YES EDU - Interactive Animated Story Engine (Senior UI/UX Light Mode Edition)
 * "A Tale of Two Campuses: The Struggle vs The Cloud Transformation"
 * Fully bilingual (English & authentic dignified Bengali).
 */

(function () {
  const storyData = {
    madrasa: [
      {
        time: "08:30 AM",
        titleEn: "Campus Gate & Morning Attendance",
        titleBn: "সকালের গেট ও হাজিরা গ্রহণ",
        before: {
          badgeEn: "❌ Manual Register Books & Uncertainty",
          badgeBn: "❌ হস্তচালিত খাতা ও অনিশ্চয়তা",
          headingEn: "20+ Minutes Lost to Roll Call, Parent Anxiety",
          headingBn: "২০+ মিনিট হাজিরায় নষ্ট, অভিভাবকের দুশ্চিন্তা",
          textEn: "Daily 25 minutes lost calling names from paper registers. When a student is absent, guardians have no way of knowing, leading to anxious phone calls to the administrative office.",
          textBn: "হাতে লেখা হাজিরা খাতায় প্রতিদিন ২৫ মিনিট নষ্ট। কোনো ছাত্র অনুপস্থিত থাকলে অভিভাবক জানতে পারেন না। দুশ্চিন্তায় অফিসে ঘনঘন অভিভাবকের ফোন কল আসে।",
          metricsEn: "Wasted Time: 25 min/class | Absence Alert: Zero",
          metricsBn: "সময় অপচয়: ২৫ মিনিট / ক্লাস | অনুপস্থিতি ট্র্যাকিং: শূন্য",
          illustration: "register"
        },
        after: {
          badgeEn: "✅ YES EDU Biometric & Instant SMS",
          badgeBn: "✅ YES EDU বায়োমেট্রিক ও ইনস্ট্যান্ট SMS",
          headingEn: "3-Second Biometric Punch & Automated Parent SMS",
          headingBn: "৩ সেকেন্ডে ফিঙ্গারপ্রিন্ট পাঞ্চ ও স্বয়ংক্রিয় SMS",
          textEn: "Fingerprint, face, or RFID card tap at the gate triggers an immediate Bengali SMS to the guardian: 'Your child Tanvir entered campus safely at 08:30 AM.' 100% peace of mind.",
          textBn: "ZKTeco গেটওয়েতে ফিঙ্গারপ্রিন্ট বা ফেস ডিটেকশনের সাথে সাথে অভিভাবকের মোবাইলে SMS চলে যায়: 'আপনার সন্তান মুহাম্মদ তানভীর সকাল ৮:৩০ এ মাদ্রাসায় প্রবেশ করেছে।' শতভাগ নিরাপত্তা ও আস্থা।",
          metricsEn: "Time Saved: 95% | Delivery Speed: 3 Seconds",
          metricsBn: "সময় সাশ্রয়: ৯৫% | ইনস্ট্যান্ট SMS ডেলিভারি: ৩ সেকেন্ড",
          illustration: "biometric"
        }
      },
      {
        time: "11:30 AM",
        titleEn: "Academic Routine & Teacher AI",
        titleBn: "ক্লাসরুম ও এআই শিক্ষক সহকারী",
        before: {
          badgeEn: "❌ Manual Lesson Plans & Question Typing",
          badgeBn: "❌ হাতে তৈরি প্রশ্ন ও পাঠপরিকল্পনা",
          headingEn: "Teachers Stay Up Nights Typing Exam Papers",
          headingBn: "শিক্ষকদের রাতের পর রাত প্রশ্ন ও খাতা দেখার ক্লান্তি",
          textEn: "Creating creative questions and lesson plans takes hours of flipping through textbooks. Hifz and Kitab class routine scheduling frequently suffers from timetable clashes.",
          textBn: "সৃজনশীল প্রশ্ন ও সিলেবাস তৈরি করতে শিক্ষকদের ঘণ্টার পর ঘণ্টা বই ঘাঁটতে হয়। হিফজ ও কিতাব বিভাগের রুটিন ও পরীক্ষার শিডিউল তৈরিতে ভুলত্রুটি ঘটে।",
          metricsEn: "Question Paper Prep: 7-10 Days | Routine Conflicts: Common",
          metricsBn: "প্রশ্ন তৈরিতে ব্যয়: ৭-১০ দিন | সিলেবাস ট্র্যাকিং: এলোমেলো",
          illustration: "manual_exam"
        },
        after: {
          badgeEn: "✅ Teacher AI V2 (NCTB & Madrasa Curriculum Trained)",
          badgeBn: "✅ Teacher AI V2 (বাংলাদেশ NCTB ও কারিকুলাম ট্রেইন্ড)",
          headingEn: "30-Second Creative Questions & Autonomous Schedules",
          headingBn: "৩০ সেকেন্ডে সৃজনশীল প্রশ্নপত্র ও লেসন প্ল্যান তৈরি",
          textEn: "YES EDU's curriculum-trained AI instantly drafts model tests, CQ questions, and Hifz evaluation charts. Teachers save hours of fatigue while students receive standardized academic excellence.",
          textBn: "YES EDU-এর কারিকুলাম এআই দিয়ে নিমিষেই মডেল টেস্ট, CQ ও MCQ প্রশ্নপত্র তৈরি। শিক্ষকের কর্মক্ষমতা বৃদ্ধি পায় এবং ছাত্ররা পায় সর্বোচ্চ মানসম্মত শিক্ষা।",
          metricsEn: "Question Paper Generation: 30 Seconds | Teacher Satisfaction: 98%",
          metricsBn: "প্রশ্নপত্র তৈরি: ৩০ সেকেন্ড | শিক্ষক সন্তুষ্টি: ৯৮%",
          illustration: "ai_exam"
        }
      },
      {
        time: "02:00 PM",
        titleEn: "Finance, bKash & Waqf Ledger",
        titleBn: "হিসাব বিভাগ, ফি আদায় ও ওয়াকফ ট্র্যাকিং",
        before: {
          badgeEn: "❌ Paper Receipt Mess & Mixed Funds",
          badgeBn: "❌ রসিদ বইয়ের বিশৃঙ্খলা ও বকেয়া",
          headingEn: "Lost Receipts, Lillah Boarding & General Fund Confusion",
          headingBn: "রসিদ হারিয়ে যাওয়া, লিল্লাহ বোডিং ও সাধারণ ফান্ড মিশ্রণ",
          textEn: "Long queues at the accounts counter at month-end. Donations, Zakat, and Waqf funds getting mixed with general tuition cash ledgers creates auditing chaos and committee disputes.",
          textBn: "মাস শেষে অফিসে ছাত্রদের ফি দেওয়ার লম্বা লাইন। দান, যাকাত ও ওয়াকফ ফান্ডের হিসাব সাধারণ ক্যাশবুকের সাথে মিশে গিয়ে অডিটে চরম জটিলতা ও কমিটির সন্দেহ তৈরি হয়।",
          metricsEn: "Uncollected Fee Dues: 35% | Fund Audit Errors: High",
          metricsBn: "ফি বকেয়া: ৩৫% | ফান্ড অডিট ত্রুটি: উচ্চ",
          illustration: "cash_mess"
        },
        after: {
          badgeEn: "✅ Automated bKash Fees & Dedicated Waqf Ledger",
          badgeBn: "✅ অটোমেটেড বিকাশ ফি ও পৃথক ওয়াকফ লেজার",
          headingEn: "Parents Pay From Home via bKash, 100% Shariah Audit",
          headingBn: "ঘরে বসেই বিকাশ ফি প্রদান, স্বচ্ছ ডাবল-এন্ট্রি হিসাব",
          textEn: "Guardians tap SMS payment links to clear fees through bKash, Nagad, or Bank. Dedicated separate double-entry ledgers for Waqf, Zakat, and Lillah Boarding provide 100% committee transparency.",
          textBn: "অভিভাবকরা ঘরে বসেই অ্যাপ বা ওয়েব থেকে বিকাশ/নগদে ফি পরিশোধ করেন। ওয়াকফ, যাকাত ও লিল্লাহ ফান্ডের আলাদা লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়। অডিট শতভাগ স্বচ্ছ।",
          metricsEn: "Fee Collection Rate: 98.5% | Double-Entry Accuracy: 100%",
          metricsBn: "ফি আদায় বৃদ্ধি: ৯৮.৫% | ডাবল-এন্ট্রি স্বচ্ছতা: ১০০%",
          illustration: "digital_pay"
        }
      },
      {
        time: "05:00 PM",
        titleEn: "Governing Body & BI Dashboard",
        titleBn: "কমিটি সভা ও রিয়েলটাইম বিআই অ্যানালিটিক্স",
        before: {
          badgeEn: "❌ Management by Guesswork",
          badgeBn: "❌ অনুমানের উপর প্রতিষ্ঠান পরিচালনা",
          headingEn: "Heated Debates in Trustee Meetings Over Missing Numbers",
          headingBn: "কমিটির বৈঠকে সঠিক হিসাব না পেয়ে মতবিরোধ",
          textEn: "The Muhtamim and President lack an instant overview of campus metrics. Counting empty hostel beds, food expenses, and teacher attendance takes whole days of rummaging through paper files.",
          textBn: "মুহতামিম ও সভাপতির কাছে প্রতিষ্ঠানের সামগ্রিক চিত্র থাকে না। হোস্টেল সিট কয়টি খালি, খাদ্য খরচ কত, শিক্ষক উপস্থিতি কেমন—সব জানতে দিনভর কাগজ খুঁজতে হয়।",
          metricsEn: "Report Delay: 2 Weeks | Seat Allocation Errors: Frequent",
          metricsBn: "রিপোর্ট তৈরিতে বিলম্ব: ২ সপ্তাহ | সিট বরাদ্দ ভুল: সাধারণ",
          illustration: "cloud_chaos"
        },
        after: {
          badgeEn: "✅ Executive BI Dashboard & Hostel Seat Matrix",
          badgeBn: "✅ এক্সিকিউটিভ ড্যাশবোর্ড ও হোস্টেল সিট অটোমেশন",
          headingEn: "1-Tap Institutional Command Center on Smartphone",
          headingBn: "১ ক্লিকে মোবাইল থেকে পুরো প্রতিষ্ঠানের লাইভ চিত্র",
          textEn: "President and Muhtamim monitor real-time fee collections, teacher attendance, bed availability, and reserve fund balances right from their smartphones with live data charts.",
          textBn: "সভাপতি ও প্রিন্সিপাল মোবাইলেই লাইভ গ্রাফে দেখতে পান আজকের ফি আদায়, শিক্ষক উপস্থিতি, হোস্টেল সিট বণ্টন ও ফান্ড ব্যালেন্স। সিদ্ধান্ত নেওয়া হয় ডেটার ভিত্তিতে।",
          metricsEn: "Live Report Generation: 1 Second | Institutional Clarity: 100%",
          metricsBn: "রিপোর্ট জেনারেশন: ১ সেকেন্ড | প্রাতিষ্ঠানিক সিদ্ধান্ত: তাৎক্ষণিক",
          illustration: "bi_analytics"
        }
      }
    ],
    school: [
      {
        time: "08:30 AM",
        titleEn: "School Gate & Daily Attendance",
        titleBn: "স্কুল গেট ও দৈনিক ডিজিটাল উপস্থিতি",
        before: {
          badgeEn: "❌ Manual Attendance Calling & Class Delay",
          badgeBn: "❌ হস্তচালিত হাজিরা ও ক্লাস লেট",
          headingEn: "Teachers Spend Half the Class Period Calling Out Names",
          headingBn: "শিক্ষক রোল কল করতে করতেই ক্লাসের অর্ধেক সময় শেষ",
          textEn: "Calling rolls individually eats into valuable lecture time. Parents stay in the dark all day about whether their child reached campus safely.",
          textBn: "ক্লাসে ক্লাসে শিক্ষক খাতা নিয়ে হাজিরা ডাকেন। ক্লাসের মূল্যবান সময় নষ্ট হয়। ছাত্র ক্লাসে আসল কিনা অভিভাবক দিনভর টেনশনে থাকেন।",
          metricsEn: "Wasted Class Time: 20 min/class | Parent Notice: None",
          metricsBn: "সময় নষ্ট: ২০ মিনিট / ক্লাস | অভিভাবক নোটিফিকেশন: নেই",
          illustration: "register"
        },
        after: {
          badgeEn: "✅ ZKTeco Biometric Gateway & Auto SMS",
          badgeBn: "✅ ZKTeco বায়োমেট্রিক ও অটো SMS",
          headingEn: "Instant Parent SMS the Moment Student Touches Gate Device",
          headingBn: "গেটে কার্ড পাঞ্চ হতেই অভিভাবকের ফোনে এসএমএস অ্যালার্ট",
          textEn: "Touching an RFID card or face scan logs attendance instantly on the cloud server and sends an automated gate notification straight to the guardian's mobile phone.",
          textBn: "শিক্ষার্থী গেটের টার্নস্টাইল বা ডিভাইসে RFID কার্ড ছুঁয়ালেই উপস্থিতির হিসাব সার্ভারে আপডেট হয় এবং অভিভাবকের মোবাইলে অটোমেটিক প্রবেশ নোটিফিকেশন পৌঁছে যায়।",
          metricsEn: "Scan Speed: 2 Students/Second | Attendance Accuracy: 100%",
          metricsBn: "হাজিরা গতি: প্রতি সেকেন্ডে ২ জন | নির্ভুলতা: ১০০%",
          illustration: "biometric"
        }
      },
      {
        time: "11:30 AM",
        titleEn: "NCTB Curriculum & Exam Management",
        titleBn: "এনসিটিবি কারিকুলাম ও পরীক্ষা ব্যবস্থাপনা",
        before: {
          badgeEn: "❌ Manual Question Drafting & Marksheet Math Errors",
          badgeBn: "❌ ম্যানুয়াল প্রশ্ন প্রণয়ন ও নম্বর গণনায় ভুল",
          headingEn: "2 Weeks of Endless Stress Preparing Result Tabulations",
          headingBn: "পরীক্ষার রেজাল্ট শিট ও গ্রেডিং তৈরিতে ২ সপ্তাহের হয়রানি",
          textEn: "Manual score addition frequently leads to calculation blunders and grade disputes. Hand-writing report cards drains teachers of all their creative energy.",
          textBn: "হাতে নম্বর যোগ করতে গিয়ে প্রায়ই ভুল হয়। জিপিএ হিসাব ও রিপোর্ট কার্ড প্রিন্ট করতে শিক্ষকদের রাতের ঘুম হারাম হয়ে যায়।",
          metricsEn: "Tabulation Time: 14 Days | Error Rate: 5-10% per batch",
          metricsBn: "গ্রেড শিট তৈরি: ১৪ দিন | গণনা ত্রুটি: প্রতি ব্যাচে ৫-১০%",
          illustration: "manual_exam"
        },
        after: {
          badgeEn: "✅ Automated Grade Sheet & NCTB 2026 AI Question Bank",
          badgeBn: "✅ স্বয়ংক্রিয় গ্রেডশিট ও NCTB এআই কোয়েশ্চেন ব্যাংক",
          headingEn: "1-Click Tabulation Sheet, GPA & Verified Progress Cards",
          headingBn: "১ ক্লিকে মার্কশিট, জিপিএ এবং প্রশংসাপত্র প্রস্তুত",
          textEn: "Inputting raw exam marks auto-computes grades, merit rankings, and official progress reports with QR authenticity seals. Guardians view digital results instantly on their phones.",
          textBn: "নম্বর এন্ট্রি দেওয়ার সাথে সাথে অটোমেটিক গ্রেড, মেরিট পজিশন ও প্রগ্রেস রিপোর্ট তৈরি হয়ে যায়। অভিভাবক মোবাইলে বসেই রেজাল্ট কার্ড দেখতে পারেন।",
          metricsEn: "Result Publishing: Instantaneous | Transcript Math Errors: 0%",
          metricsBn: "রেজাল্ট পাবলিশ: তাৎক্ষণিক | ট্রান্সক্রিপ্ট ত্রুটি: ০%",
          illustration: "ai_exam"
        }
      },
      {
        time: "02:00 PM",
        titleEn: "Tuition Collection & Bank/bKash Gateways",
        titleBn: "বেতন আদায় ও অটোমেটিক ডিউ রিমাইন্ডার",
        before: {
          badgeEn: "❌ Endless Bank Queues & Massive Fee Defaults",
          badgeBn: "❌ ব্যাংকের দীর্ঘ লাইন ও পাওনা টাকা আটকে থাকা",
          headingEn: "Parents Harassed in Bank Lines, Severe Cash Shortage for Salaries",
          headingBn: "বেতন দিতে না পেরে অভিভাবক হয়রান, প্রতিষ্ঠানের ক্যাশ ঘাটতি",
          textEn: "Parents waste hours standing in school bank counters. Unpaid fees linger for months, forcing schools to take loans to pay teacher salaries.",
          textBn: "ব্যাংক বা স্কুল বুথে ঘণ্টার পর ঘণ্টা লাইন। অনেক শিক্ষার্থী মাস পার হলেও বেতন দেয় না, ফলে শিক্ষকদের বেতন দিতে প্রতিষ্ঠানকে ঋণ করতে হয়।",
          metricsEn: "Fee Default Rate: 40% | Bank Processing Wait: 4 Hours",
          metricsBn: "বেতন খেলাপি: ৪০% | ব্যাংক প্রক্রিয়াকরণ সময়: ৪ ঘণ্টা",
          illustration: "cash_mess"
        },
        after: {
          badgeEn: "✅ Instant Online Payment & Automated Due SMS",
          badgeBn: "✅ ইনস্ট্যান্ট অনলাইন পেমেন্ট ও অটোমেটিক ডিউ SMS",
          headingEn: "Pay Tuition in Seconds via bKash, Nagad & Rocket from Home",
          headingBn: "বিকাশ, নগদ ও রকেটে ঘরে বসেই টিউশন ফি পরিশোধ",
          textEn: "Polite automated SMS notices alert parents of upcoming due dates with 1-tap payment links. Money credits to school bank accounts instantly with digital receipt confirmation.",
          textBn: "বকেয়া ফি থাকলে অভিভাবকের কাছে মিষ্টি ভাষায় অটোমেটিক SMS রিমাইন্ডার চলে যায়। পেমেন্ট লিঙ্ক স্পর্শ করে কয়েক সেকেন্ডে ফি দেওয়া যায়।",
          metricsEn: "Fee Recovery Rate: 99% | Digital Receipt Generation: Instant",
          metricsBn: "ফি কালেকশন হার: ৯৯% | অটোমেটিক ভাউচার প্রিন্ট: ইনস্ট্যান্ট",
          illustration: "digital_pay"
        }
      },
      {
        time: "05:00 PM",
        titleEn: "Principal & Board BI Overview",
        titleBn: "ম্যানেজিং কমিটি ও লাইভ প্রাতিষ্ঠানিক কন্ট্রোল",
        before: {
          badgeEn: "❌ Disconnected Files & Untracked Inventory",
          badgeBn: "❌ বিচ্ছিন্ন ফাইল ও হিসাবহীন ইনভেন্টরি",
          headingEn: "Missing Library Books, Bus Delays & Untracked Assets",
          headingBn: "লাইব্রেরির বই হারানো, বাসের রুট ও সম্পদের হিসাব নেই",
          textEn: "No central coordination of library book borrowings, computer lab equipment, or school bus transit times. Administration constantly plays catch-up.",
          textBn: "লাইব্রেরির বই কে নিয়েছে, স্কুলের ল্যাবের কম্পিউটার কয়টি সচল, বাস ঠিক সময়ে পৌঁছাল কিনা—কোনো তথ্যের কেন্দ্রীয় সমন্বয় থাকে না।",
          metricsEn: "Asset Tracking: None | Administrative Control: Fragmented",
          metricsBn: "সম্পদ ট্র্যাকিং: নেই | প্রশাসনিক নিয়ন্ত্রণ: দুর্বল",
          illustration: "cloud_chaos"
        },
        after: {
          badgeEn: "✅ All-in-One Cloud Ecosystem & Dynamic CMS",
          badgeBn: "✅ অল-ইন-ওয়ান ক্লাউড ইকোসিস্টেম ও ডাইনামিক CMS",
          headingEn: "Total Control over Inventory, Barcode Library & School Web CMS",
          headingBn: "ইনভেন্টরি, বারকোড লাইব্রেরি ও স্কুল ওয়েবসাইটের পূর্ণ নিয়ন্ত্রণ",
          textEn: "School website events and notices update in 1 click. Barcode scanners handle library books seamlessly, and GPS tracks buses in real time.",
          textBn: "স্কুলের আধুনিক ওয়েবসাইটে নোটিশ ও ইভেন্ট শেয়ার করা যায় সহজেই। লাইব্রেরির বারকোড স্ক্যানার ও ট্রান্সপোর্ট রুট ম্যানেজমেন্ট থাকে আঙুলের ডগায়।",
          metricsEn: "Website Notice Update: 1 Minute | Complete Operational Visibility: 360°",
          metricsBn: "ওয়েবসাইট আপডেট: ৫ মিনিট | সম্পূর্ণ দৃশ্যমানতা: ৩৬০ ডিগ্রি",
          illustration: "bi_analytics"
        }
      }
    ]
  };

  let currentScenario = 'madrasa';
  let currentTimeIndex = 0;

  // DOM Elements
  const scenarioMadrasaBtn = document.getElementById('scenarioMadrasaBtn');
  const scenarioSchoolBtn = document.getElementById('scenarioSchoolBtn');
  const timeBtns = document.querySelectorAll('.story-time-btn-light');

  // Story Content Containers
  const beforeBadge = document.getElementById('storyBeforeBadge');
  const beforeHeading = document.getElementById('storyBeforeHeading');
  const beforeText = document.getElementById('storyBeforeText');
  const beforeMetrics = document.getElementById('storyBeforeMetrics');
  const beforeVisual = document.getElementById('storyBeforeVisual');

  const afterBadge = document.getElementById('storyAfterBadge');
  const afterHeading = document.getElementById('storyAfterHeading');
  const afterText = document.getElementById('storyAfterText');
  const afterMetrics = document.getElementById('storyAfterMetrics');
  const afterVisual = document.getElementById('storyAfterVisual');

  function renderVisualIllustration(type, isAfter) {
    const isBn = localStorage.getItem('yes_edu_lang') === 'bn';

    if (!isAfter) {
      return `
        <div class="p-6 rounded-xl bg-red-50/80 border border-red-200 flex flex-col items-center justify-center text-center">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="space-y-2 w-full max-w-xs">
            <div class="p-3 bg-white rounded-lg border border-red-200 text-xs text-red-700 font-medium shadow-sm">
              ${isBn ? '⚠ লাল হাজিরা খাতা: ১৫ জন ছাত্রের স্বাক্ষর অনুপস্থিত, অভিভাবক অন্ধকারে!' : '⚠ Red Register Khata: 15 students untracked, guardians in the dark!'}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="p-6 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col items-center justify-center text-center">
          <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-sm">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="space-y-2 w-full max-w-xs">
            <div class="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-emerald-800 text-left shadow-sm">
              <div class="flex items-center justify-between text-emerald-700 font-bold mb-1">
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  SMS GATEWAY
                </span>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">DELIVERED</span>
              </div>
              ${isBn ? '"আপনার সন্তান তানভীর নিরাপদে ক্যাম্পাসে উপস্থিত। সময়: ৮:৩০ AM"' : '"Your child Tanvir safely entered campus. Time: 08:30 AM"'}
            </div>
          </div>
        </div>
      `;
    }
  }

  function updateStoryView() {
    const data = storyData[currentScenario][currentTimeIndex];
    if (!data) return;

    const isBn = localStorage.getItem('yes_edu_lang') === 'bn';

    if (beforeBadge) beforeBadge.textContent = isBn ? data.before.badgeBn : data.before.badgeEn;
    if (beforeHeading) beforeHeading.textContent = isBn ? data.before.headingBn : data.before.headingEn;
    if (beforeText) beforeText.textContent = isBn ? data.before.textBn : data.before.textEn;
    if (beforeMetrics) beforeMetrics.textContent = isBn ? data.before.metricsBn : data.before.metricsEn;
    if (beforeVisual) beforeVisual.innerHTML = renderVisualIllustration(data.before.illustration, false);

    if (afterBadge) afterBadge.textContent = isBn ? data.after.badgeBn : data.after.badgeEn;
    if (afterHeading) afterHeading.textContent = isBn ? data.after.headingBn : data.after.headingEn;
    if (afterText) afterText.textContent = isBn ? data.after.textBn : data.after.textEn;
    if (afterMetrics) afterMetrics.textContent = isBn ? data.after.metricsBn : data.after.metricsEn;
    if (afterVisual) afterVisual.innerHTML = renderVisualIllustration(data.after.illustration, true);

    timeBtns.forEach((btn, idx) => {
      if (idx === currentTimeIndex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  if (scenarioMadrasaBtn && scenarioSchoolBtn) {
    scenarioMadrasaBtn.addEventListener('click', () => {
      currentScenario = 'madrasa';
      scenarioMadrasaBtn.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
      scenarioMadrasaBtn.classList.remove('text-slate-600', 'bg-transparent');
      scenarioSchoolBtn.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
      scenarioSchoolBtn.classList.add('text-slate-600', 'bg-transparent');
      updateStoryView();
    });

    scenarioSchoolBtn.addEventListener('click', () => {
      currentScenario = 'school';
      scenarioSchoolBtn.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
      scenarioSchoolBtn.classList.remove('text-slate-600', 'bg-transparent');
      scenarioMadrasaBtn.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
      scenarioMadrasaBtn.classList.add('text-slate-600', 'bg-transparent');
      updateStoryView();
    });
  }

  timeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentTimeIndex = index;
      updateStoryView();
    });
  });

  // Slider Logic
  const compareContainer = document.getElementById('storyCompareContainer');
  const compareAfterLayer = document.getElementById('storyCompareAfterLayer');
  const compareHandle = document.getElementById('storyCompareHandle');

  if (compareContainer && compareAfterLayer && compareHandle) {
    let isDragging = false;

    function setSliderPosition(x) {
      const rect = compareContainer.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0.05) pos = 0.05;
      if (pos > 0.95) pos = 0.95;

      const percentage = pos * 100;
      compareAfterLayer.style.width = `${percentage}%`;
      compareHandle.style.left = `${percentage}%`;
    }

    compareContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    compareContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isDragging = true;
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length === 0) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Listen to Language Toggle Event from main.js
  window.addEventListener('yesEduLangChanged', () => {
    updateStoryView();
  });

  document.addEventListener('DOMContentLoaded', updateStoryView);
})();
