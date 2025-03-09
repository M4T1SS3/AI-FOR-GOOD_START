from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys

# Add project root to Python path
current_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(current_dir)

from server.groq.conversation_analyzer import ConversationAnalyzer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize analyzer
analyzer = ConversationAnalyzer()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "LifeMatch AI API"})

@app.route('/api/analyze', methods=['POST'])
def analyze_match():
    """Analyze transplant match"""
    try:
        # Get conversation file path from request
        conversation_path = request.json.get('conversation_path', 'graph-builder-conversation.json')
        output_path = request.json.get('output_path', 'analysis_results.csv')
        
        # Run analysis
        results_df = analyzer.analyze_and_save_results(conversation_path, output_path)
        
        if results_df is not None:
            # Convert DataFrame to dictionary
            results_dict = results_df.to_dict('records')[0]
            
            # Structure the response
            response = {
                "status": "success",
                "data": {
                    "patient": {
                        "id": results_dict['patient_id'],
                        "blood_type": results_dict['patient_blood_type'],
                        "organ_needed": results_dict['organ_needed'],
                        "medical_urgency": results_dict['patient_medical_urgency'],
                        "wait_time": results_dict['patient_wait_time'],
                        "location": results_dict['patient_location'],
                        "hospital": results_dict['patient_hospital'],
                        "age": results_dict['patient_age'],
                        "medical_condition": results_dict['patient_medical_condition'],
                        "registration_date": results_dict['patient_registration_date']
                    },
                    "donor": {
                        "id": results_dict['donor_id'],
                        "blood_type": results_dict['donor_blood_type'],
                        "organ_available": results_dict['organ_available'],
                        "location": results_dict['donor_location'],
                        "hospital": results_dict['donor_hospital'],
                        "tissue_type": results_dict['donor_tissue_type'],
                        "age": results_dict['donor_age'],
                        "donation_date": results_dict['donor_date'],
                        "organ_condition": results_dict['organ_condition']
                    },
                    "match_analysis": {
                        "compatibility_score": results_dict['compatibility_score'],
                        "match_priority": results_dict['match_priority'],
                        "key_points": results_dict['key_points'].split('; ')
                    },
                    "timestamp": results_dict['analysis_timestamp']
                }
            }
            return jsonify(response)
        else:
            return jsonify({"status": "error", "message": "Analysis failed"}), 500
            
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/latest', methods=['GET'])
def get_latest():
    """Get latest analysis results"""
    try:
        if analyzer.unified_df is not None:
            results_dict = analyzer.unified_df.to_dict('records')[0]
            return jsonify({
                "status": "success",
                "data": {
                    "patient": {
                        "id": results_dict['patient_id'],
                        "blood_type": results_dict['patient_blood_type'],
                        "organ_needed": results_dict['organ_needed'],
                        "medical_urgency": results_dict['patient_medical_urgency'],
                        "wait_time": results_dict['patient_wait_time'],
                        "location": results_dict['patient_location'],
                        "hospital": results_dict['patient_hospital'],
                        "age": results_dict['patient_age'],
                        "medical_condition": results_dict['patient_medical_condition'],
                        "registration_date": results_dict['patient_registration_date']
                    },
                    "donor": {
                        "id": results_dict['donor_id'],
                        "blood_type": results_dict['donor_blood_type'],
                        "organ_available": results_dict['organ_available'],
                        "location": results_dict['donor_location'],
                        "hospital": results_dict['donor_hospital'],
                        "tissue_type": results_dict['donor_tissue_type'],
                        "age": results_dict['donor_age'],
                        "donation_date": results_dict['donor_date'],
                        "organ_condition": results_dict['organ_condition']
                    },
                    "match_analysis": {
                        "compatibility_score": results_dict['compatibility_score'],
                        "match_priority": results_dict['match_priority'],
                        "key_points": results_dict['key_points'].split('; ')
                    },
                    "timestamp": results_dict['analysis_timestamp']
                }
            })
        return jsonify({"status": "error", "message": "No analysis available"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 