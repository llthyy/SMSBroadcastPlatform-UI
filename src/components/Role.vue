<style scoped>
h1 {
  color: red;
}
</style>
<template>
  <div style="margin-top:30px;padding-left:10px">
    <div style="margin:0 0 20px 10px;font-size:20px">角色管理</div>
    <Button type="success" @click="modal1= true" style="margin-right:5px">添加角色</Button>
    <Button type="error" @click="removes" style="margin-right:5px">删除多个</Button>
    <Input search v-model="input2" placeholder="请输入姓名" :style="{width:200+'px'}" />
    <Button type="info" @click="sousuo">搜索</Button>
    <Modal v-model="modal1" title="修改信息" :loading="loading" @on-ok="asyncOK">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="角色名称" prop="input">
          <Input v-model="formValidate.input" placeholder="请输入姓名"></Input>
        </FormItem>

        <FormItem label="角色说明" prop="desc">
          <Input v-model="formValidate.desc" placeholder="请输入性别"></Input>
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
        desc: "",
        input1: "",
        input2: "",
        input3: ""
      },
      ruleValidate: {
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        desc: [
          //{ required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          /*  {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          } */
        ]
      },
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
        },
        {
          title: "角色说明",
          key: "roleDetails"
        },
        {
          title: "相关操作",
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
      data: [],
      total: 0,
      page: 1,
      list: 10,
      input2: "",
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
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
    //获取数据
    getData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/role/findAll?page=${this.page -
          1}&size=${this.list}`,
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    show(index) {
      console.log(this.data)
      this.$Modal.info({
        title: "",
        content: 
               `角色名称：${this.data[index].roleName}<br>
                角色说明：${this.data[index].roleDetails}<br>`
      });
    },
    edit(id) {
      /* console.log('修改啊'); */
      this.axios({
        url: `http://10.31.162.59:3000/forum/${id}`,
        method: "get"
      }).then(res => {
        this.formValidate = res.data;
        this.formValidate.input = res.data.articalname;
        this.formValidate.desc = res.data.content;
        this.modal1 = true;
      });
    },
    remove(index) {
      this.data.splice(index, 1);
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

  },
  mounted() {
    this.getData();
  }
};
</script>