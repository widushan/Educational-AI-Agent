"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

function CoverLetterPage() {
  const { recordid } = useParams();
  const [letterData, setLetterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const res = await axios.get("/api/history?recordId=" + recordid);
        setLetterData(res.data?.content);
      } catch (err: any) {
        setError(
          err?.response?.data?.error ??
            err?.message ??
            "Failed to load cover letter.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (recordid) {
      fetchLetter();
    }
  }, [recordid]);

  const onPrint = () => {
    if (!printRef.current) return;
    window.print();
  };

  if (loading) {
    return <div className="p-6">Loading cover letter...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 text-sm">{error}</div>;
  }

  const companyName = letterData?.companyName;
  const positionTitle = letterData?.positionTitle;
  const letterText = letterData?.letterText;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-1 border rounded-xl p-5 bg-white">
        <h2 className="text-2xl font-bold mb-2">
          Cover Letter Preview{positionTitle ? ` – ${positionTitle}` : ""}
        </h2>
        {companyName && (
          <p className="text-sm text-muted-foreground mb-1">
            Company: <span className="font-medium">{companyName}</span>
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Button onClick={onPrint}>Download as PDF</Button>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Regenerate Letter
          </Button>
        </div>
      </div>

      <div
        ref={printRef}
        className="md:col-span-2 border rounded-xl p-6 bg-white leading-relaxed whitespace-pre-wrap"
      >
        {letterText || "No letter content available yet."}
      </div>
    </div>
  );
}

export default CoverLetterPage;

