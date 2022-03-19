<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="toggleSidebar" />
      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="isOpen ? '' : 'full'">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div
        class="fixed-action-btn"
        v-tooltip="'Создать новую запись'"
      >
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default {
  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },

  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },

  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },

  components: {
    Navbar,
    Sidebar,
  },

  computed: {
    error() {
      return this.$store.getters.error;
    },

    locale() {
      return this.$store.getters.info.locale;
    },
  },

  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },
};
</script>
