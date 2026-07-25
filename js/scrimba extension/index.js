const InputEl=document.getElementById("input-el")
const InputBtn=document.getElementById("input-btn")
const olEl=document.getElementById("olEl")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")
let myleads=[]
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myleads") )


if(Boolean(leadsFromLocalStorage)===true){
    myleads=leadsFromLocalStorage.filter(function(lead){
        return typeof lead === "string" && lead.trim() !== ""
    })
    localStorage.setItem("myleads", JSON.stringify(myleads))
     render(myleads)
}
function render(leads){ let li="" 
    for(let i=0;i<leads.length;i++){
        if (typeof leads[i] !== "string" || leads[i].trim() === "") {
            continue
        }

         li += `<li><a target='_blank' href='${ leads[i]}'>${ leads[i]}</a></li>`
    }
    olEl.innerHTML=li
    InputEl.value=""}

tabBtn.addEventListener("click", function(){
   if (chrome && chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
            if (tabs.length === 0) {
                return
            }

            const tabUrl = tabs[0].url || tabs[0].pendingUrl

            if (typeof tabUrl !== "string" || tabUrl.trim() === "") {
                return
            }

            myleads.push(tabUrl)
            localStorage.setItem("myleads", JSON.stringify(myleads) )
            render(myleads)
        })
   } else {
        const currentPageUrl = window.location.href

        if (typeof currentPageUrl !== "string" || currentPageUrl.trim() === "") {
            return
        }

        myleads.push(currentPageUrl)
        localStorage.setItem("myleads", JSON.stringify(myleads) )
        render(myleads)
   }
   
})    
deleteBtn.addEventListener("dblclick",function(){ 
localStorage.clear()
myleads=[]
render(myleads)

})

InputBtn.addEventListener("click",function(){

    const inputValue = InputEl.value.trim()

    if (inputValue === "") {
        return
    }

    myleads.push(inputValue)
    localStorage.setItem("myleads", JSON.stringify(myleads) )
    render(myleads)
    
})

