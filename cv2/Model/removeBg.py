import cv2

image = cv2.imread("image.png")

hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

lower_green = np.array([170, 170, 170])
upper_green = np.array([255, 255, 255])

mask = cv2.inRange(hsv, lower_green, upper_green)

mask = cv2.bitwise_not(mask)

image = cv2.bitwise_and(image, image, mask=mask)

cv2.imwrite("image_without_background.png", image)