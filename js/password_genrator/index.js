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

const btn=document.getElementsByTagName("button")
const pas=document.getElementById("password")
const pas1=document.getElementById("password1")
const size=document.getElementById("lname");
function getrandom(){
    let randomnum=characters[Math.floor(Math.random()*characters.length)]
    for(let i=1;i<size.value;i++){
        randomnum=characters[Math.floor(Math.random()*characters.length)]+randomnum
    }
    return randomnum

}
function Getpassword(){
  
    pas.textContent=getrandom()
    pas1.textContent=getrandom()
}

async function copyPassword(elementId) {
    const passwordText = document.getElementById(elementId).textContent.trim();

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

