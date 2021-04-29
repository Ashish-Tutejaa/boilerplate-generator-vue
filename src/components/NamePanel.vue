<template>
   <div class="name-panel-wrapper">
          <h3>name</h3>
          <input placeholder="name" @keypress.enter="add" v-model="inp" type="text" />
        </div>
</template>

<script>
export default {
    props : ['comp'],
    data(){
        return {
            inp : ''
        }
    },
    methods : {
        sendUp(name,arg){
            this.$parent.$emit(name,arg);
        },
        add(){
            let t = JSON.parse(JSON.stringify(this.comp));
            t.name = this.inp;
            this.sendUp('updateComp',t);
            this.inp = '';
        }
    }
}
</script>

<style scoped>
.name-panel-wrapper {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}
.name-panel-wrapper h3 {
  color: white;
  align-self: flex-start;
  margin: 0px 10px;
}
.name-panel-wrapper input {
  background: none;
  color: white;
  outline: none;
  border: 0px;
  box-shadow: 0px 0px 0px 1px white;
  width: fit-content;
  border-radius: 3px;
  padding: 3px;
  margin: 20px;
  font-size: 1rem;
  display: inline-block;
  width: 200px;
}
</style>