import os
import numpy as np
import pickle

# -----------------------------
# Paths
# -----------------------------
def lpbh_model(features_path='features/features.npy',
                      labels_path='features/labels.npy',
                      person_names_path='features/person_names.pkl',
                      model_path='models/lbph_model.pkl'):
    # features_path = 'features/features.npy'
    # labels_path = 'features/labels.npy'
    # person_names_path = 'features/person_names.pkl'
    # model_path = 'models/lbph_model.pkl'

    # Create models folder if not exist
    if not os.path.exists('models'):
        os.makedirs('models')

    # -----------------------------
    # Load features and labels
    # -----------------------------
    features = np.load(features_path)
    labels = np.load(labels_path)

    # Load person names mapping
    with open(person_names_path, 'rb') as f:
        person_names = pickle.load(f)

    print(f"[INFO] Loaded {features.shape[0]} face feature vectors.")

    # -----------------------------
    # Shuffle dataset (optional)
    # -----------------------------
    indices = np.arange(features.shape[0])
    np.random.shuffle(indices)
    features = features[indices]
    labels = labels[indices]

    # -----------------------------
    # Save the LBPH "model"
    # -----------------------------
    lbph_model = {
        'features': features,
        'labels': labels,
        'person_names': person_names
    }

    with open(model_path, 'wb') as f:
        pickle.dump(lbph_model, f)

    print(f"[INFO] LBPH model saved to '{model_path}'")
