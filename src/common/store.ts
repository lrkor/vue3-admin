import {createStore} from 'vuex';
import TabsModel from '@/common/models/tabs.model';

const store = createStore({
    state: {
        tabsOption: [
            {
                route: '/home',
                name: 'Home',
                title: '首页',
                meta: {},
            },
        ],
        cachedViews: ['Home'],
        currentIndex: '/home',
    },
    mutations: {
        addTab(state: any, data: TabsModel) {
            state.tabsOption.push(data);
            if (!data.meta.noCache) {
                state.cachedViews.push(data.name);
            }
        },
        deleteTab(state: any, tabsItem: TabsModel) {
            const index = state.tabsOption.findIndex((tab: TabsModel) => tab.route === tabsItem.route);
            const cachedViewsIndex = state.cachedViews.findIndex((item: string) => item === tabsItem.name);
            state.tabsOption.splice(index, 1);
            state.cachedViews.splice(cachedViewsIndex, 1);
        },
        setTab(state: any, index: string) {
            state.currentIndex = index;
        },
        clearTab(state: any) {
            // 初始化tab
            state.tabsOption = [
                {
                    route: '/home',
                    name: 'home',
                },
            ];
        },
    },
    actions: {},
    getters: {
        getCurrentIndex(state: any) {
            return state.currentIndex;
        },
        getTabsOption(state: any) {
            return state.tabsOption;
        },
        getCachedViews(state: any) {
            return state.cachedViews;
        },
    },
});
export default store;
