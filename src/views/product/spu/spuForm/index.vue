<script lang='ts' setup>
import type { SpuData } from '@/api/product/spu/type'
import { ref, computed, nextTick } from 'vue';
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
import type { SaleAttrValue, HasSaleAttr, SaleAttr, SpuImg, Trademark, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus'
//存储已有的SPU这些数据
let AllTradeMark = ref<Trademark[]>([]);
//商品图片
let imgList = ref<SpuImg[]>([]);
//已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([]);
//全部销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//存储预览图片地址
let dialogImageUrl = ref<string>('')
//存储已有的SPU对象，作用：展示页面、发送添加/修改请求时携带作参数
let SpuParams = ref<SpuData>({
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],//销售属性列表SaleAttr[]类型
});


//照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url;
    //对话框弹出来
    dialogVisible.value = true;
}
//照片墙删除文件钩子
const handleRemove = () => {
    // console.log(123);
}
//:before-upload上传前触发
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必小于3M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传文件务必PNG|JPG|GIF'
        })
        return false;
    }
}

//计算出未选择的SPU属性有哪些,渲染到展示销售属性的下拉菜单
const unSelectSaleAttr = computed(() => {
    return allSaleAttr.value.filter(item =>
        !saleAttr.value.find(i => item.name === i.saleAttrName)
    )
})
//将来收集还未选择的销售属性的ID与属性值的名字,最后将用于添加属性
let saleAttrIdAndValueName = ref<string>('')
const addAttr = () => {
    const [id, name] = saleAttrIdAndValueName.value.split(':')
    //准备一个新的销售属性对象:将来发送ajax通知新增属性
    //为属性表格添加一组新的属性,新一行
    const newAttr: SaleAttr = {
        baseSaleAttrId: id,
        saleAttrName: name,
        spuSaleAttrValueList: []
    }
    saleAttr.value.push(newAttr)
    saleAttrIdAndValueName.value = ''
}

//为当前添加属性值的input聚焦,使用:ref=func的方式记录哪个el-input的结构发送变化,表示el-tag被点击了,要切换编辑模式了
//currFocusInput负责记录哪个el-tag被点击 => 所产生的input框结构变化 =>触发焦点事件
const currFocusInput = ref<any>({})

//添加属性值按钮+
const toEdit = (row: any, index: number) => {
    // console.log(row);
    //点击按钮的时候->编辑模式
    row.flag = true;
    row.saleAttrValue = ''
    nextTick(() => {
        // console.log(inputArray.value);
        currFocusInput.value.focus()
    })
}
//切换为查看模式调用,并且判断输入值的合法性,添加至属性值数组中
const toLook = (row: SaleAttr, index: number) => {
    //整理收集的属性的ID与属性值的名字
    const { baseSaleAttrId, saleAttrValue } = row;
    //整理成服务器需要的属性值形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空的'
        })
        //切换为查看模式
        row.flag = false
        return
    }
    const repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName === saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return
    }
    //将合法属性值添加至该属性的属性值数组中
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    //切换为查看模式
    row.flag = false
}

const save = async () => {
    //🟥整理数据
    //1.关于图片的数据,需要进一步修改成请求时要求的图片数据格式
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,//图片的名字
            //item.response 判断照片是否为新增照片数据,因为它外面套了一层data:{data:http://....}
            imgUrl: (item.response && item.response.data) || item.url
        }
    });
    //2:整理销售属性的数据
    SpuParams.value.spuSaleAttrList = saleAttr.value;
    // console.log(SpuParams.value);
    // //整理完收集的数据,发送修改SPU请求
    let result = await reqAddOrUpdateSpu(SpuParams.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        //调用changeScene，通知父组件切换场景为0.同时第二个参数告知父组件此次时更新还是新增
        emit('changeScene', 0, SpuParams.value.id ? 'updata' : 'add');
    } else {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }
}


const emit = defineEmits(['changeScene'])
//
const cancel = () => {
    console.log(SpuParams.value);

    emit('changeScene', 0)


}



//父组件点击编辑SPU按钮调用，发送4个API，拿到对应SPU的所有数据渲染页面
//点击编辑的那个SPU数据做参数，以便用参数中的数据发ajax拿数据
const initHasSpuData = async (spu: SpuData) => {
    // console.log(spu);
    //存储已有的SPU对象,将来渲染页面
    console.log(spu);

    SpuParams.value = spu;
    // console.log(spu);
    //请求数据=========================================
    //获取全部品牌的数据
    const r1: AllTradeMark = await reqAllTradeMark()
    //获取某个SPU下的全部的售卖商品的图片数据
    const r2: SpuHasImg = await reqSpuImageList((spu.id as number))
    //获取某一个SPU下全部的已有的销售属性
    const r3: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number));
    //获取整个项目全部SPU的销售属性
    const r4: HasSaleAttrResponseData = await reqAllSaleAttr();
    SpuParams.value

    //存储请求的数据=========================================
    //存储全部品牌的数据
    AllTradeMark.value = r1.data;
    //r2请求收集SPU对应商品图片信息，但是若想用el-upload组件展示图片，就必须按照它们特定的格式存放图片信息（✨url和name构成的对象），r2请求的数据并不是这个格式，于是map映射新对象，变成合规的数据传递给el-upload组件展示图片
    imgList.value = r2.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    //存储已有的SPU的销售属性
    saleAttr.value = r3.data;
    //存储全部的销售属性
    allSaleAttr.value = r4.data;
}
// 添加SPU按钮，三级分类id做参数
const initSpuData = async (c3Id: number) => {
    //🟥1.清除spuForm组件中的残余数据，防止点击修改SPU后，spuForm组件中用于渲染的数据残留，污染下一次新建SPU时的页面
    Object.assign(SpuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
        id: 0,
    });
    //清空照片
    imgList.value = [];
    //清空销售属性
    saleAttr.value = [];
    //清空用于收集销售属性和id的变量
    saleAttrIdAndValueName.value = '';

    SpuParams.value.category3Id = c3Id;
    //请求数据=========================================
    //获取全部品牌的数据
    const r1: AllTradeMark = await reqAllTradeMark()
    //获取整个项目全部SPU的销售属性
    const r4: HasSaleAttrResponseData = await reqAllSaleAttr();
    //存储请求的数据=========================================
    //存储全部品牌的数据
    AllTradeMark.value = r1.data;
    //存储全部的销售属性
    allSaleAttr.value = r4.data;
}
defineExpose({ initHasSpuData, initSpuData })

</script>

<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input style="width:200px" placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width:200px" v-model="SpuParams.tmId">
                <el-option v-for="(item, index) in  AllTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <!-- v-model:fileList->展示默认图片 
            action:上传图片的接口地址
            list-type:收集到的图片，采用不同的展示形式
            -->
            <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload"
                list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <!-- 预览图片弹窗 -->
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性的下拉菜单 -->
            <el-select v-model="saleAttrIdAndValueName"
                :placeholder="unSelectSaleAttr.length > 0 ? `还有${unSelectSaleAttr.length}项未选` : '无'" style=" width:200px;">
                <el-option v-for="item in unSelectSaleAttr     " :value="`${item.id}:${item.name}`" :key="item.id"
                    :label="item.name"></el-option>
            </el-select>
            <el-button :disabled="saleAttrIdAndValueName ? false : true" style="margin-left:10px" type="primary"
                @click="addAttr" size="default" icon="Plus">添加属性</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin:10px 0px" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- row:即为当前SPU已有的销售属性对象 -->
                    <template #="{ row, $index }">
                        <!-- close点击tag标签X关闭事件 -->
                        <el-tag style="margin:0px 5px" @close="row.spuSaleAttrValueList.splice(index, 1)" v-for="(item, index) in 
                            row.spuSaleAttrValueList " :key="row.id" class="mx-1" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input :ref="(vc: any) => currFocusInput = vc" v-model="row.saleAttrValue"
                            v-if="row.flag == true" placeholder="请你输入属性值" size="small" style="width:100px"
                            @blur="toLook(row, $index)"></el-input>
                        <el-button v-else type="primary" size="small" @click="toEdit(row, $index)" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <!-- 必须存在销售属性才能修改 -->
            <el-button :disabled="saleAttr.length > 0 ? false : true" type="success" size="default"
                @click="save">保存</el-button>
            <el-button @click="cancel" type="info" size="default">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>