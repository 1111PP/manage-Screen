<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import moment from 'moment'
// const getCurrentTime = () => {
//     timer = setInterval(() => {
//         let now = new Date();
//         let year = now.getFullYear()
//         let month = now.getMonth()
//         let day = now.getDay()

//         let h = now.getHours()
//         let hours = h.toString().length === 1 ? '0' + h : h

//         let m = now.getMinutes()
//         let minutes = m.toString().length === 1 ? '0' + m : m

//         let s = now.getSeconds()
//         let seconds = s.toString().length === 1 ? '0' + s : s

//         // 格式化时间为 hh:mm:ss
//         time.value = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
//     }, 1000)
// }
const time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'));
let timer: any = 0
const router = useRouter()
const toHome = () => {
    router.push('/home')
}
onMounted(() => {
    // getCurrentTime()
    timer = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 1000)
})
onBeforeUnmount(() => {
    clearInterval(timer)
    // console.log('clear');
})
</script>

<template>
    <div class="top">
        <div class="left">
            <span class="leftBtn" @click="toHome">
                <span class="topleftText">
                    首页
                </span>
            </span>
        </div>
        <div class="center">可视化大数据平台</div>
        <div class="right">
            <span class="rightBtn">
                <span class="topRightText">
                    统计报告
                </span>
            </span>
            <div class="topTime">当前时间: {{ time }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.top {
    display: flex;
    height: 100%;
    width: 100%;

    .left {
        flex: 1.2;
        background: url(../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: right;

        .leftBtn {
            background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            height: 40px;
            width: 150px;
            line-height: 36px;

            .topleftText {
                color: #29fcff;
                text-align: center;
                font-size: 18px;
                padding-left: 40px;
            }
        }
    }

    .right {
        flex: 1.2;
        background: url(../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;

        .rightBtn {
            background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
            margin-left: -5px;
            background-size: 100% 100%;
            height: 40px;
            width: 150px;
            line-height: 36px;

            .topRightText {
                color: #29fcff;
                text-align: center;
                font-size: 18px;
                padding-left: 45px;
            }
        }

        .topTime {
            color: #29fcff;
            line-height: 40px;
            margin-right: 30px;
        }
    }

    .center {
        flex: 2;
        height: 74px;
        background: url(../images/dataScreen-header-center-bg.png) no-repeat;
        background-size: 100% 100%;
        color: #29fcff;
        text-align: center;
        line-height: 74px;
        font-size: 30px;
        letter-spacing: 5px;
    }


}
</style>