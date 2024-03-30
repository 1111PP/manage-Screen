<script lang='ts' setup>
import { ref, nextTick, watch, reactive, onMounted } from 'vue'
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user'
import type { SetRoleData, UserResponseData, Records, User, AllRoleResponseData, AllRole } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus'
import { fi } from 'element-plus/es/locale';
//默认页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(5);
//用户总个数
let total = ref<number>(0);
//存储全部用户的数组
let userArr = ref<Records>([]);
//抽屉组件开关
const drawer = ref<boolean>(false);
//收集用户信息
let userParams = reactive<User>({
    username: '',
    name: '',
    password: ''
});
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([]);
//获取form组件实例
let formRef = ref<any>();

//分页器修改操作,每次修改,带着当前已修改数据,请求最新品牌列表数据
watch([pageNo, pageSize], () => {
    getHasUser(pageNo.value)
})

//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, '');
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
onMounted(() => {
    getHasUser(pageNo.value)
})

//用户搜索查询用户的input内容
const searchContent = ref<string>('')
const searchUser = async () => {
    const r = await reqUserInfo(pageNo.value, pageSize.value, searchContent.value)
    if (r.code === 200) {
        total.value = r.data.total;
        userArr.value = r.data.records;
    }
}
const refresh = () => {
    searchContent.value = ''
    getHasUser(pageNo.value)
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, cb: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 5) {
        cb();
    } else {
        cb(new Error('用户名字至少五位'))
    }
}
//校验用户名字回调函数
const validatorname = (rule: any, value: any, cb: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 5) {
        cb();
    } else {
        cb(new Error('用户昵称至少五位'))
    }
}
const validatorPassword = (rule: any, value: any, cb: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 6) {
        cb();
    } else {
        cb(new Error('用户密码至少六位'))
    }
}
//表单校验的规则对象
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorname }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

//添加用户信息按钮
const addUser = () => {
    drawer.value = true
    Object.assign(userParams, {
        username: '',
        name: '',
        password: '',
        id: 0
    })
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('password');
    });
}

//编辑用户信息按钮
const updateUser = (row: User) => {
    drawer.value = true
    Object.assign(userParams, row)
    //清除上一次的由于编辑导致的错误的提示信息，因为它残留而未清除
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
    });
}
//删除单个用户
const delUser = async (row: User) => {
    const r = await reqRemoveUser((row.id as number))
    if (r.code === 200) {
        ElMessage({
            type: 'success',
            message: 'Success Del'
        })
        getHasUser(userArr.value.length == 1 ? pageNo.value - 1 : pageNo.value)
    } else {
        ElMessage({
            type: 'error',
            message: 'Failed Del'
        })
    }

}
//记录批量删除用户
const delUserList = ref<User[]>([])
//table事件，记录所有复选框选中用户的信息
const selectChange = async (value: User[]) => {
    // console.log(value);
    delUserList.value = value
}
//批量删除按钮
const deleteSelectUser = async () => {
    const idList = delUserList.value.map(item => item.id)
    if (idList.length) {
        const r: any = await reqSelectUser((idList as number[]))
        if (r.code === 200) {
            ElMessage({
                type: 'success',
                message: 'Success Del'
            })
            getHasUser(userArr.value.length == 1 ? pageNo.value - 1 : pageNo.value)
        } else {
            ElMessage({
                type: 'error',
                message: 'Failed Del'
            })
        }
    } else {
        ElMessage({
            type: 'warning',
            message: '请选择需要删除的用户'
        })
    }
}

const cancel = () => {
    drawer.value = false
}
const save = async () => {
    //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
    formRef.value.validate().then(async () => {
        //保存按钮:添加新的用户|更新已有的用户账号信息
        let result: any = await reqAddOrUpdateUser(userParams);
        console.log(result);
        //添加或者更新成功
        if (result.code == 200) {
            //关闭抽屉
            drawer.value = false;
            //提示消息
            ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
            //🟥🟥🟥与其他保存不同，更新这个属于username和password这种敏感信息，如果你改动的是自己的账号，那么当前你的账号密码就作废了，必须回到登录页，即重新检测你的账号密码信息，最好的方法，就是刷新页面，就会触发全局前置路由守卫，于是检测到
            window.location.reload()
        } else {
            //关闭抽屉
            drawer.value = false;
            //提示消息
            ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' });
        }
    }, () => {
        //提示消息
        ElMessage({ type: 'error', message: '表单校验失败' });
    })
}

//控制分配角色职位的抽屉
const drawer2 = ref<boolean>(false)
const userName = ref<string>('')
//负责收集用户角色的数据，用户名以及当前用户的角色（✨可同时有多种）
const roleParams = ref<any>({
    id: 0,
    roleList: []
})
//记录平台所有的角色
const allRole = ref<AllRole>([])
//分配角色按钮
const setPermisstion = async (row: any) => {
    roleParams.value.roleList = []
    roleParams.value.id = 0
    drawer2.value = true
    const r: AllRoleResponseData = await reqAllRole(row.id)
    console.log(r)
    //保存信息
    allRole.value = r.data.allRolesList//全部职位信息列表
    userName.value = (row.username as string)//用户名称
    roleParams.value.id = row.id//用户id
    //用户当前所拥有的职位列表
    roleParams.value.roleList.push(...r.data.assignRoles.map(item => item.id))
    //开局检测一次用户所拥有权限，控制全选按钮
    handleCheckedCitiesChange(roleParams.value.roleList)
}
//全选按钮操作
const checkAll = ref<boolean>(false)
const handleCheckAllChange = () => {
    if (checkAll.value) {
        roleParams.value.roleList = allRole.value.map(item => item.id)
    } else {
        roleParams.value.roleList = []
    }
}
//当el-checkbox-group组件绑定值roleList变化时触发的事件，参数默认为当前v-model绑定值,用于解决单个checkbox也可控制全选checkbox的选中状态,😂给每个el-checkbox绑定change事件也可也实现
const handleCheckedCitiesChange = (value: number[]) => {
    checkAll.value = value.length === allRole.value.length ? true : false
}
//确认分配职位按钮
const confirmClick = async () => {
    const userId = roleParams.value.id
    const roleIdList = roleParams.value.roleList
    const r = await reqSetUserRole({
        userId, roleIdList
    })
    // console.log(r);
    if (r.code == 200) {
        drawer2.value = false
        getHasUser(pageNo.value)
    }
}

</script>

<template>
    <!-- <h1>用户管理</h1> -->
    <el-card style="height:80px">
        <el-form class="form" :inline="true">
            <el-form-item label="用户名">
                <el-input v-model="searchContent" placeholder="请你输入搜索用户名" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="searchUser" type="primary" icon="search">搜索</el-button>
                <el-button @click="refresh" type="info" icon="Refresh">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary" @click="addUser" icon="plus">添加</el-button>
        <el-button type="danger" @click="deleteSelectUser" icon="delete">批量删除</el-button>
        <el-table @selection-change="selectChange" border style="margin-top: 10px;" :data="userArr">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="name" label="用户昵称" width="100">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="roleName" label="用户角色" width="100">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" width="100">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template #="{ row, index }">
                    <el-button size="small" icon="user" type="primary" @click="setPermisstion(row)">分配角色</el-button>
                    <el-button size="small" icon="edit" type="warning" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`确定删除?`" width="200px" @confirm="delUser(row)">
                        <template #reference>
                            <el-button v-has="`btn.User.remove`" size="small" icon="delete" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 10px;" v-model:current-page="pageNo" v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 30]" :background="true" :disabled="false"
            layout="  prev, pager, next,sizes,->,jumper,total" :total="total" />
    </el-card>
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '修改用户信息' : '添加用户信息' }}</h4>
        </template>
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户账号" prop="username">
                    <el-input placeholder="请您输入用户账号" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </template>
    </el-drawer>
    <el-drawer v-model="drawer2">
        <template #header>
            <h3>
                分配用户角色
            </h3>
        </template>
        <template #default>
            <el-form :model="roleParams">
                <el-form-item label="用户姓名">
                    <el-input :disabled="true" v-model="userName"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox @change="handleCheckAllChange" v-model="checkAll">全选
                        <!-- :indeterminate="isIndeterminate" -->
                    </el-checkbox>
                    <!-- v-model绑定数据会 -->
                    <el-checkbox-group @change="handleCheckedCitiesChange" v-model="roleParams.roleList">
                        <br><el-checkbox v-for="item in allRole" :value="item.id" name="type">
                            {{ item.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="margin-right: 100px;">
                <el-button type="primary" @click="confirmClick">确定</el-button>
                <el-button @click="drawer2 = false">取消</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped lang="scss">
.form {
    display: flex;
    align-items: center;
}
</style>