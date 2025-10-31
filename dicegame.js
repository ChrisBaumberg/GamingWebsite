/* Prepare the game */

function getEndValue(){
    /* Setup Buttons and Inputs */
    const endValue=Number(document.querySelector(".inputEndValue").value)
    console.log(endValue)
    
    
    return endValue
    
}


function startGame(){
    /* Game Start */
    var endValue=getEndValue()
    if (endValue < 1){
        alert("Bitte eine positive Zahl > 0 eingeben!")
    }
    else{
    document.querySelector(".btnGoon").disabled=false
    document.querySelector(".btnSafe").disabled=false
    document.querySelector(".btnStart").disabled=true
    //console.log("EndValue: ",endValue)
    gamePlayer=document.querySelector(".inputPlayerName").value
    
    
    player=gamePlayer
    document.querySelector(".playerName").innerHTML=player
}
}

function resetForm(){
    /* Form Reset */
    document.querySelector(".btnStart").
    disabled=false
    console.log("-------------------------------")
    console.log("Neues Spiel")
    safes=0
    sixes=0
    roundpoints=0
    gamepoints=0
    rounds=0
    lostpoints=0
    results=""
    diceValue=0
    safesCPU=0
    sixesCPU=0
    roundpointsCPU=0
    gamepointsCPU=0
    roundsCPU=0
    lostpointsCPU=0
    resultsCPU=""
    document.querySelector(".btnReset").disabled=true
    document.querySelector(".sessionPoints").innerHTML=roundpoints
    document.querySelector(".results").innerHTML=results
    document.querySelector(".gamePoints").innerHTML=gamepoints
    document.querySelector(".gamePointsCPU").innerHTML=gamepointsCPU
    console.log("---------------------")
    console.log("Neues Spiel")
    document.querySelector(".player").style.backgroundColor="white"
    document.querySelector(".CPU").style.backgroundColor="white"
    document.querySelector(".protocolPlayer").textContent="";
    document.querySelector(".protocolCPU").textContent="";
    document.querySelector(".points").innerHTML = ""
    document.querySelector(".pointDifferences").innerHTML=":"
}
/* Player Area */

/* Define values */
safes=0
sixes=0
roundpoints=0
gamepoints=0
rounds=0
lostpoints=0
results=""
diceValuesPlayer =[]
document.querySelector(".protocolPlayer").textContent="";
protocolInputPlayerList=document.querySelector(".protocolPlayer");
    
function getRandomInt(min, max) {
    /* Random Number */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function diceThrow(){
    /* triggered when the Button btnGoon is pushed, returns a random number between 1 and 6 */
    playDiceSound()
    diceValue=getRandomInt(1,6)
    
    diceUFT=0
    switch (diceValue){
        case 1:
            diceUFT=9856;
            break
        case 2:
            diceUFT=9857;
            break
        case 3:
            diceUFT=9858;
            break
        case 4:
            diceUFT=9859;
            break
        case 5:
            diceUFT=9860;
            break
        case 6:
            diceUFT=9861;
            break
    }
    diceValueText=`&#${diceUFT}`
    document.querySelector(".diceValue").innerHTML=diceValueText;
    diceValuesPlayer.push(diceValue)
    protocolInputPlayer=document.createElement("li");
    diceThrowText="Wurf "+rounds+": "+diceValue;
        protocolInputPlayer.innerText= diceThrowText;
        protocolInputPlayer.style.backgroundColor ="white";
        protocolInputPlayerList.appendChild(protocolInputPlayer)
    return diceValue
}

function gameLoop(){
    /* Start Game Loop */
    document.querySelector(".player").style.backgroundColor="white"
    rounds=rounds+1
    player=gamePlayer
    
    //endValue=getEndValue()
    setInterval(diceThrow(),1335)
    
   
    
        if (diceValue!=6){
            /* Dice Throw returns no 6 */
        roundpoints=roundpoints+diceValue
        
        }
        else{
       /* Dice Throw returns 6*/
        lostpoints=lostpoints+roundpoints
        protocolInputPlayer=document.createElement("li");
    diceThrowText="Fail - Punkte verloren: "+roundpoints +"\n Aktuelle Punktzahl: "+gamepoints;
        protocolInputPlayer.innerText= diceThrowText;
        protocolInputPlayer.style.backgroundColor="red";
        protocolInputPlayerList.appendChild(protocolInputPlayer)
        /* All points in this sessions are lost */
        roundpoints=0
        sixes=sixes+1
       document.querySelector(".player").style.backgroundColor="blue"
        document.querySelector(".btnGoon").disabled=true
        document.querySelector(".btnSafe").disabled=true
        
       /* Change Player to CPU */
        player="CPU"
        
        CPUPlay()
        }
            document.querySelector(".sessionPoints").innerHTML=roundpoints
}

function safePoints(){
    /* triggered by push on Button btnSafe, safes the current sessionpoints */
    
    gamepoints=roundpoints+gamepoints
    protocolInputPlayer=document.createElement("li");
    diceThrowText="Safe - Punkte gesichert: "+roundpoints+"\n Aktuelle Punktzahl: "+gamepoints;
        protocolInputPlayer.innerText= diceThrowText;
        protocolInputPlayer.style.backgroundColor ="green";
        protocolInputPlayerList.appendChild(protocolInputPlayer)
    
    document.querySelector(".gamePoints").innerHTML=gamepoints
    roundpoints=0
    safes=safes+1
    document.querySelector(".btnGoon").disabled=true
    document.querySelector(".btnSafe").disabled=true
    /* Check, if current gamepoints are enough to finish the game */
    controlPoints()
    
    if(!checkPoint){
        /* if not change player to CPU */
        player="CPU"
        CPUPlay()
        
    } 
}

/*CPU Area */

/* Define values */
safesCPU=0
sixesCPU=0
roundpointsCPU=0
gamepointsCPU=0
roundsCPU=0
lostpointsCPU=0
resultsCPU=""
diceValuesCPU = []

document.querySelector(".protocolCPU").textContent="";
    protocolInputCPUList=document.querySelector(".protocolCPU");
    
function CPUPlay(){
    /* set player*/
    player="CPU"
    
   
    endValue=getEndValue()
    /* Check, if current gamepoints are enough to finish the game */
    if(gamepointsCPU>=endValue){
        alert(`CPU: ${endValue} Punkte wurden erreicht!`)
    }else{
    while (player=="CPU"&&gamepointsCPU<endValue){
    gameLoopCPU()
}
    }
   
}

function diceThrowCPU(){
    /* Dice Throw for CPU */
    playDiceSound()
    
    diceValueCPU=getRandomInt(1,6)
    document.querySelector(".diceValueCPU").innerHTML=diceValueCPU
    protocolInputCPU=document.createElement("li")
    diceThrowCPUText="Wurf: "+(roundsCPU+1)+": "+diceValueCPU;
    protocolInputCPU.innerText=diceThrowCPUText;
    protocolInputCPU.style.backgroundColor = "white";
            protocolInputCPUList.appendChild(protocolInputCPU);
    diceValuesCPU.push(diceValueCPU)
    console.log(diceThrowCPUText)
    return diceValueCPU
}

function gameLoopCPU(){
    /* Game Loop of CPU */
    document.querySelector(".CPU").style.backgroundColor="white"
    
    /* CPU throws Dice until the roundpoints are 8 or higher */
    
    while (roundpointsCPU < 8){
        diceThrowCPU()
        roundsCPU=roundsCPU+1
        
        if (diceValueCPU!=6){
        roundpointsCPU=roundpointsCPU+diceValueCPU
        document.querySelector(".diceValueCPU").innerHTML=diceValueCPU
        document.querySelector(".sessionPointsCPU").innerHTML=roundpointsCPU
        document.querySelector(".CPU-decission").innerHTML="w"
        document.querySelector(".CPU-decission").style.color="green"
       
        
        }
        else{
            protocolInputCPU=document.createElement("li")
            diceThrowCPUText="Fail - Punkte verloren: "+roundpointsCPU+"\n Aktuelle Punktzahl: "+gamepointsCPU;
            protocolInputCPU.innerText=diceThrowCPUText;
            protocolInputCPU.style.backgroundColor = "red";
                protocolInputCPUList.appendChild(protocolInputCPU);
        lostpointsCPU=roundpointsCPU+lostpointsCPU
        roundpointsCPU=0
        sixesCPU=sixesCPU+1
        document.querySelector(".CPU").style.backgroundColor="blue"
        player=gamePlayer
        document.querySelector(".diceValueCPU").innerHTML=diceValueCPU
        document.querySelector(".sessionPointsCPU").innerHTML=roundpointsCPU
        diceUFTC=9861;
        break
        }
     
       diceUFTC=0
    switch (diceValueCPU){
        case 1:
            diceUFTC=9856;
            break
        case 2:
            diceUFTC=9857;
            break
        case 3:
            diceUFTC=9858;
            break
        case 4:
            diceUFTC=9859;
            break
        case 5:
            diceUFTC=9860;
            break
   
    }
    diceValueCPUText=`&#${diceUFTC}`
    document.querySelector(".diceValueCPU").innerHTML=diceValueCPUText
    }
    
    document.querySelector(".CPU-decission").innerHTML="s"
    document.querySelector(".CPU-decission").style.color="red"
    
    
    if (diceValueCPU != 6){
        safePointsCPU()
    }
    else{
        
        document.querySelector(".gamePointsCPU").innerHTML=gamepointsCPU
        roundpointsCPU=0
        safesCPU=safesCPU+1
    
        document.querySelector(".btnGoon").disabled=false
        document.querySelector(".btnSafe").disabled=false

    }
      /* Change to Player*/
   if(!checkPoint){
        
        player=gamePlayer
       
        
        
    }  
}
function safePointsCPU(){
    
    gamepointsCPU=roundpointsCPU+gamepointsCPU
    protocolInputCPU=document.createElement("li")
    diceThrowCPUText="Safe - Punkte gesichert: "+roundpointsCPU+"\n Aktuelle Punktzahl: "+gamepointsCPU;
    protocolInputCPU.innerText=diceThrowCPUText;
    protocolInputCPU.style.backgroundColor = "green";
            protocolInputCPUList.appendChild(protocolInputCPU);
    /* Check, if current gamepoints are enough to finish the game */
    controlPoints()
    document.querySelector(".gamePointsCPU").innerHTML=gamepointsCPU
    roundpointsCPU=0
    safesCPU=safesCPU+1
    //diceValuesCPU.push("Safe")
    document.querySelector(".btnGoon").disabled=false
    document.querySelector(".btnSafe").disabled=false

}

/* System functions */

function controlPoints(){
    /* Check, if current gamepoints are enough to finish the game */
    checkPoint=false
    endValue=getEndValue()
    if(gamepoints>=endValue||gamepointsCPU>=endValue){
        alert("Game over!")
        gameOver(player)
        sixesamount=(sixes/rounds)*100
        sixesamount=sixesamount.toFixed(2)
        sixesamountCPU=(sixesCPU/roundsCPU)*100
        sixesamountCPU=sixesamountCPU.toFixed(2)
        document.querySelector(".btnGoon").disabled=true
        document.querySelector(".btnSafe").disabled=true
        document.querySelector(".btnReset").disabled=false
        results=`Runden: ${rounds}\nAnzahl der Safes:${safes}\nSechsen: ${sixes}\nPunktverluste durch Sechsen: ${lostpoints}
        Anteil Sechsen an Runden: ${sixesamount}%`
        document.querySelector(".results").innerHTML=results
        checkPoint=true
        document.querySelector(".btnReset").disabled=false
        resultsCPU=`Runden: ${roundsCPU}\nAnzahl der Safes:${safesCPU}\nSechsen: ${sixesCPU}\nPunktverluste durch Sechsen: ${lostpointsCPU}
        Anteil Sechsen an Runden: ${sixesamountCPU}%`
    document.querySelector(".resultsCPU").innerHTML=resultsCPU
        if (player==gamePlayer){
            document.querySelector(".player").style.backgroundColor="green"
            document.querySelector(".CPU").style.backgroundColor="red"
        }
        else{
            document.querySelector(".CPU").style.backgroundColor="green"
            document.querySelector(".player").style.backgroundColor="red"
        }
    }
   
    return checkPoint
   
}

/* Post Game functions */

function gameOver(player){
    player=player
    points=0;
    if (gamepoints < gamepointsCPU){
        points=endValue -gamepoints
        protocolInputCPU=document.createElement("li")
    diceThrowCPUText="Ende: Gewinner mit "+gamepointsCPU+" Punkten";
    protocolInputCPU.innerText=diceThrowCPUText;
            protocolInputCPUList.appendChild(protocolInputCPU);
            protocolInputPlayer=document.createElement("li");
    diceThrowText="Ende: Verlierer mit "+gamepoints+" Punkten";
        protocolInputPlayer.innerText= diceThrowText;
        protocolInputPlayerList.appendChild(protocolInputPlayer)
    }
    else{
        points=endValue -gamepointsCPU
        protocolInputCPU=document.createElement("li")
    diceThrowCPUText="Ende: Verlierer mit "+gamepointsCPU+" Punkten";
    protocolInputCPU.innerText=diceThrowCPUText;
            protocolInputCPUList.appendChild(protocolInputCPU);
            protocolInputPlayer=document.createElement("li");
    diceThrowText="Ende: Gewinner mit "+gamepoints+" Punkten";
        protocolInputPlayer.innerText= diceThrowText;
        protocolInputPlayerList.appendChild(protocolInputPlayer)
    }
    points=points/(endValue/100)
    points=points.toFixed(0)

    diff= gamepoints - gamepointsCPU
    if (diff < 0){
            diffText=`<b>CPU</b> hat ${-diff} Punkte mehr erzielt!`
            diffText2=`: <br> <span class="diffText">${-diff} &#11166 </span>`
    }
    else{
        diffText=`<b>${player}</b> hat ${diff} Punkte mehr erzielt!`
        diffText2=` : <br> <span class="diffText">&#11164 ${diff}</span>`
    }
   winner=`${player} ist der Gewinner mit ${points} Punkten`
   document.querySelector(".winner").innerHTML=winner
   document.querySelector(".btnGoon").disabled=true
    document.querySelector(".btnSafe").disabled=true
    document.querySelector(".btnStart").disabled=false
    document.querySelector(".points").style.border =" 1px solid black"
    document.querySelector(".points").style.backgroundColor="yellowgreen"
    document.querySelector(".points").innerHTML = `${gamePlayer} ${gamepoints}:${gamepointsCPU} CPU` +"<br>"+  `${diffText}`
    document.querySelector(".pointDifferences").innerHTML= diffText2
   console.log(winner)  
}

function playDiceSound(){
    var diceSound = new Audio("./files/sounds/diceThrow.wav")
    diceSound.play()
}