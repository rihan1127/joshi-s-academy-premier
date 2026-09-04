export const site = {
  name: "Joshi’s Academy",
  tagline: "Gyan Ki Varsha",
  location: "Kharadi, Pune, Maharashtra",
  phone: "",
  whatsapp: "",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kharadi%2C+Pune%2C+Maharashtra",
};

export const courses = [
  { slug: "cbse-class-ix-science", board: "CBSE", className: "Class IX", title: "CBSE Class IX Science", description: "Build the conceptual base that makes advanced Science easier to understand.", subjects: "Physics • Chemistry • Biology" },
  { slug: "cbse-class-x-science", board: "CBSE", className: "Class X", title: "CBSE Class X Science", description: "Focused concept mastery, structured revision and serious board preparation.", subjects: "Physics • Chemistry • Biology" },
  { slug: "icse-class-ix-science", board: "ICSE", className: "Class IX", title: "ICSE Class IX Science", description: "Detailed learning designed for the depth and rigour of the ICSE curriculum.", subjects: "Physics • Chemistry • Biology" },
  { slug: "icse-class-x-science", board: "ICSE", className: "Class X", title: "ICSE Class X Science", description: "A disciplined programme for understanding, application and board confidence.", subjects: "Physics • Chemistry • Biology" },
] as const;

export const approach = [
  ["Concept-Based Learning", "We connect every formula and definition to the idea behind it, so students can reason instead of memorise."],
  ["Personalised Attention", "Individual learning gaps are noticed early and addressed with focused guidance."],
  ["Small Batches", "A focused classroom gives every student the space to ask, answer and participate."],
  ["Structured Notes", "Clear, organised notes turn revision into a deliberate process rather than a last-minute scramble."],
  ["Regular Testing", "Chapter tests, MCQs and cumulative practice make progress visible throughout the year."],
  ["Dedicated Doubt Solving", "Questions are treated as part of learning, with time reserved to resolve them properly."],
] as const;

export const faqs = [
  ["Which classes does Joshi’s Academy teach?", "Joshi’s Academy focuses on Science for students in Classes IX and X."],
  ["Does Joshi’s Academy teach CBSE and ICSE?", "Yes. The academy offers specialist Science coaching for both CBSE and ICSE curricula."],
  ["Does the academy specialise in Science?", "Yes. The programme is dedicated to Physics, Chemistry and Biology, with an emphasis on conceptual understanding."],
  ["Are batches small?", "Yes. Small batches are central to the academy’s approach and allow for personalised attention."],
  ["Are regular tests conducted?", "Yes. Students receive regular testing, MCQ practice and board-focused preparation."],
  ["Where is Joshi’s Academy located?", "The academy is located in Kharadi, Pune, Maharashtra. Contact details and precise directions will be published once verified."],
] as const;

export const articles = [
  { slug: "score-90-cbse-class-10-science", category: "CBSE Science", title: "How to Score 90+ in CBSE Class 10 Science", excerpt: "A practical framework for turning the syllabus into a clear, repeatable preparation plan." },
  { slug: "class-10-science-preparation-strategy", category: "Class X", title: "Class 10 Science Preparation Strategy", excerpt: "How to balance conceptual study, written practice, revision and timed papers." },
  { slug: "physics-numericals-common-mistakes", category: "Physics", title: "Physics Numericals: Common Mistakes", excerpt: "The small reasoning errors that cost marks—and the habits that prevent them." },
  { slug: "biology-board-exam-preparation", category: "Biology", title: "Biology Board Exam Preparation", excerpt: "A thoughtful approach to concepts, terminology, diagrams and written answers." },
] as const;