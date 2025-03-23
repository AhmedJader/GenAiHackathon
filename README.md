# GenAiHackathon

# 🌍 Sustainable Agentic Tutor — AI for Equity, Education & the Planet

> **Empowering learning through self-hosted LLMs. Designed for education. Built for sustainability. Driven by DEI.**

---

## 📚 Overview

This project is a next-generation educational agentic system that:

- ✅ Creates personalized learning paths using students' quiz responses
- 🔍 Uses a **RAG pipeline** powered by self-hosted LLMs to pull knowledge from curriculum PDFs
- 🔗 Fetches **real, trustworthy learning resources** (like Khan Academy & YouTube) using live search
- 🌐 Offers **multi-language support** with translation capabilities (e.g., English and other languages)
- 💻 Includes a **Next.js web app** frontend with a rich, interactive experience
- 📊 Provides a **live dashboard** showing energy usage, carbon savings, and cost comparisons

---

## 🌱 Why Sustainability + DEI?

Traditional cloud-based LLMs contribute to high energy consumption and carbon emissions. By self-hosting open-source models like `Ollama`, `Gemma`, and `StableLM`, this project:

- ⚡ Reduces compute footprint
- 🌎 Promotes green AI adoption
- 💰 Demonstrates **real-time cost savings** over services like OpenAI
- 🤝 Ensures equity by offering **free and accessible education tools**, adaptable across languages and learning needs

---

## 🧠 Agentic Workflow Summary

1. **Student takes a quiz** (in English or a variety of other languages)
2. **PDF curriculum** is uploaded
3. Self-hosted LLMs:
   - Identify **student strengths** and **weaknesses**
   - Use a **RAG pipeline** to generate a personalized learning path
4. Topics are extracted from the path
5. Search APIs fetch real-time educational content (Khan Academy, YouTube)
6. The LLM filters and cleans the resources for relevance

---

## 💻 Frontend: Built with Next.js

Our responsive web app is built using **Next.js**, providing a seamless user experience where students can:

- 📋 Take subject-specific quizzes
- 📎 Upload their curriculum PDFs
- 📊 View a **real-time dashboard** of learning recommendations and environmental insights

---

## 📊 Sustainability Dashboard

In the **Dashboard** tab of our app, we highlight measurable impact:

| Metric                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| ⚡ **Energy Usage**   | Tracks approximate energy consumption per session       |
| 🌱 **Carbon Savings** | Compares emissions from local vs cloud LLM usage        |
| 💸 **Cost Savings**   | Token-level comparison: self-hosted vs OpenAI API calls |

This level of **transparency** helps build awareness about the environmental impact of AI — and proves that **sustainable AI is possible**.

---

## 🛠️ Tech Stack

| Component       | Description                                      |
| --------------- | ------------------------------------------------ |
| 🧠 LLMs         | `Ollama (mathstral, stablelm2, gemma, deepseek)` |
| 📄 PDF Parsing  | `PyPDFLoader`                                    |
| 🧩 RAG Pipeline | `Chroma`, `LangChain`, `ChatPromptTemplate`      |
| 🌐 Search       | `SerpAPI` for real-time resource fetching        |
| 🗂️ Embeddings   | `nomic-embed-text` via Ollama                    |
| 🖥 Frontend      | `Next.js` + TailwindCSS                          |
| 📦 API Server   | `FastAPI`                                        |
| 🧪 Caching      | `SQLiteCache` (LangChain)                        |

---

## 🚀 Local Setup

```bash
# Clone repo
git clone https://github.com/AhmedJader/GenAiHackathon

# Set up .env file
SERPAPI_API_KEY=your_key_here

# Change into correct backend directory
cd backend/src

# Install dependencies
pip install -r requirements.txt


# Run FastAPI backend
# (make sure you are in the correct working directory and are using a Python virtual environment!)
uvicorn main:app --reload


# Change into correct frontend directory
cd ../../frontend

# Install frontend dependencies
npm install

# Run Next.js frontend
npm run dev

#You're done :)!
```

---

## 💡 Future Plans

- ✅ Add voice support for accessibility
- 📈 Integrate student progress tracking
- 🧩 Plugin system for STEM subjects
- 🧠 Hugging Face-compatible deployment options
