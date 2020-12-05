import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/contacts'
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('../views/Contacts/Contacts.vue')
  },
  {
    path: '/import-contacts',
    name: 'Import Contacts',
    component: () => import('../views/ImportContacts/ImportContacts.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
