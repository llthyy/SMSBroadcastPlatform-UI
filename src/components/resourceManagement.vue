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
        <div style="width:79%;float:right;padding-right:60px;">
          <div class="devBtn">
            <Button type="success" @click="modalForm3click">多个设备权限设置</Button>
            <Button type="success" @click="modal1= true">添加终端设备</Button>
            <Button type="error" @click="remove">删除多个</Button>
            <Input search v-model="input2" placeholder="请输入..." :style="{width:200+'px'}" />
            <Button type="info" @click="sousuo">搜索</Button>
          </div>
          <Table border :columns="columns" :data="data" @on-selection-change="onSelect" @on-row-dblclick="detail" ></Table>
          <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer show-total></Page>
        </div>
        <!--区域添加  -->
        <Modal v-model="modalForm1" title="添加区域">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="上级区域:" prop="upname">
              <Input v-model="formValidate.upname"  readonly type="text"></Input>
            </FormItem>
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
              <FormItem class="fuck" style="width:95%;margin-bottom:25px">
                <div style="float: right;">
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--区域修改  -->
        <Modal v-model="modalForm2" title="修改区域">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="上级区域:" prop="upname">
              <Input v-model="formValidate.upname"  readonly type="text"></Input>
            </FormItem>
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
            <FormItem class="fuck" style="width:95%;margin-bottom:25px">
              <div style="float: right;">
              <Button type="primary" @click="handleSubmit1('formValidate')">提交</Button>
              <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
              </div>
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
            <FormItem class="fuck" style="width:95%;margin-bottom:25px">
              <div style="float: right;">
                <Button type="primary"  style="margin-bottom:0px" @click="handleSubmitDev('formValidate1')">提交</Button>
                <Button  type="error" style="margin-left:8px" @click="handleReset('formValidate1')">重置</Button>
              </div>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
        <!--终端设备查看详情  -->
        <Modal v-model="modal2" title="终端设备" class="detail">
          <Table class="devcheck" border :columns="columns4" :data="data3" :show-header="false"></Table>
          <div slot="footer"></div>
        </Modal>
        <!-- 权限设置 -->
        <Modal v-model="modalForm3" title="终端参数设置" class="set">
           <Tabs value="name1">
            <TabPane label="回传服务器" name="name1">
              <Form ref="formValidate5" :model="formValidate5" :rules="ruleValidate5" :label-width="80">
                  <FormItem label="回传地址:" prop="address">
                    <Input v-model="formValidate5.address" placeholder="请输入回传地址" type="text"></Input>
                  </FormItem>
                  <FormItem label="回传端口:" prop="port">
                    <Input v-model="formValidate5.port" placeholder="请输入回传端口" type="text"></Input>
                  </FormItem>
                  <FormItem class="fuck">
                    <div style="float: right;">
                       <Button type="primary" @click="handleSubmit5('formValidate5')">提交</Button>
                       <Button type="error" style="margin-left:8px" @click="handleReset('formValidate5')" >重置</Button>
                     </div>  
                  </FormItem>            
              </Form>
            </TabPane>

             <TabPane label="在线升级" name="name2">
                 <Form style="padding-bottom: 40px;" ref="formValidate3" :model="formValidate3" :rules="ruleValidate3" :label-width="100">
            <FormItem label="FTP服务器地址:" prop="address">
              <Input v-model="formValidate3.address" placeholder="请输入FTP服务器地址" type="text"></Input>
            </FormItem>
            <FormItem label="FTP服务器端口:" prop="port">
              <Input v-model="formValidate3.port" placeholder="请输入FTP服务器端口" type="text"></Input>
            </FormItem>
            <FormItem label="FTP用户名:" prop="username">
              <Input v-model="formValidate3.username" placeholder="请输入FTP用户名" type="text"></Input>
            </FormItem>
            <FormItem label="FTP登入密码:" prop="pwd">
              <Input v-model="formValidate3.pwd" placeholder="请输入FTP登入密码" type="text"></Input>
            </FormItem>
            <FormItem label="升级文件名:" prop="filename">
              <Input v-model="formValidate3.filename" placeholder="请输入升级文件名" type="text"></Input>
            </FormItem>
            <FormItem class="fuck">
              <div style="float: right;">
                <Button type="primary"  style="margin-bottom:0px" @click="handleSubmit3('formValidate3')">提交</Button>
                <Button  type="error" style="margin-left:8px" @click="handleReset('formValidate3')">重置</Button>
              </div>
            </FormItem>
          </Form>
             </TabPane>

             <TabPane label="调频频率" name="name3">
                 <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate4" :label-width="100">
            <FormItem label="频率级别:" prop="level">
                <Select v-model="formValidate4.level">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
            </FormItem>
            <FormItem label="频率（Mhz）:" prop="freq">
              <Input v-model="formValidate4.freq" placeholder="请输入频率" type="text"></Input>
            </FormItem> 
            <FormItem class="fuck" >
              <div style="float: right;">
                <Button type="primary" style="margin-bottom:0px" @click="handleSubmit4('formValidate4')">提交</Button>
                <Button type="error" style="margin-left: 8px" @click="handleReset('formValidate4')">重置</Button>
              </div>
            </FormItem>
          </Form>
             </TabPane>
          </Tabs>
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
          <div class="group-height">
            <Table border :columns="columns1" :data="data1" @on-selection-change="onSelectGroup" @on-current-change="getGroupId" highlight-row></Table>
            <Page :total="total1" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer show-total></Page>
          </div>
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
            <Button type="success" @click="modaladdGroupDev">添加分组终端设备</Button>
            <Button type="error" @click="removeGroupDev">删除设备</Button>
            <Input search v-model="input2" placeholder="请输入..." :style="{width:200+'px'}" />
            <Button type="info" @click="sousuo">搜索</Button>
          </div>
          <Table border :columns="columns2" :data="data2" @on-selection-change="onSelectdelGroupDev"></Table>
          <Page :total="total2" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer show-total></Page>
          <!--分组设备添加-->
           <Modal v-model="modalGroupDev1" title="添加分组设备" width="70%"  @on-ok="addGroupDevOk" :transition-names=[]>
            <Form >
              <FormItem>
              <div style="width:20%;background:#fff;float:left;">
                <Tree :data="baseData" @on-select-change="getID1"></Tree>
              </div>
              <div style="width:75%;float:right;padding-right:20px;">
                <Table border :columns="columns3" :data="data4" @on-selection-change="onSelectaddGroupDev"></Table>
                <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer show-total></Page>
              </div>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    const validateorgCode = (rule, value, callback) => {
      if (!/(\d){12}$/.test(value)) {
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
      pearentTitle:"",
      checkData:'',
      modalForm1: false,
      modalForm2: false,
      modalForm3: false,
      formValidate5:false,
      baseData: [],
      formValidate: {
        upname:'',
        name: "",
        longitude: "",
        latitude: "",
        orgCode: ""
      },
      formValidate5: {
        name: "",
        longitude: "",
        orgCode: ""
      },
      formValidate3: {
        name: "",
        orgCode: ""
      },
      formValidate4: {
        name: "",
        orgCode: ""
      },
      ruleValidate5: {
        address: [
          {required: true, message: "回传地址不能为空",trigger: "blur"},
          {pattern:/((25[0-5])|(2[0-4]d)|(1dd)|([1-9]d)|d)(.((25[0-5])|(2[0-4]d)|(1dd)|([1-9]d)|d)){3}/,message: "请输入正确的回传地址",trigger: "change"}
        ],
        port: [
          {required: true, message: "回传端口不能为空",trigger: "blur"},
          {pattern:/^[0-9]{4}$/,message: "必须为4位数字值",trigger: "change"}
        ]
      },
      ruleValidate3: {},
      ruleValidate4: {},
      ruleValidate: {
        name: [
          {required: true,message: "区域名称不能为空",trigger: "blur"}
          ],
        orgCode: [
          {required: true, message: "区域编码不能为空",trigger: "blur"},
          {pattern:/^[0-9]{12}$/,message: "必须为12位数字值",trigger: "change"}
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
      model4: '',
      data: [],
      total: 0,
      page: 1,
      list: 10,
      input2: "",
      ids: [],
      id:'',
      Group_ids: [],
      GroupDev_ids: [],
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
          width: 50,
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
          title: "设备状态",
          key: "model"
        },
        {
          title: "播发状态",
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
                        this.set(params.row.id);
                      }
                    }
                  },
                  "参数设置"
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
      columns3: [
        {
          type: "selection",
          width: 60,
          align: "center",
          _checked: true
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
      ],
      data3:[],
      columns4: [
        {
          title: "标题",
          key: "title1",
          width:100,
        },
        {
          title: "内容",
          key: "content1",
        },
        {
          title: "标题",
          width:100,
          key: "title2",
        },
        {
          title: "内容",
          key: "content2",
        },
      ],
      data1: [],
      modalGroup1: false,
      formValidate2: {
        groupName: "",
        remarks: ""
      },
      total1: 0,
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
      ],
      data2: [],
      total2: 0,
      modalGroupDev1:false,
      columns2: [
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
      ],
      data4:[],
      areaIDarr:[]
    };
  },
  methods: {

    /* ..........................   区域管理 ................................  */
    //获取数据
    getDatas() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
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
        this.axios({
        method: "get",
        url: `${this.baseUrl}/org/getAreaName?id=${this.pearentID}`
      }).then(res => {
        if(res.data.body=="无该区域"){
           this.pearentTitle="中国"
        }else{
          this.pearentTitle = res.data.body;
        }
        this.formValidate.upname=this.pearentTitle;
        this.modalForm1 = true;
      });
        
      }
    },
    handleSubmit(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.formValidate.id = -1;
          this.formValidate.parent_id = this.areaID;
          this.axios({
            url: `${this.baseUrl}/org/modifyArea`,
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
            method: "get",
            url: `${this.baseUrl}/org/getAreaName?id=${this.pearentID}`
          }).then(res => {
            if(res.data.body=="无该区域"){
              this.pearentTitle="中国"
            }else{
              this.pearentTitle = res.data.body;
            }
            this.axios({
              url: `${this.baseUrl}/org/getArea?id=${this.areaID}`,
              method: "get"
            }).then(res => {
              this.formValidate = res.data.body;
              this.formValidate.upname=this.pearentTitle;
              this.modalForm2 = true;
            });
          });
      }
    },
    handleSubmit1(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.formValidate.id = this.areaID;
          this.formValidate.parentid = this.pearentID;
          this.axios({
            url: `${this.baseUrl}/org/modifyArea`,
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
              url: `${this.baseUrl}/org/deleteArea`,
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
      var arr=[]
      for(var i=0;i<data.length;i++){
        arr.push(data[i].id)
      }
      this.areaIDarr=arr;
      this.areaDevice();
    },
    //根据区域显示终端设备
    areaDevice() {
      this.axios({
        method: "post",
        url: `${this.baseUrl}/device/getByOrg`,
        data:this.qs.stringify({ids:JSON.stringify(this.areaIDarr) ,page:this.page-1,size:this.list})
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    /* .........................   终端设备管理 .........................  */
    //获取设备数据
    getdeviceData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/device/getAll?page=${this.page -
          1}&size=${this.list}`
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    //查看详情
    detail(row) {
      // 请示数据，打开对话框，显示表单的数据，进行提交
      this.axios({
        url: `${this.baseUrl}/device/getOne?ids=${row.id}`,
        method: "get"
      }).then(res => {
        var data=res.data.body
        var arr=[];
        arr.push({title1:"物理编码:",content1:data.devCode,title2:"逻辑编码:",content2:data.devLogic});
        arr.push({title1:"设备别名:",content1:data.alias,title2:"设备型号:",content2:data.model});
        arr.push({title1:"设备厂家:",content1:data.manufacturer,title2:"硬件版本:",content2:data.hardwareVersion});
        arr.push({title1:"固件版本:",content1:data.softwareVersion,title2:"联系人:",content2:data.person});
        arr.push({title1:"联系电话:",content1:data.phone});
        this.data3=arr;
        this.modal2 = true;
      });
    },
    /* 权限设置 */
    set(id){
      // 打开对话框，
      this.ids.push(id);
      this.modalForm3=true;
    },
    //添加修改设备数据
    edit(id) {
      // 请示数据，打开对话框，显示表单的数据，进行提交
      this.axios({
        url: `${this.baseUrl}/device/getOne?ids=${id}`,
        method: "get"
      }).then(res => {
        this.formValidate1 = res.data.body;
        this.modal1 = true;
      });
    },
    handleSubmitDev(username) {
      var params = new URLSearchParams();
      params.append("device", JSON.stringify(this.formValidate1));
      params.append("broRegionId", this.areaID);
      this.$refs[username].validate(valid => {
        if (valid) {
          if (this.formValidate1.id) {
            params.append("id", this.formValidate1.id);
            this.axios({
              url: `${this.baseUrl}/device/save`,
              method: "post",
              data: params
            }).then(res => {
              this.areaDevice();
              this.modal1 = false;
              this.$Message.info("修改成功");
            });
          } else {
            this.formValidate1.id = -1;
            params.append("id", this.formValidate1.id);
            this.axios({
              url: `${this.baseUrl}/device/save`,
              method: "post",
              data: params
            }).then(res => {
              this.modal1 = false;
              this.areaDevice();
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
            url: `${this.baseUrl}/device/delete`,
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
    /* ..............................   分组管理 ...............................  */
    //点击当前分组
    getGroupId(row, index) {
      console.log(row.id);
      this.groupID = row.id;
      this.getGroupDevData();
    },
    //获取分组数据
    getgroupData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/device/findAllGroup?page=${this.page -
          1}&size=${this.list}`
      }).then(res => {
        this.total1 = res.data.body.totalElements;
        this.data1 = res.data.body.content;
      });
    },
    //添加分组
    addGroup() {
      this.modalGroup1 = true;
    },
    handleSubmitGroup(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl}/device/saveGroup`,
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
          url: `${this.baseUrl}/device/findGroup?id=${this.groupID}`,
          method: "get"
        }).then(res => {
          this.formValidate2 = res.data.body;
          this.modalGroup1 = true;
        });
      }
    },
    handleSubmit2(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl}/device/saveGroup`,
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
      if (typeof this.groupID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击你要删除的分组</p>"
        });
      } else {
      this.Group_ids.push(this.groupID);
      var params = new URLSearchParams();
      params.append("groupId", JSON.stringify(this.Group_ids));
      this.$Modal.confirm({
        title: "确认删除？",
        content: "<p>数据删除后将不可恢复</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: `${this.baseUrl}/device/deleteDeviceGroup`,
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
      }
    },
    //根据分组获取设备信息
    getGroupDevData(){
      var params = new URLSearchParams();
      params.append("groupId", this.groupID);
      params.append("page", this.page-1);
      params.append("size",this.list);
       this.axios({
        method: "post",
        url: `${this.baseUrl}/device/findDeviceByGroup`,
        data:params
      }).then(res => {
        this.total2 = res.data.body.totalElements;
        this.data2 = res.data.body.content;
      });
    },
    //添加分组终端设备
    check(){
      for(var i=0;i<this.data.length;i++){
          for(var j=0;j<this.checkData.length;j++){
            if(JSON.stringify(this.data[i]) ==JSON.stringify(this.checkData[j])){
              this.data[i]._checked=true;
            }
          }
        }
        this.data4=this.data
    },
    getID1(data){
      this.areaID = data[0].id;
      this.pearentID = data[0].parentId;
      var arr=[]
      for(var i=0;i<data.length;i++){
        arr.push(data[i].id)
      }
      this.areaIDarr=arr;
      this.axios({
        method: "post",
        url: `${this.baseUrl}/device/getByOrg`,
        data:this.qs.stringify({ids:JSON.stringify(this.areaIDarr) ,page:this.page-1,size:this.list})
      }).then(res => {
        this.data=res.data.body.content
        this.check();
      });
    },
    modaladdGroupDev(){
      this.modalGroupDev1=true;
      var params = new URLSearchParams();
      params.append("groupId", this.groupID);
      params.append("page", this.page-1);
      params.append("size",this.list);
       this.axios({
        method: "post",
        url: `${this.baseUrl}/device/findDeviceByGroup`,
        data:params
      }).then(res => {
        this.getdeviceData()
        this.checkData=res.data.body.content
        this.check()
      });
    },
    addGroupDevOk(){
      this.axios({
        url: `${this.baseUrl}/device/updateDeviceGroup`,
        method: "post",
        data:this.qs.stringify({groupId:this.groupID,deviceIds: JSON.stringify(this.GroupDev_ids) ,update:0})
      }).then(res => {
        this.modalGroup1 = false;
        this.getGroupDevData();
      });
    },
    //删除分组终端设备
    removeGroupDev(){
      if (typeof this.groupID == "undefined") {
        this.$Modal.confirm({
          title: "温馨提示",
          content: "<p>请先点击你要删除的分组设备</p>"
        });
      } else {
      var params = new URLSearchParams();
      params.append("groupId", this.groupID);
      params.append("deviceIds", JSON.stringify(this.delGroupDev_ids) );
      params.append("update",1);
      this.$Modal.confirm({
        title: "确认删除？",
        content: "<p>数据删除后将不可恢复</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: `${this.baseUrl}/device/updateDeviceGroup`,
            data: params
          }).then(res => {
            this.getGroupDevData();
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
      }
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
    onSelectaddGroupDev(selections) {
      /*  console.log(selections); */
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.GroupDev_ids = ids;
      console.log(this.GroupDev_ids);
    },
    onSelectdelGroupDev(selections) {
      /*  console.log(selections); */
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.delGroupDev_ids = ids;
      console.log(this.delGroupDev_ids);
    },
       /* 权限提交 */
     /*  1.回传服务器 */
    handleSubmit5(formValidate5) {
      this.$refs[formValidate5].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl1}/msg/setMsgTerminal`,
            method: "post",
            data: {
                 ids: this.ids,
                 type:"reback",
                 address : this.formValidate5.address,
                 port: this.formValidate5.port
            }
          }).then(res => {
            this.modalForm3 = false;
            this.getDatas();
            this.ids=[];
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    /*2. 在线升级提交 */
     handleSubmit3(formValidate3) {
      this.$refs[formValidate3].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl1}/msg/setMsgTerminal`,
            method: "post",
            data: {
                 ids: this.ids,
                 type:"upgrade",
                 address : this.formValidate3.address,
                 port: this.formValidate3.port,
                 username: this.formValidate3.username,
                 pwd : this.formValidate3.pwd,
                 filename : this.formValidate3.filename,
            }
          }).then(res => {
            this.modalForm3 = false;
            this.getDatas();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    /*3. 调频频率提交 */
     handleSubmit4(formValidate4) {
      this.$refs[formValidate4].validate(valid => {
        if (valid) {
          this.axios({
            url: `${this.baseUrl1}/msg/setMsgTerminal`,
            method: "post",
            data: {
                 ids: this.ids,
                 type:"setfreq",
                freqArray:[
                  {level: this.formValidate4.level ,
                  freq: this.formValidate4.freq}
                ]
            }
          }).then(res => {
            this.modalForm3 = false;
            this.getDatas();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },

      /* 多个设备权限设置 */
    modalForm3click(){
      if(this.ids.length>1){
          this.modalForm3=true
      }else{
         this.$Message.info('请选择多个设备')
      }
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
    },
  },
  mounted() {
    this.getDatas();
    this.getdeviceData();
    this.getgroupData();
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
.group-height .ivu-table-row-highlight td {
  background-color: #d3e3f3 !important;
}
.group-height .ivu-table-row-hover td {
  background-color: #d3e3f3 !important;
}
.devcheck  td{
  height:40px;
  font-size:14px
}
.fuck {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 0;
}
.ivu-table td, .ivu-table th{
  height:44px;
}
</style>

