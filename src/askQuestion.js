const { stdin, stdout } = require("process");
const fs = require("fs");
const questionBank = JSON.parse(fs.readFileSync("./questions.json", "utf8"));

//stdin.setRawMode(true);
stdin.setEncoding("utf8");

const isUserAnswerCorrect = (usrAnswer, expectedAnswer, correctAnswers) => {
  usrAnswer.trim() == expectedAnswer && (correctAnswers = correctAnswers + 1);
  return correctAnswers;
};

const printQuestion = (question, options) => {
  stdout.write(`${question}\n${options}\nAns : `);
};

const ExitWhenQuestionsFinished = function(correctAnswers) {
  stdout.write(`score :${correctAnswers}\n`);
  process.exit();
};

process.on("exit", () => stdout.write(`Game Over\n`));

const askQuestions = () => {
  let count = 0;
  let correctAnswers = 0;
  console.clear();
  printQuestion(questionBank[count].question, questionBank[count].options);

  const askCurrQuestion = usrAnswer => {
    clearTimeout(timer);
    console.clear();
    const { answer } = questionBank[count];
    correctAnswers = isUserAnswerCorrect(usrAnswer, answer, correctAnswers);
    count++;
    if (count == questionBank.length) ExitWhenQuestionsFinished(correctAnswers);
    const { question, options } = questionBank[count];
    printQuestion(question, options);
    timer = setTimeout(askCurrQuestion, 5000, "");
  };
  stdin.on("data", askCurrQuestion);
  let timer = setTimeout(askCurrQuestion, 5000, "");
};

module.exports = { askQuestions };
