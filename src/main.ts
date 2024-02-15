import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faCaretDown, faCaretUp, faChevronRight, faTriangleExclamation, faPen, faTrash, faCode, faCheck, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue'
import Multiselect from 'vue-multiselect'
import router from './router'

const app = createApp(App)

library.add(faFolder);
library.add(faCaretDown);
library.add(faCaretUp);
library.add(faChevronRight);
library.add(faCompass);
library.add(faTriangleExclamation);
library.add(faPen);
library.add(faTrash);
library.add(faCode);
library.add(faCheck);
library.add(faXmark);
library.add(faPlus);

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('multiselect', Multiselect)

app.use(createPinia())
app.use(router)

app.mount('#app')
