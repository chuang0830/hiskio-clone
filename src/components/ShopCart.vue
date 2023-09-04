<template>
    <div class="grid grid-cols-1 mb-6 gap-y-4 lg:mb-20 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-0">
        <div class="row-span-1 lg:col-span-2">
            <h2 class="section-title">購物車</h2>
            <div class="rounded-md  shadow-md  bg-white ">
                <table class="hidden w-full text-sm text-left text-[#595959]  md:table">
                    <thead class="text-[#8c8c8c] border-b border-[#D9D9D9] table-header-group">
                        <tr class="table-row">
                            <th scope="col" class="px-6 py-3 table-cell">
                                項目
                            </th>
                            <th scope="col" class="px-6 py-3 table-cell">
                                售價
                            </th>
                            <th scope="col" class="px-6 py-3 table-cell">
                                結帳金額
                            </th>
                            <th scope="col" class="px-6 py-3 table-cell">
                            </th>
                        </tr>
                    </thead>
                    <tbody class="table-row-group">
                        <tr v-for="item in getCarts" :key="item.key" class="border-b border-[#D9D9D9] last:border-none">
                            <th scope="row" class="px-6 py-4 font-medium flex">
                                <div class="w-[128px] overflow-hidden rounded-md mr-4">
                                    <img class="w-full h-full object-cover" :src="item.image" alt="">
                                </div>
                                <div class="w-[180px] text-base xl:w-[220px]">
                                    {{ item.title }}
                                </div>
                            </th>
                            <td class="px-6 py-4 text-lg text-[#8c8c8c]">
                                {{ item.price }}
                            </td>
                            <td class="px-6 py-4 text-xl">
                                {{ item.price }}
                            </td>
                            <td class="px-6 py-4">
                                <img class="cursor-pointer" src="../assets/icon/trash.svg" alt=""
                                    @click="removeItem(item.key)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-for="item in getCarts" :key="item.key" class="md:hidden px-4 py-3 border-b border-[#D9D9D9]">
                    <div class="flex justify-between gap-x-4 items-start">
                        <div class="mb-3 flex flex-nowrap">
                            <img class="w-[62px] h-[34px] inline-block mr-2 rounded-sm" :src="item.image" alt="">
                            <span class="inline-block text-gray break-all"> {{ item.title }}</span>
                        </div>
                        <img src="../assets/icon/trash.svg" alt="" @click="removeItem(item.key)">
                    </div>
                    <div class="flex justify-between">
                        <p class="text-[#8c8c8c] text-sm"> {{ item.price }}</p>
                        <p class="text-gay"> {{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-span-1">
            <h2 class="section-title">小計</h2>
            <div class="rounded-md  shadow-md  bg-white px-4 py-4">
                <p class="text-sm text-[#8c8c8c] mb-2">請輸入折扣碼</p>
                <div class="flex mb-4">
                    <input
                        class="border rounded w-full lg:w-[180px] border-[#D9D9D9] leading-6 md:leading-10 lg:mr-4 xl:w-[260px]"
                        type="text">
                    <button class="hidden py-2 px-2 bg-red-300 text-red-600 grow rounded lg:block">確定</button>
                </div>
                <div class="text-gray underline my-4">選擇抵用券</div>
                <hr class="border-[#D9D9D9] mb-4">
                <div class="flex justify-between mb-2">
                    <span class="text-base text-[#8c8c8c]">金額</span>
                    <span class="text-base text-[#8c8c8c]">${{ getTotal }}</span>
                </div>
                <p class="text-3xl text-right">${{ getTotal }}</p>
                <button class="block w-full text-center py-2 md:py-4 text-white bg-red-600 rounded my-2">前往結帳</button>
                <span class="text-sm text-[#8c8c8c]">點擊上方按鈕即表示您已閱讀並同意HiSKIO購買與退費政策</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as $api from "@/library/api";
export default {
    data() {
        return {
            total: 0
        }
    },
    computed: {
        ...mapGetters(['getCarts', 'getTotal']),
    },
    mounted() {
        this.getCartList()
    },
    methods: {
        async removeItem(targetId) {
            if (this.$store.state.user.isLoggedIn) {
                const pickedItem = this.$store.state.carts.filter((item) => item.key === targetId).map(value => {
                    return {
                        id: targetId,
                        "coupon": ""
                    }
                })
                const { data } = await $api.deleteCart({ "items": pickedItem, "coupons": [] });
                if (data.includes('OK')) {
                    const newCartList = this.$store.state.carts.filter((item) => item.key !== targetId)
                    this.$store.commit('setCarts', newCartList)
                    localStorage.setItem('cartList', JSON.stringify(newCartList))
                }

            } else {
                const cartList = JSON.parse(localStorage.getItem('cartList'))
                const targetIndex = cartList.map((item) => item.key).indexOf(targetId)
                cartList.splice(targetIndex, 1)
                localStorage.setItem('cartList', JSON.stringify(cartList))
                this.getCartList()
            }
        },
        getCartList() {
            const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
            this.$store.commit('setCarts', cartList)
        }
    }
}
</script>
