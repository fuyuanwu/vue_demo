<template lang="html">
  <div class="sidebar float_left">
    <ul class="nav-ul">
      <li class="nav-item"><i class="saving_pot-icon"></i>企业存钱罐</li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item"><i class="staff-icon"></i>员工管理</li>
      <li class="nav-item"><i class="dept-icon"></i>部门管理<span class="bewaiting hide">敬请期待</span></li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item nav-item-active"><i class="salary-icon"></i>薪酬发放</li>
      <li class="nav-item"><i class="welfare_m-icon"></i>福利管理</li>
      <li class="nav-item"><i class="welfare_s-icon"></i>福利商城</li>
      <li class="nav-item"><i class="examination-icon"></i>日常审批<span class="bewaiting hide">敬请期待</span></li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item"><i class="report-icon"></i>人事报表</li>
      <li class="nav-item"><i class="report-icon"></i>薪福报表</li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item"><i class="contract-icon"></i>合同管理</li>
      <li class="nav-item"><i class="trade_recordes-icon"></i>交易记录</li>
      <li class="nav-item"><i class="statement-icon"></i>对账单</li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item"><i class="message-icon"></i>消息中心</li>
    </ul>
    <ul class="nav-ul">
      <li class="nav-item"><i class="setting-icon"></i>账户设置</li>
      <li class="nav-item"><i class="authority-icon"></i>权限管理</li>
      <li class="nav-item"><i class="setting-icon"></i>薪酬设置</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../style/app/icon/icon.scss";

  .sidebar {
    width: 210px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 6px;
    height: 726px;
    overflow: hidden;
    .nav-ul {
      border-bottom: 1px solid #DBDBDB;
      padding: 8px 0;
      .nav-item {
        height: 38px;
        padding-left: 30px;
        line-height: 38px;
        cursor: pointer;
        color: #616161;
        position: relative;
        i {
          margin-right: 10px;
        }
      }
      .nav-item:hover {
        background-color: #E8E9EA;
        color: #333;
      }
      .nav-item-active {
        color: #333;
        background-color: #E8E9EA;
      }
      .bewaiting {
        border-radius: 4px;
        padding: 4px;
        color: #fff;
        font-size: 12px;
        margin-left: 10px;
        background-color: #B2C2D2;
      }
    }
  }

</style>
