<template>
  <div class="quizlist">
      <ul>
          <li v-for="q in quizList" :key="q.id">
           <router-link v-bind:to="`/quiz/${q.id}`"> {{q.name}} </router-link> 
           <router-link v-bind:to="`/edit/${q.id}`"> edit </router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    
  computed: {
    ...mapGetters(['quizList', 'currentQuiz'])
  },
  
}
</script>

<style>
.quizList {
  background-color: black;
}
</style>