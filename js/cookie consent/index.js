const modal=document.getElementById("modal")
const modalClosebtn=document.getElementById("modal-close-btn")
const consentForm = document.getElementById('consent-form')
const modaltext=document.getElementById("modal-text")
const modalinner=document.getElementById("modal-inner")
const decline=document.getElementById("Decline")
const choiceBtn=document.getElementById("modal-choice-btns")


setTimeout(function() {
    modal.style.display="inline"
},3000)

modalClosebtn.addEventListener("click",function(){
    modal.style.display="none"
})

decline.addEventListener('mouseenter',function(){
     choiceBtn.classList.toggle('reverse')

})

consentForm.addEventListener("submit",function(e){
    e.preventDefault()

    const consentFormData = new FormData(consentForm)
    const username =  consentFormData.get("fullName")

    modaltext.innerHTML=
    `<div class="modal-inner-loading">
    <img src="images/loading.svg" class="loading">
    <p id="uploadText">
    Uploading your data to the dark web...
    </p>
    </div>`
    const uploadText=document.getElementById("uploadText")
    setTimeout(function(e){
        uploadText.innerText="Making the sale..."
    },1500)
    setTimeout(function(){
        
        modalinner.innerHTML= `
        
        <h2>Thanks ${username}, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
        <img src="images/pirate.jpg">
        </div>
        ` 
        modalClosebtn.disabled=false
    },3000)
})
