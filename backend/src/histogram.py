import os
import cv2
import numpy as np
import pickle

# -----------------------------
# Paths
def lbp_histogram(block):
    hist, _ = np.histogram(block.ravel(), bins=256, range=(0, 255))
    hist = hist.astype(float)
    hist /= (hist.sum() + 1e-6)  # Normalize histogram
    return hist

# -----------------------------
# Paths
# -----------------------------
# -----------------------------
def lpb_features(lbp_path='lbp_dataset', features_path='features', GRID_X=8, GRID_Y=8):
    # lbp_path = 'lbp_dataset'
    # features_path = 'features'
    # labels_path = 'labels.npy'

    # # Grid size
    # GRID_X = 8
    # GRID_Y = 8

    # Create features folder if not exists
    if not os.path.exists(features_path):
        os.makedirs(features_path)

    # -----------------------------
    # Function to compute histogram for a grid
    # -----------------------------


    # -----------------------------
    # Process all LBP images
    # -----------------------------
    features = []
    labels = []

    for label, person_name in enumerate(os.listdir(lbp_path)):
        person_folder = os.path.join(lbp_path, person_name)

        for img_name in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_name)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

            if img is None:
                continue

            h, w = img.shape
            grid_h = h // GRID_Y
            grid_w = w // GRID_X

            final_hist = []

            # Loop through grids
            for i in range(GRID_Y):
                for j in range(GRID_X):
                    y0 = i * grid_h
                    x0 = j * grid_w
                    block = img[y0:y0+grid_h, x0:x0+grid_w]
                    hist = lbp_histogram(block)
                    final_hist.extend(hist)

            features.append(final_hist)
            labels.append(label)

    # Convert to NumPy arrays
    features = np.array(features, dtype=np.float32)
    labels = np.array(labels, dtype=np.int32)

    # Save features and labels
    np.save(os.path.join(features_path, 'features.npy'), features)
    np.save(os.path.join(features_path, 'labels.npy'), labels)

    # Save mapping of labels to person names
    person_names = {i: name for i, name in enumerate(os.listdir(lbp_path))}
    with open(os.path.join(features_path, 'person_names.pkl'), 'wb') as f:
        pickle.dump(person_names, f)

    print("[INFO] Histogram extraction complete. Features saved in 'features/'")
