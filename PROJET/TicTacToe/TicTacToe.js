var playerswitch=0;
var caseplayedone = [];
var caseplayedtwo = [];
const allcases=["00","01","02","10","11","12","20","21","22"];
const pattern = [["00","01","02"],["10","11","12"],["20","21","22"],["00","10","20"],["01","11","21"],["02","12","22"],["00","11","22"],["02","11","20"]];
//maintenant c'est sur GitHub?: oui
// et là?
//et le commit 3?
function Restart(){
    for(i=0;i<9;i++){
        identity=allcases[i];
        console.log(identity);
        document.getElementById(identity).style.backgroundColor="powderblue";
        document.getElementById(identity).innerHTML="";
        document.getElementById("player").innerHTML="ONE";
        playerswitch=0;
        caseplayedone=[];
        caseplayedtwo=[];
    }
}

function TToc(position){
    if(caseplayedone.indexOf(position)==-1 && caseplayedtwo.indexOf(position)==-1 ){
        if (playerswitch==0){
            document.getElementById(position).style.backgroundColor="darksalmon";
            document.getElementById(position).innerHTML="X";
            document.getElementById("player").innerHTML="TWO";
            playerswitch=1;
            caseplayedone.push(position);

            
        }else{
            document.getElementById(position).style.backgroundColor="rgb(181, 201, 154)";
            document.getElementById(position).innerHTML="O";
            document.getElementById("player").innerHTML="ONE";
            playerswitch=0;
            caseplayedtwo.push(position);
            
        }
        
        WINNER();
        }

    }
function WINNER(){
    for(i=0;i<pattern.length;i++){
        combination=pattern[i];
        var nothereone=0;
        var notheretwo=0;
        for(j=0;j<3;j++){
            if(caseplayedone.indexOf(combination[j])==-1){
                nothereone+=1;
            }
        }
        if(nothereone==0){ 
            restart= confirm("player one won the game, do you want to replay?");
            if(restart==true){
                Restart();
            }
        }
        for(j=0;j<3;j++){
            if(caseplayedtwo.indexOf(combination[j])==-1){
                notheretwo+=1;
            }
        }
        if(notheretwo==0){
            restart= confirm("player two won the game do you want to replay?");
            if(restart==true){
                Restart();
            }
        }
    }

    

}
