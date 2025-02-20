<script setup>
defineProps({
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    }
});

</script>
<template>
    <div class="empty-box" :style="{width: width, height: height}"></div>
</template>

