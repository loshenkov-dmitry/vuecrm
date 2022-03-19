<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
          v-model.trim="email"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Поле Email не должно быть пустым</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Введите коректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
          v-model.trim="password"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Пароль должен быть не менее
          {{ $v.password.$params.minLenght.min }} символов. Сейчас он
          {{ password.length }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength),
          }"
          v-model="name"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Введите Имя</small
        >
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
          >Имя должно быть не менее
          {{ $v.name.$params.minLenght.min }} символов. Сейчас оно
          {{ name.length }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",

  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },

  validations: {
    email: { email, required },
    name: { required, minLenght: minLength(3) },
    password: { required, minLenght: minLength(8) },
    agree: { checked: (v) => v },
  },

  metaInfo() {
    return {
      title: this.$title("RegisterPage"),
    };
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      // eslint-disable-next-line no-useless-catch
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>
