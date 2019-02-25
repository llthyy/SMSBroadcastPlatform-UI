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
          <Select v-model="formValidate.userRole"  placeholder="请选择角色" @on-open-change="getRoleData" filterable clearable style="width:160px">
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
        input: "",
        desc:"",
        input1: "",
        input2: "",
        input3:"",
      },
      ruleValidate: {
        userName: [
          {required: true,message: "姓名不能为空",trigger: "change"}
        ],
        loggerName: [
          {required: true,message: "登录账户不能为空",trigger: "change"}
        ],
        loggerPassworld: [
          {required: true,message: "登录密码不能为空",trigger: "change"}
        ],
        userPhone: [
          {required: true,message: "联系方式不能为空",trigger: "change"},
          {pattern:/^[0-9]{11}$/,message: "必须为11位数字值",trigger: "change"}
          // {len:11,message: "必须为11位数字值",trigger: "change"}
        ],
        userRole: [
          {required: true,message: "所属角色不能为空",trigger: "change"}
        ],
      },

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },

        {
          title: "性别",
          key: "agender"
        },
        {
          title: "登录名",
          key: "loginname"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "联系方式",
          key: "contact"
        },
        {
          title: "所属角色",
          key: "role"
        },
        {
          title: "功能",
          key: "action",
          width: 200,
          align: "center",
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
                "查看"
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
                      this.edit(params.row._id);
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
                      this.remove(params.row._id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      ids:[],
      data: [],
      total: 0,
      page: 1,
      list: 10,
      input2:'',
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
    //获取数据
    getData() {
      this.axios({
        method: "post",
        url: `${this.baseUrl}/user/findAll?page=${this.page -
          1}&size=${this.list}`,
      }).then(res => {
        console.log(999,res.data.body.content);
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    //添加修改数据
    addUser(){
      this.modal1 = true;
    },
    show(index) {
      this.$Modal.info({
        title: "",
        content: `姓名：${this.data[index].articalname}<br>
                             性别：${this.data[index].authorname}<br>
                             登录名：${
                               this.data[index].postingtime
                             }<br>
                            密码：${this.data[index].content}<br>
                             联系方式：${this.data[index].Lastreviewer}<br>
                             所属角色：${
                               this.data[index].Lastreviewtime
                             }<br>
                             `
      });
    },
    edit(id) {
      /* console.log('修改啊'); */
      this.axios({
        url: `http://10.31.162.59:3000/forum/${id}`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.formValidate = res.data;
        this.formValidate.input = res.data.articalname;
        this.formValidate.desc = res.data.content;
        this.formValidate.input1 = res.data.authorname;
        this.formValidate.input3 = res.data.postingtime;
        this.formValidate.input4 = res.data.Lastreviewer;
        this.formValidate.input5 = res.data.Lastreviewtime;
        this.formValidate.input6 = res.data.Pointofpraise;
        this.modal1 = true;
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    getData() {
      this.axios({
        method: "post",
        url: "http://10.31.162.59:3000/forum/list",
        data: {
          page: this.page,
          limit: this.list
        }
      }).then(res => {
        this.total = res.data.total;
        this.data = res.data.docs;
      });
    },
    asyncOK() {
      setTimeout(() => {
        this.modal1 = false;
      }, 500);
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
        url: "http://10.31.162.59:3000/forum/list",
        data: {
          page: this.page,
          limit: this.list,
          articalname: this.input2
        }
      }).then(res => {
        this.total = res.data.total;
        this.data = res.data.docs;
      });
    },
    remove(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该记录吗?</p>",
        onOk: () => {
          this.axios({
            url: `http://10.31.162.59:3000/forum/${id}`,
            method: "delete"
          }).then(res => {
            alert("你已经删除成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    },
    // 多选删除
    removes() {
      console.log(this.ids);
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该记录吗?</p>",
        onOk: () => {
          this.axios({
            url: `http://10.31.162.59:3000/forum`,
            method: "delete",
            data: {
              ids: this.ids
            }
          }).then(res => {
            alert("你已经删除成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("Clicked cancel");
        }
      });
    },
    // 在此函数进行帖子提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        var misstimel = new Date(this.formValidate.date);
        var misstimeleft = misstimel.toLocaleDateString();
        let misstime = misstimeleft + " " + this.formValidate.time;
        if (this.formValidate._id) {
          this.axios({
            url: `http://10.31.162.59:3000/forum/${this.formValidate._id}`,
            method: "put",
            data: {
              articalname: this.formValidate.input,
              authorname: this.formValidate.input1,
              postingtime: this.formValidate.input3,
              Lastreviewer: this.formValidate.input4,
              Lastreviewtime: this.formValidate.input5,
              Pointofpraise: this.formValidate.input6,
              content: this.formValidate.desc
            }
          }).then(res => {
            this.modal1 = false;
            this.$refs[name].resetFields();
            this.getData();
          });
        } else {
          this.axios({
            method: "post",
            url: "http://10.31.162.59:3000/forum",
            data: {
              articalname: this.formValidate.input,
              authorname: this.formValidate.input1,
              postingtime: this.formValidate.input3,
              Lastreviewer: this.formValidate.input4,
              Lastreviewtime: this.formValidate.input5,
              Pointofpraise: this.formValidate.input6,
              content: this.formValidate.desc
            }
          }).then(res => {
            this.modal1 = false;
            this.$refs[name].resetFields();
            this.getData();
          });
        }
      });
    }
  },

  mounted() {
    this.getData();
  }
};
</script>