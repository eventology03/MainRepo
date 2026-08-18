// Copy for the staged homepage. Self-contained on purpose: translations.ts is
// managed through the Lovable editor, and this page's strings don't overlap with
// the ones the other routes use.
import svc01 from "@/assets/services/01-planning-and-management.jpg";
import svc02 from "@/assets/services/02-on-site-supervision.jpg";
import svc03 from "@/assets/services/03-equipment-and-decor.jpg";
import svc04 from "@/assets/services/04-hospitality-and-catering.jpg";
import svc05 from "@/assets/services/05-technical-and-visual-production.jpg";
import svc06 from "@/assets/services/06-visual-identity-and-design.jpg";

export const serviceImages = [svc01, svc02, svc03, svc04, svc05, svc06];

export type HomeCopy = (typeof homeCopy)["en"];

export const homeCopy = {
  en: {
    menu: "Menu",
    close: "Close",
    nav: {
      services: "Services",
      principles: "Principles",
      who: "Who We Are",
      contact: "Contact",
      tickets: "Tickets",
    },
    prefs: "Language",
    prefsHint: "English / العربية",
    ctaBook: "Book a free consultation",
    ctaServices: "Services",
    scroll: "Scroll",
    labels: {
      services: "(Services)",
      principles: "(Principles)",
      about: "(About)",
      contact: "(Contact)",
    },
    servicesHeading: "Our Services",
    workWithUs: "Work With Us",
    seeAll: "See all (06)",
    services: [
      {
        title: "Event Planning and Management",
        body: "From concept to execution, comprehensive solutions for conferences, meetings and events across corporate and private clients.",
      },
      {
        title: "On-Site Supervision and Execution",
        body: "Precise on-site oversight ensuring smooth event flow and the highest quality across every detail on the day.",
      },
      {
        title: "Equipment and Décor",
        body: "Table and seating setups, floral arrangements and furniture selection aligned with the event's identity.",
      },
      {
        title: "Hospitality and Catering",
        body: "Premium buffets, beverages, professional serving and a trained hospitality team.",
      },
      {
        title: "Technical and Visual Production",
        body: "Advanced sound and lighting, display screens, photography and video equipment, and full media coverage.",
      },
      {
        title: "Visual Identity and Design",
        body: "Invitations, advertisements and visual systems that reflect the character of the event and the organizing brand.",
      },
    ],
    principlesEyebrow: "Our Principles",
    principles: [
      {
        title: "Reliability.",
        body: "To be the trusted force behind seamlessly executed events, where structure, clarity, and disciplined execution turn ideas into reliable outcomes.",
      },
      {
        title: "Little Details.",
        body: "We plan, design, and execute events as a unified operation, taking full responsibility for every detail to ensure each event is delivered exactly as intended.",
      },
      {
        title: "Simple and reliable",
        body: "Our goal is to streamline the execution of your ideas by delivering solutions that optimize time, effort, and budget through an extensive network of service providers.",
      },
    ],
    aboutHeading: "United team, one idea, and a goal succeeded.",
    about: [
      {
        title: "Who We Are",
        body: "Eventology exists to transform event execution from a source of stress and operational burden into a seamless process with dependable outcomes.",
      },
      {
        title: "What We Do",
        body: "We take end-to-end ownership of your event under a single accountable operation — from vendor management and paperwork to gate control, guest wayfinding and stage security.",
      },
      {
        title: "How We Do It",
        body: "We adapt to each event's unique demands, sourcing and coordinating every solution required to deliver the intended outcome.",
      },
      {
        title: "Why Choose Us",
        body: "Our approach gives strategic ideation and collaborative planning the weight they deserve, building a precise operational blueprint that guarantees predictable outcomes.",
      },
    ],
    contactEyebrow: "Let's Talk",
    contactHeading: "Tell us about your idea. We'll handle how.",
    whatsappTitle: "Chat on WhatsApp",
    whatsappBody: "Get a reply during operating hours, usually within the hour.",
    whatsappCta: "Open WhatsApp",
    emailTitle: "Email us",
    emailBody: "Send a brief, deck, or a paragraph — we'll write back with next steps.",
    footerContact: "Contact",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
  },
  ar: {
    menu: "القائمة",
    close: "إغلاق",
    nav: {
      services: "الخدمات",
      principles: "مبادئنا",
      who: "من نحن",
      contact: "تواصل معنا",
      tickets: "التذاكر",
    },
    prefs: "اللغة",
    prefsHint: "English / العربية",
    ctaBook: "احصل على استشارة مجانية",
    ctaServices: "الخدمات",
    scroll: "مرر للأسفل",
    labels: {
      services: "(الخدمات)",
      principles: "(مبادئنا)",
      about: "(من نحن)",
      contact: "(تواصل معنا)",
    },
    servicesHeading: "خدماتنا",
    workWithUs: "اعمل معنا",
    seeAll: "عرض الكل (٠٦)",
    services: [
      {
        title: "تخطيط وإدارة الفعاليات",
        body: "من الفكرة إلى التنفيذ، حلول شاملة للمؤتمرات والاجتماعات والفعاليات.",
      },
      {
        title: "الإشراف والتنفيذ في الموقع",
        body: "إشراف دقيق يضمن انسيابية الفعالية وأعلى مستويات الجودة في كل تفصيل.",
      },
      {
        title: "التجهيزات والديكور",
        body: "تنسيق الطاولات والجلسات والزهور واختيار الأثاث بما يتوافق مع هوية الفعالية.",
      },
      {
        title: "الضيافة والتغذية",
        body: "بوفيهات ومشروبات متميزة وخدمة احترافية وفريق ضيافة مدرب.",
      },
      {
        title: "الإنتاج التقني والبصري",
        body: "أنظمة صوت وإضاءة متقدمة وشاشات عرض ومعدات تصوير وتغطية إعلامية كاملة.",
      },
      {
        title: "الهوية البصرية والتصميم",
        body: "الدعوات والإعلانات والأنظمة البصرية التي تعبر عن شخصية الفعالية والجهة المنظمة.",
      },
    ],
    principlesEyebrow: "مبادئنا",
    principles: [
      {
        title: "الموثوقية.",
        body: "أن نكون القوة الموثوقة خلف تنفيذ الفعاليات بسلاسة، حيث يحوّل التنظيم والوضوح والتنفيذ المنضبط الأفكار إلى نتائج موثوقة.",
      },
      {
        title: "التفاصيل الصغيرة.",
        body: "نخطط ونصمم وننفذ الفعاليات كعملية واحدة متكاملة، ونتحمل المسؤولية الكاملة عن كل تفصيل لضمان تنفيذ الفعالية كما أُريد لها تماماً.",
      },
      {
        title: "بسيط وموثوق",
        body: "هدفنا تسهيل تنفيذ أفكارك من خلال حلول توفر الوقت والجهد والميزانية عبر شبكة واسعة من مزودي الخدمات.",
      },
    ],
    aboutHeading: "فريق واحد، فكرة واحدة، وهدف تحقق.",
    about: [
      {
        title: "من نحن",
        body: "تأسست إيفنتولوجي لتحويل تنفيذ الفعاليات من عبء تشغيلي ومصدر للضغط إلى عملية سلسة بنتائج يمكن الاعتماد عليها.",
      },
      {
        title: "ما نقوم به",
        body: "نتولى فعاليتك من البداية إلى النهاية تحت إدارة واحدة مسؤولة — من إدارة المورّدين والأعمال الورقية إلى ضبط البوابات وإرشاد الضيوف وتأمين المسرح.",
      },
      {
        title: "كيف نعمل",
        body: "نتعامل مع متطلبات كل فعالية على حدة، ونوفر وننسق كل ما يلزم لتحقيق النتيجة المطلوبة.",
      },
      {
        title: "لماذا نحن",
        body: "نمنح التفكير الاستراتيجي والتخطيط المشترك ما يستحقانه من اهتمام، لنبني مخططاً تشغيلياً دقيقاً يضمن نتائج متوقعة.",
      },
    ],
    contactEyebrow: "لنتحدث",
    contactHeading: "أخبرنا بفكرتك، ونحن نتولى التنفيذ.",
    whatsappTitle: "تواصل على واتساب",
    whatsappBody: "نرد خلال ساعات العمل، غالباً في أقل من ساعة.",
    whatsappCta: "افتح واتساب",
    emailTitle: "راسلنا بالبريد",
    emailBody: "أرسل ملخصاً أو عرضاً أو حتى فقرة، وسنرد بالخطوات التالية.",
    footerContact: "تواصل",
    instagram: "إنستغرام",
    whatsapp: "واتساب",
  },
} as const;
