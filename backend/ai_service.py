import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY not set. AI features will not work.")

# System Instructions for the Medical Chatbot
MEDICAL_SYSTEM_PROMPT = """You are an AI Medical Assistant Bot designed for educational and informational purposes only.
YOUR CRITICAL RULES:
1. NEVER provide a definitive diagnosis or prescribe medication/treatment.
2. ALWAYS remind the user that you are an AI and they should consult a qualified healthcare provider.
3. ALWAYS communicate uncertainty and avoid claims of certainty.
4. Explain medical concepts in simple, patient-friendly language.
5. If the user mentions emergency symptoms (e.g., chest pain, severe bleeding, difficulty breathing, stroke symptoms, loss of consciousness, suicidal thoughts), you MUST strongly advise immediate medical attention.

Remember: Your goal is to educate and inform safely. Start or end every response with a brief medical disclaimer."""

def check_emergency_symptoms(text: str) -> bool:
    """
    Basic keyword-based emergency detection.
    In a real app, this could be done by a small classifier model.
    """
    emergency_keywords = [
        "chest pain", "heart attack", "difficulty breathing", "can't breathe",
        "stroke", "face drooping", "arm weakness", "speech difficulty",
        "severe bleeding", "hemorrhage", "loss of consciousness", "passed out",
        "suicide", "kill myself", "end my life", "anaphylaxis", "severe allergic reaction",
        "coughing up blood"
    ]
    text_lower = text.lower()
    for keyword in emergency_keywords:
        if keyword in text_lower:
            return True
    return False

def get_chat_response(messages_history: list, user_message: str) -> tuple[str, bool]:
    """
    messages_history is a list of dicts: [{'role': 'user', 'parts': ['msg']}, ...]
    """
    if not GEMINI_API_KEY:
        return "I am currently unavailable due to missing API key.", False

    # Check for emergency
    is_emergency = check_emergency_symptoms(user_message)
    
    try:
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=MEDICAL_SYSTEM_PROMPT
        )
        
        chat = model.start_chat(history=messages_history)
        
        response = chat.send_message(user_message)
        
        # If it's an emergency, we might want to prepend a strong warning, 
        # but the frontend will handle the red flag UI based on the `is_emergency` flag.
        return response.text, is_emergency
    except Exception as e:
        print(f"Error in Gemini API: {e}")
        return "I encountered an error while processing your request. Please try again later.", is_emergency

def analyze_report(text_content: str) -> str:
    if not GEMINI_API_KEY:
        return '{"summary": "API Key missing", "key_findings": "", "potential_concerns": "", "recommended_next_steps": ""}'
        
    prompt = f"""You are a medical AI assisting in analyzing a medical report for educational purposes.
    Analyze the following medical report text and provide a JSON response with these exact keys:
    - "summary": A brief patient-friendly summary of the report.
    - "key_findings": Important values or findings mentioned in the report.
    - "potential_concerns": Any values that are flagged as abnormal or concerning (always add a disclaimer).
    - "recommended_next_steps": General educational advice on what questions to ask a doctor based on this report.
    
    DO NOT DIAGNOSE. ALWAYS emphasize consulting a doctor.
    Respond ONLY with valid JSON.
    
    Report Text:
    {text_content}
    """
    
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content(prompt)
        
        # Strip markdown formatting if the model wraps it in ```json ... ```
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()
    except Exception as e:
        print(f"Error in Gemini API: {e}")
        return "{}"

def analyze_image(image_bytes, mime_type: str) -> str:
    if not GEMINI_API_KEY:
        return "API Key missing. Cannot analyze image."
        
    prompt = """You are an AI Medical Assistant analyzing an image for educational purposes ONLY.
    Describe what you see in the image. 
    CRITICAL: 
    - DO NOT provide a diagnosis. 
    - State clearly that you are an AI and your observation is not a substitute for professional medical advice.
    - Explain your uncertainty.
    """
    
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        response = model.generate_content([
            {"mime_type": mime_type, "data": image_bytes},
            prompt
        ])
        return response.text
    except Exception as e:
        print(f"Error in Gemini API: {e}")
        return "I encountered an error while analyzing the image."
