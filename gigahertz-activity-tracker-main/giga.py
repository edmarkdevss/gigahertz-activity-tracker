import cv2
import face_recognition
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import webbrowser
import os
from threading import Timer

app = Flask(__name__)
CORS(app)

# Memory storage for biometrics
enrolled_faces = {}

@app.route('/enroll', methods=['POST'])
def enroll():
    data = request.json
    email = data.get('email')
    image_data = data.get('image').split(",")[1]
    img_bytes = base64.b64decode(image_data)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Lenient encoding (accepts more variations)
    encodings = face_recognition.face_encodings(rgb_img)
    if len(encodings) > 0:
        enrolled_faces[email] = encodings[0]
        return jsonify({"status": "success", "message": "Node Secured"})
    return jsonify({"status": "error", "message": "No face found"})

def open_browser():
    # Automatically finds your index.html in the same folder
    path = os.path.abspath("index.html")
    webbrowser.open(f"file://{path}")

if __name__ == '__main__':
    print("🚀 GIGAHERTZ SYSTEM: Initializing Auto-Launch...")
    # Wait 2 seconds for server to start, then open the website
    Timer(2, open_browser).start()
    app.run(port=5000)