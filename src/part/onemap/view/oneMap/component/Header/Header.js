import userinfo from './userInfo';
import docButton from './docButton';
import timer from './timer'

var Header = function (options) {
    this.userinfo = new userinfo();

    this.option = $.extend({}, {
        logo: './static/img/logo2.png',
    }, options);

    this.html = $('<div class="OneMap_Header"></div>');
    this.logo = $('<div class="OneMap_Logo"><img src="' + this.option.logo + '" /></div>').appendTo(this.html);

    this.docButton = new docButton();
    this.timer = new timer();

    this.html.append(this.userinfo.html);
    this.html.append(this.docButton.html);
    this.html.append(this.timer.html);
};



export default Header;
