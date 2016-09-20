/**
 * Created by admin on 2015/12/6.
 */
define(function(require) {
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
      hasAnimate: {
        animateName: 'goldAppleAnimate',
        animateDuration: '1200'
      }
    });
  });
 /* $('#common').on('click', function () {

  })*/
});