//elements variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const progressBar = document.getElementById("myBar");
const scoreElement = document.getElementById("score");
const odssElement = document.getElementById("odds");
const reportElement = document.getElementById("end-text");
const mathsButton = document.getElementById("maths");
const itButton = document.getElementById("it");
const generalButton = document.getElementById("general");
const questionElement = document.getElementById("question");
const answer1 = document.getElementById("1");
const answer2 = document.getElementById("2");
const answer3 = document.getElementById("3");
const answer4 = document.getElementById("4");
const serverButton = document.getElementById("server");
const serverStartButton = document.getElementById("server-start-btn");
const serverNextButton = document.getElementById("server-next-btn");
const serverQuestionsElement = document.getElementById("server-questions");


//game values
let shuffledQuestions;
let currentQuestionIndex = -1;
let score = 0;
let locked = true;
let rounds = 0;
let correctAnswer = null;
let topic = "";
let odds;
let questions = {
    "teil-mathe": [
        {"a": "x^2+x^2", "l": ["2x^2", "x^4", "x^8", "2x^4"]},
        {"a": "x^2*x^2", "l": ["x^4", "x^2", "2x^2", "4x"]},
        {"a": "4+8", "l": ["12", "-10", "1000", "2"]},
        {"a": "x^2*x^3", "l": ["x^6", "x", "9", "x^5"]},
        {"a": "sin/cos", "l": ["tan", "3", "20", "10"]},
        {"a": "x^7*6xy", "l": ["6x^8y", "42xy", "56x^7y", "6x^7y"]},
        {"a": "x^2 - 9x + 20 = 0", "l": ["x1 = 4, x2 = 5", "x1 = 30, x2 = 4", "x1 = 2, x2 = 3", "x1 = 16, x2 = 25"]},
        {"a": "\\frac{1}{4} + \\frac{3}{5}", "l": ["\\frac{17}{20}", "\\frac{15}{16}", "\\frac{4}{9}", "\\frac{6}{8}"]},
        {"a": "Satz\t  des\t  Pythagoras?", "l": ["a^2 + b^2 = c^2", "a + b = c", "0.5 a + 0.5 b = c", "a^2 + b^2 = c"]},
        {"a": "5!", "l": ["120", "60", "-5", "25"]},


    ],
    "teil-internettechnologien": [
        {"a": "Welche Authentifizierung bietet HTTP", "l": ["Digest Access Authentication", "OTP", "OAuth", "2-Faktor-Authentifizierung"]},
        {"a": "Welches Transportprotokoll eignet sich für zeitkritische Übertragungen", "l": ["UDP", "TCP", "HTTP", "Fast Retransmit"]},
        {"a": "In welchem Bereich des Internets sind die Anwendungsprozesse angesiedelt? ", "l": ["Endknoten", "Vermittlungsknoten", "Startknoten", "Backbone"]},
        {"a": "Welche Portnummern werden well-known-Ports genannt?? ", "l": ["< 1024", "< 512", "< 24", "< 8000"]},
        {"a": "Wann wurde die erste E-Mail verschickt? ", "l": ["1971", "1981", "1969", "1974"]},
        {"a": "Was ist das Standardübertragungsprotokoll des World Wide Web?", "l": ["HTTP", "HTTB", "HPPT", "APPT"]},
        {"a": "Was ist kein Bestandteil des HTTP-Requests?", "l": ["Name des Requesters", "Request-Zeile", "Header-Zeilen", "Enderkennung"]},
        {"a": "Was ist kein Request-Typ?", "l": ["SAY", "GET", "POST", "HEAD"]},
        {"a": "Wofür steht 'UDP'?", "l": ["User Datagram Protocol", "Unified Data Protocol", "Universal Digital Packet", "Unified Datasock Port"]},
        {"a": "Was ist kein Javascript Framework?", "l": ["Raspberry", "Dojo", "jQuery", "Prototype"]},
        {"a": "Was ist die Maximale Downloadrate bei einem 5G-Netz?", "l": ["10 Gbit/s", "3 Gbit/s", "5 Gbit/s", "20 Gbit/s"]}

    ],
    "teil-allgemein": [
        {"a": "Wann wurde Karl der Große geboren?", "l": ["747", "828", "650", "1150"]},
        {"a": "Wie wurde Twix früher genannt?", "l": ["Raider", "Unix", "Nockerl", "Schmankerl"]},
        {"a": "Welche Periodenzahl besitzt das Element Sauerstoff?", "l": ["8", "18", "2", "7"]},
        {"a": "Wann begann der 2. Weltkrieg?", "l": ["1939", "1949", "1940", "1938"]},
        {"a": "Wann begann der 1. Weltkrieg?", "l": ["1914", "1919", "1904", "1917"]},
        {"a": "In welcher Stadt spielt Ratatouille?", "l": ["Paris", "Moskau", "Bordaux", "Rom"]},
        {"a": "Wie nennt man einen männlichen Hund?", "l": ["Rüde", "Räudiger", "Rhodendedron", "Ruprecht"]},
        {"a": "Wie hoch ist der Mount Everest?", "l": ["8848 m", "8965 m", "7986 m", "8800 m"]},
        {"a": "Welcher Fluss fließt durch Rom?", "l": ["Tiber", "Donau", "Moldau", "Rhein"]},
        {"a": "Wie oft wurde Deutschland Fußball-Weltmeister?", "l": ["4 mal", "3 mal", "2 mal", "1 mal"]},

    ]
};


//progressbar variables
let progressWidth = 0;


//event listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click",setNextQuestion);
mathsButton.addEventListener("click", function(){setTopic(this.id), resetGame()});
itButton.addEventListener("click", function(){setTopic(this.id), resetGame()});
generalButton.addEventListener("click", function(){setTopic(this.id), resetGame()});
serverButton.addEventListener("click", function(){setTopic(this.id), resetGame()});
answer1.addEventListener("click", function(){selectAnswer(this)});
answer2.addEventListener("click", function(){selectAnswer(this)});
answer3.addEventListener("click", function(){selectAnswer(this)});
answer4.addEventListener("click", function(){selectAnswer(this)});


//functions
//start the  game, shuffle the questions and hide the start button
function startGame() {

    console.log("started");
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    shuffledQuestions = [].concat(questions[topic]).sort(function(a,b){return 0.5 - Math.random()});
    setNextQuestion();
}

//reset all buttons to default, check the rounds played, shuffle the options
function setNextQuestion() {
    resetButtons();
    nextButton.classList.add("hide");
    if (rounds > 10 || progressWidth == 100){endGame()}
    console.log("set next question");
    rounds++;
    currentQuestionIndex++;
    correctAnswer = shuffledQuestions[currentQuestionIndex].l[0];
    shuffledQuestions[currentQuestionIndex]["l"] = [].concat(shuffledQuestions[currentQuestionIndex]["l"]).sort(function(a,b){return 0.5 - Math.random()});
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

//display the question and options, lock answer buttons after decision
//unlock buttons
function showQuestion(question){
    console.log("display the question");
    questionElement.setAttribute('data-id', question.a);
    answer1.setAttribute('data-id', question.l[0]);
    answer2.setAttribute('data-id', question.l[1]);
    answer3.setAttribute('data-id', question.l[2]);
    answer4.setAttribute('data-id', question.l[3]);
    if(topic == "teil-mathe"){
        katex.render(question.a, questionElement, {
            throwOnError: false});
        katex.render(question.l[0], answer1, {
            throwOnError: false});
        katex.render(question.l[1], answer2, {
            throwOnError: false});
        katex.render(question.l[2], answer3, {
            throwOnError: false});
        katex.render(question.l[3], answer4, {
            throwOnError: false});
    }else{
        questionElement.innerText = question.a;
        answer1.innerText = question.l[0];
        answer2.innerText = question.l[1];
        answer3.innerText = question.l[2];
        answer4.innerText = question.l[3];
    }
    locked = false;
}

//check if buttons are locked, check the selected answer and make success visible in button color,
//sound and progress bar
//lock buttons
function selectAnswer(clickedButton) {
    if(locked){return}
    if (clickedButton.getAttribute('data-id') == correctAnswer) {
        console.log("correct answer");
        score++;
        progressWidth += 20;
        progressBar.style.width = progressWidth + "%";
        progressBar.innerHTML = progressWidth + "%";
        clickedButton.style.background = "green";
    } else {
        console.log("wrong answer");
        clickedButton.style.background = "#FF0000";
    }
    locked = true;
    nextButton.classList.remove("hide");
}

//reset all answer buttons to default
function resetButtons(){
    console.log("buttons reset");
    document.getElementById("1").style.background = "lightgrey";
    document.getElementById("2").style.background = "lightgrey";
    document.getElementById("3").style.background = "lightgrey";
    document.getElementById("4").style.background = "lightgrey";

    while(taskButtons.hasChildNodes()){
        taskButtons.removeChild(taskButtons.firstChild);
    }
}

//reset progressbar and control buttons
function resetGame(){
    console.log("reset game");
    progressWidth = 0;
    progressBar.style.width = progressWidth + "%";
    progressBar.innerHTML = progressWidth + "%";
    nextButton.classList.add("hide");
    reportElement.classList.add("hide");
    questionContainerElement.classList.add("hide");

    mathsButton.classList.add("hide");
    itButton.classList.add("hide");
    generalButton.classList.add("hide");
    serverButton.classList.add("hide");
}

//display the statistics of the game
function endGame(){
    console.log("game over");
    questionContainerElement.classList.add("hide");
    serverQuestionsElement.classList.add("hide");
    reportElement.classList.remove("hide");
    odds = ((score / rounds) * 100).toFixed(0);
    scoreElement.innerHTML =  score + " von " + rounds + " Fragen richtig";
    odssElement.innerHTML = "Erfolgsquote von " + odds + " %.";
}

//set the topic for the game and display start button
function setTopic(selectedTopic){
    console.log("set the topic");
    if(selectedTopic == "maths") topic = "teil-mathe";
    if(selectedTopic == "it") topic = "teil-internettechnologien";
    if(selectedTopic == "general") topic = "teil-allgemein";
    if(selectedTopic == "server") {
        topic = "server";
        serverStartButton.classList.remove("hide");
        return;
    }else {
        startButton.classList.remove("hide");
    }
}


