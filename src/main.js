import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import VueKatex from '@hsorby/vue3-katex';
import 'katex/dist/katex.min.css';

const app = createApp(App)
    .use(VueKatex, {
        globalOptions: {
            //... Define globally applied KaTeX options here
        }
    });
app.mount('#app')
