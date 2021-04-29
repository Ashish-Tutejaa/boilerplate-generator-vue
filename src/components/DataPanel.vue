<template>
   <div class='data-panel-wrapper'>
      <!-- <div class="selected">{{thingFor}}</div> -->
      <h3>data</h3>
      <div>
        <input placeholder="add a key" v-model='inp' type="text"/>
        <p>-</p>
        <input placeholder="add a value" @keypress.enter="add" v-model='inpval' type="text"/>
      </div>

      <div class='adder'>
         <span class='item' v-for='(x,i) in comp["data"]' :key='i'>
            {{x}}
          </span>
      </div>
  </div>
</template>

<script> 
export default {
    props : ['comp'],
    data(){
        return {
            inp : '',
            inpval: ''
        }
    },
    methods: {
        sendUp(name,arg){
            this.$parent.$emit(name,arg);
        },
        add(){
            console.log('adding');
            if(this.inp.length === 0 || this.inpval.length === 0){
                alert('you must provide input');
                return;
            }
            let t = JSON.parse(JSON.stringify(this.$props.comp));
            t.data.push({
                [this.inp] : this.inpval
            });
            console.log(t);
            this.sendUp('updateComp', t);
            this.inp = '';
            this.inpval = '';
        }
    }
}
</script>

<style scoped>
 .data-panel-wrapper{
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
        display: inline-block;
        width: 120px;
    }
    p{
        display: inline;
        color: white;
        font-size: 1.5rem;
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