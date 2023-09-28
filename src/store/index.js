import { createStore } from "vuex";
import area from "./modules/area";
import auth from "./modules/auth"

const store = createStore({
  state: {
    isLoading: false,
  },
  modules: {
    area,
    auth,
  },
});

export default store;
