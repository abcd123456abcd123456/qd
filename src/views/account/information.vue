<template>
  <div>
    <div>
      <h-table :loading="userLoading" :columns="user_columns" :data="userList">
      </h-table>
    </div>
    <div v-show="pagination.total > 0" class="pagination-wrap">
      <h-page v-bind="pagination" @on-change="changePagination"></h-page>
    </div>
    <h-msg-box
      v-model="userMsgBoxVisible"
      :title="`编辑${userFormMsgBoxData.name}`"
    >
      <h-form
        ref="userForm"
        :model="userFormData"
        :rules="userRuleValidate"
        :label-width="80"
      >
        <h-form-item label="客户类型" prop="type" required cols="2">
          <h-radio-group v-model="userFormData.type">
            <h-radio
              v-for="(type, key) in userTypeOrm"
              :key="key"
              style="margin-right: 24px"
              :label="key"
            >
              {{ type }}
            </h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="姓名" prop="name" required>
          <h-input v-model="userFormData.name" placeholder="请输入" />
        </h-form-item>
        <h-form-item label="手机号码" prop="phone" required>
          <h-input v-model="userFormData.phone" placeholder="请输入" />
        </h-form-item>
        <h-form-item label="证件类型" prop="certificate_type" required cols="2">
          <h-radio-group v-model="userFormData.certificate_type">
            <h-radio
              v-for="(certificate_type, key) in userCtypeOrm"
              :key="key"
              style="margin-right: 24px"
              :label="key"
            >
              {{ certificate_type }}
            </h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="证件号码" prop="certificate_num" required>
          <h-input
            v-model="userFormData.certificate_num"
            placeholder="请输入"
          />
        </h-form-item>
        <h-form-item label="状态" prop="state" required cols="2">
          <h-radio-group v-model="userFormData.state">
            <h-radio
              v-for="(state, key) in userStateOrm"
              :key="key"
              style="margin-right: 24px"
              :label="key"
            >
              {{ state }}
            </h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item style="text-align: right">
          <h-button type="ghost" @click="userFormCancel"> 取消 </h-button>
          <h-button type="ghost" @click="userFormReset"> 重置 </h-button>
          <h-button type="primary" @click="userFormOk"> 提交 </h-button>
        </h-form-item>
      </h-form>
    </h-msg-box>
  </div>
</template>
<script>
import core from "@hsui/core";
import { user_type_orm, user_state_orm, user_ctype_orm } from "../../constant";
export default {
  data() {
    this.timer = null;
    this.userTypeOrm = user_type_orm;
    this.userStateOrm = user_state_orm;
    this.userCtypeOrm = user_ctype_orm;
    const that = this;
    return {
      userLoading: true,
      userMsgBoxVisible: false,
      userFormData: {},
      userFormMsgBoxData: {},
      userRuleValidate: {
        type: [
          {
            required: true,
            message: "请选择客户类型",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur",
          },
        ],
        certificate_type: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change",
          },
        ],
        certificate_num: [
          {
            required: true,
            message: "证件号码不能为空",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
      },
      pagination: {
        current: 1,
        "page-size": 2,
        total: 2,
      },
      user_columns: [
        {
          title: "序号",
          type: "index",
        },
        {
          title: "编号",
          key: "ID",
          render: (h, { row: { ID } }) => h("span", {}, ID.slice(-10)),
          width: 50,
        },
        {
          title: "客户类型",
          key: "type",
          render: (h, { row: { type } }) => {
            return h("span", {}, this.userTypeOrm[type]);
          },
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "手机号码",
          key: "phone",
          width: 105,
        },
        {
          title: "证件类型",
          key: "certificate_type",
          render: (h, { row: { certificate_type } }) => {
            return h("span", {}, this.userCtypeOrm[certificate_type]);
          },
        },
        {
          title: "证件号码",
          key: "certificate_num",
          width: 155,
        },
        {
          title: "状态",
          key: "state",
          render: (h, { row: { state } }) => {
            return h("span", {}, this.userStateOrm[state]);
          },
          width: 55,
        },
        {
          title: "余额",
          key: "amount",
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          render(h, { row, row: { ID, name } = {} }) {
            return h("div", [
              h(
                "h-poptip",
                {
                  props: {
                    title: `确认删除${name}?`,
                    confirm: true,
                    width: 200,
                    transfer: true,
                  },
                  on: {
                    "on-ok": () => {
                      that.deluser(ID, name);
                    },
                    "on-cancel": () => {
                      that.$hMessage.info({
                        content: `取消删除${name}`,
                        durtion: 3,
                        closable: true,
                      });
                    },
                  },
                },
                [
                  h(
                    "Button",
                    {
                      props: { type: "text", size: "small" },
                    },
                    "删除"
                  ),
                ]
              ),
              h(
                "Button",
                {
                  props: { type: "text", size: "small" },
                  on: {
                    click() {
                      that.userMsgBoxVisible = true;
                      that.userFormMsgBoxData = { ...row };
                      that.userFormData = { ...row };
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      userList: [],
    };
  },
  created() {
    this.getuserList();
  },
  methods: {
    deluser(ID, name) {
      core
        .fetch({
          method: "post",
          url: "/api/product/del",
          data: {
            ID,
          },
        })
        .then((res) => {
          if (res.code === 1) {
            this.$hMessage.success(`删除${name}成功！`);
            this.getuserList();
          }
        })
        .catch(() => {
          this.$hMessage.error({
            content: `删除${name}失败`,
            durtion: 3,
            closable: true,
          });
        });
    },
    getuserList() {
      core
        .fetch({
          method: "get",
          url: "//////////////////////////////",
          data: {
            current: 1,
            pageSize: 3,
          },
        })
        .then((res) => {
          const { code, data, pagination } = res;
          if (code === 1) {
            this.userLoading = false;
            this.userList = data;
            this.pagination = {
              ...pagination,
            };
          }
        });
    },
    createuser() {
      core
        .fetch({
          method: "post",
          url: "/api/product/add",
          data: { ...this.userFormData },
        })
        .then((res) => {
          if (res.code === 1) {
            this.getuserList();
            this.resetuserFormMsgBoxData();
            this.resetuserFormData();
          }
        });
    },
    updateuser() {
      core
        .fetch({
          method: "post",
          url: "/api/product",
          data: { ...this.userFormData },
        })
        .then((res) => {
          if (res.code === 1) {
            this.getuserList();
            this.resetuserFormMsgBoxData();
            this.resetuserFormData();
          }
        });
    },
    userFormOk() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          if (this.userFormData.ID) {
            this.updateuser();
          } else {
            this.createuser();
          }
        } else {
          this.$Message.error("表单验证失败!");
          return;
        }
      });
    },
    userFormCancel() {
      this.resetuserFormMsgBoxData();
      this.resetuserFormData();
    },
    userFormReset() {
      this.resetuserFormData();
    },
    resetuserFormMsgBoxData() {
      this.userMsgBoxVisible = false;
      this.userFormMsgBoxData = {};
    },
    resetuserFormData() {
      this.userFormData = {};
      this.timer = setTimeout(() => {
        this.$refs["userForm"].resetValidate();
      }, 0);
    },
    changePagination(page) {
      core
        .fetch({
          method: "get",
          url: "/api/product",
          data: {
            current: page,
            pageSize: 2,
          },
        })
        .then((res) => {
          const { code, data, pagination } = res;
          if (code === 1) {
            this.userLoading = false;
            this.userList = data;
            this.pagination = {
              ...pagination,
            };
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.pagination-wrap {
  margin-top: 12px;
  text-align: right;
}
</style>
