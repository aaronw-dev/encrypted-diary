import os
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
from cryptography.fernet import Fernet
with open("random.diary", "r") as file:
    message = file.read()
with open("key.temp", "r") as file:
    key = file.read()
fernet = Fernet(key)
encMessage = fernet.encrypt(message.encode())
with open("random.diary", "wb") as file:
    file.write(encMessage)
os.remove("key.temp")
