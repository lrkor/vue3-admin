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
            <el-menu-item v-for="(item, index) of routerArr" :key="index" :index="item.path">
                <i :class="item.meta?.icon"></i>
                <template #title>{{ item.meta?.title }}</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import store from '@/common/store';
import router from '@/router';

const routerArr = router.options.routes[0].children;
const currentIndex: any = computed(() => store.getters.getCurrentIndex);
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
