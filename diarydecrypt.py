import os
import base64
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
from cryptography.fernet import Fernet
with open("random.diary", "rb") as file:
    message = file.read()
entered_pw = input("Password: ")
key = base64.b64encode(f"{entered_pw:<32}".encode("utf-8"))
fernet = Fernet(key)
decMessage = fernet.decrypt(message).decode()
with open("random.diary", "w") as file:
    file.write(decMessage)
