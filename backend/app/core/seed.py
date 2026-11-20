import json
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.security import hash_password
from app.models import User, LegalDocument, DocumentChunk, LegalResource, LegalAidDirectoryEntry
from app.rag.document_parser import ParsedPage
from app.rag.chunking import chunk_text
from app.rag.embeddings import generate_embedding

SEED_DOCUMENTS = [
    {
        "title": "Legal Services Authorities Act, 1987 — Criteria for Free Legal Aid (Sections 12 & 13)",
        "publisher": "National Legal Services Authority (NALSA)",
        "document_type": "Statute Excerpt",
        "official_url": "https://nalsa.gov.in/legal-aid/",
        "verification_date": "Verified 2026",
        "pages": [
            ParsedPage(
                page_number=1,
                section="Section 12: Criteria for Giving Legal Services / धारा 12: मुफ्त कानूनी सहायता के मानदंड",
                text=(
                    "Under Section 12 of the Legal Services Authorities Act, 1987 (विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत मुफ्त कानूनी सहायता / Free Legal Aid), "
                    "every citizen who has to file or defend a case shall be entitled to legal services under this Act if that person is:\n"
                    "(a) a member of a Scheduled Caste or Scheduled Tribe (अनुसूचित जाति या जनजाति के सदस्य);\n"
                    "(b) a victim of trafficking in human beings or begar as referred to in Article 23 of the Constitution;\n"
                    "(c) a woman or a child (महिलाएं या बच्चे);\n"
                    "(d) a person with disability as defined in the Rights of Persons with Disabilities Act (दिव्यांग व्यक्ति);\n"
                    "(e) a person under circumstances of underserved want such as being a victim of a mass disaster, ethnic violence, caste atrocity, flood, drought, earthquake or industrial disaster;\n"
                    "(f) an industrial workman (औद्योगिक कामगार);\n"
                    "(g) in custody, including custody in a protective home or psychiatric hospital;\n"
                    "(h) in receipt of annual income less than the amount prescribed by the respective State Government if the case is before a court other than the Supreme Court."
                )
            ),
            ParsedPage(
                page_number=2,
                section="Section 13: Entitlement to Legal Services & Lok Adalats / धारा 13: लोक अदालत और प्रक्रिया",
                text=(
                    "Section 13 states that persons who satisfy all or any of the criteria specified in Section 12 shall be entitled to receive legal services "
                    "provided that the concerned Legal Services Authority is satisfied that such person has a prima facie case to prosecute or to defend.\n"
                    "Free legal services (निःशुल्क विधिक सेवाएं) include:\n"
                    "1. Payment of court fees, process fees, and all other charges payable or incurred in connection with any legal proceedings.\n"
                    "2. Providing advocate in legal proceedings (अधिवक्ता / वकील की निःशुल्क सेवा).\n"
                    "3. Obtaining and supply of certified copies of orders and other documents in legal proceedings.\n"
                    "4. Preparation of appeal, paper book including printing and translation of documents in legal proceedings.\n"
                    "Citizens can apply in person at their local District Legal Services Authority (DLSA / जिला विधिक सेवा प्राधिकरण) front office or submit an online application on the NALSA Legal Aid Portal at https://nalsa.gov.in/legal-aid/."
                )
            )
        ]
    },
    {
        "title": "Consumer Protection Act, 2019 — Citizen Rights & Dispute Redressal",
        "publisher": "Ministry of Consumer Affairs, Food & Public Distribution",
        "document_type": "Statutory Overview",
        "official_url": "https://consumerhelpline.gov.in/",
        "verification_date": "Verified 2026",
        "pages": [
            ParsedPage(
                page_number=1,
                section="Consumer Rights & Unfair Trade Practices",
                text=(
                    "The Consumer Protection Act, 2019 protects consumers against unfair trade practices, misleading advertisements, and defective goods or deficient services.\n"
                    "Key rights recognized under Section 2(9) include:\n"
                    "1. Right to safety: protection against goods and services hazardous to life and property.\n"
                    "2. Right to be informed: about the quality, quantity, potency, purity, standard and price of goods or services.\n"
                    "3. Right to choose: access to a variety of goods and services at competitive prices.\n"
                    "4. Right to be heard: consumer interests receive due consideration at appropriate forums.\n"
                    "5. Right to seek redressal: against unfair trade practice or restrictive trade practices or unscrupulous exploitation.\n"
                    "6. Right to consumer education: awareness of citizen rights."
                )
            ),
            ParsedPage(
                page_number=2,
                section="Dispute Redressal Forum Hierarchy & E-Daakhil",
                text=(
                    "Consumer disputes are adjudicated by a three-tier quasi-judicial machinery:\n"
                    "1. District Consumer Disputes Redressal Commission (District Commission): Claims where the value of goods or services does not exceed Rs 50 Lakhs (revised threshold).\n"
                    "2. State Consumer Disputes Redressal Commission (State Commission): Claims exceeding Rs 50 Lakhs up to Rs 2 Crores.\n"
                    "3. National Consumer Disputes Redressal Commission (NCDRC): Claims exceeding Rs 2 Crores.\n"
                    "Consumers can file complaints digitally through the e-Daakhil portal (edaakhil.nic.in) without needing to physically visit the commission. "
                    "Pre-litigation grievance can also be registered at National Consumer Helpline (NCH) toll-free 1915 or portal consumerhelpline.gov.in."
                )
            )
        ]
    },
    {
        "title": "Model Tenancy Act, 2021 — Tenant & Landlord Rights Framework",
        "publisher": "Ministry of Housing and Urban Affairs (MoHUA)",
        "document_type": "Policy Framework",
        "official_url": "https://mohua.gov.in/",
        "verification_date": "Verified 2026",
        "pages": [
            ParsedPage(
                page_number=1,
                section="Mandatory Rent Agreement & Security Deposit Cap",
                text=(
                    "Under the Model Tenancy Act, 2021, no person shall let or take on rent any premises except by an agreement in writing, "
                    "which must be submitted to the Rent Authority.\n"
                    "Key protections for tenants and landlords:\n"
                    "1. Written Agreement: Mandatory written agreement registered with the Rent Authority.\n"
                    "2. Security Deposit Capped: Security deposit for residential premises is capped at a maximum of two months' rent; "
                    "for non-residential premises, it is capped at a maximum of six months' rent.\n"
                    "3. Essential Supplies: The landlord cannot sever or withhold essential services such as water, electricity, or sanitation "
                    "over rent arrears or disputes.\n"
                    "4. Notice for Entry: The landlord must give at least twenty-four hours' prior notice in writing or electronically before entering the premises."
                )
            ),
            ParsedPage(
                page_number=2,
                section="Eviction & Rent Authority Redressal",
                text=(
                    "Eviction cannot be executed arbitrarily or by force. Eviction can only be ordered by the Rent Court on specific statutory grounds:\n"
                    "1. Willful failure to pay agreed rent for two consecutive months despite statutory notice.\n"
                    "2. Subletting without prior written consent.\n"
                    "3. Misuse of premises causing structural damage or nuisance.\n"
                    "Disputes are resolved by the Rent Authority, Rent Court, and Rent Tribunal within defined time limits, "
                    "barring jurisdiction of civil courts to ensure speedy resolution."
                )
            )
        ]
    },
    {
        "title": "Motor Vehicles Act, 1988 (Amended 2019) — Mandatory Helmet Rules & Traffic Penalties (Sections 129 & 194D)",
        "publisher": "Ministry of Road Transport and Highways (MoRTH)",
        "document_type": "Statute Excerpt",
        "official_url": "https://morth.nic.in/",
        "verification_date": "Verified 2026",
        "pages": [
            ParsedPage(
                page_number=1,
                section="Section 129: Wearing of Protective Headgear (Helmet) / धारा 129: सुरक्षात्मक हेलमेट पहनना अनिवार्य",
                text=(
                    "Under Section 129 of the Motor Vehicles Act, 1988 (as amended by the Motor Vehicles Amendment Act, 2019 / मोटर वाहन अधिनियम की धारा 129), "
                    "every person above four years of age, driving or riding on a motorcycle or two-wheeler of any class or description shall, while in a public place, "
                    "wear protective headgear (helmet) conforming to the standards specified by the Bureau of Indian Standards (BIS).\n"
                    "Key statutory provisions and exceptions:\n"
                    "1. Compulsory for Rider and Pillion: The requirement to wear a protective helmet applies to both the driver (rider) and the pillion passenger.\n"
                    "2. BIS Safety Standard: The helmet must be securely fastened to the head with straps and conform to approved BIS safety specifications.\n"
                    "3. Statutory Exemption: Under the proviso to Section 129, this requirement shall not apply to a person who is a Sikh, if he is wearing a turban while driving or riding a motorcycle in a public place."
                )
            ),
            ParsedPage(
                page_number=2,
                section="Section 194D: Penalty for Driving Without Helmet / धारा 194D: बिना हेलमेट वाहन चलाने पर जुर्माना व चालान",
                text=(
                    "Section 194D of the Motor Vehicles Act, 1988 prescribes the statutory penalties for failure to wear protective headgear:\n"
                    "1. Monetary Fine / Challan: Whoever drives a motorcycle or two-wheeler, or causes or allows a motorcycle to be driven in contravention of Section 129 (riding or driving without helmet / बिना हेलमेट ड्राइविंग), "
                    "shall be punishable with a fine of one thousand rupees (Rs 1,000).\n"
                    "2. Driving Licence Disqualification: In addition to the Rs 1,000 fine, the driver shall be disqualified from holding a driving licence for a period of three (3) months.\n"
                    "3. Enforcement: Traffic police authorities are empowered to issue on-the-spot challans or digital e-challans through the Parivahan portal (https://parivahan.gov.in/). "
                    "Citizens can contest wrongful challans before a Traffic Court or the Virtual Court (vcourts.gov.in)."
                )
            )
        ]
    }
]

SEED_RESOURCES = [
    {
        "title": "NALSA National Legal Aid Portal",
        "category": "Legal Aid",
        "description": "Official national platform for online free legal aid applications, Lok Adalat schedules, and DLSA front office directory.",
        "source_organization": "National Legal Services Authority (NALSA)",
        "official_url": "https://nalsa.gov.in/legal-aid/",
        "language": "both",
        "last_verified_date": "October 2026"
    },
    {
        "title": "National Consumer Helpline (NCH)",
        "category": "Consumer Protection",
        "description": "Grievance redressal portal and toll-free helpline (1915) for consumers facing deceptive practices, defective products, or warranty denial.",
        "source_organization": "Department of Consumer Affairs, Government of India",
        "official_url": "https://consumerhelpline.gov.in/",
        "language": "both",
        "last_verified_date": "October 2026"
    },
    {
        "title": "e-Daakhil Online Consumer Court Filing",
        "category": "Consumer Protection",
        "description": "Digital platform enabling citizens to file consumer complaints online across District, State, and National Consumer Commissions.",
        "source_organization": "National Consumer Disputes Redressal Commission (NCDRC)",
        "official_url": "https://edaakhil.nic.in/",
        "language": "en",
        "last_verified_date": "October 2026"
    },
    {
        "title": "Department of Justice Tele-Law Service",
        "category": "Legal Aid",
        "description": "Connecting citizens in rural and urban areas with panel lawyers via Common Service Centres (CSCs) and mobile application.",
        "source_organization": "Ministry of Law and Justice",
        "official_url": "https://www.tele-law.in/",
        "language": "both",
        "last_verified_date": "October 2026"
    },
    {
        "title": "eCourts Services National Portal",
        "category": "General Legal Information",
        "description": "Official case status lookup, court orders, causelists, and certified copy requests for High Courts and District Courts across India.",
        "source_organization": "e-Committee, Supreme Court of India",
        "official_url": "https://ecourts.gov.in/",
        "language": "both",
        "last_verified_date": "October 2026"
    }
]

SEED_DIRECTORY = [
    {
        "authority_type": "NALSA",
        "state": "Delhi",
        "district": "New Delhi",
        "office_name": "National Legal Services Authority (NALSA) HQ",
        "address": "B-Block, Additional Building Complex, Supreme Court of India, New Delhi - 110001",
        "contact_number": "15100 (National Helpline)",
        "official_portal_url": "https://nalsa.gov.in/legal-aid/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "SLSA",
        "state": "Delhi",
        "district": "Central Delhi",
        "office_name": "Delhi State Legal Services Authority (DSLSA)",
        "address": "Central Office, Rouse Avenue District Courts Complex, Pandit Deen Dayal Upadhyaya Marg, New Delhi - 110002",
        "contact_number": "1516 (Delhi State Helpline)",
        "official_portal_url": "https://dslsa.org/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "DLSA",
        "state": "Delhi",
        "district": "South Delhi",
        "office_name": "District Legal Services Authority (South Delhi)",
        "address": "Saket District Court Complex, Saket, New Delhi - 110017",
        "contact_number": "011-29562440",
        "official_portal_url": "https://dslsa.org/south-district/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "SLSA",
        "state": "Maharashtra",
        "district": "Mumbai",
        "office_name": "Maharashtra State Legal Services Authority (MSLSA)",
        "address": "105, High Court PWD Building, Fort, Mumbai - 400032",
        "contact_number": "022-22691395",
        "official_portal_url": "https://legalservices.maharashtra.gov.in/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "DLSA",
        "state": "Maharashtra",
        "district": "Mumbai Suburban",
        "office_name": "District Legal Services Authority (Mumbai Suburban)",
        "address": "District & Sessions Court, Bandra (East), Mumbai - 400051",
        "contact_number": "022-26557876",
        "official_portal_url": "https://legalservices.maharashtra.gov.in/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "SLSA",
        "state": "Karnataka",
        "district": "Bengaluru",
        "office_name": "Karnataka State Legal Services Authority (KSLSA)",
        "address": "Nyaya Degula, 1st Floor, H. Siddaiah Road, Bengaluru - 560027",
        "contact_number": "080-22111725",
        "official_portal_url": "https://kslsa.kar.nic.in/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    },
    {
        "authority_type": "SLSA",
        "state": "Uttar Pradesh",
        "district": "Lucknow",
        "office_name": "Uttar Pradesh State Legal Services Authority (UPSLSA)",
        "address": "3rd Floor, Jawahar Bhawan Annexe, Ashok Marg, Lucknow - 226001",
        "contact_number": "0522-2286395",
        "official_portal_url": "https://upslsa.up.nic.in/",
        "verification_status": "verified",
        "last_verified_date": "October 2026"
    }
]

def seed_database(db: Session):
    """Bootstrap seed users, foundational legal documents, chunks, and official directories."""
    # 1. Seed Admin User
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL.lower()).first()
    if not admin:
        admin = User(
            email=settings.ADMIN_EMAIL.lower(),
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
            full_name="NyayaSetu System Administrator",
            role="admin",
            preferred_language="en",
            is_active=True
        )
        db.add(admin)

    # 2. Seed Demo Citizen User
    citizen = db.query(User).filter(User.email == settings.DEMO_CITIZEN_EMAIL.lower()).first()
    if not citizen:
        citizen = User(
            email=settings.DEMO_CITIZEN_EMAIL.lower(),
            hashed_password=hash_password(settings.DEMO_CITIZEN_PASSWORD),
            full_name="Aarav Sharma (Demo Citizen)",
            role="citizen",
            preferred_language="en",
            is_active=True
        )
        db.add(citizen)

    # 3. Seed Verified Legal Resources
    if db.query(LegalResource).count() == 0:
        for res in SEED_RESOURCES:
            r = LegalResource(**res)
            db.add(r)

    # 4. Seed Legal Aid Directory
    if db.query(LegalAidDirectoryEntry).count() == 0:
        for entry in SEED_DIRECTORY:
            e = LegalAidDirectoryEntry(**entry)
            db.add(e)

    # 5. Seed Legal Documents & Chunks
    for doc_data in SEED_DOCUMENTS:
        existing = db.query(LegalDocument).filter(LegalDocument.title == doc_data["title"]).first()
        if not existing:
            pages = doc_data["pages"]
            doc = LegalDocument(
                title=doc_data["title"],
                publisher=doc_data["publisher"],
                document_type=doc_data["document_type"],
                official_url=doc_data["official_url"],
                file_format="txt",
                status="indexed",
                is_approved=True,
                verification_date=doc_data["verification_date"],
                total_chunks=0
            )
            db.add(doc)
            db.flush()

            chunks = chunk_text(pages)
            for c in chunks:
                vec = generate_embedding(c["content"])
                chunk_rec = DocumentChunk(
                    document_id=doc.id,
                    chunk_index=c["chunk_index"],
                    content=c["content"],
                    page_number=c["page_number"],
                    section_title=c["section_title"],
                    embedding_json=json.dumps(vec)
                )
                db.add(chunk_rec)

            doc.total_chunks = len(chunks)

    db.commit()
