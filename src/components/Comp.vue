<template>
    <div :class='{
        piece: true,
    }'>
    </div>
</template>

<script>
export default {
props: ['uid']
}
</script>

<style scoped>
.piece{
    background: white;
    width: 120px;
    height: 120px;
    margin: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 5px;
    background: #303744;
    border: 2px solid #1cc5dc;
}
</style>