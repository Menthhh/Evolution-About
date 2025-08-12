import { Publication } from "@/types/evolution-homepage";

/**
 * Sample publication data for Evolution About homepage
 * This demonstrates the PublicationCard and PublicationsGallery components
 */
export const samplePublications: Publication[] = [
  {
    id: "evolution-about-vol-1",
    title: "Evolution About: ความรู้พื้นฐานเรื่องวิวัฒนาการ เล่ม 1",
    coverImage: "/images/publications/evolution-about-vol-1.jpg",
    volume: "1",
    year: "2024",
    href: "/publications/evolution-about-vol-1",
  },
  {
    id: "evolution-about-vol-2",
    title: "Evolution About: วิวัฒนาการของสิ่งมีชีวิต เล่ม 2",
    coverImage: "/images/publications/evolution-about-vol-2.jpg",
    volume: "2",
    year: "2024",
    href: "/publications/evolution-about-vol-2",
  },
  {
    id: "evolution-about-vol-3",
    title: "Evolution About: ความหลากหลายทางชีวภาพ เล่ม 3",
    coverImage: "/images/publications/evolution-about-vol-3.jpg",
    volume: "3",
    year: "2024",
    href: "/publications/evolution-about-vol-3",
  },
  {
    id: "evolution-guide",
    title: "คู่มือการศึกษาวิวัฒนาการสำหรับครู",
    coverImage: "/images/publications/evolution-guide.jpg",
    year: "2023",
    href: "/publications/evolution-guide",
  },
  {
    id: "dna-basics",
    title: "DNA และพันธุกรรม: พื้นฐานสู่ความเข้าใจ",
    coverImage: "/images/publications/dna-basics.jpg",
    year: "2023",
    href: "/publications/dna-basics",
  },
  {
    id: "fossil-record",
    title: "บันทึกฟอสซิล: หลักฐานแห่งวิวัฒนาการ",
    coverImage: "/images/publications/fossil-record.jpg",
    year: "2022",
    href: "/publications/fossil-record",
  },
];
