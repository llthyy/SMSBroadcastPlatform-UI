<style scoped>
h1 {
  color: red;
}
</style>
<template>
  <div style="margin-top:30px;padding-left:10px">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="短信服务商:" prop="level">              
            <Select v-model="formValidate.level" style="width:200px">
                 <Option value="1">中国移动</Option>
                 <Option value="2">秒滴</Option>
            </Select>
        </FormItem>
        <FormItem label="接口版本:" prop="level1" >              
            <Select v-model="formValidate.level1" style="width:200px">
                 <Option value="1">2.0</Option>
                 <Option value="2">1.0</Option>
                 <Option value="3">1.1.5</Option>
            </Select>
        </FormItem>
        <FormItem label="备注:" prop="Remarks">
              <Input type="textarea" v-model="formValidate.Remarks" placeholder="请输入备注"  style="width:200px"></Input>
        </FormItem>
        <FormItem >
            <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
            <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>  
  </div>
</template>
<script>
export default {
    data(){
        return{
            formValidate: {
                input: "",
     
            },
            ruleValidate:{

            }
        }
    },
    methods:{
      handleReset(name) {
      this.$refs[name].resetFields();
    },
    }
};
</script>