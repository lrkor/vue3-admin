<template>
    <div class="tabs-comp">
        <el-tabs id="Tabs" v-model="currentIndex" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in tabsOption"
                :key="item.route"
                :closable="item.route !== '/home'"
                :label="item.title"
                :name="item.route"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import store from '@/common/store';
import {useRouter} from 'vue-router';
export default defineComponent({
    name: 'TabsComp',

    setup() {
        const tabsOption = computed(() => store.getters.getTabsOption);
        const currentIndex = computed(() => store.getters.getCurrentIndex);

        const router = useRouter();
        const removeTab = (tabName: string) => {
            if (tabName === '/home') {
                return;
            }
            store.commit('deleteTab', tabName);
            if (currentIndex.value === tabName) {
                if (!tabsOption.value) {
                    router.replace({path: '/'});
                } else {
                    store.commit('setTab', tabsOption.value[tabsOption.value.length - 1].route);
                    router.replace({path: currentIndex.value});
                }
            }
        };

        const clickTab = (tabName: {paneName: string}) => {
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
:deep(.el-tabs__header) {
    margin: 0;
}
</style>
