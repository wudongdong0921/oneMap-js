import tableForAnalyze from '../tableForAnalyze'
import listforAnalyze from '../listforAnalyze'


export default  {
    render: function (template, params, linkTo) {
        var table = new tableForAnalyze();
        var list = new listforAnalyze(this.$el.find('.list-box'));
        list.onRenderItem(function (data) {
            table.addItem(data);
        });
        list.onActive(function (data, status) {
            table.change(data, status);
        });
        table.onClick(function (data, type) {

            professionalDialog({
                top: '30px',
                width: '85%',
                height: '95%',
                showClose: true,
                path: '/professional/search/event/1/1/' + data.flowid + '/' + type,
                params: data,
                title: data.flowname,
                events: {},
                onClose: function () { },
            });

        });
        this.$el.find('.tableEle').append(table.html);
        this.$api.getFlowDefList((res) => {
            var typeNameArray = [];
            var typeData = {};
            for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                let _data = null;
                if (element.typename && !typeData.hasOwnProperty(element.typename)) {
                    typeData[element.typename] = [];
                    typeNameArray.push(element.typename);
                    typeData[element.typename].push(element)
                } else if (element.typename && typeData.hasOwnProperty(element.typename)) {
                    typeData[element.typename].push(element);
                } else {
                    if (!typeData.hasOwnProperty('其他')) {
                        typeData['其他'] = [];
                    };
                    typeData['其他'].push(element)
                };
            };
            if (typeData.hasOwnProperty('其他')) {
                typeNameArray.push('其他');
            };
            list.setData(typeNameArray, typeData);
            this.$api.getByUserId(function (res) {
                // console.log(res);
                table.setData(res.data)
            });
        });
    },
    destroy: function () {

    },
}