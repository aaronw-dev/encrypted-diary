import os
import base64
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
    exit()
from cryptography.fernet import Fernet
with open("random.diary", "r") as file:
    message = file.read()
entered_pw = input("Password: ")
key = base64.b64encode(f"{entered_pw:<32}".encode("utf-8"))
fernet = Fernet(key)
encMessage = fernet.encrypt(message.encode())
with open("random.diary", "wb") as file:
    file.write(encMessage)
with open("backup.diary", "wb") as file:
    file.write(encMessage)
