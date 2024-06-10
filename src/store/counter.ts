import { defineStore } from "pinia";

interface CunterStore {
  count: number;
}

export const useCounterStore = defineStore("counter", {
  state: (): CunterStore => {
    return { count: 0 };
  },
  getters: {
    doubleCount(state) {
      return state.count ** 2;
    },
  },

  actions: {
    increment() {
      this.count++;
    },
    clear() {
      this.count = 0;
    },
  },
});
