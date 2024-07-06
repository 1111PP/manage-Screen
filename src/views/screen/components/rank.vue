<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const charts = ref()
const provinces = [
    "北京市", "天津市", "河北省", "山西省", "内蒙古自治区",
    "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省",
    "浙江省", "安徽省", "福建省", "江西省", "山东省",
    "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区",
    "海南省", "重庆市", "四川省", "贵州省", "云南省",
    "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区",
    "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾省"
];

const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const data = provinces.map(city => ({
    city,
    population: generateRandomNumber(10000, 100000),
    averageSpending: generateRandomNumber(1000, 5000)
}));

const classOption = ref({
    step: 0.1
})
const mockTableData = ref<any>(data)
onMounted(() => {
    console.log(Vue3SeamlessScroll);

    // let mycharts = echarts.init(charts.value);
    // mycharts.setOption({
    //     title: {
    //         text: '景区排行',
    //         link: 'http://www.baidu.com',
    //         left: "70%",
    //         // top: '10%',
    //         //主标题样式
    //         textStyle: {
    //             color: 'white',
    //             fontSize: 20
    //         },
    //         //子标题
    //         subtext: "各大景区排行",
    //         //子标题的样式
    //         subtextStyle: {
    //             color: 'yellowgreen',
    //             fontSize: 16
    //         }
    //     },
    //     xAxis: {
    //         type: 'value',
    //         show: false,
    //         max: 60,
    //     },
    //     yAxis: {
    //         type: 'category',
    //         offset: 10,
    //         axisLine: {
    //             show: false
    //         },
    //         axisTick: {
    //             show: false,
    //         },
    //         data: getCity(),
    //     },
    //     series: [
    //         {
    //             type: 'bar',
    //             data: [10, 20, 30, 40, 50],
    //             label: {
    //                 show: true,
    //                 position: 'top',
    //                 color: 'white',
    //                 fontSize: 16
    //             },
    //             //柱条的样式
    //             itemStyle: {
    //                 //设置柱条颜色
    //                 color: function (data: any) {
    //                     const color: string[][] = [
    //                         ['hotpink', 'rgba(229, 0, 247, 0.7)'],
    //                         ['orange', 'rgba(247, 139, 0,  0.7)'],
    //                         ['skyblue', 'rgba(0, 72, 125,0.7)'],
    //                         ['yellowgreen', 'rgba(237, 195, 0, 0.7)'],
    //                         ['red', 'rgba(237, 34, 38, 0.7)'],
    //                     ]
    //                     const result: any = []
    //                     //给每一个柱条这是背景颜色
    //                     for (let i = 0; i < 5; i++) {
    //                         result.push(
    //                             new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
    //                                 offset: 0,
    //                                 color: color[i][0]
    //                             },
    //                             {
    //                                 offset: 1,
    //                                 color: color[i][1]
    //                             }
    //                             ], false)
    //                         )
    //                     }
    //                     return result[data.dataIndex];
    //                 },
    //                 borderRadius: 10,
    //             },
    //             backgroundStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 1,
    //                     y2: 0,
    //                     colorStops: [{
    //                         offset: 0, color: 'black' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: 'blue' // 100% 处的颜色
    //                     }],
    //                     global: false // 缺省为 false
    //                 },
    //                 borderRadius: 10,
    //                 borderColor: 'blue',
    //                 borderWidth: 5,
    //                 // shadowColor: 'white',
    //                 shadowBlur: 10
    //             },
    //             barWidth: 16,
    //             //显示柱子背景颜色
    //             showBackground: true,
    //         },

    //     ],
    //     grid: {
    //         left: '30%',
    //         right: 45,
    //         top: 50,
    //         bottom: 20,
    //     }
    // });
})


</script>

<template>
    <div class="rankContainer">
        <div class="top">
            <div class="text">热门景区排行</div>
            <img class="img" src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts">
            <ul class="tab">
                <li class="table-item">目的地</li>
                <li class="table-item">旅游人数</li>
                <li class="table-item">人均消费</li>
            </ul>
            <!-- 无限循环滚动组件 -->
            <!-- 博客地址：https://download.csdn.net/blog/column/12320696/131664058 -->
            <Vue3SeamlessScroll class="list" :list="mockTableData" step="0.3" hover="true" hover-stop="true">
                <ul>
                    <li class="list-item" v-for="(item, idx) in mockTableData" :key="item.city"
                        :style="{ backgroundColor: idx % 2 == 0 ? '' : '#40aeff36' }">
                        <div v-for="i in item" class="column">
                            {{ i }}
                        </div>
                    </li>
                </ul>
            </Vue3SeamlessScroll>
        </div>
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
        width: 100%;
        height: 320px;

        .tab {
            // margin-left: 30px;
            margin-top: 20px;
            height: 30px;
            font-size: 20px;
            font-weight: 700;
            color: white;
            display: flex;
            justify-content: center;
            width: 100%;

            .table-item {
                flex: 1;
                text-align: center;
            }
        }

        .list {
            overflow: hidden;
            height: 100%;

            .list-item {
                display: flex;
                justify-content: center;
                height: 39px;
                line-height: 39px;
                color: white;

                .column {
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }
}
</style>