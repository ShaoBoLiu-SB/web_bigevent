$(function () {
  // 点击“注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })


  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过 from.verify()函数自定义校验规则
  form.verify({
    //自定义密码的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于判断
      //如果判断失败，则return一个错误提示
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1.阻止默认的提交行为
    e.preventDefault();
    // 3.把要提交的用户数据抽取出来
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    //2. 发起ajax的POST请求
    $.post('/api/reguser', data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        //模拟人的点击行为
        setTimeout(() => {
          $('#link_login').click()
        }, 1000)
      })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      // 快速获取表单中的数据
      data:$(this).serialize(),
      success(res) {
        if(res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        //将登录成功得到的 token字符串，保存到localStorage中
        localStorage.setItem('token', res.token)
        console.log(res.token);
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

})