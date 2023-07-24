import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      messages: [],
      messagesDropList: [],
    };
  },
  getters: {},
  mutations: {
    alert(state, { title, text, error = false, delay = 2500 }) {
      const now = Date.now();

      state.messages.push({ id: now, title, text, error });
      setTimeout(() => {
        state.messagesDropList = [...state.messagesDropList, now];
      }, delay);
    },

    dropMessage(state, messageId) {
      state.messages = state.messages.filter((m) => m.id !== messageId);
    },
  },
  modules: {},
});
