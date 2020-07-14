<template>
  <div>
    <h1>计算器</h1>
    <div>{{ msg }}</div>
    <el-input
      v-model="calculateText"
      placeholder="请输入算式"
      style="width:40vw"
      id="input"
    ></el-input>
    <el-button type="primary" @click="calculate" id="calculate-btn"
      >计算</el-button
    >
    <el-table
      :data="results"
      style="width:50vw; margin-left: 25vw"
      :row-class-name="rowClass"
    >
      <el-table-column label="算式" prop="text"></el-table-column>
      <el-table-column label="结果" prop="result"></el-table-column>
    </el-table>
    <el-button @click="login" id="login-btn">登录</el-button>
  </div>
</template>

<script>
import { calculate as calculateFunc } from "@/lib/calculate";

export default {
  props: {
    msg: String
  },
  data() {
    return {
      calculateText: "",
      results: [],
      isLogin: false
    };
  },
  methods: {
    calculate() {
      let resultObj;
      try {
        const result = calculateFunc(this.calculateText);
        resultObj = {
          text: this.calculateText,
          result,
          isSuccess: true
        };
      } catch (e) {
        const result = "Error";
        resultObj = {
          text: this.calculateText,
          result,
          isSuccess: false
        };
      }
      this.results.splice(0, 0, resultObj);
    },
    rowClass({ row }) {
      return row.isSuccess ? "success" : "error";
    },
    login() {
      return this.axios
        .get("/login")
        .then(res => {
          if (res === "success") {
            this.isLogin = true;
            return true;
          } else {
            this.isLogin = false;
            return false;
          }
        })
        .catch(() => {
          this.isLogin = false;
          return false;
        });
    }
  }
};
</script>

<style>
.el-table .error {
  background: oldlace;
}

.el-table .success {
  background: #f0f9eb;
}
</style>
