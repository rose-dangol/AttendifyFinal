import numpy as np

# -----------------------------
# LBP computation
# -----------------------------
def compute_lbp(image):
    h, w = image.shape
    lbp_image = np.zeros((h, w), dtype=np.uint8)
    for y in range(1, h-1):
        for x in range(1, w-1):
            center = image[y, x]
            neighbors = [
                image[y-1, x-1], image[y-1, x], image[y-1, x+1],
                image[y, x+1],
                image[y+1, x+1], image[y+1, x], image[y+1, x-1],
                image[y, x-1]
            ]
            binary_string = ''.join(['1' if n >= center else '0' for n in neighbors])
            lbp_image[y, x] = int(binary_string, 2)
    return lbp_image

# -----------------------------
# Histogram extraction
# -----------------------------
def lbp_histogram(image, grid_x=8, grid_y=8):
    h, w = image.shape
    grid_h = h // grid_y
    grid_w = w // grid_x
    final_hist = []
    for i in range(grid_y):
        for j in range(grid_x):
            y0 = i * grid_h
            x0 = j * grid_w
            block = image[y0:y0+grid_h, x0:x0+grid_w]
            hist, _ = np.histogram(block.ravel(), bins=256, range=(0,255))
            hist = hist.astype(float)
            hist /= (hist.sum() + 1e-6)
            final_hist.extend(hist)
    return np.array(final_hist)

# -----------------------------
# Chi-Square distance
# -----------------------------
def chi_square_distance(H1, H2):
    return 0.5 * np.sum(((H1 - H2)**2) / (H1 + H2 + 1e-6))
