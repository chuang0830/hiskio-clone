<template>
    <div>
        <h2 class="section-title">募資課程</h2>
        <div class="gap-x-[20px] overflow-x-scroll snap-x scroll-smooth pb-4 hidden md:flex">
            <div v-for="item in list" :key="item.key" class="product">
                <div class="w-full h-[153px] relative">
                    <img :src="item.image" :alt="item.title" class="block w-full h-full object-cover object-center">
                    <div class="absolute bottom-2 right-3">
                        <img class="inline-block cursor-pointer mr-2" src="../assets/icon/bookmark.svg" alt="">
                        <img class="inline-block cursor-pointer" src="../assets/icon/shopping_cart.svg" alt=""
                            @click="addCart(item.key)">
                    </div>
                </div>
                <div class="p-2">
                    <p class="h-[58px] text-gray">{{ item.title }}</p>
                    <div>
                        <img :src="item.avatar" :alt="item.writer"
                            class="w-[40px] h-[40px] rounded-[50%] inline-block mr-2">
                        <span class="text-gray-light"> {{ item.writer }}</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <small class="text-gray-light text-xs">剩三天</small>
                        <small class="text-gray-light text-xs">已募資50%</small>
                    </div>

                    <div :class="`after:w-[${item.progress}]`"
                        class="relative w-full h-[10px] bg-[#F0F0F0] rounded-[6px] my-2 overflow-hidden after:block after:absolute after:bg-red-500  after:h-full after:pseudo-content-none after:w-[50%]">
                    </div>
                    <span class="mr-1">${{ item.price }}</span>
                    <span class="text-xs text-gray-light line-through">NT${{ item.price }}</span>
                </div>
            </div>
        </div>
        <div v-for="item in list" :key="item.key" class="md:hidden">
            <div class="bg-white rounded-sm shadow-sm mb-3 px-4 py-4">
                <div class="flex justify-between">
                    <div class="grow flex">
                        <img class="w-[45%] rounded mr-1" :src="item.image" alt="">
                        <div class="w-[45%]">
                            <small class="text-gray-light text-xs">已募資50%</small>
                            <div
                                class="relative w-full h-[5px] bg-[#F0F0F0] rounded-[6px] my-2 overflow-hidden after:block after:absolute after:bg-red-500  after:h-full after:pseudo-content-none after:w-[50%]">
                            </div>
                            <span class="text-xs text-gray">${{ item.price }}</span>
                            <span class="text-xs text-gray-light line-through">${{ item.price }}</span>
                        </div>

                    </div>
                    <img class="w-[23px] h-[23px] rounded-[50%]" :src="item.avatar" alt="">
                </div>
                <p class="text-gray text-xs mt-2">{{ item.title }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import * as $api from "@/library/api";

export default {
    data() {
        return {
            list: [],
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            const { data, status } = await $api.courses();
            if (status === 200) {
                const _list = data.map(item => {
                    const { id, image, title, price, lecturers
                    } = item
                    const { avatar, username } = lecturers[0]
                    return {
                        key: id,
                        image,
                        title,
                        price,
                        avatar,
                        writer: username,
                    }
                })
                this.list = _list
            }
        },
        async addCart(targetId) {
            if (this.$store.state.user.isLoggedIn) {
                const cartItem = this.list.filter((item) => item.key === targetId).map(value => {
                    return {
                        id: targetId,
                        "coupon": ""
                    }
                })
                const { data } = await $api.postCart({ "items": cartItem, "coupons": [] });
                const _list = data.data.map(item => {
                    const { id, image, name, total,
                    } = item
                    return {
                        key: id,
                        image,
                        title: name,
                        price: total,
                    }
                })
                this.$store.commit('setCarts', _list)
                localStorage.setItem('cartList', JSON.stringify(_list))
            } else {
                const cartList = JSON.parse(localStorage.getItem('cartList')) || []
                const targetIndex = cartList.map((item) => item.key).indexOf(targetId)
                const newCartList = [...cartList]
                if (targetIndex === -1) {
                    const cartItem = this.list.filter((item) => item.key === targetId)
                    newCartList.push(...cartItem)
                } else {
                    newCartList.splice(targetIndex, 1)
                }
                this.$store.commit('setCarts', newCartList)
            }

        },
    }
}
</script>
