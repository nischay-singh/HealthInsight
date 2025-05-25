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
                        "Keywords": {"type": "keyword"}, 
                        "Upvotes": {"type": "integer"}
                    }
                }
            }
            self.es.indices.create(index=self.index_name, body=mappings)
            print(f"Created index {self.index_name}")
    def update_upvotes(self, record_id: str, new_upvotes: int):
        """Update upvotes in Elasticsearch for a given record"""
        print("Your mom")
        self.es.update(
            index=self.index_name,
            id=record_id,
            body={
                "doc": {
                    "Upvotes": new_upvotes
                }
            }
        )

    
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
                'score': hit['_score'],
                'upvotes': source.get('Upvotes', 0),
                'recordId': source['RecordID']
            })
        
        return results
    
    def close(self):
        """Close database connections"""
        self.mysql_conn.close()
        self.es.close()
        
    
class SymptomSearch:
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
        
        self.index_name = 'question_answer_symptoms'
        
    def create_index(self):
        """Create Elasticsearch index for Question_Answer_Symptoms"""
        if not self.es.indices.exists(index=self.index_name):
            mappings = {
                "mappings": {
                    "properties": {
                        "QuestionID": {"type": "keyword"},
                        "Question": {
                            "type": "text",
                            "analyzer": "english",
                            "fields": {
                                "keyword": {"type": "keyword"}
                            }
                        },
                        "Answer": {
                            "type": "text",
                            "analyzer": "english"
                        },
                        "FocusArea": {"type": "keyword"},
                        "Upvotes": {"type": "integer"}  
                    }
                }
            }
            self.es.indices.create(index=self.index_name, body=mappings)
            print(f"Created index {self.index_name}")
    
    def update_upvotes(self, question_id: str, new_upvotes: int):
        """Update upvotes in Elasticsearch for a given question"""
        self.es.update(
            index=self.index_name,
            id=question_id,
            body={
                "doc": {
                    "Upvotes": new_upvotes
                }
            }
        )
    
    def sync_data(self):
        """Sync data from MySQL to Elasticsearch"""
        cursor = self.mysql_conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Question_Answer_Symptoms")
        records = cursor.fetchall()
        
        for record in records:
            # Ensure Upvotes defaults to 0 if not present
            if 'Upvotes' not in record or record['Upvotes'] is None:
                record['Upvotes'] = 0
            
            self.es.index(
                index=self.index_name,
                id=record['QuestionID'],
                document=record
            )
        print(f"Synced {len(records)} records to Elasticsearch")
    
    def search(self, query: str, size: int = 10) -> List[Dict[Any, Any]]:
        """
        Search questions and answers based on the query
        Returns formatted results with question, answer, and focus area
        """
        search_query = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["Question^3", "Answer"],
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
                'question': source['Question'],
                'answer': source['Answer'],
                'focus_area': source['FocusArea'],
                'score': hit['_score'],
                'upvotes': source.get('Upvotes', 0),
                'questionId': source['QuestionID']
            })
        
        return results
    
    def close(self):
        """Close database connections"""
        self.mysql_conn.close()
        self.es.close()

if __name__ == "__main__":
    option = input("Which table do you want to sync? (1 = Medical Records, 2 = Question Answer Symptoms): ")
    if option == "1":
        search = MedicalSearch()
    elif option == "2":
        search = SymptomSearch()
    else:
        raise ValueError("Invalid option selected.")

    try:
        search.create_index()
        search.sync_data()
        test_query = input("Enter a test query to search (or leave empty to skip): ")
        if test_query:
            results = search.search(test_query)
            for result in results:
                print(result)
                print("-" * 80)
    finally:
        search.close()