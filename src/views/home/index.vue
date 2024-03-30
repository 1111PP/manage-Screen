<template>
    <el-card>
        <div class="box">
            <img :src="userStore.userInfo.avatar" alt="" class="avatar">
            <div class="bottom">
                <h3 class="title">{{ getTime() }} {{ userStore.userInfo.name }}</h3>
                <p class="subtitle">欢迎</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="400px" height="300px"></svg-icon>
    </div>
</template>
  
<script setup lang="ts">
import { getTime } from '@/utils/time';
//引入用户相关的仓库,获取当前用户的头像、昵称
import { useUserData } from '@/store/module/user.ts';
//获取存储用户信息的仓库对象
let userStore = useUserData();

</script>
  
<style scoped lang="scss">
.box {
    display: flex;
    align-items: center;

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .bottom {
        margin-left: 20px;

        .title {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .subtitle {
            font-style: italic;
            color: skyblue;
        }
    }
}

.bottoms {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>