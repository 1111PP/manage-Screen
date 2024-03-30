<script lang='ts' setup>
import { } from 'vue'

</script>

<template>
    <div class="main">
        <div class="text">
            <h1>404 Not Found</h1>
        </div>
        <div style="flex:1">
            <img class="img" src="./微信图片_20240329192804.png" alt="">
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    height: 80vh;
    width: 100vw;
    // margin: 0 auto;
    display: flex;
    flex-flow: column;
    // justify-content: center;
    align-items: center;

    .text {
        flex: 1
    }

    .img {
        height: 500px;
        width: 500px;
    }
}
</style>