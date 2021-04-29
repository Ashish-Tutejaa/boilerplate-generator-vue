<template>
  <div class='array-panel-wrapper'>
      <!-- <div class="selected">{{thingFor}}</div> -->
      <h3>{{thingFor}}</h3>
          <input :placeholder="`add some ${thingFor}`" @keypress.enter="add" v-model='inp' type="text"/>
      <div class='adder'>
         <span class='item' @click='filter(x)' v-for='(x,i) in properties' :key='i'>
            {{x}}
          </span>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            inp: ''
        }
    },
    props: ["thingFor", 'comp'],
    computed : {
        properties:{
            get(){
                let t = JSON.parse(JSON.stringify(this.$props.comp));
                let arr = t[this.$props.thingFor];
                arr.sort((a,b) => {
                    if(a.length >= b.length)
                        return 1; 
                    return -1;
                })
                return arr;
            }
        }
    },
    methods : {
        sendUp(name,arg){
            this.$parent.$emit(name,arg);
        },
        filter(name){
            console.log('filter:',name, 'from', this.$props.thingFor);
            let t = JSON.parse(JSON.stringify(this.$props.comp));
            t[this.thingFor] = t[this.thingFor].reduce((acc,cur) => {
                if(cur !== name)
                    return [...acc, cur];
                else 
                    return acc;
            },[]);
            this.sendUp('updateComp',t);
        },
        add(){
            let t = JSON.parse(JSON.stringify(this.$props.comp));
            let newItems = this.$data.inp.replace(/\s/g, "").split(',');
            t[this.$props.thingFor] = [...t[this.thingFor], ...newItems];
            // t[this.$props.thingFor].push(this.$data.inp)
            this.sendUp('updateComp',t);
            this.$data.inp = '';
        }
    }
}
</script>

<style scoped>
    .array-panel-wrapper{
        /* border: 2px solid red; */
        width: 100%;
        height: fit-content;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    h3{
        color: white;
        align-self: flex-start;
        margin: 0px 10px;
    }
    .adder{
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }
    input{
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
    }
    .item{
        color: white;
        margin: 10px;
        padding: 5px;
        border-radius: 3px;
        background: rgba(97, 131, 150, 0.616);
        cursor: pointer;
    }
</style>