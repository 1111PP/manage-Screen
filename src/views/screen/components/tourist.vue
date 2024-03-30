<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
const peopleCount = ref<string>("54188")
const charts = ref()

onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            // text: '水球图'
        },
        series: [{
            type: 'liquidFill',//系列
            data: [
                {
                    value: 0.6,
                    itemStyle: {
                        color: "rgb(0,2,219,0.5)"
                    }
                },
                {
                    value: 0.4,
                    itemStyle: {
                        color: "rgb(1,70,219)"
                    }
                },
                {
                    value: 0.3,
                    itemStyle: {
                        color: "rgb(3,122,219,0.5)"
                    }
                }
            ],//展示的数据
            waveAnimation: true,//动画
            animationDuration: 3,
            animationDurationUpdate: 0,
            radius: '80%',//半径
            outline: {//外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',
                    borderColor:
                        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#00FFFF"
                        },
                        {
                            offset: 1,
                            color: "rgba(0, 255, 255, 0)"
                        }
                        ], false)
                    ,
                    //阴影颜色
                    shadowColor: 'rgba(0, 255, 255, 0.5)',
                    shadowBlur: 20,//shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    borderWidth: 3,
                },
            },
            backgroundStyle: {
                borderWidth: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 1,
                    color: "#00FFFF"
                },
                {
                    offset: 0,
                    color: "rgba(0, 255, 255, 0)"
                }
                ], false)
                ,
                //阴影颜色
                shadowColor: "rgba(0, 255, 255, 0)",
                shadowBlur: 20,//shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
        }],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }
    });
})


</script>

<template>
    <div class="tourContain">
        <div class="top">
            <div class="text">实时游客统计</div>
            <img class="img" src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="middle">可容纳人数：<span style="color:yellow">{{ peopleCount }}</span>人</div>
        <div class="number">
            <span class="people" v-for="idx in peopleCount.length" :key="idx">{{ peopleCount[idx - 1] }}</span>
        </div>

        <div class="charts" ref="charts">123</div>
    </div>
</template>

<style scoped lang="scss">
.tourContain {
    margin-top: 10px;
    background: url(../images/dataScreen-main-lt.png) no-repeat;
    background-size: 100% 100%;

    .top {
        margin: 10px 0 0 20px;

        .text {
            width: 100%;
            height: 20px;
            color: white;
            font-size: 20px;
            margin-bottom: 3px;
        }

        .img {
            width: 68px;
            height: 7px;
        }
    }

    .middle {
        width: 95%;
        text-align: right;
        color: white;
        font-size: 20px;
    }

    .number {
        display: flex;
        justify-content: center;
        margin-right: 8px;

        .people {
            // flex: 1;
            height: 80px;
            width: 80px;
            background: url(../images/total.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 20px;
            margin-left: 1px;
            text-align: center;
            color: white;
            line-height: 80px;
            font-size: 40px;
        }
    }

    .charts {
        width: 100%;
        height: 260px;

    }
}
</style>