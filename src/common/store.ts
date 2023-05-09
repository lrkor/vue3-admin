import {createStore} from 'vuex';
import {TabsModel} from '@/common/models/tabs.model';

interface StateModel {
    tabsOption: TabsModel[];
    cachedViews: string[];
    currentIndex: string;
}

const store = createStore({
    state: (): StateModel => ({
        tabsOption: [
            {
                route: '/home',
                name: 'Home',
                title: '首页',
                meta: {icon: 'el-icon-s-home', title: '首页'},
            },
        ],
        cachedViews: ['Home'],
        currentIndex: '/home',
    }),
    mutations: {
        addTab(state: any, data: TabsModel) {
            state.tabsOption.push(data);
            if (data.meta?.noCache) {
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
        getCurrentIndex(state: any): string {
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
