<style scoped>
form {
    width: 50%;
    margin-top: 50px;
}



</style>

<template>
<div>
    <Form ref="formCustom1" :model="formCustom1" :label-width="100">
        <FormItem label="用户名" prop="username">
            <Input  v-model="username1"  disabled></Input>
        </FormItem>
        <FormItem label="原密码" prop="passwd">
            <Input  v-model="passwd1"  disabled></Input>
        </FormItem>
    </Form>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="新密码" prop="passwd">
            <Input  v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="pwdCheck">
            <Input  v-model="formCustom.pwdCheck"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button type="primary" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
    export default {
        data () {
            const pwdValidate = (rule, value, callback) => {
            if(value == ''){
                callback(new Error('新密码不能为空'));
            }
            callback();
        };
        const pwdCheckValidate = (rule, value, callback) => {
            if (this.formCustom.passwd != '' && value == '') {
                callback(new Error('确认密码不能为空'));
            } else if (this.formCustom.passwd != value && this.formCustom.passwd != '') {
                callback(new Error('新密码和确认密码应相同'));
            } else {
                callback();
            }
        };
            return {
                formCustom1: {
                   username1: '',
                    passwd1: '',
                },
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                },
                ruleCustom: {
                    passwd: [
                        { required: false,validator: pwdValidate, trigger: 'blur' }
                    ],
                    pwdCheck: [
                        { required: false,validator: pwdCheckValidate, trigger: 'blur' }
                    ],
                }
            }
        },
        
        computed: {
            username1:{
                get(){
                    return this.$store.getters.userName.username;
                },
            },
            passwd1:{
                get(){
                    return this.$store.getters.userName.loggerPassworld;
                },
            }
        },

        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       
                        this.$Message.success('提交成功!');
                    } else {
                         
                        this.$Message.error('表单验证失败!');
                       
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>