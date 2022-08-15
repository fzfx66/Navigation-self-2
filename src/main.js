const $siteList = $('.siteList')
const $lastLi = $siteList.find('.addSite')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
{ logo:'A',url:'https://www.acfun.cn'},
{logo:'B',url:'https://www.bilibili.com'},
]

const simplifyUrl = (url) => {
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
        .replace('.com','')
}

const render = ()=>{
    $siteList.find('li:not(.addSite)').remove()     /*唯独不找最后一个li;渲染前把之前的删除*/
    hashMap.forEach((node,index)=>{     //node代表当前元素，即hashMap中的一项
        // 此处的$代表的
        const $li = $(`<li>                        
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">×</div>
                </div>
                    </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()     //阻止冒泡
            hashMap.splice(index,1) //点击删除网站，删去数组中的此项索引
            render()
        })
    })
}

render()

$('.addSite')
    .on('click',()=>{
        let url = window.prompt('请问您想要添加的网站是什么？')
        if(url.indexOf('http') !== 0){
            url = 'https://' + url;
        }
        hashMap.push({logo: simplifyUrl(url)[0].toUpperCase(),logoType: 'text',url:url})
       render()
    })

// 似乎这里有点问题
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    window.localStorage.setItem('x',string)
}

// 键盘事件
$(document).on('keypress',(e)=>{
    const {key}=e;      //等价于key=e.key
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo === key.toUpperCase()){
            window.open(hashMap[i].url)
        }
    }
})

/*__________自己写的部分_______@日期时间___*/

const Time = () => {
    console.log('fuck')
    let timeLocal = new Date();
    const newTime = timeLocal.toString().split(' ');
    let week = newTime[0];
    let months = newTime[1];
    let date = newTime[2];
    const splitTime = newTime[4].split(':');

    switch (months) {
        case 'Jan' :
            months = "一月";
            break;
        case 'Feb' :
            months = "二月";
            break;
        case 'Mar' :
            months = "三月";
            break;
        case 'Apr':
            months = "四月";
            break;
        case 'May' :
            months = "五月";
            break;
        case 'Jun' :
            months = "六月";
            break;
        case 'Jul' :
            months = "七月";
            break;
        case 'Aug' :
            months = "八月";
            break;
        case 'Sept' :
            months = "九月";
            break;
        case 'Oct' :
            months = "十月";
            break;
        case 'Nov' :
            months = "十一月";
            break;
        case 'Dec' :
            months = "十二月";
            break;
    }
    switch (week) {
        case 'Mon' :
            week = "周一";
            break;
        case 'Tues' :
            week = "周二";
            break;
        case 'Wed' :
            week = "周三";
            break;
        case 'Thur':
            week = "周四";
            break;
        case 'Fri':
            week = "周五";
            break;
        case 'Sat':
            week = "周六";
            break;
        case 'Sun':
            week = "周日";
            break;
    }
    document.getElementById('localTime').value = (splitTime[0] + ':' + splitTime[1])
    document.getElementById('date').value = (months + '     ' + date + '     ' + week)
}

Time()
setInterval(Time, 20000);

/*__________自己写的部分_______@便签___*/

// $(
//     function(){
//     // 页面加载时运行
//     let _Mark = localStorage.getItem("_Mark");
//     if(_Mark){
//         $(".box").html(_Mark);
//         auto_timer();
//     }
//     // 屏蔽浏览器的右键
//     document.oncontextmenu = function(){
//         return false;
//     }
//     // 按下鼠标显示右键菜单
//     $(document).mousedown(function(e){
//         var key = e.which; // 获取鼠标的键位（右键3，左键1，鼠标滚轮2）
//         if(key === 3){
//             var x = e.clientX;
//             var y = e.clientY;
//             $("#test").html("X = " + x + " : Y = " + y);
//             $(".menu").show().css({left:x,top:y});
//         }
//     });
//     // 隐藏右键
//     // $(document).click(function(){
//     //     $(".menu").hide();
//     // });
//
// });
// // 右键的功能
// function tz_menu(flag){
//     // 添加便签
//     if(flag === 1){
//         // 获取当前鼠标的右键的位置
//         var left = $(".menu").offset().left;
//         var top = $(".menu").offset().top;
//
//         // 生成1到3的随机数
//         var random = Math.floor(Math.random()*3) + 1;
//
//         $(".box").append("<div class='b_list animated rollIn' style='left:"+left+"px;top:"+top+"px;'><img src='images/"+random+".png' alt='便签' width='294' height='310'/>"+
//             "<div class='b_content' contenteditable='true'></div>"+
//             "<p class='timer'><span>3</span>秒后自动保存</p></div>");
//         auto_timer();
//     }
//     // 清空标签
//     if(flag === 2){
//         $(".b_list").removeClass("animated rollIn").addClass("animated bounceOut").fadeOut(1000);
//         // 清空缓存
//         localStorage.removeItem("_Mark");
//     }
// // }
// // // 自动保存时间
// function auto_timer(){
//     var count = 3;
//     var timer = setInterval(function(){
//         if(count <= 0){
//             count = 3;
//             // 保存本地内容
//             localStorage.setItem("_Mark",$(".box").html());   /*xing*/
//         }
//         $(".timer").find("span").text(count);
//         count--;
//     },1000);
// }


