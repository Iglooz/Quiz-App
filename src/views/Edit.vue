<template>
  <div>
    <div class="container">
      <h1>{{userQuiz.quiz.name}}</h1>
      <p>Name</p>
      <input class="editCorrectAnswer" type="text" v-model="newQuiz.name">
      <button @click="testquest()">TEST</button>
      
      <div class="col">
        <div class="row">
          <h2>{{userQuiz.quiz.questions[currentQuestion].question}}</h2><span><input class="editCorrectAnswer" type="text" v-model="newQuestion.question"></span>
          
          <ul>
            <li v-for="(answer, i) in userQuiz.quiz.questions[currentQuestion].answers" :key="answer.id">
              
                {{answer.answer}}
                
                <input class="editAnswer" type="text" v-model="newAnswers[i]"  >
              
            </li>

          </ul>
          <h3>Correct Answer: {{quiz.questions[currentQuestion].correct_answer}}</h3><span><input class="editCorrectAnswer" type="text" v-model="newQuestion.correct_answer"></span>
          <button class="btn btn-primary" @click="saveQuestionChanges()">Update Question</button>
          
         <button class="btn btn-primary" @click="currentQuestion++" v-if="currentQuestion+1 < userQuiz.quiz.questions.length">Next</button> <button class="btn btn-primary" @click="currentQuestion--" v-if="currentQuestion>0">Previous</button> 
         
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
      newQuiz: {
        name: undefined,
        questions: [],
      },
      newQuestion: {
        question: "",
        correct_answer: "",
        
        
      },
      newAnswers: [
        
      ]
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
     this.start()
     
    
  },
  methods: {
    start(){
      this.currentQuestion = 0
      this.$store.commit('START_QUIZ', this.quiz.id)
      console.log(this.quiz)
    },
    testquest(){
     console.log('current question:', this.currentQuestion)
     console.log('new question:', this.newQuestion)
     console.log('quiz:', this.quiz)
     console.log('userquiz:', this.userQuiz)

    },
    saveQuestionChanges(){
      this.$store.commit('EDIT_THIS', this.currentQuestion)
      this.$store.commit('EDIT_QUESTION', this.newQuestion, this.currentQuestion)
      if(this.newAnswers.length > 0){
         this.$store.commit('EDIT_ANSWER', this.newAnswers)
      }
      
    },
    changeName: function (usernameInput) {
      this.$store.dispatch("changeName", usernameInput);
        
    },
    updateAnswer(answer){
      this.$store.dispatch('editAnswer', answer, this.currentQuestion)
    }
  },
};
</script>

<style>
.editAnswer {
  background-color: white !important;
  outline: 2px;
  outline-color: black;
}
.editCorrectAnswer {
  max-width: 40%;
  background-color: white !important;
  outline: 2px;
  outline-color: black;
}
</style>