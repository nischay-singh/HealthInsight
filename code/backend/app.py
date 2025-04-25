from flask import Flask, request, jsonify, send_from_directory
from elastic import MedicalSearch
from flask_cors import CORS
import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='static')
CORS(app)
PORT = 5001

mysql_conn = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            port=os.getenv('MYSQL_PORT'),
            database=os.getenv('MYSQL_DATABASES'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD')
        )

@app.route('/api/patientSearch', methods=['GET'])
def search():
    query = request.args.get('q', '')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    
    try:
        search = MedicalSearch()
        results = search.search(query)
        return jsonify({'results': results})
    except Exception as e:
        print(f"Search error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        if 'search' in locals():
            search.close()

@app.route("/api/upvote", methods=["POST"])
def upvote_record():
    try:
        record_id = request.args.get('id', '')
        print(record_id)
        if not record_id:
            return jsonify({"error": "Missing recordId"}), 400

        cursor = mysql_conn.cursor()

        update_query = """
            UPDATE Patient_Diagnosis_Records
            SET Upvotes = Upvotes + 1
            WHERE RecordID = %s
        """
        cursor.execute(update_query, (record_id,))
        mysql_conn.commit()

        select_query = """
            SELECT Upvotes FROM Patient_Diagnosis_Records
            WHERE RecordID = %s
        """
        cursor.execute(select_query, (record_id,))
        row = cursor.fetchone()

        if not row:
            return jsonify({"error": "Record not found"}), 404

        new_upvotes = row[0]

        search = MedicalSearch()
        search.update_upvotes(record_id, new_upvotes)
        search.close()

        return jsonify({"message": "Upvote recorded successfully", "new_upvotes": new_upvotes}), 200

    except Exception as e:
        print(f"Upvote error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/downvote", methods=["POST"])
def downvote_record():
    try:
        record_id = request.args.get('id', '')
        if not record_id:
            return jsonify({"error": "Missing recordId"}), 400

        cursor = mysql_conn.cursor()

        update_query = """
            UPDATE Patient_Diagnosis_Records
            SET Upvotes = CASE WHEN Upvotes > 0 THEN Upvotes - 1 ELSE 0 END
            WHERE RecordID = %s
        """
        cursor.execute(update_query, (record_id,))
        mysql_conn.commit()

        select_query = """
            SELECT Upvotes FROM Patient_Diagnosis_Records
            WHERE RecordID = %s
        """
        cursor.execute(select_query, (record_id,))
        row = cursor.fetchone()

        if not row:
            return jsonify({"error": "Record not found"}), 404

        new_upvotes = row[0]

        search = MedicalSearch()
        search.update_upvotes(record_id, new_upvotes)
        search.close()

        return jsonify({"message": "Downvote recorded successfully", "new_upvotes": new_upvotes}), 200

    except Exception as e:
        print(f"Downvote error: {str(e)}")
        return jsonify({"error": str(e)}), 500



@app.route("/api/symptomGraph", methods=["POST"])
def symptom_graph():
    print("Hello")
    data = request.get_json()
    keyword = data.get("keyword")
    
    print(f"Received keyword: {keyword}")
    
    try:
        mysql_conn = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            port=os.getenv('MYSQL_PORT'),
            database=os.getenv('MYSQL_DATABASES'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD')
        )
        
        cursor = mysql_conn.cursor(dictionary=True)
        
        query = """
        SELECT DoctorSpecialty, COUNT(*) AS NumRecords
        FROM Patient_Diagnosis_Records
        WHERE RecordID IN (
            SELECT RecordID
            FROM Patient_Diagnosis_Records
            WHERE MedicalTranscription LIKE %s OR Keywords LIKE %s
        )
        GROUP BY DoctorSpecialty
        HAVING COUNT(*) >= 2
        ORDER BY NumRecords DESC
        """
        
        search_term = f'%{keyword}%'
        cursor.execute(query, (search_term, search_term))
        results = cursor.fetchall()
        
        if not results:
            print("No results found for keyword:", keyword)
            return jsonify({
                "message": f"No specialties found matching '{keyword}'",
                "results": []
            })
        
        result = []
        for row in results:
            specialty = row.get('DoctorSpecialty', 'Unknown Specialty')
            count = row.get('NumRecords', 0)
            result.append({
                "specialty": specialty,
                "count": count
            })
        
        print("Formatted results:", result)
        
        return jsonify({
            "message": f"Returning specialties matching '{keyword}'",
            "results": result
        })
        
    except Exception as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'mysql_conn' in locals():
            mysql_conn.close()

if __name__ == "__main__":
    print(f"✅ Server running at http://localhost:{PORT}")
    app.run(port=PORT) 