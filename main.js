//定义function $和$$，方便后面书写
function $(selector){
  return document.querySelector(selector)
}
function $$(selector){
  return document.querySelectorAll(selector)
}


//点击右上角icon出现登录|注册框
$('header .login').addEventListener('click',function(e){
  e.stopPropagation()
  $('.flip-modal').classList.add('show')
})




//登录|注册框翻转效果切换
//事件代理写法：
$('.flip-modal').addEventListener('click', function(e){
  e.stopPropagation()  //阻止冒泡是因为下面要在document上设置click框消失事件
  if(e.target.classList.contains('login')){
    $('.flip-modal').classList.remove('register')
    $('.flip-modal').classList.add('login')
  }
  if(e.target.classList.contains('register')){
    $('.flip-modal').classList.add('register')
    $('.flip-modal').classList.remove('login')
  }
})

//登录|注册框翻转效果切换
//普通写法
// $$('.modal .login').forEach(function(node){
//   node.onclick = function(){
//     $('.flip-modal').classList.remove('register')
//     $('.flip-modal').classList.add('login')
//   }
// })
// $$('.modal .register').forEach(function(node){
//   node.onclick = function(){
//     $('.flip-modal').classList.remove('login')
//     $('.flip-modal').classList.add('register')
//   }
// })



//点击登录|注册框的关闭按钮，隐藏框效果
$$('.close').forEach(function(node){
  node.addEventListener('click',function(){
    $('.flip-modal').classList.remove('show')
  })
})
// 同上一样的效果
// for(var i=0; i<2; i++){
// $$('.close')[i].addEventListener('click',function(){
//   $('.flip-modal').classList.remove('show')
// })
// }



//点击密码栏后面的showpassword按钮进行密码样式的切换
//对password做绑定事件
$$('.showpassword').forEach(function(node){
  node.addEventListener('click',function(){
    //针对name为passowrd的input做事件绑定
    var showpassword = $$('.flip-modal input[name=password]');
    for (var i = 0; i<showpassword.length;i++){
      if(showpassword[i].type === 'password'){
            showpassword[i].type = 'text';
      }else{
        showpassword[i].type = 'password';
      }
    }
  })
})

$('.showpassword2').addEventListener('click',function(){
    //针对name为passowrd的input做事件绑定
    //针对name为passowrd2的input做再单独做一次事件绑定，因为只有一个，所以直接使用$函数，没有类数组对象也不用for循环了
    var showpassword2 = $('.flip-modal input[name=password2]');
    if(showpassword2.type === 'password'){
          showpassword2.type = 'text';
    }else{
      showpassword2.type = 'password';
    }
})



//点击除了登录|注册框的其他区域也关闭框  需在.flip-modal的div上设置阻止冒泡
document.addEventListener('click', function(){
  $('.flip-modal').classList.remove('show')
})




//登录注册正则匹配后在登录|注册框提示
//登录框匹配
$('.modal-login form').addEventListener('submit', function(e){
  e.preventDefault()   //阻止submit的默认事件，即先提交，进行完下面的正则匹配之后，返回true才提交
  if(!/^\w{3,8}$/.test($('.modal-login input[name=username]').value)){
    $('.modal-login .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线'
    return false
  }
  if(!/^\w{6,10}$/.test($('.modal-login input[name=password]').value)){
    $('.modal-login .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线'
    return false
  }
  this.submit()
})

//注册框匹配
$('.modal-register form').addEventListener('submit', function(e){
  e.preventDefault()  //作用同上
  if(!/^\w{3,8}$/.test($('.modal-register input[name=username]').value)){
    $('.modal-register .errormsg').innerText = '用户名需输入3-8个字符，包括字母数字下划线'
    return false
  }
  if(/^root$|^evenyao$/.test($('.modal-register input[name=username]').value)){
    $('.modal-register .errormsg').innerText = '用户名已存在'
    return false
  }
  if(!/^\w{6,10}$/.test($('.modal-register input[name=password]').value)){
    $('.modal-register .errormsg').innerText = '密码需输入6-10个字符，包括字母数字下划线'
    return false
  }
  if($('.modal-register input[name=password]').value !== $('.modal-register input[name=password2]').value){
    $('.modal-register .errormsg').innerText = '两次输入的密码不一致'
    return false
  }
  this.submit()
})
