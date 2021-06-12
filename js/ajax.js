//element variables
const taskButtons = document.getElementById("task-buttons");
const taskElement = document.getElementById("task");


//game variables
let questionNr = 3325;
let copy;


//event listeners
serverStartButton.addEventListener("click", startRound);
serverNextButton.addEventListener("click", function () {
    loadNewQuestion(), resetButtons()
});


//functions
//start new round, remove start button
function startRound() {
    console.log("start the game");
    serverStartButton.classList.add("hide");
    serverQuestionsElement.classList.remove("hide");
    loadNewQuestion();
}

//check the rounds played, send the xmlhttp request and display the questions flexible to the number of options
//unlock buttons
function loadNewQuestion() {
    serverNextButton.classList.add("hide");
    if (rounds > 10 || progressWidth == 100) {
        endGame()
    }
    rounds++;
    console.log("load new question");

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            copy = JSON.parse(this.responseText);
            taskElement.innerText = obj.text;
            obj.options = obj.options.sort(function (a, b) {
                return 0.5 - Math.random()
            });
            for (let i = 0; i < obj.options.length; i++) {
                const btn = document.createElement("button");
                btn.classList.add("btn");
                btn.innerText = obj.options[i];
                btn.setAttribute("data-id", i.toString());
                btn.setAttribute("id", "s" + i.toString())
                document.getElementById("task-buttons").appendChild(btn);
                btn.addEventListener("click", function () {
                    checkAnswer(this)
                });
            }
        }
    };
    request.open("GET", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + questionNr, true);
    request.setRequestHeader("Authorization", "Basic " + btoa("s80541@htw-dresden.de:secret"));
    request.send();
    console.log("Request send");
    locked = false;
}

//check if buttons are locked
//check the selected answer via a new xmlhttp request and make the success visible in button color, sound and progress bar
//lock buttons
function checkAnswer(answer) {
    let help = copy.options.indexOf(answer.innerText).toString();
    if (locked) return;

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            console.log(obj);
            if (obj.success == true) {
                console.log("correct answer");
                score++;
                progressWidth += 20;
                progressBar.style.width = progressWidth + "%";
                progressBar.innerHTML = progressWidth + "%";
                answer.style.background = "green";
            } else {
                console.log("wrong answer");
                answer.style.background = "#FF0000";
            }
        }
    };
    request.open("POST", "https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + questionNr++ + "/solve", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa("s80541@htw-dresden.de:secret"));
    request.send("[2," + help + "]");

    serverNextButton.classList.remove("hide");
    locked = true;
}
