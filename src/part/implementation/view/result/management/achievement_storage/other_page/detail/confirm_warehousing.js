export default {
    render: function () {
        var _this = this;
        var _form = icu.templateForm({
            labelwidth: 76,
        });
        _form.$setOptions([
            [{
                key: 'jkfs',
                type: 'select',
                formlabel: '建库方式',
                col: 12,
                data: 'OptionSide:JKFS',
                showKey: 'dictLabel',
                setKey: 'dictValue',
                getKey: 'object',
            }]
        ]);
       
        this.$el.find('#detail').append(_form.$html);

        this.$el.find('#confirm').click(function () {
            _form.get(function (value) {
                if (value) {
                    if (!value.jkfs) {
                        top.layer.alert('未选择建库方式');
                        return;    
                    }
                    _this.$api.achievementWarehousing({
                        cgxxbId: _this.$data.cgxxbId,
                        mode: value.jkfs.dictValue === 'FGLSK' ? 0 : (value.jkfs.dictValue === 'CWXBB' ? 1 : ''),
                    }, function (res) {
                        if (res) {
                            _this.closeEvent();
                        }
                    });
                }
            });
        });
        this.$el.find('#cancel').click(function () {
            _this.closeEvent();
        });

    },
    destroy: function () {
    },
};