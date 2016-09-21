/**
 * Created by admin on 2015/12/6.
 */
define(function (require) {
    var Pop = require('pop');
    var po = new Pop.Pop();
    $('#common').on('click', function () {
        po.common({
            width: '250',
            height: '220',
            titleContent: '感谢您分享此课程',
            content: '<img src="./img/appleCoinImg.png"/>',
            footerContent: '+50金苹果',
            skinClassName: 'addApplePop',
            hasCloseBtn: true,
            hasAnimate: {
                //animateName: 'goldAppleAnimate',
                animateDuration: '1200'
            }
        });
    });
    $('#alert').on('click',function () {
        po.alert({
            handler4SureBtn:function () {
                alert('参数sure回调')
            }
        }).on('sure',function () { 
            alert('观察这模式sure回调')
        })
    });
    $('#confirm').on('click',function () {
        po.confirm({
            handler4SureBtn:function () {
                alert('参数sure回调')
            },
            handler4CancelBtn:function () {
                alert('参数cancel回调')
            }
        }).on('sure',function () {
            alert('观察这模式sure回调')
        }).on('cancel',function(){
            alert('观察这模式cancel回调')
        })
    });
    $('#onlyContent').on('click',function(){
        po.onlyContent({
            content:'hello'
        })
    });
    $('#dialog').on('click',function () {
        po.dialog({
            footerButtons:[
                {
                    btnText: 'btn1',
                    callback: function () {
                        alert('btn1')
                    }
                },
                {
                    btnText: 'btn2',
                    callback: function () {
                        alert('btn2')
                    }
                },
                {
                    btnText: 'btn3',
                    callback: function () {
                        alert('btn3')
                    }
                },
            ]
        })
    })
});