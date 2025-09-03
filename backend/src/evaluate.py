import os
import numpy as np
import pickle

# -----------------------------
# Paths
# -----------------------------
model_path = 'models/lbph_model.pkl'
results_path = 'results'
report_file = os.path.join(results_path, 'accuracy_report.txt')

# Create results folder if not exist
if not os.path.exists(results_path):
    os.makedirs(results_path)

# -----------------------------
# Load LBPH model
# -----------------------------
with open(model_path, 'rb') as f:
    lbph_model = pickle.load(f)

features = lbph_model['features']
labels = lbph_model['labels']
person_names = lbph_model['person_names']

# -----------------------------
# Chi-Square Distance Function
# -----------------------------
def chi_square_distance(H1, H2):
    return 0.5 * np.sum(((H1 - H2)**2) / (H1 + H2 + 1e-6))

# -----------------------------
# Train/Test Split
# -----------------------------
num_samples = features.shape[0]
indices = np.arange(num_samples)
np.random.shuffle(indices)

split_ratio = 0.8  # 80% train, 20% test
split_index = int(num_samples * split_ratio)

train_idx = indices[:split_index]
test_idx = indices[split_index:]

train_features = features[train_idx]
train_labels = labels[train_idx]

test_features = features[test_idx]
test_labels = labels[test_idx]

# -----------------------------
# Evaluate Accuracy
# -----------------------------
correct = 0
for i, test_f in enumerate(test_features):
    min_dist = float('inf')
    pred_label = -1
    for j, train_f in enumerate(train_features):
        dist = chi_square_distance(test_f, train_f)
        if dist < min_dist:
            min_dist = dist
            pred_label = train_labels[j]

    if pred_label == test_labels[i]:
        correct += 1

accuracy = (correct / len(test_features)) * 100

# -----------------------------
# Save Report
# -----------------------------
with open(report_file, 'w') as f:
    f.write("LBPH Face Recognition Accuracy Report\n")
    f.write("====================================\n")
    f.write(f"Total Test Samples: {len(test_features)}\n")
    f.write(f"Correct Predictions: {correct}\n")
    f.write(f"Accuracy: {accuracy:.2f}%\n")

print(f"[INFO] Evaluation complete. Accuracy report saved at '{report_file}'")
