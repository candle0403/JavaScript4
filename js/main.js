'use strict';

{
  const ARI_URL = 'https://opentdb.com/api.php?amount=10';
  const choiceAnswer1 = document.createElement('button');
  const choiceAnswer2 = document.createElement('button');
  const choiceAnswer3 = document.createElement('button');
  const choiceAnswer4 = document.createElement('button');
  
  class Quiz {
    constructor(quizData){
      this.quizzes = quizData.results;
    }

    getQuizzesLength() {
      return this.quizzes.length;
    }
  
    getQuizCategory(index) {
      return this.quizzes[index - 1].category;
    }
  
    getQuizDifficulty(index) {
      return this.quizzes[index - 1].difficulty;
    }
  
    getQuizQuestion(index) {
      return this.quizzes[index - 1].question;
    }

    getCorrect_answer(index) {
      return this.quizzes[index - 1].correct_answer;
    }

    getIncorrect_answers(index) {
      return this.quizzes[index - 1].incorrect_answers;
    }
  };

 const btn = document.querySelector('.btn')
 const heading = document.querySelector('h1');
 const genre = document.getElementById('genre');
 const difficulty = document.getElementById('difficulty');
 const mainText = document.getElementById('maintext');
 const answers = document.getElementById('answers');
 let score = 0;

 
 btn.addEventListener('click', ()=> {
   score = 0;
   btn.hidden = true;
  fetchQuizData(1);
 });


 const fetchQuizData = async (index) => {
   heading.textContent = '取得中';
   mainText.textContent = '少々お待ちください';
   
   const response = await fetch(ARI_URL);
   const quizData = await response.json();
   const quizInstance = new Quiz(quizData);
   console.log(quizData);
   
   setNextQuiz(quizInstance, index);
  };
  
  const setNextQuiz = (quizInstance, index ) => {
    makeQuiz(quizInstance, index);
  }
  
  const makeQuiz = (quizInstance, index) => {
    btn.hidden = true;
   heading.innerHTML = `問題${index}`;
   genre.innerHTML = `【ジャンル】${quizInstance.getQuizCategory(index)}`;
   difficulty.innerHTML = `【難易度】${quizInstance.getQuizDifficulty(index)}`;
   mainText.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;
  
   choiceAnswer1.innerHTML = `${quizInstance.getCorrect_answer(index)}`;
   choiceAnswer2.innerHTML = `${quizInstance.getIncorrect_answers(index)}`;
   choiceAnswer3.innerHTML = `${quizInstance.getIncorrect_answers(index)}`;
   choiceAnswer4.innerHTML = `${quizInstance.getIncorrect_answers(index)}`;
   
   answers.appendChild(choiceAnswer1);
   answers.appendChild(choiceAnswer2);
   answers.appendChild(choiceAnswer3);
   answers.appendChild(choiceAnswer4);
   
   answers.addEventListener('click', ()=> {
     while(answers.firstChild) {
       answers.removeChild(answers.firstChild);
      }
      
      if(index === quizInstance.getQuizzesLength() ) {
        heading.innerHTML = `あなたの正解数は${score}です！`;
        mainText.innerHTML = '再チャレンジしたい場合は以下のボタンをクリック';
        
        btn.hidden = false;
        btn.innerHTML = 'ホームに戻る';
      } else {
        index++
        setNextQuiz(quizInstance, index);
      }
    });
    
  }
  
  choiceAnswer1.addEventListener('click', ()=> {
    score++;
    console.log(score);
  });
}