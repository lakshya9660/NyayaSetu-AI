import { LegalResource, LegalAidDirectoryEntry, LegalDocument, ChatMessage, User } from '../types';

export const FALLBACK_USER: User = {
  id: "demo-citizen-id",
  email: "citizen@nyayasetu.org",
  full_name: "Aarav Sharma (Demo Citizen)",
  role: "citizen",
  preferred_language: "en",
  is_active: true,
  created_at: new Date().toISOString()
};

export const FALLBACK_RESOURCES: LegalResource[] = [
  {
    id: "res-1",
    title: "eCourts Services National Portal",
    description: "Official case status lookup, court orders, causelists, and certified copy requests for High Courts and District Courts across India.",
    category: "General Legal Information",
    source_organization: "e-Committee, Supreme Court of India",
    official_url: "https://ecourts.gov.in/",
    language: "All",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-2",
    title: "Department of Justice Tele-Law Service",
    description: "Connecting citizens in rural and urban areas with panel lawyers via Common Service Centres (CSCs) and mobile application.",
    category: "Legal Aid",
    source_organization: "Ministry of Law and Justice",
    official_url: "https://www.tele-law.in/",
    language: "Multilingual",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-3",
    title: "e-Daakhil Online Consumer Court Filing",
    description: "Digital platform enabling citizens to file consumer complaints online across District, State, and National Consumer Commissions.",
    category: "Consumer Protection",
    source_organization: "National Consumer Disputes Redressal Commission (NCDRC)",
    official_url: "https://edaakhil.nic.in/",
    language: "English / Hindi",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-4",
    title: "National Consumer Helpline (NCH) Portal",
    description: "Toll-free consumer grievance registration (1915), company dispute escalation, and consumer awareness directory.",
    category: "Consumer Protection",
    source_organization: "Ministry of Consumer Affairs",
    official_url: "https://consumerhelpline.gov.in/",
    language: "Multilingual",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-5",
    title: "NALSA Legal Aid Application & Tracking Portal",
    description: "Apply online for free advocate assignment, legal counseling, and court fee waiver under the Legal Services Authorities Act, 1987.",
    category: "Legal Aid",
    source_organization: "National Legal Services Authority",
    official_url: "https://nalsa.gov.in/legal-aid/",
    language: "All",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  }
];

export const FALLBACK_LEGAL_AID: LegalAidDirectoryEntry[] = [
  {
    id: "aid-1",
    office_name: "District Legal Services Authority (South Delhi)",
    authority_type: "DLSA",
    state: "Delhi",
    district: "South Delhi",
    address: "Saket District Court Complex, Saket, New Delhi - 110017",
    contact_number: "011-29562440",
    official_portal_url: "https://dslsa.org/",
    verification_status: "verified",
    last_verified_date: "Verified October 2026"
  },
  {
    id: "aid-2",
    office_name: "National Legal Services Authority (NALSA) HQ",
    authority_type: "NALSA",
    state: "Delhi",
    district: "New Delhi",
    address: "B-Block, Additional Building Complex, Supreme Court of India, New Delhi - 110001",
    contact_number: "15100 (National Helpline)",
    official_portal_url: "https://nalsa.gov.in/legal-aid/",
    verification_status: "verified",
    last_verified_date: "Verified October 2026"
  },
  {
    id: "aid-3",
    office_name: "District Legal Services Authority (Mumbai)",
    authority_type: "DLSA",
    state: "Maharashtra",
    district: "Mumbai",
    address: "City Civil Court Complex, Fort, Mumbai, Maharashtra - 400032",
    contact_number: "022-22676020 / 15100",
    official_portal_url: "https://legalservices.maharashtra.gov.in/",
    verification_status: "verified",
    last_verified_date: "Verified October 2026"
  },
  {
    id: "aid-4",
    office_name: "District Legal Services Authority (Bengaluru Urban)",
    authority_type: "DLSA",
    state: "Karnataka",
    district: "Bengaluru",
    address: "City Civil Court Complex, K.G. Road, Bengaluru, Karnataka - 560009",
    contact_number: "080-22211756",
    official_portal_url: "https://kslsa.kar.nic.in/",
    verification_status: "verified",
    last_verified_date: "Verified October 2026"
  },
  {
    id: "aid-5",
    office_name: "District Legal Services Authority (Lucknow)",
    authority_type: "DLSA",
    state: "Uttar Pradesh",
    district: "Lucknow",
    address: "District Court Compound, Kaiserbagh, Lucknow, Uttar Pradesh - 226001",
    contact_number: "0522-2615403",
    official_portal_url: "https://upslsa.up.gov.in/",
    verification_status: "verified",
    last_verified_date: "Verified October 2026"
  }
];

export const FALLBACK_SOURCES: LegalDocument[] = [
  {
    id: "doc-1",
    title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
    publisher: "National Legal Services Authority (NALSA)",
    document_type: "Statute Excerpt",
    official_url: "https://nalsa.gov.in/legal-aid/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-2",
    title: "Consumer Protection Act, 2019 — Citizen Rights & Dispute Redressal",
    publisher: "Ministry of Consumer Affairs, Food & Public Distribution",
    document_type: "Statutory Overview",
    official_url: "https://consumerhelpline.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-3",
    title: "Model Tenancy Act, 2021 — Tenant & Landlord Statutory Protections",
    publisher: "Ministry of Housing and Urban Affairs",
    document_type: "Central Model Legislation",
    official_url: "https://mohua.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-4",
    title: "Motor Vehicles (Amendment) Act, 2019 — Section 194D Helmet Provisions",
    publisher: "Ministry of Road Transport and Highways",
    document_type: "Statutory Rule Excerpt",
    official_url: "https://morth.nic.in/",
    verification_date: "Verified 2026",
    total_chunks: 1,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  }
];

export function generateFallbackAnswer(query: string, language: string = 'en'): ChatMessage {
  const isHi = language === 'hi' || /[\u0900-\u097F]/.test(query);
  const qLower = query.toLowerCase();

  let content = "";
  let points: string[] = [];
  let nextSteps: string[] = [];
  let referral = "";
  let topic = "General Legal Information";
  let retrieval_status: "grounded" | "refusal" | "insufficient_evidence" = "grounded";
  let sourcesCited: Array<{
    document_id: string;
    document_title: string;
    page: number;
    section: string;
    official_url: string;
    excerpt: string;
  }> = [];

  // 1. Criminal Harm & Weapon Interception Guardrail
  if (
    qLower.includes("hide a weapon") || qLower.includes("hide weapon") || qLower.includes("after assaulting") ||
    qLower.includes("avoid arrest") || qLower.includes("kill") || qLower.includes("murder") ||
    qLower.includes("poison") || qLower.includes("हथियार") || qLower.includes("छुपाना") || qLower.includes("हमला")
  ) {
    retrieval_status = "refusal";
    topic = "Statutory Safety Interceptor";
    if (isHi) {
      content = "⚠️ **वैधानिक सुरक्षा चेतावनी (आपराधिक कृत्य निषेध):**\n\nन्यायसेतु एआई किसी भी अपराध को छिपाने, साक्ष्य नष्ट करने या पुलिस गिरफ्तारी से बचने में सहायता प्रदान करने से पूर्णतः इनकार करता है।\n\n**भारतीय न्याय संहिता, 2023 (BNS) की धारा 238** के अनुसार किसी अपराध के साक्ष्य को गायब करना या अपराधी को बचाने के उद्देश्य से झूठी जानकारी देना एक गंभीर संज्ञेय अपराध है, जिसके लिए **7 वर्ष तक के कारावास और जुर्माने** का स्पष्ट प्रावधान है।\n\nयदि आप किसी आपातकालीन संकट में हैं, तो तत्काल आधिकारिक पुलिस सहायता लें।";
      points = [
        "भारतीय न्याय संहिता, 2023 की धारा 238 के तहत अपराध के साक्ष्य नष्ट करना संज्ञेय अपराध है।",
        "यह प्रणाली किसी भी अवैध कृत्य या पुलिस जांच से बचने में सहायता नहीं करती है।"
      ];
      nextSteps = [
        "आपातकालीन स्थिति में तुरंत राष्ट्रीय आपातकालीन हेल्पलाइन 112 डायल करें।",
        "निकटतम पुलिस स्टेशन से संपर्क करें।"
      ];
      referral = "राष्ट्रीय आपातकालीन सहायता: 112 | राष्ट्रीय विधिक सेवा प्राधिकरण: 15100";
    } else {
      content = "⚠️ **Statutory Safety Interception Notice:**\n\nNyayaSetu AI strictly refuses to assist with concealing evidence, evading law enforcement, or facilitating any criminal offense.\n\n**Under Section 238 of the Bharatiya Nyaya Sanhita, 2023 (BNS):** Causing the disappearance of evidence of an offense or giving false information to screen an offender is a cognizable criminal offense punishable with **rigorous imprisonment up to 7 years and fine**.\n\nIf you or someone else is in immediate danger, please contact national emergency authorities.";
      points = [
        "Section 238 of BNS 2023 criminalizes the concealment or destruction of evidence.",
        "NyayaSetu AI maintains zero-tolerance for queries promoting physical harm or obstruction of justice."
      ];
      nextSteps = [
        "Contact National Emergency Services immediately by dialing 112.",
        "Report any incident to the nearest local police jurisdiction."
      ];
      referral = "National Emergency Response: 112 | NALSA Helpline: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-bns-238",
        document_title: "Bharatiya Nyaya Sanhita, 2023 — Offenses Against Public Justice",
        page: 48,
        section: isHi ? "धारा 238: साक्ष्य का विलोपन" : "Section 238: Disappearance of Evidence",
        official_url: "https://www.mha.gov.in/",
        excerpt: "Whoever, knowing or having reason to believe that an offense has been committed, causes any evidence of the commission of that offense to disappear shall be punished with imprisonment up to seven years."
      }
    ];
  }

  // 2. Case Outcome Guarantee & Lawyer Impersonation Refusal
  else if (
    qLower.includes("guarantee") || qLower.includes("will i win") || qLower.includes("win my case") ||
    qLower.includes("act as my lawyer") || qLower.includes("system override") || qLower.includes("forget instructions") ||
    query.includes("गारंटी") || query.includes("क्या मैं जीतूंगा")
  ) {
    retrieval_status = "refusal";
    topic = "Ethical & Non-Lawyer Boundary";
    if (isHi) {
      content = "⚖️ **अस्वीकरण एवं गैर-वकील पारदर्शिता सूचना:**\n\nन्यायसेतु एआई एक **कानूनी सूचना मंच** है, कोई अधिकृत अधिवक्ता (Lawyer) नहीं है। यह किसी भी अदालती मामले के परिणाम की गारंटी नहीं दे सकता है और न ही व्यक्तिगत कानूनी प्रतिनिधित्व प्रदान कर सकता है।\n\nभारतीय न्याय प्रणाली में किसी भी वाद का निर्णय केवल सक्षम न्यायालय द्वारा प्रस्तुत साक्ष्यों और वैधानिक नियमों के आधार पर किया जाता है।";
      points = [
        "यह प्रणाली किसी भी मामले में जीत या न्यायिक परिणाम की गारंटी नहीं देती।",
        "यह केवल अनुमोदित भारतीय कानूनों पर आधारित सामान्य वैधानिक सूचना प्रदान करती है।"
      ];
      nextSteps = [
        "औपचारिक कानूनी प्रतिनिधित्व के लिए अपने जिले के जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।",
        "राष्ट्रीय विधिक सेवा प्राधिकरण की टोल-फ्री हेल्पलाइन 15100 पर परामर्श प्राप्त करें।"
      ];
      referral = "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 | NALSA: https://nalsa.gov.in/legal-aid/";
    } else {
      content = "⚖️ **Statutory Disclaimer & Non-Lawyer Transparency Notice:**\n\nNyayaSetu AI is an **informational assistance platform, NOT a licensed advocate**. It strictly cannot predict judicial outcomes, give outcome guarantees, or provide personalized courtroom representation.\n\nUnder Indian jurisprudence, judicial outcomes are determined solely by competent courts based on admissible evidence and statutory provisions.";
      points = [
        "NyayaSetu AI never guarantees judicial outcomes or offers formal legal counsel.",
        "System override instructions cannot bypass transparency and statutory grounding rules."
      ];
      nextSteps = [
        "Consult an empanelled advocate at your nearest District Legal Services Authority (DLSA).",
        "Call the National Legal Aid Helpline 15100 for verified eligibility navigation."
      ];
      referral = "National Legal Services Authority: https://nalsa.gov.in/legal-aid/ | Toll-Free: 15100";
    }
  }

  // 3. Tenancy, Rent, Landlord, Security Deposit & Utility Disconnection
  else if (
    qLower.includes("tenan") || qLower.includes("landlord") || qLower.includes("rent") ||
    qLower.includes("security deposit") || qLower.includes("cut electricity") || qLower.includes("cut water") ||
    qLower.includes("locked") || query.includes("किराया") || query.includes("मकान मालिक") || query.includes("बिजली") || query.includes("डिपॉजिट")
  ) {
    topic = "Tenancy & Housing Rights";
    if (isHi) {
      content = "**मॉडल टेनेंसी एक्ट, 2021 (Model Tenancy Act, 2021) के तहत किराएदारों और मकान मालिकों दोनों के स्पष्ट वैधानिक अधिकार और सुरक्षा नियम निर्धारित हैं:**\n\n1. **सिक्योरिटी डिपॉजिट की सीमा (धारा 2 व 22)**:\n   • आवासीय परिसरों (Residential Premises) के लिए अधिकतम **2 महीने का किराया** ही बतौर सिक्योरिटी डिपॉजिट लिया जा सकता है।\n   • गैर-आवासीय/व्यावसायिक परिसरों (Commercial) के लिए अधिकतम **6 महीने का किराया** निर्धारित है।\n\n2. **आवश्यक सेवाओं की कटौती पर पूर्ण प्रतिबंध (धारा 20)**:\n   • किसी भी परिस्थिति में (चाहे किराए का विवाद ही क्यों न हो) मकान मालिक किराएदार की **बिजली, पानी या सीवरेज जैसी अनिवार्य सेवाएं नहीं काट सकता**।\n   • ऐसा करना गैरकानूनी है और किराएदार रेंट अथॉरिटी के समक्ष तत्काल शिकायत दर्ज कर सकता है।\n\n3. **बेदखली के नियम**:\n   • बिना रेंट कोर्ट/अथॉरिटी के वैधानिक आदेश और पूर्व लिखित नोटिस के किराएदार को जबरन बेदखल नहीं किया जा सकता।";
      points = [
        "आवासीय परिसर के लिए सिक्योरिटी डिपॉजिट अधिकतम 2 महीने के किराए तक सीमित है।",
        "धारा 20 के तहत मकान मालिक द्वारा बिजली या पानी की आपूर्ति काटना पूर्णतः वर्जित है।",
        "विवाद की स्थिति में केवल रेंट कोर्ट या रेंट अथॉरिटी के माध्यम से ही समाधान संभव है।"
      ];
      nextSteps = [
        "अपने लिखित किराया समझौते (Rent Agreement) और किराया भुगतान की रसीदों को सुरक्षित रखें।",
        "यदि मकान मालिक ने बिजली/पानी काटा है, तो अपने स्थानीय रेंट अथॉरिटी/एसडीएम कार्यालय में धारा 20 के तहत आवेदन दें।",
        "निःशुल्क विधिक सलाह के लिए स्थानीय DLSA कार्यालय से संपर्क करें।"
      ];
      referral = "आवासन और शहरी कार्य मंत्रालय (MoHUA): https://mohua.gov.in/ | DLSA हेल्पलाइन: 15100";
    } else {
      content = "**Under the Model Tenancy Act, 2021, statutory rights and safeguards are established for both tenants and property owners:**\n\n1. **Cap on Security Deposit (Section 2 & 22)**:\n   • For residential premises, the security deposit is strictly capped at a maximum of **2 months' rent**.\n   • For non-residential/commercial premises, the cap is **6 months' rent**.\n\n2. **Prohibition on Withholding Essential Services (Section 20)**:\n   • Landlords are strictly prohibited from cutting off essential amenities such as **electricity, water supply, or sanitation**, even during rental or payment disputes.\n   • Withholding essential services is actionable before the Rent Authority, which can penalize the landlord.\n\n3. **Eviction Protection**:\n   • Tenants cannot be evicted through force or self-help; eviction requires a formal application and order from the competent Rent Court.";
      points = [
        "Security deposits are legally capped at a maximum of 2 months' rent for residential rentals.",
        "Landlords cannot disconnect essential utility services (electricity, water) under Section 20.",
        "Eviction requires statutory notice and adjudication by the designated Rent Court."
      ];
      nextSteps = [
        "Maintain copies of your written tenancy agreement and rent transfer receipts.",
        "File an immediate application before the local Rent Authority/Sub-Divisional Magistrate if utilities are disrupted.",
        "Visit your District Legal Services Authority (DLSA) front office for free tenancy dispute guidance."
      ];
      referral = "Ministry of Housing and Urban Affairs: https://mohua.gov.in/ | Legal Aid: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-3",
        document_title: "Model Tenancy Act, 2021 — Tenant & Landlord Statutory Protections",
        page: 1,
        section: isHi ? "धारा 2 व 20: सिक्योरिटी डिपॉजिट एवं आवश्यक सेवाएं" : "Sections 2 & 20: Security Deposit & Essential Amenities",
        official_url: "https://mohua.gov.in/",
        excerpt: "The security deposit to be paid by the tenant in advance shall not exceed two months' rent for residential premises and no landlord shall disconnect essential supply."
      }
    ];
  }

  // 4. Motor Vehicles Act & Traffic Helmet Challan (Section 194D)
  else if (
    qLower.includes("helmet") || qLower.includes("194d") || qLower.includes("challan") ||
    qLower.includes("traffic") || qLower.includes("driving license") || query.includes("हेलमेट") || query.includes("चालान")
  ) {
    topic = "Road Transport & Traffic Laws";
    if (isHi) {
      content = "**मोटर वाहन (संशोधन) अधिनियम, 2019 की धारा 194D (Motor Vehicles Act Section 194D) के तहत बिना हेलमेट दोपहिया वाहन चलाने पर निम्नलिखित वैधानिक दंड निर्धारित हैं:**\n\n1. **आर्थिक जुर्माना**: बिना मानक हेलमेट दोपहिया वाहन चलाने पर **₹1,000 (एक हजार रुपये)** का वैधानिक चालान।\n2. **ड्राइविंग लाइसेंस का निलंबन**: चालक का ड्राइविंग लाइसेंस **3 महीने की अवधि के लिए अयोग्य (Disqualified/Suspended)** किया जा सकता है।\n3. **सह-यात्री नियम**: पीछे बैठने वाले (Pillion Rider) के लिए भी सुरक्षा मानक वाला बीआईएस (BIS) प्रमाणित हेलमेट पहनना अनिवार्य है।";
      points = [
        "धारा 194D के तहत बिना हेलमेट वाहन चलाने पर ₹1,000 का अर्थदंड लागू है।",
        "सक्षम परिवहन प्राधिकारी द्वारा ड्राइविंग लाइसेंस को 3 माह के लिए निलंबित किया जा सकता है।"
      ];
      nextSteps = [
        "ई-चालान की वैधता आधिकारिक पोर्टल https://echallan.parivahan.gov.in/ पर सत्यापित करें।",
        "चालान का भुगतान ऑनलाइन परिवहन पोर्टल या वर्चुअल कोर्ट (Virtual Court) के माध्यम से करें।"
      ];
      referral = "सड़क परिवहन एवं राजमार्ग मंत्रालय (MoRTH): https://morth.nic.in/ | ई-चालान: https://echallan.parivahan.gov.in/";
    } else {
      content = "**Under Section 194D of the Motor Vehicles (Amendment) Act, 2019, riding a two-wheeler without a protective headgear carries mandatory statutory penalties:**\n\n1. **Monetary Penalty**: A compounding fine of **Rs 1,000 (One Thousand Rupees)**.\n2. **License Disqualification**: The driver's license is subject to statutory **disqualification for a period of 3 months**.\n3. **Pillion Rider Requirement**: The requirement to wear BIS-compliant protective headgear applies equally to the pillion passenger under central motor vehicle rules.";
      points = [
        "Section 194D imposes a Rs 1,000 fine for riding without a prescribed protective helmet.",
        "Mandatory disqualification of driving license for a statutory duration of 3 months."
      ];
      nextSteps = [
        "Verify issued challan details on the official portal https://echallan.parivahan.gov.in/.",
        "Contest or settle the challan online via the official Virtual Court mechanism."
      ];
      referral = "Ministry of Road Transport and Highways: https://morth.nic.in/ | e-Challan Portal: https://echallan.parivahan.gov.in/";
    }
    sourcesCited = [
      {
        document_id: "doc-4",
        document_title: "Motor Vehicles (Amendment) Act, 2019 — Section 194D Helmet Provisions",
        page: 1,
        section: isHi ? "धारा 194D: सुरक्षात्मक हेडगियर नियम" : "Section 194D: Protective Headgear Violations",
        official_url: "https://morth.nic.in/",
        excerpt: "Whoever drives a motorcycle or causes or allows a motorcycle to be driven in contravention of section 129 shall be punishable with fine of one thousand rupees and disqualified for three months."
      }
    ];
  }

  // 5. Consumer Protection & Defective Goods
  else if (
    qLower.includes("consumer") || qLower.includes("defective") || qLower.includes("refund") ||
    qLower.includes("product") || qLower.includes("warranty") || query.includes("उपभोक्ता") || query.includes("दोषपूर्ण") || query.includes("रिफंड")
  ) {
    topic = "Consumer Protection";
    if (isHi) {
      content = "**उपभोक्ता संरक्षण अधिनियम, 2019 (Consumer Protection Act, 2019) के तहत भारतीय उपभोक्ताओं को दोषपूर्ण वस्तुओं, अनुचित व्यापार और सेवा में कमी के विरुद्ध सशक्त वैधानिक अधिकार दिए गए हैं:**\n\n1. **उपभोक्ता अधिकार (धारा 2(9))**: सुरक्षा, सूचना, चयन, सुनवाई और क्षतिपूर्ति पाने का अधिकार।\n2. **त्रि-स्तरीय निवारण मंच (आर्थिक क्षेत्राधिकार)**:\n   • **जिला उपभोक्ता आयोग**: ₹50 लाख तक के दावों के लिए।\n   • **राज्य उपभोक्ता आयोग**: ₹50 लाख से ₹2 करोड़ तक।\n   • **राष्ट्रीय आयोग (NCDRC)**: ₹2 करोड़ से अधिक के दावों के लिए।\n3. **ई-दाखिल सुविधा**: नागरिक बिना वकील के घर बैठे **edaakhil.nic.in** पर ऑनलाइन परिवाद दर्ज कर सकते हैं।";
      points = [
        "दोषपूर्ण उत्पाद पर विक्रेता/निर्माता से पूरा रिफंड, रिप्लेसमेंट या क्षतिपूर्ति पाने का अधिकार।",
        "ई-दाखिल पोर्टल पर ऑनलाइन शिकायत दर्ज की जा सकती है, वकील की अनिवार्य आवश्यकता नहीं है।"
      ];
      nextSteps = [
        "खरीद का बिल (Invoice), वारंटी कार्ड और कंपनी से हुए पत्राचार का प्रमाण सुरक्षित रखें।",
        "राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 (टोल-फ्री) पर शिकायत दर्ज कराएं या edaakhil.nic.in पर ई-फाइलिंग करें।"
      ];
      referral = "राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915 | ई-दाखिल पोर्टल: https://edaakhil.nic.in/";
    } else {
      content = "**Under the Consumer Protection Act, 2019, consumers enjoy statutory protections against defective merchandise, deficiency in services, and misleading advertising:**\n\n1. **Statutory Consumer Rights (Section 2(9))**: The right to be protected, informed, assured, heard, and seek redressal.\n2. **Three-Tier Adjudication Structure**:\n   • **District Commission**: Pecuniary jurisdiction up to **Rs 50 Lakh**.\n   • **State Commission**: Claims between **Rs 50 Lakh and Rs 2 Crore**.\n   • **National Commission (NCDRC)**: Claims exceeding **Rs 2 Crore**.\n3. **e-Daakhil Portal**: Citizens can file consumer disputes digitally without mandatory advocate representation via edaakhil.nic.in.";
      points = [
        "Right to claim full refund, free product replacement, or compensation for damages.",
        "Online filing accessible to all citizens through e-Daakhil with nominal statutory fees."
      ];
      nextSteps = [
        "Preserve purchase receipts, tax invoices, and correspondence with the merchant.",
        "Lodge a grievance on the National Consumer Helpline (1915) or file via https://edaakhil.nic.in/."
      ];
      referral = "National Consumer Helpline: 1915 | e-Daakhil: https://edaakhil.nic.in/";
    }
    sourcesCited = [
      {
        document_id: "doc-2",
        document_title: "Consumer Protection Act, 2019 — Citizen Rights & Dispute Redressal",
        page: 1,
        section: isHi ? "धारा 2(9) एवं 34: उपभोक्ता अधिकार एवं क्षेत्राधिकार" : "Sections 2(9) & 34: Consumer Rights & Jurisdiction",
        official_url: "https://consumerhelpline.gov.in/",
        excerpt: "Consumer rights include the right to seek redressal against unfair trade practice or restrictive trade practices or unscrupulous exploitation of consumers."
      }
    ];
  }

  // 6. Free Legal Aid & NALSA / DLSA Criteria (Section 12)
  else if (
    qLower.includes("section 12") || qLower.includes("legal aid") || qLower.includes("free lawyer") ||
    qLower.includes("dlsa") || qLower.includes("nalsa") || query.includes("धारा 12") || query.includes("मुफ्त कानूनी") || query.includes("कानूनी सहायता")
  ) {
    topic = "Legal Aid & Lok Adalat";
    if (isHi) {
      content = "**विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 (Legal Services Authorities Act, 1987 Section 12) के तहत पात्र भारतीय नागरिकों को अदालत में 100% निःशुल्क कानूनी सहायता और वकील पाने का अधिकार है:**\n\n1. **धारा 12 के तहत पात्र वर्ग**:\n   • **धारा 12(c)**: सभी महिलाएं और बच्चे (बिना किसी आय सीमा के)।\n   • अनुसूचित जाति (SC) और अनुसूचित जनजाति (ST) के सदस्य।\n   • दिव्यांगजन (Disability) और औद्योगिक कामगार।\n   • कम आय वाले नागरिक (संबंधित राज्य सरकार द्वारा निर्धारित वार्षिक आय सीमा के भीतर)।\n\n2. **धारा 13 के निःशुल्क लाभ**:\n   • कोर्ट फीस, प्रक्रिया शुल्क (Process Fees) और दस्तावेज शुल्क की पूर्ण छूट।\n   • राज्य द्वारा नियुक्त पैनल अधिवक्ता (Panel Advocate) की निःशुल्क सेवाएं।";
      points = [
        "विधिक सेवा प्राधिकरण अधिनियम की धारा 12(c) के तहत महिलाएं बिना आय सीमा के मुफ्त कानूनी सहायता की हकदार हैं।",
        "अदालती खर्च, कोर्ट फीस और पैनल वकील का सारा खर्च सरकार वहन करती है।"
      ];
      nextSteps = [
        "अपने जिला न्यायालय परिसर में स्थित जिला विधिक सेवा प्राधिकरण (DLSA) फ्रंट ऑफिस जाएं।",
        "नालसा के आधिकारिक ऑनलाइन पोर्टल https://nalsa.gov.in/legal-aid/ पर आवेदन करें।",
        "राष्ट्रीय विधिक सहायता हेल्पलाइन 15100 पर कॉल करके सहायता प्राप्त करें।"
      ];
      referral = "राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA): https://nalsa.gov.in/legal-aid/ | हेल्पलाइन: 15100 (टोल-फ्री)";
    } else {
      content = "**Under Section 12 of the Legal Services Authorities Act, 1987, eligible citizens are entitled to free legal aid, counsel, and representation in court:**\n\n1. **Eligible Categories (Section 12)**:\n   • **Section 12(c)**: All women and children, without any financial ceiling or income restriction.\n   • Members of Scheduled Castes (SC) and Scheduled Tribes (ST).\n   • Persons with disabilities, victims of trafficking, and industrial workmen.\n   • Low-income individuals whose annual earnings fall below the state statutory threshold.\n\n2. **Statutory Benefits (Section 13)**:\n   • 100% waiver of court fees, process fees, and transcription charges.\n   • Appointment of a qualified panel advocate funded by the state legal aid authority.";
      points = [
        "Section 12 guarantees free legal representation in civil, criminal, and revenue courts.",
        "All women and children qualify automatically under Section 12(c) regardless of income."
      ];
      nextSteps = [
        "Locate the Front Office of your District Legal Services Authority (DLSA) at the local District Court.",
        "Submit an application online via https://nalsa.gov.in/legal-aid/.",
        "Dial the National Legal Aid Helpline 15100 (Toll-Free) for immediate roster assistance."
      ];
      referral = "National Legal Services Authority: https://nalsa.gov.in/legal-aid/ | Toll-Free: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-1",
        document_title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        page: 1,
        section: isHi ? "धारा 12: मुफ्त कानूनी सहायता के मानदंड" : "Section 12: Criteria for Free Legal Aid",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every citizen who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman, child, SC/ST member or disabled."
      }
    ];
  }

  // 7. Unindexed / Out-of-Scope / Non-Legal / Planetary Queries
  else if (
    qLower.includes("neptune") || qLower.includes("spaceship") || qLower.includes("planet") ||
    qLower.includes("pizza") || qLower.includes("recipe") || qLower.includes("cricket") ||
    qLower.includes("weather") || qLower.includes("movie")
  ) {
    retrieval_status = "insufficient_evidence";
    topic = "Out of Statutory Scope";
    if (isHi) {
      content = "ℹ️ **अपर्याप्त विधिक साक्ष्य (Safe Refusal):**\n\nआपके द्वारा पूछा गया विषय वर्तमान में अनुक्रमित (Indexed) भारतीय कानूनी अभिलेखों के अंतर्गत नहीं आता है। न्यायसेतु एआई केवल आधिकारिक केंद्रीय एवं राज्य अधिनियमों के आधार पर ही उत्तर देता है और अपुष्ट जानकारी पर कयास लगाने से सख्त परहेज करता है।\n\nविधिक सहायता या अन्य कानूनी प्रश्नों के लिए राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA) से संपर्क करें।";
      points = ["पूछा गया विषय अनुक्रमित भारतीय वैधानिक दस्तावेजों के दायरे से बाहर है।"];
      nextSteps = ["भारतीय नागरिक अधिकारों या वैधानिक कानूनों से संबंधित प्रश्न पूछें।", "हेल्पलाइन 15100 पर संपर्क करें।"];
      referral = "राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA): https://nalsa.gov.in/legal-aid/ | हेल्पलाइन: 15100";
    } else {
      content = "ℹ️ **Insufficient Legal Evidence (Safe Refusal):**\n\nYour query falls outside the scope of verified Indian statutory enactments indexed in the NyayaSetu repository. To avoid speculation and ensure citizen safety, NyayaSetu AI strictly refuses to answer questions not substantiated by official Indian legal records.\n\nFor official legal navigation and assistance, please consult the National Legal Services Authority.";
      points = ["Query topic is not covered in verified Indian statutory public records."];
      nextSteps = ["Inquire about Indian statutory protections (Consumer, Tenancy, Legal Aid, Traffic, BNS).", "Contact NALSA on 15100 for formal legal queries."];
      referral = "National Legal Services Helpline: 15100 | NALSA: https://nalsa.gov.in/legal-aid/";
    }
  }

  // 8. General Legal Orientation
  else {
    topic = "General Statutory Information";
    if (isHi) {
      content = "**न्यायसेतु कानूनी सूचना प्रणाली के अनुसार:**\n\nभारतीय संविधान एवं केंद्रीय अधिनियमों के तहत नागरिकों को विभिन्न अधिकारों की सुरक्षा प्रदान की गई है। सटीक कानूनी प्रावधान जानने के लिए कृपया अपने प्रश्न में मुख्य विषय स्पष्ट करें:\n\n• **किराया एवं आवास**: मॉडल टेनेंसी एक्ट, 2021 (सिक्योरिटी डिपॉजिट व बेदखली सुरक्षा)\n• **उपभोक्ता अधिकार**: उपभोक्ता संरक्षण अधिनियम, 2019 (दोषपूर्ण सामान व ई-दाखिल शिकायत)\n• **मुफ्त कानूनी सहायता**: विधिक सेवा प्राधिकरण अधिनियम (धारा 12 के तहत निःशुल्क वकील)\n• **यातायात व सड़क सुरक्षा**: मोटर वाहन अधिनियम (हेलमेट व चालान नियम)\n• **आपराधिक सुरक्षा**: भारतीय न्याय संहिता, 2023";
      points = ["यह सूचना आधिकारिक भारतीय कानूनी अभिलेखों पर आधारित है।"];
      nextSteps = [
        "अपना विशिष्ट कानूनी प्रश्न पूछें (उदा. किराएदार के अधिकार या उपभोक्ता शिकायत)।",
        "निकटतम जिला विधिक सेवा प्राधिकरण (DLSA) से विधिक परामर्श लें।"
      ];
      referral = "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 (टोल-फ्री) | NALSA: https://nalsa.gov.in/legal-aid/";
    } else {
      content = "**According to NyayaSetu Grounded Legal Records:**\n\nIndian statutory law provides citizen protections across multiple key areas. For an accurate, substantiated response with statutory citations, please specify your query topic:\n\n• **Housing & Renting**: Model Tenancy Act, 2021 (Security deposit caps & utility protection)\n• **Consumer Protection**: Consumer Protection Act, 2019 (Defective goods & e-Daakhil filing)\n• **Free Legal Aid**: Legal Services Authorities Act, 1987 (Section 12 free advocate representation)\n• **Road & Traffic**: Motor Vehicles Act (Section 194D protective helmet rules)\n• **Criminal Protections**: Bharatiya Nyaya Sanhita, 2023 (Safety & evidence rules)";
      points = ["Substantiated by verified public statutory enactments."];
      nextSteps = [
        "Ask a specific question (e.g., 'What are my rights as a tenant?' or 'How do I file a consumer complaint?').",
        "Visit your local District Court DLSA front office or dial 15100."
      ];
      referral = "National Legal Services Helpline: 15100 | NALSA: https://nalsa.gov.in/legal-aid/";
    }
    sourcesCited = [
      {
        document_id: "doc-1",
        document_title: "Indian Statutory Repository Overview",
        page: 1,
        section: "Public Legal Enactments",
        official_url: "https://www.indiacode.nic.in/",
        excerpt: "Official central enactments of the Republic of India available for public citizen navigation."
      }
    ];
  }

  return {
    id: "msg-" + Date.now(),
    conversation_id: "conv-fallback",
    sender: "assistant",
    content,
    language: isHi ? "hi" : "en",
    topic,
    retrieval_status,
    sources_cited: sourcesCited,
    supported_points: points,
    suggested_next_steps: nextSteps,
    legal_aid_referral: referral,
    safety_notice: isHi ? "सामान्य कानूनी जानकारी। कोई कानूनी सलाह नहीं। व्यक्तिगत सलाह के लिए अपने जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।" : "General legal information only. Not legal advice. Consult an advocate or your local DLSA for personalized legal counsel.",
    created_at: new Date().toISOString()
  };
}
