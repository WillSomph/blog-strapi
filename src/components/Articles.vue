<template>
  <div id="app">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <button v-for="category in categories" :key="category.id" @click="filterByCategory(category.id)" class="btn btn-primary me-2 mb-2 rounded-pill">
          {{ category.attributes.Name }}
        </button>
      <ul>
        <li v-for="article in filteredArticles" :key="article.id">
          <h2 >{{ article.attributes.Title }}</h2>
          <p v-if="article.attributes.categories.data.length > 0">
            <strong>Catégorie :</strong> {{ article.attributes.categories.data[0].attributes.Name }}
          </p>
          <p> <strong>Description :</strong> {{ article.attributes.Body[0].children[0].text }}</p>
          <p>{{ article.attributes.PublishedAt }}</p>
          <p><strong>Date :</strong> {{ formatPublishedDate(article.attributes.updatedAt) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      articles: [],
      categories: [],
      selectedCategoryId: null,
      error: null
    };
  },
  async mounted() {
    try {
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:1337/api/articles?populate=*'),
        axios.get('http://localhost:1337/api/categories')
      ]);

      this.articles = articlesResponse.data.data;
      this.categories = categoriesResponse.data.data;
    } catch (error) {
      this.error = error;
    }
  },
  computed: {
    filteredArticles() {
      if (!this.selectedCategoryId) {
        return this.articles;
      }

      return this.articles.filter(article => {
        const categoryId = article.attributes.categories.data[0]?.id;
        return categoryId === this.selectedCategoryId;
      });
    }
  },
  methods: {
    formatPublishedDate(dateString) {
      const dateObject = new Date(dateString);
      
      if (isNaN(dateObject.getTime())) {
        return 'Date non valide';
      }

      const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      }).format(dateObject);

      return formattedDate;
    },
    filterByCategory(categoryId) {
      this.selectedCategoryId = categoryId;
    }
  },
};
</script>
