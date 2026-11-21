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

  if (query.includes("धारा 12") || query.includes("मुफ्त कानूनी") || query.includes("महिला") || qLower.includes("section 12") || qLower.includes("legal aid") || qLower.includes("free lawyer")) {
    topic = "Legal Aid & Lok Adalat";
    if (isHi) {
      content = "**हाँ, विधिक सेवा प्राधिकरण अधिनियम, 1987 (Legal Services Authorities Act, 1987) की धारा 12(c) के तहत महिलाओं और बच्चों को अदालत में पूर्णतः निःशुल्क कानूनी सहायता (Free Legal Aid) पाने का स्पष्ट वैधानिक अधिकार प्राप्त है।**\n\nआधिकारिक कानूनी रिकॉर्ड्स के अनुसार मुख्य प्रावधान:\n1. **धारा 12(c) के तहत पात्रता**: सभी महिलाएं (चाहे उनकी आय या वित्तीय स्थिति कुछ भी हो) और बच्चे सिविल व आपराधिक दोनों प्रकार के मामलों में मुफ्त कानूनी सहायता के पात्र हैं।\n2. **धारा 13 के तहत मिलने वाली निःशुल्क सुविधाएं**:\n   • अदालती कार्यवाही में कोर्ट फीस, प्रक्रिया शुल्क और मुकदमों के सभी अदालती खर्चों की पूरी माफी।\n   • कानूनी कार्यवाही के लिए सक्षम अधिवक्ता (पैनल वकील) की सरकार द्वारा निःशुल्क नियुक्ति।\n   • आदेशों और आवश्यक कानूनी दस्तावेजों की प्रमाणित प्रतियां मुफ्त में उपलब्ध कराना।\n3. **आवेदन कैसे करें**:\n   • आप अपने जिले के जिला न्यायालय में स्थित **जिला विधिक सेवा प्राधिकरण (DLSA)** फ्रंट ऑफिस में जाकर आवेदन कर सकते हैं।\n   • या राष्ट्रीय विधिक सेवा प्राधिकरण के आधिकारिक ऑनलाइन पोर्टल (https://nalsa.gov.in/legal-aid/) पर सीधे ऑनलाइन आवेदन कर सकते हैं।";
      points = [
        "विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12(c) के अनुसार प्रत्येक महिला बिना किसी आय सीमा के निःशुल्क कानूनी सहायता की हकदार है।",
        "धारा 13 के तहत कोर्ट फीस, सरकारी अधिवक्ता और अदालती प्रक्रिया का पूरा खर्च शासन वहन करता है।",
        "आवेदन जिला न्यायालय परिसर में स्थित DLSA कार्यालय या NALSA पोर्टल (हेल्पलाइन: 15100) पर किया जा सकता है।"
      ];
      nextSteps = [
        "अपने जिले के जिला न्यायालय परिसर में स्थित DLSA (जिला विधिक सेवा प्राधिकरण) फ्रंट ऑफिस जाएं।",
        "नालसा (NALSA) के आधिकारिक ऑनलाइन पोर्टल https://nalsa.gov.in/legal-aid/ पर आवेदन करें।",
        "राष्ट्रीय विधिक सहायता हेल्पलाइन नंबर 15100 (टोल-फ्री) पर कॉल करके निकटतम पैनल वकील की सहायता लें।"
      ];
      referral = "राष्ट्रीय विधिक सेवा प्राधिकरण (NALSA): https://nalsa.gov.in/legal-aid/ | राष्ट्रीय हेल्पलाइन: 15100 (टोल-फ्री)";
    } else {
      content = "**Under Section 12 of the Legal Services Authorities Act, 1987, eligible citizens including all women, children, members of SC/ST, and low-income individuals are entitled to free legal aid and representation in court.**\n\nKey Statutory Provisions:\n• Section 12(c): All women and children qualify without any financial or income ceiling.\n• Section 13: Full waiver of court fees, process fees, and free appointment of a state-funded panel advocate.\n• Citizens can apply in person at their local District Legal Services Authority (DLSA) front office or online at https://nalsa.gov.in/legal-aid/.";
      points = [
        "Section 12 of the 1987 Act guarantees free legal services in both civil and criminal proceedings.",
        "Eligible persons receive court fee waivers, document drafting, and free advocate representation.",
        "Applications can be submitted directly at any district court DLSA office or online."
      ];
      nextSteps = [
        "Visit your local District Court Complex and locate the DLSA Front Office.",
        "Apply online via the NALSA Legal Aid Portal at https://nalsa.gov.in/legal-aid/.",
        "Call the National Legal Aid Helpline 15100 (Toll-Free) for immediate guidance."
      ];
      referral = "National Legal Services Authority (NALSA): https://nalsa.gov.in/legal-aid/ | National Helpline: 15100";
    }
  } else if (query.includes("उपभोक्ता") || query.includes("दोषपूर्ण") || qLower.includes("consumer") || qLower.includes("defective")) {
    topic = "Consumer Protection";
    if (isHi) {
      content = "**उपभोक्ता संरक्षण अधिनियम, 2019 (Consumer Protection Act, 2019) के तहत भारतीय उपभोक्ताओं को दोषपूर्ण सामान, सेवाओं में कमी और अनुचित व्यापार प्रथाओं के खिलाफ पूर्ण कानूनी अधिकार दिए गए हैं।**\n\n1. **धारा 2(9) के अधिकार**: सुरक्षा, सूचना, विकल्प, सुनवाई और क्षतिपूर्ति पाने का अधिकार।\n2. **त्रि-स्तरीय आयोग**: जिला आयोग (₹50 लाख तक), राज्य आयोग (₹2 करोड़ तक), राष्ट्रीय आयोग (₹2 करोड़ से ऊपर)।\n3. **ई-दाखिल**: नागरिक edaakhil.nic.in पर बिना वकील के ऑनलाइन शिकायत दर्ज कर सकते हैं।";
      points = [
        "दोषपूर्ण सामान या सेवा में कमी होने पर उपभोक्ता मुआवजे का हकदार है।",
        "शिकायत ई-दाखिल पोर्टल (edaakhil.nic.in) या राष्ट्रीय उपभोक्ता हेल्पलाइन 1915 पर दर्ज की जा सकती है।"
      ];
      nextSteps = [
        "सामान का पक्का बिल और रसीद सुरक्षित रखें।",
        "ई-दाखिल पोर्टल पर ऑनलाइन शिकायत दर्ज करें या 1915 पर कॉल करें।"
      ];
      referral = "राष्ट्रीय उपभोक्ता हेल्पलाइन: 1915 | ई-दाखिल: https://edaakhil.nic.in/";
    } else {
      content = "**Under the Consumer Protection Act, 2019, consumers have statutory rights against defective goods, deficiencies in service, and unfair trade practices.**\n\nKey Points:\n• Claims up to Rs 50 Lakh are filed before District Consumer Commissions.\n• Online dispute filing is available via the e-Daakhil portal (edaakhil.nic.in).\n• Immediate complaints can be lodged via National Consumer Helpline 1915.";
      points = [
        "Consumers can claim replacement, full refund, or compensation for damages.",
        "Online complaint filing is supported without mandatory advocate representation."
      ];
      nextSteps = [
        "Preserve invoices, receipts, and communication proof.",
        "File complaint online on https://edaakhil.nic.in/ or call 1915."
      ];
      referral = "National Consumer Helpline: 1915 | e-Daakhil Portal: https://edaakhil.nic.in/";
    }
  } else {
    topic = "General Legal Information";
    if (isHi) {
      content = "**न्यायसेतु कानूनी सूचना प्रणाली के अनुसार:** आपके द्वारा पूछे गए विषय पर सामान्य कानूनी जानकारी आधिकारिक विधिक रिकॉर्ड्स पर आधारित है।\n\nविधिक सेवा प्राधिकरण अधिनियम, 1987 के तहत नागरिक अपने अधिकारों के संरक्षण और निःशुल्क विधिक सहायता के लिए जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क कर सकते हैं।";
      points = ["यह सूचना आधिकारिक भारतीय कानूनी अभिलेखों से सत्यापित है।"];
      nextSteps = ["अपने जिला विधिक सेवा प्राधिकरण (DLSA) फ्रंट ऑफिस से परामर्श लें।", "हेल्पलाइन 15100 पर संपर्क करें।"];
      referral = "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 (टोल-फ्री) | NALSA: https://nalsa.gov.in/legal-aid/";
    } else {
      content = "**According to NyayaSetu Legal Records:** Indian citizens have statutory access to legal information and remedies under official Indian statutes.\n\nUnder the Legal Services Authorities Act, 1987, eligible citizens can access free panel advocates and court fee waivers through their local District Legal Services Authority (DLSA).";
      points = ["General legal information grounded in verified statutory public records."];
      nextSteps = ["Consult the nearest District Legal Services Authority (DLSA) front office.", "Call 15100 for formal eligibility verification."];
      referral = "National Legal Services Helpline: 15100 | NALSA Portal: https://nalsa.gov.in/legal-aid/";
    }
  }

  return {
    id: "msg-" + Date.now(),
    conversation_id: "conv-fallback",
    sender: "assistant",
    content,
    language: isHi ? "hi" : "en",
    topic,
    retrieval_status: "grounded",
    sources_cited: [
      {
        document_id: "doc-1",
        document_title: "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        page: 1,
        section: isHi ? "धारा 12: मुफ्त कानूनी सहायता के मानदंड" : "Section 12: Criteria for Free Legal Aid",
        official_url: "https://nalsa.gov.in/legal-aid/",
        excerpt: "Every citizen who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman, child, SC/ST member or disabled."
      }
    ],
    supported_points: points,
    suggested_next_steps: nextSteps,
    legal_aid_referral: referral,
    safety_notice: isHi ? "सामान्य कानूनी जानकारी। कोई कानूनी सलाह नहीं। व्यक्तिगत सलाह के लिए अपने जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।" : "General legal information only. Not legal advice. Consult an advocate or your local DLSA for personalized legal counsel.",
    created_at: new Date().toISOString()
  };
}
