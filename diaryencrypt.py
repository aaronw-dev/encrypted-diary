import os
import base64
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
    exit()
from cryptography.fernet import Fernet
with open("random.diary", "r") as file:
    message = file.read()
flag = False
while flag == False:
    entered_pw = input("Password: ")
    confirm_pw = input("Confirm password: ")
    if (entered_pw == confirm_pw):
        flag = True
    else:
        print("Passwords do not match. Try again.")

key = base64.b64encode(f"{entered_pw:<32}".encode("utf-8"))
fernet = Fernet(key)
encMessage = fernet.encrypt(message.encode())
with open("random.diary", "wb") as file:
    file.write(encMessage)
with open("backup.diary", "wb") as file:
    file.write(encMessage)
