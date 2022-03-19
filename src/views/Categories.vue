<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />

        <div v-else class="page-subtitle center">
          <h4>Категория пока нет</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },

  metaInfo() {
    return {
      title: this.$title("Menu_Category"),
    };
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },

  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },

    updateCategories(category) {
      const idx = this.categories.findIndex(
        (c) => c.id === category.id,
      );

      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
