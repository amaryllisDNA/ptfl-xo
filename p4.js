const startButton = document.getElementById("start-btn")
const startPage = document.getElementById("start-page")
const gamePage = document.getElementById("game-page")
const containerSelDisc = document.getElementById("container-seldisc")
const selDisc = document.getElementById("select-disc")
const holeArray = document.getElementsByClassName("hole");
const winnerDisplayer = document.getElementById("winner");
const winName = document.getElementById("win-name");
const replayButton = document.getElementById("replay-btn")



let position;
let redPlays = true;
let fill="red"
let gameStarted = false;
let count = 0;
let winner;

let columnArray=[];



for(let i=0; i<7;i++){
    let column =[]
    for (let j=i; j<holeArray.length; j+=7){
        let cell = [holeArray[j],"none"];
        

        column.push(cell)
    }
    columnArray.push(column)

}

replayButton.addEventListener("click",(event)=>{
    gamePage.style.opacity = '1';
        gamePage.style.transition = 'opacity 0.5s ease';
        startPage.style.opacity = '0';
        startPage.style.transition = 'opacity 0.5s ease';
        startPage.style.display = 'none';
        winnerDisplayer.style.opacity = 0;
        winnerDisplayer.style.transition = "opacity 0.5s ease";
        gameStarted = true;
        redPlays=true;
        containerSelDisc.style.opacity = 1;
        containerSelDisc.style.border="5px dashed red";
        selDisc.style.backgroundColor="red";
        selDisc.style.boxShadow="0 0 0px 1px #fcfed9, 0 0 10px 2px #f4f6df, inset 0 0 0px 1px #f12512, inset 0 0 10px 2px #dc3131";


        for(let i=0; i<42; i++){
            holeArray[i].style.backgroundColor="#929ae9";
        }
    
        columnArray=[];
        for (let i = 0; i < 7; i++) {
            let column=[];
            for (let j = i; j < holeArray.length; j += 7) {
                let cell = [];
                cell.push(holeArray[j]);
                cell.push("none");
                column.push(cell);
            }
            columnArray.push(column);
}})



startButton.addEventListener("click", () => {
    startPage.style.display="none";
    gamePage.style.opacity=1;

    gameStarted=true;
    controlListeners()

})

function triggerColor(x){
    if(x){
        containerSelDisc.style.border="5px dashed red";
        selDisc.style.backgroundColor="red";
        selDisc.style.boxShadow="0 0 0px 1px #fcfed9, 0 0 10px 2px #f4f6df, inset 0 0 0px 1px #f12512, inset 0 0 10px 2px #dc3131";
        }else{
            containerSelDisc.style.border="5px dashed yellow";
            selDisc.style.backgroundColor="yellow";
            selDisc.style.boxShadow = "0 0 0px 1px #fcfed9, 0 0 10px 2px #f4f6df, inset 0 0 0px 1px #f1f112, inset 0 0 10px 2px #eccc72"
            }
}


function displayWinner(win){

    count = 0;
    gameStarted=false;
    if(win == "red"){
        winName.innerHTML= "rouge";
        winName.style.color = win;

    }else{
        winName.innerHTML="jaune";
        winName.style.color = "#e07b00";
    }

    containerSelDisc.style.opacity=0;
    winnerDisplayer.style.opacity=1;

    

    console.log("winner")
}


function isWinner(col,lin){
    if(count<6){
        console.log("Pas encore de gagnant")
    } else 
    if(columnArray[col][2][1]!=columnArray[position][3][1] || columnArray[col][2][1] =="none"){
        console.log("Personne ne gagne")
    } else if(columnArray[col][0][1]==columnArray[col][1][1] && columnArray[col][2][1]==columnArray[col][3][1] && columnArray[col][1][1]==columnArray[col][2][1]  
        || columnArray[col][1][1]==columnArray[col][2][1] && columnArray[col][3][1]==columnArray[col][4][1] && columnArray[col][2][1]==columnArray[col][3][1] 
        || columnArray[col][2][1]==columnArray[col][3][1] && columnArray[col][4][1]==columnArray[col][5][1] && columnArray[col][3][1]==columnArray[col][4][1]){

        winner = columnArray[col][2][1];
        gameStarted=false;
        console.log(winner + " a gagné")
        displayWinner(winner)
    }


    if(columnArray[2][lin][1]!=columnArray[3][lin][1] && columnArray[4][lin][1]!=columnArray[3][lin][1] ||columnArray[3][lin][1]=="none"){
        console.log("Personne ne gagne")
    }else if(columnArray[0][lin][1]==columnArray[1][lin][1] && columnArray[2][lin][1]==columnArray[3][lin][1] && columnArray[1][lin][1]==columnArray[2][lin][1] ||
        columnArray[1][lin][1]==columnArray[2][lin][1] && columnArray[3][lin][1]==columnArray[4][lin][1] && columnArray[2][lin][1]==columnArray[3][lin][1]||
        columnArray[2][lin][1]==columnArray[3][lin][1] && columnArray[4][lin][1]==columnArray[5][lin][1] && columnArray[3][lin][1]==columnArray[4][lin][1] ||
        columnArray[3][lin][1]==columnArray[4][lin][1] && columnArray[5][lin][1]==columnArray[6][lin][1] && columnArray[4][lin][1]==columnArray[5][lin][1]
     ){
        winner = columnArray[3][lin][1];
        gameStarted=false;
        console.log(winner + " a gagné")
        displayWinner(winner)
     }


    let diagArr = [];
    let j = col;
    let k = lin; 

    while(j>=0 && k>=0){
        diagArr.unshift(columnArray[j][k][1]);
        j--;
        k--;
    }

    j=col+1;
    k=lin+1

    while(j<=6 && k<=5){
        diagArr.push(columnArray[j][k][1]);
        j++;
        k++;
    }

    if(diagArr.length<4){
        console.log("Pas de victoire dans la première diagonale")
    }else{
        for(i=diagArr.length-1; i>=3;i--){
            if(diagArr[i]==diagArr[i-1] && diagArr[i-2]==diagArr[i-3] && diagArr[i-1]==diagArr[i-2] && diagArr[i]!="none"){
                console.log(diagArr[i]+" a gagné !")
                winner = diagArr[i];
                displayWinner(winner)
                break;
            }
        }
    }

    
    diagArr = [];
    j = col;
    k = lin; 

    while(j>=0 && k<=5){
        diagArr.unshift(columnArray[j][k][1]);
        j--;
        k++;
    }

    j=col+1;
    k=lin-1;

    while(j<=6 && k>=0){
        diagArr.push(columnArray[j][k][1]);
        j++;
        k--
    }

    if(diagArr.length<4){
        console.log("Pas de victoire dans la deuxième diagonale")
    }else{
        for(i=diagArr.length-1; i>=3;i--){
            if(diagArr[i]==diagArr[i-1] && diagArr[i-2]==diagArr[i-3] && diagArr[i-1]==diagArr[i-2] && diagArr[i]!="none"){
                winner = diagArr[i];
                console.log(diagArr[i]+" a gagné !");
                displayWinner(winner);
                break;
            }
        }
    }

    console.log(diagArr)


}



function controlListeners (){
window.addEventListener("keydown", (event) => {
    
    if(event.key==="ArrowRight" && gameStarted){
       if (containerSelDisc.style.left!="492px") {
        containerSelDisc.style.left=(parseInt(containerSelDisc.style.left || 246)+82+"px")
       }
    } else if(event.key==="ArrowLeft" && gameStarted){
       if (containerSelDisc.style.left!="0px") {
        containerSelDisc.style.left=(parseInt(containerSelDisc.style.left || 246)-82+"px")
       }
    } else if (event.key==="ArrowDown" && gameStarted){
        if(containerSelDisc.style.left===""){
            containerSelDisc.style.left="246px"
        }
        position = parseInt(containerSelDisc.style.left.slice(0,-2))/82;

        if(redPlays){
            fill="red"
        }else{
            fill="yellow"
        }

        containerSelDisc.classList.add("bounce")
        setTimeout(function(){
            containerSelDisc.classList.remove("bounce");
            triggerColor(redPlays)
        }, 500)

        for(let i=5; i>=0;i--){
            if(columnArray[position][i][1]=="none"){
                columnArray[position][i][1]=fill;
                columnArray[position][i][0].style.backgroundColor=fill;
                redPlays=!redPlays;
                count++;
                isWinner(position, i);

                break;
            }else{
            }
        }

    }

})}