import Home from "@/pages/Home.vue";

export default [
    {
        path: '/',
        component: Home,
        name: "home"
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    }
]