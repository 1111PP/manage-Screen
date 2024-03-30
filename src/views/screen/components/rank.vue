<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'
const peopleCount = ref<string>("54188")
const charts = ref()
const getCity = () => {
    const arr: any = []
    const city = ['北京', '上海', '杭州', '南京', '深圳']
    for (let i = 0; i < 5; i++) {
        arr.unshift(
            {
                value: `No.${i + 1}  ${city[i]}`,
                // 突出周一
                textStyle: {
                    fontSize: 20,
                    color: 'white'
                }
            }
        )
    }
    return arr
}
onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            text: '景区排行',
            link: 'http://www.baidu.com',
            left: "70%",
            // top: '10%',
            //主标题样式
            textStyle: {
                color: 'white',
                fontSize: 20
            },
            //子标题
            subtext: "各大景区排行",
            //子标题的样式
            subtextStyle: {
                color: 'yellowgreen',
                fontSize: 16
            }
        },
        xAxis: {
            type: 'value',
            show: false,
            max: 60,
        },
        yAxis: {
            type: 'category',
            offset: 10,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
            },
            // show: false,
            // data: [{
            //     value: '深圳',
            //     // 突出周一
            //     textStyle: {
            //         fontSize: 20,
            //         color: 'white'
            //     }
            // }, {
            //     value: '厦门',
            //     // 突出周一
            //     textStyle: {
            //         fontSize: 20,
            //         color: 'white'
            //     }
            // }, {
            //     value: '南京',
            //     // 突出周一
            //     textStyle: {
            //         fontSize: 20,
            //         color: 'white'
            //     }
            // }, {
            //     value: '上海',
            //     // 突出周一
            //     textStyle: {
            //         fontSize: 20,
            //         color: 'white'
            //     }
            // }, {
            //     value: '北京',
            //     // 突出周一
            //     textStyle: {
            //         fontSize: 20,
            //         color: 'white'
            //     }
            // },],
            data: getCity(),
        },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50],
                label: {
                    show: true,
                    position: 'top',
                    color: 'white',
                    fontSize: 16
                },
                //柱条的样式
                itemStyle: {
                    //设置柱条颜色
                    color: function (data: any) {
                        const color: string[][] = [
                            ['hotpink', 'rgba(229, 0, 247, 0.7)'],
                            ['orange', 'rgba(247, 139, 0,  0.7)'],
                            ['skyblue', 'rgba(0, 72, 125,0.7)'],
                            ['yellowgreen', 'rgba(237, 195, 0, 0.7)'],
                            ['red', 'rgba(237, 34, 38, 0.7)'],
                        ]
                        const result: any = []
                        //给每一个柱条这是背景颜色
                        for (let i = 0; i < 5; i++) {
                            result.push(
                                new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: color[i][0]
                                },
                                {
                                    offset: 1,
                                    color: color[i][1]
                                }
                                ], false)
                            )
                        }
                        return result[data.dataIndex];
                    },
                    borderRadius: 10,
                },
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: 'black' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    borderRadius: 10,
                    borderColor: 'blue',
                    borderWidth: 5,
                    // shadowColor: 'white',
                    shadowBlur: 10
                },
                barWidth: 16,
                //显示柱子背景颜色
                showBackground: true,
            },

        ],
        grid: {
            left: '30%',
            right: 45,
            top: 50,
            bottom: 20,
        }
    });
})


</script>

<template>
    <div class="rankContainer">
        <div class="top">
            <div class="text">热门景区排行</div>
            <img class="img" src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<style scoped lang="scss">
.rankContainer {
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

    .charts {
        margin-top: 10px;
        width: 100%;
        height: calc(100% - 60px);
    }
}
</style>