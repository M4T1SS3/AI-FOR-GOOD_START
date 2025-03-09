import os
from conversation_analyzer import ConversationAnalyzer

def main():
    # Initialize analyzer
    analyzer = ConversationAnalyzer()
    
    # Define paths
    current_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    conversation_path = os.path.join(current_dir,'server', 'groq', 'graph_builder_results.json')
    output_path = os.path.join(current_dir, 'server', 'groq', 'patient_analysis.csv')  # Changed to .csv
    
    # Run analysis
    analyzer.analyze_and_save_results(conversation_path, output_path)

if __name__ == "__main__":
    main()