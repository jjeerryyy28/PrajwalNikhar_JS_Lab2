function Question(text,choices,answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
Question.prototype.isCorrectAnswer = function(choice){
        return this.answer === choice;
}

let questions = [
    new Question("what is the capital of france?",["Paris", "London", "Berlin", "Rome"],"Paris"),
    new Question("Who is the CEO of Tesla?",["Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"],"Elon Musk"),
    new Question("Capital of Canada is",["Toronto","Ottawa","Montreal","Vancouver"],"Toronto"),
    new Question("What is the largest planet in our solar system?",["Mars", "Jupiter", "Venus", "Saturn"],"Jupiter"),
    new Question("Canada is the largest exporter of",["Wood","Crude oil","Fresh water","Maple Syrup"],"Maple Syrup")
]

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++
    }
    this.questionIndex++
}

var quiz = new Quiz(questions);

function loadQuestions() {

    if (quiz.isEnded()) {
        showscores();
    } else {

        var elemnt = document.getElementById("question")
        elemnt.innerHTML = quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;
        for (i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];

            handleOptionButton("btn" + i, choices[i])
        }
        showProgress()
    }
}


function showscores(){
    var quizOverHtml = "<h1>Result</h1>";
    quizOverHtml += "<h2 id='score'> Your Scores:" + quiz.score + ". and percentage is " + (quiz.score/quiz.questions.length*100)+"%"+"</h2>";
    var ele = document.getElementById("quiz");
    ele.innerHTML = quizOverHtml;
}


function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function handleOptionButton(id, choice){

    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();

    }
}

loadQuestions();