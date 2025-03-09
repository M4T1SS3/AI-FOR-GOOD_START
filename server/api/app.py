from flask import Flask, jsonify, request, render_template
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

@app.route('/', methods=['GET'])
def home():
    """Home endpoint"""
    return jsonify({
        "status": "online",
        "service": "LifeMatch AI API",
        "endpoints": {
            "health_check": "/api/health",
            "analyze": "/api/analyze",
            "latest": "/api/latest"
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "LifeMatch AI API",
        "groq_status": "connected" if os.getenv('GROQ_API_KEY') else "not configured"
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_match():
    """Analyze transplant match"""
    try:
        # Validate request
        if not request.is_json:
            return jsonify({
                "status": "error",
                "message": "Request must be JSON"
            }), 400

        # Get conversation file path from request
        data = request.get_json()
        conversation_path = data.get('conversation_path', 'graph-builder-conversation.json')
        output_path = data.get('output_path', 'analysis_results.csv')
        
        # Validate file exists
        if not os.path.exists(conversation_path):
            return jsonify({
                "status": "error",
                "message": f"Conversation file not found: {conversation_path}"
            }), 404
        
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
            return jsonify({
                "status": "error",
                "message": "Analysis failed"
            }), 500
            
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
            "type": str(type(e).__name__)
        }), 500

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
        return jsonify({
            "status": "error",
            "message": "No analysis available"
        }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
            "type": str(type(e).__name__)
        }), 500

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "status": "error",
        "message": "Route not found",
        "available_endpoints": {
            "GET /": "API information",
            "GET /api/health": "Health check",
            "POST /api/analyze": "Run analysis",
            "GET /api/latest": "Get latest results"
        }
    }), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({
        "status": "error",
        "message": "Internal server error",
        "error": str(e)
    }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 