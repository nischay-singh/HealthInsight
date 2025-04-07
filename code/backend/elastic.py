import os
from elasticsearch import Elasticsearch
import mysql.connector
from dotenv import load_dotenv
from typing import List, Dict, Any

load_dotenv()

class MedicalSearch:
    def __init__(self):
        self.es = Elasticsearch(
            os.getenv('ELASTICSEARCH_URL'),
            basic_auth=(os.getenv('ELASTICSEARCH_USER'), os.getenv('ELASTICSEARCH_PASSWORD')),
            verify_certs=False
        )
        
        self.mysql_conn = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            port=os.getenv('MYSQL_PORT'),
            database=os.getenv('MYSQL_DATABASES'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD')
        )
        
        self.index_name = 'medical_records'
        
    def create_index(self):
        """Create Elasticsearch index with appropriate mappings"""
        if not self.es.indices.exists(index=self.index_name):
            mappings = {
                "mappings": {
                    "properties": {
                        "RecordID": {"type": "keyword"},
                        "VisitDescription": {
                            "type": "text",
                            "analyzer": "english",
                            "fields": {
                                "keyword": {"type": "keyword"}
                            }
                        },
                        "DoctorSpecialty": {"type": "keyword"},
                        "MedicalTranscription": {
                            "type": "text",
                            "analyzer": "english"
                        },
                        "Keywords": {"type": "keyword"}
                    }
                }
            }
            self.es.indices.create(index=self.index_name, body=mappings)
            print(f"Created index {self.index_name}")
    
    def sync_data(self):
        """Sync data from MySQL to Elasticsearch"""
        cursor = self.mysql_conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Patient_Diagnosis_Records")
        records = cursor.fetchall()
        
        for record in records:
            self.es.index(
                index=self.index_name,
                id=record['RecordID'],
                document=record
            )
        print(f"Synced {len(records)} records to Elasticsearch")
    
    def search(self, query: str, size: int = 10) -> List[Dict[Any, Any]]:
        """
        Search medical records based on visit description
        Returns formatted results with visit description, doctor specialty, and medical transcription
        """
        search_query = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["VisitDescription^3", "MedicalTranscription"],
                    "type": "best_fields",
                    "fuzziness": "AUTO"
                }
            },
            "size": size
        }
        
        response = self.es.search(index=self.index_name, body=search_query)
        
        results = []
        for hit in response['hits']['hits']:
            source = hit['_source']
            results.append({
                'visit_description': source['VisitDescription'],
                'doctor_specialty': source['DoctorSpecialty'],
                'medical_transcription': source['MedicalTranscription'],
                'score': hit['_score']
            })
        
        return results
    
    def close(self):
        """Close database connections"""
        self.mysql_conn.close()
        self.es.close()

if __name__ == "__main__":
    search = MedicalSearch()
    try:
        search.create_index()
        search.sync_data()
        
        results = search.search("fever and cough")
        for result in results:
            print("\nVisit Description:", result['visit_description'])
            print("Doctor Specialty:", result['doctor_specialty'])
            print("Medical Transcription:", result['medical_transcription'])
            print("Relevance Score:", result['score'])
            print("-" * 80)
    finally:
        search.close()
