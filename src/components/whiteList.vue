<template>
  <div style="margin-top:30px;padding-left:10px">
    <div style="margin:0 0 20px 10px;font-size:20px">白名单管理</div>
    <Button type="success" @click="addwhiteList" style="margin-right:5px">添加白名单</Button>
    <Button type="error" @click="remove" style="margin-right:5px">删除多个</Button>
    <Input search v-model="input2" placeholder="请输入姓名或电话号码" :style="{width:200+'px'}" />
    <Button type="info" @click="sousuo">搜索</Button>
    <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
    <Page :total="total1" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer></Page>
    <Modal v-model="modal" title="白名单" width="70%" @on-ok="handleSubmitWtl('formValidate')">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="overflow:hidden">
        <div style="width:22%;float:left;">
          <FormItem label="用户姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户姓名"></Input>
          </FormItem>
          <FormItem label="电话号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入电话号码"></Input>
          </FormItem>
          <FormItem label="电话密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入电话密码"></Input>
          </FormItem>
          <!-- <FormItem label="等级" prop="level">
            <Input v-model="formValidate.level" placeholder="请输入等级"></Input>
          </FormItem>
          <FormItem label="备注" prop="input">
            <Input type="textarea" :autosize="{minRows: 1,maxRows: 2}" v-model="formValidate.input" placeholder="请输入备注"></Input>
          </FormItem> -->
        </div>
        <div style="width:74%;float:right;">
          <div style="font-size:18px;margin-bottom:10px;font-weight:500;">.请选择区域设备</div>
          <div style="width:28%;background:#fff;float:left;">
            <Tree :data="baseData" @on-check-change="getID" @on-select-change="11" show-checkbox></Tree>
          </div>
          <div style="width:72%;float:right;padding-right:20px;">
            <Table border ref="selection" :columns="columns1" :data="data1" class="devData" @on-selection-change="devdataID"></Table>
            <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer transfer show-total :tooltip="true"></Page>
          </div>
        </div>
      </Form>
    </Modal>
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
    return {
      formValidate: {
        name: "",
        phone: "",
        password: ""
        // level: "",
        // input: ""
      },
      ruleValidate: {
        // password: [{ required: true,validator: validateorgCode, trigger: 'blue' }]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名称",
          key: "name"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "白名单类型",
          key: "level",
          render: (h, params) => {
            var txt = "";
            if (params.row.level == 0) {
              txt = "超级白名单";
            } else {
              txt = "普通白名单";
            }
            return h("div", [h("span", txt)]);
          }
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
                    marginRight: "15px"
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
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "设备别名",
          key: "alias",
          align: "center"
        },
        {
          title: "设备型号",
          key: "model",
          align: "center"
        },
        {
          title: "设备厂家",
          key: "manufacturer",
          align: "center"
        },
        {
          title: "硬件版本",
          key: "hardwareVersion",
          align: "center"
        },
        {
          title: "固件版本",
          key: "softwareVersion",
          align: "center"
        },
        {
          title: "联系人",
          key: "person",
          align: "center"
        },
        {
          title: "联系电话",
          key: "phone",
          align: "center"
        }
      ],
      data: [],
      data1: [],
      baseData: [],
      total: 0,
      total1: 0,
      page: 1,
      list: 10,
      input2: "",
      modal: false,
      areaID: "",
      pearentID: "",
      areaIDarr: [],
      devIDarr: [],
      ids: []
    };
  },
  methods: {
    //获取白名单数据
    getData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/whiteList/findAll?page=${this.page - 1}&size=${
          this.list
        }`
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    },
    //添加白名单数据
    addwhiteList() {
      this.modal = true;
      this.getDatas();
      this.getdeviceData();
    },
    //获取树形数据
    getDatas() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {
        this.baseData = res.data.body;
        this.checkTree();
      });
    },
    //获取设备数据
    getdeviceData() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/device/getAll?page=${this.page - 1}&size=${
          this.list
        }`
      }).then(res => {
        this.total1 = res.data.body.totalElements;
        this.data1 = res.data.body.content;
      });
    },
    //点击勾选树节点递归
    // dg(arr, data, j) {
    //   if (arr.children.length > 0) {
    //     for (var i = 0; i < arr.children.length; i++) {
    //       // console.log(111,arr.children[i].id,data[j].id);
    //       if (arr.children[i].id == data[j].id) {
    //         arr.children[i].checked = data[j].checked;
    //       }
    //       this.dg(arr.children[i], data, j);
    //     }
    //   }
    // },
    //点击当前的树节点
    getID(data, dd) {
      // var arr = this.baseData;
      // for (var j = 0; j < data.length; j++) {
      //   this.dg(arr[0], data, j);
      // }
      // this.baseData = arr;
      // if (dd.checked == true) {
      //   dd.checked = true;
      // } else {
      //   dd.checked = false;
      // }
      var arr = [];
      if (!data.length <= 0) {
        this.areaID = data[0].id;
        this.pearentID = data[0].parentId;
        for (var i = 0; i < data.length; i++) {
          arr.push(data[i].id);
        }
        this.arr = arr;
        this.areaIDarr = this.arr;
      } else {
        this.areaIDarr = [];
      }
      this.areaDevice();
      // this.$refs.selection.selectAll(true)
    },
    //点击当前勾选的数据
    devdataID(selections) {
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.devIDarr = ids;
    },
    //根据区域显示终端设备
    areaDevice() {
      this.axios({
        method: "post",
        url: `${this.baseUrl}/device/getByOrg`,
        data: this.qs.stringify({
          ids: JSON.stringify(this.areaIDarr),
          page: this.page - 1,
          size: this.list
        })
      }).then(res => {
        this.total = res.data.body.totalElements;
        var data = res.data.body.content;
        for (var i = 0; i < data.length; i++) {
          data[i]._checked = true;
        }
        this.data1 = data;
      });
    },
    //修改获取数据
    edit(id) {
      this.axios({
        url: `${this.baseUrl}/whiteList/findOne?id=${id}`,
        method: "get"
      }).then(res => {
        this.getDatas(); //this.baseData
        this.getdeviceData(); //this.data1
        this.formValidate = res.data.body;
        this.checkDev();
        this.modal = true;
      });
    },
    //表格勾选
    checkDev() {
      var checkDevData = this.formValidate.broRegionList;
      var arr = [];
      for (var n = 0; n < checkDevData.length; n++) {
        arr.push(checkDevData[n].id);
      }
      var devids = [];
      for (var n = 0; n < this.formValidate.broDeviceList.length; n++) {
        devids.push(this.formValidate.broDeviceList[n].id);
      }
      this.devIDarr = devids;
      this.axios({
        method: "post",
        url: `${this.baseUrl}/device/getByOrg`,
        data: this.qs.stringify({
          ids: JSON.stringify(arr),
          page: this.page - 1,
          size: this.list
        })
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data1 = res.data.body.content;
        this.checkData = this.formValidate.broDeviceList;
        for (var i = 0; i < this.data1.length; i++) {
          for (var j = 0; j < this.checkData.length; j++) {
            if (
              JSON.stringify(this.data1[i]) == JSON.stringify(this.checkData[j])
            ) {
              this.data1[i]._checked = true;
            }
          }
        }
      });
    },
    //树形勾选
    checkTree() {
      this.checktrData = this.formValidate.broRegionList;
      var arr = this.baseData;
      var arrids = [];
      for (var j = 0; j < this.checktrData.length; j++) {
        this.getTreeD(arr[0], j);
        arrids.push(this.checktrData[j].id);
      }
      this.baseData = arr;
      this.areaIDarr = arrids;
    },
    getTreeD(arr, j) {
      if (arr.children != undefined) {
        for (var i = 0; i < arr.children.length; i++) {
          if (arr.children[i].id == this.checktrData[j].id) {
            arr.children[i].checked = true;
          }
          this.getTreeD(arr.children[i], j);
        }
      }
    },
    //已勾选的区域的所有设备

    handleSubmitWtl(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.formValidate.broDeviceList = "";
          this.formValidate.broRegionList = "";
          this.formValidate.regionId = JSON.stringify(this.areaIDarr);
          this.formValidate.deviceIds = JSON.stringify(this.devIDarr);
          if (this.formValidate.id) {
            this.axios({
              url: `${this.baseUrl}/whiteList/save`,
              method: "post",
              data: this.qs.stringify(this.formValidate)
            }).then(res => {
              this.getData();
              this.modal = false;
              this.$Message.info("修改成功");
            });
          } else {
            (this.formValidate.id = -1),
              this.axios({
                url: `${this.baseUrl}/whiteList/save`,
                method: "post",
                data: this.qs.stringify(this.formValidate)
              }).then(res => {
                this.modal = false;
                this.getData();
              });
          }
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    //
    remove(id) {
      this.ids.push(id);
      var params = new URLSearchParams();
      params.append("ids", JSON.stringify(this.ids));
      this.$Modal.confirm({
        title: "确认删除？",
        content: "<p>删除白名单数据吗？</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: `${this.baseUrl}/whiteList/delete`,
            data: params
          }).then(res => {
            this.getData();
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
    onSelect(selections) {
      //  console.log(selections);
      var ids = [];
      for (let i = 0; i < selections.length; i++) {
        ids.push(selections[i].id);
      }
      this.ids = ids;
    },
    sousuo() {
      this.axios({
        method: "post",
        url: `${this.baseUrl}/whiteList/findByNameOrPhone`,
        data:this.qs.stringify( {
          page: this.page-1,
          size: this.list,
          message: this.input2
        })
      }).then(res => {
        this.total = res.data.body.totalElements;
        this.data = res.data.body.content;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
.devData .ivu-table-cell {
  padding-left: 5px;
  padding-right: 5px;
}
</style>