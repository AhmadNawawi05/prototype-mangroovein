const area = {
    namespaced: true,
    state: {
      listAreas: [
        "Sundarbans, India",
        "Everglades, Amerika Serika",
        "Great Barrier Reef, Australia",
        "Bali, Indonesia",
        "Mangroves of Kenya"
      ],
    },
    getters: {
      getAreaNames: (state) => {
        return state.listAreas;
      },
    },
    mutations: {
      // NONE
    },
    actions: {
      // NONE
    },
  };
  
  export default area;
  