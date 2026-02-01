<!-- 基于 ruoyi-vue3 的 Pagination 重构，核心是简化无用的属性，并使用 ts 重写 -->
<template>
 <el-pagination>

 </el-pagination>
</template>

<script setup lang="ts">

import { computed, watchEffect } from 'vue'
import { useAppStore } from '@/store/modules/app'

defineOptions({name: 'Pagination'})
</script>
<style scoped>

</style>