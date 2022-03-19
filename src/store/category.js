/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit("setError", e);

        throw e;
      }
    },

    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};

        // const cats = [];
        // Object.keys(categories).forEach((key) => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key,
        //   });
        // });
        // return cats;

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);

        throw e;
      }
    },

    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};

        // const cats = [];
        // Object.keys(categories).forEach((key) => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key,
        //   });
        // });
        // return cats;

        return {
          ...category,
          id: id,
        };
      } catch (e) {
        commit("setError", e);

        throw e;
      }
    },

    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (e) {
        commit("setError", e);

        throw e;
      }
    },
  },
};
