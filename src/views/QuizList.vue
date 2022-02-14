<template>
  <div>
    <div class="container">
      <ul>
        <li v-for="q in quizList" :key="q.id" class="quizlist list-group-item">
          <router-link v-bind:to="`/quiz/${q.id}`"> {{ q.name }} </router-link>
          <router-link class="edit" v-bind:to="`/edit/${q.id}`"> edit </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["quizList", "currentQuiz"]),
  },
};
</script>

<style>
.quizList {
  font-size: 200%;
}
.edit {
  float: right;
}
</style>