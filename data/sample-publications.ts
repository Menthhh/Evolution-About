import { Book } from "@/types/evolution-homepage";

/**
 * Sample book data for Evolution About homepage
 * This demonstrates the BookCard and BooksSection components
 */
export const sampleBooks: Book[] = [
  {
    id: "evolution-about-vol-1",
    title: "Evolution About: ความรู้พื้นฐานเรื่องวิวัฒนาการ เล่ม 1",
    coverImage: "/images/publications/evolution-about-vol-1.jpg",
    author: "Evolution About Team",
    year: "2024",
    href: "/publications/evolution-about-vol-1",
  },
  {
    id: "evolution-about-vol-2",
    title: "Evolution About: วิวัฒนาการของสิ่งมีชีวิต เล่ม 2",
    coverImage: "/images/publications/evolution-about-vol-2.jpg",
    author: "Evolution About Team",
    year: "2024",
    href: "/publications/evolution-about-vol-2",
  },
  {
    id: "evolution-about-vol-3",
    title: "Evolution About: ความหลากหลายทางชีวภาพ เล่ม 3",
    coverImage: "/images/publications/evolution-about-vol-3.jpg",
    author: "Evolution About Team",
    year: "2024",
    href: "/publications/evolution-about-vol-3",
  },
  {
    id: "evolution-guide",
    title: "คู่มือการศึกษาวิวัฒนาการสำหรับครู",
    coverImage: "/images/publications/evolution-guide.jpg",
    author: "Dr. Siriporn Thanakit",
    year: "2023",
    href: "/publications/evolution-guide",
  },
  {
    id: "dna-basics",
    title: "DNA และพันธุกรรม: พื้นฐานสู่ความเข้าใจ",
    coverImage: "/images/publications/dna-basics.jpg",
    author: "Prof. Somchai Jitpakdee",
    year: "2023",
    href: "/publications/dna-basics",
  },
  {
    id: "fossil-record",
    title: "บันทึกฟอสซิล: หลักฐานแห่งวิวัฒนาการ",
    coverImage: "/images/publications/fossil-record.jpg",
    author: "Dr. Niran Fossil",
    year: "2022",
    href: "/publications/fossil-record",
  },
  {
    id: "darwin-origin",
    title: "ต้นกำเนิดสายพันธุ์: ฉบับแปลไทย",
    coverImage: "/images/publications/dna-basics.jpg",
    author: "Charles Darwin",
    year: "2023",
    href: "/publications/darwin-origin",
  },
  {
    id: "molecular-evolution",
    title: "วิวัฒนาการระดับโมเลกุล: ศตวรรษที่ 21",
    coverImage: "/images/publications/evolution-about-vol-3.jpg",
    author: "Dr. Pattana Genetics",
    year: "2024",
    href: "/publications/molecular-evolution",
  },
  {
    id: "biodiversity-thailand",
    title: "ความหลากหลายทางชีวภาพในประเทศไทย",
    coverImage: "/images/publications/evolution-guide.jpg",
    author: "สถาบันวิจัยชีววิทยา",
    year: "2023",
    href: "/publications/biodiversity-thailand",
  },
];

// Backward compatibility export
export const samplePublications = sampleBooks;
