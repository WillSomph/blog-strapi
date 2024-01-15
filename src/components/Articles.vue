<template>
  <div id="app">
    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id">
        <h2>{{ article.attributes.Title }}</h2>
        <p>{{ article.attributes.Body[0].children[0].text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      articles: [],
      error: null
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:1337/api/articles');
      this.articles = response.data.data;
    } catch (error) {
      this.error = error;
    }
  }
};
</script>