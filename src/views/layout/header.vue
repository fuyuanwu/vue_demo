<template lang="html">
  <header class="header clearfix">
    <div class="inner float_left">
      <div class="logo_images"><img src="../../../images/pub/qymf_logo.png" height="40" width="160"></div>
      <div class="company_name">微艾（上海）科技有限公司</div>
      <!-- 对应的状态和icon -->
      <div class="member_status">
        <a href="#" class="status_link"><i class="authed_icon"></i>
          已认证</a>
        <a href="#" class="status_link"><i class="approve_icon"></i>
          审批中</a>
        <a href="#" class="status_link"><i class="unauthed_icon"></i>
          未认证</a>
      </div>
    </div>
    <div class="account_wrap float_right">
      <p>
        <span class="weixinBox"><i class="mobile_icon"></i>员工端</span>
        <span class="admin"><i class="name"></i>管理员<i class="white_arrow_icon"></i></span>
      </p>
      <div class="qrcode">
        <img src="../../../images/app/banner/code.png">
        <div><i class="wexin_icon"></i>扫描微信服务号</div>
      </div>
    </div>
    <div class="userAccount">
      <p class="switch"><a href="#">切换账号</a></p>
      <p><a href="#">注销</a></p>
    </div>
  </header>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .header {
    height: 66px;
    background-color: #3082DF;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  }

  .logo_images {
    width: 180px;
    margin-left: 20px;
    height: 66px;
    line-height: 66px;
    float: left;
    vertical-align: middle;
    margin-left: 20px;
  }

  .company_name {
    height: 66px;
    float: left;
    text-align: center;
    line-height: 66px;
    vertical-align: middle;
    text-indent: 20px;
    color: #fff;
    font-size: 20px;
  }

  .member_status {
    height: 66px;
    float: left;
    text-align: center;
    line-height: 66px;
    vertical-align: middle;
    text-indent: 10px;
    color: #fff;
    font-size: 14px;
    .status_link {
      display: inline-block;
      color: #fff;
    }
  }

  .account_wrap {
    color: #fff;
    p {
      line-height: 66px;
      span {
        display: inline-block;
        cursor: pointer;
        a {
          color: #ffffff;
        }
      }
      .name {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        background: url('../../../images/app/cube_icon.png') no-repeat -306px -426px;
        a {
          color: #ffffff;
        }
      }
    }
  }

  .qrcode {
    z-index: 100;
    position: absolute;
    padding: 10px;
    display: none;
    font-size: 14px;
    margin-top: -10px;
    margin-left: -37px;
    background-color: #fff;
    width: 150px;
    height: 160px;
    border: 1px solid #ccc;
    color: #999;
    text-align: center;
    line-height: 20px;
    img {
      vertical-align: middle;
    }
  }

  .qrcode:after, .qrcode:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    left: 42%;
    position: absolute;
    width: 0;
    z-index: -1;
  }

  .qrcode:after {
    border-width: 11px;
    border-bottom-color: #fff;
    top: -22px;
  }

  .qrcode:before {
    border-width: 11px;
    border-bottom-color: #ccc;
    top: -23px;
  }

  .admin {
    padding: 0 25px;
  }

  .msg {
    text-align: center;
    width: 80px;
    position: relative;
    display: inline-block;
    &:hover {
      background-color: #0073D1;
    }
    .msg__unread {
      width: 10px;
      height: 10px;
      display: inline-block;
      background-color: #D22030;
      border-radius: 8px;
      position: absolute;
      margin-top: 22px;
      margin-left: -6px;
    }
  }

  .weixinBox {
    margin-right: 30px;
  }

  .admin:hover {
    background-color: #0976d2;
  }

  .userAccount {
    background-color: #fff;
    position: absolute;
    display: none;
    right: 0;
    top: 67px;
    z-index: 1;
    width: 146px;
    height: 81px;
    line-height: 40px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    p {
      border-bottom: 1px solid #eee;
      color: #383838;
    }
    p:hover, a:hover {
      color: #0976d2;
    }
    a {
      color: #383838;
      display: inline-block;
      width: 100%;
    }
  }
</style>
