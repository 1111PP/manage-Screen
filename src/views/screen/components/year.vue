<script lang='ts' setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
const charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            left: '40%',
            textStyle: {
                color: 'white'
            }
        }, tooltip: {
            trigger: 'axis'
        },
        //图例配置
        legend: {
            top: 15,
            data: [{
                name: '北京',
                // icon: 'circle',
                textStyle: {
                    color: 'white'
                },
                lineStyle: {
                    color: 'red'
                },
                itemStyle: {
                    color: 'red'
                }
            },
            {
                name: '上海',
                textStyle: {
                    color: 'white'
                },
                itemStyle: {
                    color: 'yellowgreen'
                }
                ,
                lineStyle: {
                    color: 'yellowgreen'
                }
            },
            {
                name: '杭州',
                textStyle: {
                    color: 'white'
                },
                lineStyle: {
                    color: 'skyblue'
                },
                itemStyle: {
                    color: 'skyblue'
                }
            },
            {
                name: '南京',
                textStyle: {
                    color: 'white'
                },
                lineStyle: {
                    color: 'orange'
                },
                itemStyle: {
                    color: 'orange'
                }
            },
            {
                name: '深圳',
                textStyle: {
                    color: 'white'
                },
                lineStyle: {
                    color: 'hotpink'
                },
                itemStyle: {
                    color: 'hotpink'
                }
            }]
        },
        xAxis: {
            boundaryGap: false,//x轴左右两侧不留间隙
            type: 'category',
            data: ['2020', '2021', '2022', '2023', '2024',]
        },
        yAxis: {
            max: 500,
            min: 0,
            type: 'value',
        },
        series: [
            {
                smooth: true,
                name: '北京',
                type: 'line',
                // stack: 'Total',
                data: [420, 332, 441, 334, 490, 330, 410],
                lineStyle: {
                    color: 'red'
                },
                //折线形成的填充区域的样式
                areaStyle: {
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "red"
                        },
                        {
                            offset: 1,
                            color: "rgba(237, 34, 38, 0)"
                        }
                        ], false),
                    }
                },
            },
            {
                smooth: true,
                name: '上海',
                type: 'line',
                // stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310],
                lineStyle: {
                    color: 'yellowgreen'
                },
                //折线形成的填充区域的样式
                areaStyle: {
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "yellowgreen"
                        },
                        {
                            offset: 1,
                            color: "rgba(237, 195, 0, 0)"
                        }
                        ], false),
                    }
                },
            },
            {
                smooth: true,
                name: '杭州',
                type: 'line',
                // stack: 'Total',
                data: [100, 150, 231, 454, 390, 230, 410],
                lineStyle: {
                    color: 'skyblue'
                },
                //折线形成的填充区域的样式
                areaStyle: {
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "skyblue"
                        },
                        {
                            offset: 1,
                            color: "rgba(0, 72, 125, 0)"
                        }
                        ], false),
                    }
                },
            },
            {
                smooth: true,
                name: '南京',
                type: 'line',
                // stack: 'Total',
                data: [120, 332, 301, 334, 390, 330, 320],
                lineStyle: {
                    color: 'orange'
                },
                //折线形成的填充区域的样式
                areaStyle: {
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "orange"
                        },
                        {
                            offset: 1,
                            color: "rgba(247, 139, 0, 0)"
                        }
                        ], false),
                    }
                },
            },
            {
                smooth: true,
                name: '深圳',
                type: 'line',
                // stack: 'Total',
                data: [220, 132, 401, 334, 290, 130, 420],
                lineStyle: {
                    color: 'hotpink'
                },
                //折线形成的填充区域的样式
                areaStyle: {
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "pink"
                        },
                        {
                            offset: 1,
                            color: "rgba(229, 0, 247, 0)"
                        }
                        ], false),
                    }
                },
            }
        ],
        grid: {
            top: 55,
            left: 50,
            right: 20,
            bottom: 20
        }
    })
})
</script>

<template>
    <div class="sexContain">
        <div class="top">
            <div class="text">年度游客对比</div>
            <img class="img" src="../images/dataScreen-title.png" alt="">
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
        margin-top: 10px;
        margin-left: 5px;
        color: white;
        font-size: 16px;
    }

    .charts {
        margin-top: 10px;
        height: calc(100% - 50px);
    }
}
</style>