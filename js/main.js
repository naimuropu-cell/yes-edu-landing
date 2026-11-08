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

  // Build the 4 Cartoon Animated Scenes into the Stage (Chronicle-Style Interactive Canvas)
  function buildCartoonStage() {
    if (!simulationFrame) return;

    simulationFrame.innerHTML = `
      <div class="video-stage-container w-full h-full relative bg-white">

        <!-- SCENE 1: Cartoon Student at Biometric Gate with Morning Sunbeams (White BG) -->
        <div id="videoScene0" class="video-scene-wrapper active-scene bg-gradient-to-br from-[#ffffff] via-[#f0fdf4] to-[#f8fafc] p-3 sm:p-6 sm:pb-16 flex flex-col justify-between text-slate-800 overflow-hidden h-full">
          <!-- Morning Sunbeam Atmospheric Lighting -->
          <div class="light-sunbeam"></div>

          <div class="flex items-center justify-between z-10 gap-2 mb-1 sm:mb-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
              <span class="text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs">
                MODULE 1: GATEWAY ATTENDANCE (0s - 10s)
              </span>
            </div>
            <span class="text-[10px] sm:text-xs text-emerald-800 font-mono font-semibold flex items-center gap-1.5 shrink-0">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 hidden sm:inline-block"></span>
              <span class="hidden sm:inline">MORNING SUNLIGHT • </span>HARDWARE SYNC
            </span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-2 md:grid-cols-12 gap-2 sm:gap-6 items-center my-auto z-10 w-full">
            
            <!-- Cartoon Student Tanvir -->
            <div class="col-span-1 md:col-span-5 flex flex-col items-center text-center">
              <div class="relative anim-walk">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[9px] sm:text-[11px] font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md border-2 border-emerald-400 mb-1 sm:mb-2 relative animate-bounce max-w-[150px] sm:max-w-none">
                  "সকাল ৮:৩০! গেটে পাঞ্চ করলাম!"
                  <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rotate-45 absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-emerald-400"></div>
                </div>

                <!-- SVG Cartoon Student -->
                <svg class="w-24 h-32 sm:w-36 sm:h-44 drop-shadow-md mx-auto" viewBox="0 0 160 200" fill="none">
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
                  <g transform="translate(101, 88)">
                    <g>
                      <animateTransform 
                        attributeName="transform" 
                        type="rotate" 
                        values="0 0 0; -12 0 0; -16 0 0; -6 0 0; 0 0 0" 
                        keyTimes="0; 0.35; 0.55; 0.8; 1" 
                        dur="2.2s" 
                        repeatCount="indefinite" 
                        calcMode="spline" 
                        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                      />
                      <path d="M0 0 Q22 6 34 18" stroke="#ffd1b3" stroke-width="11" stroke-linecap="round"/>
                      <path d="M0 0 L10 2" stroke="#f8fafc" stroke-width="12" stroke-linecap="round"/>
                      <rect x="26" y="12" width="16" height="10" rx="2" fill="#ffffff" stroke="#059669" stroke-width="2"/>
                      <circle cx="30" cy="17" r="2" fill="#f59e0b"/>
                      <circle cx="28" cy="17" r="3" fill="#ffd1b3"/>
                    </g>
                    <circle cx="0" cy="0" r="7.5" fill="#059669"/>
                    <circle cx="0" cy="0" r="4.5" fill="#047857"/>
                  </g>
                  <!-- Left Arm -->
                  <path d="M58 90 Q44 110 50 128" stroke="#ffd1b3" stroke-width="12" stroke-linecap="round"/>
                  <!-- Legs & Shoes -->
                  <rect x="65" y="140" width="12" height="42" rx="4" fill="#e2e8f0"/>
                  <rect x="83" y="140" width="12" height="42" rx="4" fill="#e2e8f0"/>
                  <ellipse cx="71" cy="186" rx="9" ry="6" fill="#1e293b"/>
                  <ellipse cx="89" cy="186" rx="9" ry="6" fill="#1e293b"/>
                </svg>

                <span class="text-[11px] sm:text-xs font-extrabold text-slate-900 block mt-0.5 sm:mt-1 truncate max-w-[130px] sm:max-w-none">মুহাম্মদ তানভীর (রোল ১০৪)</span>
                <span class="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-[130px] sm:max-w-none">Class 9 • Darul Uloom</span>
              </div>
            </div>

            <!-- Center: Biometric Gate Terminal with Radar Rings -->
            <div class="col-span-1 md:col-span-3 flex flex-col items-center text-center">
              <div id="sceneGateCard" class="relative w-22 sm:w-28 h-32 sm:h-42 bg-white border-2 border-emerald-500 rounded-xl sm:rounded-2xl flex flex-col items-center justify-between p-2 sm:p-3 shadow-xl transition-all duration-300">
                <!-- Glowing Radar Rings -->
                <div class="absolute -top-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-emerald-400 anim-radar pointer-events-none"></div>
                <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
                  <svg class="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0015.357 2m1.5-6.5h.01M16 19.5v.01"/></svg>
                </div>

                <div class="text-center">
                  <span id="sceneGateStatus" class="text-[9px] sm:text-[10px] font-mono text-emerald-700 font-bold block animate-pulse">PUNCH VERIFIED</span>
                  <span class="text-[8px] sm:text-[9px] text-slate-500 font-mono">GATE UNLOCKED</span>
                </div>
                
                <div class="w-full py-0.5 sm:py-1 rounded bg-emerald-600 text-[8px] sm:text-[10px] font-bold text-white font-mono text-center shadow-xs">
                  3 SEC SMS TRIGGER
                </div>
              </div>
            </div>

            <!-- Right: Parent Phone with Incoming Live SMS -->
            <div class="col-span-2 md:col-span-4 bg-white border-2 border-emerald-400 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl anim-phone-glow space-y-1.5 sm:space-y-3">
              <div class="flex items-center justify-between text-[11px] sm:text-xs text-slate-700 border-b border-slate-100 pb-1 sm:pb-2">
                <span class="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  অভিভাবকের স্মার্টফোন
                </span>
                <span class="text-[9px] sm:text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">SMS RECEIVED</span>
              </div>
              <div id="scenePhoneNotice" class="bg-emerald-50/80 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-emerald-200 text-[10px] sm:text-xs text-slate-800 font-sans leading-relaxed shadow-xs transition-all duration-300">
                <div class="text-emerald-700 font-bold text-[10px] sm:text-[11px] mb-1 flex items-center justify-between">
                  <span>YES_EDU_SMS</span>
                  <span class="text-[9px] text-slate-500 font-normal">Just Now</span>
                </div>
                "সম্মানিত অভিভাবক, আপনার সন্তান মুহাম্মদ তানভীর সকাল ৮:৩০ মিনিটে নিরাপদে ক্যাম্পাসে প্রবেশ করেছে। — YES EDU"
              </div>
              
              <!-- Chronicle Interactive Action Trigger -->
              <div class="flex items-center justify-between pt-1">
                <button type="button" id="interactivePunchBtn" class="chronicle-action-btn bg-emerald-600 hover:bg-emerald-700 text-white">
                  <span class="animate-pulse">👆</span> <span>পাঞ্চ টেস্ট (Test Punch)</span>
                </button>
                <span class="text-[9px] sm:text-[10px] text-slate-500 font-mono font-semibold hidden sm:inline">100% Peace of Mind</span>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-slate-200/80 pt-1.5 sm:pt-2 z-10">
            <span class="flex items-center gap-1 sm:gap-1.5 truncate"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span> <span class="truncate">MODULE 01: BIOMETRIC GATEWAY TELEMETRY</span></span>
            <span class="text-slate-400 font-mono text-[9px] sm:text-[10px] shrink-0 ml-2">YES EDU</span>
          </div>
        </div>

        <!-- SCENE 2: Cartoon Parent on Sofa & bKash with Cozy Ambient Lamp (White BG) -->
        <div id="videoScene1" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#fffbeb] to-[#f8fafc] p-3 sm:p-6 sm:pb-16 flex flex-col justify-between text-slate-800 overflow-hidden h-full">
          <!-- Warm Lamp Glow in Living Room -->
          <div class="lamp-glow -top-10 left-10"></div>

          <div class="flex items-center justify-between z-10 gap-2 mb-1 sm:mb-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 animate-ping shrink-0"></span>
              <span class="text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-amber-800 bg-amber-50 border border-amber-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs">
                MODULE 2: BKASH AUTOMATION (10s - 20s)
              </span>
            </div>
            <span class="text-[10px] sm:text-xs text-amber-800 font-mono font-semibold shrink-0">
              <span class="hidden sm:inline">WARM INTERIOR • </span>ZERO BANK QUEUE
            </span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-2 md:grid-cols-12 gap-2 sm:gap-6 items-center my-auto z-10 w-full">
            
            <!-- Cartoon Parent on Sofa -->
            <div class="col-span-1 md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[9px] sm:text-[11px] font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md border-2 border-amber-400 mb-1 sm:mb-2 relative animate-bounce max-w-[150px] sm:max-w-none">
                  "ব্যাংকে না গিয়ে ঘরে বসেই ফি দিলাম!"
                  <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rotate-45 absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-amber-400"></div>
                </div>

                <!-- SVG Cartoon Parent on Sofa -->
                <svg class="w-28 h-28 sm:w-44 sm:h-44 drop-shadow-md mx-auto" viewBox="0 0 200 200" fill="none">
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

                <span class="text-[11px] sm:text-xs font-extrabold text-slate-900 block mt-0.5 sm:mt-1 truncate max-w-[130px] sm:max-w-none">আব্দুর রহমান (অভিভাবক)</span>
                <span class="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-[130px] sm:max-w-none">Paying via bKash</span>
              </div>
            </div>

            <!-- Floating Coins Flying from Phone to Cloud -->
            <div class="col-span-1 md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="relative py-2 sm:py-4">
                <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-amber-400 text-slate-900 font-extrabold text-base sm:text-xl flex items-center justify-center shadow-lg anim-coin mx-auto mb-1 border-2 border-white">৳</div>
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-lg flex items-center justify-center shadow-lg anim-coin mx-auto mb-1 border-2 border-white" style="animation-delay: -0.8s;">৳</div>
                <span class="text-[9px] sm:text-xs font-mono font-bold text-amber-800 block">INSTANT SETTLEMENT</span>
                <span class="text-[8px] sm:text-[10px] text-slate-500 font-mono">Bank API Reconcile</span>
              </div>
            </div>

            <!-- Right: Digital Receipt & Double Entry Confirmation -->
            <div id="sceneReceiptBox" class="col-span-2 md:col-span-4 bg-white border-2 border-amber-400 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl space-y-1.5 sm:space-y-3 transition-all duration-300">
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#e2136e] text-white font-bold flex items-center justify-center text-[10px] sm:text-xs shadow-sm shrink-0">
                  bKash
                </div>
                <div class="truncate">
                  <span class="text-[11px] sm:text-xs font-bold text-emerald-700 block truncate">✓ ৳২,৫০০ পেমেন্ট সফল</span>
                  <span class="text-[9px] sm:text-[10px] text-slate-500 font-mono truncate">TrxID: 9B8801K99 • VOUCHER READY</span>
                </div>
              </div>
              <div class="p-2 sm:p-3 bg-amber-50/60 rounded-lg sm:rounded-xl border border-amber-200 text-[10px] sm:text-[11px] text-slate-700 font-mono space-y-0.5 sm:space-y-1 shadow-xs">
                <div class="flex justify-between"><span>মাসিক বেতন:</span><span class="text-slate-900 font-bold">৳১,৫০০</span></div>
                <div class="flex justify-between"><span>লিল্লাহ দান:</span><span class="text-amber-800 font-bold">৳১,০০০</span></div>
                <div class="border-t border-amber-200 pt-1 text-emerald-700 text-right font-bold text-[9px] sm:text-[10px]">স্বয়ংক্রিয় ডিজিটাল ভাউচার তৈরি!</div>
              </div>
              
              <!-- Chronicle Interactive Action Trigger -->
              <div class="flex items-center justify-between pt-1">
                <button type="button" id="interactivePayBtn" class="chronicle-action-btn bg-[#e2136e] hover:bg-[#c2105e] text-white">
                  <span>৳</span> <span>পেমেন্ট টেস্ট (bKash Pay)</span>
                </button>
                <span id="interactivePayStatus" class="text-[9px] sm:text-[10px] text-emerald-700 font-bold font-mono">ভাউচার প্রস্তুত ✓</span>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-slate-200/80 pt-1.5 sm:pt-2 z-10">
            <span class="flex items-center gap-1 sm:gap-1.5 truncate"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span> <span class="truncate">MODULE 02: AUTOMATED BKASH FEE RECONCILIATION</span></span>
            <span class="text-slate-400 font-mono text-[9px] sm:text-[10px] shrink-0 ml-2">YES EDU</span>
          </div>
        </div>

        <!-- SCENE 3: Cartoon Teacher & Cute AI Robot Companion (White BG) -->
        <div id="videoScene2" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#f0f9ff] to-[#f8fafc] p-3 sm:p-6 sm:pb-16 flex flex-col justify-between text-slate-800 overflow-hidden h-full">
          <!-- Cyberpunk Cyan AI Glow -->
          <div class="ai-neon-aura top-10 right-28"></div>

          <div class="flex items-center justify-between z-10 gap-2 mb-1 sm:mb-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-sky-500 animate-ping shrink-0"></span>
              <span class="text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-sky-800 bg-sky-50 border border-sky-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs">
                MODULE 3: NCTB AI PEDAGOGY (20s - 30s)
              </span>
            </div>
            <span class="text-[10px] sm:text-xs text-sky-800 font-mono font-semibold shrink-0">
              <span class="hidden sm:inline">NEON TECH LAB • </span>NCTB AI V2
            </span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-2 md:grid-cols-12 gap-2 sm:gap-6 items-center my-auto z-10 w-full">
            
            <!-- Cartoon Teacher with Tea -->
            <div class="col-span-1 md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[9px] sm:text-[11px] font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md border-2 border-sky-400 mb-1 sm:mb-2 relative animate-bounce max-w-[150px] sm:max-w-none">
                  "এআই ৩০ সেকেন্ডেই প্রশ্নপত্র তৈরি করলো!"
                  <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rotate-45 absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-sky-400"></div>
                </div>

                <!-- SVG Cartoon Teacher -->
                <svg class="w-26 h-28 sm:w-40 sm:h-44 drop-shadow-md mx-auto" viewBox="0 0 180 200" fill="none">
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

                <span class="text-[11px] sm:text-xs font-extrabold text-slate-900 block mt-0.5 sm:mt-1 truncate max-w-[130px] sm:max-w-none">রফিকুল ইসলাম (শিক্ষক)</span>
                <span class="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-[130px] sm:max-w-none">Teaching with AI</span>
              </div>
            </div>

            <!-- Cute Cartoon AI Mascot "YES Bot" -->
            <div class="col-span-1 md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="anim-mascot">
                <svg class="w-22 h-26 sm:w-32 sm:h-36 drop-shadow-lg mx-auto" viewBox="0 0 140 160" fill="none">
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

                <span class="text-[10px] sm:text-xs font-mono font-bold text-sky-800 block">YES BOT V2</span>
                <span class="text-[8px] sm:text-[10px] text-emerald-700 font-mono font-bold">CQ & MCQ READY</span>
              </div>
            </div>

            <!-- Right: Generated Creative Question Sheet -->
            <div class="col-span-2 md:col-span-4 bg-white border-2 border-sky-400 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl space-y-1.5 sm:space-y-2.5">
              <div class="flex items-center justify-between text-[10px] sm:text-xs text-sky-800 font-mono pb-1 border-b border-slate-100 font-bold">
                <span class="truncate">NCTB QUESTION PAPER</span>
                <span class="text-emerald-700 font-bold shrink-0 ml-1">READY (18s)</span>
              </div>
              <div id="sceneAiQuestionBox" class="bg-sky-50/70 p-2 sm:p-2.5 rounded-lg border border-sky-200 text-[10px] sm:text-[11px] text-slate-800 font-sans shadow-xs transition-all duration-300">
                <span class="text-sky-800 font-bold block">পদার্থবিজ্ঞান • ৯ম শ্রেণি:</span>
                "ক. বল কাকে বলে? (১)<br>
                খ. জড়তা ও ত্বরণের পার্থক্য ব্যাখ্যা কর (২)<br>
                গ. উদ্দীপকের তথ্যের আলোকে ত্বরণ নির্ণয় কর (৩)"
              </div>
              
              <!-- Chronicle Interactive Action Trigger -->
              <div class="flex items-center justify-between pt-1">
                <button type="button" id="interactiveAiGenBtn" class="chronicle-action-btn bg-sky-600 hover:bg-sky-700 text-white">
                  <span>✨</span> <span>নতুন প্রশ্ন জেনারেট (AI Gen)</span>
                </button>
                <span class="text-[9px] sm:text-[10px] text-emerald-700 font-mono font-bold hidden sm:inline">NCTB 2026 Ready</span>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-slate-200/80 pt-1.5 sm:pt-2 z-10">
            <span class="flex items-center gap-1 sm:gap-1.5 truncate"><span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse shrink-0"></span> <span class="truncate">MODULE 03: NCTB 2026 AI CURRICULUM & GRADING</span></span>
            <span class="text-slate-400 font-mono text-[9px] sm:text-[10px] shrink-0 ml-2">YES EDU</span>
          </div>
        </div>

        <!-- SCENE 4: Cartoon Principal / Muhtamim with Tablet (White BG) -->
        <div id="videoScene3" class="video-scene-wrapper bg-gradient-to-br from-[#ffffff] via-[#faf5ff] to-[#f8fafc] p-3 sm:p-6 sm:pb-16 flex flex-col justify-between text-slate-800 overflow-hidden h-full">
          <!-- Executive Rim Atmospheric Glow -->
          <div class="executive-rim top-10 right-20"></div>

          <div class="flex items-center justify-between z-10 gap-2 mb-1 sm:mb-0">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500 animate-ping shrink-0"></span>
              <span class="text-[10px] sm:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-purple-800 bg-purple-50 border border-purple-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs">
                MODULE 4: SHARIAH & INSTITUTION CONTROL (30s - 40s)
              </span>
            </div>
            <span class="text-[10px] sm:text-xs text-purple-800 font-mono font-semibold shrink-0">
              <span class="hidden sm:inline">EXECUTIVE BI • </span>DASHBOARD
            </span>
          </div>

          <!-- Main Cartoon Graphic Stage -->
          <div class="grid grid-cols-2 md:grid-cols-12 gap-2 sm:gap-6 items-center my-auto z-10 w-full">
            
            <!-- Cartoon Principal / Muhtamim -->
            <div class="col-span-1 md:col-span-5 flex flex-col items-center text-center">
              <div class="relative">
                <!-- Speech Bubble -->
                <div class="bg-white text-slate-900 text-[9px] sm:text-[11px] font-bold py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg sm:rounded-xl shadow-md border-2 border-purple-400 mb-1 sm:mb-2 relative animate-bounce max-w-[150px] sm:max-w-none">
                  "হিসাব এখন শতভাগ নির্ভুল ও স্বচ্ছ!"
                  <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rotate-45 absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-purple-400"></div>
                </div>

                <!-- SVG Cartoon Principal -->
                <svg class="w-26 h-28 sm:w-40 sm:h-44 drop-shadow-md mx-auto" viewBox="0 0 180 200" fill="none">
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

                <span class="text-[11px] sm:text-xs font-extrabold text-slate-900 block mt-0.5 sm:mt-1 truncate max-w-[130px] sm:max-w-none">মাওলানা আব্দুল কাদের (অধ্যক্ষ)</span>
                <span class="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-[130px] sm:max-w-none">Control on Mobile</span>
              </div>
            </div>

            <!-- Visual Real-time Charts -->
            <div class="col-span-1 md:col-span-3 flex flex-col items-center justify-center text-center">
              <div class="p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl border-2 border-purple-300 shadow-xl space-y-1 sm:space-y-2 w-full max-w-[130px] sm:max-w-[160px] mx-auto">
                <span class="text-[8px] sm:text-[10px] font-mono text-purple-800 uppercase tracking-wider block font-bold">FEES COLLECTED</span>
                <div class="text-xl sm:text-2xl font-extrabold text-emerald-600 font-mono">99.2%</div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 sm:h-2 overflow-hidden border border-slate-200">
                  <div class="bg-emerald-500 h-1.5 sm:h-2 rounded-full" style="width: 99.2%;"></div>
                </div>
                <span class="text-[8px] sm:text-[9px] text-slate-500 font-mono block">Zero Bad Dues</span>
              </div>
            </div>

            <!-- Right: Hostel & Waqf Status -->
            <div class="col-span-2 md:col-span-4 bg-white border-2 border-purple-300 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl space-y-1.5 sm:space-y-2.5">
              <div class="flex items-center justify-between border-b border-purple-100 pb-1.5">
                <span class="text-[11px] sm:text-xs font-bold text-purple-900 block truncate">🕌 প্রাতিষ্ঠানিক অডিট</span>
                <div class="flex items-center gap-1">
                  <button type="button" id="toggleWaqfTab" class="chronicle-mini-tab active">ওয়াকফ ফান্ড</button>
                  <button type="button" id="toggleHostelTab" class="chronicle-mini-tab">হোস্টেল সিট</button>
                </div>
              </div>
              <div id="sceneWaqfContent" class="p-2 sm:p-2.5 bg-purple-50/70 rounded-lg sm:rounded-xl border border-purple-200 text-[10px] sm:text-xs font-mono space-y-0.5 sm:space-y-1 text-slate-800 shadow-xs transition-all duration-300">
                <div class="flex justify-between"><span>লিল্লাহ ফান্ড অডিট:</span><span class="text-emerald-700 font-bold">১০০% স্বচ্ছ</span></div>
                <div class="flex justify-between"><span>ওয়াকফ জমি রেকর্ড:</span><span class="text-purple-800 font-bold">৩ একর খতিয়ান</span></div>
                <div class="flex justify-between"><span>শিক্ষক উপস্থিতি:</span><span class="text-emerald-700 font-bold">৯৮.৫%</span></div>
              </div>
              <span id="waqfAuditStatus" class="text-[9px] sm:text-[10px] text-emerald-700 font-bold block text-right font-mono">১০০% স্বচ্ছ অডিট ✓</span>
            </div>

          </div>

          <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono border-t border-slate-200/80 pt-1.5 sm:pt-2 z-10">
            <span class="flex items-center gap-1 sm:gap-1.5 truncate"><span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shrink-0"></span> <span class="truncate">MODULE 04: MADRASA WAQF & HOSTEL MANAGEMENT</span></span>
            <span class="text-slate-400 font-mono text-[9px] sm:text-[10px] shrink-0 ml-2">YES EDU</span>
          </div>
        </div>

      </div>
    `;

    // Reattach Chronicle-style scene interactivity after rendering
    attachSceneInteractivity();
  }

  // Chronicle Interactive Scene Action Handlers
  function attachSceneInteractivity() {
    // 1. Gate Punch Simulation
    const punchBtn = document.getElementById('interactivePunchBtn');
    if (punchBtn) {
      punchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSoundEffect('beep');
        const gateStatus = document.getElementById('sceneGateStatus');
        const gateCard = document.getElementById('sceneGateCard');
        const phoneNotice = document.getElementById('scenePhoneNotice');
        
        if (gateStatus) {
          gateStatus.textContent = 'PUNCH VERIFIED • 08:30:14 AM';
          gateStatus.classList.add('text-emerald-600');
        }
        if (gateCard) {
          gateCard.classList.add('ring-4', 'ring-emerald-400');
          setTimeout(() => gateCard.classList.remove('ring-4', 'ring-emerald-400'), 1200);
        }
        if (phoneNotice) {
          phoneNotice.innerHTML = `
            <div class="text-emerald-700 font-bold text-[10px] sm:text-[11px] mb-1 flex items-center justify-between">
              <span>YES_EDU_SMS</span>
              <span class="text-[9px] text-emerald-600 font-bold animate-ping">Just Now • 2.1s SMS</span>
            </div>
            "সম্মানিত অভিভাবক, মুহাম্মদ তানভীর এইমাত্র ০৮:৩০:১৪ মিনিটে গেটে কার্ড পাঞ্চ করেছেন। — YES EDU"
          `;
          phoneNotice.classList.add('bg-emerald-100');
          setTimeout(() => phoneNotice.classList.remove('bg-emerald-100'), 1500);
        }
      });
    }

    // 2. bKash Fee Payment Simulation
    const payBtn = document.getElementById('interactivePayBtn');
    if (payBtn) {
      payBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSoundEffect('chime');
        const payStatus = document.getElementById('interactivePayStatus');
        const receiptBox = document.getElementById('sceneReceiptBox');
        if (payStatus) {
          payStatus.textContent = 'পেমেন্ট সফল! ৳২,৫০০ ✓';
          payStatus.classList.add('animate-bounce');
        }
        if (receiptBox) {
          receiptBox.classList.add('ring-4', 'ring-amber-400');
          setTimeout(() => receiptBox.classList.remove('ring-4', 'ring-amber-400'), 1200);
        }
      });
    }

    // 3. AI Question Generation Simulation
    const aiGenBtn = document.getElementById('interactiveAiGenBtn');
    let aiQuestionState = 0;
    if (aiGenBtn) {
      aiGenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSoundEffect('beep');
        const qBox = document.getElementById('sceneAiQuestionBox');
        if (qBox) {
          aiQuestionState = (aiQuestionState + 1) % 2;
          if (aiQuestionState === 1) {
            qBox.innerHTML = `
              <span class="text-sky-800 font-bold block">উচ্চতর গণিত • ৯ম শ্রেণি:</span>
              "ক. রেডিয়ান কোণ কাকে বলে? (১)<br>
              খ. ত্রিকোণমিতিক অভেদটি প্রমাণ কর (২)<br>
              গ. উদ্দীপক অনুযায়ী নির্ণেয় কোণটির মান নির্ণয় কর (৩)"
            `;
          } else {
            qBox.innerHTML = `
              <span class="text-sky-800 font-bold block">পদার্থবিজ্ঞান • ৯ম শ্রেণি:</span>
              "ক. বল কাকে বলে? (১)<br>
              খ. জড়তা ও ত্বরণের পার্থক্য ব্যাখ্যা কর (২)<br>
              গ. উদ্দীপকের তথ্যের আলোকে ত্বরণ নির্ণয় কর (৩)"
            `;
          }
          qBox.classList.add('ring-2', 'ring-sky-400', 'bg-sky-100');
          setTimeout(() => qBox.classList.remove('ring-2', 'ring-sky-400', 'bg-sky-100'), 800);
        }
      });
    }

    // 4. Shariah Waqf & Hostel Tab Toggle
    const waqfTab = document.getElementById('toggleWaqfTab');
    const hostelTab = document.getElementById('toggleHostelTab');
    const waqfContent = document.getElementById('sceneWaqfContent');
    const waqfAuditStatus = document.getElementById('waqfAuditStatus');

    if (waqfTab && hostelTab && waqfContent) {
      waqfTab.addEventListener('click', (e) => {
        e.stopPropagation();
        waqfTab.classList.add('active');
        hostelTab.classList.remove('active');
        waqfContent.innerHTML = `
          <div class="flex justify-between"><span>লিল্লাহ ফান্ড অডিট:</span><span class="text-emerald-700 font-bold">১০০% স্বচ্ছ</span></div>
          <div class="flex justify-between"><span>ওয়াকফ জমি রেকর্ড:</span><span class="text-purple-800 font-bold">৩ একর খতিয়ান</span></div>
          <div class="flex justify-between"><span>দান রসিদ এসএমএস:</span><span class="text-emerald-700 font-bold">স্বয়ংক্রিয়</span></div>
        `;
        if (waqfAuditStatus) waqfAuditStatus.textContent = '১০০% স্বচ্ছ অডিট ✓';
      });

      hostelTab.addEventListener('click', (e) => {
        e.stopPropagation();
        hostelTab.classList.add('active');
        waqfTab.classList.remove('active');
        waqfContent.innerHTML = `
          <div class="flex justify-between"><span>হোস্টেল সিট বরাদ্দ:</span><span class="text-purple-800 font-bold">২৪/২৪ পূর্ণ</span></div>
          <div class="flex justify-between"><span>রুম মনিটরিং:</span><span class="text-emerald-700 font-bold">সিসিটিভি অনলাইন</span></div>
          <div class="flex justify-between"><span>মিল চার্জ ব্যালেন্স:</span><span class="text-purple-800 font-bold">৳৪৮,৫০০ ক্যাশ</span></div>
        `;
        if (waqfAuditStatus) waqfAuditStatus.textContent = '২৪ সিট পরিচালিত ✓';
      });
    }
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

    // Update Chronicle Story Pills & Progress Bars (Timeline)
    const activeChapter = newIdx;
    const chapterSecondsElapsed = currentTime % 10;
    const chapterPercent = (chapterSecondsElapsed / 10) * 100;

    for (let i = 0; i < 4; i++) {
      const pill = document.getElementById(`chroniclePill${i}`);
      const prog = document.getElementById(`chronicleProgress${i}`);
      if (pill) {
        if (i === activeChapter) {
          pill.classList.add('active');
          if (prog) prog.style.width = `${Math.min(100, Math.max(0, chapterPercent))}%`;
        } else {
          pill.classList.remove('active');
          if (prog) {
            prog.style.width = (i < activeChapter) ? '100%' : '0%';
          }
        }
      }
    }

    // Update legacy chapter pills if any
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

  // Legacy Chapter pills click seeks to chapter with smooth transition
  chapterPills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      currentTime = chapterMeta[idx].startTime;
      renderCurrentFrame();
      startPlayback();
    });
  });

  // Chronicle Story Pills Navigation (Idea 1)
  for (let i = 0; i < 4; i++) {
    const pill = document.getElementById(`chroniclePill${i}`);
    if (pill) {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        currentTime = i * 10;
        renderCurrentFrame();
        startPlayback();
      });
    }
  }

  // 3D Perspective Tilt on Mac Hardware (Chronicle HQ signature effect)
  const macShowcase = document.getElementById('videoShowcase');
  if (macShowcase) {
    macShowcase.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const rect = macShowcase.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 3;
      const rotY = (x / (rect.width / 2)) * 3;
      const macBody = macShowcase.querySelector('.mac-hardware-body');
      if (macBody) {
        macBody.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }
    });

    macShowcase.addEventListener('mouseleave', () => {
      const macBody = macShowcase.querySelector('.mac-hardware-body');
      if (macBody) {
        macBody.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    });
  }

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
   9. Institution Persona Switcher (School vs College vs Madrasa)
   ========================================================================== */
function setInstitutionPersona(personaKey) {
  const masterBtns = document.querySelectorAll('.institution-persona-btn');
  const innerSchoolBtn = document.getElementById('biToggleSchool');
  const innerMadrasaBtn = document.getElementById('biToggleMadrasa');
  const badgePill = document.getElementById('personaBadgePill');
  const badgeText = document.getElementById('personaBadgeText');
  const summaryText = document.getElementById('personaSummaryText');

  // Sync active class on master buttons
  masterBtns.forEach(btn => {
    if (btn.getAttribute('data-institution') === personaKey) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Sync active class on inner buttons if present
  if (innerSchoolBtn && innerMadrasaBtn) {
    if (personaKey === 'madrasa') {
      innerMadrasaBtn.classList.add('active');
      innerSchoolBtn.classList.remove('active');
    } else {
      innerSchoolBtn.classList.add('active');
      innerMadrasaBtn.classList.remove('active');
    }
  }

  const institutionMeta = {
    school: {
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badgeEn: 'GENERAL SCHOOL & CADET ARCHITECTURE ACTIVE',
      badgeBn: 'স্কুল ও ক্যাডেট একাডেমি মোড সক্রিয়',
      summaryEn: 'Engineered for primary, high school, and cadet academies across Bangladesh. Instant 2.1s biometric gate SMS to mothers, 1-tap bKash tuition collection, and automated NCTB 2026 creative question papers.',
      summaryBn: 'সারাদেশের প্রাথমিক, মাধ্যমিক ও ক্যাডেট স্কুলের জন্য নির্ভরযোগ্য অপারেটিং সিস্টেম। গেটে পাঞ্চের ২.১ সেকেন্ডে মায়ের ফোনে নোটিফিকেশন এসএমএস, ১-ট্যাপে বিকাশ ফি আদায় এবং এনসিটিবি নতুন মূল্যায়ন টুলস।',
      tab: 'biometric',
      alert: '🏫 General School & Cadet Mode Activated',
      toast: '🏫 Switched to General School Architecture',
      enrolledLabel: 'Total Enrolled Students',
      enrolledVal: '১,২৪০ জন',
      enrolledSub: 'Present: ১,২২০ (৯৮.৪%)',
      feesLabel: "Today's Tuition Fees",
      feesVal: '৳৪,৮৫,২০০',
      feesSub: 'bKash: 74% • Bank: 26%',
      gateLabel: 'Gate Punch Telemetry',
      gateVal: 'Online (2.1s SMS)',
      gateSub: 'Gate #01 & #02 Synced',
      smsLabel: 'Instant Parent SMS',
      smsVal: '১,২২০ টি',
      smsSub: 'Avg Delivery: 2.1s',
      studentName: 'Muhammad Abdullah',
      studentMeta: 'Class 10-A • Roll: 01'
    },
    college: {
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
      badgeEn: 'HIGHER SECONDARY & DEGREE COLLEGE ARCHITECTURE ACTIVE',
      badgeBn: 'কলেজ ও উচ্চমাধ্যমিক মোড সক্রিয়',
      summaryEn: 'Engineered for colleges and higher secondary institutions. Multi-shift management (Morning & Day), Science/Arts/Commerce stream tabulations, board examination admit cards, and 1-click staff bank payroll.',
      summaryBn: 'কলেজ ও উচ্চমাধ্যমিক প্রতিষ্ঠানের জন্য বিশেষায়িত। মর্নিং ও ডে শিফট ম্যানেজমেন্ট, বিজ্ঞান/মানবিক/ব্যবসায় শিক্ষা বিভাগের আলাদা মার্কশিট, বোর্ড পরীক্ষার প্রবেশপত্র এবং শিক্ষকদের ব্যাংক পে-রোল।',
      tab: 'exam',
      alert: '🎓 Degree College Mode Activated',
      toast: '🎓 Switched to Degree College Architecture',
      enrolledLabel: 'Total College Students',
      enrolledVal: '১,৮৫০ জন',
      enrolledSub: 'Morning & Day Shifts',
      feesLabel: 'Semester Fees Collected',
      feesVal: '৳১৮,৫০,০০০',
      feesSub: '1-Click Bank Reconciliation',
      gateLabel: 'Shift Biometric Terminal',
      gateVal: 'Online (Morning & Day)',
      gateSub: 'Science, Arts, Business Stream',
      smsLabel: 'Admit Card & Routine SMS',
      smsVal: '১,৮৫০ টি',
      smsSub: 'Exam Notice Delivered',
      studentName: 'Tanvir Ahmed',
      studentMeta: 'HSC 2nd Year • Science Stream • Roll: 104'
    },
    madrasa: {
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
      badgeEn: '100% SHARIAH COMPLIANT QAWMI & ALIM ARCHITECTURE ACTIVE',
      badgeBn: 'কওমি ও আলিয়া মাদরাসা মোড সক্রিয়',
      summaryEn: 'Engineered specifically for Qawmi, Alim, and Tahfiz institutions. Strict Shariah separation for Lillah Boarding, Zakat, and General tuition ledgers with automated donor SMS receipts and hostel room allocation.',
      summaryBn: 'কওমি, আলিয়া ও হিফজ মাদরাসার বাস্তব চাহিদার আলোকে নির্মিত। সাধারণ তহবিল, এতিমখানা লিল্লাহ বোর্ডিং ও যাকাত ফান্ডের সম্পূর্ণ পৃথক শরিয়াহসম্মত হিসাব, দাতাদের অটো এসএমএস রসিদ এবং মেস-খানা বন্টন।',
      tab: 'waqf',
      alert: '🕌 Shariah Madrasa & Waqf Mode Activated',
      toast: '🕌 Switched to Madrasa & Waqf Architecture',
      enrolledLabel: 'মোট তালিব-ই-ইলম',
      enrolledVal: '৮৬০ জন',
      enrolledSub: 'উপস্থিত: ৮৫২ জন (৯৯.১%)',
      feesLabel: 'ওয়াকফ ও লিল্লাহ ফান্ড',
      feesVal: '৳৬,৪০,০০০',
      feesSub: 'শরিয়াহ অডিট লকড',
      gateLabel: 'হিফজ খতমে কোরআন',
      gateVal: '১৮ পারা',
      gateSub: 'আজ সম্পন্ন: ২ জন',
      smsLabel: 'লিল্লাহ বোর্ডিং খানা',
      smsVal: '৩৫০ জন',
      smsSub: 'সেহরি ও ইফতার প্রস্তুত',
      studentName: 'মুহাম্মদ আবদুল্লাহ',
      studentMeta: 'হিফজ ও কিতাব বিভাগ • রোল: ০১'
    }
  };

  const meta = institutionMeta[personaKey] || institutionMeta.school;

  // Update Badge
  if (badgePill) {
    badgePill.className = `inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-2xs border ${meta.badgeClass}`;
  }
  if (badgeText) {
    badgeText.textContent = meta.badgeEn;
  }
  if (summaryText) {
    const enSpan = summaryText.querySelector('.lang-en');
    const bnSpan = summaryText.querySelector('.lang-bn');
    if (enSpan) enSpan.textContent = meta.summaryEn;
    if (bnSpan) bnSpan.textContent = meta.summaryBn;
  }

  // Update KPI displays if present
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

  if (biKpiEnrolledLabel) biKpiEnrolledLabel.textContent = meta.enrolledLabel;
  if (biKpiEnrolledValue) biKpiEnrolledValue.textContent = meta.enrolledVal;
  if (biKpiEnrolledSub) biKpiEnrolledSub.textContent = meta.enrolledSub;
  if (biKpiFeesLabel) biKpiFeesLabel.textContent = meta.feesLabel;
  if (biKpiFeesValue) biKpiFeesValue.textContent = meta.feesVal;
  if (biKpiFeesSub) biKpiFeesSub.textContent = meta.feesSub;
  if (biKpiGateLabel) biKpiGateLabel.textContent = meta.gateLabel;
  if (biKpiGateValue) biKpiGateValue.textContent = meta.gateVal;
  if (biKpiGateSub) biKpiGateSub.textContent = meta.gateSub;
  if (biKpiSmsLabel) biKpiSmsLabel.textContent = meta.smsLabel;
  if (biKpiSmsValue) biKpiSmsValue.textContent = meta.smsVal;
  if (biKpiSmsSub) biKpiSmsSub.textContent = meta.smsSub;
  if (phoneStudentName) phoneStudentName.textContent = meta.studentName;
  if (phoneStudentMeta) phoneStudentMeta.textContent = meta.studentMeta;

  // Jump to relevant module tab in software window
  switchSoftwareTab(meta.tab);

  // Trigger Dynamic Island & Toast
  triggerDynamicIslandAlert(meta.alert, 2600);
  showToastNotification(meta.toast);
}

function initPersonaSwitcher() {
  const personaBtns = document.querySelectorAll('.institution-persona-btn');
  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInstitution = btn.getAttribute('data-institution') || 'school';
      setInstitutionPersona(targetInstitution);
    });
  });

  const innerSchoolBtn = document.getElementById('biToggleSchool');
  const innerMadrasaBtn = document.getElementById('biToggleMadrasa');
  if (innerSchoolBtn) {
    innerSchoolBtn.addEventListener('click', () => setInstitutionPersona('school'));
  }
  if (innerMadrasaBtn) {
    innerMadrasaBtn.addEventListener('click', () => setInstitutionPersona('madrasa'));
  }
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
    biToggleSchool.addEventListener('click', () => setInstitutionPersona('school'));
    biToggleMadrasa.addEventListener('click', () => setInstitutionPersona('madrasa'));
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



