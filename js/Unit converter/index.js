let Input=document.getElementById("number-to-convert")
let btn=document.getElementById("convert")
let len=document.getElementById("p1")
let vol=document.getElementById("p2")
let mas=document.getElementById("p3")
btn.addEventListener('click',function(){
let num=Number (Input.value)
//    console.log(num)
length(num)
volume(num)
mass(num)
})

function length (n){
len.innerText=`${n} meters = ${(n*3.281).toFixed(3)} feet | ${n} feet = ${(n/3.281).toFixed(3)} meters`
}

function volume(n){    
vol.innerText=`${n} liters = ${(n*3.785).toFixed(3)} gallons | ${n} gallons = ${(n/3.785).toFixed(3)} liters`
}

function mass(n){
mas.innerText=`${n} kilos =  ${(n*2.205).toFixed(3)} pounds | ${n} pounds =  ${(n/2.205).toFixed(3)} kilos`
}