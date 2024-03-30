<script lang='ts' setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useCategoryData } from '@/store/module/category'
import SkuForm from './skuForm/index.vue'
import SpuForm from './spuForm/index.vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index'
import type { SpuData, SkuData, HasSpuResponseData, Records } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { log } from 'console'
const categoryData = useCategoryData()
//控制场景
let scene = ref<number>(0)
//分页器组件 当前页面
let pageNo = ref<number>(1)
//分页器组件 每页展示数据
let pageSize = ref<number>(3)
//分页器组件 总数量
let totalCount = ref<number>(0)
//存储已有SPU数据
let records = ref<Records>([]);
//spuFormInstance
const spuFormInstance = ref()
//skuFormInstance
const skuFormInstance = ref()


const getHasSpu = async (pager = 1) => {
    pageNo.value = pager
    const r = await reqHasSpu(pageNo.value, pageSize.value, categoryData.thirdCurrID)
    // console.log(r);

    if (r.code === 200) {
        records.value = r.data.records
        totalCount.value = r.data.total
    } else {
        ElMessage({
            type: 'error',
            message: 'GetHasSpuData Error'
        })
    }
}
//监视分页器内数值变化，（带着分页器内新的数值pageNo, pageSize）实时请求新数据
watch([pageNo, pageSize], async () => {
    await getHasSpu(pageNo.value)
})
//监视三级分类id变化，实时获取该三级分类的spu信息
watch(() => categoryData.thirdCurrID, async () => {
    //一级/二级分类一变，都会带动三级分类数据为'',因此必须先判断。否则带着空数据请求会报错
    if (!categoryData.thirdCurrID) return
    await getHasSpu()
})
//addSpu按钮
const addSpu = () => {
    changeScene(1)
    spuFormInstance.value.initSpuData(categoryData.thirdCurrID)
}
//editSpu按钮
const editSpu = (row: SpuData) => {
    changeScene(1)
    //点击编辑的那个SPU数据做参数
    spuFormInstance.value.initHasSpuData(row)
}

const addSku = (row: SpuData) => {
    changeScene(2)
    skuFormInstance.value.initSkuData(categoryData.firstCurrID, categoryData.secondCurrID, row)
}

//控制sku展示面板显示
const isShowSku = ref<boolean>(false);
//展示sku信息
let skuArr = ref<SkuData[]>([]);
//点击展示sku按钮
const showSkuList = async (row: any) => {
    // console.log(row);
    const r = await reqSkuList(row.id)
    console.log(r);
    if (r.code === 200) {
        skuArr.value = []
        skuArr.value = r.data
        isShowSku.value = true
    }
    else {
        ElMessage({
            type: 'error',
            message: 'GetHasSpuData Error'
        })
        return
    }
}


//删除SPU
const delSpu = async (row: SpuData) => {
    const r = await reqRemoveSpu((row.id as number))
    console.log(r);
    if (r.code === 200) {
        if (records.value.length === 1) {
            //删除数据为当页最后一条。回到上一页
            getHasSpu(pageNo.value - 1)
        } else {
            //保持当前页
            getHasSpu(pageNo.value)
        }
    } else {
        ElMessage({
            type: "error",
            message: 'Delete Failed'
        })
    }
}

//切换场景
const changeScene = (id: number, params?: string) => {
    scene.value = id
    // console.log(params);
    if (params === 'add') {
        //添加数据属于头插，所以回到第一页
        getHasSpu(1)
    } else {
        //编辑SPU、新增/编辑时取消按钮返回场景0时。还是呆在当前页
        //这里的请求也可以保证虚假的数据渲染页面（✨意思是渲染页面的数据和编辑时的数据实际上是浅拷贝，当编辑页面后即使没有点击保存，因为浅拷贝的缘故，修改的数据也会响应到页面上，造成更新的错觉，但实际上数据是虚假的，服务器上的数据并没有更新）
        getHasSpu(pageNo.value)
    }
}


//由于使用公共组件Category，导致会在pinia中存在数据，为了不污染其他使用Category组件的组件,🟥路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
    // 清空仓库的数据
    categoryData.resetStore()
})

</script>

<template>
    <!-- <h1>SPU</h1> -->
    <Category :scene="scene" />
    <el-card style="margin:10px 0px">
        <!-- v-if|v-show:都可以实现显示与隐藏 -->
        <div v-show="scene == 0">
            <el-button :disabled="categoryData.thirdCurrID ? false : true" type="primary" size="default" icon="Plus"
                @click="addSpu">添加SPU</el-button>
            <!-- 展示已有SPU数据 -->
            <el-table style="margin: 10px 0px;" border :data="records">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="SPU操作">
                    <!-- row:即为已有的SPU对象 -->
                    <template #="{ row, $index }">
                        <el-button @click="addSku(row)" type="success" size="small" icon="Plus" title="添加SKU"></el-button>
                        <el-button @click="editSpu(row)" type="warning" size="small" icon="Edit" title="修改SPU"></el-button>
                        <el-button type="primary" size="small" icon="View" @click="showSkuList(row)"
                            title="查看SKU列表"></el-button>
                        <el-popconfirm :title="`确定删除${row.spuName}?`" width="200px" @confirm="delSpu(row)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" :disabled="false" layout="  prev, pager, next,sizes,->,jumper,total"
                :total="totalCount" />
        </div>
        <!-- 添加SPU|修改SPU子组件 -->
        <SpuForm ref="spuFormInstance" @changeScene="changeScene" v-show="scene == 1"></SpuForm>
        <!-- 添加SKU的子组件 -->
        <SkuForm ref="skuFormInstance" @changeScene="changeScene" v-show="scene == 2"></SkuForm>
        <!-- dialog对话框:展示已有的SKU数据 -->
        <!-- dialog对话框:展示已有的SKU数据 -->
        <el-dialog v-model="isShowSku" title="SKU列表">
            <el-table border :data="skuArr">
                <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                <el-table-column label="SKU价格" prop="price"></el-table-column>
                <el-table-column label="SKU重量" prop="weight"></el-table-column>
                <el-table-column label="SKU图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
</template>

<style scoped></style>