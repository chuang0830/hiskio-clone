<template>
    <div class="inset-0 bg-[#000000b3] absolute z-[100]" :class="{ 'block': loginOpen, 'hidden': loginOpen == false }">
        <div
            class="absolute w-[450px] top-[10%] left-[50%] translate-x-[-50%] bg-[url('@/assets/icon/bg-login.png')] bg-cover bg-no-repeat bg-white py-6 rounded">
            <div class="relative">
                <img class="w-[120px] mx-auto" src="../assets/icon/hiskio.svg" alt="hiskio">
                <img class="absolute top-[-5px] right-4 cursor-pointer" src="../assets/icon/close.svg" alt="close"
                    @click="openLogin">
            </div>
            <div class="flex justify-center pt-5">
                <p class="tab cursor-pointer" :class="{ 'text-primary border-b-4 border-primary': tab == 'login' }"
                    @click="changeTab('login')">登入
                </p>
                <p class="tab cursor-pointer" :class="{ 'text-primary border-b-4 border-primary': tab == 'signin' }"
                    @click="changeTab('signin')">註冊</p>
            </div>
            <div class="w-10/12 mx-auto mt-6">
                <SocialItem />
                <div v-if="tab === 'login'" class="text-center">
                    <p class="inline-block mb-4 text-gray">使用 HiSKIO ID 登入</p>
                    <form @submit.prevent="handleSubmit" :model="formData">
                        <input class="login-input bg-[url('@/assets/icon/account.svg')] bg-no-repeat bg-[10px]" type="text"
                            id="account" name="account" placeholder="請輸入HiSKIO ID" v-model="formData.account"
                            :class="{ 'error-status': error.includes('account') }">
                        <p v-if="error.includes('account')" class="text-left text-[#e25252] mt-[-5px] mb-2">{{
                            message.account }}</p>
                        <input class="login-input bg-[url('@/assets/icon/lock.svg')] bg-no-repeat bg-[10px]" type="password"
                            id="password" name="password" placeholder="請輸入登入密碼" v-model="formData.password"
                            :class="{ 'error-status': error.includes('password') }">
                        <p v-if="error.includes('password')" class="text-left text-[#e25252] mt-[-5px] mb-2">{{
                            message.password }}</p>
                        <div class="text-left mb-4">
                            <input type="checkbox" id="confirm" name="confirm" class="color-black" checked
                                v-model="formData.confirm">
                            <label for="confirm" class="text-gray-light">登入註冊即代表您同意使用者及隱私權政策</label>
                        </div>
                        <button class="w-[100%] py-2 rounded-md mb-3 bg-primary text-white">登入</button>
                        <p class="mb-3 text-gray-light">忘記密碼</p>
                    </form>
                </div>
                <div v-if="tab === 'signin'" class="text-center">
                    <p class="inline-block mb-4 text-gray">使用 HiSKIO ID 註冊</p>
                    <div class="text-left mb-4">
                        <input type="checkbox" id="confirm" name="confirm" class="color-black" :checked="formData.confirm"
                            v-model="formData.confirm">
                        <label for="confirm" class="text-gray-light">登入註冊即代表您同意使用者及隱私權政策</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as $api from "@/library/api";
import SocialItem from "../components/SocialItem.vue";
export default {
    props: ["loginOpen", "tab"],
    components: {
        SocialItem,
    },
    data() {
        return {
            formData: {
                account: '',
                password: '',
                confirm: 'true'
            },
            error: [],
            message: { account: '請輸入帳號', password: '請輸入密碼' }
        }
    },
    methods: {
        openLogin() {
            this.$emit("openLogin", false)
        },
        changeTab(param) {
            this.$emit("changeTab", param)
        },
        handleSubmit(e) {
            e.preventDefault()
            this.error = []
            for (const [key, value] of Object.entries(this.formData)) {
                if (!value) {
                    this.error.push(key)
                }
            }
            const _error = [...new Set(this.error)];
            this.error = _error
            if (this.error.length === 1 && this.error.includes('confirm')) {
                alert('你尚未同意 HiSKIO 使用者及隱私權政策')
            }
            if (this.error.length === 0) {
                this.fetchToServer(this.formData)
            }
        },
        async fetchToServer(param) {
            try {
                const { data, status } = await $api.login(param);
                if (status === 200) {
                    this.openLogin()
                    localStorage.setItem('token', data.access_token)
                    this.fetchMember()
                    this.postCartList()
                }

            } catch (error) {
                const { response: { data } } = error
                if (data?.message) {
                    if (data.message?.password) {
                        [this.message.password] = data.message.password
                        this.error.push('password')
                    };
                    if (data.message?.account) {
                        [this.message.account] = data.message.account
                        this.error.push('account');
                    }
                }
            }
        },
        async fetchMember() {
            const { data } = await $api.member();
            const user = {
                isLoggedIn: true,
                name: data.username,
                avatar: data.avatar,
            }
            localStorage.setItem('user', JSON.stringify(user))
            this.$store.commit('setLoggedIn', user)
        },
    },
    destroyed: function () {
        const _formData = {
            account: '',
            password: '',
            confirm: 'true'
        }
        const _message = { account: '請輸入帳號', password: '請輸入密碼' }
        this.formData = _formData
        this.message = _message
    }
}
</script>
