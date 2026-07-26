export const translations = {
  tr: {
    heroTitle: "Geleceğin Sağlık Teknolojisi, İnsan Odaklı Bakım",
    heroSubtitle: "LuminaCare Tıp Merkezi ile 45+ uluslararası sertifikalı uzman, 24/7 acil servis, AI triyaj ve ışık hızında dijital randevu deneyimi.",
    quickAppointment: "Hızlı Randevu Al",
    symptomChecker: "AI Semptom Kontrolü",
    patientPortal: "E-Sonuç / Tahlil Sorgula",
    telehealth: "Canlı Online Muayene",
    erWaitTime: "Canlı Acil Bekleme Süresi: ",
    erStatus: "Düşük Yoğunluk (~6 dk)",
    callEmergency: "Acil Çağrı: 444 0 911",
    ourDepartments: "Tıbbi Birimler & Poliklinikler",
    ourDoctors: "Uzman Hekim Kadromuz",
    checkupPackages: "Check-Up Paketleri & Sigorta",
    emergencyCare: "24/7 Acil Servis & Ambulans",
    selectDepartment: "Poliklinik Seçin",
    selectDoctor: "Hekim Seçin",
    selectDate: "Tarih ve Saat",
    patientDetails: "Hasta Bilgileri",
    confirmBooking: "Randevuyu Onayla",
    searchDoctor: "Doktor, uzmanlık alanı veya şikayet arayın...",
    allDepartments: "Tüm Poliklinikler",
    bookNow: "Randevu Oluştur",
    viewProfile: "Hekim Profilini İncele",
    onlineConsultation: "Online Görüşme Mevcut",
    yearsExp: "Yıl Deneyim",
    rating: "Hasta Değerlendirmesi",
    symptomQuestion: "Şikayetinizi yazın veya listeden seçin:",
    symptomPlaceholder: "Örn: Baş ağrısı, göz kuruluğu, eklem sızlaması...",
    aiAnalyzing: "Yapay zeka şikayetinizi analiz ediyor...",
    suggestedDep: "Önerilen Poliklinik:",
    urgencyLevel: "Aciliyet Derecesi:",
    resultTitle: "Laboratuvar & Radyoloji Sonuç Portalı",
    enterProtocol: "T.C. Kimlik veya Protokol Numarası Girin",
    loadSampleData: "Örnek Tahlil Verisi Yükle",
    insuranceChecker: "Anlaşmalı Özel Sigorta Sorgulama",
  },
  en: {
    heroTitle: "Next-Gen Medical Excellence, Human-Centric Care",
    heroSubtitle: "Experience world-class healthcare at LuminaCare Medical Center with 45+ board-certified specialists, 24/7 ER, AI Triage, and instant digital booking.",
    quickAppointment: "Book Appointment",
    symptomChecker: "AI Symptom Checker",
    patientPortal: "Lab & Test Results",
    telehealth: "Live Telehealth Consultation",
    erWaitTime: "Live ER Wait Time: ",
    erStatus: "Low Traffic (~6 mins)",
    callEmergency: "Emergency Hotlines: 444 0 911",
    ourDepartments: "Medical Specialties & Clinics",
    ourDoctors: "Our Medical Specialists",
    checkupPackages: "Check-Up Packages & Insurance",
    emergencyCare: "24/7 ER & Ambulance Dispatch",
    selectDepartment: "Select Department",
    selectDoctor: "Select Specialist",
    selectDate: "Date & Time",
    patientDetails: "Patient Information",
    confirmBooking: "Confirm Booking",
    searchDoctor: "Search doctor, specialty, or condition...",
    allDepartments: "All Departments",
    bookNow: "Book Now",
    viewProfile: "View Specialist Profile",
    onlineConsultation: "Telehealth Available",
    yearsExp: "Years Exp.",
    rating: "Patient Rating",
    symptomQuestion: "Type your symptom or pick from common list:",
    symptomPlaceholder: "E.g., Severe headache, eye dryness, knee pain...",
    aiAnalyzing: "AI analyzing your symptom profile...",
    suggestedDep: "Recommended Specialty:",
    urgencyLevel: "Urgency Indicator:",
    resultTitle: "Laboratory & Imaging Results Portal",
    enterProtocol: "Enter National ID or Protocol Code",
    loadSampleData: "Load Sample Test Report",
    insuranceChecker: "Insurance Provider Verification",
  }
};

export const departmentsData = [
  {
    id: "cardiology",
    title: { tr: "Kardiyoloji & Kalp Sağlığı", en: "Cardiology & Heart Health" },
    icon: "HeartPulse",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "Gelişmiş Koroner Anjiyografi, Eko-Kardiyografi, Ritmi Bozukluğu Tedavisi ve Yapay Zeka Destekli EKG Analizi.",
      en: "Advanced Coronary Angiography, Echocardiography, Arrhythmia Therapy and AI-Enhanced ECG Analytics."
    },
    specsCount: 6,
    techBadge: "3D Carto-Mapping & Holter",
    popularSymptom: { tr: "Göğüs ağrısı, Çarpıntı, Nefes Darlığı", en: "Chest tightness, Palpitations, Shortness of breath" }
  },
  {
    id: "neurology",
    title: { tr: "Nöroloji & Beyin Cerrahisi", en: "Neurology & Neurosurgery" },
    icon: "Brain",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "Migren Tedavisi, İnme & Felç Rehabilitasyonu, Uyku Bozuklukları Merkezi ve 3T Yüksek Çözünürlüklü Beyin MR.",
      en: "Migraine Care, Stroke Rehabilitation, Sleep Medicine Center, and 3T High-Resolution Brain MRI."
    },
    specsCount: 5,
    techBadge: "3T Silent MRI & EEG",
    popularSymptom: { tr: "Şiddetli baş ağrısı, Baş dönmesi, Uyuşma", en: "Severe headache, Vertigo, Numbness" }
  },
  {
    id: "pediatrics",
    title: { tr: "Çocuk Sağlığı & Hastalıkları", en: "Pediatrics & Child Health" },
    icon: "Baby",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "Yenidoğan Yoğun Bakım, Çocuk Alerji Merkezi, Büyüme ve Gelişme Takibi, Stres-Serbest Çocuk Polikliniği.",
      en: "Neonatal Intensive Care, Pediatric Allergy, Growth Tracking, and Child-Friendly Clinic Units."
    },
    specsCount: 7,
    techBadge: "Pain-Free Vaccination & NICU",
    popularSymptom: { tr: "Yüksek ateş, İştahsızlık, Öksürük", en: "High fever, Appetite loss, Cough" }
  },
  {
    id: "orthopedics",
    title: { tr: "Ortopedi & Travmatoloji", en: "Orthopedics & Traumatology" },
    icon: "Activity",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "Robotik Protez Cerrahisi, Sporcu Yaralanmaları, Artroskopi ve Eklem Protezi Rehabilitasyonu.",
      en: "Robotic Joint Replacement, Sports Injury Therapy, Arthroscopy, and Spine Rehabilitation."
    },
    specsCount: 4,
    techBadge: "Mako Robotic Surgery",
    popularSymptom: { tr: "Diz ağrısı, Omuz sıkışması, Kırık/Çıkık", en: "Knee pain, Shoulder impinement, Fractures" }
  },
  {
    id: "ophthalmology",
    title: { tr: "Göz Hastalıkları & Lazer", en: "Ophthalmology & Laser Eye" },
    icon: "Eye",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "No-Touch Akıllı Lazer, Katarakt Ameliyatı (Fako), Glokom (Göz Tansiyonu) ve Sarı Nokta Tedavisi.",
      en: "No-Touch Smart Femto-Laser, Cataract Surgery, Glaucoma Care, and Macular Degeneration Therapy."
    },
    specsCount: 5,
    techBadge: "Femto-Lasik 100% No-Touch",
    popularSymptom: { tr: "Bulanık görme, Göz kuruluğu, Kızarıklık", en: "Blurred vision, Dry eyes, Redness" }
  },
  {
    id: "dermatology",
    title: { tr: "Dermatoloji & Medikal Estetik", en: "Dermatology & Aesthetics" },
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80",
    desc: {
      tr: "Dijital Ben Haritalama (FotoFinder), Akne & Leke Tedavisi, Anti-Aging Medikal Estetik ve Alerji Testleri.",
      en: "Digital Mole Mapping (FotoFinder), Acne & Hyperpigmentation, Anti-Aging Aesthetics, and Skin Allergy."
    },
    specsCount: 4,
    techBadge: "FotoFinder Dermoscopy",
    popularSymptom: { tr: "Cilt döküntüsü, Kaşıntı, Akne, Ben Değişimi", en: "Skin rash, Itching, Acne, Mole changes" }
  }
];

export const doctorsData = [
  {
    id: "doc-1",
    name: "Prof. Dr. Selin Jenkins Alkan",
    title: { tr: "Kardiyoloji Anabilim Dalı Başkanı", en: "Chief of Cardiology" },
    departmentId: "cardiology",
    experience: 22,
    rating: 4.98,
    reviewCount: 342,
    image: "/images/doctor_female.jpg",
    languages: ["TR", "EN", "DE"],
    telehealth: true,
    education: { tr: "Hacettepe Üniversitesi Tıp Fakültesi / Harvard Medical School Fellow", en: "Hacettepe University MD / Harvard Medical School Fellow" },
    bio: {
      tr: "Girişimsel kardiyoloji ve koroner stent uygulamalarında 15.000'den fazla başarılı vaka deneyimi. Dünya Kardiyoloji Derneği Yönetim Kurulu Üyesi.",
      en: "Over 15,000 successful interventional cardiology cases. Member of the World Heart Federation Board."
    },
    availableSlots: ["09:30", "11:00", "14:15", "16:00"]
  },
  {
    id: "doc-2",
    name: "Doç. Dr. Elias Thorne Yılmaz",
    title: { tr: "Nöroloji Uzmanı & Beyin İnme Sorumlusu", en: "Chief Neurologist & Stroke Care Lead" },
    departmentId: "neurology",
    experience: 16,
    rating: 4.95,
    reviewCount: 289,
    image: "/images/doctor_male.jpg",
    languages: ["TR", "EN"],
    telehealth: true,
    education: { tr: "İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi / Charité Berlin", en: "Istanbul Cerrahpasa MD / Charité Berlin Specialist" },
    bio: {
      tr: "Migren blokajı, Parkinson pil tedavisi ve kronik baş ağrılarında nöromodülasyon teknolojisi öncüsü.",
      en: "Pioneer in neuromodulation therapy for refractory migraines, Parkinson's deep brain stimulation, and neuro-rehabilitation."
    },
    availableSlots: ["10:00", "11:30", "15:00", "17:15"]
  },
  {
    id: "doc-3",
    name: "Dr. Öğr. Üyesi Ayşe Kaya Demir",
    title: { tr: "Çocuk Alerji & İmmünoloji Uzmanı", en: "Pediatric Allergy & Pulmonology Lead" },
    departmentId: "pediatrics",
    experience: 12,
    rating: 4.92,
    reviewCount: 195,
    image: "https://images.unsplash.com/photo-1594824813571-2b533411efa0?auto=format&fit=crop&w=400&q=80",
    languages: ["TR", "EN"],
    telehealth: true,
    education: { tr: "Ege Üniversitesi Tıp Fakültesi", en: "Ege University Faculty of Medicine" },
    bio: {
      tr: "Çocuklarda astım, besin alerjileri ve gelişme bozukluklarında empati odaklı yaklaşım ve kişiselleştirilmiş tedavi.",
      en: "Empathetic, evidence-based care for pediatric asthma, food sensitivities, and growth development."
    },
    availableSlots: ["09:00", "13:30", "15:30"]
  },
  {
    id: "doc-4",
    name: "Op. Dr. Murat Karahan",
    title: { tr: "Ortopedi & Robotik Protez Cerrahı", en: "Orthopedic & Robotic Joint Surgeon" },
    departmentId: "orthopedics",
    experience: 19,
    rating: 4.97,
    reviewCount: 410,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    languages: ["TR", "EN", "RU"],
    telehealth: false,
    education: { tr: "Ankara Üniversitesi Tıp Fakültesi / Mayo Clinic USA", en: "Ankara University MD / Mayo Clinic Fellowship" },
    bio: {
      tr: "Robotik diz-kalça protezi ameliyatlarında minimal invaziv cerrahi teknikler ile 24 saatte ayağa kaldırma protokolü.",
      en: "Specialist in 24-hour fast-track rehabilitation following robotic total knee & hip replacement."
    },
    availableSlots: ["10:30", "14:00", "16:30"]
  },
  {
    id: "doc-5",
    name: "Prof. Dr. Deniz Arslan",
    title: { tr: "Göz Hastalıkları & Lazer Cerrahisi Başkanı", en: "Head of Ophthalmology & Refractive Surgery" },
    departmentId: "ophthalmology",
    experience: 25,
    rating: 4.99,
    reviewCount: 520,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    languages: ["TR", "EN", "FR"],
    telehealth: true,
    education: { tr: "Marmara Üniversitesi Tıp Fakültesi / Moorfields Eye Hospital London", en: "Marmara University MD / Moorfields Eye Hospital London" },
    bio: {
      tr: "Gözlüklerden kurtulma ameliyatlarında No-Touch Lazer ve multifokal akıllı mercek uygulayıcısı.",
      en: "World-renowned specialist for No-Touch laser vision correction and premium multifocal intraocular lenses."
    },
    availableSlots: ["09:15", "11:45", "15:15"]
  },
  {
    id: "doc-6",
    name: "Uzser Dr. Yasemin Çelik",
    title: { tr: "Dermatoloji & Medikal Estetik Uzmanı", en: "Dermatology & Cosmetic Medical Lead" },
    departmentId: "dermatology",
    experience: 11,
    rating: 4.91,
    reviewCount: 230,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    languages: ["TR", "EN"],
    telehealth: true,
    education: { tr: "İstanbul Üniversitesi Tıp Fakültesi", en: "Istanbul University Faculty of Medicine" },
    bio: {
      tr: "Leke ve akne izi tedavilerinde altın iğne RF, eksozom kök hücre terapisi ve kişiye özel cilt haritalama.",
      en: "Expert in golden needle RF, exosome regenerative therapy, and personalized dermoscopy mapping."
    },
    availableSlots: ["10:15", "13:00", "16:45"]
  }
];

export const symptomsDb = [
  {
    keywords: ["göğüs", "kalp", "çarpıntı", "nefes darlığı", "tansiyon", "baskı", "chest", "heart", "palpitation"],
    departmentId: "cardiology",
    urgency: "YÜKSEK (ACİL)",
    urgencyClass: "bg-red-500/20 text-red-400 border-red-500/30",
    advice: {
      tr: "Göğüsteki ani ve şiddetli baskı hissi acil durum işareti olabilir. Gerekirse hemen 444 0 911 Acil Servisi arayın veya Kardiyoloji polikliniğimize başvurunuz.",
      en: "Sudden chest pressure might be a medical emergency. Call our ER hotline 444 0 911 or proceed to Cardiology immediately."
    }
  },
  {
    keywords: ["baş ağrısı", "migren", "baş dönmesi", "uyuşma", "vertigo", "felç", "unutkanlık", "headache", "migraine", "dizziness"],
    departmentId: "neurology",
    urgency: "ORTA - YÜKSEK",
    urgencyClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    advice: {
      tr: "Şiddetli ve tekrarlayan baş ağrıları ile uyuşmalar için Nöroloji polikliniğinde 3T MR incelemesi önerilmektedir.",
      en: "For recurring severe headaches or limb numbness, a 3T MRI diagnostic under Neurology is strongly advised."
    }
  },
  {
    keywords: ["çocuk", "bebek", "ateş", "öksürük", "iştahsızlık", "gaz", "büyüme", "fever", "child", "baby", "pediatric"],
    departmentId: "pediatrics",
    urgency: "ORTA",
    urgencyClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    advice: {
      tr: "Çocuklarda 38.5°C üzeri dirençli ateş ve iştahsızlık durumlarında Çocuk Sağlığı & Hastalıkları polikliniğimize muayene olmanız önerilir.",
      en: "Persistent fever over 38.5°C in children warrants immediate consultation at our Pediatrics unit."
    }
  },
  {
    keywords: ["diz", "eklem", "bel", "kırık", "çıkık", "omuz", "bacak ağrısı", "knee", "joint", "back pain", "bone"],
    departmentId: "orthopedics",
    urgency: "NORMAL - ORTA",
    urgencyClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    advice: {
      tr: "Eklem ağrıları ve hareket kısıtlılığı için Ortopedi birimimizde dijital röntgen ve robotik cerrahi değerlendirmesi yapılabilmektedir.",
      en: "For joint pain and mobility limitations, consult Orthopedics for digital imaging and assessment."
    }
  },
  {
    keywords: ["göz", "görme", "bulanık", "katarakt", "kuruluk", "kızarıklık", "eye", "vision", "blur", "lasik"],
    departmentId: "ophthalmology",
    urgency: "NORMAL",
    urgencyClass: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    advice: {
      tr: "Göz kuruluğu, bulanık görme ve numara kontrolü için Göz Hastalıkları & Lazer polikliniğimizden randevu alabilirsiniz.",
      en: "Schedule a comprehensive eye check with our Ophthalmology unit for laser or lens evaluation."
    }
  },
  {
    keywords: ["cilt", "akne", "sivilce", "kaşıntı", "leke", "ben", "döküntü", "skin", "rash", "dermatology", "mole"],
    departmentId: "dermatology",
    urgency: "DÜŞÜK - NORMAL",
    urgencyClass: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    advice: {
      tr: "Cilt lekeleri, kaşıntılı döküntüler ve ben kontrolleri için Dermatoloji polikliniğimizde FotoFinder dijital analizi yapılmaktadır.",
      en: "For skin blemishes or mole tracking, book an appointment with Dermatology for FotoFinder mapping."
    }
  }
];

export const checkupPackages = [
  {
    id: "executive-vip",
    name: { tr: "VIP Executive Check-Up", en: "Executive VIP Health Suite" },
    tag: "En Popüler",
    price: "₺14.500",
    period: { tr: "Tam Gün Programı", en: "Full Day Comprehensive" },
    features: [
      { tr: "3T Tüm Vücut MR & BT Angio", en: "3T Whole Body MRI & CT Angiography" },
      { tr: "Kapsamlı Kardiyolojik Eko & EKG", en: "Comprehensive Cardiac Echo & ECG" },
      { tr: "50+ Biyokimya & Tümör Markörleri", en: "50+ Blood Biomarkers & Tumor Markers" },
      { tr: "VIP Özel Dinlenme Süiti & Kahvaltı", en: "VIP Private Suite & Executive Breakfast" },
      { tr: "Genetik Risk Analizi Konsültasyonu", en: "Genetic Risk Analysis Consultation" }
    ],
    popular: true
  },
  {
    id: "cardio-prime",
    name: { tr: "Kardiyo-Prime Kalp Paketi", en: "Cardio-Prime Heart Defense" },
    tag: "Kalp Odaklı",
    price: "₺8.900",
    period: { tr: "Yarım Gün Programı", en: "Half-Day Screening" },
    features: [
      { tr: "Eforlu EKG & Ekokardiyografi", en: "Stress Test ECG & Echocardiography" },
      { tr: "Koroner Kalsiyum Skorlama BT", en: "Coronary Calcium Scoring CT" },
      { tr: "Lipid Paneli & Kardiyak Biyomarkerlar", en: "Advanced Lipid Panel & Cardiac Markers" },
      { tr: "Uzman Kardiyolog Değerlendirmesi", en: "Senior Cardiologist 1-on-1 Session" }
    ],
    popular: false
  },
  {
    id: "pediatric-plus",
    name: { tr: "Çocuk Gelişim & Alerji Taraması", en: "Pediatric Growth & Allergy Plus" },
    tag: "0-16 Yaş",
    price: "₺5.400",
    period: { tr: "3 Saatlik Program", en: "3-Hour Friendly Visit" },
    features: [
      { tr: "Çocuk Alerji Prik ve Kan Testleri", en: "Pediatric Skin Prick & Allergy Panel" },
      { tr: "Göz & İşitme Taraması", en: "Pediatric Vision & Audiometry Screening" },
      { tr: "Postür & Omurga Analizi", en: "Posture & Spine Alignment Evaluation" },
      { tr: "Çocuk Gelişim Psikoloğu Görüşmesi", en: "Child Developmental Psychologist Session" }
    ],
    popular: false
  }
];

export const insuranceProviders = [
  { name: "Acıbadem Sigorta", logo: "🛡️", coverage: "100% Ayakta & Yatarak" },
  { name: "Allianz Sigorta", logo: "🌐", coverage: "100% Özel VIP Teminat" },
  { name: "AXA Sigorta", logo: "💎", coverage: "100% Anlaşmalı Poliklinikler" },
  { name: "Sompo Sigorta", logo: "⭐", coverage: "Tam Tamamlayıcı & Özel" },
  { name: "MAPFRE Sigorta", logo: "🚀", coverage: "Kapsamlı Sağlık Teminatı" },
  { name: "Anadolu Sigorta", logo: "🏛️", coverage: "Özel Sağlık & TSS" }
];

export const samplePatientLabResult = {
  patientName: "Ahmet Yılmaz",
  protocolNo: "LM-2026-88412",
  date: "25.07.2026 10:30",
  doctor: "Prof. Dr. Selin Jenkins Alkan",
  department: "Kardiyoloji & Kalp Sağlığı",
  results: [
    { test: "Hemogram - Wbc (Lökosit)", value: "7.4", ref: "4.0 - 10.0 10^3/uL", status: "normal" },
    { test: "Kollesterol (Total)", value: "185", ref: "< 200 mg/dL", status: "normal" },
    { test: "HDL Kollesterol", value: "58", ref: "> 40 mg/dL", status: "good" },
    { test: "LDL Kollesterol", value: "112", ref: "< 130 mg/dL", status: "normal" },
    { test: "Trigliserid", value: "142", ref: "< 150 mg/dL", status: "normal" },
    { test: "Açlık Kan Şekeri (Glukoz)", value: "94", ref: "70 - 100 mg/dL", status: "normal" },
    { test: "HbA1c (Glukozile Hemoglobin)", value: "5.4%", ref: "< 5.7%", status: "good" },
    { test: "Troponin-I (Kardiyak)", value: "< 0.01", ref: "< 0.04 ng/mL", status: "good" },
    { test: "Vitamin D (25-OH)", value: "48", ref: "30 - 100 ng/mL", status: "good" }
  ],
  radiologyNote: "3T Koroner BT Anjiyografi İncelemesi: Sol koroner arterler ve anterior inen dal (LAD) açık. Duvarlarda darlık veya kireçlenme saptanmamıştır. Sol ventrikül ejeksiyon fraksiyonu (EF) %65 ile fizyolojik sınırlar içerisindedir."
};
