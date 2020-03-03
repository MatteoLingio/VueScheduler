import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    daySelected: new Date(),
  },
  mutations: {
    setDaySelected: (state, newDate) => {
      state.daySelected = newDate;
    },
  },
});
