import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { File, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';



function ResumeUploadDialog({openResumeUpload, setOpenResumeUpload}:any) {

  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (event:any) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);
    }
  }

  const onUploadAndAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const recordId = uuidv4();
      const formData = new FormData();
      formData.append("recordId", recordId);
      formData.append("resumeFile", file);
      // Send FormData to Backend Server
      const result = await axios.post("/api/ai-resume-agent", formData);
      console.log(result.data);
      setOpenResumeUpload(false);
    } catch (err: any) {
      const message =
        err?.response?.data?.error ??
        err?.message ??
        "Upload failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Your Resume PDF File</DialogTitle>
              <DialogDescription>
                Click or drop your PDF resume to analyze it.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <label htmlFor="resumeUpload" className="flex flex-col items-center justify-center p-7 border border-dashed rounded-lg cursor-pointer hover:bg-slate-100">
                <File className="h-10 w-10" />
                {file ? <span className="text-sm font-medium text-blue-600 mt-3">{file?.name}</span> : <span className="mt-3 text-sm font-medium">Click here to Upload</span>}
              </label>
              <input type="file" id="resumeUpload" className="hidden" accept=".pdf" onChange={onFileChange} />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenResumeUpload(false)} disabled={loading}>Cancel</Button>
              <Button disabled={!file} onClick={onUploadAndAnalyze}> <Sparkles /> Upload & Analyze</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ResumeUploadDialog