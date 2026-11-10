'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Database,
  Zap,
  Play,
  CheckCircle2,
  Printer,
  BookOpen,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Copy,
  Clock,
  Send,
  Check,
  Building2,
  TrendingUp,
  MessageSquare,
  UserCheck
} from 'lucide-react';

type AICoreType = 'ustadh' | 'erpBot';
type SubjectTopic = 'hifz' | 'physics' | 'math' | 'bangla';

export interface HeroSectionProps {
  onBookDemo?: () => void;
  onWatchVideo?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookDemo,
  onWatchVideo
}) => {
  const [activeCore, setActiveCore] = useState<AICoreType>('ustadh');
  const [selectedTopic, setSelectedTopic] = useState<SubjectTopic>('hifz');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPrinted, setIsPrinted] = useState<boolean>(false);

  // 3D Perspective Tilt on Mouse Move
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0
  });

  const timerDuration = 5500; // 5.5 seconds per rotation
  const timerInterval = 50;

  // Auto-rotation timer logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (timerInterval / timerDuration) * 100;
        if (next >= 100) {
          setActiveCore((curr) => (curr === 'ustadh' ? 'erpBot' : 'ustadh'));
          return 0;
        }
        return next;
      });
    }, timerInterval);

    return () => clearInterval(interval);
  }, [isPaused, activeCore]);

  // Handle manual tab switch
  const handleSelectCore = (core: AICoreType) => {
    setActiveCore(core);
    setProgress(0);
  };

  // Mouse tilt handlers for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsPaused(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    setIsPrinted(true);
    setTimeout(() => setIsPrinted(false), 2000);
  };

  // 20-Mark Board Exam Content by Subject
  const topicContent = {
    hifz: {
      title: 'হিফজ ও তাজবীদ বিভাগ • বার্ষিক মূল্যায়ন ২০২৬',
      totalMarks: 20,
      time: '৩৫ মিনিট',
      q1Title: 'ক-বিভাগ: জ্ঞান ও অনুধাবনমূলক',
      q1Marks: 8,
      q1Desc: '১. নুন সাকিন ও তানভীনের হুকুম কয়টি ও কী কী? ইখফার নিয়ম উদাহরণসহ সংক্ষেপে ব্যাখ্যা করো।',
      q2Title: 'খ-বিভাগ: বোর্ড সৃজনশীল প্রয়োগ',
      q2Marks: 12,
      q2Desc: '২. উদ্দীপক পড়ে সূরা বাকারার ২৫৫ নম্বর আয়াত (আয়াতুল কুরসী) এর মূল শিক্ষা ও তাওহিদের প্রভাব বিশ্লেষণ করো।',
      badge: 'বোর্ড প্রশ্ন স্ট্যান্ডার্ড',
      prompt: '"আমাকে বোর্ড প্রশ্ন থেকে একটি ২০ নম্বরের প্রশ্ন বানিয়ে দাও"'
    },
    physics: {
      title: 'পদার্থবিজ্ঞান ১ম পত্র • বোর্ড স্ট্যান্ডার্ড টেস্ট ২০২৬',
      totalMarks: 20,
      time: '৩৫ মিনিট',
      q1Title: 'ক-বিভাগ: জ্ঞান ও অনুধাবন',
      q1Marks: 8,
      q1Desc: '১. স্নেলের সূত্রটি বিবৃতি করো এবং আলোর ক্রান্তিকোণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলনের শর্ত ব্যাখ্যা করো।',
      q2Title: 'খ-বিভাগ: গাণিতিক প্রয়োগ ও দক্ষতা',
      q2Marks: 12,
      q2Desc: '২. বায়ুর সাপেক্ষে কাঁচের প্রতিসরাঙ্ক ১.৫ হলে আলোকরশ্মি ৬০° কোণে আপতিত হলে প্রতিসরণ কোণ কত হবে নির্ণয় করো।',
      badge: 'এসএসসি বোর্ড কারিকুলাম',
      prompt: '"আমাকে এসএসসি বোর্ড প্রশ্ন থেকে আলোর প্রতিসরণের ওপর ২০ নম্বরের প্রশ্ন বানিয়ে দাও"'
    },
    math: {
      title: 'সাধারণ গণিত • বোর্ড মডেল টেস্ট ২০২৬',
      totalMarks: 20,
      time: '৩৫ মিনিট',
      q1Title: 'ক-বিভাগ: সংক্ষিপ্ত ও অনুধাবন',
      q1Marks: 8,
      q1Desc: '১. x + 1/x = √3 হলে প্রমাণ করো যে x³ + 1/x³ = 0',
      q2Title: 'খ-বিভাগ: উচ্চতর সৃজনশীল বিশ্লেষণ',
      q2Marks: 12,
      q2Desc: '২. উদ্দীপকের আলোকে p⁴ - p² + 1 = 0 হলে p⁶ + 1/p⁶ এর মান ৪ ধাপীয় প্রক্রিয়ায় নির্ণয় করো।',
      badge: 'বোর্ড ব্লুমস ট্যাক্সোনমি',
      prompt: '"আমাকে দাখিল/এসএসসি বোর্ড প্রশ্ন থেকে বীজগাণিতিক রাশির ২০ নম্বরের সৃজনশীল প্রশ্ন বানিয়ে দাও"'
    },
    bangla: {
      title: 'বাংলা ১ম পত্র • বোর্ড মূল্যায়ন ২০২৬',
      totalMarks: 20,
      time: '৩৫ মিনিট',
      q1Title: 'ক-অংশ: জ্ঞান ও অনুধাবন',
      q1Marks: 8,
      q1Desc: '১. চতুর্দশপদী কবিতার অষ্টক ও ষটকের মূল ভাব কী? প্রবাসজীবনের বেদনা কীভাবে ফুটে উঠেছে?',
      q2Title: 'খ-অংশ: সৃজনশীল প্রয়োগ',
      q2Marks: 12,
      q2Desc: '২. \'সতত হে নদ তুমি পড় মোর মনে\'—উদ্দীপকের ভাব বিশ্লেষণ করে কবির খাঁটি দেশপ্রেমের পরিচয় দাও।',
      badge: 'বোর্ড সৃজনশীল কাঠামো',
      prompt: '"আমাকে বোর্ড প্রশ্ন থেকে কপোতাক্ষ নদ কবিতার ওপর ২০ নম্বরের সৃজনশীল প্রশ্ন সাজিয়ে দাও"'
    }
  };

  const currentTopic = topicContent[selectedTopic];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 py-16 lg:py-24 text-slate-800">
      
      {/* Background Soft Radial Mesh Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute -top-40 left-1/2 h-[650px] w-[900px] -translate-x-1/2 rounded-full blur-3xl transition-all duration-1000 ${
            activeCore === 'ustadh' ? 'bg-emerald-500/10' : 'bg-cyan-500/10'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: High-Converting Engaging Copy & Tactile CTAs
              ========================================================================= */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left z-10">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-mono uppercase tracking-wider">✨ AI-POWERED EDUCATIONAL ERP FOR MADRASAS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.18] text-slate-900">
              খাতা-কলমের জটিলতা শেষ,<br />
              মাদরাসা পরিচালনায় যুগান্তকারী{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                YesEdu Dual AI
              </span>
            </h1>

            {/* Subheadline: Highlights Ustadh AI and YesEdu Bot */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              দেশের একমাত্র ডুয়াল-কোর এআই চালিত শিক্ষা ক্লাউড।{' '}
              <strong className="text-slate-900 font-semibold">Teacher Assistant AI</strong> (কারিকুলাম ও প্রশ্ন ব্যাংক) দিয়ে এক ক্লিকে ২০ নম্বরের বোর্ড স্ট্যান্ডার্ড প্রশ্নপত্র তৈরি করুন, আর{' '}
              <strong className="text-slate-900 font-semibold">Finance Chatbot</strong> (লাইভ ইআরপি কোপাইলট) দিয়ে ফি আদায় ও শিক্ষক বেতনের সার্বিক হিসাব নিন রিয়েল-টাইমে।
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                type="button"
                onClick={onBookDemo}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-emerald-500/50"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                <span>ফ্রি ডেমো বুক করুন</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onWatchVideo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>লাইভ ইন্টারঅ্যাকশন দেখুন</span>
              </button>
            </div>

            {/* Institutional Trust Badges */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>৫০+ শীর্ষস্থানীয় মাদরাসায় বিশ্বস্ত</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>AWS ক্লাউড ৯৯.৯% আপটাইম</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                <span>১০০% শরিয়াহসম্মত অডিট লেজার</span>
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: The 3D School & Emerging Dual AI Deck
              ========================================================================= */}
          <div className="lg:col-span-6 relative z-10 flex flex-col items-center">
            
            {/* Dynamic Backdrop Glow */}
            <div
              className={`absolute -inset-6 rounded-3xl blur-2xl transition-all duration-700 opacity-60 pointer-events-none ${
                activeCore === 'ustadh' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'
              }`}
            />

            {/* Floating Live Indicator Badges */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="hidden sm:inline-flex absolute -top-5 -left-5 z-30 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-[11px] font-bold text-slate-800 items-center gap-2 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>⚡ ২.৪ সেকেন্ডে ২০ নম্বরের বোর্ড প্রশ্ন জেনারেট</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], rotate: [1.5, -1.5, 1.5] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="hidden sm:inline-flex absolute -bottom-4 -right-4 z-30 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-[11px] font-bold text-slate-800 items-center gap-2 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <span>💳 লাইভ বিকাশ ফি ও শিক্ষক বেতন অটো-সিঙ্ক ✓</span>
            </motion.div>

            {/* 1. 3D School Campus Digital Viewport (Origin of AI Agents) */}
            <div className="w-full max-w-lg relative h-48 sm:h-52 rounded-2xl bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/50 border border-slate-200/95 shadow-sm overflow-hidden mb-2.5 group">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Isometric School Graphic / 3D Metaphor */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-xl flex items-center justify-center text-white relative">
                    <Building2 className="w-10 h-10" />
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-mono text-[9px] font-extrabold shadow-sm">
                      3D HUB
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-800 mt-2">
                    YES EDU • ৩D ডিজিটাল ক্যাম্পাস সেন্টার
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    অটোমেটিক এআই কোপাইলট মুভ-আউট স্টেশন
                  </span>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute top-2.5 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs text-[10px] font-bold text-slate-700 flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>৩D ক্যাম্পাস হাব • লাইভ ইঞ্জিন</span>
              </div>
              <div className="absolute top-2.5 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xs text-[10px] font-mono font-bold text-emerald-800 flex items-center gap-1.5 pointer-events-none">
                <span>🏫 YES EDU CAMPUS OS</span>
              </div>
            </div>

            {/* 2. Branching Conduit Strip */}
            <div className="w-full max-w-lg flex items-center justify-between px-4 py-1 text-[11px] font-bold text-slate-500 mb-1">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>শিক্ষক এআই ইঞ্জিন</span>
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <ChevronRight className="w-3 h-3 text-emerald-500 rotate-90" />
                <span>ক্যাম্পাস থেকে মুভ আউট</span>
                <ChevronRight className="w-3 h-3 text-cyan-500 rotate-90" />
              </div>
              <span className="flex items-center gap-1.5 text-cyan-800 bg-cyan-50/90 px-2.5 py-0.5 rounded-full border border-cyan-200/80 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span>ফাইন্যান্স চ্যাটবট</span>
              </span>
            </div>

            {/* 3. Segmented Dual-Core Mode Switcher & Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-3.5 p-1.5 rounded-2xl bg-slate-900/5 backdrop-blur-md border border-slate-200/90 shadow-xs flex items-center gap-1.5 relative z-30">
              <button
                type="button"
                onClick={() => handleSelectCore('ustadh')}
                className={`relative flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeCore === 'ustadh'
                    ? 'bg-white text-slate-900 shadow-sm border border-emerald-500/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span className="text-emerald-600">👨‍🏫</span>
                <span>Teacher Assistant (২০ মার্ক প্রশ্ন)</span>
                {activeCore === 'ustadh' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSelectCore('erpBot')}
                className={`relative flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeCore === 'erpBot'
                    ? 'bg-white text-slate-900 shadow-sm border border-cyan-500/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span className="text-cyan-600">💬</span>
                <span>Finance Chatbot (হিসাব ও ফি)</span>
                {activeCore === 'erpBot' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse ml-0.5" />
                )}
              </button>

              {/* Progress Countdown Line */}
              <div className="absolute -bottom-1 left-3 right-3 h-1 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-75 ${
                    activeCore === 'ustadh' ? 'bg-emerald-500' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 4. 3D Stacked Card Stage */}
            <div
              className="relative w-full max-w-lg min-h-[480px] sm:min-h-[490px]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
            >
              
              {/* CARD 1: Teacher Assistant AI */}
              <motion.div
                animate={{
                  scale: activeCore === 'ustadh' ? 1 : 0.93,
                  y: activeCore === 'ustadh' ? 0 : -22,
                  z: activeCore === 'ustadh' ? 0 : -35,
                  opacity: activeCore === 'ustadh' ? 1 : 0.45,
                  rotateX: activeCore === 'ustadh' ? tilt.rotateX : 2,
                  rotateY: activeCore === 'ustadh' ? tilt.rotateY : 0
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={() => activeCore !== 'ustadh' && handleSelectCore('ustadh')}
                className={`absolute top-0 left-0 w-full rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden ${
                  activeCore === 'ustadh' ? 'z-20 cursor-default' : 'z-10 cursor-pointer'
                }`}
              >
                {/* macOS Window Header */}
                <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono text-slate-500 font-bold ml-1.5 hidden sm:inline">
                      TEACHER ASSISTANT AI • QUESTION ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>বোর্ড কারিকুলাম ২০২৬</span>
                  </span>
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  
                  {/* Teacher Input Prompt Box */}
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">👨‍🏫</span>
                        শিক্ষকের লাইভ ভয়েস / ইনপুট:
                      </span>
                      <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        {currentTopic.badge}
                      </span>
                    </div>
                    <p className="text-slate-900 font-semibold italic pl-1 border-l-2 border-emerald-500 text-xs sm:text-[13px]">
                      {currentTopic.prompt}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-mono pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>AI এনসিটিবি ও মাদরাসা বোর্ড প্রশ্ন ব্যাংক স্ক্যান করে ২০ নম্বরের প্রশ্ন বানাচ্ছে...</span>
                    </div>
                  </div>

                  {/* Subject Selector Chips */}
                  <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
                    {(['hifz', 'physics', 'math', 'bangla'] as SubjectTopic[]).map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopic(topic);
                        }}
                        className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                          selectedTopic === topic
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                        }`}
                      >
                        {topic === 'hifz' && '📖 হিফজ ও তাজবীদ'}
                        {topic === 'physics' && '⚛️ পদার্থবিজ্ঞান'}
                        {topic === 'math' && '📐 সাধারণ গণিত'}
                        {topic === 'bangla' && '🇧🇩 বাংলা ১ম'}
                      </button>
                    ))}
                  </div>

                  {/* Generated Official 20-Mark Exam Paper Card */}
                  <div className="p-3.5 bg-gradient-to-b from-white to-slate-50/50 border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs">
                    <div className="text-center pb-2 border-b border-slate-100 relative">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                        YES EDU TEACHER ASSISTANT AI • BOARD EXAM
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mt-0.5">
                        {currentTopic.title}
                      </h4>
                      <div className="flex justify-center items-center gap-2.5 text-[11px] text-slate-500 font-mono mt-0.5">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200/60">
                          পূর্ণমান: {currentTopic.totalMarks}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">সময়: {currentTopic.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] text-slate-700">
                      <div className="p-2 bg-white rounded-lg border border-slate-200/70 shadow-2xs">
                        <div className="flex justify-between font-bold text-emerald-800 mb-0.5">
                          <span>{currentTopic.q1Title}</span>
                          <span className="font-mono font-bold bg-emerald-50 px-1.5 py-0.2 rounded text-emerald-700">
                            [{currentTopic.q1Marks} নম্বর]
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{currentTopic.q1Desc}</p>
                      </div>

                      <div className="p-2 bg-white rounded-lg border border-slate-200/70 shadow-2xs">
                        <div className="flex justify-between font-bold text-teal-800 mb-0.5">
                          <span>{currentTopic.q2Title}</span>
                          <span className="font-mono font-bold bg-teal-50 px-1.5 py-0.2 rounded text-teal-700">
                            [{currentTopic.q2Marks} নম্বর]
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{currentTopic.q2Desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-0.5 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>১০০% বোর্ড সিলেবাস সার্টিফাইড</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1.5 transition"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition shadow-xs"
                      >
                        <Printer className="w-3 h-3" />
                        <span>{isPrinted ? 'প্রস্তুত হচ্ছে...' : 'প্রিন্ট ও সেভ'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* CARD 2: Finance & ERP Chatbot */}
              <motion.div
                animate={{
                  scale: activeCore === 'erpBot' ? 1 : 0.93,
                  y: activeCore === 'erpBot' ? 0 : -22,
                  z: activeCore === 'erpBot' ? 0 : -35,
                  opacity: activeCore === 'erpBot' ? 1 : 0.45,
                  rotateX: activeCore === 'erpBot' ? tilt.rotateX : 2,
                  rotateY: activeCore === 'erpBot' ? tilt.rotateY : 0
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={() => activeCore !== 'erpBot' && handleSelectCore('erpBot')}
                className={`absolute top-0 left-0 w-full rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden ${
                  activeCore === 'erpBot' ? 'z-20 cursor-default' : 'z-10 cursor-pointer'
                }`}
              >
                {/* macOS Window Header */}
                <div className="bg-slate-50/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono text-slate-500 font-bold ml-1.5 hidden sm:inline">
                      FINANCE & ERP CHATBOT • COPILOT
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                    <span>লাইভ ফাইন্যান্স ডাটাবেজ</span>
                  </span>
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  
                  {/* User / Teacher Finance Query Box */}
                  <div className="p-3 bg-cyan-50/50 border border-cyan-200/80 rounded-xl text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-cyan-800 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">👤</span>
                        ইউজার / শিক্ষকের ফাইন্যান্স হেল্প রিকোয়েস্ট:
                      </span>
                      <span className="font-mono text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold">
                        ০.৪ সেকেন্ড রেসপন্স
                      </span>
                    </div>
                    <p className="text-slate-900 font-semibold italic pl-1 border-l-2 border-cyan-500 text-xs sm:text-[13px]">
                      "মুহতারাম, এই মাসের বকেয়া ফি এবং শিক্ষক বেতনের সার্বিক হিসাব দিন"
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-cyan-700 font-mono pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                      <span>চ্যাটবট সরাসরি ক্লাউড ডাটাবেজ থেকে লাইভ হিসাব তৈরি করেছে...</span>
                    </div>
                  </div>

                  {/* Operational Telemetry Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    
                    {/* Metric 1: Fee Collection */}
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200/90 rounded-xl space-y-1.5 shadow-2xs">
                      <span className="text-[11px] font-bold text-emerald-800 block">
                        চলতি মাসের মোট ফি আদায়
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-slate-900 font-mono">৳৩,৪৫,২০০</span>
                      </div>
                      <div className="w-full bg-emerald-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-emerald-800 font-bold pt-0.5">
                        <span>✓ ৮২% সম্পন্ন</span>
                        <span className="text-slate-500 font-normal">বকেয়া ১৮%</span>
                      </div>
                    </div>

                    {/* Metric 2: Biometric Attendance & Payroll */}
                    <div className="p-3 bg-cyan-50/60 border border-cyan-200/90 rounded-xl space-y-1.5 shadow-2xs">
                      <span className="text-[11px] font-bold text-cyan-800 block">
                        শিক্ষক বেতন ও উপস্থিতি
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-slate-900 font-mono">৯৮.৪%</span>
                      </div>
                      <div className="w-full bg-cyan-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-cyan-600 h-full rounded-full" style={{ width: '98.4%' }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-cyan-800 font-bold pt-0.5">
                        <span>২৮/৩০ জন শিক্ষক</span>
                        <span className="text-slate-500 font-normal">বেতন প্রস্তুত</span>
                      </div>
                    </div>

                  </div>

                  {/* Shariah Fund Breakdown Strip */}
                  <div className="p-3 bg-slate-50/80 border border-slate-200/90 rounded-xl space-y-2 text-xs shadow-2xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 text-[11px]">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        শরিয়াহ ফান্ড পৃথক লেজার
                      </span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        ১০০% অডিট কমপ্লায়েন্ট
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex justify-between text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                        <span>লিল্লাহ বোর্ডিং:</span>
                        <span className="font-mono font-bold text-slate-900">৳১,৮০,০০০</span>
                      </div>
                      <div className="flex justify-between text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                        <span>ওয়াকফ এস্টেট:</span>
                        <span className="font-mono font-bold text-slate-900">৳২,১০,০০০</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-0.5 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-cyan-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-600" />
                      <span>০.৪ সেকেন্ডে অটো-রিকনসিলিয়েশন</span>
                    </span>

                    <a
                      href="#features"
                      className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition shadow-xs"
                    >
                      <span>ফি ও বেতন লেজারে বিস্তারিত</span>
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </a>
                  </div>

                </div>
              </motion.div>

            </div>

            {/* Interactive Control Caption */}
            <p className="text-[11px] text-slate-400 mt-2.5 font-medium flex items-center gap-1.5">
              <span>💡 মাউস দিয়ে ৩D ক্যাম্পাস ও কার্ড ঘুরিয়ে দেখুন • প্রতি ৫.৫ সেকেন্ডে অটো-সুইচ</span>
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};
