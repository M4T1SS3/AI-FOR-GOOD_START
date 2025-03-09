import json
from groq import Groq
from typing import Dict, List
import pandas as pd
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

class ConversationAnalyzer:
    def __init__(self):
        self.client = Groq(api_key=os.getenv('GROQ_API_KEY'))
        # Store analysis results
        self.current_analysis = None
        self.match_summary_df = None
        self.patient_df = None
        self.donor_df = None
        self.key_points = None
        self.analysis_timestamp = None
        
    def load_conversation(self, file_path: str) -> Dict:
        """Load the conversation JSON file"""
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    
    def analyze_conversation(self, conversation: Dict) -> Dict:
        """Analyze conversation and find best match using Groq"""
        messages = conversation.get('conversation', [])
        relevant_content = ""
        
        for message in messages:
            if message.get('user') == 'chatbot' and 'modes' in message:
                content = message['modes'].get('graph_vector_fulltext', {}).get('message', '')
                if content:
                    relevant_content += content + "\n"

        prompt = f"""
        Analyze this medical conversation and identify the best matching patient-donor pair for immediate organ transplant.
        Consider medical urgency, wait time, and compatibility.

        Conversation content:
        {relevant_content}

        Provide a structured response in this exact JSON format:
        {{
            "match_analysis": {{
                "patient": {{
                    "patient_id": "ID",
                    "blood_type": "type",
                    "organ_needed": "organ",
                    "medical_urgency": "level",
                    "wait_time": "days",
                    "location": "city",
                    "hospital": "name",
                    "age": "years",
                    "medical_condition": "condition",
                    "registration_date": "date"
                }},
                "donor": {{
                    "donor_id": "ID",
                    "blood_type": "type",
                    "organ_available": "organ",
                    "location": "city",
                    "hospital": "name",
                    "tissue_type": "type",
                    "age": "years",
                    "donation_date": "date",
                    "organ_condition": "condition"
                }},
                "key_points": [
                    "Point 1 about urgency",
                    "Point 2 about compatibility",
                    "Point 3 about logistics",
                    "Point 4 about timing",
                    "Point 5 about medical factors"
                ],
                "compatibility_score": "percentage",
                "match_priority": "HIGH/MEDIUM/LOW"
            }}
        }}
        """
        
        try:
            completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a medical transplant matching expert. Analyze patient-donor matches comprehensively, considering all medical and logistical factors."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                model="mixtral-8x7b-32768",
                temperature=0.1,
                max_tokens=2048
            )
            
            response_text = completion.choices[0].message.content
            self.current_analysis = json.loads(response_text)
            return self.current_analysis
            
        except Exception as e:
            print(f"Error analyzing conversation: {e}")
            return {}

    def create_summary_dataframe(self, match_analysis: Dict) -> pd.DataFrame:
        """Create a summary DataFrame with all relevant information"""
        summary_data = {
            'analysis_timestamp': [datetime.now().strftime('%Y-%m-%d %H:%M:%S')],
            'patient_id': [match_analysis['match_analysis']['patient']['patient_id']],
            'donor_id': [match_analysis['match_analysis']['donor']['donor_id']],
            'compatibility_score': [match_analysis['match_analysis']['compatibility_score']],
            'match_priority': [match_analysis['match_analysis']['match_priority']],
            'patient_blood_type': [match_analysis['match_analysis']['patient']['blood_type']],
            'donor_blood_type': [match_analysis['match_analysis']['donor']['blood_type']],
            'organ_needed': [match_analysis['match_analysis']['patient']['organ_needed']],
            'organ_available': [match_analysis['match_analysis']['donor']['organ_available']],
            'medical_urgency': [match_analysis['match_analysis']['patient']['medical_urgency']],
            'wait_time': [match_analysis['match_analysis']['patient']['wait_time']],
            'patient_location': [match_analysis['match_analysis']['patient']['location']],
            'donor_location': [match_analysis['match_analysis']['donor']['location']],
            'patient_hospital': [match_analysis['match_analysis']['patient']['hospital']],
            'donor_hospital': [match_analysis['match_analysis']['donor']['hospital']]
        }
        return pd.DataFrame(summary_data)

    def create_unified_dataframe(self, match_analysis: Dict) -> pd.DataFrame:
        """Create a single unified DataFrame with all analysis results"""
        unified_data = {
            'analysis_timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            # Patient Information
            'patient_id': match_analysis['match_analysis']['patient']['patient_id'],
            'patient_blood_type': match_analysis['match_analysis']['patient']['blood_type'],
            'organ_needed': match_analysis['match_analysis']['patient']['organ_needed'],
            'patient_medical_urgency': match_analysis['match_analysis']['patient']['medical_urgency'],
            'patient_wait_time': match_analysis['match_analysis']['patient']['wait_time'],
            'patient_location': match_analysis['match_analysis']['patient']['location'],
            'patient_hospital': match_analysis['match_analysis']['patient']['hospital'],
            'patient_age': match_analysis['match_analysis']['patient']['age'],
            'patient_medical_condition': match_analysis['match_analysis']['patient']['medical_condition'],
            'patient_registration_date': match_analysis['match_analysis']['patient']['registration_date'],
            # Donor Information
            'donor_id': match_analysis['match_analysis']['donor']['donor_id'],
            'donor_blood_type': match_analysis['match_analysis']['donor']['blood_type'],
            'organ_available': match_analysis['match_analysis']['donor']['organ_available'],
            'donor_location': match_analysis['match_analysis']['donor']['location'],
            'donor_hospital': match_analysis['match_analysis']['donor']['hospital'],
            'donor_tissue_type': match_analysis['match_analysis']['donor']['tissue_type'],
            'donor_age': match_analysis['match_analysis']['donor']['age'],
            'donor_date': match_analysis['match_analysis']['donor']['donation_date'],
            'organ_condition': match_analysis['match_analysis']['donor']['organ_condition'],
            # Match Analysis
            'compatibility_score': match_analysis['match_analysis']['compatibility_score'],
            'match_priority': match_analysis['match_analysis']['match_priority'],
            'key_points': '; '.join(match_analysis['match_analysis']['key_points'])
        }
        return pd.DataFrame([unified_data])

    def analyze_and_save_results(self, conversation_path: str, output_path: str):
        """Analyze conversation and save unified results"""
        try:
            conversation = self.load_conversation(conversation_path)
            match_analysis = self.analyze_conversation(conversation)
            
            # Create unified DataFrame
            self.unified_df = self.create_unified_dataframe(match_analysis)
            
            # Save unified results
            output_base = os.path.splitext(output_path)[0]
            self.unified_df.to_csv(f"{output_base}_unified.csv", index=False)
            
            # Print results (rest of the printing code remains the same)
            print("\n" + "="*70)
            print("🏥 OPTIMAL TRANSPLANT MATCH ANALYSIS")
            print("="*70)
            
            print("\n📋 PATIENT INFORMATION:")
            print("-"*50)
            for key, value in match_analysis['match_analysis']['patient'].items():
                print(f"{key.replace('_', ' ').title()}: {value}")
            
            print("\n🎁 DONOR INFORMATION:")
            print("-"*50)
            for key, value in match_analysis['match_analysis']['donor'].items():
                print(f"{key.replace('_', ' ').title()}: {value}")
            
            print("\n📊 MATCH ANALYSIS:")
            print("-"*50)
            print(f"Compatibility Score: {match_analysis['match_analysis']['compatibility_score']}")
            print(f"Match Priority: {match_analysis['match_analysis']['match_priority']}")
            
            print("\n🎯 KEY POINTS:")
            print("-"*50)
            for point in match_analysis['match_analysis']['key_points']:
                print(f"• {point}")
            
            print("\n" + "="*70)
            print(f"\nResults saved to:")
            print(f"- Unified analysis: {output_base}_unified.csv")
            
            return self.unified_df
            
        except Exception as e:
            print(f"Error in analysis pipeline: {e}")
            return None

    def get_latest_analysis(self) -> Dict:
        """Get the latest analysis results"""
        return {
            'timestamp': self.analysis_timestamp,
            'summary': self.match_summary_df,
            'patient_data': self.patient_df,
            'donor_data': self.donor_df,
            'key_points': self.key_points,
            'full_analysis': self.current_analysis
        } 