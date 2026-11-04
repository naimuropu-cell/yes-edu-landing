/**
 * YES EDU - Interactive Animated Story Engine (Senior UI/UX Light Mode Edition)
 * "A Tale of Two Campuses: The Struggle vs The Cloud Transformation"
 * High-contrast, clean visual design tailored for institutional leadership.
 */

(function () {
  const storyData = {
    madrasa: [
      {
        time: "08:30 AM",
        title: "Campus Gate & Morning Attendance",
        titleBn: "সকালের গেট ও হাজিরা গ্রহণ",
        before: {
          badge: "❌ হস্তচালিত খাতা ও অনিশ্চয়তা",
          heading: "২০+ মিনিট হাজিরায় নষ্ট, অভিভাবকের দুশ্চিন্তা",
          text: "হাতে লেখা হাজিরা খাতায় প্রতিদিন ২৫ মিনিট নষ্ট। কোনো ছাত্র অনুপস্থিত থাকলে অভিভাবক জানতে পারেন না। দুশ্চিন্তায় অফিসে ঘনঘন অভিভাবকের ফোন কল আসে।",
          metrics: "সময় অপচয়: ২৫ মিনিট / ক্লাস | অনুপস্থিতি ট্র্যাকিং: শূন্য",
          illustration: "register"
        },
        after: {
          badge: "✅ YES EDU বায়োমেট্রিক ও ইনস্ট্যান্ট SMS",
          heading: "৩ সেকেন্ডে ফিঙ্গারপ্রিন্ট পাঞ্চ ও স্বয়ংক্রিয় SMS",
          text: "ZKTeco গেটওয়েতে ফিঙ্গারপ্রিন্ট বা ফেস ডিটেকশনের সাথে সাথে অভিভাবকের মোবাইলে SMS চলে যায়: 'আপনার সন্তান মুহাম্মদ তানভীর সকাল ৮:৩০ এ মাদ্রাসায় প্রবেশ করেছে।' শতভাগ নিরাপত্তা ও আস্থা।",
          metrics: "সময় সাশ্রয়: ৯৫% | ইনস্ট্যান্ট SMS ডেলিভারি: ৩ সেকেন্ড",
          illustration: "biometric"
        }
      },
      {
        time: "11:30 AM",
        title: "Academic Routine & Teacher AI",
        titleBn: "ক্লাসরুম ও এআই শিক্ষক সহকারী",
        before: {
          badge: "❌ হাতে তৈরি প্রশ্ন ও পাঠপরিকল্পনা",
          heading: "শিক্ষকদের রাতের পর রাত প্রশ্ন ও খাতা দেখার ক্লান্তি",
          text: "সৃজনশীল প্রশ্ন ও সিলেবাস তৈরি করতে শিক্ষকদের ঘণ্টার পর ঘণ্টা বই ঘাঁটতে হয়। হিফজ ও কিতাব বিভাগের রুটিন ও পরীক্ষার শিডিউল তৈরিতে ভুলত্রুটি ঘটে।",
          metrics: "প্রশ্ন তৈরিতে ব্যয়: ৭-১০ দিন | সিলেবাস ট্র্যাকিং: এলোমেলো",
          illustration: "manual_exam"
        },
        after: {
          badge: "✅ Teacher AI V2 (বাংলাদেশ NCTB ও কারিকুলাম ট্রেইন্ড)",
          heading: "৩০ সেকেন্ডে সৃজনশীল প্রশ্নপত্র ও লেসন প্ল্যান তৈরি",
          text: "YES EDU-এর কারিকুলাম এআই দিয়ে নিমিষেই মডেল টেস্ট, CQ ও MCQ প্রশ্নপত্র তৈরি। শিক্ষকের কর্মক্ষমতা বৃদ্ধি পায় এবং ছাত্ররা পায় সর্বোচ্চ মানসম্মত শিক্ষা।",
          metrics: "প্রশ্নপত্র তৈরি: ৩০ সেকেন্ড | শিক্ষক সন্তুষ্টি: ৯৮%",
          illustration: "ai_exam"
        }
      },
      {
        time: "02:00 PM",
        title: "Finance, bKash & Waqf Ledger",
        titleBn: "হিসাব বিভাগ, ফি আদায় ও ওয়াকফ ট্র্যাকিং",
        before: {
          badge: "❌ রসিদ বইয়ের বিশৃঙ্খলা ও বকেয়া",
          heading: "রসিদ হারিয়ে যাওয়া, লিল্লাহ বোডিং ও সাধারণ ফান্ড মিশ্রণ",
          text: "মাস শেষে অফিসে ছাত্রদের ফি দেওয়ার লম্বা লাইন। দান, যাকাত ও ওয়াকফ ফান্ডের হিসাব সাধারণ ক্যাশবুকের সাথে মিশে গিয়ে অডিটে চরম জটিলতা ও কমিটির সন্দেহ তৈরি হয়।",
          metrics: "ফি বকেয়া: ৩৫% | ফান্ড অডিট ত্রুটি: উচ্চ",
          illustration: "cash_mess"
        },
        after: {
          badge: "✅ অটোমেটেড বিকাশ ফি ও পৃথক ওয়াকফ লেজার",
          heading: "ঘরে বসেই বিকাশ ফি প্রদান, স্বচ্ছ ডাবল-এন্ট্রি হিসাব",
          text: "অভিভাবকরা ঘরে বসেই অ্যাপ বা ওয়েব থেকে বিকাশ/নগদে ফি পরিশোধ করেন। ওয়াকফ, যাকাত ও লিল্লাহ ফান্ডের আলাদা লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়। অডিট শতভাগ স্বচ্ছ।",
          metrics: "ফি আদায় বৃদ্ধি: ৯৮.৫% | ডাবল-এন্ট্রি স্বচ্ছতা: ১০০%",
          illustration: "digital_pay"
        }
      },
      {
        time: "05:00 PM",
        title: "Governing Body & BI Dashboard",
        titleBn: "কমিটি সভা ও রিয়েলটাইম বিআই অ্যানালিটিক্স",
        before: {
          badge: "❌ অনুমানের উপর প্রতিষ্ঠান পরিচালনা",
          heading: "কমিটির বৈঠকে সঠিক হিসাব না পেয়ে মতবিরোধ",
          text: "মুহতামিম ও সভাপতির কাছে প্রতিষ্ঠানের সামগ্রিক চিত্র থাকে না। হোস্টেল সিট কয়টি খালি, খাদ্য খরচ কত, শিক্ষক উপস্থিতি কেমন—সব জানতে দিনভর কাগজ খুঁজতে হয়।",
          metrics: "রিপোর্ট তৈরিতে বিলম্ব: ২ সপ্তাহ | সিট বরাদ্দ ভুল: সাধারণ",
          illustration: "cloud_chaos"
        },
        after: {
          badge: "✅ এক্সিকিউটিভ ড্যাশবোর্ড ও হোস্টেল সিট অটোমেশন",
          heading: "১ ক্লিকে মোবাইল থেকে পুরো প্রতিষ্ঠানের লাইভ চিত্র",
          text: "সভাপতি ও প্রিন্সিপাল মোবাইলেই লাইভ গ্রাফে দেখতে পান আজকের ফি আদায়, শিক্ষক উপস্থিতি, হোস্টেল সিট বণ্টন ও ফান্ড ব্যালেন্স। সিদ্ধান্ত নেওয়া হয় ডেটার ভিত্তিতে।",
          metrics: "রিপোর্ট জেনারেশন: ১ সেকেন্ড | প্রাতিষ্ঠানিক সিদ্ধান্ত: তাৎক্ষণিক",
          illustration: "bi_analytics"
        }
      }
    ],
    school: [
      {
        time: "08:30 AM",
        title: "School Gate & Daily Attendance",
        titleBn: "স্কুল গেট ও দৈনিক ডিজিটাল উপস্থিতি",
        before: {
          badge: "❌ হস্তচালিত হাজিরা ও ক্লাস লেট",
          heading: "শিক্ষক রোল কল করতে করতেই ক্লাসের অর্ধেক সময় শেষ",
          text: "ক্লাসে ক্লাসে শিক্ষক খাতা নিয়ে হাজিরা ডাকেন। ক্লাসের মূল্যবান সময় নষ্ট হয়। ছাত্র ক্লাসে আসল কিনা অভিভাবক দিনভর টেনশনে থাকেন।",
          metrics: "সময় নষ্ট: ২০ মিনিট / ক্লাস | অভিভাবক নোটিফিকেশন: নেই",
          illustration: "register"
        },
        after: {
          badge: "✅ ZKTeco বায়োমেট্রিক ও অটো SMS",
          heading: "গেটে কার্ড পাঞ্চ হতেই অভিভাবকের ফোনে এসএমএস অ্যালার্ট",
          text: "শিক্ষার্থী গেটের টার্নস্টাইল বা ডিভাইসে RFID কার্ড ছুঁয়ালেই উপস্থিতির হিসাব সার্ভারে আপডেট হয় এবং অভিভাবকের মোবাইলে অটোমেটিক প্রবেশ নোটিফিকেশন পৌঁছে যায়।",
          metrics: "হাজিরা গতি: প্রতি সেকেন্ডে ২ জন | নির্ভুলতা: ১০০%",
          illustration: "biometric"
        }
      },
      {
        time: "11:30 AM",
        title: "NCTB Curriculum & Exam Management",
        titleBn: "এনসিটিবি কারিকুলাম ও পরীক্ষা ব্যবস্থাপনা",
        before: {
          badge: "❌ ম্যানুয়াল প্রশ্ন প্রণয়ন ও নম্বর গণনায় ভুল",
          heading: "পরীক্ষার রেজাল্ট শিট ও গ্রেডিং তৈরিতে ২ সপ্তাহের হয়রানি",
          text: "হাতে নম্বর যোগ করতে গিয়ে প্রায়ই ভুল হয়। জিপিএ হিসাব ও রিপোর্ট কার্ড প্রিন্ট করতে শিক্ষকদের রাতের ঘুম হারাম হয়ে যায়।",
          metrics: "গ্রেড শিট তৈরি: ১৪ দিন | গণনা ত্রুটি: প্রতি ব্যাচে ৫-১০%",
          illustration: "manual_exam"
        },
        after: {
          badge: "✅ স্বয়ংক্রিয় গ্রেডশিট ও NCTB এআই কোয়েশ্চেন ব্যাংক",
          heading: "১ ক্লিকে মার্কশিট, জিপিএ এবং প্রশংসাপত্র প্রস্তুত",
          text: "নম্বর এন্ট্রি দেওয়ার সাথে সাথে অটোমেটিক গ্রেড, মেরিট পজিশন ও প্রগ্রেস রিপোর্ট তৈরি হয়ে যায়। অভিভাবক মোবাইলে বসেই রেজাল্ট কার্ড দেখতে পারেন।",
          metrics: "রেজাল্ট পাবলিশ: তাৎক্ষণিক | ট্রান্সক্রিপ্ট ত্রুটি: ০%",
          illustration: "ai_exam"
        }
      },
      {
        time: "02:00 PM",
        title: "Tuition Collection & Bank/bKash Gateways",
        titleBn: "বেতন আদায় ও অটোমেটিক ডিউ রিমাইন্ডার",
        before: {
          badge: "❌ ব্যাংকের দীর্ঘ লাইন ও পাওনা টাকা আটকে থাকা",
          heading: "বেতন দিতে না পেরে অভিভাবক হয়রান, প্রতিষ্ঠানের ক্যাশ ঘাটতি",
          text: "ব্যাংক বা স্কুল বুথে ঘণ্টার পর ঘণ্টা লাইন। অনেক শিক্ষার্থী মাস পার হলেও বেতন দেয় না, ফলে শিক্ষকদের বেতন দিতে প্রতিষ্ঠানকে ঋণ করতে হয়।",
          metrics: "বেতন খেলাপি: ৪০% | ব্যাংক প্রক্রিয়াকরণ সময়: ৪ ঘণ্টা",
          illustration: "cash_mess"
        },
        after: {
          badge: "✅ ইনস্ট্যান্ট অনলাইন পেমেন্ট ও অটোমেটিক ডিউ SMS",
          heading: "বিকাশ, নগদ ও রকেটে ঘরে বসেই টিউশন ফি পরিশোধ",
          text: "বকেয়া ফি থাকলে অভিভাবকের কাছে মিষ্টি ভাষায় অটোমেটিক SMS রিমাইন্ডার চলে যায়। পেমেন্ট লিঙ্ক স্পর্শ করে কয়েক সেকেন্ডে ফি দেওয়া যায়।",
          metrics: "ফি কালেকশন হার: ৯৯% | অটোমেটিক ভাউচার প্রিন্ট: ইনস্ট্যান্ট",
          illustration: "digital_pay"
        }
      },
      {
        time: "05:00 PM",
        title: "Principal & Board BI Overview",
        titleBn: "ম্যানেজিং কমিটি ও লাইভ প্রাতিষ্ঠানিক কন্ট্রোল",
        before: {
          badge: "❌ বিচ্ছিন্ন ফাইল ও হিসাবহীন ইনভেন্টরি",
          heading: "লাইব্রেরির বই হারানো, বাসের রুট ও সম্পদের হিসাব নেই",
          text: "লাইব্রেরির বই কে নিয়েছে, স্কুলের ল্যাবের কম্পিউটার কয়টি সচল, বাস ঠিক সময়ে পৌঁছাল কিনা—কোনো তথ্যের কেন্দ্রীয় সমন্বয় থাকে না।",
          metrics: "সম্পদ ট্র্যাকিং: নেই | প্রশাসনিক নিয়ন্ত্রণ: দুর্বল",
          illustration: "cloud_chaos"
        },
        after: {
          badge: "✅ অল-ইন-ওয়ান ক্লাউড ইকোসিস্টেম ও ডাইনামিক CMS",
          heading: "ইনভেন্টরি, বারকোড লাইব্রেরি ও স্কুল ওয়েবসাইটের পূর্ণ নিয়ন্ত্রণ",
          text: "স্কুলের আধুনিক ওয়েবসাইটে নোটিশ ও ইভেন্ট শেয়ার করা যায় সহজেই। লাইব্রেরির বারকোড স্ক্যানার ও ট্রান্সপোর্ট রুট ম্যানেজমেন্ট থাকে আঙুলের ডগায়।",
          metrics: "ওয়েবসাইট আপডেট: ৫ মিনিট | সম্পূর্ণ দৃশ্যমানতা: ৩৬০ ডিগ্রি",
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
    if (!isAfter) {
      // Light Mode Distressed Manual Graphic
      return `
        <div class="p-6 rounded-xl bg-red-50/80 border border-red-200 flex flex-col items-center justify-center text-center">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="space-y-2 w-full max-w-xs">
            <div class="p-3 bg-white rounded-lg border border-red-200 text-xs text-red-700 font-medium shadow-sm">
              ⚠ লাল হাজিরা খাতা: ১৫ জন ছাত্রের স্বাক্ষর অনুপস্থিত, অভিভাবক অন্ধকারে!
            </div>
          </div>
        </div>
      `;
    } else {
      // Light Mode Modern Digital Graphic
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
              "আপনার সন্তান তানভীর নিরাপদে ক্যাম্পাসে উপস্থিত। সময়: ৮:৩০ AM"
            </div>
          </div>
        </div>
      `;
    }
  }

  function updateStoryView() {
    const data = storyData[currentScenario][currentTimeIndex];
    if (!data) return;

    if (beforeBadge) beforeBadge.textContent = data.before.badge;
    if (beforeHeading) beforeHeading.textContent = data.before.heading;
    if (beforeText) beforeText.textContent = data.before.text;
    if (beforeMetrics) beforeMetrics.textContent = data.before.metrics;
    if (beforeVisual) beforeVisual.innerHTML = renderVisualIllustration(data.before.illustration, false);

    if (afterBadge) afterBadge.textContent = data.after.badge;
    if (afterHeading) afterHeading.textContent = data.after.heading;
    if (afterText) afterText.textContent = data.after.text;
    if (afterMetrics) afterMetrics.textContent = data.after.metrics;
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

  document.addEventListener('DOMContentLoaded', updateStoryView);
})();
