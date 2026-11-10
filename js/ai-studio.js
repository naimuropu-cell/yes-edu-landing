/**
 * YES EDU - Flagship SaaS Showcase & NCTB 2026 Core Engine
 * Controls 4 Interactive ERP Modules:
 * 1. NCTB Teacher Assistant AI V2
 * 2. Biometric Gate Sync & Instant Parent SMS
 * 3. bKash Automated Tuition Collection & Double-Entry Ledger
 * 4. Madrasa Shariah Waqf & Lillah Boarding Fund
 */

(function () {
  'use strict';

  // 1. NCTB & Madrasa Curriculum Knowledge Base
  const nctbKnowledgeBase = {
    physics: {
      id: 'physics',
      titleEn: 'Physics (Class 9-10)',
      titleBn: 'পদার্থবিজ্ঞান (৯ম-১০ম শ্রেণি)',
      chapterEn: 'Chapter 4: Work, Power & Energy',
      chapterBn: 'অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি (পৃষ্ঠা ৯৮-১১৪)',
      curriculumCode: 'NCTB-2026-PHY-C04',
      stemEn: 'A teenager of mass 40 kg carrying a 20 kg sack climbs to the roof of a 20-meter high school building in 3 minutes. Another student carrying the same sack reaches the same roof using an electric lift in 30 seconds. (Take g = 9.8 m/s²).',
      stemBn: '৪০ কেজি ভরের একজন শিক্ষার্থী ২০ কেজি ভরের একটি বিজ্ঞান প্রজেক্টের বক্স নিয়ে ২০ মিটার উঁচু একাডেমিক ভবনের ছাদে ৩ মিনিটে উঠল। অপর একজন শিক্ষার্থী একই ভরের বক্সসহ ক্যাম্পাসের আধুনিক লিফটে চড়ে ৩০ সেকেন্ডে একই ছাদে পৌঁছাল। (g = ৯.৮ m/s²)',
      questionsEn: [
        { label: 'A', marks: 1, type: 'Knowledge (জ্ঞান)', text: 'What is 1 Kilowatt-hour (kWh)?' },
        { label: 'B', marks: 2, type: 'Comprehension (অনুধাবন)', text: 'Why is work done against gravitational force considered negative? Explain.' },
        { label: 'C', marks: 3, type: 'Application (প্রয়োগ)', text: 'Calculate the total work done and the mechanical power expended by the first student.' },
        { label: 'D', marks: 4, type: 'Higher Ability (উচ্চতর দক্ষতা)', text: 'Although both students performed identical total work, their power output differed significantly—verify this mathematically.' }
      ],
      questionsBn: [
        { label: 'ক', marks: 1, type: 'জ্ঞানমূলক', text: 'কিলোওয়াট-ঘণ্টা (kWh) কাকে বলে?' },
        { label: 'খ', marks: 2, type: 'অনুধাবনমূলক', text: 'অভিকর্ষ বলের বিরুদ্ধে কৃতকাজ কেন ঋণাত্মক হয়? ব্যাখ্যা করো।' },
        { label: 'গ', marks: 3, type: 'প্রয়োগমূলক', text: 'প্রথম শিক্ষার্থীর ক্ষেত্রে সম্পন্ন কাজের পরিমাণ ও ব্যয়িত ক্ষমতা নির্ণয় করো।' },
        { label: 'ঘ', marks: 4, type: 'উচ্চতর দক্ষতামূলক', text: '"উভয় শিক্ষার্থীর কৃতকাজের মান অভিন্ন হলেও তাদের ক্ষমতার উল্লেখযোগ্য তারতম্য রয়েছে"—উদ্দীপকের আলোকে গাণিতিকভাবে বিশ্লেষণ করো।' }
      ],
      guideEn: {
        scoringRubric: [
          'Part A (1 Mark): 1 mark for accurate definition: 1 kWh is energy consumed by a 1 kW device running for 1 hour (= 3.6 × 10⁶ Joules).',
          'Part B (2 Marks): 1 mark for stating angle between force and displacement is 180° (cos 180° = -1); 1 mark for real-world upward displacement explanation.',
          'Part C (3 Marks): Total mass m = 40 + 20 = 60 kg. Work W = mgh = 60 × 9.8 × 20 = 11,760 J (1.5 marks). Power P = W/t = 11,760 / 180 = 65.33 Watts (1.5 marks).',
          'Part D (4 Marks): Student 2 power P₂ = 11,760 / 30 = 392 Watts (1.5 marks). Comparing P₂ / P₁ = 392 / 65.33 = 6 times greater (1.5 marks). Final comparative justification (1 mark).'
        ],
        pedagogicalNoteEn: 'Teacher Alert: Students frequently forget to add the sack mass (20 kg) to body mass (40 kg). Instruct them to explicitly identify system mass first.'
      },
      guideBn: {
        scoringRubric: [
          'ক এর মূল্যায়ন (১ নম্বর): ১ কিলোওয়াট ক্ষমতাসম্পন্ন কোনো যন্ত্র ১ ঘণ্টা চললে যে পরিমাণ শক্তি ব্যয় হয়, তাকে ১ কিলোওয়াট-ঘণ্টা বলে (১ kWh = ৩.৬ × ১০⁶ জুল)। নির্ভুল সংজ্ঞায় পূর্ণ ১ নম্বর।',
          'খ এর মূল্যায়ন (২ নম্বর): বল প্রয়োগের বিপরীতে সরণ ঘটলে অর্থাৎ বল ও সরণের মধ্যবর্তী কোণ ১৮০° হলে কৃতকাজ ঋণাত্মক (W = -Fs)। অভিকর্ষ বল নিচে কাজ করলেও বস্তুর সরণ ওপরে হওয়ায় অভিকর্ষ দ্বারা কৃতকাজ ঋণাত্মক। সূত্রের জন্য ১, ব্যাখ্যার জন্য ১।',
          'গ এর সমাধান (৩ নম্বর): মোট ভর m = ৪০ + ২০ = ৬০ kg, উচ্চতা h = ২০ m, সময় t = ৩ × ৬০ = ১৮০ s।\nকৃতকাজ W = mgh = ৬০ × ৯.৮ × ২০ = ১১,৭৬০ জুল (১.৫ নম্বর)।\nব্যয়িত ক্ষমতা P = W/t = ১১,৭৬০ / ১৮০ = ৬৫.৩৩ ওয়াট (১.৫ নম্বর)।',
          'ঘ এর বিশ্লেষণ (৪ নম্বর): দ্বিতীয় শিক্ষার্থীর সময় t₂ = ৩০ s। উভয়ের ক্ষেত্রে মোট উচ্চতা ও ভর সমান হওয়ায় কৃতকাজ অভিন্ন (১১,৭৬০ জুল)। কিন্তু দ্বিতীয় শিক্ষার্থীর ক্ষমতা P₂ = ১১,৭৬০ / ৩০ = ৩৯২ ওয়াট (১.৫ নম্বর)। P₂/P₁ = ৩৯২ / ৬৫.৩৩ = ৬ গুণ। সুতরাং লিফটের যান্ত্রিক সুবিধার কারণে কাজের গতি ও ক্ষমতা ৬ গুণ বৃদ্ধি পেয়েছে (২.৫ নম্বর)।'
        ],
        pedagogicalNoteBn: 'শিক্ষকের জন্য ক্লাসরুম সতর্কতা: বহু শিক্ষার্থী মোট ভরের ক্ষেত্রে কেবল শিক্ষার্থীর ভর (৪০ কেজি) ধরে ভুল করে। ক্লাসে সিস্টেমের মোট ভর (৪০+২০=৬০ কেজি) গণনার বিষয়ে গুরুত্বারোপ করুন।'
      }
    },

    math: {
      id: 'math',
      titleEn: 'Mathematics (Class 8)',
      titleBn: 'গণিত (৮ম শ্রেণি)',
      chapterEn: 'Chapter 9: Pythagorean Theorem & Geometry',
      chapterBn: 'অধ্যায় ৯: পিথাগোরাসের উপপাদ্য ও পরিমাপ',
      curriculumCode: 'NCTB-2026-MTH-C09',
      stemEn: 'A rectangular campus playground has a length of 24 meters and a width of 7 meters. A student walks diagonally from one corner to the opposite corner. In another triangle, the ratio of three sides is 3 : 4 : 5.',
      stemBn: 'একটি মডেল স্কুল ক্যাম্পাসের আয়তাকার খেলার মাঠের দৈর্ঘ্য ২৪ মিটার এবং প্রস্থ ৭ মিটার। একজন ছাত্র মাঠটির এক কোণ থেকে আড়াআড়ি (কর্ণ বরাবর) হেঁটে অপর বিপরীত কোণে পৌঁছাল। অপর একটি ত্রিভুজের বাহু তিনটির অনুপাত ৩ : ৪ : ৫।',
      questionsEn: [
        { label: 'A', marks: 1, type: 'Knowledge', text: 'State the Pythagorean Theorem accurately.' },
        { label: 'B', marks: 2, type: 'Comprehension', text: 'Verify whether the second triangle is a right-angled triangle using the converse theorem.' },
        { label: 'C', marks: 3, type: 'Application', text: 'How many meters did the student save by walking along the diagonal instead of walking along the boundary perimeter?' },
        { label: 'D', marks: 4, type: 'Higher Ability', text: 'If the playground length is increased by 25% and width decreased by 20%, determine the percentage change in the new diagonal length.' }
      ],
      questionsBn: [
        { label: 'ক', marks: 1, type: 'জ্ঞানমূলক', text: 'পিথাগোরাসের উপপাদ্যটি বিবৃতি করো।' },
        { label: 'খ', marks: 2, type: 'অনুধাবনমূলক', text: 'উপপাদ্যের বিপরীত নীতির সাহায্যে দ্বিতীয় ত্রিভুজটি সমকোণী কি না যাচাই করো।' },
        { label: 'গ', marks: 3, type: 'প্রয়োগমূলক', text: 'মাঠের সীমানা বরাবর হাঁটার চেয়ে কর্ণ বরাবর হেঁটে ছাত্রটির কত মিটার দূরত্ব সাশ্রয় হলো?' },
        { label: 'ঘ', marks: 4, type: 'উচ্চতর দক্ষতামূলক', text: 'মাঠের দৈর্ঘ্য ২৫% বৃদ্ধি এবং প্রস্থ ২০% হ্রাস করা হলে নতুন কর্ণের দৈর্ঘ্যের শতকরা পরিবর্তন গাণিতিকভাবে নিরূপণ করো।' }
      ],
      guideEn: {
        scoringRubric: [
          'Part A (1 Mark): In a right-angled triangle, the area of the square on the hypotenuse is equal to the sum of the areas of the squares on the other two sides (c² = a² + b²).',
          'Part B (2 Marks): Check if 3² + 4² = 9 + 16 = 25 = 5². Since sum of squares of smaller sides equals square of longest side, it is right-angled (Converse theorem).',
          'Part C (3 Marks): Diagonal d = √(24² + 7²) = √(576 + 49) = √625 = 25 meters (1.5 marks). Boundary path = 24 + 7 = 31 meters. Saved distance = 31 - 25 = 6 meters (1.5 marks).',
          'Part D (4 Marks): New length = 24 × 1.25 = 30m; New width = 7 × 0.80 = 5.6m. New diagonal = √(30² + 5.6²) = √(900 + 31.36) = √931.36 ≈ 30.52m. Increase = 30.52 - 25 = 5.52m; % change = (5.52 / 25) × 100 = 22.08% increase.'
        ],
        pedagogicalNoteEn: 'Teacher Alert: Ensure students do not round off intermediate square roots prematurely.'
      },
      guideBn: {
        scoringRubric: [
          'ক এর উত্তর (১ নম্বর): একটি সমকোণী ত্রিভুজের অতিভুজের ওপর অঙ্কিত বর্গক্ষেত্রের ক্ষেত্রফল অপর দুই বাহুর ওপর অঙ্কিত বর্গক্ষেত্রদ্বয়ের ক্ষেত্রফলের সমষ্টির সমান (c² = a² + b²)।',
          'খ এর যাচাই (২ নম্বর): ক্ষুদ্রতর বাহুদ্বয়ের বর্গের সমষ্টি = ৩² + ৪² = ৯ + ১৬ = ২৫। বৃহত্তম বাহুর বর্গ = ৫² = ২৫। যেহেতু ৩² + ৪² = ৫², তাই পিথাগোরাসের বিপরীত উপপাদ্যানুযায়ী ত্রিভুজটি সমকোণী (২ নম্বর)।',
          'গ এর সমাধান (৩ নম্বর): কর্ণ d = √(২৪² + ৭²) = √(৫৭৬ + ৪৯) = √৬২৫ = ২৫ মিটার (১.৫ নম্বর)। সীমানা বরাবর দূরত্ব = ২৪ + ৭ = ৩১ মিটার। সাশ্রয়কৃত দূরত্ব = ৩১ - ২৫ = ৬ মিটার (১.৫ নম্বর)।',
          'ঘ এর সমাধান (৪ নম্বর): নতুন দৈর্ঘ্য = ২৪ × ১.২৫ = ৩০ মিটার; নতুন প্রস্থ = ৭ × ০.৮০ = ৫.৬ মিটার। নতুন কর্ণ = √(৩০² + ৫.৬²) = √(৯০০ + ৩১.৩৬) = √৯৩১.৩৬ ≈ ৩০.৫২ মিটার। কর্ণের বৃদ্ধি = ৩০.৫২ - ২৫ = ৫.৫২ মিটার। শতকরা বৃদ্ধি = (৫.৫২ / ২৫) × ১০০ = ২২.০৮%।'
        ],
        pedagogicalNoteBn: 'শিক্ষকের মূল্যায়ন সহায়িকা: শিক্ষার্থীদের রাউন্ড-অফ দশমিক গণনায় পূর্ণ সতর্কতা অবলম্বনের পরামর্শ দিন।'
      }
    },

    madrasa: {
      id: 'madrasa',
      titleEn: 'Al-Quran & Tajweed (Dakhil 9-10)',
      titleBn: 'আল-কুরআন ও তাজবীদ (দাখিল ৯ম-১০ম)',
      chapterEn: 'Surah Al-Hujurat (Verses 10-12)',
      chapterBn: 'সূরা আল-হুজুরাত (আয়াত ১০-১২: সামাজিক ভ্রাতৃত্ব ও নৈতিকতা)',
      curriculumCode: 'BMEB-DAKHIL-QRN-C03',
      stemEn: 'In a madrasa dormitory, two students get into a dispute over academic rankings. One student starts mocking the other behind his back using derogatory nicknames. The class Ustadh convenes a meeting following Quranic ethics.',
      stemBn: 'একটি আবাসিক মাদ্রাসা ক্যাম্পাসে দুই সহপাঠী শিক্ষার্থীর মধ্যে বার্ষিক পরীক্ষার মেধা তালিকা নিয়ে মনোমালিন্য সৃষ্টি হয়। একপর্যায়ে একজন অন্যজনের অনুপস্থিতিতে তাকে ব্যঙ্গাত্মক নামে ডাকতে শুরু করে। শ্রেণি উস্তাদ বিষয়টি অনুধাবন করে কুরআন ও সুন্নাহর নির্দেশনায় তাদের বিরোধ নিষ্পত্তির উদ্যোগ নেন।',
      questionsEn: [
        { label: 'A', marks: 1, type: 'Knowledge', text: 'What is the linguistic and Shariah meaning of "Gheebat" (backbiting)?' },
        { label: 'B', marks: 2, type: 'Comprehension', text: 'Why has reconciliation between believers been declared obligatory in Surah Al-Hujurat? Explain.' },
        { label: 'C', marks: 3, type: 'Application', text: 'Which explicit prohibition of Surah Al-Hujurat was violated by the student? Explain in light of Verse 11-12.' },
        { label: 'D', marks: 4, type: 'Higher Ability', text: '"The Ustadh\'s role embodies the true prophetic methodology of institutional peace and Islamic brotherhood"—Analyze.' }
      ],
      questionsBn: [
        { label: 'ক', marks: 1, type: 'জ্ঞানমূলক', text: 'গীবত (الغيبة) শব্দের আভিধানিক ও পারিভাষিক অর্থ কী?' },
        { label: 'খ', marks: 2, type: 'অনুধাবনমূলক', text: '"নিশ্চয়ই মুমিনগণ পরস্পর ভাই ভাই"—সূরা হুজুরাতের এই বাণীর আলোকে বিরোধ মীমাংসার তাগিদ ব্যাখ্যা করো।' },
        { label: 'গ', marks: 3, type: 'প্রয়োগমূলক', text: 'উদ্দীপকের শিক্ষার্থীর আচরণে সূরা আল-হুজুরাতের কোন সুনির্দিষ্ট নিষেধাজ্ঞার লঙ্ঘন ঘটেছে? আলোচনা করো।' },
        { label: 'ঘ', marks: 4, type: 'উচ্চতর দক্ষতামূলক', text: '"শ্রেণি উস্তাদের মধ্যস্থতা ক্যাম্পাসে সম্প্রীতি রক্ষায় নববী আদর্শের সঠিক প্রতিফলন"—উক্তিটির তাৎপর্য বিশ্লেষণ করো।' }
      ],
      guideEn: {
        scoringRubric: [
          'Part A (1 Mark): Backbiting is speaking about an absent brother in a manner he dislikes, as defined in Sahih Muslim.',
          'Part B (2 Marks): Explaining "Innamal muminuna ikhwatun" - reconciliation protects community cohesion and invites divine mercy (Verse 10).',
          'Part C (3 Marks): Verse 11 prohibits mockery and offensive nicknames; Verse 12 prohibits suspicion and backbiting (equated to eating dead brother\'s flesh).',
          'Part D (4 Marks): Synthesizing Quranic command of "fa aslihu bayna akhawaykum" with teacher\'s ethical leadership.'
        ],
        pedagogicalNoteEn: 'Madrasa Teacher Guide: Emphasize both cognitive understanding and practical campus character refinement.'
      },
      guideBn: {
        scoringRubric: [
          'ক এর উত্তর (১ নম্বর): গীবতের আভিধানিক অর্থ পরনিন্দা বা অসাক্ষাতে দোষ চর্চা। পরিভাষায়: কারো অনুপস্থিতিতে তার এমন কোনো সত্য দোষ উল্লেখ করা যা শুনলে সে অসন্তুষ্ট হয় (সহিহ মুসলিম)।',
          'খ এর ব্যাখ্যা (২ নম্বর): সূরা হুজুরাতের ১০ নম্বর আয়াতে মুমিনদের আপস-মীমাংসা করে দেওয়াকে ঈমানি দায়িত্ব ঘোষণা করা হয়েছে যাতে উম্মাহর ঐক্য রক্ষা পায় এবং আল্লাহর রহমত লাভ হয়।',
          'গ এর প্রয়োগ (৩ নম্বর): সূরা হুজুরাতের ১১ ও ১২ নম্বর আয়াতে অপরকে উপহাস করা, ব্যঙ্গাত্মক মন্দ নামে ডাকা (ولا تنابزوا بالألقاب) এবং গীবত করাকে সুস্পষ্টভাবে হারাম করা হয়েছে। শিক্ষার্থী মন্দ নামে ডেকে কুরআনের এই বিধান লঙ্ঘন করেছে।',
          'ঘ এর উচ্চতর বিশ্লেষণ (৪ নম্বর): কুরআনের "ফা আসলিহু বাইনা আখাওয়াইকুম" (তোমাদের দুই ভাইয়ের মধ্যে আপস মীমাংসা করে দাও) নির্দেশ বাস্তবায়নে শিক্ষকের উদ্যোগ ক্যাম্পাসকে ফিতনামুক্ত রাখতে প্রত্যক্ষ ভূমিকা রাখে।'
        ],
        pedagogicalNoteBn: 'মুহতামিম ও উস্তাদদের জন্য পরামর্শ: পরীক্ষার পাশাপাশি শিক্ষার্থীদের ব্যবহারিক আখলাক গঠনে এই শিক্ষা ক্যাম্পাসে বাস্তবায়নের নির্দেশনা দিন।'
      }
    },

    bangla: {
      id: 'bangla',
      titleEn: 'Bangla 1st Paper (Class 9-10)',
      titleBn: 'বাংলা ১ম পত্র (৯ম-১০ম শ্রেণি)',
      chapterEn: 'Poem: Kapotakkha Nod (Michael Madhusudan Dutt)',
      chapterBn: 'কবিতা: কপোতাক্ষ নদ — মাইকেল মধুসূদন দত্ত',
      curriculumCode: 'NCTB-2026-BAN-P01',
      stemEn: 'Living in London for higher education, a Bangladeshi researcher walks by the Thames every evening, yearning for the gentle breeze of the Ichamati river of his childhood village.',
      stemBn: 'উচ্চশিক্ষার জন্য লন্ডনে অবস্থানরত তরুণ গবেষক আবিদ প্রতিদিন বিকেলে টেমসের তীরে এসে দাঁড়িয়ে দূরগ্রামের কোল ঘেঁষে বয়ে যাওয়া ইছামতী নদীর কথা স্মরণ করে। বিদেশি আধুনিকতার জৌলুসও তার মনের দেশপ্রেম ও শৈশবের মাটির সুবাস মুছে দিতে পারেনি।',
      questionsEn: [
        { label: 'A', marks: 1, type: 'Knowledge', text: 'In which metric form (sonnet) is the poem "Kapotakkha Nod" composed?' },
        { label: 'B', marks: 2, type: 'Comprehension', text: 'Explain the line: "Dugdha-srotorupi tumi jonmobhumi-stane".' },
        { label: 'C', marks: 3, type: 'Application', text: 'What sentiment of the poet Michael Madhusudan Dutt is mirrored in Abid\'s nostalgia? Explain.' },
        { label: 'D', marks: 4, type: 'Higher Ability', text: '"Deep rooted patriotism transcends geographical boundaries"—Justify with reference to both context and poem.' }
      ],
      questionsBn: [
        { label: 'ক', marks: 1, type: 'জ্ঞানমূলক', text: '\'কপোতাক্ষ নদ\' কোন ছন্দে রচিত এবং এটি কোন শ্রেণীর কবিতা?' },
        { label: 'খ', marks: 2, type: 'অনুধাবনমূলক', text: '"দুগ্ধ-স্রোতোরূপী তুমি জন্মভূমি-স্তনে"—চরণটি দ্বারা কবি কী বুঝিয়েছেন?' },
        { label: 'গ', marks: 3, type: 'প্রয়োগমূলক', text: 'উদ্দীপকের আবিদের অনুভূতির সাথে মাইকেল মধুসূদন দত্তের \'কপোতাক্ষ নদ\' কবিতার কোন দিকের সাদৃশ্য রয়েছে? ব্যাখ্যা করো।' },
        { label: 'ঘ', marks: 4, type: 'উচ্চতর দক্ষতামূলক', text: '"স্বদেশের প্রতি গভীর মমত্ববোধই উভয় চেতনার মূল উৎস"—উদ্দীপক ও কবিতার তুলনামূলক বিচার করো।' }
      ],
      guideEn: {
        scoringRubric: [
          'Part A (1 Mark): Italian-style Petrarcan Sonnet (চতুর্দশপদী কবিতা) in 14-mora Akkharbritta meter.',
          'Part B (2 Marks): Metaphor of mother\'s milk representing the nourishing flow of river Kapotakkha to the motherland.',
          'Part C (3 Marks): Identifying shared theme of expatriate nostalgia and intense longing for rural roots.',
          'Part D (4 Marks): Synthesis of distance vs emotional bond, evaluating how distance strengthens patriotic reverence.'
        ],
        pedagogicalNoteEn: 'Teacher Guide: Guide students to analyze the rhyme scheme abbaabba cdecde.'
      },
      guideBn: {
        scoringRubric: [
          'ক এর উত্তর (১ নম্বর): \'কপোতাক্ষ নদ\' অমিত্রাক্ষর/অক্ষরবৃত্ত ছন্দে রচিত চতুর্দশপদী (সনেট) কবিতা।',
          'খ এর ব্যাখ্যা (২ নম্বর): কবি জন্মভূমিকে মায়ের সাথে এবং কপোতাক্ষ নদের জলধারাকে মায়ের দুগ্ধের সাথে তুলনা করেছেন। মা যেমন শিশুকে দুধ দিয়ে বাঁচিয়ে রাখে, নদীও তেমনি জন্মভূমিকে চিরস্নিগ্ধ রেখেছে।',
          'গ এর সাদৃশ্য (৩ নম্বর): প্রবাসে অবস্থানকালে মাতৃভূমির শৈশবের নদীর প্রতি স্মৃতিকাতরতা ও তীব্র দেশপ্রেমের মধ্যে গভীর ঐক্য বিদ্যমান (৩ নম্বর)।',
          'ঘ এর মূল্যায়ন (৪ নম্বর): দূরত্ব ভালোবাসা কমাতে পারে না বরং অন্তরের দেশপ্রেমকে শতগুণ বাড়িয়ে দেয়—উভয় ক্ষেত্রেই এই সত্য মূর্ত হয়ে উঠেছে (৪ নম্বর)।'
        ],
        pedagogicalNoteBn: 'শিক্ষকের মূল্যায়ন নির্দেশিকা: সনেটের অষ্টক (ভাবের প্রবর্তনা) ও ষষ্ঠকের (ভাবের পরিণতি) গঠন বিষয়ে ছাত্রদের সচেতন করুন।'
      }
    }
  };

  // State Management
  let currentTopicId = 'physics';
  let currentAiMode = 'question'; // 'question' | 'guide'
  let activeShowcaseTab = 'teacher-ai';

  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initScrollReveal();
    initFlagshipShowcase();
  });

  /* ==========================================================================
     Top Scroll Progress Bar
     ========================================================================== */
  function initScrollProgress() {
    let progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scrollProgressBar';
      document.body.prepend(progressBar);
    }

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ==========================================================================
     Scroll-Driven IntersectionObserver Reveal
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.10,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  /* ==========================================================================
     Flagship Showcase Controller (4 Tabs)
     ========================================================================== */
  function initFlagshipShowcase() {
    const showcaseTabs = document.querySelectorAll('.hero-showcase-tab-btn');
    const tabPanels = {
      'teacher-ai': document.getElementById('showcasePanelTeacherAi'),
      'biometric-sms': document.getElementById('showcasePanelBiometricSms'),
      'bkash-fees': document.getElementById('showcasePanelBkashFees'),
      'madrasa-waqf': document.getElementById('showcasePanelMadrasaWaqf')
    };

    showcaseTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-showcase-tab');
        if (!target || target === activeShowcaseTab) return;

        showcaseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeShowcaseTab = target;

        Object.keys(tabPanels).forEach(key => {
          if (tabPanels[key]) {
            if (key === target) {
              tabPanels[key].classList.remove('hidden');
              tabPanels[key].classList.add('animate-fadeIn');
            } else {
              tabPanels[key].classList.add('hidden');
              tabPanels[key].classList.remove('animate-fadeIn');
            }
          }
        });
      });
    });

    // 1. Teacher AI Setup
    initTeacherAiModule();

    // 2. Biometric SMS Simulator
    initBiometricSimulator();

    // 3. bKash Live Ledger Simulator
    initBkashSimulator();
  }

  /* ==========================================================================
     Module 1: Teacher AI Assistant
     ========================================================================== */
  function initTeacherAiModule() {
    const topicChips = document.querySelectorAll('.ai-chip');
    topicChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-topic');
        if (!topic) return;
        topicChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentTopicId = topic;
        renderAiQuestion(topic);
      });
    });

    const qBtn = document.getElementById('aiModeQuestionBtn');
    const gBtn = document.getElementById('aiModeGuideBtn');
    if (qBtn && gBtn) {
      qBtn.addEventListener('click', () => {
        currentAiMode = 'question';
        qBtn.classList.add('active');
        gBtn.classList.remove('active');
        renderAiQuestion(currentTopicId);
      });
      gBtn.addEventListener('click', () => {
        currentAiMode = 'guide';
        gBtn.classList.add('active');
        qBtn.classList.remove('active');
        renderAiQuestion(currentTopicId);
      });
    }

    const copyBtn = document.getElementById('aiCopyQuestionBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', copyQuestionToClipboard);
    }

    renderAiQuestion('physics');
  }

  function renderAiQuestion(topicId) {
    const data = nctbKnowledgeBase[topicId] || nctbKnowledgeBase.physics;
    const isBn = localStorage.getItem('yes_edu_lang') === 'bn';
    const outputContainer = document.getElementById('aiOutputStage');
    if (!outputContainer) return;

    if (currentAiMode === 'question') {
      const stem = isBn ? data.stemBn : data.stemEn;
      const questions = isBn ? data.questionsBn : data.questionsEn;

      outputContainer.innerHTML = `
        <div class="space-y-3 text-left animate-fadeIn">
          <div class="flex items-center justify-between border-b border-slate-100 pb-2">
            <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              ${isBn ? data.titleBn : data.titleEn} — <span class="text-slate-500 font-normal">${isBn ? data.chapterBn : data.chapterEn}</span>
            </span>
            <span class="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              ${data.curriculumCode}
            </span>
          </div>

          <div class="ai-stem-box">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              ${isBn ? 'উদ্দীপক / Scenario Context:' : 'Stimulus Scenario:'}
            </span>
            <p class="text-xs text-slate-800 leading-relaxed font-bangla">
              ${stem}
            </p>
          </div>

          <div class="space-y-1.5 pt-1">
            ${questions.map(q => `
              <div class="ai-subquestion-item">
                <span class="ai-mark-badge font-bold text-slate-900">(${q.label}) [${q.marks}]</span>
                <div class="text-xs text-slate-800 leading-snug">
                  <span class="text-[10px] text-emerald-700 font-semibold mr-1.5">(${q.type})</span>
                  <span>${q.text}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const guide = isBn ? data.guideBn : data.guideEn;

      outputContainer.innerHTML = `
        <div class="space-y-3 text-left animate-fadeIn">
          <div class="flex items-center justify-between border-b border-amber-200/80 pb-2">
            <span class="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              ${isBn ? 'শিক্ষক মূল্যায়ন নির্দেশিকা ও আদর্শ সমাধান' : 'Official Teacher Assessment Rubric & Model Answer'}
            </span>
            <span class="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              ${isBn ? '১০ নম্বর বন্টন' : '10 Marks Breakdown'}
            </span>
          </div>

          <div class="teacher-rubric-card space-y-2 text-xs text-amber-950 font-bangla">
            ${guide.scoringRubric.map(item => `
              <div class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                <p class="leading-relaxed whitespace-pre-line">${item}</p>
              </div>
            `).join('')}
          </div>

          <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
            <svg class="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div>
              <strong class="font-bold">${isBn ? 'শ্রেণিকক্ষ পাঠদান নোট:' : 'Classroom Insight:'}</strong>
              <span class="leading-relaxed">${isBn ? guide.pedagogicalNoteBn : guide.pedagogicalNoteEn}</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  function copyQuestionToClipboard() {
    const isBn = localStorage.getItem('yes_edu_lang') === 'bn';
    const data = nctbKnowledgeBase[currentTopicId] || nctbKnowledgeBase.physics;
    const stem = isBn ? data.stemBn : data.stemEn;
    const questions = isBn ? data.questionsBn : data.questionsEn;

    let textToCopy = `YES EDU Teacher Assistant AI V2.4 — NCTB 2026\n`;
    textToCopy += `বিষয়: ${isBn ? data.titleBn : data.titleEn} | ${isBn ? data.chapterBn : data.chapterEn}\n\n`;
    textToCopy += `উদ্দীপক:\n${stem}\n\n`;
    textToCopy += `সৃজনশীল প্রশ্নাবলি:\n`;
    questions.forEach(q => {
      textToCopy += `(${q.label}) ${q.text} [${q.marks}]\n`;
    });

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(isBn ? '✓ প্রশ্নপত্র সফলভাবে ক্লিপবোর্ডে কপি হয়েছে!' : '✓ Creative Question copied to clipboard!');
    }).catch(() => {
      showToast('✓ Copied to clipboard!');
    });
  }

  /* ==========================================================================
     Module 2: Biometric Gate Sync Simulator
     ========================================================================== */
  function initBiometricSimulator() {
    const punchBtn = document.getElementById('simGatePunchBtn');
    if (!punchBtn) return;

    punchBtn.addEventListener('click', () => {
      const isBn = localStorage.getItem('yes_edu_lang') === 'bn';
      const timeElem = document.getElementById('simPunchTime');
      const smsBubble = document.getElementById('simSmsBubble');

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      if (timeElem) timeElem.textContent = timeStr;
      if (smsBubble) {
        smsBubble.classList.add('ring-2', 'ring-emerald-500');
        setTimeout(() => smsBubble.classList.remove('ring-2', 'ring-emerald-500'), 1500);
      }
      showToast(isBn ? '✓ ৩ সেকেন্ডে অভিভাবকের মোবাইলে বাংলা SMS প্রেরিত!' : '✓ Instant Bengali SMS dispatched to Parent in 3s!');
    });
  }

  /* ==========================================================================
     Module 3: bKash Automated Tuition Simulator
     ========================================================================== */
  function initBkashSimulator() {
    const collectBtn = document.getElementById('simBkashCollectBtn');
    if (!collectBtn) return;

    collectBtn.addEventListener('click', () => {
      const isBn = localStorage.getItem('yes_edu_lang') === 'bn';
      const badge = document.getElementById('simBkashStatusBadge');
      if (badge) {
        badge.textContent = isBn ? '✓ সংগৃহীত ও লেজারে সমন্বয়কৃত' : '✓ Reconciled to Ledger';
        badge.className = 'text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded';
      }
      showToast(isBn ? '✓ বিকাশ ফি আদায় সম্পন্ন এবং লেজারে অটো এন্ট্রি হয়েছে!' : '✓ bKash fee collected and auto-reconciled to ledger!');
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('globalAppToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalAppToast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl z-50 transition-all duration-300 pointer-events-none flex items-center gap-2 border border-slate-700';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 15px)';
    }, 2400);
  }

  window.addEventListener('storage', () => {
    renderAiQuestion(currentTopicId);
  });

  window.addEventListener('yesEduLangChanged', () => {
    renderAiQuestion(currentTopicId);
  });

})();
