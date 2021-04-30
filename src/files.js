const f_data = (data) => {
  let x = data.reduce((acc, cur) => {
    return Object.assign(acc, cur);
  }, {});
  console.log(x);
  return x;
};

const f_computed = (arr) => {
  let res = "\t";
  arr.forEach(
    (ele) => (res = res + `${ele} : {get(){return null}, set(val){}},\n\t\t`)
  );
  return res;
};

const f_watch = (arr) => {
  let res = "\t";
  arr.forEach((ele) => {
    if(typeof ele !== 'object'){
      (res = res + `${ele}(){}\n\t\t`)
    } else {
      (res = res + `${Object.keys(ele)[0]}(){}\n\t\t`)
    }
  });
  return res;
};

const f_components = (arr) => {
  let res = "\t";
  arr.forEach((ele) => (res = res + `"${ele}" : ${ele},\n\t\t`));
  return res;
};

const handleImports = (components) => {
  let res = "\t";
  components.forEach(
    (ele) => (res = res + `import ${ele} from './${ele}';\n\t`)
  );
  return res;
};

const generateFile = (
  {name,
  props,
  emits,
  data,
  computed,
  watch,
  components,
  methods}
) => {
  const template = `
      <template>
      </template>

      <script>
      ${handleImports(components)}
      export default {
          name : ${name},
          props : ${JSON.stringify(props)},
          emits : ${JSON.stringify(emits)},
          data(){
              return ${JSON.stringify(f_data(data))}
          },
          computed : {
            ${f_computed(computed)}
          },
          watch : {
            ${f_watch(watch)}
          },
          components : {
            ${f_components(components)}
          },
          methods : {
            ${f_watch(methods)}
          }
      };
      </script>

      <style scoped>
      </style>
  `;
  return template;
};

export default generateFile;