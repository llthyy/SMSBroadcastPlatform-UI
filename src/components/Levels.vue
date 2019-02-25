<style scoped>
h1 {
 color: red;
}
textarea {
    display: inline-block;
    width: 100%;
    height: 60px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
</style>
<template>
 <div style="margin-top:30px;padding-left:10px">
   <div style="margin:0 0 20px 10px;font-size:20px">信息调度</div>
        <Button type="success" @click="edits"  style="margin-right:5px">多个审核通过</Button>
        <Button type="error" @click="removes" style="margin-right:5px">多个审核不通过</Button> 
        <Input search  v-model="input2" placeholder="请输入标题" :style="{width:200+'px'}" />
        <Button type="info" @click="sousuo" >搜索</Button>
        <Modal
           v-model = "modal1"
           title   = "添加信息"
           :loading  = "loading"
           @on-ok  = "asyncOK">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">               
                 <FormItem label="标题" prop="input">
                    <Input v-model="formValidate.input" placeholder="请输入标题"></Input>
                </FormItem>              
               
                <FormItem label="内容" prop="desc">
                  <textarea v-model="formValidate.desc"  placeholder="请输入内容"></textarea>
                </FormItem> 

                <!-- <FormItem >
                    <Button type="primary" @click="handleSubmit('formValidate')" >提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem> -->
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
         input: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入短信内容', trigger: 'blur' },
        ]
      },

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "标题",
          key: "msgName"
        },

        {
          title: "内容",
          key: "msgContent"
        },
        {
          title: "添加时间",
          key: "msgTime"
        },
        {
          title: "审核状态",
          key: "msgAudit",
          render: function(h,params){
            if(params.row.msgAudit==0){
              params.row.msgAudit= '未审核'
            }else if(params.row.msgAudit==1){
              params.row.msgAudit= '审核已通过'
            }else if(params.row.msgAudit==2){
              params.row.msgAudit= '审核未通过'
            }
                   return h('div', [h('span',                    
                     params.row.msgAudit
                      )]);
                    }

        },
        {
          title: "功能",
          key: "action",
          width: 250,
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
                      this.edit(params.index);
                    }
                  }
                },
                "审核通过"
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
                "审核不通过"
              )
            ]);
          }
        }
      ],
      data: [],
      total: 0,
      page: 0,
      list: 10,
      input2:'',
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
    onChangePage(page) {
    this.page = page;
    if (this.input2 != "") {
      this.sousuo();
    } else {
      this.getData();
    }
  },
  onPageSizeChange(list) {
    this.list = list;
    if (this.input2 != "") {
      this.sousuo();
    } else {
      this.getData();
    }
  },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    show(index) {
      console.log(this.data[index].id)
      this.$Modal.info({
        title: "",
        content: `表题：${this.data[index].msgName}<br>
                  内容：${this.data[index].msgContent}<br>
                  添加时间：${this.data[index].msgTime}<br>`
      });
    },
    edit(index) {
      /* 审核通过 */
      this.axios({
        url: `http://192.168.4.165:8080/msg/auditPass`,
        method: "post",
        data: {
          ids: [this.data[index].id]
        }
      }).then(res => {
        alert("审核成功")
        this.getData();
      });
    },
  
   edits(ids) {
      console.log(ids);
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认记录审核通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `http://192.168.4.165:8080/msg/auditPass`,
            method: "post",
            data: {
              ids: this.ids
            }
          }).then(res => {
            alert("审核成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("取消审核");
        }
      });
    },

    getData() {
      this.axios({
        method: "post",
        url: "http://192.168.4.165:9090/msg/queryMsg",
        data: {
          page: this.page,
          size: this.list
        }
      }).then(res=>{
        //console.log(res.data.content);
        //this.total = res.data.total;
        this.data = res.data.body.content;
      });
    },
    asyncOK() {
      setTimeout(() => {
        this.modal1 = false;
      }, 500);
    },
    onSelect(selections) {
      //console.log(selections);
      //console.log(selections[0].id);
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      //console.log(ids)
     // this.ids = ids.toString();
     this.ids = ids;
      console.log(ids);
    },
    sousuo() {
      console.log(this.input2);
      this.axios({
        method: "post",
        url: "http://10.31.162.59:3000/forum/list",
        data: {
          page: this.page,
          size: this.list,
          msgNmae: this.input2
        }
      }).then(res => {
        this.total = res.data.total;
        this.data = res.data.content;
      });
    },
    remove(ids) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认该记录审核不通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `http://192.168.4.165:8080/msg/auditUnPass`,
            method: "post",
            data: {
              ids: [ids]
            }
          }).then(res => {
            alert("你已经审核成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("已取消审核");
        }
      });
    },
    // 多选审核不通过
    removes(ids) {
      console.log(ids);
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认该记录审核不通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `http://192.168.4.165:8080/msg/auditUnPass`,
            method: "post",
            data: {
              ids: this.ids
            }
          }).then(res => {
            alert("审核成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("已取消审核");
        }
      });
    },
    // 在此函数进行帖子提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        //console.log(this.formValidate.id)
        if (this.formValidate.id) {
          this.axios({
            url: `http://192.168.4.165:8080/msg/saveMsg`,
            method: "put",
            data: {
              	newObj : {
                      id:this.formValidate.id,
	                  	msgName : this.formValidate.input,
		                  msgContent  : this.formValidate.desc,
	              }
            }
          }).then(res => {
            this.modal1 = false;
            this.$refs[name].resetFields();
            this.getData();
          });
        } else {
          this.axios({
            method: "post",
            url: "http://192.168.4.165:8080/msg/saveMsg",
            data: {
              newObj : {
	                  	msgName : this.formValidate.input,
		                  msgContent  : this.formValidate.desc,
	              }
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