import json
from groq import Groq
from typing import Dict, List
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ConversationAnalyzer:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
        
    def load_conversation(self, file_path: str) -> Dict:
        """Load the conversation JSON file"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    
    def analyze_conversation(self, conversation: Dict) -> Dict:
        """Analyze conversation and find best match using Groq"""
        messages = conversation.get('conversation', [])
        relevant_content = ""
        
        # Collect all relevant content from the conversation
        for message in messages:
            if message.get('user') == 'chatbot' and 'modes' in message:
                content = message['modes'].get('graph_vector_fulltext', {}).get('message', '')
                if content:
                    relevant_content += content + "\n"

        # Use Groq to analyze and find the best match
        prompt = f"""
        Analyze this medical conversation and identify the single best matching patient for immediate organ transplant.
        Focus on these criteria in order of importance:
        1. Critical medical urgency
        2. Shortest wait time
        3. Best compatibility match

        Conversation content:
        {relevant_content}

        Provide a structured response in this exact JSON format:
        {{
            "best_match": {{
                "patient_id": "ID",
                "blood_type": "type",
                "organ_needed": "organ",
                "medical_urgency": "level",
                "wait_time": "days",
                "location": "city",
                "hospital": "name",
                "age": "years",
                "justification": "detailed explanation of why this is the best match"
            }}
        }}
        """
        
        try:
            completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a medical transplant matching expert. Your task is to identify the single most urgent and suitable patient for immediate organ transplantation based on medical urgency, wait time, and compatibility."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="mixtral-8x7b-32768",
                temperature=0.1,  # Lower temperature for more focused results
                max_tokens=2048
            )
            
            # Parse the response into structured data
            response_text = completion.choices[0].message.content
            return json.loads(response_text)
            
        except Exception as e:
            print(f"Error analyzing conversation: {e}")
            return {}

    def analyze_and_save_results(self, conversation_path: str, output_path: str):
        """Analyze conversation and save best match results"""
        try:
            # Load and analyze conversation
            conversation = self.load_conversation(conversation_path)
            best_match = self.analyze_conversation(conversation)
            
            # Convert to DataFrame (single row)
            df = pd.DataFrame([best_match['best_match']])
            
            # Create output directory if it doesn't exist
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save results as CSV
            df.to_csv(output_path, index=False)
            
            # Print detailed results
            print("\n" + "="*50)
            print("BEST MATCH FOR IMMEDIATE TRANSPLANT")
            print("="*50)
            print(f"Patient ID: {best_match['best_match']['patient_id']}")
            print(f"Medical Urgency: {best_match['best_match']['medical_urgency']}")
            print(f"Wait Time: {best_match['best_match']['wait_time']} days")
            print(f"Blood Type: {best_match['best_match']['blood_type']}")
            print(f"Organ Needed: {best_match['best_match']['organ_needed']}")
            print(f"Location: {best_match['best_match']['location']}")
            print(f"Hospital: {best_match['best_match']['hospital']}")
            print(f"Age: {best_match['best_match']['age']}")
            print("\nJustification:")
            print(best_match['best_match']['justification'])
            print("="*50)
            
            print(f"\nResults also saved to: {output_path}")
            
        except Exception as e:
            print(f"Error in analysis pipeline: {e}")