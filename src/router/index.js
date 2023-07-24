import { createRouter, createWebHistory } from "vue-router";

// Pages
import Club from "@/views/club/index.vue";
import ClubList from "@/views/club/list.vue";
import Profile from "@/views/profile/index.vue";
import Auth from "@/views/auth/index.vue";
import User from "@/views/user/index.vue";
import Work from "@/views/work/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Club,
  },

  {
    path: "/clubs",
    name: "clubs",
    component: ClubList,
  },

  {
    path: "/club/:id",
    name: "club",
    component: Club,
  },

  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },

  {
    path: "/work",
    name: "work",
    component: Work,
  },

  {
    path: "/user",
    name: "me",
    component: Profile,
  },

  {
    path: "/user/:id",
    name: "user",
    component: User,
  },

  {
    path: "/login",
    name: "auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
