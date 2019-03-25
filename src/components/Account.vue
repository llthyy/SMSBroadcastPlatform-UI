<template>
  <div style="margin-top:30px;padding-left:10px">
    <div style="margin:0 0 20px 10px;font-size:20px">账号管理</div>
    <Button type="success" @click="addUser" style="margin-right:5px">添加账号</Button>
    <Button type="error" @click="remove" style="margin-right:5px">删除多个</Button>
    <Input search v-model="input2" placeholder="请输入姓名" :style="{width:200+'px'}" />
    <Button type="info" @click="sousuo">搜索</Button>
    <Modal v-model="modal1" title="修改信息" :loading="loading" >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="userName">
          <Input v-model="formValidate.userName" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="登录账号" prop="loggerName">
          <Input v-model="formValidate.loggerName" placeholder="请输入登录名"></Input>
        </FormItem>
        <FormItem label="登录密码" prop="loggerPassworld">
          <Input v-model="formValidate.loggerPassworld" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="联系方式" prop="userPhone">
          <Input v-model="formValidate.userPhone" placeholder="请输入联系方式"></Input>
        </FormItem>
        <FormItem label="所属角色" prop="userRole">
          <Select v-model="formValidate.userRole"  placeholder="请选择角色" filterable clearable style="width:160px">
              <Option v-for="item in userRoleData" :value="item.roleName" :key="item.roleName" >{{item.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
    <Table border ref="selection" :columns="columns1" :data="data" @on-selection-change="onSelect"></Table>
    <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        userName       : "",
        loggerName     : "",
        loggerPassworld: "",
        userRole       : "",
        userPhone      : ""
      },
      ruleValidate: {
        userName: [
          {required: true,message: "姓名不能为空",trigger: "blur"}
        ],
        loggerName: [
          {required: true,message: "登录账户不能为空",trigger: "blur"}
        ],
        loggerPassworld: [
          {required: true,message: "登录密码不能为空",trigger: "blur"}
        ],
        userPhone: [
          {required: true,message: "联系方式不能为空",trigger: "blur"},
          { type: 'number', message: '请输入数字格式',trigger: 'blur', transform(value) {
        return Number(value);
    }},
          // {len:11,message: "必须为11位数字值",trigger: "blur"}
        ],
        userRole: [
          {required: true,message: "所属角色不能为空",trigger: "blur"}
        ],
      },
      columns1: [
        {
          type : "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key  : "userName",
        },
        {
          title: "登录账号",
          key  : "loggerName"
        },
        {
          title: "登录密码",
          key  : "loggerPassworld"
        },
        {
          title: "联系方式",
          key  : "userPhone"
        },
        {
          title : "所属角色",
          key   : "userRole",
          render: function(h,params){
                   return h('div', [h('span', params.row.userRole.roleName)]);
                    }
        },
        {
          title : "功能",
          key   : "action",
          width : 200,
          align : "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data        : [],
      total       : 0,
      page        : 1,
      list        : 10,
      input2      : "",
      modal1      : false,
      loading     : true,
      userRoleData: []
    };
  },
  methods: {
    //获取数据
    getData() {
      this.axios({
        method: "post",
        url   : `${this.baseUrl}/user/findAll?page=${this.page -
          1}&size=${this.list}`,
      }).then(res => {
        console.log(999,res.data.body.content);
        this.total = res.data.body.totalElements;
        this.data  = res.data.body.content;
      });
    },
    //添加修改数据
    addUser(){
      this.modal1 = true;
      this.getRoleData();
    },
    //获取下拉框数据
    getRoleData() {
      this.axios({
        method: "get",
        url   : `${this.baseUrl}/role/findAll?page=${this.page -
          1}&size=${this.list}`,
      }).then(res => {
        this.userRoleData = res.data.body.content;
      });
    },
     // 请示数据，打开对话框，显示表单的数据，进行提交
    edit(id) {
      this.axios({
        url   : `${this.baseUrl}/user/findOne?id=${id}`,
        method: "get"
      }).then(res => {
        this.formValidate = res.data.body;
        this.modal1       = true;
      });
    },
    handleSubmit(username) {
            this.$refs[username].validate(valid => {
                if (valid) {
                    if (this.formValidate.id) {
                        this.axios({
                            url   : `${this.baseUrl}/user/addOrUpdate`,
                            method: 'post',
                            data  : this.qs.stringify(this.formValidate)
                        }).then(res => {
                            this.$Message.info("修改成功");
                            this.getData();
                            this.modal1 = false;
                        });
                    } else {
                        this.formValidate.id = -1;
                        this.axios({
                            url   : `${this.baseUrl}/user/addOrUpdate`,
                            method: 'post',
                            data  : this.qs.stringify(this.formValidate)
                        }).then(res => {
                            this.modal1 = false;
                            this.getData();
                        });
                    }
                } else {
                    this.$Message.error('提交失败!');
                }
            });
    },
    //删除数据
    remove(id) {
      this.ids.push(id);
      var params = new URLSearchParams();
      params.append("ids", JSON.stringify(this.ids));
      this.$Modal.confirm({
        title  : "确认删除？",
        content: "<p>数据删除后将不可恢复</p>",
        onOk   : () => {
          this.axios({
            method: "post",
            url   : `${this.baseUrl}/user/delete`,
            data  : params
          }).then(res => {
            this.getdeviceData(this.type);
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    //分页
    onChangePage(page) {
      this.page = page;
      if (this.input2 != "") {
        this.sousuo();
      } else {
        this.getData();
      }
    },
    onPageSizeChange(list) {
      console.log(list);
      this.list = list;
      if (this.input2 != "") {
        this.sousuo();
      } else {
        this.getData();
      }
    },
    //重置数据
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //查看详情
    show(index) {
      this.$Modal.info({
        title  : "",
        content: `姓名：${this.data[index].userName}<br>
                  登录账号：${this.data[index].loggerName}<br>
                  登录密码：${this.data[index].loggerPassworld}<br>
                  联系方式：${this.data[index].userPhone}<br>
                  所属角色：${this.data[index].userRole}<br>`
      });
    },
    onSelect(selections) {
      /*  console.log(selections); */
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i]._id);
      }
      this.ids = ids.toString();
      console.log(ids);
    },
    sousuo() {
      console.log(this.input2);
      this.axios({
        method: "post",
        url   : "http://10.31.162.59:3000/forum/list",
        data  : {
          page       : this.page,
          limit      : this.list,
          articalname: this.input2
        }
      }).then(res => {
        this.total = res.data.total;
        this.data  = res.data.docs;
      });
    },
  },

  mounted() {
    this.getData();
  }
};
</script>