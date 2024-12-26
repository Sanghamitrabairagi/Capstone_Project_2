const questions = [
    {
        question : "Which language runs in a web browser?",
        answers: [
            { text : "Java",correct : false },
            { text : "C",correct : false },
            { text : "Python",correct : false },
            { text : "javascript",correct : true }
        ]
    },
    {
        question : "What does CSS stand for?",
        answers: [
            { text : "Central Style Sheets",correct : false },
            { text : "Cascading Style Sheets",correct : true },
            { text : "Cascading Simple Sheets",correct : false },
            { text : "Cars SUVs Sailboats",correct : false }
        ]
    },
    {
        question : "What does HTML stand for?",
        answers: [
            { text : "Hypertext Markdown Language",correct : false },
            { text : "Hyperloop Machine Language",correct : false },
            { text : "Hypertext Markup Language",correct : true },
            { text : "Helicopters Terminals Motorboats Lamborginis",correct : false }
        ]
    },
    {
        question : "What year was JavaScript launched?",
        answers: [
            { text : "1996",correct : false },
            { text : "1995",correct : true },
            { text : "1994",correct : false },
            { text : "None of the above",correct : false }
        ]
    },
    {
        question : "Which of the following programming languages is commonly used for server-side scripting in web development?",
        answers: [
            { text : "PHP",correct : true },
            { text : "JavaScript",correct : false },
            { text : "HTML",correct : false },
            { text : "CSS",correct : false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currectQuestionIndex = 0;
let Score = 0;
function startQuiz(){
    currectQuestionIndex = 0;
    Score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    restState();
    let currectQuestion = questions[currectQuestionIndex];
    let questionNo = currectQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currectQuestion.question;
    currectQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , SelectAnswer);
    });
}
function restState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function SelectAnswer(e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectBtn.classList.add("correct");
        Score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    restState();
    questionElement.innerHTML = `You Scored ${Score} Out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currectQuestionIndex++;
    if(currectQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" , () =>{
    if(currectQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();