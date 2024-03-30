<script lang='ts' setup>
import { ref, reactive, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useCategoryData } from '@/store/module/category'
import { reqAttrAPI, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr/index'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryData = useCategoryData()
const totalData = ref<Attr[]>([])
const getTotalData = async () => {
    const { firstCurrID, secondCurrID, thirdCurrID } = categoryData
    const result: AttrResponseData = await reqAttrAPI(firstCurrID, secondCurrID, thirdCurrID)
    totalData.value = result.data
}
watch(() => categoryData.thirdCurrID, async () => {
    //清空上一次表格中残留的属性与属性值数据
    totalData.value = []
    //三级分类为‘’，则不请求，因为修改了1或2级分类都会导致3即分类值为‘’
    if (!categoryData.thirdCurrID) return
    //update page
    await getTotalData()
})

//点击添加属性按钮，scene控制：展示0/添加1 属性 两个面板的来回切换
let scene = ref<number>(0)//默认是展示面板
//添加属性按钮
const addAttr = () => {
    //切换添加属性面板
    scene.value = 1
}
//编辑按钮
const editAttr = (row: any) => {
    // console.log(row);
    scene.value = 1
    //✨P74 15分添加属性的坑，深浅拷贝问题
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}

//删除属性 ⚠️展示面板中的删除
const delAttr = async (id: number) => {
    const r = await reqRemoveAttr(id)
    // console.log(r);
    if (r.code === 200) {
        await getTotalData()
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    }
}

//记录新增属性的所有数据，最终reqAddOrUpdateAttr请求时携带上
const attrParams = reactive<Attr>({
    attrName: "",//新增的属性的名字
    attrValueList: [//新增的属性值数组
    ],
    categoryId: '',//三级分类的ID
    categoryLevel: 3,//代表的是三级分类
})
// 添加属性的值
const addAttrValue = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,//✨控制每一个属性值 编辑模式true 与 查看模式false 的切换
    })
    nextTick(() => {
        inputArray.value[attrParams.attrValueList.length - 1].focus()
    })
}
const delAttrValue = (value: AttrValue) => {
    attrParams.attrValueList = attrParams.attrValueList.filter(item => item !== value)
}
//失焦事件
const toLookMode = (row: AttrValue, index: number) => {
    console.log(row);
    // 🟥去除空格后，如果用户输入内容为空，不予切换查看模式，否则切换为查看模式后展示的div因为输入内容为空而直接消失，没有高度所以塌缩了
    if (!row.valueName.trim()) {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        //如果输入内容为空，直接把它从attrValueList数组里找到删除，index就是该元素的index
        attrParams.attrValueList.splice(index, 1)
        return
    } else {
        //判断当前属性值row是否与attrValueList中已有的属性值重复
        const r = attrParams.attrValueList.find(item => {
            //排己判断
            if (item != row)
                return item.valueName === row.valueName
        })
        //如果重复,删除attrValueList数组中本次添加的重复的属性值
        if (r) {
            ElMessage({
                type: 'error',
                message: '属性值不能重复'
            })
            //如果重复 ，直接删除
            attrParams.attrValueList = attrParams.attrValueList.filter(item => item != row)
            return
        }
    }
    row.flag = false
}
const toEditMode = (row: AttrValue, index: number) => {
    row.flag = true
    console.log(index);

    nextTick(() => {
        inputArray.value[index].focus()
    })
}

//1.无论是否新增/编辑，无论成功/失败。都清空添加属性面板中残余数据
//2.编辑/未编辑，取消时也要清空添加属性面板中残余数据
const clearAttrParams = () => {
    //attrParams用于渲染编辑/新增面板数据
    Object.assign(attrParams, {
        attrName: "",//新增的属性的名字
        attrValueList: [//新增的属性值数组
        ],
        categoryId: '',//三级分类的ID
        categoryLevel: 3,//代表的是三级分类
    })
}
const cencelAdd = () => {
    //切换展示属性面板
    scene.value = 0
    clearAttrParams()
}
//保存按钮 
const saveAttr = async () => {
    //将当前三级分类的id保存到attrParams对象中，当保存按钮点击时=》发送添加属性的请求时携带
    attrParams.categoryId = categoryData.thirdCurrID

    //发送Ajax，为当前三级分类添加属性
    const result = await reqAddOrUpdateAttr(attrParams)
    // console.log(result);
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            //根据有无id判断此次是修改还是编辑操作
            message: attrParams.id ? 'Successfully Edit' : 'Successfully Added'
        })
        //刷新页面
        await getTotalData()
        //切换展示属性面板
        scene.value = 0
    }
    clearAttrParams()
}
//收集所有点击添加属性值按钮后 => 所产生的input框
const inputArray = ref<any>([])


//由于使用公共组件Category，导致会在pinia中存在数据，为了不污染其他使用Category组件的组件,🟥路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
    // 清空仓库的数据
    categoryData.resetStore()
})
</script>

<template>
    <Category :scene="scene" />
    <el-card style="margin-top: 10px;" class="attr-main">
        <!-- 展示属性的面板 -->
        <div v-show="scene == 0">
            <el-button :disabled="!categoryData.thirdCurrID" type="primary" icon="plus" @click="addAttr">添加属性</el-button>
            <el-table border style="margin: 10px 0;" :data="totalData">
                <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
                <el-table-column prop="attrName" label="属性名称" width="120px"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{ row, index }">
                        <el-tag style="margin:0 5px " v-for="item in row.attrValueList" :key="item.id"> {{ item.valueName
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop=" operation" label="操作" width="120px">
                    <template #="{ row, index }">
                        <el-button @click="editAttr(row)" type="warning" size="small" icon="edit"></el-button>
                        <el-popconfirm width="200px" @confirm="delAttr(row.id)" :title="`确认删除${row.attrName}?`">
                            <template #reference>
                                <el-button type="danger" size="small" icon="delete"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加属性的面板 -->
        <div v-show="scene === 1">
            <el-form>
                <el-form-item label="属性名称:">
                    <el-input v-model="attrParams.attrName" placeholder="请输入属性名称" style="width:200px"></el-input>
                </el-form-item>

                <el-button :disabled="attrParams.attrName ? false : true" type="primary" icon='plus'
                    @click="addAttrValue">添加属性值</el-button>
                <el-button @click="cencelAdd">取消</el-button>

                <el-table border style="margin:10px 0" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="属性值">
                        <!-- 
                            @click="console.log($event.target.value)" 
                         -->
                        <template #="{ row, $index }">
                            <!-- 收集所有input框 -->
                            <el-input :ref="(vc: any) => inputArray[$index] = vc" v-if="row.flag"
                                @blur="toLookMode(row, $index)" size="small" placeholder="请输入属性值"
                                v-model="row.valueName"></el-input>
                            <div v-else="row.flag === false" @click="toEditMode(row, $index)">{{
                                row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button @click="delAttrValue(row)" icon="delete" type="danger" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-button type="success" @click="saveAttr"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button @click="cencelAdd">取消</el-button>
            </el-form>
        </div>
        <div v-show="scene === 2">
            456
        </div>
    </el-card>
</template>

<style scoped lang='scss'></style>