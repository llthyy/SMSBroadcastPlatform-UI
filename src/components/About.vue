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
    <Button type="success" @click="getDatas" style="margin-right:5px">添加信息</Button>
    <Button type="error" @click="removes" style="margin-right:5px">删除多个</Button>
    <Input search v-model="input2" placeholder="请输入标题" :style="{width:200+'px'}" />
    <Button type="info" @click="sousuo">搜索</Button>
    <Modal v-model="modal1" title="添加信息" :loading="loading" @on-ok="asyncOK">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="input">
          <Input v-model="formValidate.input" placeholder="请输入标题"></Input>
        </FormItem>

        <FormItem label="内容" prop="desc">
          <Input type="textarea" v-model="formValidate.desc" placeholder="请输入短信内容"></Input>
        </FormItem>
        <FormItem label="发布区域" prop="input3">
          <i-select :value="formValidate.input3" placeholder="请选择">
            <i-option v-for="item of treelist" :value="item.id" :key="item.id" style="display: none;">
              {{ item.title }}
            </i-option>
            <Tree :data="baseData" @on-select-change="handleCheckChange"></Tree>
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
    <Table border ref="selection" :columns="columns1" :data="data" @on-selection-change="onSelect"></Table>
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
        input3: [],
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
        input5: [{ required: true, message: "请输入播放次数", trigger: "blur" }]
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
          title: "发布区域",
          key: "sendArea",
          render: function(h, params) {
            return h("div", [h("span", params.row.sendArea.name)]);
          }
        },
        {
          title: "发布时间",
          key: "timingSend"
        },
        {
          title: "播放次数",
          key: "playCount"
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
      baseData: [],
      modal1: false,
      loading: true,
      removesdata: []
    };
  },
  methods: {
    /*  发送区域 */
    handleCheckChange(data) {
      let id = "";
      let title = "";
      let idd = [];
      this.treelist = [];
      this.formValidate.input3 = [];
      data.forEach((item, index) => {
        let id = item.id;
        let title = item.title;
        if (
          this.formValidate.input3.indexOf(item.id) == -1 &&
          item.orgClass === "村级"
        ) {
          this.formValidate.input3.push(item.id);
          this.idd = item.id;
          //console.log(item.id)
        }
        this.treelist.push({
          id,
          title
        });
        //this.idd.push(id)
      });
      console.log(this.idd);
    },

    getDatas() {
      this.modal1 = true;
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {
        this.baseData = res.data.body;
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

    handleReset(name) {
      this.$refs[name].resetFields();
    },
    show(index) {
      //console.log(this.data[index].id)
      this.$Modal.info({
        title: "",
        content: `标题：${this.data[index].msgName}<br>
                  内容：${this.data[index].msgContent}<br>
                  添加时间：${this.data[index].msgTime}<br>
                  发布区域：${this.data[index].sendArea.name}<br>
                  发布时间：${this.data[index].timingSend}<br>
                  播放次数：${this.data[index].playCount}<br>
                  `
      });
    },
    edit(index) {
      /* console.log('修改啊'); */
      this.getDatas();
      var timer1 = this.data[index].timingSend
        .slice(0, 10)
        .replace("-", "/")
        .replace("-", "/");
      var timer2 = this.data[index].timingSend.slice(11);
      this.axios({
        url: `${this.baseUrl1}/msg/queryMsg`,
        method: "post"
      }).then(res => {
        //console.log(index);
        this.formValidate = this.data[index];
        this.formValidate.input = this.data[index].msgName;
        this.formValidate.desc = this.data[index].msgContent;
        this.formValidate.input3 = this.data[index].sendArea.name;
        this.formValidate.date = timer1;
        this.formValidate.time = timer2;
        this.formValidate.input5 = this.data[index].playCount;
        this.modal1 = true;
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
      //console.log(selections);
      //console.log(selections[0].id);
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      //console.log(ids)
      // this.ids = ids.toString();
      this.ids = ids;
      //console.log(ids);
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
          this.$Message.info("Clicked cancel");
        }
      });
    },
    // 多选删除
    removes(ids) {
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
      this.getDatas();
      this.$refs[name].validate(valid => {
        //console.log(this.formValidate.id)
        var misstimel = new Date(this.formValidate.date);
        var misstimeleft = misstimel
          .toLocaleDateString()
          .replace("/", "-")
          .replace("/", "-");
        let misstime = misstimeleft + " " + this.formValidate.time;
        if (this.formValidate.id) {
          this.axios({
            url: `${this.baseUrl1}/msg/saveMsg`,
            method: "put",
            data: {
              newObj: {
                id: this.formValidate.id,
                msgName: this.formValidate.input,
                msgContent: this.formValidate.desc,
                sendArea: { id: Number(this.idd) },
                timingSend: misstime,
                playCount: Number(this.formValidate.input5)
              }
            }
          }).then(res => {
            this.modal1 = false;
            this.$refs[name].resetFields();
            this.getData();
          });
        } else {
          if (valid) {
            this.axios({
              method: "post",
              url: `${this.baseUrl1}/msg/saveMsg`,
              data: {
                newObj: {
                  msgName: this.formValidate.input,
                  msgContent: this.formValidate.desc,
                  sendArea: { id: this.idd },
                  timingSend: misstime,
                  playCount: Number(this.formValidate.input5)
                }
              }
            }).then(res => {
              this.modal1 = false;
              this.$refs[name].resetFields();
              this.getData();
            });
          }
        }
      });
    }
  },

  mounted() {
    this.getData();
  }
};
</script>