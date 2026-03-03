"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ResumeUploadDialog from './ResumeUploadDialog';
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';
import CoverLetterDialog from './CoverLetterDialog';

interface TOOL {
    name: string,
    desc: string,
    icon: string,
    button: string,
    path: string
  }

type AIToolProps = {
    tool:TOOL
}
  
  function AiToolCard({tool}: AIToolProps) {

    const [id, setId] = useState<string | null>(null);
    useEffect(() => {
      setId(uuidv4());
    }, []);
    const {user} = useUser();
    const router = useRouter();
    const [openResumeUpload, setOpenResumeUpload] = useState(false);
    const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
    const [openCoverDialog, setOpenCoverDialog] = useState(false);

    const onClickButton = async (e?: React.MouseEvent) => {

      if (tool.name === 'AI Resume Analyzer') {
        e?.preventDefault();
        setOpenResumeUpload(true);
        return;
      }

      if (tool.path === '/ai-tools/ai-roadmap-agent') {
        e?.preventDefault();
        setOpenRoadmapDialog(true);
        return;
      }

      if (tool.path === '/ai-tools/coverletter-generator') {
        e?.preventDefault();
        setOpenCoverDialog(true);
        return;
      }

      if (!id) return;
      // Create New record to History Table
      const result = await axios.post('/api/history', {
        recordId: id,
        content: [],
        aiAgentType: tool.path
      });
      console.log(result);
      router.push(tool.path + "/" + id)
    }

    return (
      <div className='p-3 border rounded-lg'>
        <Image src={tool.icon} width={50} height={50} alt={tool.name} />
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Link href={id ? tool.path + "/" + id : tool.path}>
          <Button
            className='w-full mt-3 cursor-pointer'
            onClick={onClickButton}
            disabled={!id}
          >
            {tool.button}
          </Button>
        </Link>

        <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeUpload={setOpenResumeUpload} />

        <RoadmapGeneratorDialog 
          openDialog={openRoadmapDialog} 
          setOpenDialog={()=>setOpenRoadmapDialog(false)} 
        />

        <CoverLetterDialog
          openDialog={openCoverDialog}
          setOpenDialog={setOpenCoverDialog}
        />

      </div>
    )
  }

export default AiToolCard