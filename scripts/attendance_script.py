import requests
import time
import random

API_URL = "http://localhost:3000/attendance"
REQUEST_INTERVAL = 10
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
STUDENT_IDS = [1, 2]

def send_attendance_requests():
    while True:
        student_id = random.choice(STUDENT_IDS)
        class_name = random.choice(CLASS_NAMES)
        
        attendance = { "studentid": student_id, "classname": class_name}
        
        try:
            response = requests.post(API_URL, json=attendance)  # El JSON se envía correctamente
            print("Nueva asistencia registrada:", response.json())
        except Exception as e:
            print("Error al registrar asistencia:", e)
        
        time.sleep(REQUEST_INTERVAL)

if __name__ == "__main__":
    send_attendance_requests()
