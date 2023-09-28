import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/map",
            name: "map",
            component: () => import("../views/Map.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/Login.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/Register.vue"),
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/Profile.vue"),
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("../views/Admin/BoardAdmin.vue"),
        },
        {
            path: "/mod",
            name: "moderator",
            component: () => import("../views/BoardModerator.vue"),
        },
        {
            path: "/user",
            name: "user",
            component: () => import("../views/BoardUser.vue"),
        },
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router