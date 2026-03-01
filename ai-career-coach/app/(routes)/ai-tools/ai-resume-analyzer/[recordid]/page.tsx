"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';

function AiResumeAnalyzer() {
  const { recordid } = useParams();

  const GetResumeAnalyzerRecord = async () => {
    const result = await axios.get('/api/history?recordId=' + recordid);
    console.log(result.data);
  }
  useEffect(() => {
    GetResumeAnalyzerRecord();
  }, [recordid]);

  return (
    <div>AiResumeAnalyzer {recordid}</div>
  )
}

export default AiResumeAnalyzer