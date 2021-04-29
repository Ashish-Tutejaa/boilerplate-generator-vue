<template>
  <div
    :class="{
      piece: true,
    }"
  >
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: ["uid", "name"],
};
</script>

<style scoped>
.piece {
  background: white;
  width: 80px;
  height: 80px;
  margin: 10px;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 5px;
  background: #303744;
  border: 2px solid #1cc5dc;
  overflow: hidden;
}
h3 {
  width: 100%;
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0px;
  padding: 4px;
  background: #96d6de21;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>