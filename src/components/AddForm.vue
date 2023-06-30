<template>
  <div class="add-form__container">
    <form @submit.prevent="add" class="add-form">
      <div class="add-form__input-wrapper">
        <label class="add-form__label">Name</label>
        <input
          type="text"
          class="add-form__input"
          v-model="formData.name"
          @input="handleInputName"
          required
        />
      </div>
      <div class="add-form__input-wrapper">
        <label class="add-form__label">username</label>
        <input
          type="text"
          class="add-form__input"
          v-model="formData.username"
          required
        />
      </div>
      <div class="add-form__input-wrapper--category">
        <label
          v-for="category in formData.categories"
          :key="category.id"
          class="add-form__label--category"
        >
          <input
            type="checkbox"
            class="add-form__input"
            :value="category.name"
            v-model="selectedCategories"
          />
          {{ category.name }}
        </label>
      </div>
      <button type="submit">Submit</button>
      <button @click="exportCollection">Export</button>
    </form>
  </div>
</template>

<script>
import { db } from "@/main.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { saveAs } from "file-saver";

export default {
  name: "add-form",

  data() {
    return {
      formData: {
        name: "",
        username: "",
        categories: [
          { name: "pub" },
          { name: "bar" },
          { name: "hookah" },
          { name: "restaurant" },
          { name: "pizza" },
          { name: "coffee" },
          { name: "fast-food" },
          { name: "bistro" },
          { name: "cafe" },
        ],
        id: 0,
      },
      selectedCategories: [],
    };
  },

  methods: {
    async add() {
      const placesRef = collection(db, "restaurants");
      const querySnapshot = await getDocs(placesRef);
      const id = querySnapshot.size;

      const data = {
        id,
        name: this.formData.name,
        username: `@${this.formData.username}`,
        categories: this.selectedCategories,
      };

      try {
        const docRef = await addDoc(placesRef, data);
        this.formData.name = "";
        this.formData.username = "";
        this.selectedCategories = [];
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    handleInputName() {
      this.formData.name =
        this.formData.name.charAt(0).toUpperCase() +
        this.formData.name.slice(1);
    },

    exportCollection() {
      const placesRef = collection(db, "restaurants");

      getDocs(placesRef)
        .then((snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            data.push(doc.data());
          });

          data.sort((a, b) => a.id - b.id);

          const json = JSON.stringify(data, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          saveAs(blob, "output.json");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
.add-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.add-form__input-wrapper--category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.add-form__label--category {
  display: flex;
  justify-content: space-between;
}
</style>
