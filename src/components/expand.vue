<template>
  <Table border class="expend" :columns="columns" :showHeader="false" :data="data" style="overflow-y: hidden;max-height: 522px;"></Table>
</template>

<script>
import expandRow from "../components/expand.vue";
export default {
  props: ["row"],
  data() {
    return {
      loading: false,
      columns: [
        {
          type: "expand",
          width: 30,
          align:"center",
          render: (h, params) => {
            return h(expandRow, {
              style: {
                padding: 0
              },
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "行政区域",
          key: "regionName",
          width: 90,
          align: "center"
        },
        {
          title: "在线数",
          key: "online",
          width: 60,
          align: "center"
        },
        {
          title: "回传数",
          width: 60,
          key: "backDevice",
          align: "center"
        },
        {
          title: "总数",
          key: "allDevice",
          width: 60,
          align: "center"
        },
        {
          title: "在线率(%)",
          key: "onlinepenc",
          width: 80,
          align: "center"
        }
      ],
      data: []
    };
  },
  mounted() {},
  methods: {},
  created() {
    var object = this.row.children;
    console.log(this.row,object,898);
    object.forEach(r => {
      this.data.push(r);
    });
    console.log(this.data);
  }
};
</script>

<style>
.expend tr .ivu-table-expanded-cell {
  padding: 0;
}
.expend .ivu-table td{
  height:32px;
  padding:0;
}
.expend .ivu-table-cell{
  padding-left:0px;
  padding-right:0px;
}
.ivu-table-cell-with-expand{
  height:32px;
}
</style>