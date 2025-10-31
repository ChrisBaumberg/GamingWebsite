tries=0

//labelDiceThrow=document.querySelector(".labelDiceThrow")
points=0
overthrown=false
overthrownPoints=0

function getInput(){
    const maxValue = Number(document.querySelector(".dicegame2MaxValue").value)
    return maxValue
}

function getRandomInt(min, max) {
    /* Random Number */
    min = Math.ceil(min);
    max = Math.floor(max);
    randNum=Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum
}

function diceThrow(){
    const endValue=getInput()
    minTries=Math.ceil(endValue/6)
    var diceUFT = 9856
    const diceValue=getRandomInt(1,6)
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

    const diceText=`<span class="diceSymbol">&#${diceUFT}</span>`
    document.querySelector(".labelDiceThrow").style.textDecoration="none";
    document.querySelector(".overThrown").innerHTML=""
    document.querySelector(".labelDiceThrow").innerHTML=diceText;
    tries = tries+1

    if(diceValue+points>endValue){
        overthrown=true
        overthrownPoints=overthrownPoints+1
    
    }
    else if(diceValue+points==endValue){
        points=points+diceValue
        overthrown=false
        finalPoints=endPoints(tries, overthrownPoints, endValue)
        document.querySelector(".gameResultsDice2").innerHTML=`Spielende!<br>Minimale Versuche: ${minTries}<br>Überworfen:<br><span class="otPoints">${overthrownPoints}</span> <br>Versuche: ${tries}<br>Punkte: <br> <span class="finalPoints">${finalPoints}</span>`
        document.querySelector(".btnStartGL").disabled=false;
        document.querySelector(".btnDiceThrow").disabled=true;
    }
    else{
      
        overthrown=false
        points=points+diceValue
    }
    document.querySelector(".currentPoints").innerHTML=`Aktuelle Punkte: ${points}`
    if(overthrown){
        document.querySelector(".overThrown").innerHTML="Überworfen!"
        document.querySelector(".labelDiceThrow").style.textDecoration="line-through";
    }
    
}

function gameLoop(){
    const endValue=getInput()
    if (endValue <1 || !(Number.isInteger(endValue)) ){
        alert("Bitte eine ganze Positive Zahl als Zielwert eingeben!")
    }
    else{
    tries=0
    points=0
    overthrownPoints=0

    document.querySelector(".btnStartGL").disabled=true;
    document.querySelector(".btnDiceThrow").disabled=false;
    document.querySelector(".labelDiceThrow").innerHTML=""
    document.querySelector(".currentPoints").innerHTML=`Aktuelle Punkte: ${points}`
    document.querySelector(".gameResultsDice2").innerHTML=""
}
}
function endPoints(tries, overthrownPoints, endValue){
    tries=tries;
    overthrownPoints=overthrownPoints;
    endValue=endValue;
    minTries=Math.ceil(endValue/6);
    multiplicator=100/endValue;
    diffTries=tries - minTries;
    
    endPointsValue = 100 - (diffTries*multiplicator) - overthrownPoints;
    endPointsValue=Math.round(endPointsValue)
    if(endPointsValue<0){
        endPointsValue=0
    }
    return endPointsValue;
}
