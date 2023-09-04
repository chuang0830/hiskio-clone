<template>
    <div>
        <header class="w-100 shadow-md relative z-50 bg-white">
            <div class="flex mx-auto justify-between py-2 px-6  xl:px-0 max-w-screen-xl">
                <div class="self-center flex items-center">
                    <img class="w-[66px] mr-4 md:w-[100px] " src="../assets/icon/hiskio.svg" alt="hiskio">
                    <input class="hidden bg-[url('@/assets/icon/search.svg')] bg-no-repeat bg-left-center pl-5 md:block"
                        placeholder="搜尋">
                    <img class="block md:hidden" src="../assets/icon/search.svg" alt="search">
                </div>
                <div v-if="getLoggedIn" class="items-center hidden md:flex">
                    <p class="text-gray mr-2">我想開課</p>
                    <p class="text-gray mr-2">我的學習</p>
                    <div class="mr-3"><img src="../assets/icon/cart.svg" alt="cart"></div>
                    <div class="group relative cursor-pointer">
                        <div class="w-[32px] h-[32px] rounded-[50%] overflow-hidden mr-2"><img :src="getUser.avatar"
                                alt="avatar">
                        </div>
                        <div class="hidden right-0 top-4 absolute cursor-auto group-hover:block">
                            <div class="w-[230px] bg-white rounded-md shadow-md relative top-8">
                                <div class="flex items-center pt-4 pl-4">
                                    <div
                                        class="w-[54px] h-[54px] rounded-[50%] overflow-hidden shrink-0 mr-2 border border-primary">
                                        <img :src="getUser.avatar" alt="avatar">
                                    </div>
                                    <div class="overflow-hidden">
                                        <p class="text-gray">{{ $store.state.user?.name }}</p>
                                        <p class="text-gray-light truncate text-xs">eilleen50830@hotmail.com</p>
                                    </div>
                                </div>
                                <div class="border-y border-[#D9D9D9] my-2 pb-2">
                                    <p class="py-2 pl-4 text-gray">任務版</p>
                                    <p class="py-2 pl-4 text-gray">我的抵用卷</p>
                                    <p class="py-2 pl-4 text-gray">我的錢包</p>
                                    <p class="py-2 pl-4 text-gray">訂單記錄</p>
                                    <p class="py-2 pl-4 text-gray">帳戶設定</p>
                                </div>
                                <div class="pt-2 pb-3 pl-4 text-gray cursor-pointer">
                                    會員登出
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div v-else class="items-center hidden md:flex">
                    <p class="text-gray mr-2">我想開課</p>
                    <div class="mr-6"><img src="../assets/icon/cart.svg" alt="cart"></div>
                    <button class="bg-white text-primary btn border-primary border mr-2"
                        @click="openLogin('login')">登入</button>
                    <button class="bg-primary text-white btn" @click="openLogin('signin')">註冊</button>
                </div>
                <!-- mobile -->
                <div class="flex md:hidden">
                    <img class="mr-4" src="../assets/icon/cart.svg" alt="cart">
                    <img :class="{ 'hidden': ham, 'block': ham == false }" src="../assets/icon/menu.svg" alt="menu"
                        @click="openMenu(true)">
                    <img :class="{ 'block': ham, 'hidden': ham == false }" src="../assets/icon/close.svg" alt="close"
                        @click="openMenu(false)">
                </div>
            </div>
        </header>
        <div v-if="getLoggedIn" class="absolute w-screen bg-[#FAFAFA] top-[36px] z-10 pt-8 h-screen md:hidden"
            :class="{ 'block': ham, 'hidden': ham == false }">
            <div class="flex px-4 align-center mb-4">
                <div class="w-[40px] h-[40px] rounded-[50%] overflow-hidden mr-3"><img :src="getUser.avatar" alt="avatar">
                </div>
                <span class="text-base text-gray font-bold">{{ getUser.name }}</span>
            </div>
            <hr class="border-[#D9D9D9]">
            <p :class="{ 'focus-active': focus === 'crouse' }" class="nav-item" @click="focusMenu('crouse')">我的課程</p>
            <p :class="{ 'focus-active': focus === 'coupon' }" class="nav-item" @click="focusMenu('coupon')">我的抵用券</p>
            <p :class="{ 'focus-active': focus === 'mission' }" class="nav-item" @click="focusMenu('mission')">任務版</p>
            <p :class="{ 'focus-active': focus === 'orderlist' }" class="nav-item" @click="focusMenu('orderlist')">訂單記錄</p>
            <p :class="{ 'focus-active': focus === 'setting' }" class="nav-item" @click="focusMenu('setting')">帳戶設定</p>
            <p :class="{ 'focus-active': focus === 'class' }" class="nav-item mb-3" @click="focusMenu('class')">我開設的課</p>
            <p :class="{ 'focus-active': focus === 'exporing' }" class="nav-item" @click="focusMenu('exporing')">探索課程
            </p>
            <hr class="border-[#D9D9D9]">
            <p class="nav-item" @click="logout">登出</p>
        </div>
        <div v-else class="absolute w-screen bg-[#FAFAFA] top-[36px] z-10 pt-8 h-screen md:hidden"
            :class="{ 'block': ham, 'hidden': ham == false }">
            <p :class="{ 'focus-active': focus === 'exporing' }" class="nav-item" @click="focusMenu('exporing')">探索課程</p>
            <p :class="{ 'focus-active': focus === 'company' }" class="nav-item" @click="focusMenu('company')">企業方案</p>
            <hr class="border-[#D9D9D9]">
            <p class="nav-item" @click="openLogin('login')">登入</p>
            <p class="nav-item text-primary" @click="openLogin('signin')">註冊</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: ["loginOpen"],
    data() {
        return {
            focus: '',
            ham: false
        }
    },
    computed: {
        ...mapGetters(['getLoggedIn', 'getUser']),
    },
    methods: {
        focusMenu(param) {
            this.focus = param
        },
        openMenu(param) {
            this.ham = param
        },
        openLogin(param) {
            this.$emit("openLogin", true, param)
        },
        logout() {
            this.$store.commit('setLogout')
        }
    }
}
</script>
