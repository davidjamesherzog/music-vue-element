import Vue from 'vue';
import Vuex from 'vuex';
import Audio from './audio-store';
import Music from './music-store';

Vue.use(Vuex);

const store = new Vuex.Store({});

// tslint:disable-next-line:no-unused-expression
new Audio({ store, name: 'audio' });
// tslint:disable-next-line:no-unused-expression
new Music({ store, name: 'music' });

export default store;
