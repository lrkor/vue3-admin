<template>
    <div class="menu-comp">
        <el-menu
            :router="true"
            :unique-opened="false"
            :default-active="currentIndex"
            active-text-color="#ffd04b"
            class="el-menu-vertical"
            background-color="#545c64"
            text-color="#fff"
        >
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <template #title>首页</template>
            </el-menu-item>
            <el-menu-item index="/test">
                <i class="el-icon-data-analysis"></i>
                <template #title>测试</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import store from '@/common/store';

export default defineComponent({
    name: 'MenuComp',

    setup() {
        const currentIndex = computed(() => store.getters.getCurrentIndex);
        return {
            currentIndex,
        };
    },
});
</script>

<style scoped lang="scss">
.menu-comp {
    height: 100%;
}

.el-menu-vertical {
    height: 100%;
}

.el-menu-item.is-active {
    background-color: #434a50;
}
</style>
