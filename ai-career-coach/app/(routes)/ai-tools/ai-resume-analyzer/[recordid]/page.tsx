"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import Report from './_components/Report';

function AiResumeAnalyzer() {
  const { recordid } = useParams();
  const [pdfUrl, setPdfUrl] = useState();
  const [aiReport, setAiReport] = useState();

  const GetResumeAnalyzerRecord = async () => {
    const result = await axios.get('/api/history?recordId=' + recordid);
    console.log(result.data);
    setPdfUrl(result.data?.metaData);
    setAiReport(result.data?.content);
  }
  useEffect(() => {
    GetResumeAnalyzerRecord();
  }, [recordid]);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      <div className='col-span-2'>
        <Report aiReport={aiReport} />
      </div>
      <div className='col-span-2 overflow-y-auto p-4 h-full'>
        <h2 className='text-2xl font-bold mb-5'>Resume Preview</h2>
        <iframe src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'} 
        width='100%'
        height='100%'
        className='min-w-lg' 
        style={{border: 'none', minHeight: '1000px'}}
        />
      </div>
    </div>
  )
}

export default AiResumeAnalyzer