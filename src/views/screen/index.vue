<script  setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Socket from '@/utils/socket.js'
import Top from "@/views/screen/components/top.vue"
import Age from "@/views/screen/components/age.vue"
import Sex from "@/views/screen/components/sex.vue"
import Tourist from "@/views/screen/components/tourist.vue"
import Map from "@/views/screen/components/map.vue"
import Line from "@/views/screen/components/line.vue"
import Year from "@/views/screen/components/year.vue"
import Count from "@/views/screen/components/count.vue"
import Rank from "@/views/screen/components/rank.vue"
import emitter from '@/utils/emitter.js'

let socket
const screen = ref()
function getRatio(w = 1920, h = 1080) {
    const wRatio = window.innerWidth / w
    const hRatio = window.innerHeight / h
    return Math.min(wRatio, hRatio)
}
window.addEventListener('resize', () => {
    screen.value.style.transform =
        `scale(${getRatio()}) translate(-50%,-50%)`
})

let totalData = ref({})
let lineData = ref({})
onMounted(() => {
    //❗开局也要定位一下盒子
    screen.value.style.transform = `scale(${getRatio()}) translate(-50%,-50%)`

    socket = new Socket('ws://localhost:8000')
    socket.connectWebSocket()
    emitter.on('message', (data) => {
        // console.log('收到普通消息', data);
        if (data.type && data.type === 'line') {
            lineData.value = data.totalData.line
            // console.log('折现数据', lineData.value.data);
        }
        else {
            totalData.value = data.totalData
        }
    })
})
onBeforeUnmount(() => {
    socket.unMounted()
})
</script>

<template>
    <div class="container">
        <div ref="screen" class="screen">
            <div class="topContainer">
                <Top />
            </div>
            <div class="main">
                <div class="left">
                    <Tourist class="tourist" :data="totalData.tourist" />
                    <Sex class="sex" :data="totalData.sex" />
                    <Age class="age" :data="totalData.age" />
                </div>
                <div class="center">
                    <Map class="map" />
                    <Line class="line" :data="lineData" />
                </div>
                <div class="right">
                    <Rank class="rank" />
                    <Year class="year" />
                    <Count class="count" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        // background-color: rgba(201, 199, 199, 0.354);
        left: 50%;
        top: 50%;
        transform-origin: left top;
        transition: all 0.5s;

        .topContainer {
            width: 100%;
            height: 40px;
        }

        .main {
            display: flex;

            .left {
                margin-left: 30px;
                flex: 1;
                height: 1040px;
                display: flex;
                flex-direction: column;

                .tourist {
                    // background-color: #fff;
                    flex: 1.5;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    margin-top: 10px;
                    flex: 1;
                    margin-bottom: 10px;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
                color: white;

                .map {
                    flex: 5
                }

                .line {
                    flex: 2
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-flow: column;
                height: 1040px;
                margin-right: 30px;

                .rank {
                    flex: 1.5;

                }

                .year {
                    flex: 1;

                }

                .count {
                    margin-top: 10px;
                    flex: 1;
                    margin-bottom: 10px;
                }

            }
        }
    }
}
</style>