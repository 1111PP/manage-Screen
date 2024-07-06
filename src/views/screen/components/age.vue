<script lang='ts' setup>
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
const props = defineProps(['data'])
const data = ref<[]>([])
let charts = ref()
let mycharts: any
watch(() => props.data, () => {
    data.value = props.data
    // console.log(data.value);
    mycharts.setOption({
        series: {
            data: data.value
        }
    })
})

onMounted(() => {
    mycharts = echarts.init(charts.value)
    mycharts.setOption({
        tooltip: {
            trigger: 'item'
        },
        title: {
            text: '占比分布',
            x: 155,
            y: 105,
            textStyle: {
                color: "white",
                fontSize: 20
            }
        },
        legend: {
            right: 30,
            top: 39,
            orient: 'vertical',
            textStyle: {
                color: "white",
                fontSize: 20
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                center: [200, 120],//控制饼状图的圆心位于容器的位置，x y坐标
                radius: ['40%', '80%'],//内圈和外圈半径
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inner',
                    color: 'white'

                },
                emphasis: {
                    label: {
                        color: "black",
                        // show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 20, name: '20及以下' },
                    { value: 30, name: '20-30' },
                    { value: 10, name: '30-40' },
                    { value: 10, name: '40-50' },
                    { value: 5, name: '60及以上' }
                ]
            }
        ],

    })
})
</script>

<template>
    <div class="ageContain">
        <div class="top">
            <p>年龄比例</p>
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