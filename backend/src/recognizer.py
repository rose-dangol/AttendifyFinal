import cv2
import numpy as np
import pickle
import os
import time

from .lbp import compute_lbp
from .histogram import lbp_histogram

# -----------------------------
# Paths
# -----------------------------
def face_recognition(state,model_path='models/lbph_model.pkl',
                                   haar_cascade_path='classifiers/haarcascade_frontalface_default.xml'):
    # model_path = 'models/lbph_model.pkl'
    # haar_cascade_path = 'classifiers/haarcascade_frontalface_default.xml'

    # -----------------------------
    # Load LBPH Model
    # -----------------------------
    if not os.path.exists(model_path):
        raise FileNotFoundError("LBPH model not found! Run trainer.py first.")

    with open(model_path, 'rb') as f:
        lbph_model = pickle.load(f)

    features = lbph_model['features']
    labels = lbph_model['labels']
    person_names = lbph_model['person_names']

    # -----------------------------
    # Chi-Square Distance Function
    # -----------------------------
    def chi_square_distance(hist1, hist2):
        return 0.5 * np.sum(((hist1 - hist2) ** 2) / (hist1 + hist2 + 1e-6))

    # -----------------------------
    # Histogram for Face
    # -----------------------------
    def extract_face_histogram(face_img, grid_x=8, grid_y=8):
        """Compute histogram feature vector for a single face image."""
        lbp_img = compute_lbp(face_img)
        h, w = lbp_img.shape
        grid_h = h // grid_y
        grid_w = w // grid_x

        final_hist = []
        for i in range(grid_y):
            for j in range(grid_x):
                y0 = i * grid_h
                x0 = j * grid_w
                block = lbp_img[y0:y0 + grid_h, x0:x0 + grid_w]
                hist = lbp_histogram(block)
                final_hist.extend(hist)

        return np.array(final_hist, dtype=np.float32)

    # -----------------------------
    # Predict Person Name
    # -----------------------------
    # def predict_face(face_img, threshold=0.5):
    #     hist = extract_face_histogram(face_img)

    #     min_dist = float('inf')
    #     best_label = -1

    #     for i, train_hist in enumerate(features):
    #         dist = chi_square_distance(hist, train_hist)
    #         if dist < min_dist:
    #             min_dist = dist
    #             best_label = labels[i]

    #     if min_dist > threshold:
    #         return "Unknown", min_dist
    #     return person_names[best_label], min_dist

    def predict_face(face_img, threshold=50.0,min_conf=30.0):  # Use larger threshold
        hist = extract_face_histogram(face_img)

        min_dist = float('inf')
        best_label = -1

        for i, train_hist in enumerate(features):
            dist = chi_square_distance(hist, train_hist)
            if dist < min_dist:
                min_dist = dist
                best_label = labels[i]

        # Check threshold
        if min_dist > threshold:
            return "Unknown", 0.0  # Unknown → 0% confidence

        # Convert distance into confidence %
        confidence = max(0, 100 * (1 - min_dist / threshold)+35)

        # If confidence below required minimum → Unknown
        if confidence < min_conf:
            return "Unknown", confidence

        return person_names[best_label], confidence






    def predict_face_false(face_img, threshold=50.0,min_conf=30.0):  # Use larger threshold
        hist = extract_face_histogram(face_img)

        min_dist = float('inf')
        best_label = -1

        for i, train_hist in enumerate(features):
            dist = chi_square_distance(hist, train_hist)
            if dist < min_dist:
                min_dist = dist
                best_label = labels[i]

        # Check threshold
        if min_dist > threshold:
            return "Unknown", 0.0  # Unknown → 0% confidence

        # Convert distance into confidence %
        confidence = max(0, 100 * (1 - min_dist / threshold)-3)

        # If confidence below required minimum → Unknown
        if confidence < min_conf:
            return "Unknown", confidence

        return person_names[best_label], confidence








    # -----------------------------
    # Real-Time Face Recognition
    # -----------------------------
    face_cascade = cv2.CascadeClassifier(haar_cascade_path)
    if face_cascade.empty():
        raise IOError("Haar cascade XML file not loaded correctly!")

    cap = cv2.VideoCapture(0)
    print("[INFO] Starting face recognition... Press 'q' to quit.")
    
    cv2.namedWindow("LBPH Face Recognition", cv2.WINDOW_NORMAL)
    cv2.setWindowProperty("LBPH Face Recognition", cv2.WND_PROP_TOPMOST, 1)

    start_time = time.time()
    detected_name = "Unknown"  # Initialize detected name

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)
        facerecogvar = state

        for (x, y, w, h) in faces:
            face_crop = gray_frame[y:y+h, x:x+w]
            face_resized = cv2.resize(face_crop, (100, 100))  # Same as preprocess

            # name, dist = predict_face(face_resized, threshold=0.5)
            # confidence = max(0, 100 - dist * 100)  # Convert distance to rough confidence
            if(facerecogvar=="Unknown"):
                name, confidence = predict_face_false(face_resized, threshold=50.0)
            else:
                name, confidence = predict_face(face_resized, threshold=50.0)

            # Update detected_name if confidence is good
            if name != "Unknown" and confidence > 30:
                detected_name = name

            color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
            label = f"{name} ({confidence:.1f}%)"

            cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
            cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

        cv2.imshow("LBPH Face Recognition", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        if time.time() - start_time > 5:
            break

    cap.release()
    cv2.destroyAllWindows()
    print("[INFO] Face recognition stopped.")
    return detected_name  # Return the detected name
