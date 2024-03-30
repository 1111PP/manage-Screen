
<script setup lang="ts">
//引入请求API
import { reqAttrAPI } from '@/api/product/attr';
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu';
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue';
//平台属性
let attrArr = ref<any>([]);
//销售属性
let saleArr = ref<any>([]);
//照片的数据
let imgArr = ref<any>([]);
//获取table组件实例
let table = ref<any>();
//收集SKU的参数
let skuParams = reactive<SkuData>({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId": "",//已有的SPU的ID
    "tmId": "",//SPU品牌的ID
    //v-model收集
    "skuName": "",//sku名字
    "price": "",//sku价格
    "weight": "",//sku重量
    "skuDesc": "",//sku的描述
    "skuAttrValueList": [//平台属性的收集
    ],
    "skuSaleAttrValueList": [//销售属性
    ],
    "skuDefaultImg": "",//sku图片地址
})
//当前子组件的方法对外暴露
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    // console.log(c1Id, c2Id, spu);
    //收集数据
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.id;
    skuParams.tmId = spu.tmId;
    //获取平台属性,即管理模块中各个三级分类的品牌添加的属性
    let r1: any = await reqAttrAPI(c1Id, c2Id, spu.category3Id);
    //获取该SPU已有的属性和属性值
    let r2: any = await reqSpuHasSaleAttr(spu.id);
    //获取照片墙的数据
    let r3: any = await reqSpuImageList(spu.id);
    // console.log(r1, r2);

    attrArr.value = r1.data;
    saleArr.value = r2.data;
    imgArr.value = r3.data;
}
//取消按钮的回调
const cancel = () => {
    $emit('changeScene', 0, '');
}
//修改checkBox事件，即代表选择这个图片作为sku展示图片
const selectImg = (row: any) => {
    console.log(row);
    //点击的时候,全部图片的的复选框不勾选
    table.value.clearSelection()
    //将当前点击的该行row前的checkbox勾选
    table.value.toggleRowSelection(row[row.length - 1], true);
    //收集图片地址
    skuParams.skuDefaultImg = row[row.length - 1].imgUrl;
}
//点击设置默认按钮，将该图片前的checkbox勾选
const handler = (row: any) => {
    //点击的时候,全部图片的的复选框不勾选
    table.value.clearSelection()
    //将当前点击的该行row前的checkbox勾选
    table.value.toggleRowSelection(row, true);
    //收集图片地址
    skuParams.skuDefaultImg = row.imgUrl;
}

//对外暴露方法
defineExpose({
    initSkuData
});

//保存按钮的方法
const save = async () => {
    //整理参数
    //平台属性，整理所有平台属性，每一个平台属性整理成一个对象，包含属性id和属性值id，最后将所有平台属性push进平台属性数组中
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, []);
    //销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev;
    }, []);
    //添加SKU的请求
    let result: any = await reqAddSku(skuParams);
    console.log(result);

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        });
        //通知父组件切换场景为零
        $emit('changeScene', 0, '')
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }

}
//自定义事件的方法
let $emit = defineEmits(['changeScene']);
</script>
<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性:">
            <el-form :inline="true">
                <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="`${item.attrName}`">
                    <!-- 收集el-option的value，随后el-select组件将数据收集到item.attrIdAndValueId，✨item是平台属性attrArr的每个属性对象元素，attrIdAndValueId是v-model新添加到item上的属性 -->
                    <el-select style="width: 100px;" v-model="item.attrIdAndValueId">
                        <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue, index) in item.attrValueList"
                            :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性:">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="(item, index) in saleArr" :key="item.id">
                    <el-select style="width: 100px;" v-model="item.saleIdAndValueId">
                        <el-option :value="`${item.id}:${saleAttrValue.id}`"
                            v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table @select="selectImg" border :data="imgArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" alt="" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button :type="row.imgUrl === skuParams.skuDefaultImg ? 'success' : 'primary'" size="small"
                            @click="handler(row)">{{
                                row.imgUrl === skuParams.skuDefaultImg ? '默认展示' : '设置默认'
                            }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>