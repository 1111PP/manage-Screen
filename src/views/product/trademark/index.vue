<script lang='ts' setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { getHasTrademarkAPI, delBrandAPI, addOrEditBrandAPI } from '@/api/product/trademark/index'
import { type getHasTrademarkAPIType, type RecordsType, type TradeMarkType } from "@/api/product/trademark/type"
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let listData = ref<RecordsType>([])//当前页商品信息组成的数组
let totalCount = ref<number>(0)
let formRef = ref()//获取el-form组件实例对象

//获取列表中品牌数据
const getHasTrademark = async () => {
    const result: getHasTrademarkAPIType = await getHasTrademarkAPI(pageNo.value, pageSize.value);
    // console.log(result);
    if (result.code === 200) {
        listData.value = result.data.records
        totalCount.value = result.data.total
    }
}

//删除按钮逻辑isShowDelDialog\currDelId\delDialog\delBrand
const isShowDelDialog = ref<boolean>(false)
//记录当前删除品牌的id
const currDelId = ref<number>(0)
const delDialog = (id: number) => {
    isShowDelDialog.value = true
    currDelId.value = id
}
const delBrand = async () => {
    const result = await delBrandAPI(currDelId.value)
    console.log(result);
    if (result.code === 200) {
        // console.log(result);
        //删除同时更新页面,重新发送请求，判断删除内容是否为该页最后一个
        listData.value.length > 1 ?
            getHasTrademark() ://若非最后一个，则pageNo, pageSize都不变，直接手动刷新页面
            pageNo.value -= 1//若删除的是该页最后一个内容，说明实际上要跳转上一页，则直接修改pageNo.value-1，随后触发watch，刷新页面
    }
    // 删除失败原因:系统数据无法删除
    else {
        ElMessage({
            type: 'error',
            message: result.data,
        })
    }
    //无论删除成功与否都关闭dialog
    isShowDelDialog.value = false
    //同时重置记录删除品牌id的变量
    currDelId.value = 0
}

//🟥由于新增和编辑按钮复用同一dialog,所以根据点击新增/编辑按钮,实时修改弹窗标题
const addOrEdit = ref<string>('')
//点击新增按钮
const addBrand = () => {
    addOrEdit.value = '新增'
    isShowEditDialog.value = true
    //👇防止先点击编辑,残留数据污染新增按钮的dialog
    Object.assign(currEditInfo, {
        id: 0,
        tmName: '',
        logoUrl: ''
    })
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
}

//编辑按钮弹窗
const isShowEditDialog = ref<boolean>(false)
//dialog内表单收集的消息
const currEditInfo = reactive<TradeMarkType>({
    id: 0,
    tmName: '',
    logoUrl: ''
})
//点击编辑按钮
const editDialog = (id: number) => {
    addOrEdit.value = '编辑'
    nextTick(() => {
        if (formRef.value) {
            formRef.value.clearValidate('tmName');
            formRef.value.clearValidate('logoUrl');
        }
    })
    isShowEditDialog.value = true
    currEditInfo.id = id
    let target = listData.value.find(item => item.id === currEditInfo.id)
    // console.log(target);
    if (target) {
        currEditInfo.tmName = target.tmName
        currEditInfo.logoUrl = target.logoUrl
    }
}
//点击确定修改后触发
const editBrand = async () => {
    // 先校验，后修改
    const validResult = formRef.value.validate();
    // console.log(validResult);
    validResult.then(async () => {
        const result = await addOrEditBrandAPI({
            id: currEditInfo.id,
            tmName: currEditInfo.tmName,
            logoUrl: currEditInfo.logoUrl
        })
        if (result.code === 200) {
            // console.log(result);
            ElMessage({
                type: 'success',
                message: `${addOrEdit.value}成功`,
            })
        } else {
            // console.log(result);
            ElMessage({
                type: 'error',
                message: "修改失败",
            })
        }
        //编辑完商品信息后重置信息
        Object.assign(currEditInfo, {
            id: 0,
            tmName: '',
            logoUrl: ''
        })
        isShowEditDialog.value = false
        getHasTrademark()
    }, () => {
        ElMessage({
            type: 'error',
            message: "表单校验失败",
        })
    })

}

// el-upload组件的属性before-upload 钩子在🟥文件(✨此组件任何文件都可以上传,但此处只需要图片文件)上传成功之前执行,一般用于限制用户上传文件的格式和大小
//rawFile即当前上传文件对象信息
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //要求:上传文件格式png|jpg|gif 4M
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        return false;
    }
}
//图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //✨收集上传图片的地址到表单数据currEditInfo中,添加一个新的品牌的时候带给服务器
    // console.log(response);
    currEditInfo.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl');

}


//分页器修改操作,每次修改,带着当前已修改数据,请求最新品牌列表数据
watch([pageNo, pageSize], () => {
    getHasTrademark()
})

onMounted(() => {
    // console.log(1);
    getHasTrademark()
})

//自定义品牌名校验规则
const validTmName = (rule: any, value: any, cb: any) => {
    // console.log(currEditInfo.tmName);
    currEditInfo.tmName.length >= 2 ? cb() : cb(new Error('品牌名称必须>=2字符'))
    console.log(999);
}
//自定义图片上传el-upload表单
const validLogUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片未上传'))
    }

}
// 新增/编辑表单自定义验证规则
const rules = {
    tmName: [{ required: true, validator: validTmName, trigger: 'blur' }],
    logoUrl: [{ required: true, validator: validLogUrl }],
}



</script>

<template>
    <el-card class="box-card">
        <!-- button -->
        <el-button type="success" icon="Plus" style="margin-bottom: 10px;" @click="addBrand">添加品牌</el-button>
        <!-- 展示区域 -->
        <el-table border :data="listData" stripe>
            <el-table-column prop="id" label="序号" width="80px" align="center" />
            <el-table-column prop="tmName" label="品牌名称" align="center" />
            <el-table-column label="品牌LOGO" align="center">
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" style="width:50px;height: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" icon="edit" @click="editDialog(row.id)">编辑</el-button>
                    <el-button type='danger' icon="delete" @click="delDialog(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="pagination-block">
            <!-- <div class="demonstration"></div> -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" :disabled="false" layout="  prev, pager, next,sizes,->,jumper,total"
                :total="totalCount" />
        </div>
    </el-card>
    <!-- *********删除按钮点击后的dialog -->
    <el-dialog v-model="isShowDelDialog" width="300">
        <span>是否确认删除?</span>
        <template #footer>
            <div class="dialog-footer1" ref="lpp">
                <el-button @click="isShowDelDialog = false">取消</el-button>
                <el-button type="primary" @click="delBrand">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <!-- *********编辑按钮点击后的dialog - -->
    <el-dialog v-model="isShowEditDialog" :title="`${addOrEdit}品牌`" width="500" style="border-radius: 20px; padding: 30px;">
        <el-form :rules="rules" status-icon ref="formRef" :model="currEditInfo">
            <el-form-item label-width="100px" prop="tmName" label="品牌名称:">
                <el-input v-model="currEditInfo.tmName" placeholder="请输入品牌名称"></el-input>
            </el-form-item>

            <el-form-item label-width="100px" prop="logoUrl" label="品牌LOGO:">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                    :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :show-file-list="false">
                    <img style="height: 128px;
                    width: 128px; overflow: hidden;" v-if="currEditInfo.logoUrl" :src="currEditInfo.logoUrl"
                        class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

        </el-form>
        <template #footer>
            <el-button type="primary" @click="isShowEditDialog = false">{{ '取消' + addOrEdit }}</el-button>
            <el-button type="primary" @click="editBrand">
                {{ '确认' + addOrEdit }}
            </el-button>
        </template>


    </el-dialog>
</template>

<style scoped>
.box-card {
    margin: 20px;
}

.pagination-block {
    margin: 20px;
    margin-bottom: 0px;
}
</style>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    text-align: center;
}
</style>