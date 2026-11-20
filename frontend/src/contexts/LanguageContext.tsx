import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Nav
    appName: "NyayaSetu AI",
    tagline: "Community Legal Information Platform",
    askQuestion: "Ask a Legal Question",
    exploreResources: "Explore Legal Resources",
    findLegalAid: "Find Free Legal Aid",
    legalSources: "Verified Sources",
    dashboard: "Dashboard",
    settings: "Settings",
    adminPortal: "Admin Portal",
    login: "Sign In",
    register: "Register",
    logout: "Sign Out",
    disclaimerBanner: "General public legal information grounded in official Indian statutes. Not a lawyer & not personalized legal advice.",
    disclaimerFull: "NyayaSetu AI is an information and navigation tool for Indian citizens. It does not provide legal representation or predict judicial outcomes. For personalized advice, consult an advocate or your local DLSA.",
    insufficientEvidence: "Insufficient verified information in the official repository.",
    submit: "Send Question",
    inputPlaceholder: "Ask about consumer rights, free legal aid eligibility, tenancy rules...",
    liveEngine: "Live AI Mode (OpenAI)",
    localEngine: "Verified Grounded RAG (Demo/Local Engine)",

    // Hero Section
    heroBadge: "Official Legal Information & Legal-Aid Navigation",
    heroTitle1: "Understand Your Rights.",
    heroTitle2: "Find the Right Help.",
    heroDesc: "NyayaSetu AI helps Indian citizens understand publicly available, verified legal information and locate appropriate District Legal Services Authorities (DLSA). Ask questions in simple English or Hindi and receive understandable explanations strictly grounded in official documents.",
    askQuestionBtn: "Ask a Legal Question",
    findAidBtn: "Find Free Legal Aid (DLSA)",
    exploreResBtn: "Explore Legal Resources",
    disclaimerPill: "Information service only — NOT a lawyer and NOT personalized legal advice. Never guarantees judicial outcomes.",

    // Core Principles
    corePrinciples: "Core Principles",
    principlesTitle: "Designed for Trust, Accuracy & Citizen Safety",
    p1Title: "Evidence-Grounded Only",
    p1Desc: "Never invents laws or provisions. Every answer is substantiated directly by approved Indian statutory documents in the repository.",
    p2Title: "Verifiable Citations",
    p2Desc: "Every point cites the source document, page number, and section with direct links to official government portals.",
    p3Title: "Official Legal-Aid Navigation",
    p3Desc: "Helps eligible citizens locate District Legal Services Authorities (DLSA) and NALSA front offices under Section 12 of the 1987 Act.",
    p4Title: "Privacy & Safety By Design",
    p4Desc: "No Aadhaar numbers or personal sensitive documents requested. Uploads are strictly sanitized against prompt injection.",

    // How It Works
    howItWorks: "How It Works",
    howItWorksSub: "From Question to Grounded Clarity",
    step1Title: "Ask Your Question",
    step1Desc: "Type your legal doubt in simple English or everyday हिन्दी.",
    step2Title: "Retrieve Verified Acts",
    step2Desc: "AI vector search extracts statutory passages from official approved records.",
    step3Title: "Understand Your Rights",
    step3Desc: "Receive clear bulleted points, page citations, and suggested next steps.",
    step4Title: "Connect to Legal Aid",
    step4Desc: "Navigate directly to NALSA or your district court legal aid cell.",

    // Essential Domains
    popularTopics: "Explore Essential Legal Domains",
    popularTopicsSub: "Frequently Navigated Citizen Protections",
    topic1Tag: "Act 39 of 1987",
    topic1Title: "Free Legal Aid & Lok Adalats",
    topic1Desc: "Criteria under Section 12: Women, children, SC/ST, persons with disabilities, and lower-income citizens entitled to free advocate services and waiver of court fees.",
    topic2Tag: "Act 35 of 2019",
    topic2Title: "Consumer Rights & E-Daakhil",
    topic2Desc: "Protection against defective products, deficiency of service, misleading ads, and procedure for filing claims before District and State Consumer Commissions.",
    topic3Tag: "Model Act 2021",
    topic3Title: "Tenancy & Rent Agreements",
    topic3Desc: "Mandatory written agreements, caps on security deposit (max 2 months for residential), protection against unlawful water/power cutoffs, and eviction rules.",

    // FAQ
    faqTitle: "FAQ",
    faqHeading: "Frequently Asked Questions",
    faq1Q: "Is NyayaSetu AI a substitute for a lawyer?",
    faq1A: "No. NyayaSetu AI is an educational information and navigation platform. It does not provide personalized legal counsel, draft individualized court affidavits, or represent citizens in litigation. If you require legal advice, contact your local DLSA or hire an advocate.",
    faq2Q: "Who is entitled to free legal aid in India?",
    faq2A: "Under Section 12 of the Legal Services Authorities Act, 1987, eligible categories include: all women and children, members of Scheduled Castes and Scheduled Tribes, persons with disabilities, victims of human trafficking or disaster, industrial workers, persons in custody, and citizens with income below state limits.",
    faq3Q: "What happens if the verified database does not contain my answer?",
    faq3A: "NyayaSetu AI will explicitly display an 'Insufficient Verified Evidence' state and guide you directly to the official NALSA portal (https://nalsa.gov.in/legal-aid/) or the National Tele-Law Helpline (15100). The AI will never invent facts or speculate.",
    faq4Q: "Does NyayaSetu store my personal identity documents?",
    faq4A: "No. NyayaSetu does not collect, request, or store Aadhaar numbers, PAN cards, or private biometric documents. You can delete your personal conversation history at any time from your settings.",

    // CTA
    ctaTitle: "Empowering Citizens Through Verified Legal Knowledge",
    ctaDesc: "Ask your legal doubt today or locate your District Legal Services Authority front office.",
    ctaInquiry: "Start Free Legal Inquiry",
    ctaDirectory: "Browse DLSA Directory",

    // Dashboard
    dashWelcome: "Welcome",
    dashBadge: "Grounded Citizen Intelligence",
    dashSubtitle: "Ask legal-information questions grounded strictly in official Indian legal documents. Explore free legal aid opportunities through the District Legal Services Authority (DLSA).",
    dashNewChat: "New Conversation",
    dashFindDlsa: "Find DLSA Office",
    dashAskHeading: "Ask a Grounded Legal Question",
    dashInputPlaceholder: "e.g. Can a landlord evict a tenant without notice? (or: How do I file on e-Daakhil?)",
    dashBtnAsk: "Ask Assistant",
    dashBtnConsulting: "Consulting Repository...",
    dashCommonPrompt: "Or try these common citizen questions:",
    dashRecentHeading: "Your Recent Inquiries",
    dashViewAll: "View all conversations",
    dashNoConvs: "No conversations yet",
    dashNoConvsSub: "Submit a legal question above to start your first verified, evidence-grounded session.",
    dashStartFirst: "Start First Session",
    dashPortalsHeading: "Verified Legal Portals",
    dashViewAllPortals: "View All",
    dashHelplineHeading: "Official Legal Aid Helplines",
    dashDisclaimerNotice: "Public information platform only — NOT a lawyer and NOT legal advice.",

    // Legal Aid Page
    aidBadge: "Statutory Legal Aid Navigation",
    aidTitle: "Find Free Legal Aid Services",
    aidSubtitle: "Under Section 12 of the Legal Services Authorities Act, 1987, free legal services are provided to eligible citizens including women, children, members of SC/ST, disabled persons, and persons with annual income below state limits.",
    aidPortalBtn: "NALSA Online Portal",
    aidHelpline: "National Legal Aid Helpline: 15100 (Toll Free)",
    aidFilterState: "State",
    aidFilterType: "Authority Level",
    aidFilterDistrict: "District / City",
    aidSearchBtn: "Search Authorities",
    aidShowingCount: "verified legal aid authorities",
    aidVerifiedPortals: "All entries verified against official portals",
    aidAll: "All",
    aidAllAuthorities: "All Authorities",
    aidPlaceholderDistrict: "e.g. South Delhi, Mumbai, Lucknow...",

    // Resources Page
    resBadge: "Public Legal Repositories",
    resTitle: "Official Legal Resources & Portals",
    resSubtitle: "Curated and verified official portals provided by the Department of Justice, National Legal Services Authority, Ministry of Consumer Affairs, and the Supreme Court of India.",
    resSearchKw: "Search Keywords",
    resCategory: "Category",
    resLanguage: "Language",
    resShowingCount: "verified official resources",
    resPlaceholderSearch: "e.g. Consumer, Tele-Law, eCourts...",
    resAllCategories: "All Categories",
    resAllLanguages: "All Languages",

    // Settings Page
    setHeading: "Account Settings & Privacy Preferences",
    setSub: "Manage your language preferences and data retention controls",
    setName: "Display Name",
    setDefaultLang: "Default Legal Explanation Language",
    setSave: "Save Preferences",
    setSaving: "Saving...",
    setPrivacyHeading: "Citizen Privacy & Retention Architecture",
    setDelAccount: "Delete Account",
    setLangHint: "New legal inquiry sessions will default to this language",

    // Sources Page
    srcBadge: "Complete Auditability & Transparency",
    srcTitle: "Approved Legal Document Library",
    srcSubtitle: "NyayaSetu AI answers legal queries strictly using verified statutory records indexed in this library. Browse approved documents below or inspect the exact passages parsed by our vector retrieval system.",
    srcInspectChunks: "Inspect Chunks",
    srcCloseChunks: "Close Inspector",
    srcTotalDocs: "approved official documents",
    srcTotalChunks: "statutory indexed chunks"
  },
  hi: {
    // Brand & Nav
    appName: "न्यायसेतु AI",
    tagline: "सामुदायिक कानूनी सूचना मंच",
    askQuestion: "कानूनी प्रश्न पूछें",
    exploreResources: "कानूनी संसाधन देखें",
    findLegalAid: "मुफ्त कानूनी सहायता खोजें",
    legalSources: "सत्यापित स्रोत",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    adminPortal: "व्यवस्थापक पोर्टल",
    login: "लॉग इन करें",
    register: "पंजीकरण करें",
    logout: "लॉग आउट करें",
    disclaimerBanner: "आधिकारिक भारतीय कानूनों पर आधारित सामान्य कानूनी जानकारी। यह कोई वकील या व्यक्तिगत कानूनी सलाह नहीं है।",
    disclaimerFull: "न्यायसेतु एआई भारतीय नागरिकों के लिए सूचना और विधिक सहायता मार्गदर्शन मंच है। यह न्यायिक परिणामों की गारंटी नहीं देता। व्यक्तिगत सलाह के लिए अपने DLSA या अधिवक्ता से संपर्क करें।",
    insufficientEvidence: "आधिकारिक रिपोजिटरी में इस विषय पर पर्याप्त सत्यापित जानकारी उपलब्ध नहीं है।",
    submit: "प्रश्न भेजें",
    inputPlaceholder: "उपभोक्ता अधिकार, मुफ्त कानूनी सहायता, किरायेदारी नियमों के बारे में पूछें...",
    liveEngine: "लाइव एआई मोड (OpenAI)",
    localEngine: "सत्यापित ग्राउंडेड RAG (डेमो/लोकल इंजन)",

    // Hero Section
    heroBadge: "आधिकारिक कानूनी जानकारी एवं विधिक सहायता मार्गदर्शन",
    heroTitle1: "अपने अधिकार समझें।",
    heroTitle2: "सही सहायता पाएं।",
    heroDesc: "न्यायसेतु एआई भारतीय नागरिकों को सार्वजनिक रूप से उपलब्ध, सत्यापित कानूनी जानकारी समझने और उपयुक्त जिला विधिक सेवा प्राधिकरण (DLSA) खोजने में सहायता करता है। सरल हिंदी या अंग्रेजी में प्रश्न पूछें और आधिकारिक दस्तावेजों पर आधारित विश्वसनीय स्पष्टीकरण प्राप्त करें।",
    askQuestionBtn: "कानूनी प्रश्न पूछें",
    findAidBtn: "मुफ्त कानूनी सहायता खोजें (DLSA)",
    exploreResBtn: "कानूनी संसाधन देखें",
    disclaimerPill: "केवल सूचना सेवा — कोई वकील या व्यक्तिगत कानूनी सलाह नहीं। कभी भी न्यायिक फैसलों की गारंटी नहीं देता।",

    // Core Principles
    corePrinciples: "मूल सिद्धांत",
    principlesTitle: "विश्वसनीयता, सटीकता और नागरिक सुरक्षा के लिए निर्मित",
    p1Title: "केवल साक्ष्य-आधारित जानकारी",
    p1Desc: "कभी भी मनगढ़ंत कानून या धाराएं नहीं बताता। प्रत्येक उत्तर सीधे रिपॉजिटरी में मौजूद अनुमोदित भारतीय संविधि दस्तावेजों द्वारा प्रमाणित होता है।",
    p2Title: "सत्यापित स्रोत और संदर्भ",
    p2Desc: "प्रत्येक बिंदु मूल दस्तावेज, पृष्ठ संख्या और धारा का हवाला देता है, साथ ही आधिकारिक सरकारी पोर्टलों के सीधे लिंक प्रदान करता है।",
    p3Title: "आधिकारिक विधिक सहायता मार्गदर्शन",
    p3Desc: "विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत पात्र नागरिकों को जिला विधिक सेवा प्राधिकरण (DLSA) और NALSA फ्रंट ऑफिस तक पहुँचने में मदद करता है।",
    p4Title: "गोपनीयता और डेटा सुरक्षा",
    p4Desc: "कोई आधार नंबर या निजी संवेदनशील दस्तावेज नहीं मांगा जाता। अपलोड की गई फाइलों को प्रॉम्प्ट इंजेक्शन के खिलाफ सैनिटाइज किया जाता है।",

    // How It Works
    howItWorks: "यह कैसे काम करता है",
    howItWorksSub: "सवाल से लेकर स्पष्ट समाधान तक",
    step1Title: "अपना प्रश्न पूछें",
    step1Desc: "सरल अंग्रेजी या रोज़मर्रा की हिंदी में अपना कानूनी सवाल लिखें।",
    step2Title: "सत्यापित कानूनों की खोज",
    step2Desc: "एआई वेक्टर सर्च आधिकारिक अनुमोदित रिकॉर्ड्स से संबंधित कानूनी धाराओं को निकालता है।",
    step3Title: "अधिकारों को समझें",
    step3Desc: "स्पष्ट बुलेट पॉइंट्स, पेज नंबर और सुझाये गए अगले कदम प्राप्त करें।",
    step4Title: "विधिक सहायता से जुड़ें",
    step4Desc: "नालसा (NALSA) या अपनी स्थानीय जिला अदालत के लीगल एड सेल से सीधे जुड़ें।",

    // Essential Domains
    popularTopics: "प्रमुख कानूनी क्षेत्र",
    popularTopicsSub: "नागरिकों द्वारा अक्सर पूछे जाने वाले अधिकार",
    topic1Tag: "अधिनियम 39, 1987",
    topic1Title: "मुफ्त कानूनी सहायता एवं लोक अदालत",
    topic1Desc: "धारा 12 के तहत पात्रता: महिलाएं, बच्चे, SC/ST, दिव्यांग व्यक्ति और कम आय वाले नागरिक मुफ्त वकील और कोर्ट फीस माफी के हकदार हैं।",
    topic2Tag: "अधिनियम 35, 2019",
    topic2Title: "उपभोक्ता अधिकार एवं ई-दाखिल",
    topic2Desc: "दोषपूर्ण उत्पादों, सेवा में कमी, भ्रामक विज्ञापनों से सुरक्षा और उपभोक्ता आयोग में ऑनलाइन शिकायत दर्ज करने की प्रक्रिया।",
    topic3Tag: "मॉडल अधिनियम 2021",
    topic3Title: "किरायेदारी एवं रेंट एग्रीमेंट",
    topic3Desc: "अनिवार्य लिखित अनुबंध, अधिकतम 2 महीने का सिक्योरिटी डिपॉजिट, बिना नोटिस पानी-बिजली काटने पर रोक और निष्कासन के नियम।",

    // FAQ
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    faqHeading: "अक्सर पूछे जाने वाले कानूनी प्रश्न (FAQ)",
    faq1Q: "क्या न्यायसेतु AI किसी वकील का विकल्प है?",
    faq1A: "नहीं। न्यायसेतु AI एक शैक्षिक सूचना और मार्गदर्शन मंच है। यह कोई व्यक्तिगत कानूनी सलाह नहीं देता और न ही अदालत में आपका प्रतिनिधित्व करता है। कानूनी सलाह के लिए अपने स्थानीय DLSA या वकील से संपर्क करें।",
    faq2Q: "भारत में मुफ्त कानूनी सहायता किसे मिल सकती है?",
    faq2A: "विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत: महिलाएं, बच्चे, SC/ST सदस्य, दिव्यांगजन, मानव तस्करी या आपदा पीड़ित, औद्योगिक श्रमिक, और निर्धारित आय सीमा से कम आय वाले नागरिक पात्र हैं।",
    faq3Q: "अगर डेटाबेस में मेरे सवाल का जवाब न हो तो क्या होगा?",
    faq3A: "AI मनगढ़ंत जवाब नहीं देगा। यह स्पष्ट रूप से 'अपर्याप्त साक्ष्य' (Insufficient Evidence) दिखाएगा और आपको सीधे NALSA पोर्टल (15100) पर जाने का सुझाव देगा।",
    faq4Q: "क्या न्यायसेतु मेरे पहचान दस्तावेज स्टोर करता है?",
    faq4A: "नहीं। न्यायसेतु आधार नंबर या निजी संवेदनशील दस्तावेज कभी नहीं मांगता और न ही स्टोर करता है। आप सेटिंग्स से कभी भी अपनी चैट हिस्ट्री मिटा सकते हैं।",

    // CTA
    ctaTitle: "सत्यापित कानूनी ज्ञान से नागरिकों का सशक्तिकरण",
    ctaDesc: "आज ही अपनी कानूनी शंका का समाधान पाएं या अपने नजदीकी जिला विधिक सेवा प्राधिकरण का पता लगाएं।",
    ctaInquiry: "मुफ्त कानूनी पूछताछ शुरू करें",
    ctaDirectory: "DLSA डायरेक्टरी देखें",

    // Dashboard
    dashWelcome: "स्वागत है",
    dashBadge: "सत्यापित नागरिक आसूचना",
    dashSubtitle: "आधिकारिक भारतीय कानूनी दस्तावेजों पर आधारित सवाल पूछें। जिला विधिक सेवा प्राधिकरण (DLSA) के माध्यम से मुफ्त कानूनी सहायता खोजें।",
    dashNewChat: "नई बातचीत",
    dashFindDlsa: "DLSA कार्यालय खोजें",
    dashAskHeading: "सत्यापित कानूनी प्रश्न पूछें",
    dashInputPlaceholder: "उदा. क्या मकान मालिक बिना नोटिस निकाल सकता है? या उपभोक्ता आयोग में शिकायत कैसे दर्ज करें?",
    dashBtnAsk: "प्रश्न पूछें",
    dashBtnConsulting: "कानून खोज रहे हैं...",
    dashCommonPrompt: "या नागरिकों द्वारा अक्सर पूछे जाने वाले ये प्रश्न चुनें:",
    dashRecentHeading: "आपकी हालिया पूछताछ",
    dashViewAll: "सभी बातचीत देखें",
    dashNoConvs: "अभी कोई बातचीत नहीं है",
    dashNoConvsSub: "अपनी पहली साक्ष्य-आधारित कानूनी पूछताछ शुरू करने के लिए ऊपर सवाल दर्ज करें।",
    dashStartFirst: "पहला सत्र शुरू करें",
    dashPortalsHeading: "सत्यापित सरकारी पोर्टल",
    dashViewAllPortals: "सभी देखें",
    dashHelplineHeading: "आधिकारिक विधिक सहायता हेल्पलाइन",
    dashDisclaimerNotice: "यह केवल सार्वजनिक सूचना मंच है — कोई वकील या व्यक्तिगत कानूनी सलाह नहीं।",

    // Legal Aid Page
    aidBadge: "वैधानिक विधिक सहायता नेविगेशन",
    aidTitle: "मुफ्त कानूनी सहायता सेवाएं खोजें",
    aidSubtitle: "विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत महिलाओं, बच्चों, SC/ST सदस्यों, दिव्यांगों और कम आय वाले नागरिकों को मुफ्त वकील और कानूनी सेवाएं प्रदान की जाती हैं।",
    aidPortalBtn: "नालसा (NALSA) ऑनलाइन पोर्टल",
    aidHelpline: "राष्ट्रीय विधिक सहायता हेल्पलाइन: 15100 (टोल फ्री)",
    aidFilterState: "राज्य",
    aidFilterType: "प्राधिकरण स्तर",
    aidFilterDistrict: "जिला / शहर",
    aidSearchBtn: "प्राधिकरण खोजें",
    aidShowingCount: "सत्यापित विधिक सहायता प्राधिकरण उपलब्ध हैं",
    aidVerifiedPortals: "सभी प्रविष्टियां आधिकारिक पोर्टलों से सत्यापित हैं",
    aidAll: "सभी राज्य",
    aidAllAuthorities: "सभी प्राधिकरण",
    aidPlaceholderDistrict: "उदा. दक्षिण दिल्ली, मुंबई, लखनऊ...",

    // Resources Page
    resBadge: "सार्वजनिक कानूनी रिपॉजिटरी",
    resTitle: "आधिकारिक कानूनी संसाधन एवं पोर्टल",
    resSubtitle: "न्याय विभाग, नालसा (NALSA), उपभोक्ता मामले मंत्रालय और सुप्रीम कोर्ट द्वारा संचालित सत्यापित आधिकारिक सरकारी पोर्टल।",
    resSearchKw: "खोजें (कीवर्ड्स)",
    resCategory: "श्रेणी",
    resLanguage: "भाषा",
    resShowingCount: "सत्यापित आधिकारिक कानूनी संसाधन उपलब्ध हैं",
    resPlaceholderSearch: "उदा. उपभोक्ता, टेली-लॉ, ई-कोर्ट्स...",
    resAllCategories: "सभी श्रेणियां",
    resAllLanguages: "सभी भाषाएँ",

    // Settings Page
    setHeading: "खाता सेटिंग्स एवं गोपनीयता प्राथमिकताएं",
    setSub: "अपनी भाषा प्राथमिकताएं और डेटा नियंत्रण प्रबंधित करें",
    setName: "प्रदर्शित नाम (Display Name)",
    setDefaultLang: "डिफ़ॉल्ट कानूनी स्पष्टीकरण भाषा",
    setSave: "प्राथमिकताएं सहेजें",
    setSaving: "सहेज रहे हैं...",
    setPrivacyHeading: "नागरिक गोपनीयता एवं डेटा सुरक्षा संरचना",
    setDelAccount: "खाता हमेशा के लिए मिटाएं",
    setLangHint: "नए कानूनी पूछताछ सत्र इस भाषा में खुलेंगे",

    // Sources Page
    srcBadge: "पूर्ण लेखापरीक्षणीयता एवं पारदर्शिता",
    srcTitle: "स्वीकृत कानूनी दस्तावेज पुस्तकालय",
    srcSubtitle: "न्यायसेतु एआई कानूनी सवालों के जवाब केवल इस लाइब्रेरी में इंडेक्स किए गए सत्यापित आधिकारिक रिकॉर्ड्स से देता है। स्वीकृत दस्तावेजों को ब्राउज़ करें या हमारे वेक्टर सिस्टम द्वारा प्रोसेस किए गए पैराग्राफ देखें।",
    srcInspectChunks: "पैराग्राफ (Chunks) देखें",
    srcCloseChunks: "इंस्पेक्टर बंद करें",
    srcTotalDocs: "स्वीकृत आधिकारिक दस्तावेज",
    srcTotalChunks: "इंडेक्स किए गए कानूनी पैराग्राफ"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('nyayasetu_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nyayasetu_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
