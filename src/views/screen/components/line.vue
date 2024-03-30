<script lang='ts' setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
const charts = ref()
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: "游客趋势图",
            textAlign: "left",
            textStyle: {
                color: 'white',
            },
            top: 0,
            left: 350,
        },
        grid: {
            containLabel: true,
            left: 30,
            top: 40,
            bottom: 15,
            right: 30
        },
        //鼠标经过图标时的提示信息
        tooltip: {
            show: true,
            trigger: 'axis',
            padding: [0, 0, 0, 0],
            axisPointer: {
                lineStyle: {
                    width: 1,
                    type: 'solid',
                    color: '#00D1FF'
                }
            },
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            shadowColor: 'transparent',
            formatter: (val: any) => {
                return `<div class="" style="width:150px;height:55px; background:url(https://s1.ax1x.com/2023/06/16/pCMGC9A.png) no-repeat;background-size:contain;padding:5px 10px;">
                              <p style="font-size:12px;color:rgba(214, 243, 255, 0.9);display:flex;align-items: center ;margin-top:0px">
                                  <span style="display:inline-block;width: 4px;height: 4px;border-radius:50%;background:#00FFFF;margin-right:5px;"></span> ${val[0].name}
                              </p>
                              <p style="font-size:12px;color:rgba(214, 243, 255, 0.9);display:flex;align-items: center; margin-top:5px">
                                  数量
                                  <span style="font-family: 'DIN'; font-size:16px;margin-left:5px;">${val[0].data}</span> 
                              </p>
                         </div>`
            },
        },

        textStyle: {
            color: 'rgba(221,247,255,0.7)',
        },
        xAxis: [{
            boundaryGap: false,//x轴左右两侧不留间隙
            min: 0,
            max: 10,
            type: 'category',
            data: ['01/15', '01/18', '01/21', '01/24', '01/27', '01/30', '02/02', '02/05', '02/08', '02/011', '02/14'],
            //x轴的轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#96A9B7',
                    type: 'dashed'//虚线
                }
            },
            axisTick: {
                show: true
            },
        }],

        yAxis: [{
            name: '单位(k)',
            nameTextStyle: {
                color: 'white',
            },
            type: 'value',
            min: 0,
            max: 30,
            //轴线的刻度
            axisTick: {
                show: true
            },
            //y轴的轴线
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#96A9B7'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#96A9B7',
                    type: 'dashed'//虚线
                }
            }
        }],
        series: [{
            type: 'line',
            data: [10, 10, 30, 12, 15, 3, 10, 15, 20, 30, 15, 3, 30, 15, , 30, 12, 15, 3, 30, 15],
            smooth: true,//平滑曲线，不然是带折的尖的
            yAxisIndex: 0,
            symbol: 'circle',
            symbolSize: 6,
            showSymbol: true,//显示折线上的标记的图形
            hoverAnimation: true,
            itemStyle: {
                color: "#fff",
                borderColor: "#00FFFF",
                borderWidth: 2,

            },
            //单折线的样式
            lineStyle: {
                normal: {
                    borderWidth: 5,
                    color: {
                        colorStops: [{
                            offset: 0,
                            color: '#00FFFF00'
                        },

                        {
                            offset: 0.5,
                            color: '#00FFFF'
                        },
                        {
                            offset: 1,
                            color: '#00FFFF00'
                        }
                        ],
                    }
                }
            },
            //折线形成的填充区域的样式
            areaStyle: {
                normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "#00FFFF"
                    },
                    {
                        offset: 1,
                        color: "rgba(0, 255, 255, 0)"
                    }
                    ], false),
                    //阴影颜色
                    shadowColor: 'rgba(0, 255, 255, 0.5)',
                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
            },
        }

        ]
    })
})

</script>

<template>
    <div class="box">
        <div class="top">
            <p>未来30天游客趋势图</p>
            <img src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<style scoped lang="scss">
.box {
    width: 90%;
    height: 100%;
    // background-color: red;
    margin: 20px 0 10px 0;
    display: flex;
    flex-flow: column;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        flex: 2;
        width: 100%;
        height: 100%;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 20px;
    }

    .charts {
        flex: 10;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        margin-top: 10px;
    }
}
</style>