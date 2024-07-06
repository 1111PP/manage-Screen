<script lang='ts' setup>
import * as echarts from 'echarts';
import { ref, onMounted, watch, } from 'vue'
const props = defineProps(['data'])
const manRate = ref<number>(0.5)
const womanRate = ref<number>(0.5)
const charts = ref()
let mycharts: any
watch(() => props.data, () => {
    manRate.value = Number(props.data.man)
    womanRate.value = Number(props.data.women)

    mycharts.setOption({
        series: [
            {
                type: 'bar',//柱状图
                data: [manRate.value * 100],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: "skyblue"
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 119, 247,0.8)'
                    }
                    ], false),
                    borderRadius: 20,
                }
            },
            {
                type: 'bar',//柱状图
                data: [100],
                barWidth: 20,
                barGap: "-100%",//🈯向下偏移，重叠一起
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: "rgba(247, 0, 236, 0.7)"
                    },
                    {
                        offset: 1,
                        color: 'hotpink '
                    }
                    ], false),
                    borderRadius: 20,
                }
            }
        ]
    })
})
onMounted(() => {
    mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '男女比例',
            textStyle: {
                color: 'white',
            },
            left: '40%',
        },
        xAxis: {
            min: 0,
            max: 100,
            show: false,
        },
        yAxis: {
            show: false,
            type: 'category',//柱状图的所有值在整个坐标系的y轴居中分布
        },
        series: [
            {
                type: 'bar',//柱状图
                data: [50],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: "skyblue"
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 119, 247,0.8)'
                    }
                    ], false),
                    borderRadius: 20,
                }
            },
            {
                type: 'bar',//柱状图
                data: [100],
                barWidth: 20,
                barGap: "-100%",//🈯向下偏移，重叠一起
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: "rgba(247, 0, 236, 0.7)"
                    },
                    {
                        offset: 1,
                        color: 'hotpink '
                    }
                    ], false),
                    borderRadius: 20,
                }
            }
        ],
        //图标位于整个mycharts容器的位置
        grid: {
            left: 50,
            right: 50,
            top: 0,
            bottom: 0,
        }
    })
})
</script>

<template>
    <div class="sexContain">
        <div class="top">
            <div class="text">男女比例</div>
            <img class="img" src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <div class="text">男士</div>
                <div class="avatar"></div>
            </div>
            <div class="women">
                <div class="text">女士</div>
                <div class="avatar"></div>
            </div>
        </div>

        <div class="rate">
            <p>男士{{ (manRate * 100).toFixed(0) }}%</p>
            <p>女士{{ (womanRate * 100).toFixed(0) }}%</p>
        </div>
        <div class="charts" ref='charts'></div>
    </div>
</template>

<style scoped lang="scss">
.sexContain {
    margin-top: 10px;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        // padding-top: 5px;
        margin-left: 20px;
        color: white;
        font-size: 20px;
    }

    .sex {
        display: flex;
        justify-content: center;
        // position: absolute;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../images/man-bg.png) no-repeat;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;

            .text {
                color: white;
                height: 10px
            }

            .avatar {
                margin-top: 20px;
                margin-left: 20px;
                background: no-repeat url(../images/man.png);
                height: 80px;
                width: 80px;
            }
        }

        .women {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../images/woman-bg.png) no-repeat;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;

            .text {
                color: white;
                height: 10px
            }

            .avatar {
                margin-top: 20px;
                margin-left: 20px;
                background: no-repeat url(../images/woman.png);
                height: 80px;
                width: 80px;
            }
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        margin: -10px 50px 0 50px;
        color: white;

    }

    .charts {
        height: 80px;
    }
}
</style>