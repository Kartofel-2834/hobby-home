import { useStore } from "vuex";

class Alerter {
  constructor() {
    this.store = useStore();
  }

  message(title = "Message", text = "") {
    this.store.commit("alert", {
      title,
      text,
      error: false,
    });
  }

  error(title = "Message", text = "") {
    this.store.commit("alert", {
      title,
      text,
      error: true,
    });
  }
}

export default Alerter
