<template>
    <div class="index">
        <div style="height: 400px">
            <el-button @click="getNodes">get</el-button>
            <shuttle-frame-tree-comp ref="customTree" v-model="idList" :tree-data="treeData" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import shuttleFrameTreeComp from './shuttleFrameTree.comp.vue';

const idList = ref<string[]>([]);

const getNodes = () => {
    console.log(customTree.value.getNodes());
};

const treeData = [
    {
        id: '323234',
        name: 'Level one 1',
        level: 1,
        children: [
            {
                id: '3232456434',
                name: 'Level two 1-1',
            },
        ],
    },

    {
        id: '323234',
        name: 'Level one 3',
        level: 1,
        children: [
            {
                id: '123',
                name: 'fffff',
                level: 1,
                children: [
                    {
                        id: '33',
                        name: 'sdfs',
                    },
                    {
                        id: '21',
                        name: 'sdf',
                    },
                ],
            },
            {
                id: '3232324223434',
                name: 'Level two 3-2',
            },
        ],
    },
];

const customTree = ref<any>();
</script>

<style lang="scss" scoped>
.index {
    padding: 16px;
    overflow-y: auto;
}
</style>
