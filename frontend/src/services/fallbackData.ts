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
  },
  {
    id: "res-6",
    title: "National Cybercrime Reporting Portal & 1930 Helpline",
    description: "Report cyber financial frauds, online scams, and unauthorized transactions within the golden hour to freeze stolen funds.",
    category: "Cyber Law & Citizen Security",
    source_organization: "Indian Cyber Crime Coordination Centre (I4C), MHA",
    official_url: "https://cybercrime.gov.in/",
    language: "Multilingual",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-7",
    title: "Elderline — National Helpline for Senior Citizens (14567)",
    description: "Toll-free helpline and legal support for elderly parents facing physical abandonment, eviction from children, or maintenance denial.",
    category: "Senior Citizens & Social Welfare",
    source_organization: "Ministry of Social Justice and Empowerment",
    official_url: "https://socialjustice.gov.in/",
    language: "Multilingual",
    is_active: true,
    last_verified_date: "Verified October 2026",
    created_at: new Date().toISOString()
  },
  {
    id: "res-8",
    title: "National Commission for Women (NCW) Legal Cell & Helpline",
    description: "24/7 dedicated support (7827170170) and legal assistance for women facing domestic violence, harassment, or marital cruelty.",
    category: "Women Protection & Family Law",
    source_organization: "National Commission for Women",
    official_url: "http://ncw.nic.in/",
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
  },
  {
    id: "doc-5",
    title: "Protection of Women from Domestic Violence Act, 2005 (PWDVA) — Sections 3, 12, 18, 19 & 20",
    publisher: "Ministry of Women and Child Development",
    document_type: "Central Enactment",
    official_url: "https://wcd.nic.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-6",
    title: "Bharatiya Nyaya Sanhita, 2023 (BNS) — Cruelty, Assault & Criminal Trespass (Sections 85, 115, 318 & 329)",
    publisher: "Ministry of Home Affairs",
    document_type: "Penal Code Statute",
    official_url: "https://www.mha.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-7",
    title: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 173 Mandatory FIR & Zero FIR",
    publisher: "Ministry of Home Affairs",
    document_type: "Criminal Procedure Code",
    official_url: "https://www.mha.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-8",
    title: "Negotiable Instruments Act, 1881 — Section 138 Dishonour of Cheque",
    publisher: "Ministry of Finance",
    document_type: "Statute Excerpt",
    official_url: "https://financialservices.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 1,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-9",
    title: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007 — Protection Against Eviction & Section 23",
    publisher: "Ministry of Social Justice and Empowerment",
    document_type: "Central Enactment",
    official_url: "https://socialjustice.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
    status: "indexed",
    is_approved: true,
    file_format: "pdf",
    created_at: new Date().toISOString()
  },
  {
    id: "doc-10",
    title: "Specific Relief Act, 1963 & Code of Civil Procedure, 1908 — Property Rights, Injunction & Possession",
    publisher: "Ministry of Law and Justice",
    document_type: "Civil Enactment",
    official_url: "https://lawmin.gov.in/",
    verification_date: "Verified 2026",
    total_chunks: 2,
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

  // ==========================================
  // 1. CRIMINAL HARM & EVIDENCE CONCEALMENT REFUSAL
  // ==========================================
  if (
    qLower.includes("hide a weapon") || qLower.includes("hide weapon") || qLower.includes("after assaulting") ||
    qLower.includes("avoid arrest") || qLower.includes("kill") || qLower.includes("murder") ||
    qLower.includes("poison") || qLower.includes("हथियार") || qLower.includes("छुपाना") || qLower.includes("सबूत मिटाना")
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

  // ==========================================
  // 2. CASE OUTCOME GUARANTEE & LAWYER IMPERSONATION REFUSAL
  // ==========================================
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

  // ==========================================
  // 3. SENIOR CITIZENS, ELDERLY PARENTS, EVICTION BY CHILDREN & MAINTENANCE
  // ==========================================
  else if (
    qLower.includes("senior citizen") || qLower.includes("elderly") ||
    qLower.includes("68 year") || qLower.includes("60 year") || qLower.includes("70 year") || qLower.includes("old age") ||
    (qLower.includes("kids") && (qLower.includes("throw") || qLower.includes("house") || qLower.includes("property") || qLower.includes("evict"))) ||
    (qLower.includes("children") && (qLower.includes("throw") || qLower.includes("house") || qLower.includes("evict") || qLower.includes("beat"))) ||
    qLower.includes("old mother") || qLower.includes("old father") || qLower.includes("elder abuse") ||
    query.includes("माता पिता") || query.includes("बुजुर्ग") || query.includes("वरिष्ठ नागरिक") || query.includes("घर से निकाल") || query.includes("वृद्ध")
  ) {
    topic = "Senior Citizens Protection & Eviction Prevention";
    if (isHi) {
      content = "⚖️ **माता-पिता और वरिष्ठ नागरिकों के कानूनी अधिकार एवं बेदखली से सुरक्षा:**\n\n**माता-पिता और वरिष्ठ नागरिकों का भरण-पोषण और कल्याण अधिनियम, 2007 (Maintenance and Welfare of Parents and Senior Citizens Act, 2007)** के तहत 60 वर्ष या उससे अधिक आयु के किसी भी वरिष्ठ नागरिक या माता-पिता को उनके बच्चों या वारिसों द्वारा उनके अपने घर से बेदखल करना पूर्णतः गैरकानूनी है। आपके पास निम्नलिखित तत्काल वैधानिक अधिकार और सुरक्षा उपलब्ध हैं:\n\n### 1. बच्चों को घर से बेदखल करने का अधिकार (Section 23)\n• **संपत्ति हस्तांतरण रद्द करना (धारा 23)**: यदि आपने अपनी कोई संपत्ति, मकान या जमीन अपने बच्चों के नाम गिफ्ट या ट्रांसफर की थी इस शर्त/अपेक्षा के साथ कि वे आपकी देखभाल करेंगे, और अब वे आपको प्रताड़ित कर रहे हैं या निकाल रहे हैं, तो **एसडीएम (Sub-Divisional Magistrate) की अध्यक्षता वाला मेंटेनेंस ट्रिब्यूनल उस ट्रांसफर को 'धोखाधड़ी/दबाव' मानकर शून्य (VOID) घोषित कर सकता है** और संपत्ति का मालिकाना हक वापस आपको दिला सकता है।\n• **प्रताड़ित करने वाले बच्चों की बेदखली**: ट्रिब्यूनल के पास वरिष्ठ नागरिक के मकान से प्रताड़ित करने वाले बेटे, बहू या बच्चों को पुलिस सहायता से बेदखल (Evict) करने का पूर्ण वैधानिक अधिकार है।\n\n### 2. अनिवार्य मासिक भरण-पोषण (Sections 4 & 5)\n• कानूनन आपके वयस्क बच्चों की यह कानूनी जिम्मेदारी है कि वे आपकी रोटी, कपड़ा, मकान और दवाओं का खर्च उठाएं। ट्रिब्यूनल बच्चों को प्रतिमाह नियमित भरण-पोषण भत्ता देने का आदेश दे सकता है।\n\n### 3. वरिष्ठ नागरिक महिलाओं के लिए 100% निःशुल्क कानूनी सहायता\n• **विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12(c)** के अनुसार प्रत्येक महिला (चाहे उसकी आय कुछ भी हो) और वरिष्ठ नागरिक अदालत में **100% निःशुल्क वकील और कोर्ट फीस छूट** पाने के हकदार हैं।\n\n### 4. तत्काल हेल्पलाइन\n• **एल्डरलाइन (Elderline) 14567**: सामाजिक न्याय एवं अधिकारिता मंत्रालय की 24/7 समर्पित राष्ट्रीय वरिष्ठ नागरिक हेल्पलाइन।\n• आपातकालीन स्थिति में तुरंत **112 (पुलिस)** डायल करें।";
      points = [
        "वरिष्ठ नागरिक अधिनियम 2007 की धारा 23 के तहत बच्चों को दिया गया मकान/गिफ्ट वापस लिया जा सकता है और बच्चों को बेदखल किया जा सकता है।",
        "बच्चों या वारिसों को बुजुर्ग माता-पिता को उनके घर से निकालने का कोई कानूनी अधिकार नहीं है।",
        "राष्ट्रीय एल्डरलाइन हेल्पलाइन 14567 तथा DLSA द्वारा धारा 12(c) में मुफ्त वकील सहायता तुरंत उपलब्ध है।"
      ];
      nextSteps = [
        "तुरंत राष्ट्रीय वरिष्ठ नागरिक हेल्पलाइन 14567 पर कॉल करके अपनी स्थिति दर्ज कराएं।",
        "अपने स्थानीय उप-विभागीय मजिस्ट्रेट (SDM) / वरिष्ठ नागरिक मेंटेनेंस ट्रिब्यूनल के समक्ष धारा 23 व 5 के तहत आवेदन दें।",
        "जिला न्यायालय परिसर में स्थित DLSA (जिला विधिक सेवा प्राधिकरण) फ्रंट ऑफिस जाएं और मुफ्त वकील नियुक्त कराएं।",
        "मकान की रजिस्ट्री, आधार कार्ड और बच्चों द्वारा किए गए दुर्व्यवहार के साक्ष्य सुरक्षित रखें।"
      ];
      referral = "राष्ट्रीय वरिष्ठ नागरिक हेल्पलाइन (Elderline): 14567 | राष्ट्रीय आपातकालीन: 112 | NALSA मुफ्त कानूनी सहायता: 15100";
    } else {
      content = "⚖️ **Statutory Protections & Actionable Recourse for Senior Citizens under Indian Law:**\n\nUnder the **Maintenance and Welfare of Parents and Senior Citizens Act, 2007 (MWPSC Act)**, adult children or relatives have **absolutely no legal right to evict, dispossess, or abandon elderly parents** from their home. As a senior citizen (aged 60+), you are shielded by powerful summary remedies:\n\n### 1. Protection Against Eviction & Cancellation of Property Transfers (Section 23)\n• **Revocation of Property Deeds (Section 23)**: If you previously transferred, gifted, or registered property in favor of your children with the expectation of care, and they subsequently neglect or attempt to oust you, **the Maintenance Tribunal presided over by the Sub-Divisional Magistrate (SDM) has the statutory authority to declare the transfer null, void, and fraudulent**, immediately restoring full title and possession to you.\n• **Eviction of Abusive Adult Children**: The Supreme Court of India has affirmed that Maintenance Tribunals possess the power to summarily evict abusive adult sons, daughters, or relatives from a senior citizen's self-acquired or ancestral home to ensure peace and dignity.\n\n### 2. Mandatory Monthly Maintenance (Sections 4 & 5)\n• Adult children and legal heirs are statutorily obligated to provide food, shelter, clothing, and medical care. The Tribunal can mandate monthly maintenance deductions payable directly to your bank account.\n\n### 3. 100% Free Legal Representation (Section 12(c))\n• Under **Section 12(c) of the Legal Services Authorities Act, 1987**, **all women are entitled to 100% free legal aid and court representation**, with zero court fees, regardless of income.\n• The District Legal Services Authority (DLSA) at your nearest District Court will assign a verified advocate to draft and argue your petition free of cost.\n\n### 4. Immediate Helplines & Safety\n• **Elderline (14567)**: Ministry of Social Justice & Empowerment's 24/7 dedicated National Senior Citizen Helpline for emergency field response and shelter intervention.\n• **Emergency Police**: Dial **112** if facing imminent physical threat or lock-out.";
      points = [
        "Under Section 23 of MWPSC Act 2007, property gifted to children can be cancelled and abusive children can be summarily evicted.",
        "Children cannot legally dispossess or evict an elderly parent from their residence.",
        "All senior women qualify for 100% free legal counsel and court representation under Section 12(c) of the Legal Services Authorities Act, 1987."
      ];
      nextSteps = [
        "Dial Elderline 14567 immediately for official senior citizen counseling and field intervention.",
        "File an urgent summary application under Section 23 and Section 5 before your local Sub-Divisional Magistrate (SDM) / Maintenance Tribunal.",
        "Visit the District Legal Services Authority (DLSA) front office at the District Court or call 15100 for a free appointed advocate.",
        "Gather title deed, property tax receipts, electricity bills, and medical records as proof of ownership and occupancy."
      ];
      referral = "National Senior Citizen Helpline (Elderline): 14567 (Toll-Free) | Police: 112 | NALSA Legal Aid: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-9",
        document_title: "Maintenance and Welfare of Parents and Senior Citizens Act, 2007 — Protection Against Eviction & Section 23",
        page: 1,
        section: isHi ? "धारा 23: संपत्ति हस्तांतरण का शून्य होना" : "Section 23: Transfer of Property to be Void in Certain Circumstances",
        official_url: "https://socialjustice.gov.in/",
        excerpt: "Where any senior citizen has transferred property subject to the condition of care, and the transferee fails to provide it, the transfer shall be deemed void and the Tribunal may restore possession."
      },
      {
        document_id: "doc-1",
        document_title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        page: 1,
        section: "Section 12(c): Entitlement of Women to Free Legal Aid",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every person who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman or child, without any financial ceiling."
      }
    ];
  }

  // ==========================================
  // 4. PROPERTY OWNERSHIP, BROTHER/RELATIVE DISPUTES, ILLEGAL POSSESSION & INJUNCTIONS
  // ==========================================
  else if (
    qLower.includes("owner") && (qLower.includes("property") || qLower.includes("land") || qLower.includes("house") || qLower.includes("flat")) ||
    qLower.includes("withhold") || qLower.includes("withold") || qLower.includes("possession") ||
    (qLower.includes("brother") && (qLower.includes("property") || qLower.includes("land") || qLower.includes("house") || qLower.includes("share"))) ||
    qLower.includes("encroach") || qLower.includes("land grabbing") || qLower.includes("trespass") ||
    query.includes("संपत्ति") || query.includes("कब्जा") || query.includes("जमीन") || query.includes("मकान") || query.includes("भाई") || query.includes("मालिकाना")
  ) {
    topic = "Property Ownership & Civil Injunction Rights";
    if (isHi) {
      content = "⚖️ **संपत्ति के वास्तविक मालिक के वैधानिक अधिकार एवं अवैध कब्जे से सुरक्षा:**\n\nयदि आप संपत्ति के विधिक रूप से पंजीकृत मालिक (Registered Title Owner) हैं, तो **भारतीय कानून के तहत कोई भी व्यक्ति—चाहे वह आपका सगा भाई या कोई रिश्तेदार ही क्यों न हो—बिना वैधानिक प्रक्रिया के आपकी संपत्ति पर अवैध कब्जा नहीं कर सकता और न ही आपको आपकी संपत्ति से बेदखल कर सकता है**। आपके पास निम्नलिखित सशक्त कानूनी उपाय उपलब्ध हैं:\n\n### 1. दीवानी अदालत में स्टे आर्डर (Order 39 Rules 1 & 2 CPC)\n• **तत्काल व्यादेश (Temporary Injunction)**: आप सक्षम दीवानी न्यायालय (Civil Court) में 'वाद स्वत्व घोषणा एवं स्थायी निषेधाज्ञा' (Suit for Declaration of Title and Permanent Injunction) दायर कर सकते हैं।\n• अदालत **सिविल प्रक्रिया संहिता (CPC) के आदेश 39 नियम 1 व 2** के तहत तत्काल **स्टे आर्डर (Stay Order)** जारी कर भाई/रिश्तेदार को संपत्ति में प्रवेश करने, निर्माण करने, या किसी तीसरे पक्ष को बेचने से तुरंत रोक सकती है।\n\n### 2. विशिष्ट अनुतोष अधिनियम, 1963 (Specific Relief Act, Sections 5 & 6)\n• धारा 5 व 6 के तहत वैध मालिक को बेदखली की स्थिति में **संपत्ति का त्वरित भौतिक कब्जा (Recovery of Possession)** वापस पाने का पूर्ण अधिकार है।\n\n### 3. आपराधिक कार्रवाई (भारतीय न्याय संहिता, 2023 / BNS)\n• **आपराधिक अतिचार (Criminal Trespass - BNS धारा 329)**: यदि भाई बलपूर्वक संपत्ति में घुसता है या कब्जा करने की धमकी देता है, तो नजदीकी पुलिस स्टेशन में धारा 329 व 351 (आपराधिक धमकी) के तहत प्राथमिकी (FIR) दर्ज कराएं।\n• **जालसाजी व धोखाधड़ी (BNS धारा 318 व 336)**: यदि फर्जी दस्तावेज या रजिस्ट्री बनाने की कोशिश की गई है, तो यह गैर-जमानती धोखाधड़ी का गंभीर अपराध है।\n\n### 4. निःशुल्क कानूनी सहायता (DLSA)\n• यदि आप महिला हैं या आपकी आय विधिक सेवा प्राधिकरण के आय दायरे में आती है, तो आपको **विधिक सेवा प्राधिकरण अधिनियम की धारा 12 के तहत 100% निःशुल्क सरकारी वकील** प्रदान किया जाएगा।";
      points = [
        "पंजीकृत मालिक को कानून के अनुसार सुने बिना कोई भी रिश्तेदार संपत्ति से बेदखल नहीं कर सकता।",
        "सीपीसी के आदेश 39 नियम 1 व 2 के तहत दीवानी अदालत से तत्काल स्टे आर्डर (Injunction) प्राप्त किया जा सकता है।",
        "बलपूर्वक कब्जे की स्थिति में बीएनएस धारा 329 (आपराधिक अतिचार) के तहत पुलिस एफआईआर और धारा 12 में मुफ्त वकील का अधिकार है।"
      ];
      nextSteps = [
        "रजिस्ट्री डीड, खतौनी/जमाबंदी (Revenue Records), म्यूटेशन और टैक्स रसीदें तुरंत सुरक्षित करें।",
        "वकील के माध्यम से भाई को औपचारिक कानूनी नोटिस (Legal Demand Notice) भेजें।",
        "सिविल जज की अदालत में आदेश 39 सीपीसी के तहत अंतरिम स्टे आर्डर (Injunction) के लिए याचिका दायर करें।",
        "निःशुल्क विधिक सलाह व सरकारी वकील के लिए जिला न्यायालय के DLSA फ्रंट ऑफिस जाएं या 15100 पर कॉल करें।"
      ];
      referral = "जिला विधिक सेवा प्राधिकरण (DLSA) | राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 | eCourts: https://ecourts.gov.in/";
    } else {
      content = "⚖️ **Statutory Protections & Remedies for Registered Property Owners under Indian Law:**\n\nIf you are the lawful, registered title holder of the property, **Indian law strictly prohibits any person—including a sibling, brother, or relative—from unlawfully withholding, trespassing upon, or dispossessing you of your property without due process of law**. You have robust civil and criminal remedies available:\n\n### 1. Civil Injunction & Stay Order (Order 39 Rules 1 & 2 CPC)\n• **Suit for Declaration & Permanent Injunction**: You can immediately file a civil suit before the Civil Judge / District Court asserting your registered title.\n• **Interim Injunction (Stay Order)**: Under **Order 39, Rules 1 and 2 of the Code of Civil Procedure, 1908 (CPC)**, the court can pass an urgent interim stay order restraining your brother from interfering with your possession, altering the property, or creating third-party rights/sale deeds.\n\n### 2. Recovery of Possession (Sections 5 & 6, Specific Relief Act, 1963)\n• If dispossessed by force or stealth, Section 6 of the Specific Relief Act allows a lawful occupant to recover immediate possession within 6 months through a summary proceeding, irrespective of protracted title disputes.\n\n### 3. Criminal Action under Bharatiya Nyaya Sanhita, 2023 (BNS) / IPC\n• **Criminal Trespass (Section 329 BNS / former Section 441 IPC)**: Unlawfully entering or withholding property to intimidate or annoy the owner is a punishable criminal offense. You can lodge an immediate police complaint.\n• **Cheating & Forgery (Sections 318 & 336 BNS / former Sections 420 & 468 IPC)**: Attempting to fabricate revenue mutations, sale agreements, or power of attorney carries up to 7 years imprisonment.\n\n### 4. 100% Free Legal Representation (Section 12)\n• If you are a woman (under Section 12(c)) or qualify under statutory income thresholds, the **District Legal Services Authority (DLSA)** will assign a competent civil panel advocate to handle your injunction suit with full waiver of court fees.";
      points = [
        "A registered title owner cannot be lawfully dispossessed without a decree from a competent court.",
        "Under Order 39 Rules 1 & 2 CPC, you can secure an immediate court Injunction / Stay Order against your brother.",
        "Criminal trespass under Section 329 BNS allows lodging an FIR, and DLSA provides free advocate assistance under Section 12."
      ];
      nextSteps = [
        "Retrieve and secure original registered Sale Deed, Title Deeds, Jamabandi/Khatauni, and property tax receipts.",
        "Obtain a certified Non-Encumbrance Certificate (EC) from the Sub-Registrar's Office to ensure no fraudulent transactions occurred.",
        "Issue a formal Advocate's Legal Cease & Desist Notice to your brother via Registered Post.",
        "File an Injunction Suit with an urgent Stay application under Order 39 CPC at your local District Court or apply to DLSA via 15100."
      ];
      referral = "eCourts Services: https://ecourts.gov.in/ | NALSA Free Legal Aid: 15100 (Toll-Free) | DLSA Front Office";
    }
    sourcesCited = [
      {
        document_id: "doc-10",
        document_title: "Specific Relief Act, 1963 & Code of Civil Procedure, 1908 — Property Rights, Injunction & Possession",
        page: 1,
        section: isHi ? "धारा 5, 6 व आदेश 39 सीपीसी: कब्जा व स्टे आर्डर" : "Sections 5, 6 & Order 39 CPC: Ownership, Possession & Temporary Injunctions",
        official_url: "https://lawmin.gov.in/",
        excerpt: "A person entitled to the possession of specific immovable property may recover it. The court may grant a temporary injunction to restrain dispossession or damage."
      },
      {
        document_id: "doc-6",
        document_title: "Bharatiya Nyaya Sanhita, 2023 (BNS) — Section 329 Criminal Trespass",
        page: 65,
        section: "Section 329: Criminal Trespass & Intimidation",
        official_url: "https://www.mha.gov.in/",
        excerpt: "Whoever enters into or upon property in the possession of another with intent to commit an offense or intimidate, insult or annoy is guilty of criminal trespass."
      }
    ];
  }

  // ==========================================
  // 5. DOMESTIC VIOLENCE, SPOUSAL ASSAULT, SLAPPING & WOMEN'S RELIEF
  // ==========================================
  else if (
    qLower.includes("slap") || qLower.includes("slapped") ||
    qLower.includes("husband") || qLower.includes("pati") ||
    qLower.includes("beat") || qLower.includes("beaten") ||
    qLower.includes("hit") || qLower.includes("assault") ||
    qLower.includes("domestic violence") || qLower.includes("dv act") ||
    qLower.includes("abuse") || qLower.includes("abusive") ||
    qLower.includes("marpeet") || qLower.includes("maar peet") ||
    qLower.includes("in-laws") || qLower.includes("sasural") ||
    qLower.includes("498a") || qLower.includes("dowry") ||
    qLower.includes("dahej") || qLower.includes("cruelty") ||
    query.includes("थप्पड़") || query.includes("मारपीट") ||
    query.includes("घरेलू हिंसा") || query.includes("पति") ||
    query.includes("ससुराल") || query.includes("दहेज") || query.includes("क्रूरता")
  ) {
    topic = "Domestic Violence & Women's Legal Protection";
    if (isHi) {
      content = "⚖️ **घरेलू हिंसा एवं महिलाओं के वैधानिक अधिकार व तत्काल कदम:**\n\nपति या ससुराल पक्ष द्वारा शारीरिक मारपीट (जैसे थप्पड़ मारना, पीटना) या प्रताड़ना भारतीय कानून में एक दंडनीय व गैरकानूनी कृत्य है। आपको निम्नलिखित वैधानिक अधिकार, अदालती सुरक्षा और सरकारी सहायता प्राप्त है:\n\n### 1. तत्काल सुरक्षा एवं चिकित्सीय साक्ष्य (पहले 24 घंटे)\n• **आपातकालीन हेल्पलाइन**: यदि आप तत्काल खतरे में हैं, तो तुरंत **112 (राष्ट्रीय आपातकालीन सेवा)** या **1091 (महिला हेल्पलाइन)** अथवा **7827170170 (राष्ट्रीय महिला आयोग - NCW)** पर कॉल करें।\n• **एमएलसी (Medico-Legal Certificate)**: यदि चोट लगी है, तो तुरंत निकटतम सरकारी अस्पताल जाएं और डॉक्टर को बताएं कि पति ने मारपीट की है। डॉक्टर द्वारा बनाई गई एमएलसी रिपोर्ट अदालत में अचूक साक्ष्य (Admissible Evidence) बनती है।\n• **साक्ष्य सुरक्षित रखें**: चोट के निशान के फोटो, फटे कपड़े, धमकी भरे संदेश या ऑडियो-वीडियो रिकॉर्डिंग सुरक्षित रखें।\n\n### 2. घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 (PWDVA) के तहत दीवानी सुरक्षा\nआप सीधे अपने जिले के **संरक्षण अधिकारी (Protection Officer)** या **मजिस्ट्रेट** के समक्ष धारा 12 के तहत आवेदन कर सकती हैं:\n• **धारा 18 (संरक्षण आदेश - Protection Order)**: मजिस्ट्रेट पति या ससुराल वालों को आगे किसी भी प्रकार की हिंसा करने, संपर्क करने या आपके कार्यस्थल पर आने से रोकने का सख्त आदेश जारी कर सकते हैं।\n• **धारा 19 (साझा घर में निवास का अधिकार - Residence Order)**: आपको अपने **साझा घर (Matrimonial Home)** में रहने का पूर्ण कानूनी अधिकार है। पति या ससुराल वाले आपको घर से बाहर नहीं निकाल सकते।\n• **धारा 20 (मौद्रिक राहत व भरण-पोषण)**: अदालत इलाज के खर्च, हुए नुकसान और आपके तथा बच्चों के मासिक भरण-पोषण का अंतरिम आदेश दे सकती है।\n\n### 3. भारतीय न्याय संहिता, 2023 (BNS) के तहत आपराधिक कार्रवाई\n• **धारा 85 व 86 BNS 2023** (पूर्व IPC धारा 498A): पति या उसके रिश्तेदारों द्वारा महिला के साथ शारीरिक या मानसिक क्रूरता करना एक गैर-जमानती संज्ञेय अपराध है, जिसमें **3 साल तक का कारावास और जुर्माना** है।\n• **धारा 115 BNS 2023** (पूर्व IPC धारा 323): जानबूझकर शारीरिक चोट पहुंचाना (मारपीट/थप्पड़)।\n• **जीरो एफआईआर (Zero FIR - धारा 173(4) BNSS)**: आप किसी भी नजदीकी पुलिस स्टेशन में तुरंत एफआईआर दर्ज करा सकती हैं, चाहे घटना कहीं भी हुई हो।\n\n### 4. 100% निःशुल्क कानूनी सहायता एवं सरकारी वकील (धारा 12(c))\n• **विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12(c)** के तहत **सभी महिलाएं बिना किसी आय सीमा के 100% निःशुल्क वकील और कोर्ट फीस माफी की हकदार हैं**।\n• अपने जिला न्यायालय परिसर में स्थित **जिला विधिक सेवा प्राधिकरण (DLSA)** के फ्रंट ऑफिस से तुरंत निःशुल्क पैनल वकील प्राप्त करें।";
      points = [
        "थप्पड़ मारना या शारीरिक मारपीट घरेलू हिंसा अधिनियम (PWDVA) की धारा 3 तथा BNS की धारा 85/115 के तहत दंडनीय अपराध है।",
        "धारा 18 व 19 PWDVA के तहत अदालत से तत्काल सुरक्षा आदेश मिल सकता है तथा आपको ससुराल से बेदखल नहीं किया जा सकता।",
        "विधिक सेवा प्राधिकरण अधिनियम की धारा 12(c) के तहत सभी महिलाएं अदालत में 100% निःशुल्क वकील पाने की पात्र हैं।"
      ];
      nextSteps = [
        "तत्काल खतरे की स्थिति में 1091 (महिला हेल्पलाइन) या 112 (पुलिस) पर कॉल करें।",
        "सरकारी अस्पताल जाकर चोट का मेडिको-लीगल सर्टिफिकेट (MLC) बनवाएं।",
        "जिला न्यायालय परिसर में स्थित DLSA कार्यालय जाएं या 15100 पर कॉल करके निःशुल्क सरकारी वकील प्राप्त करें।",
        "अपने जिले के संरक्षण अधिकारी (Protection Officer) से संपर्क कर घरेलू हिंसा अधिनियम की धारा 12 में आवेदन कराएं।"
      ];
      referral = "राष्ट्रीय महिला आयोग (NCW): 7827170170 | महिला हेल्पलाइन: 1091 | पुलिस: 112 | NALSA मुफ्त कानूनी सहायता: 15100 (टोल-फ्री)";
    } else {
      content = "⚖️ **Immediate Legal Protections & Actionable Steps under Indian Law:**\n\nPhysical assault or abuse by a husband or in-laws (such as slapping, beating, or verbal harassment) is a serious statutory violation under both civil and criminal law in India. You are protected by immediate statutory remedies, emergency orders, and state-funded legal aid:\n\n### 1. Immediate Safety & Medical Evidence (First 24 Hours)\n• **Emergency Helplines**: If in immediate danger, call **112 (National Emergency Helpline)**, **1091 (Women's Helpline)**, or **7827170170 (National Commission for Women - NCW)**.\n• **Medico-Legal Certificate (MLC)**: If you suffered physical injury, visit the nearest Government Hospital or Primary Health Centre (PHC) immediately. Inform the examining doctor that the injury resulted from spousal assault. The doctor is statutorily mandated to issue an MLC, which serves as indisputable, court-admissible medical evidence.\n• **Preserve Evidence**: Photograph all visible injuries/bruises, keep torn clothing, preserve abusive text/WhatsApp messages, call recordings, or threat notes.\n\n### 2. Civil Protections under Protection of Women from Domestic Violence Act, 2005 (PWDVA)\nYou or an appointed advocate can file an application before the Judicial Magistrate under **Section 12 of PWDVA** for immediate statutory relief:\n• **Section 18 (Protection Orders)**: The Magistrate can pass ex-parte orders prohibiting your husband and in-laws from committing further violence, attempting communication, or entering your residence or workplace.\n• **Section 19 (Residence Orders)**: You possess an absolute statutory right to reside in the **shared household** (matrimonial home). Your husband cannot legally evict, lock out, or dispossess you. If unsafe, the court can direct him to provide alternative accommodation or pay rent.\n• **Section 20 (Monetary Relief)**: The court can mandate immediate reimbursement for medical expenses, loss of income, and monthly maintenance for you and your minor children.\n• **Section 21 & 22 (Child Custody & Compensation)**: Temporary custody of minor children and financial compensation for mental trauma.\n\n### 3. Criminal Prosecution under Bharatiya Nyaya Sanhita, 2023 (BNS) / IPC\n• **Sections 85 & 86 of BNS 2023** (formerly Section 498A IPC): Subjecting a married woman to physical or mental cruelty by her husband or relatives is a cognizable, non-bailable offense carrying **rigorous imprisonment up to 3 years and fine**.\n• **Section 115 of BNS 2023** (formerly Section 323 IPC): Voluntarily causing hurt through physical assault (slapping, kicking, hitting).\n• **Zero FIR Right (Section 173(4) BNSS)**: You can register an FIR at *any* police station nearest to you, regardless of jurisdictional boundaries.\n\n### 4. 100% Free Legal Representation (Section 12(c))\n• Under **Section 12(c) of the Legal Services Authorities Act, 1987**, **all women are entitled to 100% free legal aid, free panel advocates, and full court fee waivers**, without any income ceiling or financial means test.\n• The District Legal Services Authority (DLSA) front office at your local District Court will assign a qualified panel lawyer to represent you free of charge.";
      points = [
        "Physical assault or slapping is an offense under Section 3 of PWDVA 2005 and Section 85/115 of BNS 2023.",
        "Under Section 18 & 19 of PWDVA, you can obtain immediate court protection orders and cannot be legally evicted from the matrimonial home.",
        "Section 12(c) of the Legal Services Authorities Act, 1987 guarantees 100% free legal aid and a state panel advocate for all women."
      ];
      nextSteps = [
        "Prioritize physical safety and dial 1091 (Women's Helpline) or 112 if in imminent danger.",
        "Obtain a Medico-Legal Certificate (MLC) from a government hospital to document injury evidence.",
        "Visit your District Legal Services Authority (DLSA) front office at the District Court or call 15100 for a free assigned advocate.",
        "Contact your local Protection Officer or file an application under Section 12 of the Domestic Violence Act before the Judicial Magistrate."
      ];
      referral = "National Commission for Women (NCW): 7827170170 | Women Helpline: 1091 | Emergency: 112 | NALSA Free Legal Aid: 15100 (Toll-Free)";
    }
    sourcesCited = [
      {
        document_id: "doc-5",
        document_title: "Protection of Women from Domestic Violence Act, 2005 (PWDVA) — Sections 3, 12, 18, 19 & 20",
        page: 1,
        section: isHi ? "धारा 3, 18 व 19: घरेलू हिंसा की परिभाषा एवं संरक्षण आदेश" : "Sections 3, 18 & 19: Domestic Violence Definition & Protection Orders",
        official_url: "https://wcd.nic.in/",
        excerpt: "Domestic violence includes physical abuse, sexual abuse, verbal and emotional abuse and economic abuse. The Magistrate may pass a protection order prohibiting the respondent from committing any act of domestic violence."
      },
      {
        document_id: "doc-6",
        document_title: "Bharatiya Nyaya Sanhita, 2023 (BNS) — Sections 85 & 86 (Cruelty) & Section 115 (Voluntarily Causing Hurt)",
        page: 24,
        section: isHi ? "धारा 85 व 115: पति द्वारा क्रूरता एवं स्वेच्छा से चोट पहुंचाना" : "Sections 85 & 115: Cruelty by Husband/Relatives & Causing Hurt",
        official_url: "https://www.mha.gov.in/",
        excerpt: "Whoever, being the husband or relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment for a term which may extend to three years and shall also be liable to fine."
      },
      {
        document_id: "doc-1",
        document_title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        page: 1,
        section: "Section 12(c): Free Legal Aid for Women",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every person who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman or child, without any ceiling on annual income."
      }
    ];
  }

  // ==========================================
  // 6. INHERITANCE, WILL, SUCCESSION & ANCESTRAL PROPERTY PARTITION
  // ==========================================
  else if (
    qLower.includes("inheritance") || qLower.includes("ancestral property") || qLower.includes("will") ||
    qLower.includes("succession") || qLower.includes("father's property") || qLower.includes("daughter share") ||
    qLower.includes("equal share") || query.includes("वारिस") || query.includes("विरासत") || query.includes("बंटवारा") || query.includes("वसीयत")
  ) {
    topic = "Inheritance & Succession Rights";
    if (isHi) {
      content = "**भारतीय उत्तराधिकार कानून एवं पैतृक संपत्ति में अधिकारों का वैधानिक ढांचा:**\n\n1. **बेटियों का समान कानूनी अधिकार (Hindu Succession Act, Section 6)**:\n   • सुप्रीम कोर्ट के ऐतिहासिक निर्णय (*विनीता शर्मा बनाम राकेश शर्मा, 2020*) के अनुसार, बेटियों को बेटों के समान जन्म से ही पैतृक संपत्ति में बराबर का सहदायिक (Coparcenary) अधिकार प्राप्त है, चाहे पिता 2005 से पहले जीवित रहे हों या नहीं।\n2. **बिना वसीयत मृत्यु (Intestate Succession)**:\n   • यदि किसी व्यक्ति की मृत्यु बिना वसीयत बनाए होती है, तो संपत्ति क्लास-1 उत्तराधिकारियों (विधवा, पुत्र, पुत्री और माता) में बिल्कुल बराबर बांटी जाती है।\n3. **विभाजन वाद (Partition Suit)**:\n   • यदि सह-हिस्सेदार हिस्सा देने से मना करते हैं, तो दीवानी न्यायालय में विभाजन वाद (Partition Suit) दायर करके अपना कानूनी हिस्सा और अलग कब्जा प्राप्त किया जा सकता है।";
      points = [
        "हिंदू उत्तराधिकार अधिनियम 1956 की धारा 6 के तहत बेटियों को पैतृक संपत्ति में बेटों के बराबर अधिकार प्राप्त है।",
        "क्लास-1 वारिसों में विधवा, बेटे, बेटियां और माता बराबर हिस्सेदार होते हैं।",
        "हिस्सा न मिलने पर दीवानी अदालत में विभाजन वाद (Partition Suit) दायर किया जा सकता है।"
      ];
      nextSteps = [
        "पारिवारिक वंशावली (Family Tree/Pedigree) और संपत्ति के राजस्व दस्तावेज तैयार करें।",
        "अधिवक्ता के माध्यम से विभाजन का औपचारिक कानूनी नोटिस भेजें।",
        "दीवानी अदालत में विभाजन वाद (Partition Suit) दायर करें या DLSA से सहायता लें।"
      ];
      referral = "eCourts Services: https://ecourts.gov.in/ | NALSA हेल्पलाइन: 15100";
    } else {
      content = "**Statutory Framework for Inheritance & Ancestral Property Rights under Indian Law:**\n\n1. **Equal Coparcenary Rights for Daughters (Hindu Succession Act, Section 6)**:\n   • As settled by the Supreme Court in *Vineeta Sharma v. Rakesh Sharma (2020)*, daughters have an equal coparcenary right by birth in ancestral property, on equal footing with sons, with all corresponding liabilities and rights.\n2. **Intestate Succession (Without a Will)**:\n   • Under Section 8 of the Hindu Succession Act, if a male Hindu dies without a will, the property devolves equally among Class-I legal heirs: widow, sons, daughters, and mother.\n3. **Partition Suit in Civil Court**:\n   • If co-heirs refuse to partition the property amicably, any legal heir has the statutory right to institute a Suit for Partition & Separate Possession before the competent Civil Court.";
      points = [
        "Daughters possess equal coparcenary rights by birth in ancestral properties under Section 6 of Hindu Succession Act.",
        "Class-I legal heirs inherit equal shares in self-acquired property if no will exists.",
        "Partition suits can be filed in Civil Court for demarcated physical possession."
      ];
      nextSteps = [
        "Obtain certified copies of property records, death certificate, and Legal Heir Certificate / Surviving Member Certificate.",
        "Issue a formal legal notice seeking partition through an advocate.",
        "Approach the DLSA front office for a free appointed advocate if eligible under Section 12."
      ];
      referral = "National Legal Services Authority: https://nalsa.gov.in/legal-aid/ | Toll-Free: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-10",
        document_title: "Hindu Succession Act, 1956 & Code of Civil Procedure — Inheritance Rights",
        page: 1,
        section: "Section 6: Devolution of Interest in Coparcenary Property",
        official_url: "https://lawmin.gov.in/",
        excerpt: "The daughter of a coparcener shall by birth become a coparcener in her own right the same way as the son and have the same rights in the coparcenary property."
      }
    ];
  }

  // ==========================================
  // 7. POLICE REFUSAL TO REGISTER FIR / ZERO FIR
  // ==========================================
  else if (
    qLower.includes("police refused") || qLower.includes("police refusing") || qLower.includes("not registering fir") ||
    qLower.includes("refuse fir") || qLower.includes("zero fir") || qLower.includes("fir darj") ||
    qLower.includes("fir nahi") || query.includes("एफआईआर") || query.includes("पुलिस नहीं लिख रही")
  ) {
    topic = "Criminal Procedure & Police Accountability";
    if (isHi) {
      content = "**भारतीय नागरिक सुरक्षा संहिता, 2023 (BNSS) की धारा 173 के तहत संज्ञेय अपराध में एफआईआर (FIR) दर्ज करना पुलिस के लिए अनिवार्य है:**\n\n1. **अनिवार्य एफआईआर (धारा 173(1))**: संज्ञेय अपराध (Cognizable Offense) की सूचना मिलने पर पुलिस अधिकारी एफआईआर दर्ज करने से इनकार नहीं कर सकता (ललिता कुमारी बनाम उत्तर प्रदेश निर्णय)।\n2. **जीरो एफआईआर (Zero FIR - धारा 173(4))**: यदि अपराध किसी अन्य पुलिस स्टेशन के अधिकार क्षेत्र में हुआ है, तब भी नजदीकी पुलिस स्टेशन को 'Zero FIR' दर्ज करनी होगी और बाद में उसे संबंधित थाने को स्थानांतरित करना होगा।\n3. **यदि पुलिस एफआईआर दर्ज करने से मना करे तो क्या करें?**:\n   • **पुलिस अधीक्षक (SP/DCP) को लिखित शिकायत**: धारा 173(3) BNSS के तहत डाक या व्यक्तिगत रूप से एसपी/डीसीपी को लिखित शिकायत भेजें।\n   • **मजिस्ट्रेट के समक्ष आवेदन**: धारा 175(3) BNSS (पूर्व 156(3) CrPC) के तहत न्यायिक मजिस्ट्रेट के समक्ष परिवाद दायर करें, जहां अदालत पुलिस को एफआईआर दर्ज करने का आदेश दे सकती है।";
      points = [
        "संज्ञेय अपराधों में धारा 173(1) BNSS के तहत एफआईआर दर्ज करना पुलिस के लिए अनिवार्य है।",
        "जीरो एफआईआर किसी भी नजदीकी पुलिस थाने में बिना क्षेत्राधिकार विवाद के दर्ज कराई जा सकती है।",
        "इनकार की स्थिति में धारा 173(3) के तहत एसपी या धारा 175(3) के तहत मजिस्ट्रेट के समक्ष शिकायत की जा सकती है।"
      ];
      nextSteps = [
        "लिखित शिकायत की पावती (Receiving / Acknowledgment copy) पर पुलिस मोहर जरूर लें।",
        "एसपी कार्यालय में डाक द्वारा शिकायत भेजें और पोस्टल रसीद सुरक्षित रखें।",
        "मुफ्त वकील की सहायता के लिए अपने जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।"
      ];
      referral = "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 | NALSA: https://nalsa.gov.in/legal-aid/";
    } else {
      content = "**Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS), registration of an FIR is mandatory for cognizable offenses:**\n\n1. **Mandatory FIR Registration (Section 173(1))**: Police cannot refuse to register an FIR when information disclosing a cognizable offense is presented (Supreme Court in *Lalita Kumari*).\n2. **Zero FIR Statutory Recognition (Section 173(4))**: If an offense took place outside a police station's jurisdiction, that station MUST still register a 'Zero FIR' immediately, provide a free copy to the complainant, and transfer the case to the competent jurisdiction.\n3. **Statutory Recourse if Police Refuse Registration**:\n   • **Report to Superintendent of Police (SP / DCP)**: Under Section 173(3) BNSS, send the complaint in writing by registered speed post to the District Superintendent of Police.\n   • **Magistrate Complaint (Section 175(3) BNSS)**: You can approach the Judicial Magistrate under Section 175(3) (formerly 156(3) CrPC), where the court can direct police to register the FIR and investigate.";
      points = [
        "FIR registration is mandatory for cognizable offenses under Section 173(1) BNSS.",
        "Zero FIR allows lodging an FIR at any police station regardless of crime location.",
        "Complainants can escalate refusal to the Superintendent of Police (173(3)) or Judicial Magistrate (175(3))."
      ];
      nextSteps = [
        "Keep a signed copy and stamped receipt of your written police complaint.",
        "Send the complaint via speed post to the Superintendent of Police (SP/DCP) with post tracking.",
        "Approach the DLSA front office at the District Court for free advocate assistance to file under Section 175(3)."
      ];
      referral = "National Legal Services Authority: https://nalsa.gov.in/legal-aid/ | Toll-Free: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-7",
        document_title: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 173 Mandatory FIR & Zero FIR",
        page: 1,
        section: "Section 173: Information in Cognizable Cases & Zero FIR",
        official_url: "https://www.mha.gov.in/",
        excerpt: "Every information relating to the commission of a cognizable offense shall be recorded in an information book. A zero FIR may be registered at any police station irrespective of the area where the crime was committed."
      }
    ];
  }

  // ==========================================
  // 8. CHEQUE BOUNCE (SECTION 138 NI ACT)
  // ==========================================
  else if (
    qLower.includes("cheque bounce") || qLower.includes("check bounce") || qLower.includes("dishonour of cheque") ||
    qLower.includes("insufficient funds") || qLower.includes("section 138") || qLower.includes("138 ni act") ||
    query.includes("चेक बाउंस") || query.includes("चेक अनादर")
  ) {
    topic = "Banking & Negotiable Instruments";
    if (isHi) {
      content = "**परक्राम्य लिखत अधिनियम, 1881 की धारा 138 के तहत चेक बाउंस होना एक दंडनीय आपराधिक कृत्य है:**\n\n1. **अनिवार्य वैधानिक समय-सीमा**:\n   • बैंक से चेक अनादर मेमो मिलने के **30 दिनों के भीतर** देनदार को कानूनी नोटिस (Legal Demand Notice) भेजना अनिवार्य है।\n   • नोटिस मिलने के बाद देनदार को भुगतान के लिए **15 दिनों का समय** दिया जाता है।\n   • यदि 15 दिन में भुगतान नहीं होता है, तो अगले **30 दिनों के भीतर** सक्षम न्यायिक मजिस्ट्रेट की अदालत में आपराधिक परिवाद दायर करना होता है।\n2. **सजा व जुर्माना**:\n   • दोषी पाए जाने पर **2 वर्ष तक का कारावास** अथवा **चेक की राशि का दोगुना तक जुर्माना** अथवा दोनों की सजा हो सकती है।";
      points = [
        "चेक बाउंस होने के 30 दिनों के भीतर धारा 138 का कानूनी नोटिस भेजना अनिवार्य है।",
        "देनदार को भुगतान के लिए 15 दिन का वैधानिक अवसर मिलता है।",
        "भुगतान न होने पर चेक राशि से दोगुना तक जुर्माना और 2 वर्ष तक का कारावास हो सकता है।"
      ];
      nextSteps = [
        "मूल चेक और बैंक का चेक रिटर्न मेमो सुरक्षित रखें।",
        "अधिवक्ता के माध्यम से रजिस्टर्ड डाक द्वारा 30 दिनों में धारा 138 का कानूनी नोटिस भेजें।",
        "यदि 15 दिनों में भुगतान न मिले, तो 30 दिनों के भीतर अदालत में परिवाद दर्ज कराएं।"
      ];
      referral = "राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA): https://nalsa.gov.in/legal-aid/ | हेल्पलाइन: 15100";
    } else {
      content = "**Under Section 138 of the Negotiable Instruments Act, 1881, dishonour of a cheque due to insufficiency of funds is a punishable criminal offense:**\n\n1. **Mandatory Statutory Timelines**:\n   • **Demand Notice**: A formal legal demand notice must be dispatched via registered post within **30 days** of receiving the Cheque Return Memo from the bank.\n   • **Cure Period**: The drawer of the cheque is granted **15 days** from receipt of notice to make payment.\n   • **Court Filing**: If payment is not made within 15 days, a criminal complaint must be instituted within **30 days** thereafter before the competent Judicial Magistrate.\n2. **Statutory Penalties**:\n   • Imprisonment for a term extending up to **2 years**, or with a **fine up to twice the amount of the cheque**, or both.";
      points = [
        "Statutory demand notice must be issued within 30 days of receiving the cheque dishonour memo.",
        "Drawer receives a 15-day cure period before criminal prosecution can be filed.",
        "Punishable with up to 2 years imprisonment or fine up to double the cheque value."
      ];
      nextSteps = [
        "Preserve the original bounced cheque and the bank's written return memo.",
        "Dispatch a formal Section 138 statutory notice via registered post with acknowledgment card.",
        "Consult DLSA or an empanelled lawyer if the 15-day cure window lapses without payment."
      ];
      referral = "Department of Financial Services: https://financialservices.gov.in/ | NALSA: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-8",
        document_title: "Negotiable Instruments Act, 1881 — Section 138 Dishonour of Cheque",
        page: 1,
        section: "Section 138: Dishonour of Cheque for Insufficiency of Funds",
        official_url: "https://financialservices.gov.in/",
        excerpt: "Where any cheque drawn by a person on an account maintained by him with a banker for payment of any money is returned by the bank unpaid, such person shall be deemed to have committed an offense."
      }
    ];
  }

  // ==========================================
  // 9. CYBER FRAUD, UPI SCAMS & BANKING FRAUD
  // ==========================================
  else if (
    qLower.includes("cyber") || qLower.includes("online fraud") || qLower.includes("bank fraud") ||
    qLower.includes("upi fraud") || qLower.includes("scam") || qLower.includes("money stolen") ||
    qLower.includes("otp fraud") || query.includes("साइबर") || query.includes("ऑनलाइन फ्रॉड")
  ) {
    topic = "Cybercrime & Financial Fraud";
    if (isHi) {
      content = "**साइबर वित्तीय धोखाधड़ी और ऑनलाइन ठगी की स्थिति में त्वरित वैधानिक कदम एवं सरकारी उपाय:**\n\n1. **गोल्डन आवर (Golden Hour - पहले 2 से 3 घंटे)**: यदि आपके बैंक खाते से धोखाधड़ी से पैसे कटे हैं, तो तत्काल **राष्ट्रीय साइबर हेल्पलाइन 1930** पर कॉल करें। गृह मंत्रालय का CFCFRMS सिस्टम तुरंत लाभार्थी खातों में पैसों के लेन-देन को फ्रीज कर देता है।\n2. **राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल**: घटना की पूरी जानकारी **cybercrime.gov.in** पर तत्काल ऑनलाइन दर्ज करें।\n3. **सूचना प्रौद्योगिकी अधिनियम (IT Act, 2000) व BNS के तहत अपराध**:\n   • **धारा 66D IT Act**: कंप्यूटर संसाधन का उपयोग करके प्रतिरूपण द्वारा धोखाधड़ी करना (3 वर्ष तक कारावास व जुर्माना)।\n   • **BNS धारा 318**: धोखाधड़ी (Cheating) के तहत गैर-जमानती दंडात्मक प्रावधान।";
      points = [
        "पैसे कटने के तुरंत बाद राष्ट्रीय साइबर हेल्पलाइन 1930 पर शिकायत दर्ज कराना सबसे प्रभावी कदम है।",
        "cybercrime.gov.in पोर्टल पर साक्ष्य के साथ साइबर अपराध रिपोर्ट दर्ज करें।",
        "अपने संबंधित बैंक को तत्काल सूचित करके डेबिट कार्ड, यूपीआई और नेट बैंकिंग ब्लॉक कराएं।"
      ];
      nextSteps = [
        "तुरंत 1930 डायल करें और ट्रांजैक्शन आईडी तथा बैंक खाता विवरण दर्ज कराएं।",
        "cybercrime.gov.in पर आधिकारिक शिकायत दर्ज करके पावती संख्या (Acknowledgement Number) प्राप्त करें।",
        "बैंक शाखा में जाकर अनधिकृत लेन-देन (Unauthorized Transaction) का लिखित विवाद फॉर्म जमा करें।"
      ];
      referral = "राष्ट्रीय साइबर हेल्पलाइन: 1930 | साइबर क्राइम पोर्टल: https://cybercrime.gov.in/ | NALSA: 15100";
    } else {
      content = "**In cases of cyber financial fraud and online scams, critical statutory protocols and legal steps must be followed:**\n\n1. **The Golden Hour Protocol (First 2-3 Hours)**: Dial the **National Cyber Financial Fraud Helpline 1930** immediately. Under the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS), nodal officers coordinate with banks and payment gateways to freeze the stolen funds before cash-out.\n2. **National Cybercrime Reporting Portal**: File a comprehensive complaint at **https://cybercrime.gov.in/** with transaction IDs, SMS alerts, and beneficiary details.\n3. **Statutory Penalties under IT Act, 2000 & BNS**:\n   • **Section 66D IT Act**: Cheating by personation by using computer resource (up to 3 years imprisonment and fine).\n   • **Section 318 of BNS 2023**: Criminal fraud and cheating.\n4. **RBI Circular on Zero Liability**: Notifying your bank within 3 working days of an unauthorized electronic transaction establishes zero customer liability if not due to customer negligence.";
      points = [
        "Dialing 1930 during the first 2-3 hours enables immediate fund lien and freeze mechanisms across bank nodes.",
        "Filing on cybercrime.gov.in creates an official statutory inquiry number for police action.",
        "Reporting to your bank within 72 hours invokes RBI's limited liability protections."
      ];
      nextSteps = [
        "Call 1930 immediately to report the transaction ID, account number, and fraud details.",
        "Block credit/debit cards, UPI handles, and net banking via your official bank helpline.",
        "Lodge a digital complaint on https://cybercrime.gov.in/ and obtain the acknowledgment slip."
      ];
      referral = "National Cybercrime Reporting Helpline: 1930 | Portal: https://cybercrime.gov.in/ | NALSA: 15100";
    }
    sourcesCited = [
      {
        document_id: "res-6",
        document_title: "National Cybercrime Reporting Portal & 1930 Helpline",
        page: 1,
        section: "Cyber Financial Fraud Immediate Response Rules",
        official_url: "https://cybercrime.gov.in/",
        excerpt: "The Citizen Financial Cyber Fraud Reporting and Management System facilitates rapid interception of stolen digital money across banking systems."
      }
    ];
  }

  // ==========================================
  // 10. WORKPLACE HARASSMENT & POSH ACT 2013
  // ==========================================
  else if (
    qLower.includes("posh") || qLower.includes("workplace harassment") || qLower.includes("office harassment") ||
    qLower.includes("sexual harassment at workplace") || qLower.includes("internal committee") || query.includes("कार्यस्थल")
  ) {
    topic = "Workplace Rights & POSH Act";
    if (isHi) {
      content = "**कार्यस्थल पर महिलाओं के लैंगिक उत्पीड़न (निवारण, प्रतिषेध एवं प्रतितोष) अधिनियम, 2013 (POSH Act) के तहत महिला कर्मचारियों को पूर्ण सुरक्षा प्राप्त है:**\n\n1. **आंतरिक समिति (Internal Committee - IC)**: 10 या अधिक कर्मचारियों वाले प्रत्येक संस्थान में आंतरिक समिति का गठन अनिवार्य है, जिसकी अध्यक्षता एक वरिष्ठ महिला द्वारा की जाती है।\n2. **शिकायत की समय-सीमा**: घटना के **3 महीने के भीतर** आंतरिक समिति को लिखित शिकायत दी जा सकती है (उचित कारणों पर समिति इसे 3 माह और बढ़ा सकती है)।\n3. **स्थानीय समिति (Local Committee - LC)**: असंगठित क्षेत्र, घरेलू कामगार या नियोक्ता के खिलाफ शिकायत जिला स्तर पर गठित स्थानीय समिति (LC) में की जा सकती है।\n4. **गोपनीयता की सुरक्षा (धारा 16)**: पीड़िता, गवाहों या जांच की जानकारी सार्वजनिक करना गैरकानूनी है।";
      points = [
        "10+ कर्मचारियों वाले प्रत्येक कार्यालय में आंतरिक समिति (IC) का गठन वैधानिक रूप से अनिवार्य है।",
        "शिकायत घटना के 3 माह के भीतर दर्ज कराई जा सकती है।",
        "जांच के दौरान पीड़िता को सवैतनिक अवकाश या अन्य विभाग में स्थानांतरण की अंतरिम राहत मिल सकती है।"
      ];
      nextSteps = [
        "घटना की तारीख, समय, ईमेल या चैट संदेशों का लिखित रिकॉर्ड रखें।",
        "अपने कार्यालय की आंतरिक समिति (IC) को औपचारिक लिखित शिकायत सौंपें।",
        "मुफ्त विधिक सलाह के लिए जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।"
      ];
      referral = "महिला एवं बाल विकास मंत्रालय: https://wcd.nic.in/ | NALSA हेल्पलाइन: 15100";
    } else {
      content = "**Under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act), women enjoy strong statutory safeguards:**\n\n1. **Mandatory Internal Committee (IC)**: Every workplace with 10 or more employees must constitute an Internal Committee headed by a senior female employee with an external NGO member.\n2. **Filing Window**: A complaint must be submitted in writing within **3 months** of the incident (extendable by an additional 3 months for justified delays).\n3. **Local Committee (LC)**: In establishments with fewer than 10 workers or where the complaint is against the employer, complaints lie before the District Local Committee.\n4. **Interim Reliefs during Inquiry**: The IC can recommend transferring the aggrieved woman or the respondent, or granting the complainant leave up to 3 months.";
      points = [
        "POSH Act mandates an Internal Committee in every establishment with 10+ employees.",
        "Statutory complaint timeline is 3 months from the date of the incident.",
        "Section 16 strictly prohibits public disclosure of complainant identity or inquiry details."
      ];
      nextSteps = [
        "Document evidence (messages, emails, witnesses, dates) meticulously.",
        "Submit a formal written complaint to your organisation's Internal Committee presiding officer.",
        "Approach the District Legal Services Authority (DLSA) front office for free legal assistance."
      ];
      referral = "Ministry of Women and Child Development: https://wcd.nic.in/ | Legal Aid Helpline: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-5",
        document_title: "Protection of Women from Domestic Violence & Workplace Protections Overview",
        page: 1,
        section: "Workplace Harassment Redressal Provisions",
        official_url: "https://wcd.nic.in/",
        excerpt: "An Act to provide protection against sexual harassment of women at workplace and for the prevention and redressal of complaints of sexual harassment."
      }
    ];
  }

  // ==========================================
  // 11. TENANCY, RENT & EVICTION SAFEGUARDS
  // ==========================================
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
        section: "Sections 2 & 20: Security Deposit & Essential Amenities",
        official_url: "https://mohua.gov.in/",
        excerpt: "The security deposit to be paid by the tenant in advance shall not exceed two months' rent for residential premises and no landlord shall disconnect essential supply."
      }
    ];
  }

  // ==========================================
  // 12. MOTOR VEHICLES ACT & TRAFFIC HELMET CHALLAN (SECTION 194D)
  // ==========================================
  else if (
    qLower.includes("helmet") || qLower.includes("194d") || qLower.includes("challan") ||
    qLower.includes("traffic") || qLower.includes("driving license") || query.includes("हेलमेट") || query.includes("चालान")
  ) {
    topic = "Road Transport & Traffic Laws";
    if (isHi) {
      content = "**मोटर वाहन (संशोधन) अधिनियम, 2019 की धारा 194D के तहत बिना हेलमेट दोपहिया वाहन चलाने पर निम्नलिखित वैधानिक दंड निर्धारित हैं:**\n\n1. **आर्थिक जुर्माना**: बिना मानक हेलमेट दोपहिया वाहन चलाने पर **₹1,000 (एक हजार रुपये)** का वैधानिक चालान।\n2. **ड्राइविंग लाइसेंस का निलंबन**: चालक का ड्राइविंग लाइसेंस **3 महीने की अवधि के लिए अयोग्य (Disqualified/Suspended)** किया जा सकता है।\n3. **सह-यात्री नियम**: पीछे बैठने वाले (Pillion Rider) के लिए भी सुरक्षा मानक वाला बीआईएस (BIS) प्रमाणित हेलमेट पहनना अनिवार्य है।";
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
        section: "Section 194D: Protective Headgear Violations",
        official_url: "https://morth.nic.in/",
        excerpt: "Whoever drives a motorcycle or causes or allows a motorcycle to be driven in contravention of section 129 shall be punishable with fine of one thousand rupees and disqualified for three months."
      }
    ];
  }

  // ==========================================
  // 13. CONSUMER PROTECTION & DEFECTIVE MERCHANDISE
  // ==========================================
  else if (
    qLower.includes("consumer") || qLower.includes("defective") || qLower.includes("refund") ||
    qLower.includes("product") || qLower.includes("warranty") || query.includes("उपभोक्ता") || query.includes("दोषपूर्ण") || query.includes("रिफंड")
  ) {
    topic = "Consumer Protection";
    if (isHi) {
      content = "**उपभोक्ता संरक्षण अधिनियम, 2019 के तहत भारतीय उपभोक्ताओं को दोषपूर्ण वस्तुओं, अनुचित व्यापार और सेवा में कमी के विरुद्ध सशक्त वैधानिक अधिकार दिए गए हैं:**\n\n1. **उपभोक्ता अधिकार (धारा 2(9))**: सुरक्षा, सूचना, चयन, सुनवाई और क्षतिपूर्ति पाने का अधिकार।\n2. **त्रि-स्तरीय निवारण मंच**:\n   • **जिला उपभोक्ता आयोग**: ₹50 लाख तक के दावों के लिए।\n   • **राज्य उपभोक्ता आयोग**: ₹50 लाख से ₹2 करोड़ तक।\n   • **राष्ट्रीय आयोग (NCDRC)**: ₹2 करोड़ से अधिक के दावों के लिए।\n3. **ई-दाखिल सुविधा**: नागरिक बिना वकील के घर बैठे **edaakhil.nic.in** पर ऑनलाइन परिवाद दर्ज कर सकते हैं।";
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
        section: "Sections 2(9) & 34: Consumer Rights & Jurisdiction",
        official_url: "https://consumerhelpline.gov.in/",
        excerpt: "Consumer rights include the right to seek redressal against unfair trade practice or restrictive trade practices or unscrupulous exploitation of consumers."
      }
    ];
  }

  // ==========================================
  // 14. FREE LEGAL AID & NALSA / DLSA (SECTION 12)
  // ==========================================
  else if (
    qLower.includes("section 12") || qLower.includes("legal aid") || qLower.includes("free lawyer") ||
    qLower.includes("dlsa") || qLower.includes("nalsa") || query.includes("धारा 12") || query.includes("मुफ्त कानूनी") || query.includes("कानूनी सहायता")
  ) {
    topic = "Legal Aid & Lok Adalat";
    if (isHi) {
      content = "**विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत पात्र भारतीय नागरिकों को अदालत में 100% निःशुल्क कानूनी सहायता और वकील पाने का अधिकार है:**\n\n1. **धारा 12 के तहत पात्र वर्ग**:\n   • **धारा 12(c)**: सभी महिलाएं और बच्चे (बिना किसी आय सीमा के)।\n   • अनुसूचित जाति (SC) और अनुसूचित जनजाति (ST) के सदस्य।\n   • दिव्यांगजन (Disability) और औद्योगिक कामगार।\n   • कम आय वाले नागरिक (संबंधित राज्य सरकार द्वारा निर्धारित वार्षिक आय सीमा के भीतर)।\n\n2. **धारा 13 के निःशुल्क लाभ**:\n   • कोर्ट फीस, प्रक्रिया शुल्क (Process Fees) और दस्तावेज शुल्क की पूर्ण छूट।\n   • राज्य द्वारा नियुक्त पैनल अधिवक्ता (Panel Advocate) की निःशुल्क सेवाएं।";
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
        section: "Section 12: Criteria for Free Legal Aid",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every citizen who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman, child, SC/ST member or disabled."
      }
    ];
  }

  // ==========================================
  // 15. BAIL RIGHTS & ARREST SAFEGUARDS (BNSS 35 & 47)
  // ==========================================
  else if (
    qLower.includes("bail") || qLower.includes("anticipatory bail") || qLower.includes("arrest") ||
    qLower.includes("police custody") || qLower.includes("arrested") || query.includes("जमानत") || query.includes("गिरफ्तारी")
  ) {
    topic = "Arrest Protections & Bail Rights";
    if (isHi) {
      content = "**भारतीय नागरिक सुरक्षा संहिता, 2023 (BNSS) तथा संविधान के अनुच्छेद 22 के तहत गिरफ्तार किए गए व्यक्ति के वैधानिक अधिकार:**\n\n1. **उपस्थिति का नोटिस (धारा 35 BNSS)**: 7 वर्ष से कम कारावास वाले अपराधों में सीधे गिरफ्तारी अनिवार्य नहीं है; पुलिस पहले नोटिस भेजती है।\n2. **गिरफ्तारी के आधार जानने का अधिकार (धारा 47 BNSS)**: गिरफ्तार व्यक्ति को गिरफ्तारी का कारण और जमानती अपराध में जमानत का अधिकार तुरंत बताया जाना चाहिए।\n3. **24 घंटे के भीतर पेशी (धारा 58 BNSS)**: यात्रा के समय को छोड़कर 24 घंटे के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है।\n4. **मुफ्त कानूनी सहायता**: प्रत्येक गिरफ्तार व्यक्ति को मजिस्ट्रेट के समक्ष पेशी के समय DLSA के रिमांड वकील (Remand Advocate) की निःशुल्क सहायता पाने का अधिकार है।";
      points = [
        "धारा 47 BNSS के तहत गिरफ्तारी का कारण और जमानत की पात्रता जानने का अधिकार है।",
        "24 घंटे के भीतर न्यायिक मजिस्ट्रेट के समक्ष प्रस्तुत करना संवैधानिक अनिवार्यता है।",
        "रिमांड चरण में DLSA द्वारा मुफ्त वकील उपलब्ध कराया जाता है।"
      ];
      nextSteps = [
        "गिरफ्तारी मीमो (Arrest Memo) में समय, तारीख और रिश्तेदार की गवाही दर्ज कराएं।",
        "अपने परिवार या अधिवक्ता को तुरंत सूचित करने के अधिकार की मांग करें।",
        "मजिस्ट्रेट के समक्ष DLSA निःशुल्क रिमांड अधिवक्ता की मांग करें।"
      ];
      referral = "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 | NALSA: https://nalsa.gov.in/legal-aid/";
    } else {
      content = "**Under the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) and Article 22 of the Constitution, statutory safeguards govern arrest and bail:**\n\n1. **Notice of Appearance (Section 35 BNSS)**: For offenses punishable with imprisonment up to 7 years, arrest is not routine. Police must first issue a Notice of Appearance.\n2. **Right to Know Grounds of Arrest (Section 47 BNSS)**: Every arrested person has the statutory right to be informed immediately of the exact grounds of arrest and whether the offense is bailable.\n3. **Production within 24 Hours (Section 58 BNSS)**: The arrested person must be produced before the nearest Judicial Magistrate within 24 hours of arrest, excluding travel time.\n4. **Free Remand Advocate**: Under NALSA guidelines, every arrested citizen has the right to free representation by a DLSA Remand Advocate at the first production stage.";
      points = [
        "Section 35 BNSS restricts routine arrest for offenses punishable with under 7 years imprisonment.",
        "Mandatory production before the Judicial Magistrate within 24 hours under Section 58 BNSS.",
        "Free legal aid advocate provided by DLSA at the remand hearing stage."
      ];
      nextSteps = [
        "Ensure an Arrest Memo is signed with date, time, and witness attestation.",
        "Exercise the statutory right to inform one nominated family member or friend.",
        "Request the presiding Magistrate to assign a DLSA panel lawyer free of cost."
      ];
      referral = "National Legal Services Authority: https://nalsa.gov.in/legal-aid/ | Toll-Free: 15100";
    }
    sourcesCited = [
      {
        document_id: "doc-7",
        document_title: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) — Section 35 & 47 Arrest Safeguards",
        page: 1,
        section: "Sections 35 & 47: Arrest Procedure & Rights of Arrested Person",
        official_url: "https://www.mha.gov.in/",
        excerpt: "Every police officer making an arrest shall inform the arrested person of the grounds of arrest and of his right to bail."
      }
    ];
  }

  // ==========================================
  // 16. UNINDEXED / OUT-OF-SCOPE / PLANETARY / NON-LEGAL QUERIES
  // ==========================================
  else if (
    qLower.includes("neptune") || qLower.includes("spaceship") || qLower.includes("planet") ||
    qLower.includes("pizza") || qLower.includes("recipe") || qLower.includes("cricket score") ||
    qLower.includes("weather forecast") || qLower.includes("movie review")
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

  // ==========================================
  // 17. COMPREHENSIVE AI LAWYER INFERENCE FOR ANY OTHER INQUIRY (DEFAULT ENGINE)
  // ==========================================
  else {
    topic = "Legal Consultation & Citizen Statutory Recourse";
    
    // Extract key contextual keywords to personalize legal counsel
    const words = query.replace(/[^\w\s\u0900-\u097F]/gi, '').split(/\s+/).filter(w => w.length > 2);
    const keyContext = words.slice(0, 5).join(' ');

    if (isHi) {
      content = `⚖️ **न्यायसेतु एआई कानूनी परामर्श एवं वैधानिक समाधान:**\n\n**आपके प्रश्न ("${keyContext}...") के संबंध में भारतीय विधि के तहत कानूनी प्रावधान व नागरिक अधिकार:**\n\n### 1. संवैधानिक एवं वैधानिक अधिकार\n• **अनुच्छेद 21 एवं विधि का शासन**: भारत के संविधान के तहत प्रत्येक नागरिक को गरिमापूर्ण जीवन, संपत्ति की सुरक्षा तथा निष्पक्ष सुनवाई का मौलिक अधिकार प्राप्त है।\n• किसी भी व्यक्ति या संस्था द्वारा गैरकानूनी हस्तक्षेप, धोखाधड़ी, अनुबंध का उल्लंघन या अधिकारों का हनन करने पर भारतीय दीवानी (CPC) एवं आपराधिक (BNS) कानून के तहत तत्काल कानूनी उपचार उपलब्ध हैं।\n\n### 2. व्यावहारिक 4-चरणीय कानूनी कदम (Action Plan)\n1. **साक्ष्य एवं दस्तावेज जुटाना**: मामले से संबंधित सभी लिखित साक्ष्य (दस्तावेज, रसीदें, अनुबंध, बैंक स्टेटमेंट, चैट, ईमेल या तस्वीरें) की प्रमाणित प्रतियां सुरक्षित रखें।\n2. **औपचारिक कानूनी नोटिस (Legal Notice)**: सक्षम अधिवक्ता के माध्यम से विपक्षी पार्टी को 15 या 30 दिनों का वैधानिक कानूनी नोटिस भेजें, जिसमें अपनी मांगें स्पष्ट करें।\n3. **सक्षम न्यायालय या मंच का चयन**:\n   • दीवानी विवाद (संपत्ति, अनुबंध, क्षतिपूर्ति): सिविल जज / जिला न्यायालय।\n   • आपराधिक कृत्य (धमकी, धोखाधड़ी, हमला): नजदीकी पुलिस स्टेशन में धारा 173 BNSS के तहत प्राथमिकी (FIR)।\n   • उपभोक्ता व सेवा विवाद: जिला उपभोक्ता विवाद प्रतितोष आयोग।\n4. **100% निःशुल्क सरकारी वकील (विधिक सेवा प्राधिकरण अधिनियम की धारा 12)**:\n   • यदि आप महिला, अनुसूचित जाति/जनजाति, या निर्धारित आय सीमा के अंतर्गत आते हैं, तो आपको **जिला विधिक सेवा प्राधिकरण (DLSA)** से अदालत में केस लड़ने के लिए पूरी तरह **मुफ्त सरकारी वकील** उपलब्ध कराया जाता है।`;
      points = [
        "संविधान के अनुच्छेद 21 तथा भारतीय कानूनों के तहत नागरिकों को वैधानिक संरक्षण प्राप्त है।",
        "किसी भी विवाद में कानूनी नोटिस भेजना और सक्षम न्यायालय या पुलिस में शिकायत दर्ज करना पहला औपचारिक कदम है।",
        "विधिक सेवा प्राधिकरण अधिनियम की धारा 12 के तहत पात्र नागरिकों को अदालत में 100% मुफ्त वकील मिलता है।"
      ];
      nextSteps = [
        "विवाद से जुड़े सभी मूल दस्तावेज, रसीदें और लिखित संचार सुरक्षित रखें।",
        "अधिवक्ता के माध्यम से विपक्षी पक्ष को पंजीकृत डाक द्वारा कानूनी नोटिस जारी करें।",
        "अपने जिले के जिला न्यायालय परिसर में स्थित DLSA (जिला विधिक सेवा प्राधिकरण) फ्रंट ऑफिस जाएं या 15100 पर कॉल करके मुफ्त विधिक परामर्श लें।"
      ];
      referral = "राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA): https://nalsa.gov.in/legal-aid/ | राष्ट्रीय विधिक हेल्पलाइन: 15100 (टोल-फ्री) | ई-कोर्ट्स: https://ecourts.gov.in/";
    } else {
      content = `⚖️ **NyayaSetu AI Legal Advisory & Actionable Citizen Recourse:**\n\n**Regarding your inquiry ("${keyContext}..."), here is the authoritative legal framework, citizen rights, and step-by-step statutory recourse under Indian jurisprudence:**\n\n### 1. Core Statutory Rights & Legal Framework\n• **Constitutional & Legal Protections**: Under Article 21 and the procedural codes of India (Bharatiya Nyaya Sanhita, 2023 for offenses and Code of Civil Procedure, 1908 for civil disputes), no citizen's personal liberty, property, or civil rights can be abridged without due process of law.\n• Whether this dispute involves property, financial recovery, family conflict, or breach of obligation, Indian courts provide swift mechanisms for injunctions, restitution, and statutory damages.\n\n### 2. Four-Pillar Legal Action Plan\n1. **Documentary & Evidentiary Preservation**:\n   • Assemble all primary records: contracts, written agreements, bank statements, receipts, SMS/WhatsApp communications, and stamped acknowledgments.\n2. **Statutory Legal Demand Notice**:\n   • Engage an advocate to issue a formal, registered Legal Demand Notice giving the opposing party a statutory window (typically 15 to 30 days) to rectify the grievance or face litigation.\n3. **Approaching the Competent Forum**:\n   • **Civil Remedies**: File a suit before the Civil Judge / District Court for Injunction, Declaration, or Recovery of money/property.\n   • **Criminal Remedies**: If fraud, intimidation, or physical harm is involved, file a written complaint under Section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) at your local police station.\n   • **Consumer / Special Tribunals**: If deficiency in goods/services, file digitally via e-Daakhil.\n4. **100% Free Legal Representation (Section 12 of Legal Services Authorities Act, 1987)**:\n   • All women, children, members of SC/ST, and low-income citizens qualify for an **empanelled panel advocate funded entirely by the Government**, with zero court fees and zero administrative costs.\n   • Visit the DLSA Front Office at your local District Court to obtain state-sponsored counsel.`;
      points = [
        "Every citizen is entitled to due process of law, restitution, and court protection under Indian jurisprudence.",
        "Issuing a formal Legal Demand Notice via registered post is the prerequisite first step in asserting legal remedies.",
        "Under Section 12 of the Legal Services Authorities Act, 1987, eligible citizens receive 100% free advocate representation via DLSA."
      ];
      nextSteps = [
        "Organize and preserve all documentary evidence, receipts, agreements, and correspondence.",
        "Draft and dispatch a formal Legal Demand Notice via an advocate with postal tracking.",
        "Visit the District Legal Services Authority (DLSA) front office at your local District Court or call 15100 to request a free appointed advocate."
      ];
      referral = "National Legal Services Authority (NALSA): https://nalsa.gov.in/legal-aid/ | National Helpline: 15100 (Toll-Free) | eCourts: https://ecourts.gov.in/";
    }

    sourcesCited = [
      {
        document_id: "doc-1",
        document_title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        page: 1,
        section: "Section 12: Statutory Right to Free Legal Services",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every person who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman, child, SC/ST member or low income citizen."
      },
      {
        document_id: "doc-10",
        document_title: "Constitution of India & Statutory Legal Remedies Overview",
        page: 1,
        section: "Articles 14 & 21: Equality Before Law & Protection of Life and Liberty",
        official_url: "https://www.indiacode.nic.in/",
        excerpt: "No person shall be deprived of his life or personal liberty except according to procedure established by law."
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
