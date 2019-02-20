<template>
  <div style="margin-top:30px;padding-left:30px">
    <div style="margin:0 0 20px 10px;font-size:20px">资源管理</div>
    <Tabs type="card" :animated=false>
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
        <div style="width:75%;float:right;margin-right:60px;">
          <Table border :columns="columns" :data="data" @on-selection-change="onSelect"></Table>
          <Page :total="total" :page-size="list" @on-change="onChangePage" :page-size-opts=[5,10,15,20] @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer></Page>
        </div>
        <Modal v-model="modalForm1" title="区域添加">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="区域名称" prop="name">
              <!-- <Input v-model="formValidate.name" ></Input> -->
              <Input v-model="formValidate.name" placeholder="请输入区域名称"></Input>
            </FormItem>
            <FormItem label="区域编码" prop="orgCode">
              <Input v-model="formValidate.orgCode" placeholder="请输入区域编码"></Input>
            </FormItem>
            <FormItem label="经度" prop="longitude">
              <Input v-model="formValidate.longitude" placeholder="请输入区域经度"></Input>
            </FormItem>
            <FormItem label="纬度" prop="latitude">
              <Input v-model="formValidate.latitude" placeholder="请输入区域纬度"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
          <div slot="footer"></div>
        </Modal>
      </TabPane>
      <TabPane type="card" label="分组管理">
        <div class="ctrl">
          <Button type="warning" @click="addRoot">添加分组</Button>
          <Button type="info" @click="changeTree">修改</Button>
          <Button type="error" @click="confirm">删除</Button>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      modalForm1: false,
      //baseData: [],
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
            message: "请先输入区域名称",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请先输入区域编码",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请先输入区域经度",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请先输入区域纬度",
            trigger: "blur"
          }
        ]
      },
      data: [],
      total: 0,
      page: 1,
      list: 10,
      loading: true,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "终端信息",
          key: "agender"
        },
        {
          title: "终端",
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
              )
            ]);
          }
        }
      ],
      baseData1: [
        {
          expand: true,
          title: "金安国区",
          name: "123123",
          children: [
            {
              title: "时代俊峰镇",
              expand: true,
              //disableCheckbox,
              children: [
                {
                  title: "啊村"
                },
                {
                  title: "那村"
                }
              ]
            },
            {
              title: "弄得镇",
              expand: true,
              children: [
                {
                  title: "是的村"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    //区域管理
    //获取数据
    getDatas() {
      this.axios({
        method: "get",
        url: "http://192.168.4.114:8080/org/allArea"
      }).then(res => {
        console.log(9999);
        this.baseData = res.data.body;
        console.log(res.data.body);
      });
    },
    //添加和修改数据
    handleSubmit(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.obj={
              id: -1,
              parent_id: this.pearentID,
              areaWithResource: this.formValidate
            }
            console.log(qs.stringify(this.obj));
          this.axios({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            url: "http://192.168.4.114:8080/org/modifyArea",
            method: "post",
            data: qs.stringify(this.obj),
          }).then(res => {
            this.modalForm = false;
            this.getData();
          });
        } else {
          this.$Message.error("提交失败");
        }
      });
    },
    handleReset(username) {
      this.$refs[username].resetFields();
    },
    //点击当前的树节点
    getID(data) {
      this.areaID = data[0].id;
      this.pearentID = data[0].parentId;
      console.log(this.areaID);
    },
    // 请示数据，打开对话框，显示表单的数据，进行提交
    changeTree() {
      this.axios({
        url: `http://192.168.4.114:8080/org/allArea?id=${this.areaID}`,
        method: "get"
      }).then(res => {
        this.formValidate = res.data;
        this.modalForm1 = true;
      });
    },
    addRoot() {
      this.modalForm1 = true;
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
    }
  },
  mounted() {
    this.getDatas();
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
</style>

