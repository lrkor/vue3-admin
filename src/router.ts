import {createRouter, RouterOptions, createWebHistory} from 'vue-router';
import LoginPage from '@/login.page.vue';
import layout from '@/layout/index.vue';
import store from './common/store';

import {RouteModel} from '@/common/models/tabs.model';

const routes: RouteModel[] = [
    {
        path: '/',
        component: layout,
        redirect: '/test',
        meta: {
            icon: 'el-icon-s-home',
            title: '首页',
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home/home.page.vue'),
                meta: {
                    icon: 'el-icon-s-home',
                    title: '首页',
                },
            },
            {
                path: '/test',
                name: 'Test',
                meta: {
                    icon: 'el-icon-data-analysis',
                    title: '测试',
                },
                component: () => import('@/views/test/test.page.vue'),
            },
            {
                path: '/table',
                name: 'Table',
                meta: {
                    icon: 'el-icon-s-grid',
                    title: '表格',
                },
                component: () => import('@/views/table/table.page.vue'),
            },
            {
                path: '/component',
                name: 'Component',
                meta: {
                    icon: 'el-icon-s-grid',
                    title: '组件',
                },
                component: () => import('@/views/component/index.page.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: LoginPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
} as RouterOptions);

router.beforeEach((to: any, from: any, next: any) => {
    const tabsOption = store.state.tabsOption;
    // 判断当前路由中是否已经入栈
    const flag = tabsOption.findIndex((tab: {route: string}) => tab.route === to.path) > -1;

    if (!flag && !to.meta.hiddenTab) {
        store.commit('addTab', {route: to.path, title: to.meta.title, name: to.name, meta: to.meta});
    }
    store.commit('setTab', to.path);
    next();
});

export default router;
