<template>
  <div class="homePage">
    <div class="container">
      <!--Prompts the user to input a name and disappears once nameSubmitted is true-->
      <div v-if="!isSubmitted">
        <div class="row">
          <div class="col" >
            <h1 class="greeting">Welcome to the quiz zone. Please enter your name below</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              class="form-control nameinput"
              type="text"
              v-model="usernameInput"
              id="nameinput"
            />
            <label for="nameinput">
              <button
                class="btn btn-primary"
                @click="changeName(usernameInput)"
              >
                Enter
              </button>
            </label>
          </div>
        </div>
      </div>
      <!--Displays the users name after it has been added to the store-->
      <div class="row" v-if="isSubmitted">
        <div class="col">
          <h1 class="greeting">Welcome {{ username }}</h1>
        </div>
      </div>

      <div class="row">
        <div class="col quizLink" >
          <router-link v-bind:to="'quizlist'" v-if="isSubmitted">
            <h1>Quizzes</h1>
          </router-link>
          <router-link v-bind:to="'Create'" v-if="isSubmitted" >
            <h1>Create</h1>
          </router-link>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      usernameInput: "",
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    isSubmitted() {
      return this.$store.state.nameSubmitted;
    },
  },
  methods: {
    changeName: function (usernameInput) {
      if (this.usernameInput != "") {
        this.$store.dispatch("changeName", usernameInput);
        console.log(this.$store.state.username);
        console.log(this.usernameInput);
      } else {
        console.log("Nothing entered");
      }
    },
  },
  name: "Home",

  components: {},
};
</script>
<style>
.homepage {
  background-color: beige;
}
.nameinput {
  max-width: 50%;
}
.greeting {
  font-size: 300%;
  text-align: center;
}
* {
font-family: 'Comfortaa', cursive;
}
.quizLink {
 
  text-align: center;
}
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&family=Comfortaa&family=PT+Mono&display=swap');
</style>
