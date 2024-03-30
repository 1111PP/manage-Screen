<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()
const data = [{
    name: '饮食',
    value: '35'
}, {
    name: '住行',
    value: '20'
}, {
    name: '旅游景点',
    value: '30'
}, {
    name: '当地特产',
    value: '25'
},]
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: [
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#65aaff' },
                { offset: 1, color: 'rgba(101, 170, 255, 0.5)' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1ae6b4' },
                { offset: 1, color: 'rgba(26, 230, 180, 0.5)' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00e4ff' },
                { offset: 1, color: 'rgba(0, 228, 255, 0.5)' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#ffcc85' },
                { offset: 1, color: 'rgba(227, 183, 121, 0.5)' },
            ]),
        ],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(3,50,86,0.8)',
            textStyle: {
                fontSize: 16,
                color: '#ffffff',
            },
            formatter: (params: any) => {
                return params.name + ': ' + params.value + '%'
            },
        },
        //图表旁图例的样式
        legend: {
            //图例形状
            icon: 'circle',
            top: '8%',
            right: '12%',
            show: true,
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 30,
            data: data.map((el) => el.name),
            textStyle: {
                fontSize: 14,
                color: '#a6e4ff',
            },
        },
        //图表样式
        series: [
            {
                type: 'pie',
                roseType: 'radius',
                radius: ['25%', '70%'],
                center: ['50%', '55%'],
                data: data,
                itemStyle: {
                    borderWidth: 2,
                    borderRadius: '10%',
                },
                labelLine: {
                    length: 0,
                },
                label: {
                    formatter: (params: any) => {
                        return '{name|' + params.name + ': }{value|' + params.value + '%}'
                    },
                    rich: {
                        name: {
                            fontSize: 14,
                            color: '#a6e4ff',
                        },
                        value: {
                            fontSize: 14,
                            color: '#fff',
                        },
                    },
                },
            },
            // 内圈图表，✨美化作用
            {
                type: 'pie',
                radius: ['15%', '25%'],
                center: ['50%', '55%'],
                data: data,
                itemStyle: {
                    opacity: 0.3,
                },
                label: {
                    show: false,
                },
            },

        ],
    })
})
</script>

<template>
    <div class="ageContain">
        <div class="top">
            <p>数据统计</p>
            <img src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<style scoped lang="scss">
.ageContain {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        margin-left: 20px;
        margin-top: 5px;
        font-size: 20px;
        color: white
    }

    .charts {
        width: 100%;
        height: 240px;
        // margin-right: 100px;
    }
}
</style>