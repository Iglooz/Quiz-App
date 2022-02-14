import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
let PREMADE_QUIZZES = [
   {
     id: 0, name: 'Math 1', userScore: 0, questions: [
       {id: 0, question: 'What is 1+2', correct_answer: '3',  answers: [{id: 0, answer: '2'}, {id: 1, answer: '3'}, {id:2, answer : '4'}, {id:3,  answer: '5'}]},
       {id: 1, question: 'What is 5+8', correct_answer: '13',  answers: [{id:0, answer: '10'}, {id: 1, answer: '12'}, {id: 2, answer: '15'}, {id: 3, answer: '13'}]},
       {id: 2, question: 'What is 17-2', correct_answer: '15', answers: [{id:0, answer: '15'}, {id: 1, answer: '13'}, {id: 2, answer: '20'}, {id: 3, answer: '14'}]},
       {id: 2, question: 'What is 52+39', correct_answer: '91', answers: [{id:0, answer: '91'}, {id: 1, answer: '89'}, {id: 2, answer: '93'}, {id: 3, answer: '88'}]},
       {id: 2, question: 'What is 34+78', correct_answer: '112', answers: [{id:0, answer: '110'}, {id: 1, answer: '102'}, {id: 2, answer: '105'}, {id: 3, answer: '112'}]},

       
     ]
   },
   {
     id: 1, name: 'Math 2', userScore: 0, questions: [
       {id: 0, question: 'What is 5*50', correct_answer: '250', answers: [{id: 0, answer: '500'}, {id: 1, answer: '250'}, {id: 2, answer: '300'}, {id: 3, answer: '5000'}]},
       {id: 1, question: 'What is 2*53', correct_answer: '106',  answers: [{id: 0, answer: '103'}, {id: 1, answer: '105'}, {id: 2, answer: '106'}, {id: 3, answer: '253'}]},
       {id: 2, question: 'What is 109*5', correct_answer: '545',  answers: [{id: 0, answer: '509'}, {id: 1, answer: '530'}, {id: 2, answer: '550'}, {id: 3, answer: '545'}]},
       {id: 2, question: 'What is 22*3', correct_answer: '66',  answers: [{id: 0, answer: '66'}, {id: 1, answer: '64'}, {id: 2, answer: '68'}, {id: 3, answer: '44'}]},
     ]
   },
   {
     id: 2, name : 'History 1', userScore: 0, questions: [
       {id: 0, question: 'Who was the first Khan of the mongol empire', correct_answer: 'Genghis Khan', answers: [{id: 0, answer: 'Kublai Khan'}, {id: 1, answer: 'Attila the Hun'}, {id: 2, answer: 'Genghis Khan'}, {id:3, answer: 'Batu Khan'}]},
       {id: 1, question: 'Who coined the term "Cold War', correct_answer: 'George Orwell', answers: [{id: 0, answer: 'Harry S. Truman'}, {id: 1, answer: 'Winston Churchill'}, {id: 2, answer: 'Dean Acheson'}, {id:3, answer: 'George Orwell'}]},
       {id: 1, question: 'Which of these locations was never under Ottoman rule', correct_answer: 'Vienna', answers: [{id: 0, answer: 'Kosovo'}, {id: 1, answer: 'Egypt'}, {id: 2, answer: 'Vienna'}, {id:3, answer: 'Macedonia'}]},
       {id: 1, question: 'What year did the French revolution take place', correct_answer: '1789', answers: [{id: 0, answer: '1791'}, {id: 1, answer: '1821'}, {id: 2, answer: '1782'}, {id:3, answer: '1789'}]},
     ]
   }
]
export default new Vuex.Store({
    state: {
      username: '',
      nameSubmitted: false,
      quizList: PREMADE_QUIZZES,
      userQuiz: {
        quiz: undefined
      },
      editThis: undefined,
      

    },
    getters: {
     username: state => state.username,
     quiz: state => id => state.quizList.find(q=> q.id == id),
     quizList: state => state.quizList,
     currentQuestion: state => state.currentQuestion,
     userQuiz: state => state.userQuiz,
     userScore: state => state.userScore,
      
    },
    mutations: {
      CHANGE_NAME(state, payload) {
        state.nameSubmitted = true
        state.username = payload
      },
      START_QUIZ(state, payload){
         state.userQuiz.quiz = state.quizList.find(q => q.id == payload)
         state.userQuiz.quiz.userScore = 0
         console.log('userQuiz', state.userQuiz, state.userQuiz.quiz.userScore)
      },
      CALCULATE_SCORE(state){
        for(const answer of state.userQuiz.quiz.questions){
          if(answer.user_answer == answer.correct_answer){
            state.userQuiz.quiz.userScore++
            console.log('correct', state.userQuiz.quiz.userScore)
            console.log(state.userQuiz)
          }else {
            console.log('incorrect')
          }
         
         }
      },
      ADD_QUIZ(state, payload){
        payload.id = Math.random()
        state.quizList.push(payload)
      },
      EDIT_QUESTION(state, payload){
        state.userQuiz.quiz.questions[state.editThis].question = payload.question
        state.userQuiz.quiz.questions[state.editThis].correct_answer = payload.correct_answer
        
      },
      EDIT_ANSWER(state, payload){
        const newAnswers = payload.map(function (value, index){
          return {
            answer: value,
            id: index
          }
        })     
        state.userQuiz.quiz.questions[state.editThis].answers = newAnswers                                            
        console.log('ANSWERS', payload)
        console.log(state.userQuiz)
      },
      EDIT_THIS(state, payload){
        state.editThis = payload
      }

    },
    actions: {
     changeName: (state, payload) =>{
       state.commit('CHANGE_NAME', payload)
     },
     editQuestion: (state, payload, id) => {
       state.commit('EDIT_QUESTION', payload, id)
     },
     editAnswer: (state, payload) => {
       state.commit('EDIT_ANSWER', payload)
       console.log('payload', payload)
     }
     
    },
    
    
})