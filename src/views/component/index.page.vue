<template>
    <div class="index">
        <shuttle-frame-tree-comp v-model="idList" />
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import shuttleFrameTreeComp from './shuttleFrameTree.comp.vue';

const idList = ref<string[]>([]);
</script>

<style scoped lang="scss">
.index {
    padding: 16px;
    overflow-y: scroll;
}
</style>
