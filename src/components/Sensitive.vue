<template>
 <div style="margin-top:30px;padding-left:10px">
    <div style="margin:0 0 20px 10px;font-size:20px">敏感词管理</div>
        <Button type="success" @click="modal1= true" style="margin-right:5px">添加敏感词汇</Button>
        <Button type="error" @click="removes" style="margin-right:5px">删除多个</Button>        
        <Input search  v-model="input2" placeholder="请输入关键词" :style="{width:200+'px'}" />
        <Button type="info" @click="sousuo" >搜索</Button>
        <Modal
           v-model = "modal1"
           title   = "敏感词管理"
           :loading  = "loading"
           @on-ok  = "asyncOK">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">               
                 <FormItem label="敏感词">
                    <Input v-model="formValidate.input" placeholder="请输入敏感词"></Input>
                </FormItem>                             
                    <FormItem >
                    <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
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

       /*  {
          title: "敏感词汇",
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
        }, */
        {
          title: "敏感词汇",
          key: "agender"
        },
        {
          title: "添加时间",
          key: "agender"
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
            ]);
          }
        }
      ],
      data: [],
      total: 0,
      page: 1,
      list: 10,
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "",
        content: `敏感词汇：${this.data[index].articalname}<br>
                  添加时间：${this.data[index].authorname}<br>`
      });
    },
    edit(id) {
      /* console.log('修改啊'); */
      this.$axios({
        url: `http://10.31.162.59:3000/forum/${id}`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.formValidate = res.data;
        this.formValidate.input = res.data.articalname;
        this.formValidate.desc = res.data.content;
        this.modal1 = true;
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    getData() {
      this.$axios({
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
      this.$axios({
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
    // 在此函数进行敏感词汇提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        var misstimel = new Date(this.formValidate.date);
        var misstimeleft = misstimel.toLocaleDateString();
        let misstime = misstimeleft + " " + this.formValidate.time;
        if (this.formValidate._id) {
          this.$axios({
            url: `http://10.31.162.59:3000/forum/${this.formValidate._id}`,
            method: "put",
            data: {
              articalname: this.formValidate.input,
            }
          }).then(res => {
            this.modal1 = false;
            this.$refs[name].resetFields();
            this.getData();
          });
        } else {
          this.$axios({
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
  mounted() {
    this.getData();
  }
};
</script>