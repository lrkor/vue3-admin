<template>
    <div class="pagination-table">
        <div class="pagination-table__table">
            <el-table
                v-if="showTable"
                ref="table"
                v-loading="loading"
                :data="data"
                height="100%"
                v-bind="$props"
                v-on="$attrs"
                @sort-change="sortChange"
                @selection-change="selectionChange"
            >
                <slot></slot>
            </el-table>
        </div>
        <el-pagination
            class="pagination-table__pagination"
            :current-page="page"
            :page-size="pageSize"
            :total="totalCount"
            hide-on-single-page
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
        ></el-pagination>
    </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, onUpdated, PropType, ref} from 'vue';

type LoadData = ({
    page,
    pageSize,
}: {
    page: number;
    pageSize: number;
}) => Promise<{data: any[]; pagination: {page: number; page_size: number; total_count: number}}>;

export default defineComponent({
    name: 'PaginationTableComp',
    inheritAttrs: false,
    props: {
        loadData: {
            type: Function as PropType<LoadData>,
            required: true,
        },
        spanMethod: {
            type: Function,
            default: null,
        },
        autoLoad: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
    },
    emits: ['sort-change', 'selection-change'],
    setup(props, {emit}) {
        const table = ref();
        const loading = ref(false);
        const page = ref(1);
        const pageSize = ref(10);
        const totalCount = ref(0);
        const showTable = ref(true);

        // 处理数据
        const data = ref<any[]>([]);
        const loadData = async (): Promise<void> => {
            loading.value = true;
            showTable.value = false;
            const result = await props.loadData({page: page.value, pageSize: pageSize.value});
            showTable.value = true;
            if (result) {
                data.value = result.data;
                totalCount.value = result.pagination.total_count;
            }
            loading.value = false;
        };
        const reloadData = (goFirstPage = false) => {
            if (goFirstPage) {
                page.value = 1;
            }
            loadData();
        };
        const onPageSizeChange = (value: number) => {
            pageSize.value = value;
            loadData();
        };
        const onPageChange = (value: number) => {
            page.value = value;
            loadData();
        };
        onMounted(() => {
            if (props.autoLoad) {
                loadData();
            }
        });

        const appendTrToTBody = (tableEl: HTMLElement, tableBody: HTMLElement) => {
            const rows: Record<string, any> = {};
            data.value.forEach(item => {
                rows[item.id] ? rows[item.id].push(item) : (rows[item.id] = [item]);
            });

            const arr: any[] = [];
            for (let i = 0; i < data.value.length; ) {
                arr.push(rows[data.value[i].id]);
                i += rows[data.value[i].id].length;
            }

            let k = 0;
            while (tableBody.children.length) {
                const tBody = document.createElement('tbody');
                for (let j = 0; j < arr[k].length; j++) {
                    tBody.appendChild(tableBody.children[0]);
                }
                k++;
                tableEl.appendChild(tBody);
            }
            tableEl.removeChild(tableBody);
        };

        onUpdated(async () => {
            const tableEl = table.value?.$el?.querySelector('.el-table__body-wrapper table');
            if (!tableEl || tableEl.children.length > 2) {
                return;
            }
            const tableBody = tableEl.querySelector('tbody');
            if (!tableBody) {
                return;
            }
            if (tableBody.children.length > 0) {
                appendTrToTBody(tableEl, tableBody);
            } else {
                const mutationObserver = new MutationObserver((mutationsList, observer) => {
                    appendTrToTBody(tableEl, tableBody);
                    observer.disconnect();
                });
                mutationObserver.observe(tableBody, {attributes: false, childList: true, subtree: true});
            }
        });

        const sortChange = (...args: any[]) => {
            emit('sort-change', ...args);
        };

        const selectionChange = (...args: any[]) => {
            emit('selection-change', ...args);
        };

        return {
            table,
            loading,
            data,
            reloadData,
            onPageSizeChange,
            onPageChange,
            page,
            pageSize,
            totalCount,
            sortChange,
            selectionChange,
            showTable,
        };
    },
});
</script>
<style lang="scss" scoped>
.pagination-table {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &__table {
        flex: 1 0 0;
        overflow: hidden;
    }

    &__pagination {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
