import os
import time
from PIL import Image
import cv2 as cv
import matplotlib.pyplot as plt

def generateImg(path):
    
    img = Image.open(path)
    name = path.split('/')[-1]
    refname = name.split('.')[0]
    extension=name.split('.')[-1]
    print(refname)
    img.save('data/{}.{}'.format(refname,extension))

    os.system('''python main.py --choose_test_data=-1''')
    
    imgload = cv.imread(path)
    imgload = cv.resize(imgload, (500,500))

    imgedge = cv.imread('result/BIPED2CLASSIC/fused/{}.png'.format(refname))
    imgedge = cv.resize(imgedge, (500,500))
    imgedge = cv.cvtColor(imgedge, cv.COLOR_BGR2GRAY)
    return imgedge

img = generateImg('Images/Bananas.jpg')
cv.imshow("edge",img)
key = cv.waitKey(0)
