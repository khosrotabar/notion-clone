import Document from "@/components/Document";
import { use } from "react";

function DocumentPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const paramsId = use(params).id;

  return (
    <div className='flex flex-col flex-1 h-full'>
      <Document id={paramsId} />
    </div>
  );
}

export default DocumentPage;
