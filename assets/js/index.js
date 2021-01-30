$(function () {
    getUserInfo()

    var layer = layui.layer

  
  $('#btnLogout').on('click', function() {
    
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",

        success(res) {
            if (res.status) {
                return layui.layer.msg('獲取用戶信息失敗')
            }
            renderAvatar(res.data)
        }
    });
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();

    }
}