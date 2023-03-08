import { createStore } from "@stencil/store";
import { createRouter } from "stencil-router-v2";

const store = {
  database: createStore({
    isInitialized: false,
  }),
  router: createRouter(),
};

export default store;
