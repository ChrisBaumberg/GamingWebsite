function gameLoop(){
    guessInput=document.querySelector(".inputGuess").value
    guess=Number(guessInput)
    advice=document.querySelector(".labelAdvice")
    labelTries=document.querySelector(".labelTries")
    plural=""
if (tries !=1){
    plural="e"
}
if (guess==randNum){
    advice.innerHTML="<b>Richtig</b>!"
    advice.style.color="red";
    
    labelTries.innerHTML=`Du hast <span class="spanTries"><b> ${tries} </b></span> Versuch${plural} benötigt!`
    document.querySelector(".btnGuess").disabled=true
    document.querySelector(".btnRandNum").disabled=false
}
else if(guess<randNum){
    advice.innerHTML="Deine Zahl ist zu klein!"
    advice.style.color="black"
    tries=tries+1
}
else{
    advice.innerHTML="Deine Zahl ist zu groß!"
    advice.style.color="black"
    tries=tries+1
}
 
 
}
function createRandNum(){
    labelTries=document.querySelector(".labelTries") 
    if (labelTries!=null){
    labelTries.innerHTML=""
}
    maxInput=document.querySelector(".maxValue").value
    
    maxInput=Number(maxInput)
    randNum=Math.floor(Math.random() * maxInput)
  
    tries=1
    document.querySelector(".btnGuess").disabled=false
    document.querySelector(".btnRandNum").disabled=true
}
function checkGuess(guess,randNum){
    if(guess==randNum){
        return true
    }
    else{
        return false
    }
}
function handleOnKeypress(){
    if (e.code=="Enter" ){
        checkGuess()
    }
}