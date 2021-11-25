<template>
    <div class="test">
        测试
        <el-input v-model="input" placeholder="Please input" />
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
    name: 'Test',
    components: {},
    setup() {
        const input = ref<string>('');
        return {
            input,
        };
    },
});
</script>

<style scoped lang="scss"></style>
