/**
 * YES EDU - Main Interactive Controller
 * Handles Pricing Calculator, Language Switching, 3D Card Tilts,
 * Video Showcase, Modal Demo Booking, and Mobile Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroRotatingWords();
  initHeroLiveStreamTicker();
  initPersonaSwitcher();
  initSoftwareWindowTabs();
  initPricingCalculator();
  init3DTilt();
  initVideoShowcase();
  initDemoModal();
  initLanguageSwitcher();
  initBentoTabs();
  initFaqAccordion();
});

/* ==========================================================================
   1. Navbar & Mobile Menu (EximusEdu Style Header + Sticky Transition)
   ========================================================================== */
function initNavbar() {
  const mainHeader = document.getElementById('mainHeader');
  const floatingNav = document.getElementById('floatingNavWrapper');
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdownItems = document.querySelectorAll('.menu-item-has-children');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (mainHeader) mainHeader.classList.add('sticky');
      if (floatingNav) floatingNav.classList.add('scrolled');
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (mainHeader) mainHeader.classList.remove('sticky');
      if (floatingNav) floatingNav.classList.remove('scrolled');
      if (navbar) navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a, button');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // Dropdown touch support on mobile/tablet
  dropdownItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          const submenu = item.querySelector('.dp-menu');
          if (submenu) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        }
      });
    }
  });
}

/* ==========================================================================
   2. Interactive Pricing & ROI Calculator
   ========================================================================== */
function initPricingCalculator() {
  const slider = document.getElementById('studentRangeSlider');
  const studentCountDisplay = document.getElementById('studentCountDisplay');

  // Tier Displays
  const starterPrice = document.getElementById('starterPriceDisplay');
  const proPrice = document.getElementById('proPriceDisplay');
  const enterprisePrice = document.getElementById('enterprisePriceDisplay');

  // ROI Displays
  const savedPaper = document.getElementById('roiSavedPaper');
  const savedDues = document.getElementById('roiSavedDues');
  const savedHours = document.getElementById('roiSavedHours');

  if (!slider) return;

  function updatePrices() {
    const isBn = localStorage.getItem('yes_edu_lang') === 'bn';
    const students = parseInt(slider.value, 10);

    // Format numbers
    if (studentCountDisplay) {
      studentCountDisplay.textContent = isBn ? toBengaliNumber(students) : students.toLocaleString();
    }

    // Calculations based on pricing tiers from proposal PDF
    const starterTotal = students * 5;
    const proTotal = students * 8;
    const enterpriseTotal = students * 12;

    if (starterPrice) starterPrice.textContent = isBn ? `৳${toBengaliNumber(starterTotal)}` : `৳${starterTotal.toLocaleString()}`;
    if (proPrice) proPrice.textContent = isBn ? `৳${toBengaliNumber(proTotal)}` : `৳${proTotal.toLocaleString()}`;
    if (enterprisePrice) enterprisePrice.textContent = isBn ? `৳${toBengaliNumber(enterpriseTotal)}` : `৳${enterpriseTotal.toLocaleString()}`;

    // Estimated Value Saved
    const paperSavings = Math.round(students * 18);
    const uncollectedRecovered = Math.round(students * 35);
    const hoursSaved = Math.round(students * 0.08);

    if (savedPaper) savedPaper.textContent = isBn ? `৳${toBengaliNumber(paperSavings)}` : `৳${paperSavings.toLocaleString()}`;
    if (savedDues) savedDues.textContent = isBn ? `৳${toBengaliNumber(uncollectedRecovered)}` : `৳${uncollectedRecovered.toLocaleString()}`;
    if (savedHours) savedHours.textContent = isBn ? `${toBengaliNumber(hoursSaved)} ঘণ্টা/মাস` : `${hoursSaved} hrs/mo`;
  }

  slider.addEventListener('input', updatePrices);
  window.addEventListener('yesEduLangChanged', updatePrices);
  updatePrices();
}

// Convert English numbers to Bengali numerals
function toBengaliNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bnDigits[d] || d).join('');
}

/* ==========================================================================
   3. 3D Card Perspective Tilt Effect
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   4. Active Video Showcase Theatre Engine (Animated Cartoon Characters & Transitions)
   ========================================================================== */
function initVideoShowcase() {
  const overlay = document.getElementById('videoOverlayControl');
  const overlayPlayBtn = document.getElementById('videoTheaterPlayBtn');
  const bottomPlayBtn = document.getElementById('videoBottomPlayBtn');
  const playIcon = document.getElementById('videoPlayIcon');
  const pauseIcon = document.getElementById('videoPauseIcon');
  const soundBtn = document.getElementById('videoSoundBtn');
  const soundOnIcon = document.getElementById('videoSoundOnIcon');
  const soundOffIcon = document.getElementById('videoSoundOffIcon');
  const progressTrack = document.getElementById('videoProgressTrack');
  const progressFill = document.getElementById('videoProgressFill');
  const currentTimeDisplay = document.getElementById('videoCurrentTimeDisplay');
  const chapterTag = document.getElementById('videoCurrentChapterTag');
  const simulationFrame = document.getElementById('videoSimulationFrame');
  const chapterPills = document.querySelectorAll('.video-chapter-pill-light');
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');

  // Video State
  let isPlaying = false;
  let isMuted = true;
  let currentTime = 0;
  const totalDuration = 40; // 4 chapters x 10 seconds each = 40 seconds total
  let videoTimer = null;
  let currentChapterIndex = 0;

  // Real Mac Video Detection & Fallback Orchestration
  const heroMacVideo = document.getElementById('heroMacVideo');
  if (heroMacVideo) {
    heroMacVideo.addEventListener('playing', () => {
      if (simulationFrame) simulationFrame.style.display = 'none';
      heroMacVideo.style.display = 'block';
    });
    heroMacVideo.addEventListener('error', () => {
      heroMacVideo.style.display = 'none';
      if (simulationFrame) simulationFrame.style.display = 'block';
    });
  }

  // Web Audio API Synthesizer
  let audioCtx = null;
  function playSoundEffect(type) {
    if (isMuted) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'chime') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const chapterMeta = [
    { startTime: 0, title: "Ch 1: Biometric Gateway Sync", glow: "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, transparent 70%)" },
    { startTime: 10, title: "Ch 2: bKash Fee Automation", glow: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)" },
    { startTime: 20, title: "Ch 3: Teacher AI V2 (NCTB)", glow: "radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%)" },
    { startTime: 30, title: "Ch 4: Madrasa Waqf & Hostel", glow: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)" }
  ];

  // Build the 4 Cartoon Animated Scenes into the Stage (White BG Edition)
  function buildCartoonStage() {
  if (!simulationFrame) return;

  simulationFrame.innerHTML = `
    <div class="video-stage-container w-full h-full relative bg-slate-900 text-white font-sans overflow-hidden flex flex-col justify-between">
      
      <!-- Top Enterprise App Console Header -->
      <div class="px-5 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
          <span class="font-mono text-slate-400 font-semibold hidden sm:inline">YES EDU 2.0 • Live Campus Operating System</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-mono text-emerald-400 text-[11px] font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">● LIVE CAMPUS TELEMETRY</span>
        </div>
      </div>

      <!-- Main Dynamic Scene Container -->
      <div class="flex-1 relative overflow-hidden p-5 sm:p-7">
        
        <!-- SCENE 1: Biometric Gate Attendance & Instant Telco SMS -->
        <div id="videoScene0" class="video-scene-wrapper active-scene h-full flex flex-col justify-between">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">MODULE 01 • GATE TELEMETRY</span>
              <h4 class="text-base sm:text-lg font-bold text-white">Morning Gate RFID Turnstile & Instant Mother's SMS</h4>
            </div>
            <span class="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full">07:58:12 AM</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 my-auto py-2">
            <!-- Left 7 cols: Live Gate Scan Stream -->
            <div class="md:col-span-7 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div class="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>GATE #01 PUNCH STREAM</span>
                <span class="text-emerald-400 font-mono">● 4ms Gateway Ping</span>
              </div>
              <div class="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800/80 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">T</span>
                  <div>
                    <span class="font-bold text-white text-xs block">Tanvir Mahmud</span>
                    <span class="text-[10px] text-slate-400">Roll 05 • Class 9-B • Gate #01</span>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">✓ SMS Delivered (2.1s)</span>
              </div>
              <div class="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">N</span>
                  <div>
                    <span class="font-bold text-slate-200 text-xs block">Nusrat Jahan</span>
                    <span class="text-[10px] text-slate-400">Roll 12 • Class 8-A • Gate #01</span>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">✓ SMS Delivered (1.9s)</span>
              </div>
            </div>

            <!-- Right 5 cols: Mother's Verified Telco SMS -->
            <div class="md:col-span-5 bg-emerald-950/30 p-4 rounded-xl border border-emerald-800/60 flex flex-col justify-between space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-emerald-400 flex items-center gap-1.5">📱 CARRIER SMS ROUTE</span>
                <span class="font-mono text-[10px] text-slate-400">BTRC MASKED</span>
              </div>
              <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                "সম্মানিত অভিভাবক, আপনার সন্তান তানভীর মাহমুদ সকাল ৭:৫৮ মিনিটে ক্যাম্পাসে নিরাপদে প্রবেশ করেছে। - ইয়েস এডু"
              </div>
              <div class="flex items-center justify-between text-[10px] text-emerald-400">
                <span>✓ GP / Robi / BL / Teletalk</span>
                <span class="font-mono">Latency: 2.1s</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Today's Total Attendance: <strong class="text-white font-mono">১,২২০ / ১,২৪০ (৯৮.৪%)</strong></span>
            <span class="text-emerald-400 font-semibold">● 100% ZKTeco Hardware Offline Sync</span>
          </div>
        </div>

        <!-- SCENE 2: 1-Tap bKash Fee & Automatic Bank Deposit -->
        <div id="videoScene1" class="video-scene-wrapper h-full flex flex-col justify-between">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold block">MODULE 02 • FINANCIAL LEDGER</span>
              <h4 class="text-base sm:text-lg font-bold text-white">1-Tap bKash Fee Collection & Instant Bank Auto-Deposit</h4>
            </div>
            <span class="text-xs font-mono font-bold text-pink-400 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">৳ 1-TAP GATEWAY</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 my-auto py-2">
            <!-- Left 6 cols: Digital Fee Voucher -->
            <div class="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div class="flex justify-between items-start text-xs">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold">STUDENT INVOICE</span>
                  <span class="font-bold text-white block mt-0.5">Samiul Haque • Class 4-A • Roll 07</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold animate-pulse">PAID ONLINE</span>
              </div>
              <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div class="flex justify-between text-slate-400">
                  <span>Monthly Tuition (Feb 2026):</span>
                  <span class="font-mono text-white font-bold">৳২,২০০</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Lab & Computer Charge:</span>
                  <span class="font-mono text-white font-bold">৳৩০০</span>
                </div>
                <div class="flex justify-between text-white font-bold pt-1.5 border-t border-slate-800">
                  <span>Total Amount Paid:</span>
                  <span class="font-mono text-pink-400 text-sm">৳২,৫০০</span>
                </div>
              </div>
            </div>

            <!-- Right 6 cols: Institutional Bank Reconcile -->
            <div class="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-emerald-400">INSTITUTIONAL BANK ROUTE</span>
                <span class="text-[10px] text-slate-400 font-mono">TRX: 9X824102</span>
              </div>
              <div class="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                <div class="flex justify-between text-slate-400">
                  <span>Settlement Bank:</span>
                  <span class="font-semibold text-white">Sonali Bank Ltd</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Account Number:</span>
                  <span class="font-mono text-slate-300">#2048-XXXX-091</span>
                </div>
                <div class="flex justify-between text-slate-400">
                  <span>Manual Ledger Entries:</span>
                  <span class="font-bold text-emerald-400">0 (Zero Mistakes)</span>
                </div>
              </div>
              <span class="text-[10px] text-emerald-400 font-semibold">✓ Auto-settled directly into school account</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Total Collected This Month: <strong class="text-white font-mono">৳২৮,৪০,০০০ (৯৪.২%)</strong></span>
            <span class="text-pink-400 font-semibold">● 100% Cashless Transparency</span>
          </div>
        </div>

        <!-- SCENE 3: NCTB 2026 AI Creative Exam & GPA 5.0 Tabulation -->
        <div id="videoScene2" class="video-scene-wrapper h-full flex flex-col justify-between">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">MODULE 03 • ACADEMIC EXAM AI</span>
              <h4 class="text-base sm:text-lg font-bold text-white">NCTB 2026 Board Creative Questions & GPA 5.0 Ranks</h4>
            </div>
            <span class="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">NCTB 2026 FORMAT</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 my-auto py-2">
            <!-- Left 6 cols: AI CQ Question Paper -->
            <div class="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span class="text-[10px] font-bold text-purple-400 uppercase">পদার্থবিজ্ঞান • ১০ম শ্রেণি • সৃজনশীল প্রশ্ন</span>
              <div class="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                "একটি ১০ কেজি ভরের স্থির বস্তুর ওপর ২০ নিউটন বল ৫ সেকেন্ড যাবত প্রযুক্ত হলো..."
              </div>
              <div class="space-y-1 text-xs text-slate-300">
                <div class="flex justify-between p-1.5 bg-slate-900/60 rounded">
                  <span>(ক) বলের মাত্রা সমীকরণ কী?</span>
                  <span class="font-mono text-purple-400 font-bold">[১]</span>
                </div>
                <div class="flex justify-between p-1.5 bg-slate-900/60 rounded">
                  <span>(খ) সাইকেলের চাকায় বিয়ারিং কেন ব্যবহার হয়?</span>
                  <span class="font-mono text-purple-400 font-bold">[২]</span>
                </div>
              </div>
            </div>

            <!-- Right 6 cols: Auto Merit Tabulation -->
            <div class="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span class="text-[10px] font-bold text-emerald-400 uppercase">Class 10-A Final Merit Tabulation</span>
              <div class="space-y-1.5">
                <div class="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px]">01</span>
                    <span class="font-bold text-white">Muhammad Abdullah</span>
                  </div>
                  <span class="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">5.00 (Golden A+)</span>
                </div>
                <div class="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[11px]">02</span>
                    <span class="font-bold text-white">Sumaiya Akter</span>
                  </div>
                  <span class="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">5.00 (A+)</span>
                </div>
              </div>
              <span class="text-[10px] text-slate-400 block pt-1">✓ Automated DSHE & Madrasah Board Grade Points</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Pass Percentage: <strong class="text-white font-mono">৯৯.২%</strong></span>
            <span class="text-purple-400 font-semibold">● 1-Click Printable PDF Progress Card</span>
          </div>
        </div>

        <!-- SCENE 4: Madrasa Waqf & Lillah Boarding Shariah Quarantine -->
        <div id="videoScene3" class="video-scene-wrapper h-full flex flex-col justify-between">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">MODULE 04 • MADRASA SHARIAH AUDIT</span>
              <h4 class="text-base sm:text-lg font-bold text-white">Lillah Boarding Orphan Fund Strict Quarantine</h4>
            </div>
            <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">100% SHARIAH COMPLIANT</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 my-auto py-2">
            <!-- Left 6 cols: Dual Fund Quarantine Comparison -->
            <div class="md:col-span-6 bg-amber-950/30 p-4 rounded-xl border border-amber-800/80 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-amber-300">🔒 Lillah & Orphan Fund</span>
                <span class="text-[10px] font-bold bg-amber-900 text-amber-200 px-2 py-0.5 rounded">QUARANTINED</span>
              </div>
              <div class="space-y-1 text-xs">
                <div class="flex justify-between text-slate-300">
                  <span>Total Donations Received:</span>
                  <span class="font-mono text-emerald-400 font-bold">৳১,৮০,০০০</span>
                </div>
                <div class="flex justify-between text-slate-300">
                  <span>Student Meals & Books:</span>
                  <span class="font-mono text-slate-300">৳১,২০,০০০</span>
                </div>
                <div class="flex justify-between text-white font-bold pt-1 border-t border-amber-800/60">
                  <span>Audited Reserve Balance:</span>
                  <span class="font-mono text-emerald-400">+৳৬০,০০০</span>
                </div>
              </div>
            </div>

            <!-- Right 6 cols: Verified Donor SMS Voucher -->
            <div class="md:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div class="flex justify-between text-xs">
                <span class="font-bold text-white">DONOR SMS RECEIPT</span>
                <span class="font-mono text-[10px] text-amber-400">VOUCHER: WQF-8492</span>
              </div>
              <div class="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 italic leading-relaxed">
                "আলহামদুলিল্লাহ! হাজী আবদুস সাত্তার সাহেব, এতিমখানা লিল্লাহ ফান্ডে আপনার ৩০,০০০ টাকা জমা হয়েছে। রশিদ: WQF-8492।"
              </div>
              <span class="text-[10px] text-emerald-400 font-semibold block">✓ Zero Cross-Fund Contamination Guarantee</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Specialized for Qawmi, Alim, Kamil & Tahfiz</span>
            <span class="text-amber-400 font-semibold">● Verified by Shariah Advisory Council</span>
          </div>
        </div>

      </div>

    </div>
  `;
}


function renderCurrentFrame() {
    const newIdx = getActiveChapterIndex(currentTime);

    // Bulletproof: explicitly update all 4 scene wrappers
    for (let i = 0; i < 4; i++) {
      const scene = document.getElementById(`videoScene${i}`);
      if (scene) {
        if (i === newIdx) {
          scene.classList.add('active-scene');
          scene.classList.remove('exit-scene');
        } else {
          scene.classList.remove('active-scene');
          scene.classList.add('exit-scene');
        }
      }
    }

    // Trigger transition effects when chapter changes
    if (newIdx !== currentChapterIndex) {
      currentChapterIndex = newIdx;

      // Update Dynamic Ambient Backlight Glow
      const ambientGlow = document.getElementById('videoAmbientGlow');
      if (ambientGlow && chapterMeta[newIdx]) {
        ambientGlow.style.background = chapterMeta[newIdx].glow;
      }

      // Play sound effect on chapter transition
      playSoundEffect(newIdx === 1 ? 'chime' : 'beep');
    }

    // Update chapter pills
    chapterPills.forEach((p, idx) => {
      if (idx === currentChapterIndex) p.classList.add('active');
      else p.classList.remove('active');
    });

    if (chapterTag) chapterTag.textContent = chapterMeta[currentChapterIndex].title;
    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(currentTime);

    // Update live Part indicator in studio header
    const partIndicator = document.getElementById('videoStudioPartIndicator');
    if (partIndicator) {
      partIndicator.textContent = `PART ${currentChapterIndex + 1} OF 4 (10s)`;
    }

    // Update progress bar
    const percent = (currentTime / totalDuration) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  function startPlayback() {
    isPlaying = true;
    if (overlay) overlay.classList.add('hidden-overlay');
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');

    if (videoTimer) clearInterval(videoTimer);
    videoTimer = setInterval(() => {
      currentTime++;
      if (currentTime >= totalDuration) {
        currentTime = 0;
      }
      renderCurrentFrame();
    }, 1000);

    renderCurrentFrame();
  }

  function pausePlayback() {
    isPlaying = false;
    if (videoTimer) clearInterval(videoTimer);
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
  }

  function togglePlayback() {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  // Event Listeners
  if (overlayPlayBtn) overlayPlayBtn.addEventListener('click', startPlayback);
  if (overlay) overlay.addEventListener('click', startPlayback);
  if (bottomPlayBtn) bottomPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayback();
  });

  // Prev / Next Part Buttons
  const prevPartBtn = document.getElementById('videoPrevPartBtn');
  const nextPartBtn = document.getElementById('videoNextPartBtn');

  if (prevPartBtn) {
    prevPartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let curPart = Math.floor((currentTime % 40) / 10);
      curPart = (curPart - 1 + 4) % 4;
      currentTime = curPart * 10;
      renderCurrentFrame();
      startPlayback();
    });
  }

  if (nextPartBtn) {
    nextPartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let curPart = Math.floor((currentTime % 40) / 10);
      curPart = (curPart + 1) % 4;
      currentTime = curPart * 10;
      renderCurrentFrame();
      startPlayback();
    });
  }

  // Click on any .jump-chapter-btn inside videoSimulationFrame
  if (simulationFrame) {
    simulationFrame.addEventListener('click', (e) => {
      const jumpBtn = e.target.closest('.jump-chapter-btn');
      if (jumpBtn) {
        e.stopPropagation();
        const targetPart = parseInt(jumpBtn.getAttribute('data-jump'), 10);
        if (!isNaN(targetPart)) {
          currentTime = targetPart * 10;
          renderCurrentFrame();
          startPlayback();
        }
      }
    });
  }

  // Sound toggle
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      if (isMuted) {
        if (soundOnIcon) soundOnIcon.classList.add('hidden');
        if (soundOffIcon) soundOffIcon.classList.remove('hidden');
      } else {
        if (soundOnIcon) soundOnIcon.classList.remove('hidden');
        if (soundOffIcon) soundOffIcon.classList.add('hidden');
        playSoundEffect('chime');
      }
    });
  }

  // Seek on progress track click
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = progressTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      currentTime = Math.round(pos * totalDuration);
      renderCurrentFrame();
    });
  }

  // Chapter pills click seeks to chapter with smooth transition
  chapterPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      currentTime = chapterMeta[idx].startTime;
      renderCurrentFrame();
      startPlayback();
    });
  });

  // Fullscreen modal trigger
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openVideoPlayerModal();
    });
  }

  // Custom Video URL loader in Modal
  const customVideoInput = document.getElementById('customVideoInput');
  const applyCustomVideoBtn = document.getElementById('applyCustomVideoBtn');
  const modalIframe = document.getElementById('modalVideoIframe');

  if (applyCustomVideoBtn && customVideoInput && modalIframe) {
    applyCustomVideoBtn.addEventListener('click', () => {
      const url = customVideoInput.value.trim();
      if (!url) return;

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('v=')) {
          videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        }
        if (videoId) {
          modalIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        }
      } else {
        modalIframe.src = url;
      }
    });
  }

  // Build cartoon stage, render initial frame and start smooth ambient tour
  buildCartoonStage();
  renderCurrentFrame();
  startPlayback();
}

function openVideoPlayerModal() {
  const modal = document.getElementById('videoPlayerModal');
  if (modal) {
    modal.classList.add('open');
  }
}

/* ==========================================================================
   5. Interactive Demo Booking Modal & Toast
   ========================================================================== */
function initDemoModal() {
  const modal = document.getElementById('demoModal');
  const openBtns = document.querySelectorAll('.trigger-demo-modal');
  const closeBtns = document.querySelectorAll('.close-demo-modal');
  const form = document.getElementById('demoBookingForm');
  const toast = document.getElementById('toastNotice');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('open');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
    });
  });

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const instName = document.getElementById('demoInstName').value;
      const phone = document.getElementById('demoPhone').value;

      // Close modal
      if (modal) modal.classList.remove('open');

      // Show toast
      if (toast) {
        toast.innerHTML = `
          <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span>ধন্যবাদ! "${instName}"-এর অনবোর্ডিং কনসালটেন্ট শিগগিরই ${phone}-এ কল করবেন।</span>
        `;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }

      form.reset();
    });
  }
}

/* ==========================================================================
   6. Dual-Language Switcher (English / বাংলা)
   ========================================================================== */
function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langEnBtn = document.getElementById('langEnBtn');
  const langBnBtn = document.getElementById('langBnBtn');
  let currentLang = localStorage.getItem('yes_edu_lang') || 'en';

  function applyLanguage(lang) {
    const enElements = document.querySelectorAll('.lang-en');
    const bnElements = document.querySelectorAll('.lang-bn');

    if (lang === 'bn') {
      enElements.forEach(el => el.classList.add('hidden'));
      bnElements.forEach(el => el.classList.remove('hidden'));
      if (langToggleBtn) langToggleBtn.textContent = 'English';
      if (langBnBtn) langBnBtn.classList.add('active');
      if (langEnBtn) langEnBtn.classList.remove('active');
      document.body.classList.add('font-bn');
    } else {
      enElements.forEach(el => el.classList.remove('hidden'));
      bnElements.forEach(el => el.classList.add('hidden'));
      if (langToggleBtn) langToggleBtn.textContent = 'বাংলা';
      if (langEnBtn) langEnBtn.classList.add('active');
      if (langBnBtn) langBnBtn.classList.remove('active');
      document.body.classList.remove('font-bn');
    }
    localStorage.setItem('yes_edu_lang', lang);
    window.dispatchEvent(new CustomEvent('yesEduLangChanged', { detail: { lang } }));
  }

  if (langEnBtn) {
    langEnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = 'en';
      applyLanguage(currentLang);
    });
  }

  if (langBnBtn) {
    langBnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = 'bn';
      applyLanguage(currentLang);
    });
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'en' ? 'bn' : 'en';
      applyLanguage(currentLang);
    });
  }

  // Initial apply
  applyLanguage(currentLang);
}

/* ==========================================================================
   7. Bento Grid Tab Switcher
   ========================================================================== */
function initBentoTabs() {
  const tabBtns = document.querySelectorAll('.bento-tab-btn');
  const tabPanels = document.querySelectorAll('.bento-tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanels.forEach(panel => {
        if (panel.getAttribute('data-panel') === target) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion Controller
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   9. Persona Switcher (School, Madrasa, Cadet)
   ========================================================================== */
function initPersonaSwitcher() {
  const personaBtns = document.querySelectorAll('.persona-tab-btn');
  const subtextEn = document.getElementById('heroPersonaSubtextEn');
  const subtextBn = document.getElementById('heroPersonaSubtextBn');

  const personaCopy = {
    school: {
      en: "YES EDU is the premier institutional cloud ERP engineered specifically for Bangladesh. Seamlessly integrates instant biometric gate SMS, 1-click bKash/Nagad fee collection, NCTB 2026 AI question bank, and digital tabulation.",
      bn: "স্কুল ও কলেজের জন্য পূর্ণাঙ্গ ক্লাউড ম্যানেজমেন্ট সফটওয়্যার। বায়োমেট্রিক গেট এন্ট্রি এসএমএস, অটো বিকাশ/নগদ ফি আদায়, এনসিটিবি এআই শিক্ষক সহকারী এবং ডিজিটাল মার্কশিট প্রস্তুতকারক।"
    },
    madrasa: {
      en: "Strict Shariah-compliant double-entry accounting for Qawmi & Aliya Madrasas. Separate Lillah Boarding, Zakat, and General tuition ledgers with automated donor SMS receipts and audit balance sheets.",
      bn: "কওমি ও আলিয়া মাদ্রাসার জন্য পূর্ণাঙ্গ শরিয়াহসম্মত ক্লাউড প্ল্যাটফর্ম। সাধারণ শিক্ষা ফান্ড, এতিমখানা লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের সম্পূর্ণ পৃথক হিসাব এবং দাতাদের অটো এসএমএস রসিদ।"
    },
    cadet: {
      en: "Military-grade residential campus management. 24/7 dormitory bed matrix, dining meal allocation, live school bus GPS tracking, and parent mobile communication.",
      bn: "ক্যাডেট ও রেসিডেন্সিয়াল একাডেমির জন্য সার্বক্ষণিক ক্যাম্পাস কন্ট্রোল। হোস্টেল বেড বণ্টন, ডাইনিং মিলের নির্ভুল হিসাব, স্কুল বাস জিপিএস এবং অভিভাবক মোবাইল সংযোগ।"
    }
  };

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const persona = btn.getAttribute('data-persona');
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (personaCopy[persona]) {
        if (subtextEn) subtextEn.textContent = personaCopy[persona].en;
        if (subtextBn) subtextBn.textContent = personaCopy[persona].bn;

        const descText = document.getElementById('heroDescriptionText');
        if (descText) {
          const enSpan = descText.querySelector('.lang-en');
          const bnSpan = descText.querySelector('.lang-bn');
          if (enSpan) enSpan.innerHTML = personaCopy[persona].en;
          if (bnSpan) bnSpan.innerHTML = personaCopy[persona].bn;
        }
      }

      // Automatically sync software window tab to relevant module
      if (persona === 'madrasa') {
        switchSoftwareTab('waqf');
      } else if (persona === 'cadet') {
        switchSoftwareTab('biometric');
      } else {
        switchSoftwareTab('dashboard');
      }
    });
  });
}

/* ==========================================================================
   10. macOS Live Campus OS Window Tabs, Dual-Screen Sync & Live Simulators
   ========================================================================== */
function showToastNotification(msg) {
  const toast = document.getElementById('demoToast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

function triggerDynamicIslandAlert(text, duration = 3000) {
  const island = document.getElementById('phoneDynamicIsland');
  const islandText = document.getElementById('phoneDynamicIslandText');
  if (!island || !islandText) return;

  islandText.textContent = text;
  island.classList.add('expanded');
  clearTimeout(island._timer);
  island._timer = setTimeout(() => {
    island.classList.remove('expanded');
    const now = new Date();
    islandText.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }, duration);
}

function switchSoftwareTab(targetTab) {
  const tabBtns = document.querySelectorAll('.software-tab-btn, .artisan-nav-tab, .solid-module-tab');
  const panels = document.querySelectorAll('.software-panel');
  const phonePanels = document.querySelectorAll('.phone-tab-panel');
  const syncStatus = document.getElementById('phoneSyncStatus');

  // Update Desktop Tab Buttons
  tabBtns.forEach(b => {
    if (b.getAttribute('data-software-tab') === targetTab) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  // Update Desktop Workspace Panels
  panels.forEach(panel => {
    const panelId = panel.id.replace('swPanel', '').toLowerCase();
    if (panelId === targetTab.toLowerCase()) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Update Phone Synchronized Tab Panels
  phonePanels.forEach(panel => {
    const pId = panel.id.replace('phoneTab', '').toLowerCase();
    if (pId === targetTab.toLowerCase()) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // Brief flash on phone sync indicator
  if (syncStatus) {
    syncStatus.classList.add('scale-105', 'bg-emerald-100');
    setTimeout(() => {
      syncStatus.classList.remove('scale-105', 'bg-emerald-100');
    }, 400);
  }

  // Dynamic Island synchronization preview
  const tabNames = {
    dashboard: '📊 Executive BI Synced',
    biometric: '⏱️ Biometric Gate Synced',
    bkash: '৳ bKash Fees Synced',
    exam: '📝 NCTB AI Exam Synced',
    waqf: '🕌 Waqf & Lillah Synced'
  };
  if (tabNames[targetTab]) {
    triggerDynamicIslandAlert(tabNames[targetTab], 2200);
  }
}

function initSoftwareWindowTabs() {
  const tabBtns = document.querySelectorAll('.software-tab-btn, .artisan-nav-tab, .solid-module-tab');
  const clockDisplay = document.getElementById('macClockDisplay');

  // Tab click listeners
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-software-tab');
      switchSoftwareTab(target);
    });
  });

  // Real-time macOS Clock
  function updateClock() {
    if (!clockDisplay) return;
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    
    // Also update dynamic island clock if not expanded
    const island = document.getElementById('phoneDynamicIsland');
    const islandText = document.getElementById('phoneDynamicIslandText');
    if (island && islandText && !island.classList.contains('expanded')) {
      islandText.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // =========================================================================
  // 1. Executive BI Dashboard: School vs Madrasa Mode Persona Toggle
  // =========================================================================
  const biToggleSchool = document.getElementById('biToggleSchool');
  const biToggleMadrasa = document.getElementById('biToggleMadrasa');
  const biKpiEnrolledLabel = document.getElementById('biKpiEnrolledLabel');
  const biKpiEnrolledValue = document.getElementById('biKpiEnrolledValue');
  const biKpiEnrolledSub = document.getElementById('biKpiEnrolledSub');
  const biKpiFeesLabel = document.getElementById('biKpiFeesLabel');
  const biKpiFeesValue = document.getElementById('biKpiFeesValue');
  const biKpiFeesSub = document.getElementById('biKpiFeesSub');
  const biKpiGateLabel = document.getElementById('biKpiGateLabel');
  const biKpiGateValue = document.getElementById('biKpiGateValue');
  const biKpiGateSub = document.getElementById('biKpiGateSub');
  const biKpiSmsLabel = document.getElementById('biKpiSmsLabel');
  const biKpiSmsValue = document.getElementById('biKpiSmsValue');
  const biKpiSmsSub = document.getElementById('biKpiSmsSub');
  const phoneStudentName = document.getElementById('phoneStudentName');
  const phoneStudentMeta = document.getElementById('phoneStudentMeta');

  if (biToggleSchool && biToggleMadrasa) {
    biToggleSchool.addEventListener('click', () => {
      biToggleSchool.classList.add('active');
      biToggleMadrasa.classList.remove('active');

      if (biKpiEnrolledLabel) biKpiEnrolledLabel.textContent = 'Total Enrolled';
      if (biKpiEnrolledValue) biKpiEnrolledValue.textContent = '১,২৪০ জন';
      if (biKpiEnrolledSub) biKpiEnrolledSub.textContent = 'Present: ১,২২০ (৯৮.৪%)';

      if (biKpiFeesLabel) biKpiFeesLabel.textContent = "Today's Fees";
      if (biKpiFeesValue) biKpiFeesValue.textContent = '৳৪,৮৫,২০০';
      if (biKpiFeesSub) biKpiFeesSub.textContent = 'bKash: 74% • Bank: 26%';

      if (biKpiGateLabel) biKpiGateLabel.textContent = 'Gate Punch Status';
      if (biKpiGateValue) biKpiGateValue.textContent = 'Online';
      if (biKpiGateSub) biKpiGateSub.textContent = 'Gate #01 & #02 Synced';

      if (biKpiSmsLabel) biKpiSmsLabel.textContent = 'SMS Delivery';
      if (biKpiSmsValue) biKpiSmsValue.textContent = '১,২২০ টি';
      if (biKpiSmsSub) biKpiSmsSub.textContent = 'Avg Delivery: 2.3s';

      if (phoneStudentName) phoneStudentName.textContent = 'Muhammad Abdullah';
      if (phoneStudentMeta) phoneStudentMeta.textContent = 'Class 10-A • Roll: 01';

      triggerDynamicIslandAlert('🏫 School & College Mode Activated', 2500);
      showToastNotification('🏫 Dashboard switched to School & College KPIs');
    });

    biToggleMadrasa.addEventListener('click', () => {
      biToggleMadrasa.classList.add('active');
      biToggleSchool.classList.remove('active');

      if (biKpiEnrolledLabel) biKpiEnrolledLabel.textContent = 'মোট তালিব-ই-ইলম';
      if (biKpiEnrolledValue) biKpiEnrolledValue.textContent = '৮৬০ জন';
      if (biKpiEnrolledSub) biKpiEnrolledSub.textContent = 'উপস্থিত: ৮৫২ জন (৯৯.১%)';

      if (biKpiFeesLabel) biKpiFeesLabel.textContent = 'ওয়াকফ ও লিল্লাহ ফান্ড';
      if (biKpiFeesValue) biKpiFeesValue.textContent = '৳৬,৪০,০০০';
      if (biKpiFeesSub) biKpiFeesSub.textContent = 'শরিয়াহ অডিট লকড';

      if (biKpiGateLabel) biKpiGateLabel.textContent = 'হিফজ খতমে কোরআন';
      if (biKpiGateValue) biKpiGateValue.textContent = '১৮ পারা';
      if (biKpiGateSub) biKpiGateSub.textContent = 'আজ সম্পন্ন: ২ জন';

      if (biKpiSmsLabel) biKpiSmsLabel.textContent = 'লিল্লাহ বোর্ডিং খানা';
      if (biKpiSmsValue) biKpiSmsValue.textContent = '৩৫০ জন';
      if (biKpiSmsSub) biKpiSmsSub.textContent = 'সেহরি ও ইফতার প্রস্তুত';

      if (phoneStudentName) phoneStudentName.textContent = 'মুহাম্মদ আবদুল্লাহ';
      if (phoneStudentMeta) phoneStudentMeta.textContent = 'হিফজ ও কিতাব বিভাগ • রোল: ০১';

      triggerDynamicIslandAlert('🕌 Madrasa & Waqf Mode Activated', 2500);
      showToastNotification('🕌 Dashboard switched to Madrasa & Waqf KPIs');
    });
  }

  // =========================================================================
  // 2. Biometric Gate Simulator (Simulates ZKTeco Turnstile Scan + Parent SMS)
  // =========================================================================
  const simPunchBtn = document.getElementById('triggerGatePunchSimBtn');
  const simPunchLogBody = document.getElementById('simPunchLogBody');
  const simPunchCount = document.getElementById('simPunchCount');
  const simSmsText = document.getElementById('simulatedSmsText');
  const simSmsTimestamp = document.getElementById('simulatedSmsTimestamp');
  const phoneGateTime = document.getElementById('phoneGateTime');
  const phoneSmsText = document.getElementById('phoneSmsText');
  const phoneStudentAvatar = document.getElementById('phoneStudentAvatar');

  if (simPunchBtn && simPunchLogBody) {
    const demoStudents = [
      { roll: '05', name: 'Tanvir Mahmud', class: 'Class 9-B' },
      { roll: '12', name: 'Nusrat Jahan', class: 'Class 8-A' },
      { roll: '23', name: 'Muhammad Rayhan', class: 'Class 10-C' },
      { roll: '08', name: 'Ayesha Siddiqua', class: 'Class 7-A' },
      { roll: '01', name: 'Muhammad Abdullah', class: 'Class 10-A' }
    ];
    let studentIndex = 0;
    let punchCounter = 1220;

    simPunchBtn.addEventListener('click', () => {
      const student = demoStudents[studentIndex % demoStudents.length];
      studentIndex++;
      punchCounter++;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: true });

      if (simPunchCount) {
        simPunchCount.textContent = punchCounter.toLocaleString('bn-BD');
      }

      // Add modern card to desktop arrival stream (table-free)
      const card = document.createElement('div');
      card.className = 'p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-300 flex items-center justify-between shadow-2xs transition-all duration-500';
      card.innerHTML = `
        <div class="flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-xs shadow-2xs">${student.name.charAt(0)}</span>
          <div>
            <span class="font-bold text-slate-900 block text-xs">${student.name}</span>
            <span class="text-[10px] text-slate-500 font-medium">Roll ${student.roll} • ${student.class} • Gate #01</span>
          </div>
        </div>
        <div class="text-right">
          <span class="font-mono text-slate-700 block text-[11px] font-semibold">${timeStr}</span>
          <span class="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">✓ SMS Delivered (2.1s)</span>
        </div>
      `;
      simPunchLogBody.insertBefore(card, simPunchLogBody.firstChild);

      // Update SMS preview on desktop
      const smsMsg = `"সম্মানিত অভিভাবক, আপনার সন্তান ${student.name} (রোল: ${student.roll}, ${student.class}) এইমাত্র ${timeStr} মিনিটে ক্যাম্পাসে নিরাপদে প্রবেশ করেছে। - ইয়েস এডু"`;
      if (simSmsText) simSmsText.textContent = smsMsg;
      if (simSmsTimestamp) simSmsTimestamp.textContent = `Today at ${timeStr}`;

      // Synchronize with Tactile Physical RFID Card
      const tactileCardName = document.getElementById('tactileCardStudentName');
      const tactileCardMeta = document.getElementById('tactileCardStudentMeta');
      const tactileCardRoll = document.getElementById('tactileCardRoll');
      const tactileCardAvatar = document.getElementById('tactileCardAvatar');
      if (tactileCardName) tactileCardName.textContent = student.name;
      if (tactileCardMeta) tactileCardMeta.textContent = `${student.class} • Regular Batch`;
      if (tactileCardRoll) tactileCardRoll.textContent = `Roll: ${student.roll} • ID: YE-2026-0849`;
      if (tactileCardAvatar) tactileCardAvatar.textContent = student.name.charAt(0);

      // Synchronize with Phone Mockup
      if (phoneStudentName) phoneStudentName.textContent = student.name;
      if (phoneStudentMeta) phoneStudentMeta.textContent = `${student.class} • Roll: ${student.roll}`;
      if (phoneGateTime) phoneGateTime.textContent = timeStr;
      if (phoneSmsText) phoneSmsText.textContent = smsMsg;
      if (phoneStudentAvatar) phoneStudentAvatar.textContent = student.name.charAt(0);

      // Trigger Phone Dynamic Island Dropdown
      triggerDynamicIslandAlert(`⚡ Gate Scan: ${student.name} arrived`, 3200);

      // Show toast
      showToastNotification(`⚡ Gate Punch: ${student.name} scanned! Parent SMS delivered in 2.1s`);
    });

    // 3D Mouse Parallax & Tap on Physical RFID Card
    const rfidCardEl = document.getElementById('tactileRfidCardElement');
    if (rfidCardEl) {
      rfidCardEl.addEventListener('click', () => {
        rfidCardEl.style.transform = 'scale(0.97) translateY(-2px)';
        setTimeout(() => {
          rfidCardEl.style.transform = '';
          simPunchBtn.click();
        }, 150);
      });
      rfidCardEl.addEventListener('mousemove', (e) => {
        const rect = rfidCardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = (x - xc) / xc;
        const dy = (y - yc) / yc;
        rfidCardEl.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg) translateY(-6px)`;
      });
      rfidCardEl.addEventListener('mouseleave', () => {
        rfidCardEl.style.transform = '';
      });
    }
  }

  // =========================================================================
  // 3. bKash 1-Tap Payment Simulator (Synchronized between macOS & Phone)
  // =========================================================================
  const triggerBkashPaymentSimBtn = document.getElementById('triggerBkashPaymentSimBtn');
  const phonePayBkashBtn = document.getElementById('phonePayBkashBtn');
  const desktopBkashVoucherBadge = document.getElementById('desktopBkashVoucherBadge');
  const desktopBkashTrx = document.getElementById('desktopBkashTrx');
  const phoneBkashStatusPill = document.getElementById('phoneBkashStatusPill');
  const phoneBkashTrxNotice = document.getElementById('phoneBkashTrxNotice');

  function executeBkashPaymentSimulation() {
    const randomTrx = 'TRX: 9X' + Math.floor(100000 + Math.random() * 900000);

    // Desktop updates
    if (desktopBkashVoucherBadge) {
      desktopBkashVoucherBadge.textContent = 'PAID ONLINE (JUST NOW)';
      desktopBkashVoucherBadge.className = 'px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] animate-pulse';
    }
    if (desktopBkashTrx) {
      desktopBkashTrx.textContent = randomTrx;
    }

    // Phone updates
    if (phoneBkashStatusPill) {
      phoneBkashStatusPill.textContent = 'PAID ONLINE';
      phoneBkashStatusPill.className = 'px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]';
    }
    if (phonePayBkashBtn) {
      phonePayBkashBtn.innerHTML = `<span>✓ Payment Successful (${randomTrx})</span>`;
      phonePayBkashBtn.className = 'w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-default';
    }
    if (phoneBkashTrxNotice) {
      phoneBkashTrxNotice.textContent = 'Auto-reconciled with Campus Bank Account (100% Verified)';
      phoneBkashTrxNotice.className = 'text-[10px] text-center text-emerald-700 font-semibold';
    }

    // Dynamic Island & Toast
    triggerDynamicIslandAlert(`৳ bKash Paid: ৳2,500 Auto-Reconciled`, 3200);
    showToastNotification(`⚡ bKash Payment Reconciled: ৳2,500 deposited into Campus Bank! (${randomTrx})`);
  }

  if (triggerBkashPaymentSimBtn) {
    triggerBkashPaymentSimBtn.addEventListener('click', executeBkashPaymentSimulation);
  }
  if (phonePayBkashBtn) {
    phonePayBkashBtn.addEventListener('click', executeBkashPaymentSimulation);
  }

  // =========================================================================
  // 4. NCTB AI Question Generator Simulator (Subject Switcher)
  // =========================================================================
  const triggerExamAiGenBtn = document.getElementById('triggerExamAiGenBtn');
  const desktopExamSubjectHeader = document.getElementById('desktopExamSubjectHeader');
  const desktopExamStemText = document.getElementById('desktopExamStemText');
  const desktopExamQuestionsList = document.getElementById('desktopExamQuestionsList');
  const desktopExamTabulationBody = document.getElementById('desktopExamTabulationBody');

  if (triggerExamAiGenBtn) {
    const examSubjects = [
      {
        subject: 'পদার্থবিজ্ঞান • ১০ম শ্রেণি • বার্ষিক মূল্যায়ন পরীক্ষা',
        stem: 'একটি ১০ কেজি ভরের স্থির বস্তুর ওপর ২০ নিউটন বল ৫ সেকেন্ড যাবত প্রযুক্ত হলো। ৫ সেকেন্ড পর বলের ক্রিয়া বন্ধ হয়ে গেল।',
        questions: [
          { q: '(ক) বলের মাত্রা সমীকরণ কী?', marks: '[১]' },
          { q: '(খ) সাইকেলের চাকায় বিয়ারিং ব্যবহার করা হয় কেন? ব্যাখ্যা করো।', marks: '[২]' },
          { q: '(গ) ৫ সেকেন্ডে বস্তুটির অতিক্রান্ত দূরত্ব নির্ণয় করো।', marks: '[৩]' },
          { q: '(ঘ) বলের মান দ্বিগুণ করলে গতিশক্তির কীরূপ পরিবর্তন ঘটবে? গাণিতিকভাবে বিশ্লেষণ করো।', marks: '[৪]' }
        ],
        ranks: [
          { roll: '01', name: 'Abdullah', marks: '275 / 300', gpa: '5.00 (A+)' },
          { roll: '02', name: 'Sumaiya', marks: '266 / 300', gpa: '5.00 (A+)' }
        ]
      },
      {
        subject: 'উচ্চতর গণিত • ১০ম শ্রেণি • বোর্ড স্ট্যান্ডার্ড সৃজনশীল',
        stem: 'A(2, 5) এবং B(8, -3) দুটি বিন্দু এবং একটি বৃত্তের সমীকরণ x² + y² - 4x + 6y - 12 = 0।',
        questions: [
          { q: '(ক) বৃত্তটির কেন্দ্র ও ব্যাসার্ধ নির্ণয় করো।', marks: '[১]' },
          { q: '(খ) AB সরলরেখার সমীকরণ ও ঢাল বের করো।', marks: '[২]' },
          { q: '(গ) A ও B বিন্দুগামী সংযোগ রেখাংশের সমদ্বিখণ্ডকের সমীকরণ নির্ণয় করো।', marks: '[৩]' },
          { q: '(ঘ) উদ্দীপকের বৃত্তটি দ্বারা অক্ষদ্বয়ের খণ্ডিতাংশের দৈর্ঘ্য জ্যামিতিকভাবে নিরূপণ করো।', marks: '[৪]' }
        ],
        ranks: [
          { roll: '01', name: 'Abdullah', marks: '292 / 300', gpa: '5.00 (Golden A+)' },
          { roll: '05', name: 'Tanvir', marks: '284 / 300', gpa: '5.00 (A+)' }
        ]
      },
      {
        subject: 'বাংলা ১ম পত্র • ১০ম শ্রেণি • এনসিটিবি নতুন মূল্যায়ন ২০২৬',
        stem: 'রফিক সাহেব তার গ্রামের অবহেলিত শিশুদের জন্য একটি অবৈতনিক বিদ্যালয় গড়ে তুলেছেন। যুদ্ধের সময় তিনি নিজের ভিটেমাটি ত্যাগ করে মুক্তিযোদ্ধাদের খাদ্য ও আশ্রয় দিয়েছিলেন।',
        questions: [
          { q: '(ক) \'একাত্তরের দিনগুলি\' কার লেখা?', marks: '[১]' },
          { q: '(খ) \'স্বাধীনতা, এ শব্দটি কীভাবে আমাদের হলো\'—বুঝিয়ে লেখ।', marks: '[২]' },
          { q: '(গ) উদ্দীপকের রফিক সাহেবের কর্মতৎপরতায় পাঠ্যবইয়ের কোন ভাব প্রতিফলিত হয়েছে?', marks: '[৩]' },
          { q: '(ঘ) "রফিক সাহেবের দেশপ্রেমই বাঙালির মুক্তির মূল চেতনা"—উক্তিটির যথার্থতা নিরূপণ করো।', marks: '[৪]' }
        ],
        ranks: [
          { roll: '02', name: 'Sumaiya', marks: '289 / 300', gpa: '5.00 (Golden A+)' },
          { roll: '01', name: 'Abdullah', marks: '281 / 300', gpa: '5.00 (A+)' }
        ]
      }
    ];
    let examSubjectIndex = 0;

    triggerExamAiGenBtn.addEventListener('click', () => {
      examSubjectIndex++;
      const current = examSubjects[examSubjectIndex % examSubjects.length];

      if (desktopExamSubjectHeader) desktopExamSubjectHeader.textContent = current.subject;
      if (desktopExamStemText) desktopExamStemText.textContent = current.stem;

      if (desktopExamQuestionsList) {
        desktopExamQuestionsList.innerHTML = current.questions.map(item => `
          <div class="p-2 bg-white rounded-lg border border-slate-200/70 flex justify-between items-center">
            <span>${item.q}</span>
            <span class="font-bold text-purple-700 font-mono text-[11px] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">${item.marks}</span>
          </div>
        `).join('');
      }

      if (desktopExamTabulationBody) {
        desktopExamTabulationBody.innerHTML = current.ranks.map(r => `
          <div class="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">${r.roll}</span>
              <div>
                <span class="font-bold text-slate-900 block text-xs">${r.name}</span>
                <span class="text-[10px] text-slate-500 font-mono">${r.marks}</span>
              </div>
            </div>
            <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">${r.gpa}</span>
          </div>
        `).join('');
      }

      triggerDynamicIslandAlert('✨ NCTB AI: New Exam Paper Compiled', 2800);
      showToastNotification(`✨ NCTB AI Question Generated: ${current.subject.split('•')[0].trim()}`);
    });
  }

  // =========================================================================
  // 5. Madrasa Waqf Donor Contribution Simulator
  // =========================================================================
  const triggerWaqfDonationSimBtn = document.getElementById('triggerWaqfDonationSimBtn');
  const desktopWaqfDonationTotal = document.getElementById('desktopWaqfDonationTotal');
  const desktopWaqfNetBalance = document.getElementById('desktopWaqfNetBalance');
  const desktopWaqfVoucherNo = document.getElementById('desktopWaqfVoucherNo');
  const desktopWaqfSmsText = document.getElementById('desktopWaqfSmsText');
  const phoneDonorName = document.getElementById('phoneDonorName');
  const phoneDonationAmount = document.getElementById('phoneDonationAmount');

  if (triggerWaqfDonationSimBtn) {
    const donors = [
      { name: 'হাজী আবদুস সাত্তার সাহেব', amount: '৳৩০,০০০', fund: 'এতিমখানা লিল্লাহ বোর্ডিং ও কিতাব ফান্ড', total: '৳২,১০,০০০', net: '+৳৯০,০০০' },
      { name: 'আলহাজ্ব নূরুল ইসলাম চৌধুরী', amount: '৳৫০,০০০', fund: 'মসজিদ কমপ্লেক্স ও ওয়াকফ ফান্ড', total: '৳২,৬০,০০০', net: '+৳১,৪০,০০০' },
      { name: 'মোহাম্মদ দেলোয়ার হোসেন', amount: '৳২৫,০০০', fund: 'দরিদ্র তালিব-ই-ইলম চিকিৎসা ফান্ড', total: '৳২,৮৫,০০০', net: '+৳১,৬৫,০০০' }
    ];
    let donorIndex = 0;

    triggerWaqfDonationSimBtn.addEventListener('click', () => {
      const d = donors[donorIndex % donors.length];
      donorIndex++;
      const vNo = 'VOUCHER: WQF-' + Math.floor(1000 + Math.random() * 9000);

      if (desktopWaqfDonationTotal) desktopWaqfDonationTotal.textContent = d.total;
      if (desktopWaqfNetBalance) desktopWaqfNetBalance.textContent = d.net;
      if (desktopWaqfVoucherNo) desktopWaqfVoucherNo.textContent = vNo;
      if (desktopWaqfSmsText) {
        desktopWaqfSmsText.textContent = `"আলহামদুলিল্লাহ! ${d.name}, জামিয়া ইসলামিয়া ${d.fund} এ আপনার ${d.amount.replace('৳', '')} টাকার অনুদান সফলভাবে জমা হয়েছে। রশিদ নং: ${vNo.replace('VOUCHER: ', '')}। আল্লাহ আপনার দানকে কবুল করুন।"`;
      }

      // Update Phone Screen
      if (phoneDonorName) phoneDonorName.textContent = d.name.replace(' সাহেব', '');
      if (phoneDonationAmount) phoneDonationAmount.textContent = d.amount;

      triggerDynamicIslandAlert(`🕌 Waqf: ${d.amount} Donation Verified`, 3000);
      showToastNotification(`🕌 Waqf Contribution: ${d.amount} verified and quarantined!`);
    });
  }

  // =========================================================================
  // 6. Mobile Screen Switcher (Desktop Admin OS vs Guardian Parent App)
  // =========================================================================
  const mobileStageToggleAdmin = document.getElementById('mobileStageToggleAdmin');
  const mobileStageTogglePhone = document.getElementById('mobileStageTogglePhone');
  const macWindowCol = document.getElementById('macWindowCol');
  const phoneMockupCol = document.getElementById('phoneMockupCol');

  if (mobileStageToggleAdmin && mobileStageTogglePhone && macWindowCol && phoneMockupCol) {
    mobileStageToggleAdmin.addEventListener('click', () => {
      mobileStageToggleAdmin.className = 'px-4 py-1.5 rounded-full bg-white text-slate-900 shadow-sm transition';
      mobileStageTogglePhone.className = 'px-4 py-1.5 rounded-full text-slate-600 hover:text-slate-900 transition';
      macWindowCol.classList.remove('hidden');
      phoneMockupCol.classList.add('hidden');
    });

    mobileStageTogglePhone.addEventListener('click', () => {
      mobileStageTogglePhone.className = 'px-4 py-1.5 rounded-full bg-white text-slate-900 shadow-sm transition';
      mobileStageToggleAdmin.className = 'px-4 py-1.5 rounded-full text-slate-600 hover:text-slate-900 transition';
      macWindowCol.classList.add('hidden');
      phoneMockupCol.classList.remove('hidden');
    });
  }

  // =========================================================================
  // 7. Multi-Role Smartphone App Switcher (Parent • Teacher AI • Principal)
  // =========================================================================
  const phoneRoleParentBtn = document.getElementById('phoneRoleParentBtn');
  const phoneRoleTeacherBtn = document.getElementById('phoneRoleTeacherBtn');
  const phoneRolePrincipalBtn = document.getElementById('phoneRolePrincipalBtn');
  const phoneAppTopTitle = document.getElementById('phoneAppTopTitle');
  const phoneRoleParentView = document.getElementById('phoneRoleParentView');
  const phoneRoleTeacherView = document.getElementById('phoneRoleTeacherView');
  const phoneRolePrincipalView = document.getElementById('phoneRolePrincipalView');

  function selectPhoneRole(role) {
    [phoneRoleParentBtn, phoneRoleTeacherBtn, phoneRolePrincipalBtn].forEach(b => {
      if (b) b.classList.remove('active');
    });

    if (role === 'parent') {
      if (phoneRoleParentBtn) phoneRoleParentBtn.classList.add('active');
      if (phoneAppTopTitle) phoneAppTopTitle.textContent = 'YES EDU PARENT';
      if (phoneRoleParentView) phoneRoleParentView.classList.remove('hidden');
      if (phoneRoleTeacherView) phoneRoleTeacherView.classList.add('hidden');
      if (phoneRolePrincipalView) phoneRolePrincipalView.classList.add('hidden');
      triggerDynamicIslandAlert('👨‍👩‍👧 Parent Portal Activated', 2500);
      showToastNotification('👨‍👩‍👧 Mobile View: Switched to Guardian / Parent App');
    } else if (role === 'teacher') {
      if (phoneRoleTeacherBtn) phoneRoleTeacherBtn.classList.add('active');
      if (phoneAppTopTitle) phoneAppTopTitle.textContent = 'YES EDU TEACHER';
      if (phoneRoleParentView) phoneRoleParentView.classList.add('hidden');
      if (phoneRoleTeacherView) phoneRoleTeacherView.classList.remove('hidden');
      if (phoneRolePrincipalView) phoneRolePrincipalView.classList.add('hidden');
      triggerDynamicIslandAlert('👨‍🏫 Teacher AI App Activated', 2500);
      showToastNotification('👨‍🏫 Mobile View: Switched to Teacher AI In-Class Workspace');
    } else if (role === 'principal') {
      if (phoneRolePrincipalBtn) phoneRolePrincipalBtn.classList.add('active');
      if (phoneAppTopTitle) phoneAppTopTitle.textContent = 'PRINCIPAL COCKPIT';
      if (phoneRoleParentView) phoneRoleParentView.classList.add('hidden');
      if (phoneRoleTeacherView) phoneRoleTeacherView.classList.add('hidden');
      if (phoneRolePrincipalView) phoneRolePrincipalView.classList.remove('hidden');
      triggerDynamicIslandAlert('👑 Principal Cockpit Activated', 2500);
      showToastNotification('👑 Mobile View: Switched to Principal Pocket Telemetry');
    }
  }

  if (phoneRoleParentBtn) {
    phoneRoleParentBtn.addEventListener('click', () => selectPhoneRole('parent'));
  }
  if (phoneRoleTeacherBtn) {
    phoneRoleTeacherBtn.addEventListener('click', () => selectPhoneRole('teacher'));
  }
  if (phoneRolePrincipalBtn) {
    phoneRolePrincipalBtn.addEventListener('click', () => selectPhoneRole('principal'));
  }

  // =========================================================================
  // 8. Auto-Play A Campus Day (30s Live Tour) Automation Controller
  // =========================================================================
  const triggerAutoPlayCampusTourBtn = document.getElementById('triggerAutoPlayCampusTourBtn');
  const autoPlayTimelinePill = document.getElementById('autoPlayTimelinePill');
  const autoPlayStepLabel = document.getElementById('autoPlayStepLabel');
  const autoPlayBtnIcon = document.getElementById('autoPlayBtnIcon');
  const autoPlayBtnText = document.getElementById('autoPlayBtnText');

  let autoTourInterval = null;
  let autoTourCurrentIndex = 0;
  let isAutoTourRunning = false;

  const autoTourPhases = [
    {
      phaseName: 'Phase 1/4: 07:58 AM • Morning Biometric Rush & 2.1s SMS',
      run: () => {
        selectPhoneRole('parent');
        switchSoftwareTab('biometric');
        const punchBtn = document.getElementById('triggerGatePunchSimBtn');
        if (punchBtn) punchBtn.click();
      }
    },
    {
      phaseName: 'Phase 2/4: 10:30 AM • Classroom NCTB 2026 AI Creative Exam Compilation',
      run: () => {
        switchSoftwareTab('exam');
        const examAiBtn = document.getElementById('triggerExamAiGenBtn');
        if (examAiBtn) examAiBtn.click();
      }
    },
    {
      phaseName: 'Phase 3/4: 01:15 PM • Madrasa Waqf & Lillah Boarding Shariah Transparency',
      run: () => {
        switchSoftwareTab('waqf');
        const waqfBtn = document.getElementById('triggerWaqfDonationSimBtn');
        if (waqfBtn) waqfBtn.click();
      }
    },
    {
      phaseName: 'Phase 4/4: 04:00 PM • Guardian 1-Tap bKash Payment & Auto Bank Deposit',
      run: () => {
        switchSoftwareTab('bkash');
        const bkashBtn = document.getElementById('triggerBkashPaymentSimBtn');
        if (bkashBtn) bkashBtn.click();
      }
    }
  ];

  function runNextAutoTourStep() {
    if (autoTourCurrentIndex >= autoTourPhases.length) {
      stopAutoTour(true);
      return;
    }

    const currentPhase = autoTourPhases[autoTourCurrentIndex];
    if (autoPlayStepLabel) {
      autoPlayStepLabel.textContent = currentPhase.phaseName;
    }

    currentPhase.run();
    autoTourCurrentIndex++;
  }

  function startAutoTour() {
    isAutoTourRunning = true;
    if (autoPlayBtnIcon) autoPlayBtnIcon.textContent = '⏸';
    if (autoPlayBtnText) {
      autoPlayBtnText.innerHTML = `
        <span class="lang-en">Pause Campus Tour</span>
        <span class="lang-bn hidden">ট্যুর থামান</span>
      `;
    }
    if (autoPlayTimelinePill) {
      autoPlayTimelinePill.classList.remove('hidden');
      autoPlayTimelinePill.classList.add('inline-flex');
    }

    runNextAutoTourStep();
    autoTourInterval = setInterval(runNextAutoTourStep, 6500);
  }

  function stopAutoTour(completed = false) {
    isAutoTourRunning = false;
    clearInterval(autoTourInterval);
    autoTourInterval = null;

    if (autoPlayBtnIcon) autoPlayBtnIcon.textContent = '▶';
    if (autoPlayBtnText) {
      autoPlayBtnText.innerHTML = `
        <span class="lang-en">⚡ Auto-Play A Campus Day (30s Live Tour)</span>
        <span class="lang-bn hidden">⚡ ৩০ সেকেন্ডে পুরো ক্যাম্পাস অটোমেশন দেখুন</span>
      `;
    }

    if (completed) {
      autoTourCurrentIndex = 0;
      setTimeout(() => {
        switchSoftwareTab('dashboard');
        if (autoPlayTimelinePill) {
          autoPlayTimelinePill.classList.add('hidden');
          autoPlayTimelinePill.classList.remove('inline-flex');
        }
        showToastNotification('🎉 30s Live Campus Day Simulation Complete! Click any module to test manually.');
      }, 4000);
    }
  }

  if (triggerAutoPlayCampusTourBtn) {
    triggerAutoPlayCampusTourBtn.addEventListener('click', () => {
      if (isAutoTourRunning) {
        stopAutoTour(false);
        showToastNotification('⏸️ Campus Tour paused. Click again to resume.');
      } else {
        startAutoTour();
      }
    });
  }
}

/* ==========================================================================
   11. Hero Headline Rotating Words Animation
   ========================================================================== */
function initHeroRotatingWords() {
  const wordEn = document.getElementById('heroRotatingWordEn');
  const wordBn = document.getElementById('heroRotatingWordBn');
  if (!wordEn && !wordBn) return;

  const enWords = ['school', 'madrasah', 'college', 'cadet academy', 'campus'];
  const bnWords = [
    'স্কুল ও কলেজ',
    'মাদরাসা ও লিল্লাহ',
    'ক্যাডেট একাডেমি',
    'কলেজ ক্যাম্পাস',
    'শিক্ষা প্রতিষ্ঠান'
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % enWords.length;

    if (wordEn) {
      wordEn.style.opacity = '0';
      wordEn.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        wordEn.textContent = enWords[index];
        wordEn.style.opacity = '1';
        wordEn.style.transform = 'translateY(0)';
      }, 200);
    }

    if (wordBn) {
      wordBn.style.opacity = '0';
      wordBn.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        wordBn.textContent = bnWords[index];
        wordBn.style.opacity = '1';
        wordBn.style.transform = 'translateY(0)';
      }, 200);
    }
  }, 2600);
}

/* ==========================================================================
   12. Hero Live Campus Stream Activity Ticker
   ========================================================================== */
function initHeroLiveStreamTicker() {
  const streamStudent = document.getElementById('heroStreamStudent');
  const streamDetails = document.getElementById('heroStreamDetails');
  const streamBadge = document.getElementById('heroStreamBadge');
  const liveCount = document.getElementById('heroLivePresentCount');
  if (!streamStudent) return;

  const demoEvents = [
    {
      student: 'মুহাম্মদ আবদুল্লাহ (রোল ০১, ১০ম শ্রেণি)',
      details: 'মেইন গেটওয়ে টার্নস্টাইল #০১ • সকাল ৭:৫৮:১২ AM',
      badge: 'SMS SENT (2.3s)',
      count: '১,২২০ জন'
    },
    {
      student: 'সুমাইয়া আক্তার (রোল ০২, ১০ম শ্রেণি)',
      details: 'গেট #০১ জেডকেটেকো ফেস স্ক্যান • সকাল ৭:৫৮:১৯ AM',
      badge: 'SMS SENT (2.1s)',
      count: '১,২২১ জন'
    },
    {
      student: 'তানভীর আহমেদ (রোল ১২, ৮ম শ্রেণি)',
      details: 'গেট #০২ আরএফআইডি কার্ড পাঞ্চ • সকাল ৭:৫৮:৩১ AM',
      badge: 'SMS SENT (2.4s)',
      count: '১,২২২ জন'
    },
    {
      student: 'নুসরাত জাহান (রোল ০৫, ৭ম শ্রেণি)',
      details: 'মেইন গেটওয়ে টার্নস্টাইল #০১ • সকাল ৭:৫৮:৪৫ AM',
      badge: 'SMS SENT (2.2s)',
      count: '১,২২৩ জন'
    }
  ];

  let evIndex = 0;
  setInterval(() => {
    evIndex = (evIndex + 1) % demoEvents.length;
    const ev = demoEvents[evIndex];

    const row = document.getElementById('heroStreamRow1');
    if (row) {
      row.style.opacity = '0.3';
      setTimeout(() => {
        if (streamStudent) streamStudent.textContent = ev.student;
        if (streamDetails) streamDetails.textContent = ev.details;
        if (streamBadge) streamBadge.textContent = ev.badge;
        if (liveCount) liveCount.textContent = ev.count;
        row.style.opacity = '1';
      }, 200);
    }
  }, 3500);
}



