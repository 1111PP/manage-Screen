<script lang='ts' setup>
import { ref, watch, onMounted, reactive, nextTick } from 'vue';
import { useLayoutSettingStore } from '@/store/module/setting'
//请求方法
import { reqRemoveRole, reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermisstion } from '@/api/acl/role';
import type { MunuData, RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
//引入骨架的仓库
import { ElMessage } from 'element-plus';
//当前页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(10);
//搜索职位关键字
let keyword = ref<string>('');
//存储全部已有的职位
let allRole = ref<Records>([]);
//职位总个数
let total = ref<number>(0);
//控制对话框的显示与隐藏
let dialogVisite = ref<boolean>(false);
//获取form组件实例
const form = ref<any>()
//收集新增岗位数据
let RoleParams = reactive<RoleData>({
    roleName: ''
})


//组件挂载完毕
onMounted(() => {
    //获取职位请求
    getHasRole();
});
//获取全部用户信息的方法|分页器当前页码发生变化的回调
const getHasRole = async (pager = 1) => {
    //修改当前页码
    pageNo.value = pager;
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        allRole.value = result.data.records;
    }
}
const search = () => {
    getHasRole()
    keyword.value = ''
}
const reset = () => {
    getHasRole()
}
const drawer = ref<boolean>(false)

//添加职位角色按钮
const addRole = async () => {
    dialogVisite.value = true
    Object.assign(RoleParams, {
        roleName: '',
        id: 0
    })
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    })
}
const save = async () => {
    form.value.validate().then(async () => {
        const r = await reqAddOrUpdateRole(RoleParams)
        if (r.code === 200) {
            ElMessage({
                type: 'success',
                message: RoleParams.id ? "Success Edit" : "Success Add"
            })
            getHasRole()
        } else {
            ElMessage({
                type: 'success',
                message: RoleParams.id ? "Failed Edit" : "Failed Add"
            })
        }
        dialogVisite.value = false
    }, () => {
        ElMessage({
            type: 'error',
            message: "Name is Empty"
        })
    })

}


//编辑角色
const updateRole = (row: any) => {
    dialogVisite.value = true
    Object.assign(RoleParams, row)
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    })
}
//删除角色
const removeRole = async (id: number) => {
    const r = await reqRemoveRole(id)
    if (r.code === 200) {
        ElMessage({
            type: 'success',
            message: "Success Delete"
        })
        getHasRole(allRole.value.length === 1 ? pageNo.value - 1 : pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: "Failed Delete"
        })
    }
}

//分页器修改操作,每次修改,带着当前已修改数据,请求最新品牌列表数据
watch([pageNo, pageSize], () => {
    getHasRole(pageNo.value)
})
//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'))
    }
}
//职位校验规则
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
}

//el-tree树形控件期望数据结构
// const data = [
//   {
//     id: 1,
//     label: 'Level one 1',
//     children: [
//       {
//         id: 4,
//         label: 'Level two 1-1',
//准备一个数组:数组用于存储该用户已有职位
let selectArr = ref<number[]>([]);
//树形控件的配置选项数据
const defaultProps = {
    children: 'children',
    label: 'name',
}
//定义数组存储所有种类的权限数据
let menuArr = ref<MenuList>([]);
//获取tree组件实例
let tree = ref<any>();
let roleTargetId = ref<number>(0)
//分配权限按钮
const setPermisstion = async (row: any) => {
    selectArr.value = []
    drawer.value = true
    roleTargetId.value = row.id
    const r = await reqAllMenuList(row.id)
    console.log(r);
    if (r.code === 200) {
        menuArr.value = r.data
        selectArr.value = getAllTreeData(r.data)
    }
    // menuArr = getAllTreeData(d.data)
}
//筛选数据，用于渲染el-tree组件中，用户已有的权限，使这些职位前的复选框处于选中状态
const getAllTreeData = (data: any) => {
    let result: number[] = []
    function func(data: any, result: number[]) {
        data.forEach((item: any) => {
            if (item.level === 4 && item.select) {
                result.push(item.id)
            }
            if (item.children && item.children.length > 0) {
                func(item.children, result)
            }
        })
    }
    func(data, result)
    return result
}
//确认分配权限按钮
const handler = async () => {
    //获取组件中所有全选节点的ID
    let allSecletList = tree.value.getCheckedKeys();
    //获取组件中所有半选的ID
    let halfSelectList = tree.value.getHalfCheckedKeys();
    // console.log(allSecletList, halfSelectList);
    //全选和半选的id组合在一起作参数发送ajax
    const total = allSecletList.concat(halfSelectList)
    const r: any = await reqSetPermisstion(roleTargetId.value, total)
    if (r.code === 200) {
        drawer.value = false
        ElMessage({
            type: 'success',
            message: 'Success Change!'
        })
        //重新获取用户信息，🟥防止用户修改自身权限后，左侧菜单栏的权限没有重新获取，实际上一些权限的消失会随着菜单栏相应权限的消失
        window.location.reload()
    }
}

</script>

<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="info" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="success" size="default" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0px;" :data="allRole">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建世间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <!-- row:已有的职位对象 -->
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
                    <el-button type="info" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
    </el-card>
    <!-- 添加职位与更新已有职位的结构:对话框 -->
    <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件:分配职位的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" :default-expand-all="true"
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="handler">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss"></style>