import { catsData } from "./data.js"
const gifOnly = document.getElementById('gifs-only-option')
const emotionRadios = document.getElementById('emotion-radios')
const imageBtn = document.querySelector(".get-image-btn")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')


imageBtn.addEventListener('click', renderCat)

function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifOnly.checked
        const catsmatch = catsData.filter(function(cat){
          if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
return(catsmatch)}
}

emotionRadios.addEventListener('change', function (e) {
    const radioarray = document.getElementsByClassName('radio')

    for (let item of radioarray) {
        item.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
)


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
     
    if (catsArray.length === 1){
        return (catsArray[0])
    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return(catsArray[randomNumber])}
}

function renderCat(){
        const catObject = getSingleCatObject()
    memeModalInner.innerHTML=`<img 
        class=${"cat-img"}
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`
    memeModal.style.display="flex"
}


closeBtn.addEventListener('click',function(){
    memeModal.style.display = "none"
})

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats) {
    let radios = ``
    const emotions = getEmotionsArray(cats)
    for (const emotion of emotions) {
        radios += ` <div class="radio">
                <label for='${emotion}'>${emotion}</label>
               
               <input type='radio'
                id='${emotion}'
                 name='emotion' 
                 value = '${emotion}'>
                
   </div>`

    }
    emotionRadios.innerHTML = radios
    // console.log(emotions)
}
renderEmotionsRadios(catsData);