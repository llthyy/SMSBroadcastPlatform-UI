<style scoped>
h1 {
  color: red;
}
mark {
  background: red;
  font-weight: bold;
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
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
</style>
<template>
  <div style="margin-top:30px;padding-left:10px">
    <div style="margin:0 0 20px 10px;font-size:20px">信息编辑</div>
    <Button type="success" @click="add" style="margin-right:5px">添加信息</Button>
    <Button type="error" @click="removes" style="margin-right:5px">删除多个</Button>
    <Input search v-model="input2" placeholder="请输入标题" :style="{width:200+'px'}" />
    <Button type="info" @click="sousuo">搜索</Button>
    <Modal v-model="modal1" title="添加信息"  @on-ok="asyncOK" :mask-closable="false"  :loading="loading">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="input">
          <Input v-model="formValidate.input" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
          <Input type="textarea" v-model="formValidate.desc" placeholder="请输入短信内容"></Input>
        </FormItem>
        <FormItem label="发布区域" prop="input3">
          <i-select v-model="formValidate.input3" multiple placeholder="请选择">
            <i-option v-for="item of treelist" :value="item.id" :key="item.id" style="display: none;">
              {{ item.title }}
            </i-option>
            <Tree :data="baseData" @on-check-change="handleCheckChange" show-checkbox></Tree>
          </i-select>
        </FormItem>
        <FormItem label="发布时间" prop="date">
          <Row>
            <i-col span="11">
              <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
            </i-col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="播放次数" prop="input5">
          <Input v-model="formValidate.input5" placeholder="请输入播放次数"></Input>
        </FormItem>
        <FormItem class="fuck" style="width:95%;margin-bottom:25px">
          <div style="float: right;">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
<!-- 信息查看 -->
    <Modal v-model="modal2" title="信息查看"  @on-ok="asyncOK" :mask-closable="false">
      <Form ref="formValidate1" :model="formValidate1" :label-width="80">
        <FormItem label="标题" prop="input">
          <Input v-model="formValidate1.input"  readonly="readonly"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
          <Input type="textarea" v-model="formValidate1.desc"  readonly="readonly"></Input>
        </FormItem>
        <FormItem label="发布区域" prop="input3">
          <Input v-model="formValidate1.input3"  readonly="readonly"></Input>
        </FormItem>
        <FormItem label="发布时间" prop="date">
          <Row>
            <i-col span="11">
              <Date-picker type="date"  v-model="formValidate1.date" readonly="readonly"></Date-picker>
            </i-col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time"  v-model="formValidate1.time" readonly="readonly"> </TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="播放次数" prop="input5">
          <Input v-model="formValidate1.input5"  readonly="readonly"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
   <!-- 信息修改 -->
   <Modal v-model="modal3" title="修改信息"  @on-ok="asyncOK" :mask-closable="false"  :loading="loading">
      <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="80">
        <FormItem label="标题" prop="input">
          <Input v-model="formValidate2.input" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="内容" prop="desc">
          <Input type="textarea" v-model="formValidate2.desc" placeholder="请输入短信内容"></Input>
        </FormItem>
        <FormItem label="发布区域" prop="input3">
          <!-- <Input v-model="formValidate2.input4" placeholder="请选择发布区域" ></Input>
          <Tree :data="baseData" @on-check-change="handleCheckChange1" show-checkbox></Tree> -->
          <i-select :value="formValidate2.input3" multiple placeholder="请选择" >
            <i-option v-for="item of treelist" :value="item.id" :key="item.id" style="display: none;">
              {{ item.title }}
            </i-option>
            <Tree :data="baseData1" @on-check-change="handleCheckChange" show-checkbox></Tree>
          </i-select>
        </FormItem>
        <FormItem label="发布时间" prop="date">
          <Row>
            <i-col span="11">
              <Date-picker type="date" placeholder="选择日期" v-model="formValidate2.date"></Date-picker>
            </i-col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
            <FormItem prop="time">
              <TimePicker type="time" placeholder="选择时间" v-model="formValidate2.time"></TimePicker>
            </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="播放次数" prop="input5">
          <Input v-model="formValidate2.input5" placeholder="请输入播放次数"></Input>
        </FormItem>
        <FormItem class="fuck" style="width:95%;margin-bottom:25px">
          <div style="float: right;">
            <Button type="primary" @click="handleSubmit2('formValidate2')">提交</Button>
            <Button type="error" @click="handleReset2('formValidate2')" style="margin-left: 8px">重置</Button>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
      </div>
  </Modal>

    <Table border ref="selection" :columns="columns1" :data="data" @on-selection-change="onSelect" @on-row-dblclick="detail"></Table>
    <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer show-total></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treelist: [],
      idd: [],
      formValidate: {
        input: "",
        desc: "",
        date: "",
        time: "",
        input3: ['11'],
        input5: ""
      },
      formValidate1: {
        input: "",
        desc: "",
        date: "",
        time: "",
        input3: '',
        input5: ""
      },
       formValidate2: {
        input: "",
        desc: "",
        date: "",
        time: "",
        input3: [],
        input5: ""
      },
      formValidate1: {
        input: "",
        desc: "",
        date: "",
        time: "",
        input3: '',
        input5: ""
      },
       formValidate2: {
        input: "",
        desc: "",
        date: "",
        time: "",
        input3: [],
        input4: [],
        input5: ""
      },
      ruleValidate: {
        input: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入短信内容", trigger: "blur" }
          /*  {validator: validKeyWordsRule, trigger: 'blur'} */
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "请选择时间",
            trigger: "change"
          }
        ],
        input3: [{ required: true, message: "请选择发布区域" }],
        input5: [
          { required: true, message: "请输入播放次数", trigger: "blur"}]
      },
      ruleValidate2: {
        input: [{ required: true, message: "请输入标题", trigger: "blur" }],
        desc: [
          { required: true, message: "请输入短信内容", trigger: "blur" }
          /*  {validator: validKeyWordsRule, trigger: 'blur'} */
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "请选择时间",
            trigger: "change"
          }
        ],
        input3: [{ required: true, message: "请选择发布区域" }],
        input5: [
          { required: true, message: "请输入播放次数", trigger: "blur",type:'number' }]
      },
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
          title: "发布区域",
          width: 200,
          align: "center",
          tooltip:true,
          key: "sendArea",
          render: function(h, params) {
            var areasrr=params.row.sendArea
            var sb=[];
            for(var i in areasrr){
              sb.push(areasrr[i].name);
            }
              var strn=sb.toString();
            return h("div", [h("span",{style:{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'} }, strn)]);
          }
        },
        {
          title: "发布时间",
          align: "center",
          tooltip:true,
          key: "timingSend"
        },
        {
          title: "播放次数",
          align: "center",
          tooltip:true,
          key: "playCount"
        },
        {
          title: "功能",
          tooltip:true,
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.send(params.row.id);
                    }
                  }
                },
                "发送"
              ),
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
      data: [],
      total: 0,
      page: 0,
      list: 5,
      input2: "",
      sb3:[],
      baseData: [],
      baseData1:[],
      modal1: false,
      modal2:false,
      modal3:false,
      loading: true,
      removesdata: [],
      resdata:'',
      ids:[],
    };
  },
  methods: {
    detail(row){
      var timer1 = row.timingSend.slice(0, 10).replace("/", "-").replace("/", "-");
      var timer2 = row.timingSend.slice(11);
      var area=row.sendArea
      var area1=[]
      for(let i in area){
        area1.push(area[i].name)
      }
      this.formValidate1.input = row.msgName;
      this.formValidate1.desc = row.msgContent;
      this.formValidate1.input3= area1.toString();
      this.formValidate1.date = timer1;
      this.formValidate1.time = timer2;
      this.formValidate1.input5 = row.playCount;
      this.modal2=true;
    },
    /*  发送区域 */
    handleCheckChange(data) {
      let id = "";
      let title = "";
      let idd = [];
      this.treelist = [];
      this.formValidate.input3 = [];
      this.formValidate2.input3 = [];
      data.forEach((item, index) => {
        let id = item.id;
        let title = item.title;
        if (
          this.formValidate.input3.indexOf(item.id) == -1 &&
          item.orgClass === "村级"
        ) {
          this.formValidate.input3.push(item.id);
          this.idd=this.formValidate.input3;
          this.formValidate2.input3.push(item.id);
        }
        this.treelist.push({
          id,
          title
        });
      });
      let sb2=[]
       for(var i in this.idd ){
          sb2.push({ id:this.idd[i] });
      }
      this.sb3=sb2;
      //console.log(this.formValidate.input3)
    },
    /* 发布区域 */
    getDatas() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {

        //this.baseData = res.data.body;
        this.baseData = this.treedata;
      }); */
      this.baseData = this.treedata;
    },
  setChecked(data, arr) {
    data.forEach((value, index) => {
      arr.forEach(v => {
        if (v == value.id) {
          value.checked = true
        }
        if (value.children.length) {
          this.setChecked(value.children, arr)
        }
      })
    })
  },
  getDatas1() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {
        this.baseData1= res.data.body;
        this.setChecked(this.baseData1, this.sb2);
      });
    },
    onChangePage(page) {
      this.page = page - 1;
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

    handleReset(formValidate) {
      this.$refs[formValidate].resetFields();
      this.getDatas();
    },
    handleReset2(formValidate2){
      this.$refs[formValidate2].resetFields();
      this.getDatas();
    },
    /* 查看信息 */
    show(index) {
      var timer1 = this.data[index].timingSend.slice(0, 10).replace("/", "-").replace("/", "-");
      var timer2 = this.data[index].timingSend.slice(11);
      var area=this.data[index].sendArea
      var area1=[]
      for(var i in area){
        area1.push(area[i].name)
      }
      this.formValidate1.input = this.data[index].msgName;
      this.formValidate1.desc = this.data[index].msgContent;
      this.formValidate1.input3= area1.toString();
      this.formValidate1.date = timer1;
      this.formValidate1.time = timer2;
      this.formValidate1.input5 = this.data[index].playCount;
      this.modal2=true;
    },

    add(){
      this.modal1=true;
      this.formValidate={};
    },
    /* 修改信息 */
    edit(index) {
      this.getDatas1();
      let sb1=this.data[index].sendArea
      this.sb2=[]
       for(let i in sb1){
           this.sb2.push(sb1[i].id)
       }
       //console.log(this.sb2)
      var timer1 = this.data[index].timingSend
        .slice(0, 10)
        .replace("-", "/")
        .replace("-", "/");
      var timer2 = this.data[index].timingSend.slice(11);
      this.axios({
        url: `${this.baseUrl1}/msg/queryMsg`,
        method: "post"
      }).then(res => {
        this.formValidate2 = this.data[index];
        this.formValidate2.input = this.data[index].msgName;
        this.formValidate2.desc = this.data[index].msgContent;
        this.formValidate.input3 = this.sb2 ;
        this.formValidate2.date = timer1;
        this.formValidate2.time = timer2;
        this.formValidate2.input5 = this.data[index].playCount;
        this.modal3 = true;
      });
    },

    getData() {
      this.axios({
        method: "post",
        url: `${this.baseUrl1}/msg/queryMsg`,
        data: {
          page: this.page,
          size: this.list
        }
      }).then(res => {
        //console.log(res.data.body.content[0].sendArea)
        this.data = res.data.body.content;
        this.total = res.data.body.totalElements;
      });
    },
    asyncOK() {
      setTimeout(() => {
        this.modal1 = false;
      }, 500);
    },
    onSelect(selections) {
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.ids = ids;
    },
    sousuo() {
      this.axios({
        method: "post",
        url: `${this.baseUrl1}/msg/queryMsg`,
        data: {
          page: this.page,
          size: this.list,
          keyword: {
            msgName: this.input2
          }
        }
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    send(ids) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认发送该记录吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/send`,
            method: "post",
            data: {
              id: ids
            }
          }).then(res => {
            if(res.data.status==200){
            this.$Message.info("发送成功");
            this.getData();
            }else{
            this.$Message.info("发送失败");
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消发送");
        }
      });
    },
    remove(ids) {
      //console.log(ids)
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该记录吗?</p>",
        onOk: () => {
          this.axios({
            url: `${this.baseUrl1}/msg/delMsg`,
            method: "post",
            data: {
              id: ids
            }
          }).then(res => {
            alert("你已经删除成功");
            this.getData();
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
    },
    // 多选删除
    removes(ids) {
      if(this.ids.length>0){
        this.$Modal.confirm({
          title: "确认操作",
          content: "<p>你确认删除该记录吗?</p>",
          onOk: () => {
            this.axios({
              url: `${this.baseUrl1}/msg/delMulMsg`,
              method: "post",
              data: {
                ids: this.ids
              }
            }).then(res => {
              this.$Message.info("已成功删除信息");
              this.getData();
              });
          },
          onCancel: () => {
            this.$Message.info("取消删除");
          }
        });
      }else if(this.ids.length<1){
          this.$Message.info("请选择数据再操作");
        }
    },
    // 在此函数进行帖子提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        var misstimel = new Date(this.formValidate.date);
        var misstimeleft = misstimel
          .toLocaleDateString()
          .replace("/", "-")
          .replace("/", "-");
        let misstime = misstimeleft + " " + this.formValidate.time;
        if (valid) {
          this.axios({
            url: `${this.baseUrl1}/msg/saveMsg`,
            method: "post",
            data: {
              newObj: {
                  msgName: this.formValidate.input,
                  msgContent: this.formValidate.desc,
                  sendArea:  this.sb3 ,
                  timingSend: misstime,
                  playCount: Number(this.formValidate.input5)
                }
            }
          }).then(res => {
            if(res.data.status==200){
              this.resdata=res.data.msg
              this.$Message.info('提交成功');
              this.$refs[name].resetFields();
              this.modal1= false;
              this.getData();
            }else{
              this.$Message.info(res.data.msg);
            }
          });
        }
      });
    },

  /* 信息修改 */
    handleSubmit2(name) {
      this.$refs[name].validate(valid => {
        var misstimel = new Date(this.formValidate2.date);
        var misstimeleft = misstimel
          .toLocaleDateString()
          .replace("/", "-")
          .replace("/", "-");
        let misstime = misstimeleft + " " + this.formValidate2.time;
        if (this.formValidate2.id) {
          this.axios({
            url: `${this.baseUrl1}/msg/saveMsg`,
            method: "put",
            data: {
              newObj: {
                id: this.formValidate2.id,
                msgName: this.formValidate2.input,
                msgContent: this.formValidate2.desc,
                sendArea:  this.sb3 ,
                timingSend: misstime,
                playCount: Number(this.formValidate2.input5)
              }
            }
          }).then(res => {
            this.resdata=res.data.msg
            this.$Message.info('修改成功');
            this.modal3= false;
            this.$refs[name].resetFields();
            this.formValidate2.id==undefined;
            this.getData();
          });
        }
      });
    }
  },

  mounted() {
    this.getData();
    this.getDatas();
  }
};
</script>