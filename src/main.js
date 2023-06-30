import { createApp } from "vue";
import App from "./App.vue";

import firebaseConfig from "@/firebase.config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

createApp(App).mount("#app");

export const db = getFirestore(app);
