const mainTextArea = document.getElementById("main-text");
const downloadContainer = document.getElementById("download-container");
const encryptContainer = document.getElementById("encrypt-container")
const decryptContainer = document.getElementById("decrypt-container")

mainTextArea.value = "Hello, world! This is my absolutely hilarious diary.";

mainTextArea.hidden = true;
downloadContainer.hidden = false;
encryptContainer.hidden = true;
decryptContainer.hidden = true;

var hasBeenDecrypted = false;

function encryptionKey() {
    returnvalue = document.getElementById("enckey").value
    document.getElementById("enckey").value = ""
    return returnvalue
}

function decryptionKey() {
    returnvalue = document.getElementById("deckey").value
    document.getElementById("deckey").value = ""
    return returnvalue
}

function downloadFileFromServer(filename) {
    fetch(filename)
        .then((res) => res.text())
        .then((text) => {
            console.log("Successfully fetched file contents!");
            mainTextArea.value = text;
        })
        .catch((e) => console.error(e))
}

async function loadFile(file) {
    let text = await file.text();
    console.log("Successfully loaded file contents!");
    mainTextArea.value = text;
    refreshEncryptDecrypt()
    mainTextArea.hidden = false;
    downloadContainer.hidden = true;
}

function decryptFile() {
    hasBeenDecrypted = true;
    console.log(decryptionKey())
    decryptString(mainTextArea.value, decryptionKey())
        .then((decryptedString) => {
            console.log('Decrypted string:', decryptedString);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    refreshEncryptDecrypt()
}

function encryptFile() {
    hasBeenDecrypted = false;
    console.log(encryptionKey())
    refreshEncryptDecrypt()
}

function refreshEncryptDecrypt() {
    encryptContainer.hidden = hasBeenDecrypted ? false : true;
    decryptContainer.hidden = hasBeenDecrypted ? true : false;
}
function tasta() {
    async function decryptMessage(key, encryptedMessage) {
        // Convert the base64-encoded key to a Uint8Array
        const keyBuffer = Uint8Array.from(atob(key), c => c.charCodeAt(0));

        // Convert the base64-encoded message to a Uint8Array
        const messageBuffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));

        // Convert the key to an importable format
        const importKey = async () => {
            return await crypto.subtle.importKey(
                'raw',
                keyBuffer,
                { name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt']
            );
        };

        // Decrypt and decode the message
        const importedKey = await importKey();

        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(12) }, // Assuming an IV of zeros for simplicity
            importedKey,
            messageBuffer
        );

        // Convert the decrypted buffer to a string using UTF-8 decoding
        const decMessage = new TextDecoder('utf-8').decode(decryptedBuffer);

        return decMessage;
    }

    // Example usage
    const key = '6V2doDYUP5RKGHB9Ji9Km8PxTxyRGYNTGz4e8PG-DMY=';
    const encryptedMessage = mainTextArea.value;

    decryptMessage(key, encryptedMessage)
        .then(decMessage => console.log(decMessage))
        .catch(error => console.error(error));

}