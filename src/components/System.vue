<template>
  <div style="margin-top:30px;padding-left:30px">
    <div style="margin:0 0 20px 10px;font-size:20px">资源管理</div>
    <Tabs type="card" :animated=false>
      <!----- 区域管理------>
      <TabPane label="区域管理">
        <div class="ctrl">
          <Button type="warning" @click="addRoot">添加区域</Button>
          <Button type="info" @click="changeTree">修改</Button>
          <Button type="error" @click="confirm">删除</Button>
        </div>
        <!-- <Tree :data="baseData" @on-select-change="getID" :render="renderContent"></Tree> -->
        <div style="width:20%;background:#fff;float:left;">
          <Tree :data="baseData" @on-select-change="getID"></Tree>
        </div>
        <div style="width:75%;float:right;padding-right:60px;">
          <div class="devBtn">
            <Button type="success" @click="modal1= true">添加终端设备</Button>
            <Button type="error" @click="remove">删除多个</Button>
            <Input search v-model="input2" placeholder="请输入..." :style="{width:200+'px'}" />
            <Button type="info" @click="sousuo">搜索</Button>
          </div>
          <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
          <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer></Page>
        </div>
        <!--区域添加  -->
        <Modal v-model="modalForm1" title="添加区域">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="区域名称:" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入区域名称" type="text"></Input>
            </FormItem>
            <FormItem label="区域编码:" prop="orgCode">
              <Input v-model="formValidate.orgCode" placeholder="请输入区域编码" type="text"></Input>
            </FormItem>
            <FormItem label="经度:" prop="longitude">
              <Input v-model="formValidate.longitude" placeholder="请输入区域经度" type="text"></Input>
            </FormItem>
            <FormItem label="纬度:" prop="latitude">
              <Input v-model="formValidate.latitude" placeholder="请输入区域纬度" type="text"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--区域修改  -->
        <Modal v-model="modalForm2" title="修改区域">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="区域名称:" prop="name">
              <!-- <Input v-model="formValidate.name" ></Input> -->
              <Input v-model="formValidate.name" placeholder="请输入区域名称" type="text"></Input>
            </FormItem>
            <FormItem label="区域编码:" prop="orgCode">
              <Input v-model="formValidate.orgCode" placeholder="请输入区域编码" type="text"></Input>
            </FormItem>
            <FormItem label="经度:" prop="longitude">
              <Input v-model="formValidate.longitude" placeholder="请输入区域经度" type="text"></Input>
            </FormItem>
            <FormItem label="纬度:" prop="latitude">
              <Input v-model="formValidate.latitude" placeholder="请输入区域纬度" type="text"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit1('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--终端设备添加修改  -->
        <Modal v-model="modal1" title="终端设备">
          <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="80">
            <FormItem label="物理编码:" prop="devCode">
              <Input v-model="formValidate1.devCode" placeholder="请输入区域物理编码" type="text"></Input>
            </FormItem>
            <FormItem label="逻辑编码:" prop="devLogic">
              <Input v-model="formValidate1.devLogic" placeholder="请输入区域逻辑编码" type="text"></Input>
            </FormItem>
            <FormItem label="设备别名:" prop="alias">
              <Input v-model="formValidate1.alias" placeholder="请输入设备别名" type="text"></Input>
            </FormItem>
            <FormItem label="设备型号:" prop="model">
              <Input v-model="formValidate1.model" placeholder="请输入设备型号" type="text"></Input>
            </FormItem>
            <FormItem label="设备厂家:" prop="manufacturer">
              <Input v-model="formValidate1.manufacturer" placeholder="请输入区域设备厂家" type="text"></Input>
            </FormItem>
            <FormItem label="硬件版本:" prop="hardwareVersion">
              <Input v-model="formValidate1.hardwareVersion" placeholder="请输入区域硬件版本" type="text"></Input>
            </FormItem>
            <FormItem label="固件版本:" prop="softwareVersion">
              <Input v-model="formValidate1.softwareVersion" placeholder="请输入区域固件版本" type="text"></Input>
            </FormItem>
            <FormItem label="联系人:" prop="person">
              <Input v-model="formValidate1.person" placeholder="请输入区域联系人" type="text"></Input>
            </FormItem>
            <FormItem label="联系电话:" prop="phone">
              <Input v-model="formValidate1.phone" placeholder="请输入区域联系电话" type="text"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitDev('formValidate1')">提交</Button>
              <Button @click="handleReset('formValidate1')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--终端设备查看详情  -->
        <Modal v-model="modal2" title="终端设备" class="detail">
          <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="80">
            <p>物理编码:
              <span>{{this.formValidate1.devCode}}</span>
            </p>
            <p>逻辑编码:
              <span>{{this.formValidate1.devLogic}}</span>
            </p>
            <p>设备别名:
              <span>{{this.formValidate1.alias}}</span>
            </p>
            <p>设备型号:
              <span>{{this.formValidate1.model}}</span>
            </p>
            <p>设备厂家:
              <span>{{this.formValidate1.manufacturer}}</span>
            </p>
            <p>硬件版本:
              <span>{{this.formValidate1.hardwareVersion}}</span>
            </p>
            <p>固件版本:
              <span>{{this.formValidate1.softwareVersion}}</span>
            </p>
            <p>联系人:
              <span>{{this.formValidate1.person}}</span>
            </p>
            <p>联系电话:
              <span>{{this.formValidate1.devCode}}</span>
            </p>
          </Form>
          <div slot="footer"></div>
        </Modal>
      </TabPane>
      <!----- 分组管理------>
      <TabPane type="card" label="分组管理">
        <div class="ctrl">
          <Button type="warning" @click="addGroup">添加分组</Button>
          <Button type="info" @click="changeGroup">修改</Button>
          <Button type="error" @click="removeGroup">删除</Button>
        </div>
        <div style="width:20%;float:left;">
          <!-- <div style="margin-bottom:20px;">
          <Button type="warning" @click="addRoot">添加分组</Button>
          <Button type="info" @click="changeTree">修改</Button>
          <Button type="error" @click="confirm">删除</Button>
          </div> -->
          <Table border :columns="columns1" :data="data1" @on-selection-change="onSelectGroup" @on-current-change="rowClassName" highlight-row></Table>
          <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer></Page>
          <!--分组添加  -->
        <Modal v-model="modalGroup1" title="添加分组">
          <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="80">
            <FormItem label="分组名称:" prop="groupName">
              <Input v-model="formValidate2.groupName" placeholder="请输入分组名称" type="text"></Input>
            </FormItem>
            <FormItem label="备注:" prop="remarks">
              <Input v-model="formValidate2.remarks" placeholder="请输入分组备注" type="text"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmitGroup('formValidate2')">提交</Button>
              <Button @click="handleReset('formValidate2')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        </div>
        <div style="width:75%;float:right;padding-right:60px;">
          <div class="devBtn">
            <Button type="success" @click="modal1= true">添加终端设备</Button>
            <Button type="error" @click="remove">删除多个</Button>
            <Input search v-model="input2" placeholder="请输入..." :style="{width:200+'px'}" />
            <Button type="info" @click="sousuo">搜索</Button>
          </div>
          <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
          <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer></Page>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    const validateorgCode = (rule, value, callback) => {
      if (!/\d{12}$/.test(value)) {
        return callback(new Error("请输入12位数字值"));
      } else {
        callback();
      }
    };
    const validatelongitude = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入区域经度"));
      } else if (!/\d$/.test(value)) {
        return callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    const validatelatitude = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入区域纬度"));
      } else if (!/\d$/.test(value)) {
        return callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      modalForm1: false,
      modalForm2: false,
      baseData: [],
      formValidate: {
        name: "",
        longitude: "",
        latitude: "",
        orgCode: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "区域名称不能为空",
            trigger: "blur"
          }
        ],
        orgCode: [
          {
            required: true,
            message: "区域编码不能为空",
            trigger: "blur"
          },
          { validator: validateorgCode, trigger: "blur" }
        ],
        longitude: [
          { required: true, validator: validatelongitude, trigger: "blur" }
        ],
        latitude: [
          { required: true, validator: validatelatitude, trigger: "blur" }
        ]
      },
      modal1: false,
      modal2: false,
      data: [],
      total: 0,
      page: 1,
      list: 10,
      input2: "",
      ids: [],
      Group_ids:[],
      loading: true,
      formValidate1: {
        devCode: "",
        devLogic: "",
        alias: "",
        model: "",
        manufacturer: "",
        hardwareVersion: "",
        softwareVersion: "",
        person: "",
        phone: ""
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "设备别名",
          key: "alias"
        },
        {
          title: "设备型号",
          key: "model"
        },
        {
          title: "设备厂家",
          key: "manufacturer"
        },
        {
          title: "硬件版本",
          key: "hardwareVersion"
        },
        {
          title: "固件版本",
          key: "softwareVersion"
        },
        {
          title: "联系人",
          key: "person"
        },
        {
          title: "联系电话",
          key: "phone"
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
                      this.detail(params.row.id);
                    }
                  }
                },
                "查看详情"
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
      data1:[],
      modalGroup1:false,
      formValidate2: {
        groupName: "",
        remarks: "",
      },
      columns1: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "分组管理",
          key: "groupName"
        },
        {
          title: "备注",
          key: "remarks"
        }
      ]
    };
  },
  methods: {
    /* ......   区域管理 ................................  */
    //获取数据
    getDatas() {
      this.axios({
        method: "get",
        url: "http://192.168.4.114:8080/org/allArea"
      }).then(res => {
        this.baseData = res.data.body;
      });
    },
    //添加数据
    addRoot() {
      if (typeof this.areaID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击确认具体区域</p>"
        });
      } else {
        this.modalForm1 = true;
      }
    },
    handleSubmit(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.formValidate.id = -1;
          this.formValidate.parent_id = this.areaID;
          this.axios({
            url: "http://192.168.4.114:8080/org/modifyArea",
            method: "post",
            data: this.qs.stringify(this.formValidate)
          }).then(res => {
            this.modalForm1 = false;
            this.getDatas();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    //修改数据
    // 请示数据，打开对话框，显示表单的数据，进行提交
    changeTree() {
      if (typeof this.areaID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击确认具体区域</p>"
        });
      } else {
        this.axios({
          url: `http://192.168.4.114:8080/org/getArea?id=${this.areaID}`,
          method: "get"
        }).then(res => {
          this.formValidate = res.data.body;
          this.modalForm2 = true;
        });
      }
    },
    handleSubmit1(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.formValidate.id = this.areaID;
          this.formValidate.parentid = this.pearentID;
          this.axios({
            url: "http://192.168.4.114:8080/org/modifyArea",
            method: "post",
            data: this.qs.stringify(this.formValidate)
          }).then(res => {
            this.modalForm2 = false;
            this.getDatas();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    //删除数据
    confirm() {
      if (typeof this.areaID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击确认具体区域</p>"
        });
      } else {
        this.$Modal.confirm({
          title: "确认删除？",
          content: "<p>数据删除后将不可恢复</p>",
          onOk: () => {
            this.axios({
              method: "post",
              url: "http://192.168.4.114:8080/org/deleteArea",
              data: this.qs.stringify({ id: this.areaID })
            }).then(res => {
              this.getDatas(this.type);
              this.$Message.info("删除成功");
            });
          },
          onCancel: () => {
            this.$Message.info("取消删除");
          }
        });
      }
    },
    //重置数据
    handleReset(username) {
      this.$refs[username].resetFields();
    },
    //点击当前的树节点
    getID(data) {
      this.areaID = data[0].id;
      this.pearentID = data[0].parentId;
      this.areaDevice();
    },
    //根据区域显示终端设备
    areaDevice() {
      this.axios({
        method: "get",
        url: `http://192.168.4.114:8080/device/getByOrg?ids=${
          this.areaID
        }&page=${this.page - 1}&size=${this.list}`
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    /* ......   终端设备管理 .........................  */
    //获取设备数据
    getdeviceData() {
      this.axios({
        method: "get",
        url: `http://192.168.4.114:8080/device/getAll?page=${this.page -
          1}&size=${this.list}`
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    //查看详情
    detail(id) {
      // 请示数据，打开对话框，显示表单的数据，进行提交
      this.axios({
        url: `http://192.168.4.114:8080/device/getOne?ids=${id}`,
        method: "get"
      }).then(res => {
        this.formValidate1 = res.data.body;
        this.modal2 = true;
      });
    },
    //添加修改设备数据
    edit(id) {
      // 请示数据，打开对话框，显示表单的数据，进行提交
      this.axios({
        url: `http://192.168.4.114:8080/device/getOne?ids=${id}`,
        method: "get"
      }).then(res => {
        this.formValidate1 = res.data.body;
        this.modal1 = true;
      });
    },
    handleSubmitDev(deviceName) {
      var params = new URLSearchParams();
      params.append("device", JSON.stringify(this.formValidate1));
      if (!this.formValidate1.id) {
        this.formValidate1.id = -1;
      }
      params.append("id", this.formValidate1.id);
      this.$refs[deviceName].validate(valid => {
        if (valid) {
          if (this.formValidate1.id) {
            this.axios({
              url: "http://192.168.4.114:8080/device/save",
              method: "post",
              data: params
            }).then(res => {
              this.getdeviceData();
              this.modal1 = false;
              this.$Message.info("修改成功");
            });
          } else {
            this.axios({
              url: "http://192.168.4.114:8080/device/save",
              method: "post",
              data: params
            }).then(res => {
              this.modal1 = false;
              this.getdeviceData();
            });
          }
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    //删除设备数据
    remove(id) {
      this.ids.push(id);
      var params = new URLSearchParams();
      params.append("ids", JSON.stringify(this.ids));
      this.$Modal.confirm({
        title: "确认删除？",
        content: "<p>数据删除后将不可恢复</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: "http://192.168.4.114:8080/device/delete",
            data: params
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
    /* ......   分组管理 ...............................  */
    //点击当前分组
    rowClassName(row, index){
      console.log(row.id);
      this.groupID=row.id
    },
    //获取分组数据
    getgroupData(){
      this.axios({
        method: "get",
        url: `http://192.168.4.114:8080/device/findAllGroup?page=${this.page -
          1}&size=${this.list}`
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data1= res.data.body.content;
      });
    },
    //添加分组
    addGroup(){
      this.modalGroup1=true
    },
    handleSubmitGroup(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.axios({
            url: "http://192.168.4.114:8080/device/saveGroup",
            method: "post",
            data: this.qs.stringify(this.formValidate2)
          }).then(res => {
            this.modalGroup1 = false;
            this.getgroupData();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    //修改分组
    changeGroup() {
      if (typeof this.groupID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击确认具体分组</p>"
        });
      } else {
        this.axios({
          url: `http://192.168.4.114:8080/device/findGroup?id=${this.groupID}`,
          method: "get"
        }).then(res => {
          this.formValidate2 = res.data.body;
          this.modalGroup1 = true;
        });
      }
    },
    handleSubmit1(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.axios({
            url: "http://192.168.4.114:8080/device/saveGroup",
            method: "post",
            data: this.qs.stringify(this.formValidate2)
          }).then(res => {
            this.modalGroup1 = false;
            this.getDatas();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    //删除分组
    removeGroup() {
      this.Group_ids.push(this.groupID);
      console.log(this.Group_ids);
      var params = new URLSearchParams();
      params.append("ids", JSON.stringify(this.Group_ids));
      this.$Modal.confirm({
        title: "确认删除？",
        content: "<p>数据删除后将不可恢复</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: "http://192.168.4.114:8080/device/delete",
            data: params
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
        // this.sousuo();
      } else {
        this.getdeviceData();
      }
    },
    onPageSizeChange(list) {
      this.list = list;
      if (this.input2 != "") {
        // this.sousuo();
      } else {
        this.getdeviceData();
      }
    },
    //多选
    onSelect(selections) {
      /*  console.log(selections); */
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.ids = ids;
    },
    onSelectGroup(selections) {
      /*  console.log(selections); */
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.Group_ids = ids;
    },
    //搜索内容
    sousuo() {
      // this.axios({
      //   url: `http://localhost:3000/${this.module}/list`,
      //   method: "post",
      //   data: {
      //     username: this.searchval,
      //     page: 1,
      //     rows: this.rows
      //   }
      // }).then(res => {
      //   this.total = res.data.total;
      //   this.data = res.data.rows;
      // });
    }
  },
  mounted() {
    this.getDatas();
    this.getdeviceData();
    this.getgroupData()
  }
};
</script>
<style>
.ivu-btn {
  margin-right: 5px;
}
.ctrl {
  position: absolute;
  right: 10px;
  top: 0px;
}
.devBtn {
  margin-bottom: 20px;
}
.detail p {
  font-size: 15px;
  font-weight: bolder;
  padding-bottom: 10px;
}
.detail p span {
  font-size: 15px;
  font-weight: 100;
}
.ivu-table-row-highlight td{
  background-color :#d3e3f3!important;
}
.ivu-table-row-hover td{
  background-color :#d3e3f3!important;
}

</style>

