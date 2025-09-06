import cv2
import os
import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# --------- Configuration ---------
# Path to your test dataset
# Assume folder structure: test_dataset/{label}_{name}.jpg
TEST_FOLDER = "dataset/"

# Haar Cascade face detector
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

# Load your trained LBPH model
recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read("lbph_model.pkl")  # Replace with your saved model

# --------- Load Test Images ---------
test_images = []
test_labels = []

for filename in os.listdir(TEST_FOLDER):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        img_path = os.path.join(TEST_FOLDER, filename)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        label = int(filename.split("_")[0])  # e.g., 0_Rose.jpg -> label=0
        test_images.append(img)
        test_labels.append(label)

print(f"Loaded {len(test_images)} test images.")

# --------- Evaluate Recognition ---------
predictions = []
true_labels = []

for idx, (img, label) in enumerate(zip(test_images, test_labels)):
    faces = face_cascade.detectMultiScale(img, scaleFactor=1.1, minNeighbors=5)
    if len(faces) == 0:
        print(f"[{idx}] No face detected for label {label}")
        continue

    # Take the first detected face
    (x, y, w, h) = faces[0]
    face_roi = img[y:y+h, x:x+w]

    pred_label, confidence = recognizer.predict(face_roi)
    print(f"[{idx}] True: {label}, Predicted: {pred_label}, Confidence: {confidence:.2f}")

    predictions.append(pred_label)
    true_labels.append(label)

# --------- Print Evaluation Metrics ---------
if len(predictions) > 0:
    acc = accuracy_score(true_labels, predictions)
    print("\n=== Evaluation Results ===")
    print(f"Accuracy: {acc*100:.2f}%")
    print("Confusion Matrix:")
    print(confusion_matrix(true_labels, predictions))
    print("\nClassification Report:")
    print(classification_report(true_labels, predictions))
else:
    print("No predictions made. Check your test images and face detection.")
