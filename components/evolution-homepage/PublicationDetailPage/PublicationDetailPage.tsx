"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "../Navigation";
import { ArrowLeft, Download, Book, Calendar, User } from "lucide-react";
import { Book as BookType } from "@/types/evolution-homepage";

const navigationItems = [
  {
    id: "home",
    label: "หน้าแรก",
    href: "/evolution-homepage",
    isActive: false,
  },
  { id: "articles", label: "บทความ", href: "/articles", isActive: false },
  { id: "books", label: "หนังสือ", href: "/publications", isActive: true },
  { id: "videos", label: "วิดีโอ", href: "/videos", isActive: false },
  { id: "podcasts", label: "พอดแคสต์", href: "/podcasts", isActive: false },
];

interface PublicationDetailPageProps {
  publication: BookType;
}

export function PublicationDetailPage({
  publication,
}: PublicationDetailPageProps) {
  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    alert(`กำลังดาวน์โหลด: ${publication.title}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/images/background-cover.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="min-h-screen bg-black/60">
        {/* Navigation */}
        <Navigation items={navigationItems} activeItem="books" />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-20 pb-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/publications">
              <Button
                variant="outline"
                className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้าหนังสือ
              </Button>
            </Link>
          </div>

          {/* Publication Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
            {/* Book Cover */}
            <div className="space-y-6">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={publication.coverImage}
                    alt={`${publication.title} - Evolution About Publication`}
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority
                  />
                </div>

                {/* Download Button */}
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-medium"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    ดาวน์โหลดหนังสือ
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    ไฟล์ PDF • ฟรี • Evolution About
                  </p>
                </div>
              </div>

              {/* Publication Stats */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h3 className="text-white font-semibold text-lg mb-4">
                  ข้อมูลหนังสือ
                </h3>
                <div className="space-y-3">
                  {publication.author && (
                    <div className="flex items-center space-x-3 text-gray-300">
                      <User className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">{publication.author}</span>
                    </div>
                  )}
                  {publication.year && (
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">ปี {publication.year}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Book className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">หนังสืออิเล็กทรอนิกส์</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              {/* Title and Meta */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-yellow-400 text-black hover:bg-yellow-500 mb-3">
                      Evolution About Publication
                    </Badge>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {publication.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    {publication.author && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{publication.author}</span>
                      </div>
                    )}
                    {publication.year && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>ปี {publication.year}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h2 className="text-white font-semibold text-xl mb-4">
                  เกี่ยวกับหนังสือเล่มนี้
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">
                    {getPublicationDescription(publication.id)}
                  </p>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h2 className="text-white font-semibold text-xl mb-4">
                  สารบัญ
                </h2>
                <div className="space-y-2">
                  {getTableOfContents(publication.id).map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 py-2 border-b border-gray-700/50 last:border-b-0"
                    >
                      <span className="text-yellow-400 font-medium text-sm mt-0.5">
                        {index + 1}.
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {chapter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Publications */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600/40">
                <h2 className="text-white font-semibold text-xl mb-4">
                  หนังสือที่เกี่ยวข้อง
                </h2>
                <div className="space-y-3">
                  {getRelatedPublications(publication.id).map(
                    (relatedPub, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <Link
                          href={relatedPub.href}
                          className="text-gray-300 text-sm hover:text-white hover:underline line-clamp-2 transition-colors"
                        >
                          {relatedPub.title}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions to generate content based on publication ID
function getPublicationDescription(id: string): string {
  const descriptions: Record<string, string> = {
    "evolution-about-vol-1":
      "หนังสือเล่มแรกของชุด Evolution About ที่นำเสนอความรู้พื้นฐานเรื่องวิวัฒนาการอย่างเข้าใจง่าย เหมาะสำหรับผู้ที่เริ่มต้นศึกษาเรื่องวิวัฒนาการ ครอบคลุมตั้งแต่ประวัติศาสตร์ของทฤษฎีวิวัฒนาการ หลักฐานทางวิทยาศาสตร์ ไปจนถึงการประยุกต์ใช้ในชีวิตประจำวัน",
    "evolution-about-vol-2":
      "เล่มที่สองของชุด Evolution About เจาะลึกเรื่องวิวัฒนาการของสิ่งมีชีวิต ตั้งแต่จุดเริ่มต้นของชีวิตบนโลก การเปลี่ยนแปลงของสายพันธุ์ต่างๆ และกระบวนการวิวัฒนาการที่ทำให้เกิดความหลากหลายทางชีวภาพที่เราเห็นในปัจจุบัน",
    "evolution-about-vol-3":
      "เล่มสุดท้ายของชุด Evolution About ที่เน้นเรื่องความหลากหลายทางชีวภาพ การอนุรักษ์ และความสำคัญของการรักษาสมดุลของระบบนิเวศ พร้อมกับการอธิบายถึงบทบาทของมนุษย์ในการส่งผลต่อวิวัฒนาการของสิ่งมีชีวิตอื่นๆ",
    default:
      "หนังสือที่รวบรวมความรู้เกี่ยวกับวิวัฒนาการและวิทยาศาสตร์ที่เกี่ยวข้อง นำเสนอด้วยภาษาไทยที่เข้าใจง่าย เหมาะสำหรับผู้ที่สนใจศึกษาเรื่องวิวัฒนาการและต้องการความรู้ที่ถูกต้องตามหลักวิทยาศาสตร์",
  };

  return descriptions[id] || descriptions.default;
}

function getTableOfContents(id: string): string[] {
  const contents: Record<string, string[]> = {
    "evolution-about-vol-1": [
      "บทนำ: วิวัฒนาการคืออะไร",
      "ประวัติศาสตร์ของทฤษฎีวิวัฒนาการ",
      "ชาร์ลส์ ดาร์วิน และต้นกำเนิดสายพันธุ์",
      "หลักฐานทางวิทยาศาสตร์ของวิวัฒนาการ",
      "การคัดเลือกโดยธรรมชาติ",
      "พันธุกรรมและวิวัฒนาการ",
      "วิวัฒนาการในชีวิตประจำวัน",
    ],
    "evolution-about-vol-2": [
      "จุดเริ่มต้นของชีวิต",
      "วิวัฒนาการของเซลล์",
      "การเกิดขึ้นของสิ่งมีชีวิตหลายเซลล์",
      "วิวัฒนาการของพืช",
      "วิวัฒนาการของสัตว์",
      "การสูญพันธุ์และการเกิดใหม่",
      "วิวัฒนาการของมนุษย์",
    ],
    "evolution-about-vol-3": [
      "ความหลากหลายทางชีวภาพ",
      "ระบบนิเวศและวิวัฒนาการ",
      "การปรับตัวของสิ่งมีชีวิต",
      "การอนุรักษ์ความหลากหลายทางชีวภาพ",
      "ผลกระทบของมนุษย์ต่อวิวัฒนาการ",
      "อนาคตของวิวัฒนาการ",
      "บทสรุปและข้อคิด",
    ],
    default: [
      "บทนำ",
      "เนื้อหาหลัก",
      "ตัวอย่างและกรณีศึกษา",
      "การประยุกต์ใช้",
      "บทสรุป",
    ],
  };

  return contents[id] || contents.default;
}

function getRelatedPublications(currentId: string) {
  // This would normally come from a database or API
  const related = [
    {
      title: "คู่มือการศึกษาวิวัฒนาการสำหรับครู",
      href: "/publications/evolution-guide",
    },
    {
      title: "DNA และพันธุกรรม: พื้นฐานสู่ความเข้าใจ",
      href: "/publications/dna-basics",
    },
    {
      title: "บันทึกฟอสซิล: หลักฐานแห่งวิวัฒนาการ",
      href: "/publications/fossil-record",
    },
    {
      title: "ต้นกำเนิดสายพันธุ์: ฉบับแปลไทย",
      href: "/publications/darwin-origin",
    },
  ];

  return related.filter((pub) => !pub.href.includes(currentId)).slice(0, 4);
}

export default PublicationDetailPage;
