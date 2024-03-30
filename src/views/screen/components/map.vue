<script lang='ts' setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
import chinaJSON from './china.json'
// console.log(result);
const result: any = []
const getRandomSite = () => {
    for (let i = 0; i < 10; i++) {
        //纬度25-40，经度100-120 🟥正方形
        let startX = Math.random() * 15 + 25
        let startY = Math.random() * 15 + 25
        startX = Number(startX.toFixed(6))
        startY = Number(startY.toFixed(6))
        let endX = Math.random() * 20 + 100
        let endY = Math.random() * 20 + 100
        endX = Number(endX.toFixed(6))
        endY = Number(endY.toFixed(6))
        //所有航线的数据集合
        result.push({
            coords: [
                [endX, startX], // 起点
                [endY, startY], // 终点
            ],
            // 航线样式
            lineStyle: {
                color: 'white',
                width: 1,
            },
        })
    }
    for (let i = 0; i < 10; i++) {
        //纬度30-40，经度40-120 🟥长方形
        let startX = Math.random() * 10 + 30
        let startY = Math.random() * 10 + 30
        startX = Number(startX.toFixed(6))
        startY = Number(startY.toFixed(6))
        let endX = Math.random() * 40 + 80
        let endY = Math.random() * 40 + 80
        endX = Number(endX.toFixed(6))
        endY = Number(endY.toFixed(6))
        //所有航线的数据集合
        result.push({
            coords: [
                [endX, startX], // 起点
                [endY, startY], // 终点
            ],
            // 航线样式
            lineStyle: {
                color: 'white',
                width: 1,
            },
        })
    }

}
const charts = ref()

onMounted(() => {
    getRandomSite()
    // console.log(result.forEach((item: any) => console.log(item.coords)
    // ));
    echarts.registerMap('china', chinaJSON as any)
    const mycharts = echarts.init(charts.value)
    mycharts.setOption({
        //地图图表特有的配置,静止时显示
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.4,
            top: 230,
            //地图上文字设置
            label: {
                show: true,
                color: "white",
                fontSize: "15",
            },
            itemStyle: {
                //地图区域颜色配置
                color: {
                    type: 'linear',
                    x: 1,
                    y: 0,
                    x2: 0.5,
                    y2: 0.8,
                    colorStops: [{
                        offset: 0, color: '#0056B3' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#03214A' // 100% 处的颜色
                    }],
                    global: false, // 缺省为 false

                },
                shadowBlur: 10,
                shadowColor: 'blue',
                borderColor: 'skyblue',
            },
            //地图图表鼠标经过时的高亮显示设置
            emphasis: {
                label: {
                    color: "white",
                    fontSize: "15",
                },
                //地图部分区域高亮部分的样式设置
                itemStyle: {
                    color: "white",
                    areaColor: '#0042b4',
                    borderColor: 'black',
                    borderWidth: '1',
                    borderType: 'solid'
                }
            },

        },
        //地图区域的多边形 图形样式
        itemStyle: {
            //区域颜色，此处用geo.itmeStyle.color设置了，👆方设置了渐变颜色
            // areaColor: "#0349f1",
            opacity: 0.8,
        },

        //航线图表所有配置
        series: [
            {
                type: 'lines',//航线的系列
                //航线信息包含：起点 --> 终点、航线宽度、航线颜色
                data: result,
                //航线开启动画特效配置effect
                effect: {
                    show: true,
                    //特效图形的标记:arrow箭头特效
                    //也可自选图标，可到iconFont网站的SVG飞机图标
                    symbol: 'arrow',
                    //特效标记的大小
                    symbolSize: 8,
                    color: 'red',
                    //动画来回播放
                    roundTrip: true,
                    //拖尾效果
                    trailLength: 0.1,
                },
                //航线样式
                lineStyle: {
                    //弯曲程度,0-1
                    curveness: 0.3,
                }
            }
        ]
    })
})
</script>

<template>
    <!-- <div>1</div> -->
    <div class="box">
        <div class="mapContain" ref="charts">
        </div>
        <!-- <div class="top" style="margin-top: 0;">
            <div class="text">全国景区游客趋势图</div>
        </div> -->
        <!-- <div>1</div> -->
    </div>
</template>

<style scoped lang="scss">
.box {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    // justify-content: center;
    // align-items: center;


    .mapContain {
        // position: absolute;
        width: 100%;
        height: 100%;
        margin-top: -20px;


    }



}
</style>