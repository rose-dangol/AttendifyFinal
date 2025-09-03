import os
import cv2
import numpy as np

# -----------------------------
# Paths
def compute_lbp(image):
    """
    Input: grayscale image (2D numpy array)
    Output: LBP image (2D numpy array)
    """
    h, w = image.shape
    lbp_image = np.zeros((h, w), dtype=np.uint8)

    # Loop through each pixel (ignore border pixels)
    for y in range(1, h-1):
        for x in range(1, w-1):
            center = image[y, x]
            binary_string = ''

            # 3x3 neighborhood (clockwise starting top-left)
            neighbors = [
                image[y-1, x-1], image[y-1, x], image[y-1, x+1],
                image[y, x+1],
                image[y+1, x+1], image[y+1, x], image[y+1, x-1],
                image[y, x-1]
            ]

            for n in neighbors:
                binary_string += '1' if n >= center else '0'

            # Convert binary string to decimal
            lbp_value = int(binary_string, 2)
            lbp_image[y, x] = lbp_value

    return lbp_image

# -----------------------------
# Paths
# -----------------------------
# -----------------------------
def lpb_dataset(processed_path='processed_dataset', lbp_path='lbp_dataset'):
    # processed_path = 'processed_dataset'
    # lbp_path = 'lbp_dataset'

    # Create LBP folder if it doesn't exist
    if not os.path.exists(lbp_path):
        os.makedirs(lbp_path)


    # -----------------------------
    # Process all images
    # -----------------------------
    for person_name in os.listdir(processed_path):
        person_folder = os.path.join(processed_path, person_name)
        lbp_person_folder = os.path.join(lbp_path, person_name)

        if not os.path.exists(lbp_person_folder):
            os.makedirs(lbp_person_folder)

        for img_name in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_name)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)

            if img is None:
                continue

            # Compute LBP
            lbp_img = compute_lbp(img)

            # Save LBP image
            save_path = os.path.join(lbp_person_folder, img_name)
            cv2.imwrite(save_path, lbp_img)

    print("[INFO] LBP computation complete. All images saved in 'lbp_dataset/'")
