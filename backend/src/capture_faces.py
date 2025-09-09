import cv2
import os

# -----------------------------
# User Configuration
# -----------------------------
def capture_faces(person_name, dataset_path='dataset',max_images=30, camera_index=0):
    person_name = person_name.strip()
    # dataset_path = 'dataset'
    person_path = os.path.join(dataset_path, person_name)

    # Create folder if it doesn't exist
    if not os.path.exists(person_path):
        os.makedirs(person_path)

    # Load Haar Cascade
    haar_cascade_path = 'classifiers/haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(haar_cascade_path)

    if face_cascade.empty():
        raise IOError("Haar cascade XML file not loaded correctly!")

    # Open webcam
    cap = cv2.VideoCapture(camera_index)
    img_count = 0
   
    cv2.namedWindow('Face Capture', cv2.WINDOW_NORMAL)
    cv2.setWindowProperty('Face Capture', cv2.WND_PROP_TOPMOST, 1)
    # max_images = 30  # Number of images to capture per person

    print("Press 'q' to quit early.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5)

        for (x, y, w, h) in faces:
            # Draw rectangle around face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Crop & save face
            face_crop = gray_frame[y:y+h, x:x+w]
            img_count += 1
            img_filename = os.path.join(person_path, f"img_{img_count}.jpg")
            cv2.imwrite(img_filename, face_crop)
        # status_text = f"Capturing face data ({img_count}/{max_images})"
        # cv2.putText(frame, status_text, (10, 30),
        #             cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
        cv2.imshow('Face Capture', frame)

        # Break loop
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q') or img_count >= max_images:
            break

    print(f"[INFO] Collected {img_count} images for {person_name}")

    cap.release()
    cv2.destroyAllWindows()
