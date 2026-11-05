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
      <div class="video-stage-container w-full h-full relative bg-white">

        <!-- SCENE 1: Cartoon Student at Biometric Gate with Morning Sunbeams (White BG) -->
        <div id="videoScene0" class="video-scene-wrapper active-scene bg-gradient-to-br from-[#ffffff] via-[#f0fdf4] to-[#f8fafc] p-6 sm:p-8 pb-16 flex flex-col justify-between text-slate-800 overflow-hidden">
          <!-- Morning Sunbeam Atmospheric Lighting -->
          <div class="light-sunbeam"></div>

          <div class="flex items-center justify-between z-10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span class="text-xs font-mono font-bold tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded shadow-xs">
                PART 1: GATEWAY SYNC (0s - 10s)
              </span>
            </div>
            <span class="text-xs text-emerald-800 font-mono font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              MORNING SUNLIGHT • REAL HARDWARE SYNC
            </span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            
            <!-- Cartoon Student Tanvir -->
            <div class="md:col-span-5 flex flex-col items-center text-center">
              <div class="relative anim-walk">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md border-2 border-emerald-400 mb-2 relative animate-bounce">
                  "সকাল ৮:৩০! সময়মতো গেটে পাঞ্চ করলাম!"
                  <div class="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-emerald-400"></div>
                </div>

                <!-- SVG Cartoon Student -->
                <svg class="w-36 h-44 drop-shadow-md" viewBox="0 0 160 200" fill="none">
                  <!-- Cap (Islamic Topi) -->
                  <ellipse cx="80" cy="38" rx="26" ry="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
                  <rect x="54" y="36" width="52" height="6" rx="2" fill="#10b981"/>
                  <!-- Face -->
                  <circle cx="80" cy="58" r="24" fill="#ffd1b3"/>
                  <!-- Eyes (Smiling cartoon eyes) -->
                  <path d="M70 54 Q75 48 80 54" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <path d="M82 54 Q87 48 92 54" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <!-- Blushing cheeks -->
                  <circle cx="68" cy="62" r="4" fill="#ff9999" opacity="0.6"/>
                  <circle cx="92" cy="62" r="4" fill="#ff9999" opacity="0.6"/>
                  <!-- Smile -->
                  <path d="M74 65 Q81 74 88 65" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="#ffffff"/>
                  <!-- Backpack straps -->
                  <path d="M60 84 L56 140" stroke="#0284c7" stroke-width="7" stroke-linecap="round"/>
                  <path d="M100 84 L104 140" stroke="#0284c7" stroke-width="7" stroke-linecap="round"/>
                  <!-- Body: Kurta with Emerald Vest -->
                  <rect x="58" y="80" width="44" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
                  <path d="M58 80 L76 138 L60 138 Z" fill="#059669"/>
                  <path d="M102 80 L84 138 L100 138 Z" fill="#059669"/>
                  <!-- ID Card Ribbon & Badge -->
                  <path d="M74 80 L78 108 L82 80" stroke="#10b981" stroke-width="2" fill="none"/>
                  <rect x="74" y="108" width="12" height="16" rx="2" fill="#f59e0b"/>
                  <!-- Outstretched Right Arm holding RFID Card -->
                  <g class="anim-wave">
                    <path d="M102 90 Q125 96 136 108" stroke="#ffd1b3" stroke-width="12" stroke-linecap="round"/>
                    <rect x="130" y="102" width="16" height="10" rx="2" fill="#ffffff" stroke="#059669" stroke-width="2"/>
                    <circle cx="134" cy="107" r="2" fill="#f59e0b"/>
                  </g>
                  <!-- Left Arm -->
                  <path d="M58 90 Q44 110 50 128" stroke="#ffd1b3" stroke-width="12" stroke-linecap="round"/>
                  <!-- Legs & Shoes -->
                  <rect x="65" y="140" width="12" height="42" rx="4" fill="#e2e8f0"/>
                  <rect x="83" y="140" width="12" height="42" rx="4" fill="#e2e8f0"/>
                  <ellipse cx="71" cy="186" rx="9" ry="6" fill="#1e293b"/>
                  <ellipse cx="89" cy="186" rx="9" ry="6" fill="#1e293b"/>
                </svg>

                <span class="text-xs font-extrabold text-slate-900 block mt-1">মুহাম্মদ তানভীর (রোল: ১০৪)</span>
                <span class="text-[10px] text-slate-500 font-medium">Class 9 • Darul Uloom Campus</span>
              </div>
            </div>

            <!-- Center: Biometric Gate Terminal with Radar Rings -->
            <div class="md:col-span-3 flex flex-col items-center text-center">
              <div class="relative w-28 h-42 bg-white border-2 border-emerald-500 rounded-2xl flex flex-col items-center justify-between p-3 shadow-xl">
                <!-- Glowing Radar Rings -->
                <div class="absolute -top-3 w-16 h-16 rounded-full border-2 border-emerald-400 anim-radar pointer-events-none"></div>
                <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0015.357 2m1.5-6.5h.01M16 19.5v.01"/></svg>
                </div>

                <div class="text-center">
                  <span class="text-[10px] font-mono text-emerald-700 font-bold block animate-pulse">PUNCH VERIFIED</span>
                  <span class="text-[9px] text-slate-500 font-mono">GATE UNLOCKED</span>
                </div>
                
                <div class="w-full py-1 rounded bg-emerald-600 text-[10px] font-bold text-white font-mono text-center shadow-xs">
                  3 SEC SMS TRIGGER
                </div>
              </div>
            </div>

            <!-- Right: Parent Phone with Incoming Live SMS -->
            <div class="md:col-span-4 bg-white border-2 border-emerald-400 rounded-2xl p-4 shadow-xl anim-phone-glow space-y-3">
              <div class="flex items-center justify-between text-xs text-slate-700 border-b border-slate-100 pb-2">
                <span class="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  অভিভাবকের স্মার্টফোন
                </span>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">SMS RECEIVED</span>
              </div>
              <div class="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs text-slate-800 font-sans leading-relaxed shadow-xs">
                <div class="text-emerald-700 font-bold text-[11px] mb-1 flex items-center justify-between">
                  <span>YES_EDU_SMS</span>
                  <span class="text-[10px] text-slate-500 font-normal">Just Now</span>
                </div>
                "সম্মানিত অভিভাবক, আপনার সন্তান মুহাম্মদ তানভীর সকাল ৮:৩০ মিনিটে নিরাপদে ক্যাম্পাসে প্রবেশ করেছে। — YES EDU"
              </div>
              <span class="text-[10px] text-slate-500 block text-right font-mono font-semibold">100% Parent Peace of Mind</span>
            </div>

          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-200 pt-2 z-10">
            <span>PART 1 OF 4 (0s - 10s): SMART BIOMETRIC GATEWAY</span>
            <button class="jump-chapter-btn text-emerald-800 font-bold hover:bg-emerald-100 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 transition" data-jump="1">
              PLAY PART 2: BKASH FEE (10s) →
            </button>
          </div>
        </div>

        <!-- SCENE 2: Cartoon Parent on Sofa & bKash with Cozy Ambient Lamp (White BG) -->
        <div id="videoScene1" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#fffbeb] to-[#f8fafc] p-6 sm:p-8 pb-16 flex flex-col justify-between text-slate-800 overflow-hidden">
          <!-- Warm Lamp Glow in Living Room -->
          <div class="lamp-glow -top-10 left-10"></div>

          <div class="flex items-center justify-between z-10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <span class="text-xs font-mono font-bold tracking-widest text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded shadow-xs">
                PART 2: BKASH AUTOMATION (10s - 20s)
              </span>
            </div>
            <span class="text-xs text-amber-800 font-mono font-semibold">WARM INTERIOR • ZERO LINE AT BANK</span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            
            <!-- Cartoon Parent on Sofa -->
            <div class="md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md border-2 border-amber-400 mb-2 relative animate-bounce">
                  "ব্যাংকের লাইনে না গিয়ে ঘরে বসেই ফি দিয়ে দিলাম!"
                  <div class="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-amber-400"></div>
                </div>

                <!-- SVG Cartoon Parent on Sofa -->
                <svg class="w-44 h-44 drop-shadow-md" viewBox="0 0 200 200" fill="none">
                  <!-- Teal Sofa -->
                  <rect x="30" y="110" width="140" height="60" rx="14" fill="#0f766e"/>
                  <rect x="20" y="100" width="24" height="70" rx="10" fill="#115e59"/>
                  <rect x="156" y="100" width="24" height="70" rx="10" fill="#115e59"/>
                  <!-- Father Head & Glasses -->
                  <circle cx="100" cy="55" r="24" fill="#ffd1b3"/>
                  <!-- Hair -->
                  <path d="M78 50 Q100 30 122 50 Q100 40 78 50 Z" fill="#334155"/>
                  <!-- Spectacles -->
                  <circle cx="92" cy="54" r="6" stroke="#0f172a" stroke-width="2" fill="none"/>
                  <circle cx="108" cy="54" r="6" stroke="#0f172a" stroke-width="2" fill="none"/>
                  <line x1="98" y1="54" x2="102" y2="54" stroke="#0f172a" stroke-width="2"/>
                  <!-- Smile -->
                  <path d="M94 66 Q100 74 106 66" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <!-- Body / Shirt -->
                  <rect x="76" y="78" width="48" height="52" rx="8" fill="#f59e0b"/>
                  <!-- Arms Holding Smartphone -->
                  <path d="M76 90 Q65 110 82 120" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <path d="M124 90 Q135 110 118 120" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <!-- Glowing Phone -->
                  <rect x="86" y="106" width="28" height="42" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
                  <rect x="89" y="110" width="22" height="34" rx="2" fill="#ec4899"/>
                </svg>

                <span class="text-xs font-extrabold text-slate-900 block">আব্দুর রহমান সাহেব (অভিভাবক)</span>
                <span class="text-[10px] text-slate-500 font-medium">Paying from Home via bKash</span>
              </div>
            </div>

            <!-- Floating Coins Flying from Phone to Cloud -->
            <div class="md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="relative py-4">
                <div class="w-12 h-12 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-lg anim-coin mx-auto mb-2 border-2 border-white">৳</div>
                <div class="w-10 h-10 rounded-full bg-amber-300 text-slate-900 font-extrabold text-lg flex items-center justify-center shadow-lg anim-coin mx-auto mb-2 border-2 border-white" style="animation-delay: -0.8s;">৳</div>
                <span class="text-xs font-mono font-bold text-amber-800 block">INSTANT SETTLEMENT</span>
                <span class="text-[10px] text-slate-500 font-mono">Auto Bank API Reconcile</span>
              </div>
            </div>

            <!-- Right: Digital Receipt & Double Entry Confirmation -->
            <div class="md:col-span-4 bg-white border-2 border-amber-400 rounded-2xl p-4 shadow-xl space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#e2136e] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  bKash
                </div>
                <div>
                  <span class="text-xs font-bold text-emerald-700 block">✓ ৳২,৫০০ পেমেন্ট সফল</span>
                  <span class="text-[10px] text-slate-500 font-mono">TrxID: 9B8801K99 • VOUCHER READY</span>
                </div>
              </div>
              <div class="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-[11px] text-slate-700 font-mono space-y-1 shadow-xs">
                <div class="flex justify-between"><span>মাসিক বেতন:</span><span class="text-slate-900 font-bold">৳১,৫০০</span></div>
                <div class="flex justify-between"><span>লিল্লাহ ও ওয়াকফ দান:</span><span class="text-amber-800 font-bold">৳১,০০০</span></div>
                <div class="border-t border-amber-200 pt-1 text-emerald-700 text-right font-bold">স্বয়ংক্রিয় ডিজিটাল ভাউচার তৈরি!</div>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-200 pt-2 z-10">
            <span>PART 2 OF 4 (10s - 20s): AUTOMATED BKASH COLLECTION</span>
            <button class="jump-chapter-btn text-amber-800 font-bold hover:bg-amber-100 cursor-pointer bg-amber-50 px-2.5 py-1 rounded border border-amber-300 transition" data-jump="2">
              PLAY PART 3: TEACHER AI (20s) →
            </button>
          </div>
        </div>

        <!-- SCENE 3: Cartoon Teacher & Cute AI Robot Companion (White BG) -->
        <div id="videoScene2" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#f0f9ff] to-[#f8fafc] p-6 sm:p-8 pb-16 flex flex-col justify-between text-slate-800 overflow-hidden">
          <!-- Cyberpunk Cyan AI Glow -->
          <div class="ai-neon-aura top-10 right-28"></div>

          <div class="flex items-center justify-between z-10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-sky-500 animate-ping"></span>
              <span class="text-xs font-mono font-bold tracking-widest text-sky-800 bg-sky-50 border border-sky-300 px-2.5 py-1 rounded shadow-xs">
                PART 3: NCTB AI PEDAGOGY (20s - 30s)
              </span>
            </div>
            <span class="text-xs text-sky-800 font-mono font-semibold">NEON TECH LAB • NCTB AI V2</span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            
            <!-- Cartoon Teacher with Tea -->
            <div class="md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md border-2 border-sky-400 mb-2 relative animate-bounce">
                  "সারা রাত জেগে প্রশ্ন তৈরির দিন শেষ! এআই ৩০ সেকেন্ডেই করে দিলো!"
                  <div class="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-sky-400"></div>
                </div>

                <!-- SVG Cartoon Teacher -->
                <svg class="w-40 h-44 drop-shadow-md" viewBox="0 0 180 200" fill="none">
                  <!-- Head -->
                  <circle cx="90" cy="55" r="25" fill="#ffd1b3"/>
                  <!-- Hair -->
                  <path d="M68 50 Q90 28 112 50 Q90 40 68 50 Z" fill="#1e293b"/>
                  <!-- Spectacles -->
                  <circle cx="82" cy="54" r="6" stroke="#0284c7" stroke-width="2" fill="none"/>
                  <circle cx="98" cy="54" r="6" stroke="#0284c7" stroke-width="2" fill="none"/>
                  <line x1="88" y1="54" x2="92" y2="54" stroke="#0284c7" stroke-width="2"/>
                  <!-- Smile -->
                  <path d="M84 66 Q90 74 96 66" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                  <!-- Body: Blue Shirt & Tie -->
                  <rect x="66" y="80" width="48" height="60" rx="8" fill="#0284c7"/>
                  <polygon points="90,84 94,115 90,125 86,115" fill="#f59e0b"/>
                  <!-- Right Arm Thumbs Up -->
                  <path d="M114 90 Q135 100 138 85" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <circle cx="138" cy="82" r="5" fill="#ffd1b3"/>
                  <!-- Left Arm Holding Steaming Teacup -->
                  <path d="M66 90 Q48 110 56 120" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <!-- Teacup -->
                  <rect x="48" y="116" width="16" height="14" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
                  <!-- Steam -->
                  <path class="anim-steam" d="M52 110 Q50 102 54 94" stroke="#94a3b8" stroke-width="2" fill="none"/>
                  <path class="anim-steam" d="M58 110 Q60 102 56 94" stroke="#94a3b8" stroke-width="2" fill="none" style="animation-delay: -1s;"/>
                </svg>

                <span class="text-xs font-extrabold text-slate-900 block">রফিকুল ইসলাম (সহকারী শিক্ষক)</span>
                <span class="text-[10px] text-slate-500 font-medium">Relaxed & Teaching with AI</span>
              </div>
            </div>

            <!-- Cute Cartoon AI Mascot "YES Bot" -->
            <div class="md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="anim-mascot">
                <svg class="w-32 h-36 drop-shadow-lg" viewBox="0 0 140 160" fill="none">
                  <!-- Antenna -->
                  <line x1="70" y1="28" x2="70" y2="12" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
                  <circle cx="70" cy="8" r="6" fill="#0284c7" class="animate-ping"/>
                  <circle cx="70" cy="8" r="6" fill="#0284c7"/>
                  <!-- Robot Head -->
                  <rect x="35" y="28" width="70" height="52" rx="18" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
                  <!-- Screen Face -->
                  <rect x="43" y="36" width="54" height="36" rx="10" fill="#0f172a"/>
                  <!-- Digital Cyan Eyes (Smiling ^ ^) -->
                  <path d="M52 54 L57 48 L62 54" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M78 54 L83 48 L88 54" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- Robot Body -->
                  <rect x="42" y="86" width="56" height="48" rx="16" fill="#ffffff" stroke="#0284c7" stroke-width="3"/>
                  <!-- Chest Core Badge -->
                  <circle cx="70" cy="110" r="12" fill="#059669"/>
                  <text x="70" y="114" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">AI</text>
                  <!-- Floating Hands -->
                  <circle cx="26" cy="104" r="8" fill="#0284c7"/>
                  <circle cx="114" cy="104" r="8" fill="#0284c7"/>
                </svg>

                <span class="text-xs font-mono font-bold text-sky-800 block">YES BOT V2</span>
                <span class="text-[10px] text-emerald-700 font-mono font-bold">GENERATING CQ & MCQ</span>
              </div>
            </div>

            <!-- Right: Generated Creative Question Sheet -->
            <div class="md:col-span-4 bg-white border-2 border-sky-400 rounded-2xl p-4 shadow-xl space-y-2.5">
              <div class="flex items-center justify-between text-xs text-sky-800 font-mono pb-1 border-b border-slate-100 font-bold">
                <span>NCTB 2026 QUESTION PAPER</span>
                <span class="text-emerald-700 font-bold">READY (18s)</span>
              </div>
              <div class="bg-sky-50/70 p-2.5 rounded-lg border border-sky-200 text-[11px] text-slate-800 font-sans shadow-xs">
                <span class="text-sky-800 font-bold block">পদার্থবিজ্ঞান • ৯ম শ্রেণি:</span>
                "ক. বল কাকে বলে? (১)<br>
                খ. জড়তা ও ত্বরণের পার্থক্য ব্যাখ্যা কর (২)<br>
                গ. উদ্দীপকের তথ্যের আলোকে ত্বরণ নির্ণয় কর (৩)"
              </div>
              <button class="w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition shadow-xs">
                1-Click Export to Word / PDF
              </button>
            </div>

          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-200 pt-2 z-10">
            <span>PART 3 OF 4 (20s - 30s): AI PEDAGOGICAL ENGINE</span>
            <button class="jump-chapter-btn text-sky-800 font-bold hover:bg-sky-100 cursor-pointer bg-sky-50 px-2.5 py-1 rounded border border-sky-300 transition" data-jump="3">
              PLAY PART 4: PRINCIPAL BI (30s) →
            </button>
          </div>
        </div>

        <!-- SCENE 4: Cartoon Principal / Muhtamim with Tablet (White BG) -->
        <div id="videoScene3" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#faf5ff] to-[#f8fafc] p-6 sm:p-8 pb-16 flex flex-col justify-between text-slate-800 overflow-hidden">
          <!-- Executive Rim Atmospheric Glow -->
          <div class="executive-rim top-10 right-20"></div>

          <div class="flex items-center justify-between z-10">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-purple-500 animate-ping"></span>
              <span class="text-xs font-mono font-bold tracking-widest text-purple-800 bg-purple-50 border border-purple-300 px-2.5 py-1 rounded shadow-xs">
                PART 4: TOTAL INSTITUTIONAL CONTROL (30s - 40s)
              </span>
            </div>
            <span class="text-xs text-purple-800 font-mono font-semibold">EXECUTIVE BI ANALYTICS DASHBOARD</span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto z-10">
            
            <!-- Cartoon Principal / Muhtamim -->
            <div class="md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md border-2 border-purple-400 mb-2 relative animate-bounce">
                  "কাগজের খাতা মুক্ত ক্যাম্পাস! সব হিসাব এখন শতভাগ নির্ভুল ও স্বচ্ছ!"
                  <div class="w-2.5 h-2.5 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-purple-400"></div>
                </div>

                <!-- SVG Cartoon Principal -->
                <svg class="w-40 h-44 drop-shadow-md" viewBox="0 0 180 200" fill="none">
                  <!-- Cap / Turban / Topi -->
                  <ellipse cx="90" cy="38" rx="26" ry="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
                  <rect x="64" y="36" width="52" height="6" rx="2" fill="#d97706"/>
                  <!-- Head -->
                  <circle cx="90" cy="58" r="24" fill="#ffd1b3"/>
                  <!-- White Dignified Beard -->
                  <path d="M74 65 Q90 92 106 65 Q90 74 74 65 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
                  <!-- Eyes & Glasses -->
                  <circle cx="82" cy="54" r="5" stroke="#78350f" stroke-width="2" fill="none"/>
                  <circle cx="98" cy="54" r="5" stroke="#78350f" stroke-width="2" fill="none"/>
                  <line x1="87" y1="54" x2="93" y2="54" stroke="#78350f" stroke-width="2"/>
                  <!-- Body: Traditional Dignified Sherwani / Coat -->
                  <rect x="66" y="80" width="48" height="60" rx="8" fill="#3b0764"/>
                  <!-- Golden Buttons -->
                  <circle cx="90" cy="94" r="2" fill="#f59e0b"/>
                  <circle cx="90" cy="106" r="2" fill="#f59e0b"/>
                  <circle cx="90" cy="118" r="2" fill="#f59e0b"/>
                  <!-- Arms Holding Tablet -->
                  <path d="M66 92 Q50 114 74 120" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <path d="M114 92 Q130 114 106 120" stroke="#ffd1b3" stroke-width="10" stroke-linecap="round"/>
                  <!-- Glowing Tablet -->
                  <rect x="74" y="106" width="32" height="42" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
                  <rect x="78" y="110" width="24" height="34" rx="2" fill="#10b981"/>
                </svg>

                <span class="text-xs font-extrabold text-slate-900 block">মাওলানা আব্দুল কাদের (মুহতামিম / অধ্যক্ষ)</span>
                <span class="text-[10px] text-slate-500 font-medium">100% Institution Controlled on Mobile</span>
              </div>
            </div>

            <!-- Visual Real-time Charts -->
            <div class="md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="p-3 bg-white rounded-2xl border-2 border-purple-300 shadow-xl space-y-2 w-full max-w-[160px]">
                <span class="text-[10px] font-mono text-purple-800 uppercase tracking-wider block font-bold">FEES COLLECTED</span>
                <div class="text-2xl font-extrabold text-emerald-600 font-mono">99.2%</div>
                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div class="bg-emerald-500 h-2 rounded-full" style="width: 99.2%;"></div>
                </div>
                <span class="text-[9px] text-slate-500 font-mono block">Zero Bad Dues</span>
              </div>
            </div>

            <!-- Right: Hostel & Waqf Status -->
            <div class="md:col-span-4 bg-white border-2 border-purple-300 rounded-2xl p-4 shadow-xl space-y-2.5">
              <span class="text-xs font-bold text-purple-900 block">🕌 হোস্টেল ও ওয়াকফ ফান্ডের স্বচ্ছ হিসাব</span>
              <div class="p-2.5 bg-purple-50/70 rounded-xl border border-purple-200 text-xs font-mono space-y-1 text-slate-800 shadow-xs">
                <div class="flex justify-between"><span>লিল্লাহ ফান্ড অডিট:</span><span class="text-emerald-700 font-bold">১০০% স্বচ্ছ</span></div>
                <div class="flex justify-between"><span>হোস্টেল সিট বরাদ্দ:</span><span class="text-purple-800 font-bold">২৪/২৪ পূর্ণ</span></div>
                <div class="flex justify-between"><span>শিক্ষক উপস্থিতি:</span><span class="text-emerald-700 font-bold">৯৮.৫%</span></div>
              </div>
              <span class="text-[10px] text-emerald-700 font-bold block text-right font-mono">✓ Managed with YES EDU ERP</span>
            </div>

          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-200 pt-2 z-10">
            <span>PART 4 OF 4 (30s - 40s): TOTAL INSTITUTIONAL CONTROL</span>
            <button class="jump-chapter-btn text-purple-800 font-bold hover:bg-purple-100 cursor-pointer bg-purple-50 px-2.5 py-1 rounded border border-purple-300 transition" data-jump="0">
              ↺ REPLAY FROM PART 1 (0s)
            </button>
          </div>
        </div>

      </div>
    `;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // 10 Seconds per Chapter Transition
  function getActiveChapterIndex(sec) {
    return Math.min(3, Math.floor((sec % 40) / 10));
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

  // Build cartoon stage and render initial frame
  buildCartoonStage();
  renderCurrentFrame();
}

function openVideoPlayerModal() {
  const modal = document.getElementById('videoPlayerModal');
  if (modal) {
    modal.classList.add('open');
  }
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
   10. macOS Live Campus OS Window Tabs & Simulator
   ========================================================================== */
function switchSoftwareTab(targetTab) {
  const tabBtns = document.querySelectorAll('.software-tab-btn');
  const panels = document.querySelectorAll('.software-panel');

  tabBtns.forEach(b => {
    if (b.getAttribute('data-software-tab') === targetTab) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  panels.forEach(panel => {
    const panelId = panel.id.replace('swPanel', '').toLowerCase();
    if (panelId === targetTab.toLowerCase()) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

function initSoftwareWindowTabs() {
  const tabBtns = document.querySelectorAll('.software-tab-btn');
  const clockDisplay = document.getElementById('macClockDisplay');
  const simPunchBtn = document.getElementById('triggerGatePunchSimBtn');
  const simPunchLogBody = document.getElementById('simPunchLogBody');
  const simSmsText = document.getElementById('simulatedSmsText');
  const simSmsTimestamp = document.getElementById('simulatedSmsTimestamp');

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
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Gate Punch Simulator Test
  if (simPunchBtn && simPunchLogBody) {
    const demoStudents = [
      { roll: '05', name: 'Tanvir Mahmud', class: 'Class 9-B' },
      { roll: '12', name: 'Nusrat Jahan', class: 'Class 8-A' },
      { roll: '23', name: 'Muhammad Rayhan', class: 'Class 10-C' },
      { roll: '08', name: 'Ayesha Siddiqua', class: 'Class 7-A' }
    ];
    let studentIndex = 0;

    simPunchBtn.addEventListener('click', () => {
      const student = demoStudents[studentIndex % demoStudents.length];
      studentIndex++;
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: true });

      // Add row to table
      const tr = document.createElement('tr');
      tr.className = 'bg-emerald-50/50 transition-colors duration-500';
      tr.innerHTML = `
        <td class="p-2 font-mono font-bold">${student.roll}</td>
        <td class="p-2 font-medium">${student.name}</td>
        <td class="p-2">${student.class}</td>
        <td class="p-2 font-mono text-slate-600">${timeStr}</td>
        <td class="p-2 text-emerald-700 font-bold">✓ Delivered (2.1s)</td>
      `;
      simPunchLogBody.insertBefore(tr, simPunchLogBody.firstChild);

      // Update SMS preview
      if (simSmsText) {
        simSmsText.textContent = `"সম্মানিত অভিভাবক, আপনার সন্তান ${student.name} (রোল: ${student.roll}, ${student.class}) এইমাত্র ${timeStr} মিনিটে ক্যাম্পাসে নিরাপদে প্রবেশ করেছে। - ইয়েস এডু"`;
      }
      if (simSmsTimestamp) {
        simSmsTimestamp.textContent = `Today at ${timeStr}`;
      }

      // Show toast confirmation
      const toast = document.getElementById('demoToast');
      if (toast) {
        toast.textContent = `⚡ Gate Punch: ${student.name} scanned! Parent SMS delivered in 2.1s`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
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
    'বকেয়া ফি শূন্য করতে',
    'বায়োমেট্রিক হাজিরা নিতে',
    'এনসিটিবি প্রশ্ন বানাতে',
    'ওয়াকফ অডিট লেজারে',
    'সার্বিক ডিজিটাল নিয়ন্ত্রণে'
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



