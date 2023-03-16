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

<script lang="ts" setup>
import {computed} from 'vue';
import store from '@/common/store';
import {useRouter} from 'vue-router';
import {TabsModel} from '@/common/models/tabs.model';

const router = useRouter();
const tabsOption = computed(() => store.getters.getTabsOption);
const currentIndex = computed({
    get() {
        return store.getters.getCurrentIndex;
    },
    set(val) {
        store.commit('setTab', val);
        router.replace({path: String(currentIndex.value)});
    },
});

const removeTab = (tabName: string) => {
    if (tabName === '/home') {
        return;
    }
    const item = tabsOption.value.find((tab: TabsModel) => tab.route === tabName);
    store.commit('deleteTab', item);
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
};
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
    margin: 0;
}
</style>
