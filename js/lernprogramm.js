var questions = new Array();

defineQuestions();

function startGame() {

    document.getElementById("question").innerHTML = questions["teil-allgemein"][0]["a"];
    document.getElementById("1").innerHTML = questions["teil-allgemein"][0]["l"][0];
    document.getElementById("2").innerHTML = questions["teil-allgemein"][0]["l"][1];
    document.getElementById("3").innerHTML = questions["teil-allgemein"][0]["l"][2];
    document.getElementById("4").innerHTML = questions["teil-allgemein"][0]["l"][3];

    /*for(var i = 0; i++; i < 4){
        document.getElementById(i.toString()).innerHTML = questions["teil-allgemein"][0]["l"][i];
    }*/

}

function defineQuestions(){
    questions = {
        "teil-mathe": [
            {"a":"x^2+x^2", "l":["2x^2","x^4","x^8","2x^4"]},
            {"a":"x^2*x^2", "l":["x^4","x^2","2x^2","4x"]}
        ],
        "teil-internettechnologien": [
            {"a":"Welche Authentifizierung bietet HTTP", "l":["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
            {"a":"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l":["UDP","TCP","HTTP","Fast Retransmit"]}
        ],
        "teil-allgemein": [
            {"a":"Karl der Große, Geburtsjahr", "l":["747","828","650","1150"]},
        ]
    }

    for (let i=1; i<9; i++){
        questions.sort(function(a,b){return Math.random()-0.5;});
    }
}


