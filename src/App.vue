<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter, RouterView, useRoute } from "vue-router";
// console.log(1);
function a() {
    const a = 1
    return a
}
const b = ref<number>(a())
</script>

<template>
    <!-- 1 -->
    <RouterView> </RouterView>
</template>

<style scoped lang="scss"></style>
