function getInput(){
    /* get input of the end value */
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
    /* minTries are the minimum tries, that the player needs; possibility very rare */
    var diceUFT = 9856
    
    const diceValue=getRandomInt(1,6)
    /* Show dice Value as image of a dice */
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
    /* show current dice Throw */
    const diceText=`<span class="diceSymbol">&#${diceUFT}</span>`
    document.querySelector(".labelDiceThrow").style.textDecoration="none";
    document.querySelector(".overThrown").innerHTML=""
    document.querySelector(".labelDiceThrow").innerHTML=diceText;
    tries = tries+1
    overthrown=false
    /* show current points */
    document.querySelector(".currentPoints").innerHTML=`Aktuelle Punkte: ${points}`
    return diceValue
    
}
function checkOverthrown(diceValue, endValue){
    /* check if the player has overthrown */
    if(diceValue+points>endValue){
        overthrown=true
        overthrownPoints=overthrownPoints+1
        /* 1 point for ever overthrow */
    }
    else if(diceValue+points==endValue){
        points=points+diceValue
        overthrown=false
        finalPoints=endPoints(tries, overthrownPoints, endValue)
        document.querySelector(".gameResultsDice2").innerHTML=`Spielende!<br>Minimale Versuche: ${minTries}<br>Überworfen:<br><span class="otPoints">${overthrownPoints}</span> <br>Versuche: ${tries}<br>Punkte: <br> <span class="finalPoints">${finalPoints}</span>`
        /* show current points */
        document.querySelector(".currentPoints").innerHTML=`Aktuelle Punkte: ${points}`
   
        document.querySelector(".btnStartGL").disabled=false;
        /* Game over */
    }
    else{
        /* neither overthrown nor game over */
        overthrown=false
        points=points+diceValue
    }
    return overthrown
}
function gameLoop(){
    const endValue=getInput()
    if (endValue <1 || !(Number.isInteger(endValue)) ){
        alert("Bitte eine ganze Positive Zahl als Zielwert eingeben!")
    }
    else{
        /* Values for final points */
    tries=0
    points=0
    overthrownPoints=0
    overthrown=false
        /* Update form */
    document.querySelector(".btnStartGL").disabled=true;
    document.querySelector(".labelDiceThrow").innerHTML=""
    document.querySelector(".currentPoints").innerHTML=`Aktuelle Punkte: ${points}`
    document.querySelector(".gameResultsDice2").innerHTML=""
}
    while(points < endValue){
        /* Automatical game loop */
        diceValue=diceThrow();
        overthrown=checkOverthrown(diceValue, endValue)
        /* show overthrown as a lined-throw dice image signing as not accepted */
        if(overthrown){
            document.querySelector(".overThrown").innerHTML="Überworfen!"
            document.querySelector(".labelDiceThrow").style.textDecoration="line-through";
    }
    }
}
function endPoints(tries, overthrownPoints, endValue){
    /* get final points */
    tries=tries;
    overthrownPoints=overthrownPoints; // = o
    endValue=endValue;
    minTries=Math.ceil(endValue/6);
    multiplicator=100/endValue;
    /* final points depending on average endValue of 100 = m */
    diffTries=tries - minTries;
    /* difference of actual tries and minTries = d */
    points=endValue;

    endPointsValue = 100 - (diffTries*multiplicator) - overthrownPoints;
    
    endPointsValue=Math.round(endPointsValue)
    if(endPointsValue<0){
        endPointsValue=0
    }
    /*  Caluclation of final points (fP):
        100 points are maximum
        fP = 100 - d*m - o
        rounded to Integer
        fP cannot be less than 0
    */
    return endPointsValue;
}
