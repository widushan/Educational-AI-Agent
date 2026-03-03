<div align="center">

# 🤖 AI Career Coach

**Your intelligent partner for career growth — powered by AI.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

[🌐 Live Demo](#) · [📖 Docs](#getting-started) · [🐛 Report Bug](https://github.com/widushan/Educational-AI-Agent/issues) · [💡 Request Feature](https://github.com/widushan/Educational-AI-Agent/issues)

</div>

---

## ✨ What is AI Career Coach?

AI Career Coach is a full-stack **Educational AI Agent** that helps you land your dream job. From building resumes to generating cover letters and planning your career roadmap — all powered by cutting-edge AI.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 💬 **AI Chat** | Chat with an AI mentor for career advice, mock interviews, and guidance |
| 📄 **Resume Analyzer** | Get instant, AI-powered feedback on your resume |
| ✉️ **Cover Letter Generator** | Generate tailored cover letters in seconds |
| 🗺️ **Career Roadmap Agent** | Get a personalized, step-by-step career learning roadmap |
| 📊 **Dashboard** | Track your progress, history, and activities in one place |
| 🔐 **Auth & Profile** | Secure authentication and a personal profile powered by Clerk |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **UI** | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [Radix UI](https://radix-ui.com), [Lucide Icons](https://lucide.dev) |
| **Auth** | [Clerk](https://clerk.com) |
| **Database** | [Neon (Serverless Postgres)](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team) |
| **AI / LLM** | [LangChain](https://js.langchain.com), [Inngest AgentKit](https://inngest.com) |
| **Storage** | [Supabase](https://supabase.com), [ImageKit](https://imagekit.io) |
| **Background Jobs** | [Inngest](https://inngest.com) |
| **Validation** | [Zod](https://zod.dev), [React Hook Form](https://react-hook-form.com) |

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/widushan/Educational-AI-Agent.git
cd Educational-AI-Agent/ai-career-coach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your API keys and credentials in the `.env` file:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Neon Database
DATABASE_URL=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

### 4. Run database migrations

```bash
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it in action! 🎉

https://educational-ai-agent-xi.vercel.app/


<img width="1912" height="1026" alt="Image" src="https://github.com/user-attachments/assets/66851678-2292-4739-92b2-1d5e3a9420f2" />

<img width="1917" height="1027" alt="Image" src="https://github.com/user-attachments/assets/cda5e77a-fb83-4331-8f55-efae10f9078e" />

<img width="1910" height="1022" alt="Image" src="https://github.com/user-attachments/assets/6a0bbbf7-9158-4bc4-aed1-eda2073fa656" />

<img width="1912" height="1032" alt="Image" src="https://github.com/user-attachments/assets/035ecc32-e43a-45cb-be96-7d6d1321b03c" />

<img width="1910" height="1016" alt="Image" src="https://github.com/user-attachments/assets/8b43b09a-b247-4d07-85f5-2345c6ac2286" />

<img width="1903" height="1021" alt="Image" src="https://github.com/user-attachments/assets/dab24238-2515-4c5e-9c55-cbce50c0f6cc" />

<img width="1907" height="1022" alt="Image" src="https://github.com/user-attachments/assets/6bc20693-b3f1-4f8a-9554-b836138f735e" />

---

## 📁 Project Structure

```
ai-career-coach/
├── app/
│   ├── (auth)/          # Sign-in / Sign-up pages
│   ├── (routes)/
│   │   ├── dashboard/   # Main dashboard
│   │   ├── ai-tools/    # AI feature pages (chat, resume, roadmap, cover letter)
│   │   ├── my-history/  # User activity history
│   │   └── profile/     # User profile
│   └── api/             # API route handlers
├── components/          # Reusable UI components
├── configs/             # DB & app configuration
├── inngest/             # Background agent functions
├── lib/                 # Utility functions & helpers
└── public/              # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [widushan](https://github.com/widushan)

⭐ **Star this repo if you find it helpful!** ⭐

</div>
