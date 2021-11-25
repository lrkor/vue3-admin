<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <el-menu
                    :router="true"
                    :unique-opened="false"
                    :default-active="currentIndex"
                    active-text-color="#ffd04b"
                    class="el-menu-vertical"
                    :collapse="isCollapse"
                    background-color="#545c64"
                    text-color="#fff"
                >
                    <el-menu-item index="/home">首页</el-menu-item>
                    <el-menu-item index="/test">测试</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="header">
                    <div class="header-nav">nav</div>
                    <div class="header-tabs">
                        <el-tabs
                            id="Tabs"
                            v-model="currentIndex"
                            type="card"
                            closable
                            @tab-click="clickTab"
                            @tab-remove="removeTab"
                        >
                            <el-tab-pane
                                v-for="item in tabsOption"
                                :key="item.route"
                                :closable="item.route !== '/home'"
                                :label="item.name"
                                :name="item.route"
                            >
                                {{ item.title }}
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="app-main">
                    <router-view v-if="$route.meta.keepAlive" v-slot="{Component}">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" :key="$route.path" />
                        </transition>
                    </router-view>

                    <router-view v-if="!$route.meta.keepAlive" v-slot="{Component}">
                        <transition name="fade" mode="out-in">
                            <keep-alive>
                                <component :is="Component" :key="$route.path" />
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import store from '@/common/store';
import {useRouter} from 'vue-router';
export default defineComponent({
    name: 'Layout',
    components: {},
    setup() {
        const tabsOption = computed(() => store.getters['getTabsOption']);
        const currentIndex = computed(() => store.getters['getCurrentIndex']);

        const router = useRouter();
        const removeTab = (tabName: string) => {
            if (tabName === '/home') {
                return;
            }
            store.commit('deleteTab', tabName);
            if (currentIndex.value === tabName) {
                if (tabsOption.value && tabsOption.value.length) {
                    store.commit('setTab', tabsOption.value[tabsOption.value.length - 1].route);
                    router.replace({path: currentIndex.value});
                } else {
                    router.replace({path: '/'});
                }
            }
        };

        const clickTab = (tabName: {paneName: string}) => {
            // eslint-disable-next-line no-console
            store.commit('setTab', tabName.paneName);
            router.replace({path: currentIndex.value});
        };

        return {
            tabsOption,
            currentIndex,
            removeTab,
            clickTab,
        };
    },
});
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}
.el-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.el-aside {
    width: 200px;
}
.el-main {
    flex: 1;
    display: flex;
    padding: 0;
    flex-direction: column;
}
.el-scrollbar {
    height: 100%;
}
.el-menu-vertical {
    height: 100%;
}
.app-main {
    flex: 1;
    > div {
        height: 100%;
    }
}
.header {
    &-nav {
        height: 50px;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 4px rgb(0 21 41 / 28%);
    }
}
</style>
