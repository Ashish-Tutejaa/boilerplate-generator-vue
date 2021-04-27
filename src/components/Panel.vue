<template>
  <div v-if='["props", "emits"].includes(property)'>
      
  </div>
</template>

<script>
export default {
    props : ['property', 'current']
}
</script>

<style scoped>
.panel{
    width: 100%;
    padding: 0px;
    margin: 0px;
    margin-top: 20px;
    height: fit-content;
    border-top: 1px solid rgba(128, 128, 128, 0.438);
}
</style>