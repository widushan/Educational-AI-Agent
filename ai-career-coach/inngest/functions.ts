import { inngest } from "./client";
import { createAgent, openai } from '@inngest/agent-kit';
import ImageKit from "imagekit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent=createAgent({
  name:'AiCareerChatAgent',
  description:'An AI Agent that anwers career related questions',
  system:`You are a helpful, professional AI Career Coach Agent. Your role is to guide users with questions related to careers, including job search advice, interview preparation, resume improvement, skill development, career transitions, and industry trends. 
  Always respond with clarity, encouragement, and actionable advice tailored to the user's needs. 
  If the user asks something unrelated to careers (e.g., topics like health, relationships, coding help, or general trivia), gently inform them that you are a career coach and suggest relevant career-focused questions instead.`,
  model:openai({
    model:"gpt-4o-mini",
    apiKey:process.env.GPT_API_KEY
  })
})


export const AiCareerAgent = inngest.createFunction(
  {id: 'AiCareerAgent'},
  {event: 'AiCareerAgent'},
  async({event, step}) => {
    const {userInput} = await event?.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
)

var imagekit = new ImageKit({
  //@ts-ignore
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint : process.env.IMAGEKIT_ENDPOINT_URL
});


export const AiResumeAgent = inngest.createFunction(
{ id: "AiResumeAgent" },
{ event: "AiResumeAgent" },
async ({ event, step }) => {
  const { recordId, base64ResumeFile, pdfText } = await event.data;
  const uploadUrl = await step.run("uploadImage", async () => {
    const imageKitFile = await imagekit.upload({
      file: base64ResumeFile,
      fileName: `${Date.now()}.pdf`,
      isPublished: true,
    });
    return imageKitFile.url;
  });
  return { recordId, uploadUrl, pdfText };
}
)