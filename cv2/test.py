import os
import time
from PIL import Image
import cv2 as cv
import matplotlib.pyplot as plt
import numpy as np
from flask import Flask,request,jsonify,render_template,send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS
import io
import base64
import urllib.request
import logging
import requests
from remove_background import remove_background


app= Flask(__name__)
CORS(app,origins='*')
i = 1

def generateImg(path):
    img = Image.open(path)
    name = path.split('/')[-1]
    refname = name.split('.')[0]
    extension=name.split('.')[-1]
    print(refname)
    img.save('data/{}.{}'.format(refname,extension))
    os.system('''python main.py --choose_test_data=-1''')
    
    imgload = cv.imread(path)
    imgload = cv.resize(imgload, (imgload.shape[1],imgload.shape[0]))

    imgedge = cv.imread('result/BIPED2CLASSIC/fused/{}.png'.format(refname))
    # cv.imshow("Image",img)
    imgedge = cv.resize(imgedge, (imgedge.shape[1],imgedge.shape[0]))
    
# Grayscale 
    gray = cv.cvtColor(imgedge, cv.COLOR_BGR2GRAY) 
    _,mask = cv.threshold(gray,220,255,cv.THRESH_BINARY_INV)
    # cv.imshow('Inverted contour', mask)
    # cv.waitKey(0) 
    

    # Find Canny edges 
    edged = cv.Canny(gray, 30, 200) 

    # Finding Contours 
    # Use a copy of the image e.g. edged.copy() 
    # since findContours alters the image 
    contours, hierarchy = cv.findContours(edged, 
        cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE) 


    print("Number of Contours found = " + str(len(contours))) 

    # Draw all contours 
    # -1 signifies drawing all contours 
    contours = sorted(contours,key = cv.contourArea,reverse=True);
        
    # cv.drawContours(imgedge, contours, -1, (0, 255, 0),3) 
    imgfill = cv.fillPoly(imgedge, pts =contours, color=(0,0,0))

    kernel = np.ones((3,3),np.uint8)
    opening = cv.morphologyEx(imgfill, cv.MORPH_OPEN, kernel)
    img = cv.dilate(mask,kernel,iterations=2)

    finalImg = cv.bitwise_or(imgload,opening)
    # cv.imshow('Or function',cv.bitwise_or(imgload,imgfill))
    # cv.waitKey(0)
    # cv.destroyAllWindows() 
    return contours,finalImg,name
    
# contours,image,name = generateImg('Images/wall7.jpeg')
# cv.imwrite('Saved/{}'.format(name),image)


Upload_Folder = 'ToProcess/'
Allowed = set(['jpg', 'png', 'jpeg'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in Allowed

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = Upload_Folder


@app.route('/giveimage',methods=['POST'])
def giveimage():
    global i
    data = request.json
    try:
        f = open('temp.jpg','wb')
        f.write(requests.get(data['images'][0]['url']).content)
        f.close()
        img_obj = Image.open('temp.jpg') 
        contours,image,name = generateImg(f"temp.jpg")
        cv.imwrite('Saved/temp{}.jpg'.format(i),image) 
        input_path = "Saved/temp{}.jpg".format(i)
        output_path = "Final/result{}.png".format(i)
        remove_background(input_path, output_path)
        # list1.append(send_file('Saved/temp{}.jpg'.format(0)))
    except Exception as e:
        print(e)
        return 'error'   
    
    i+=1

    return send_file('Final/result{}.png'.format(i-1))
    
            
        
if __name__ == '__main__':
    app.run()


