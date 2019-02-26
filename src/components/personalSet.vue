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
            <Input type="username" v-model="formCustom1.username" disabled></Input>
        </FormItem>
        <FormItem label="原密码" prop="passwd">
            <Input type="passward" v-model="formCustom1.passwd" disabled></Input>
        </FormItem>
    </Form>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="新密码" prop="passwd">
            <Input type="passward" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认新密码" prop="pwdCheck">
            <Input type="passward" v-model="formCustom.pwdCheck"></Input>
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
                   username: '',
                    passwd: '',
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
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                    console.log(this.$refs[name])
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>