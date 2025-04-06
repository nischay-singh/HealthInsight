from flask import Flask, request, jsonify, send_from_directory
from elastic import MedicalSearch
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)
PORT = 5001

@app.route('/api/patientSearch', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    try:
        search = MedicalSearch()
        results = search.search(query)
        print(results)
        return jsonify({'results': results})
    except Exception as e:
        print(f"Search error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        if 'search' in locals():
            search.close()

@app.route("/api/symptomGraph", methods=["POST"])
def symptom_graph():
    print("Hello")
    data = request.get_json()
    keyword = data.get("keyword")
    
    print(f"Received keyword: {keyword}")
    
    mock_result = [
        {"specialty": "Pediatrics", "count": 5},
        {"specialty": "Internal Medicine", "count": 3},
        {"specialty": "Pulmonology", "count": 2}
    ]
    
    return jsonify({
        "message": f"Returning specialties matching '{keyword}'",
        "results": mock_result
    })

if __name__ == "__main__":
    print(f"✅ Server running at http://localhost:{PORT}")
    app.run(port=PORT) 