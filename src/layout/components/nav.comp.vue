<template>
    <div class="nav-comp">nav</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'NavComp',

    setup() {
        return {};
    },
});
</script>

<style scoped lang="scss">
.nav-comp {
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgb(0 21 41 / 28%);
}
</style>
