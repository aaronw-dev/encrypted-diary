import os
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
from cryptography.fernet import Fernet
with open("random.diary", "rb") as file:
    message = file.read()
key = input("Key: ")
fernet = Fernet(key)
decMessage = fernet.decrypt(message).decode()
with open("random.diary", "w") as file:
    file.write(decMessage)
with open("key.temp", "w") as file:
    file.write(key)
