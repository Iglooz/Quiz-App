<template>
  <div class="container create">
    <div class="row">
      <div class="col">
        <h1>Create new</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input type="text" v-model="quizName" placeholder="Quiz Name" />
        <input type="text" v-model="question" placeholder="Question" />
        <input
          type="text"
          v-model="correct_answer"
          placeholder="Correct Answer"
        />
        <br />
        <input type="text" v-model="answer" placeholder="Answer" />
        <button @click="addAnswer" class="btn btn-primary">Add Answer</button>
      </div>
      <div>
        <h2>Question: {{ this.question }}</h2>
        <h2>Answers:</h2>
        <ul>
          <li v-for="(answer, index) in answers" :key="answer.id">
            {{ answer.answer }}
            <button @click="removeAnswer(index)" class="btn btn-secondary">
              Delete
            </button>
          </li>
        </ul>
      </div>
      <div>
        <button @click="addQuestion">Add Question</button>
      </div>
      <div class="col">
        <h1>{{ quiz.name }}</h1>
        <ul>
          <li v-for="question in quiz.questions" :key="question.id">
              <ul>
                  <li v-for="answer in answers" :key="answer.id">
                      {{answer.answer}}
                  </li>
              </ul>
            {{ question.answers }}
            <h1>test</h1>
          </li>
        </ul>
        <button @click="done" class="btn btn-primary">Done</button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data: () => ({
    quizName: undefined,
    question: undefined,
    correct_answer: undefined,
    answer: "",
    answers: [],
    quiz: {
      name: undefined,
      questions: [],
    },
  }),
  methods: {
    addAnswer() {
      if (!this.answer.trim().length) {
        console.log("invalid input");
      } else {
        this.answers.push({ id: Math.random(), answer: this.answer });
        this.answer = undefined;
      }
    },
    removeAnswer(index) {
      this.answers.splice(index, 1);
      console.log(index);
    },
    addQuestion() {
      let newQuestion = {
        id: Math.random(),
        question: this.question,
        correct_answer: this.correct_answer,
        answers: this.answers,
      };
      this.quiz.questions.push(newQuestion);
      this.quiz.name = this.quizName
      console.log(this.quiz);
      this.correct_answer = undefined;
      this.question = undefined;
      this.answers = [];
    },
    done() {
      this.$store.commit("ADD_QUIZ", this.quiz);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>