# AI Medical Assistant Bot

A comprehensive, production-ready AI Medical Assistant web application. This project provides an educational interface for health information, symptom discussion, and medical report/image analysis while strictly adhering to safety and privacy principles.

## Features

- **Medical Chat Assistant**: Conversational AI for health-related questions.
- **Symptom Checker**: Discuss symptoms with built-in emergency red-flag detection.
- **Report Analyzer**: Upload PDF medical reports for simplified, educational summaries and key findings.
- **Image Analyzer**: Upload medical images (e.g., skin conditions) for AI observations.
- **Safety System**: Strict AI prompts and keyword detection to avoid diagnoses and escalate emergencies.
- **Privacy Notice & Medical Disclaimers**: Integrated throughout the application.
- **Dark Mode**: Toggleable beautiful UI themes.
- **PDF Download**: Download generated report summaries as PDF.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Framer Motion, Lucide React.
- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Pydantic.
- **AI Model**: Google Gemini API (gemini-1.5-flash) for both text and image processing.

## Folder Structure

```
ai-medical-assistant/
├── backend/
│   ├── .env.example
│   ├── requirements.txt
│   ├── main.py          (FastAPI entry point)
│   ├── database.py      (SQLAlchemy setup)
│   ├── models.py        (Database models)
│   ├── schemas.py       (Pydantic validation schemas)
│   └── ai_service.py    (Gemini integration logic)
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   └── DisclaimerBanner.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── MedicalChat.jsx
│           ├── SymptomChecker.jsx
│           ├── ReportAnalyzer.jsx
│           ├── ImageAnalyzer.jsx
│           ├── HowItWorks.jsx
│           ├── About.jsx
│           ├── Disclaimer.jsx
│           └── PrivacyPolicy.jsx
└── README.md
```

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your Gemini API Key:
```
GEMINI_API_KEY=your_actual_key_here
```

Run the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will be running at `http://localhost:8000`.

### 2. Frontend Setup
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be running at `http://localhost:5173`.

## AI Integration & Safety Approach

This project uses **Google Gemini** as its primary AI provider because of its excellent native multimodal capabilities (processing both text and images). 

**Safety Guardrails:**
- **System Prompts**: The AI is strictly instructed to NEVER provide a definitive diagnosis and to ALWAYS include medical disclaimers.
- **Emergency Detection**: The backend `ai_service.py` intercepts incoming messages and uses keyword matching to flag emergencies (e.g., "chest pain", "can't breathe"). If triggered, the frontend displays a prominent red warning banner.
- **Uncertainty**: The application emphasizes the limitations of AI and encourages users to consult human healthcare professionals.

## Future Improvements

- Add user authentication and individual accounts.
- Implement more robust natural language emergency detection using a secondary, lightweight classifier model.
- Add support for OpenAI as a fallback or alternative AI provider.
- Implement optical character recognition (OCR) fallback for scanned, non-text PDFs.
