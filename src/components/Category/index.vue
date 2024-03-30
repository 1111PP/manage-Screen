<script lang='ts' setup>
import { onMounted, watch } from 'vue'
import { firstCategoryAPI, secondCategoryAPI, thirdCategoryAPI } from '@/api/product/attr';
import type { CategoryResponseData } from '@/api/product/attr/type'
import { storeToRefs } from 'pinia';
import { useCategoryData } from '@/store/module/category'
const categoryData = useCategoryData()
defineProps(['scene'])
let { firstCategoryData,
    secondCategoryData,
    thirdCategoryData,
    firstCurrID,
    secondCurrID,
    thirdCurrID,
} = storeToRefs(categoryData)

//监视当前选中的一级分类值，如果改变，直接带着新值的id发送二级分类的请求，并赋值渲染
watch(firstCurrID, async () => {
    //清空上次残余数据
    secondCurrID.value = ''
    thirdCurrID.value = ''
    thirdCategoryData.value = []
    const result = await secondCategoryAPI(firstCurrID.value);
    if (result.code === 200) {
        //替换原先分类列表数据
        secondCategoryData.value = result.data
    }

})
// //监视当前选中的二级分类值，如果改变，直接带着新值的id发送三级分类的请求，并赋值渲染
watch(secondCurrID, async () => {
    thirdCurrID.value = ''
    if (secondCurrID.value !== '') {
        const result = await thirdCategoryAPI(secondCurrID.value);
        if (result.code === 200) {
            thirdCategoryData.value = result.data
        }
    }
})


onMounted(async () => {
    const result: CategoryResponseData = await firstCategoryAPI()
    if (result.code === 200) {
        firstCategoryData.value = result.data
    }
})

</script>

<template>
    <!-- <h1>属性管理</h1> -->
    <el-card class="attr-header">
        <el-form :inline="true" style="padding-left: 20px; ">
            <el-form-item label="一级分类">
                <el-select :disabled="scene == 1 ? true : false" style="width: 15vw" v-model="firstCurrID">
                    <el-option v-for="item in firstCategoryData" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="scene == 1 ? true : false" style="width: 15vw ;" v-model="secondCurrID">
                    <el-option v-for="item in secondCategoryData" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="scene == 1 ? true : false" style="width: 15vw;" v-model="thirdCurrID">
                    <el-option v-for="item in thirdCategoryData" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped></style>