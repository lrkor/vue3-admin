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
                    :filter-node-method="filterNode"
                    :props="defaultProps"
                    check-strictly
                    default-expand-all
                    node-key="id"
                    show-checkbox
                    @check="treeCheck"
                />
            </div>
        </div>
        <div class="middle">
            <div @click="goLeft">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </div>

            <div @click="goRight">
                <el-icon>
                    <ArrowRightBold />
                </el-icon>
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
import {computed, reactive, ref, watch} from 'vue';
import {ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue';
import {ElNotification} from 'element-plus';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Array<string>,
        default() {
            return [];
        },
    },

    treeData: {
        type: Array<any>,
        default() {
            return [];
        },
    },
});

const checkList = ref<string[]>([]);

const pendingIdList = computed({
    get: () => props.modelValue,
    set: value => {
        emit('update:modelValue', value);
    },
});

const customNodeClass = (data: any) => {
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
    if (pendingIdList.value.length === 0 && !value) return true;
    return data.name.indexOf(value) !== -1 && !pendingIdList.value.includes(data.id);
};

let bufferSelectIds = reactive<string[]>([]);
let bufferSelectNodes = reactive<{name: string; id: string}[]>([]);

const pendingNodeList = reactive<{name: string; id: string}[]>([]);

const treeCheck = (node: any, list: any) => {
    bufferSelectIds = list.checkedKeys;
    bufferSelectNodes = list.checkedNodes;
};

const getNodes = () => {
    return pendingNodeList;
};

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
    pendingIdList.value.length = 0;
    pendingNodeList.push(...arr);
    pendingIdList.value.push(...ids);
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
    pendingIdList.value.push(...bufferSelectIds);
    pendingNodeList.push(...bufferSelectNodes);
    bufferSelectIds.length = 0;
    bufferSelectNodes.length = 0;
    treeRef.value!.filter('');
    treeRef.value!.setCheckedNodes([]);
};

defineExpose({
    getNodes,
});
</script>

<style lang="scss" scoped>
.card-header {
    background-color: #eee;
}

.shuttle-frame-tree {
    display: flex;
    height: 100%;

    :deep(.card-header > .el-tree-node__content .el-checkbox) {
        display: none;
    }

    .left {
        background-color: #fff;
        width: 300px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;

        .tree {
            padding: 16px;
            overflow-y: auto;
            height: 0;
            flex: 1 1 auto;

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
        display: flex;
        flex-direction: column;

        .pending {
            padding: 16px;
            overflow-y: auto;
            flex: 1 1 auto;
            height: 0;
        }
    }
}
</style>
