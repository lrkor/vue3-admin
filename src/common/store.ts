import {createStore} from 'vuex';

const store = createStore({
    state: {
        tabsOption: [
            {
                route: '/home',
                name: 'home',
            },
        ],
        currentIndex: '/home',
    },
    mutations: {
        addTab(state: any, data: any) {
            state.tabsOption.push(data);
        },
        deleteTab(state: any, route: string) {
            const index = state.tabsOption.findIndex((tab: {route: string}) => tab.route === route);
            state.tabsOption.splice(index, 1);
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
    },
});
export default store;
