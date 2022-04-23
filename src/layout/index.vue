<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <menu-comp></menu-comp>
            </el-aside>
            <el-main>
                <div class="header">
                    <nav-comp></nav-comp>
                    <tabs-comp></tabs-comp>
                </div>
                <div class="app-main">
                    <router-view v-slot="{Component}">
                        <transition name="fade" mode="out-in">
                            <keep-alive :include="cachedViews">
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
import MenuComp from './components/menu.comp.vue';
import NavComp from './components/nav.comp.vue';
import TabsComp from './components/tabs.comp.vue';
import store from '@/common/store';

export default defineComponent({
    name: 'Layout',
    components: {MenuComp, NavComp, TabsComp},
    setup() {
        const cachedViews: any = computed(() => store.getters.getCachedViews);
        return {
            cachedViews,
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

.app-main {
    flex: 1;
    padding: 20px;

    > div {
        height: 100%;
    }
}
</style>
