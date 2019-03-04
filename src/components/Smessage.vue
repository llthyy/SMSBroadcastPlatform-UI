<style scoped>
h1 {
  color: red;
}
</style>
<template>
  <div style="margin-top:30px;padding-left:10px;width:500px">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" style="border:1px solid rgba(100, 100, 100, .1)">
        <FormItem label="短信服务商:" prop="level" style="margin-top:10px">              
            <Select v-model="formValidate.level" >
                 <Option v-for="item in leveldata" :value="item.levelName" :key="item.levelName" >{{item.levelName}}</Option>
            </Select>
        </FormItem>
        <FormItem label="接口版本:" prop="level1" >              
            <Select v-model="formValidate.level1" >
                  <Option v-for="item in leveldata1" :value="item.levelName" :key="item.levelName" >{{item.levelName}}</Option>
            </Select>
        </FormItem>
        <FormItem label="备注:" prop="Remarks">
              <Input type="textarea" v-model="formValidate.Remarks" placeholder="请输入备注"  ></Input>
        </FormItem>
        <FormItem class="fuck" style="width:100%;margin-bottom:25px">
            <div style="float: right;">
                <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </div>
        </FormItem>
    </Form>  
  </div>
</template>
<script>
export default {
    data(){
        return{
            formValidate: {
                Remarks: "",
                levelName:'',     
            },
            ruleValidate:{

            },
            leveldata:[{     
                 "levelName" : "中国移动",         
                 }, {
                 "levelName" : "秒滴",      
              }],
               leveldata1:[{     
                 "levelName" : "2.0",         
                 }, {
                 "levelName" : "1.0",      
              }, {
                 "levelName" : "1.1.5",      
              }
              ],
        }
       
    },
    methods:{
     handleSubmit(formValidate) {
      this.$refs[formValidate].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl}/provider/save`,
            method: "post",
            data: this.qs.stringify({
                name: this.formValidate.level ,
                edition: this.formValidate.level1 ,
                remarks: this.formValidate.Remarks 
            })
          }).then(res => {
            this.$Message.success("提交成功");
            this.getData();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
      handleReset(name) {
      this.$refs[name].resetFields();
     },
    getData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/provider/find`,
      }).then(res => {
        this.formValidate.level = res.data.body.name;
        this.formValidate.level1 = res.data.body.edition;
        this.formValidate.Remarks = res.data.body.remarks;
      });
    },
    
    },
    created(){
       this.getData();
    },
  
};
</script>