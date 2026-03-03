"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { File, Loader2Icon, Sparkles } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};

function CoverLetterDialog({ openDialog, setOpenDialog }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setResumeFile(file);
    setError(null);
  };

  const canSubmit =
    !!companyName && !!positionTitle && !!resumeFile && !loading;

  const onGenerate = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      const recordId = uuidv4();
      const formData = new FormData();
      formData.append("recordId", recordId);
      formData.append("companyName", companyName);
      formData.append("positionTitle", positionTitle);
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }

      await axios.post("/api/ai-cover-letter-agent", formData);
      setOpenDialog(false);
      router.push("/ai-tools/coverletter-generator/" + recordId);
    } catch (err: any) {
      const message =
        err?.response?.data?.error ??
        err?.message ??
        "Failed to generate cover letter. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Enter Details to Create Your Cover Letter
          </DialogTitle>
          <DialogDescription>
            Provide the company, role, and upload your resume to generate a
            tailored cover letter.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Input
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Input
            placeholder="Position to apply for"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
          />

          <div>
            <label
              htmlFor="coverResumeUpload"
              className="flex flex-col items-center justify-center p-4 border border-dashed rounded-lg cursor-pointer hover:bg-slate-100"
            >
              <File className="h-6 w-6" />
              {resumeFile ? (
                <span className="text-sm font-medium text-blue-600 mt-2">
                  {resumeFile.name}
                </span>
              ) : (
                <span className="mt-2 text-sm font-medium">
                  Click to upload resume (PDF)
                </span>
              )}
            </label>
            <input
              id="coverResumeUpload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={onFileChange}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpenDialog(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={onGenerate} disabled={!canSubmit}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Sparkles />
            )}{" "}
            Generate Letter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverLetterDialog;

