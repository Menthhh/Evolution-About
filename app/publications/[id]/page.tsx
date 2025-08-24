import { notFound } from "next/navigation";
import { samplePublications } from "@/data/sample-publications";
import { PublicationDetailPage } from "@/components/evolution-homepage";

interface PublicationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PublicationPage({
  params,
}: PublicationPageProps) {
  const { id } = await params;
  const publication = samplePublications.find((pub) => pub.id === id);

  if (!publication) {
    notFound();
  }

  return <PublicationDetailPage publication={publication} />;
}

export async function generateStaticParams() {
  return samplePublications.map((publication) => ({
    id: publication.id,
  }));
}

export async function generateMetadata({ params }: PublicationPageProps) {
  const { id } = await params;
  const publication = samplePublications.find((pub) => pub.id === id);

  if (!publication) {
    return {
      title: "หนังสือไม่พบ - Evolution About",
    };
  }

  return {
    title: `${publication.title} - Evolution About`,
    description: `หนังสือ ${publication.title} โดย ${publication.author} - Evolution About`,
  };
}
