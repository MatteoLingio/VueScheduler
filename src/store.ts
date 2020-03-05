import Vue from 'vue';
import Vuex from 'vuex';
import Event from './Models/Event';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    daySelected: new Date(),
    events: [],
  },
  mutations: {
    setDaySelected: (state, newDate) => {
      state.daySelected = newDate;
    },
    setEvents: (state, evs) => {
      state.events = evs.map((ev: any) => {
        return new Event(ev.id, ev.start, ev.end, ev.title, ev.color, ev.customProps);
      });
    },
  },
});
