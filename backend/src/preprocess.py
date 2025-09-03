import os
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# -----------------------------
# Paths
# -----------------------------
app = Flask(__name__)
CORS(app)

def preprocess_dataset(dataset_path='dataset', processed_path='processed_dataset', IMG_WIDTH=100, IMG_HEIGHT=100):
    # dataset_path = 'dataset'                  # Raw captured images
    # processed_path = 'processed_dataset'     # Preprocessed images

    # Target image size
    # IMG_WIDTH = 100
    # IMG_HEIGHT = 100

    # Create processed dataset folder if not exist
    if not os.path.exists(processed_path):
        os.makedirs(processed_path)
    processed_count = 0
    # Loop through each person
    for person_name in os.listdir(dataset_path):
        person_folder = os.path.join(dataset_path, person_name)
        processed_person_folder = os.path.join(processed_path, person_name)

        # Create folder for processed images
        if not os.path.exists(processed_person_folder):
            os.makedirs(processed_person_folder)

        # Loop through each image
        for img_name in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_name)

            # Read image
            img = cv2.imread(img_path)

            if img is None:
                continue

            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # Resize to fixed size
            resized = cv2.resize(gray, (IMG_WIDTH, IMG_HEIGHT))

            # Normalize to [0,1]
            normalized = resized / 255.0

            # Convert back to uint8 for saving
            save_img = (normalized * 255).astype(np.uint8)

            # Save processed image
            save_path = os.path.join(processed_person_folder, img_name)
            cv2.imwrite(save_path, save_img)

    print("[INFO] Preprocessing complete. All images saved in 'processed_dataset/'")
    return processed_count
