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

    <!-- 信息查看 -->
    <Modal v-model="modal1" title="信息查看" >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="input">
          <Input v-model="formValidate.input"  readonly="readonly"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
          <Input type="textarea" v-model="formValidate.desc" readonly="readonly"></Input>
        </FormItem>
        <FormItem label="添加时间" prop="input5">
          <Input v-model="formValidate.input5"  readonly="readonly"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
        <Table border ref="selection" :columns="columns1" :data="data" @on-selection-change="onSelect" @on-row-dblclick="detail"></Table>
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
        input5: "",
      },
      ruleValidate: {},

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "标题",
          align: "center",
          tooltip:true,
          key: "msgName"
        },

        {
          title: "内容",
          align: "center",
          tooltip:true,
          key: "msgContent"
        },
        {
          title: "添加时间",
          align: "center",
          tooltip:true,
          key: "msgTime"
        },
        {
          title: "审核状态",
          align: "center",
          tooltip:true,
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
                      this.remove(params.index);
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
      list: 5,
      input2:'',
      ids:[],
      msgAudit:[],
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
    detail(row){
      console.log(row)
      this.modal1=true;
      this.formValidate.input=row.msgName;
      this.formValidate.desc=row.msgContent;
      this.formValidate.input5=row.msgTime
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
      this.modal1=true;
      this.formValidate.input=this.data[index].msgName;
      this.formValidate.desc=this.data[index].msgContent;
      this.formValidate.input5=this.data[index].msgTime
    },

     // 单个审核通过
      edit(index) {         
        if(this.data[index].msgAudit == 0){    
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认该记录审核通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/auditPass`,
            method: "post",
            data: {
              ids: [this.data[index].id]
            }
          }).then(res => {
            this.$Message.info("操作成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("已取消审核");
        }
      });} else{
        this.$Message.info("已审核");
      }
    },
  /* 多个审核通过 */
   edits(ids) {
     if(this.ids.length>0){
       if(this.msgAudit.indexOf(1)== -1 && this.msgAudit.indexOf(2)== -1){
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认记录审核通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/auditPass`,
            method: "post",
            data: {
              ids: this.ids
            }
          }).then(res => {
            this.$Message.info("审核成功");
            this.getData();
            this.ids.length=0;
            this.msgAudit.length=0;
          });
        },
         onCancel: () => {
          this.$Message.info("取消审核");
        }
        });}else{this.$Message.info("存在已审核数据"); }
        }else{
          this.$Message.info("请选择数据");
        }              
    },
    getData() {
      this.axios({
        method: "post",
        url:`${this.baseUrl1}/msg/queryMsg`,
        data: {
          page: this.page,
          size: this.list,
          //listType: audit ,
        }
      }).then(res=>{
        //console.log(res.data.content);
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    asyncOK() {
      setTimeout(() => {
        this.modal1 = false;
      }, 500);
    },
    onSelect(selections) {
      let ids = [];
      let msgAudit=[];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
        msgAudit.push(selections[i].msgAudit)
      }
     this.ids = ids;
     this.msgAudit=msgAudit
    },
    sousuo() {
      //console.log(this.input2);
      this.axios({
        method: "post",
        url: `${this.baseUrl1}/msg/queryMsg`,
        data: {
          page: this.page,
          size: this.list,
          keyword : {
	           	msgName : this.input2,
	        },
          listType: "audit",
        }
      }).then(res => {
        this.total = res.data.body.total;
        this.data = res.data.body.content;
      });
    },
    remove(index) {
      if(this.data[index].msgAudit == 0){     
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认该记录审核不通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/auditUnPass`,
            method: "post",
            data: {
              ids: [this.data[index].id]
            }
          }).then(res => {
            this.$Message.info("操作成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("已取消审核");
        }
      });} else {
        this.$Message.info("已审核");
      }
    },
    // 多选审核不通过
    removes(ids) {
     if(this.ids.length>0){
        if(this.msgAudit.indexOf(1)== -1 && this.msgAudit.indexOf(2)== -1){
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认该信息审核不通过吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/auditUnPass`,
            method: "post",
            data: {
              ids: this.ids
            }
          }).then(res => {
            this.$Message.info("操作成功");
            this.getData();
            this.ids.length=0;
          });
        },
        onCancel: () => {
          this.$Message.info("已取消审核");
        }
      });}else{ this.$Message.info("存在已审核数据"); }
      }else{
        this.$Message.info("请选择数据");
      }
    },
    // 在此函数进行帖子提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        //console.log(this.formValidate.id)
        if (this.formValidate.id) {
          this.axios({
            url: `${this.baseUrl1}/msg/saveMsg`,
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
            url: `${this.baseUrl1}/msg/saveMsg`,
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