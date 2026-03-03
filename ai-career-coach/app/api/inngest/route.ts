import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  AiCareerAgent,
  AiResumeAgent,
  AIRoadmapAgent,
  CoverLetterAgent,
  helloWorld,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [AiCareerAgent, AiResumeAgent, AIRoadmapAgent, CoverLetterAgent],
});