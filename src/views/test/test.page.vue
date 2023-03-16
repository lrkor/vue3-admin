<template>
    <div class="test">
        测试
        <el-input v-model="input" placeholder="Please input" />
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
const input = ref<string>('');
</script>
