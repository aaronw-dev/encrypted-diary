import os
import base64
from cryptography.fernet import Fernet
if not os.path.exists("./random.diary"):
    print("Diary file does not exist.")
with open("./random.diary", "r") as file:
    dump = file.read()
entered_pw = input("Password: ")
key = base64.b64encode(f"{entered_pw:<32}".encode("utf-8"))
fernet = Fernet(key)
decMessage = fernet.decrypt(dump).decode()
splitMessage = decMessage.split(" ")
print(f"There are {len(decMessage)} letters in your diary.")
print(f"There are {len(splitMessage)} words in your diary.")
