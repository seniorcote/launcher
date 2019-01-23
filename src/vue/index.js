import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import router from './modules/router';
import App from './components/App';
import store from './store';
import en from '../../resources/locales/en';
import ru from '../../resources/locales/ru';
import './styles/style.less';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ipc = require('ipc');

Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ru,
    },
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
});

ipc.send('loadConfig');
ipc.on('loadConfig', (e, payload) => {
    store.dispatch('config/init', payload);
    i18n.locale = payload.locale;
});

