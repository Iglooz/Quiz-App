<template>
  <div>
    <div class="container">
      <h1 class="quizName">{{quiz.name}}</h1>
      <h2 v-if="completed && !start" >You scored {{quiz.userScore}} / {{quiz.questions.length}}</h2>
      <button class="btn btn-primary start" @click="startQuiz()" v-if="!start">Start</button>
      <div class="col" v-if="start">
        <div class="row">
          <h2>{{userQuiz.quiz.questions[currentQuestion].question}}</h2>
          <ul>
            <li class="answer list-group-item" v-for="answer in userQuiz.quiz.questions[currentQuestion].answers" :key="answer.id" @click="setAnswer(userQuiz.quiz.questions[currentQuestion], answer.answer)">
              <span >
                {{answer.answer}}
              </span>
            </li>
          </ul>
         <button class="btn btn-primary back" @click="currentQuestion--" v-if="currentQuestion>0">Previous</button>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Quiz",
  data: () => ({
      currentQuestion: 0,
      start: undefined,
      completed: undefined, 
  }),
  computed: {
     quiz(){
       return this.$store.getters.quiz(this.$route.params.id)
     },
     userQuiz(){
       return this.$store.getters.userQuiz
     }
  },
  mounted() {
   
  },
  methods: {
    startQuiz(){
      this.start = true
      this.currentQuestion = 0
      this.$store.commit('START_QUIZ', this.quiz.id)
      console.log(this.start)
    },
    testquest(){
     console.log(this.start)
     console.log(this.currentQuestion)
     console.log(this.quiz)
     console.log('score', this.quiz.userScore)
    },
    setAnswer(question, answer){
      if(this.currentQuestion+1 < this.quiz.questions.length){
        this.currentQuestion++
        question.user_answer = answer
        console.log('question after answer', question)
      } else if(this.currentQuestion+1 == this.quiz.questions.length)
      {
        question.user_answer = answer
        console.log('question after answer', question)
        this.done()
      }
      
    },
    done(){
      this.$store.commit('CALCULATE_SCORE')
      this.completed = true

      this.start = false
    }, 
  },
};
</script>

<style>
.quizName {
font-family: 'PT Mono';

}
* {
  text-align: center;
}
.answer {
    min-height: 50%;
    font-family: 'Poppins', sans-serif;
   

}
.answer:hover {
   background-color: aqua;
}
.back {
  position: absolute;
  max-width: 35%;
  left: 0;
  bottom: 0;
}
.start {
  min-height: 350px;
  min-width: 350px;
  font-size: 300%;
}
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&display=swap');
</style>