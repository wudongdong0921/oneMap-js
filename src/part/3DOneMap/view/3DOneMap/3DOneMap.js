////////////////////////////////////////////////
// 3D 一张图
// 穆松鹤
// 2021-01-04 10:57:20
////////////////////////////////////////////////
import view_3DOneMap from './compontent/main'

export default {
    render: function () {
        // 生命周期 ： 渲染
        function loadJS(url, callback) {
            var script = document.createElement('script'), fn = callback || function () { };
            script.type = 'text/javascript';
            //IE
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == 'loaded' || script.readyState == 'complete') {
                        script.onreadystatechange = null;
                        fn();
                    }
                };
            } else {
                //其他浏览器
                script.onload = function () {
                    fn();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        };

        $('header').append('');

        if (window.Cesium) {
            view_3DOneMap.init(this.$el.find('#view_3DOneMap'));
        } else {
            // <link href="./Build/Cesium/Widgets/widgets.css" rel="stylesheet">
            loadJS('./static/libs/Cesium/Cesium.js', () => {
                view_3DOneMap.init(this.$el.find('#view_3DOneMap'));
            });
        };
    },
    destroy: function () {
        // 生命周期 ： 注销

    },
}