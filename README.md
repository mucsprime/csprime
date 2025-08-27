<h1>CSPRIME</h1>



CSPRIME is a web-based **computer science education platform** designed to support learners at all levels. Originally focused on first-year students, our version expands the platform to provide resources, tools, and interactive learning experiences for beginners and advanced learners alike.  

🌐 **Live Demo:** [csprime.org](https://www.csprime.org)  
📂 **Repo:** [github.com/mucsprime/csprime](https://github.com/mucsprime/csprime)  


<h2>💡 Why This Project Matters</h2>

Most CS education tools stop at theory. CSPRIME bridges the gap between learning and real-world application by combining interactive lessons, an AI-powered chatbot, and collaboration features in one platform. This makes it a practical, day-to-day companion for students beyond just the classroom.

<h2>📖 Project Background</h2>

CSPRIME started as a first-year learning tool for Computer Science students.
Our team rebuilt and expanded the platform from scratch to support a broader range of learners.

<h2>Key improvements:</h2>

Modern UI/UX (Next.js + Tailwind)

AI-powered chatbot to provide instant learning support

New collaboration and timetable tools

Deployment pipelines for production reliability

<h2>🚀 Features</h2>

📚 Interactive CS learning modules

🤖 AI Chatbot (OpenAI-powered) for instant Q&A

🎨 Responsive and redesigned UI

🔐 User accounts 


📦 Production deployment (Vercel frontend, Render backend)

<h2>🛠 Tech Stack</h2>

<h3>Frontend</h3>

Next.js + TypeScript

Tailwind CSS

<h3>Backend & AI</h3>

FastAPI (Python)

OpenAI API (chatbot integration)

PostgreSQL / MongoDB (for data storage)

<h2>DevOps & Hosting</h2>

Vercel (frontend)

Render (backend)

Docker & GitHub Actions (CI/CD)

<h2>⚡ Getting Started
Prerequisites</h2>

Node.js (v16+)

Python 3.9+

Git

Installation
# Clone repo
git clone https://github.com/olamide05/csprime.git
cd csprime

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload


👉 If using Docker:

docker-compose up --build

⚙️ Environment & Config

Copy the example environment file and update keys:

cp .env.example .env


Add your OPENAI_API_KEY and database credentials.
🚫 Do not commit your .env. Use GitHub Secrets for deployment keys.

<h2>📂 Project Structure</h2>
/csprime
  /frontend      # Next.js app
  /backend       # FastAPI app
  /infrastructure # Docker, CI/CD configs
  README.md

🧠 How the AI Chatbot Works

User submits a query (with context from current module/page).

Backend builds a structured prompt and adds relevant docs (RAG if enabled).

Sends request to OpenAI API.

Response is cleaned, cached, and displayed to user.

<h2>🔮 Roadmap</h2>

Enhanced chatbot: code explanations, example solutions

More modules (2nd-year and advanced CS)



<h2>👥 Team</h2>

<a href="https://github.com/olamide05 ">Mahmoud Alimi</a>

<a href= "https://github.com/tomoige">Thomas Cormican</a>

Sean Mullen

📩 Contact: alimimahmoud3@gmail.com
