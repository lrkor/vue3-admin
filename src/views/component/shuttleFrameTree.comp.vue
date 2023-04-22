<template>
    <div class="shuttle-frame-tree">
        <!-- 树形结构穿梭框 -->
        <div class="left">
            <div class="title">待选区</div>

            <div class="tree">
                <el-input v-model="filterText" placeholder="请输入名称" />
                <el-tree
                    ref="treeRef"
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :props="defaultProps"
                    check-strictly
                    :filter-node-method="filterNode"
                    @check="treeCheck"
                />
            </div>
        </div>
        <div class="middle">
            <div @click="goLeft">
                <el-icon><ArrowLeftBold /></el-icon>
            </div>

            <div @click="goRight">
                <el-icon><ArrowRightBold /></el-icon>
            </div>
        </div>
        <div class="right">
            <div class="title">已选区</div>
            <div class="pending">
                <el-checkbox-group v-model="checkList">
                    <div class="flex-colum">
                        <div v-for="(item, index) in pendingNodeList" :key="index" class="flex-align-start">
                            <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
                        </div>
                    </div>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, watch, reactive} from 'vue';
import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue';

const props = defineProps({
    idList: {
        type: Array,
        default: () => [],
    },
});

const customNodeClass = (data: any) => {
    console.log(data);
    if (data.level === 1) {
        return 'card-header';
    }
    return null;
};

const defaultProps: any = {
    children: 'children',
    label: 'name',
    class: customNodeClass,
};

const filterText = ref('');
const treeRef = ref<any>();
watch(filterText, val => {
    treeRef.value!.filter(val);
});

const filterNode = (value: string, data: any) => {
    if (pendingIdList.length === 0 && !value) return true;
    return data.name.indexOf(value) !== -1 && !pendingIdList.includes(data.id);
};

let bufferSelectIds = reactive<string[]>([]);
let bufferSelectNodes = reactive<{name: string; id: string}[]>([]);

const pendingNodeList = reactive<{name: string; id: string}[]>([]);
const pendingIdList = reactive<string[]>([]);

const treeCheck = (node: any, list: any) => {
    bufferSelectIds = list.checkedKeys;
    bufferSelectNodes = list.checkedNodes;
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
                name: 'Level two 3-1',
            },
            {
                id: '3232324223434',
                name: 'Level two 3-2',
            },
        ],
    },
];

const goLeft = () => {
    if (checkList.value.length === 0) {
        return ElNotification({
            title: '提示',
            message: '请选择节点',
            type: 'info',
        });
    }
    const arr = pendingNodeList.filter(item => !checkList.value.includes(item.id));
    const ids = arr.map(item => item.id);
    pendingNodeList.length = 0;
    pendingIdList.length = 0;
    pendingNodeList.push(...arr);
    pendingIdList.push(...ids);
    checkList.value = [];
    treeRef.value!.filter('');
};

const goRight = () => {
    if (bufferSelectIds.length === 0) {
        return ElNotification({
            title: '提示',
            message: '请选择节点',
            type: 'info',
        });
    }
    pendingIdList.push(...bufferSelectIds);
    pendingNodeList.push(...bufferSelectNodes);
    bufferSelectIds.length = 0;
    bufferSelectNodes.length = 0;
    treeRef.value!.filter('');
    treeRef.value!.setCheckedNodes([]);
};

const checkList = ref<string[]>([]);
</script>

<style scoped lang="scss">
.shuttle-frame-tree {
    display: flex;
    height: 100%;

    :deep(.el-tree-node > .el-tree-node__content .el-checkbox) {
        display: none;
    }

    :deep(.el-tree-node__children .el-tree-node > .el-tree-node__content .el-checkbox) {
        display: inherit;
    }

    .left {
        background-color: #fff;
        width: 300px;
        border-radius: 8px;

        .tree {
            padding: 16px;

            :deep(.el-input) {
                margin-bottom: 16px;
            }
        }
    }

    .title {
        font-weight: bold;
        font-size: 16px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        height: 34px;
        padding-left: 16px;
    }

    .middle {
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > div {
            width: 40px;
            height: 40px;
            background-color: #fff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 4px;
        }
    }

    .right {
        background-color: #fff;
        width: 300px;
        border-radius: 8px;

        .pending {
            padding: 16px;
        }
    }
}
</style>
