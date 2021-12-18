<template>
    <div class="home">home</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Home',
    components: {},
    setup() {
        const test = (id: string) => {
            return id;
        };
        return {
            test,
        };
    },
});
</script>
