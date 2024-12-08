import requests
import time
import random

API_URL = "http://localhost:3000/attendance"
REQUEST_INTERVAL = 5
CLASS_NAMES = [
    "Matematicas", 
    "Historia", 
    "Ciencias", 
    "Fisica", 
    "Quimica", 
    "Biologia", 
    "Geografia", 
    "Ingles", 
    "Programacion", 
    "Musica", 
    "Arte", 
    "Educacion Fisica", 
    "Etica", 
    "Filosofia", 
    "Lenguaje", 
    "Literatura", 
    "Robotica", 
    "Astronomia", 
    "Inteligencia Artificial", 
    "Data Science"
]
STUDENT_IDS = [1, 2, 3]

def send_attendance_requests():
    while True:
        student_id = random.choice(STUDENT_IDS)
        class_name = random.choice(CLASS_NAMES)
        
        attendance = {"studentId": student_id, "className": class_name}
        
        try:
            response = requests.post(API_URL, json=attendance)
            print("Nueva asistencia registrada:", response.json())
        except Exception as e:
            print("Error al registrar asistencia:", e)
        
        time.sleep(REQUEST_INTERVAL)

if __name__ == "__main__":
    send_attendance_requests()
