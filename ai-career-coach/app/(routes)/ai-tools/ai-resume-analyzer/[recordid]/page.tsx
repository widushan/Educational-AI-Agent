"use client"
import React from 'react'
import { useParams } from 'next/navigation'

function AiResumeAnalyzer() {
  const { recordid } = useParams();
  return (
    <div>AiResumeAnalyzer {recordid}</div>
  )
}

export default AiResumeAnalyzer