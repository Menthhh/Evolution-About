// @ts-nocheck
"use client"; // Marks this file as a Client Component

import { use } from 'react';
import CreateUpdateContent from '@/components/Admin/UpdateContent';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Access the dynamic route parameter

  const handleNavigate = () => {
    router.push('/some-other-page');
  };

  return (
    <div>
    <div>
     <CreateUpdateContent id={id}/>
    </div>
    </div>
  );
};

export default Page;
