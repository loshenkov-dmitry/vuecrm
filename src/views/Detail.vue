<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb"
          >История</router-link
        >
        <a @click.prevent class="breadcrumb">
          {{ record.type === "income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency("RUB") }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      Записи с id={{ $route.params.id }} не найдена
    </p>
  </div>
</template>


<script>
import Loader from "../components/Loader.vue";
export default {
  components: { Loader },
  name: "detail",

  data() {
    return {
      record: null,
      loading: true,
    };
  },

  metaInfo() {
    return {
      title: this.$title("Menu_Category"),
    };
  },

  async mounted() {
    const id = this.$route.params.id;
    // eslint-disable-next-line no-undef
    const record = await this.$store.dispatch("fetchRecordById", id);
    // eslint-disable-next-line no-unused-vars
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId,
    );

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
