const characters = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a",
    "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
    "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z", "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9", "~", "`", "!", "@", "#",
    "$", "%", "^", "&", "*", "(", ")", "_", "-", "+",
    "=", "{", "[", "}", "]", ",", "|", ":", ";", "<",
    ">", ".", "?", "/"];

const pas = document.getElementById("password");
const pas1 = document.getElementById("password1");
const size = document.getElementById("lname");
const generateBtn = document.getElementById("generateBtn");

function getrandom() {
    const n = Math.max(1, Math.min(99, parseInt(size?.value, 10) || 8));
    let result = "";
    for (let i = 0; i < n; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
}

function Getpassword() {
    if (pas) pas.textContent = getrandom();
    if (pas1) pas1.textContent = getrandom();
}

if (generateBtn) {
    generateBtn.addEventListener("click", Getpassword);
}

async function copyPassword(elementId) {
    const el = document.getElementById(elementId);
    const passwordText = el ? el.textContent.trim() : "";

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(passwordText);
            return;
        }
    } catch (error) {
        // Fall back to the legacy copy path below.
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = passwordText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    tempInput.remove();
}

