#!/usr/bin/env python3
import os
import argparse
import pytesseract
import cv2
import numpy as np

def filter(image):
    # grayscale image
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # inverse b/w
    invert = cv2.bitwise_not(gray)
    # apply Otsu threshold
    thresh = cv2.threshold(invert, 0, 255, cv2.THRESH_OTSU)[1]
    return thresh

def get_contours(img):
    contours, _ = cv2.findContours(filter(img), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    r1, r2 = sorted(contours, key=cv2.contourArea)[-3:-1]
    x, y, w, h = cv2.boundingRect(np.r_[r1, r2])
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)

def tesseract(dir):
    os.chdir(dir)
    good_res = 0
    bad_res = 0
    for file in os.listdir():
        if file.endswith((".jpeg",".jpg")):
            print("\n" + ">>> Processing " + file + " <<<")
            img = cv2.imread(file)
            thr = filter(img)
            #cv2.imshow("Pic",thr)
            #cv2.waitKey()
            ocr = pytesseract.image_to_string(thr, lang = "eng+rus", config = "--psm 1")
            if len(ocr.splitlines()) > 2:
                ocr_lines = ocr.splitlines()
                cam_id = ocr_lines[0].split(' ', 1)[1]
                cam = ocr_lines[1]
                addr = ocr_lines[2]
                print("ID: " + cam_id)
                print("Camera: " + cam)
                print("Address: " + addr.lower())
            else:
                bad_res += 1
                print("Camera/Address not parsed")
    print("Matched: " + str(good_res) + "\n" + "Not matched: " + str(bad_res))

parser=argparse.ArgumentParser()
parser.add_argument("-i", "--input", dest="inputdir", help="input JPEG folder")
parser.add_argument("-t", "--tesseract", dest="tesseract", help="input JPEG folder",default="/usr/local/bin/tesseract")
args = parser.parse_args()

pytesseract.pytesseract.tesseract_cmd = args.tesseract
tesseract(args.inputdir)
