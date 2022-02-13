import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
let PREMADE_QUIZZES = [
   {
     id: 0, name: 'test', userScore: 0, questions: [
       {id: 0, question: 'What is 1+2', correct_answer: '3',  answers: [{id: 0, answer: '2'}, {id: 1, answer: '3'}, {id:2, answer : '4'}, {id:3,  answer: '5'}]},
       {id: 1, question: 'What is 5+8', correct_answer: '13',  answers: [{id:0, answer: '10'}, {id: 1, answer: '12'}, {id: 2, answer: '15'}, {id: 3, answer: '13'}]},
       {id: 2, question: 'What is 17-2', correct_answer: '15', answers: [{id:0, answer: '15'}, {id: 1, answer: '13'}, {id: 2, answer: '20'}, {id: 3, answer: 'Buckingham Palace'}]},
       
     ]
   },
   {
     id: 1, name: 'test2', userScore: 0, questions: [
       {id: 0, question: 'What is 5*50', correct_answer: '250', answers: [{id: 0, answer: '500'}, {id: 1, answer: '250'}, {id: 2, answer: '300'}, {id: 3, answer: '5000'}]},
       {id: 1, question: 'What is 2*53', correct_answer: '106',  answers: [{id: 0, answer: '103'}, {id: 1, answer: '105'}, {id: 2, answer: '106'}, {id: 3, answer: '253'}]},
       {id: 2, question: 'What is 109*5', correct_answer: '545',  answers: [{id: 0, answer: '509'}, {id: 1, answer: '530'}, {id: 2, answer: '550'}, {id: 3, answer: '545'}]},
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
        console.log(state.quizList)
      },
      EDIT_QUESTION(state, payload){
        state.userQuiz.quiz.questions[state.editThis].question = payload.question
        state.userQuiz.quiz.questions[state.editThis].correct_answer = payload.correct_answer
        console.log('QUESTION', payload)
        console.log('WHY IS THE NGUIETGES', state.userQuiz.quiz.questions[0])
        
        console.log(state.userQuiz)
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