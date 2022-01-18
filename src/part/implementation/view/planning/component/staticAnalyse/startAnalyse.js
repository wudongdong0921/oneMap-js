
export default {
    render: function () {
        var _this = this;
        this.count = 0; // 计时器
        this.index = 1;
        this.jindu = 0;
        var timer
        this.status = false
        _this.$el.find('#stop').show()
        _this.$el.find('#analyzeContent').empty()
        _this.loadingElement = new icu.loading($('body'));
        _this.loadingElement.show()
        this.optionContent = {
            "userName": icu.session.get("userInfo").username,
            "adcode": _this.$data.acode,
            "rangeAreaStart": _this.$data.getResult.oneInput,
            "rangeAreaEnd": _this.$data.getResult.towInput,
            "planUseType": _this.$data.getResult.selectValue,
            "company": _this.$data.getResult.selectAreaValue
        }
        this.$api.createTask(this.optionContent , function (res) {
            if (res.code == 200) {
                _this.rwId = res.data
                // 执行辅助选址任务
                if (!config.gpService) {
                    _this.$api.auxiliaryAnalysisJava();
                } else {
                    _this.$api.executeImplementSupervision();
                }
                timer = setInterval(() => {
                    _this.$api.getTaskStatus({ rwId: res.data }, function (statusData) {
                        if (statusData.code == 200) {
                            if (statusData.data.executingState == '7') {
                                _this.setProgress(statusData)
                                _this.status = true
                                _this.loadingElement.hide()
                                _this.$el.find('#statusTitle').html('分析完成')
                                _this.$el.find('#watch').show()
                                _this.$el.find('#stop').hide()
                                _this.$el.find('#countDown').html('100%')
                                _this.$el.find('#progressId').css('width', '100%')
                                warchResult();
                                clearInterval(timer);
                            } else if (statusData.data.executingState == '-1') {
                                // _this.$el.find('#statusTitle').html('分析失败')
                                layer.open({
                                    title: '分析失败',
                                    content: '失败原因：' + statusData.data.failureReason
                                });
                                _this.status = false
                                clearInterval(timer);
                                setTimeout(() => {
                                    _this.closeEvent()
                                }, 100);
                            } else if (statusData.data.executingState == '8') {
                                layer.open({
                                    title: '强行终止',
                                    content: '强行终止！'
                                });
                                _this.status = false
                                clearInterval(timer);
                                setTimeout(() => {
                                    _this.closeEvent()
                                }, 100);
                            } else {
                                _this.status = false
                                _this.setProgress(statusData)
                            }
                        }
                    })
                }, 1000);
            }
        })

        // this.$el.find('#watch').bind('click', function () {
        //     var option =  $.extend({},{rwId:_this.rwId,status:_this.status},_this.optionContent)
        //     _this.DialogPatent.option.events.warchResult(option);
        //     setTimeout(() => {
        //         _this.closeEvent()
        //     }, 100);
        // })
        function warchResult() {
            var option =  $.extend({},{rwId:_this.rwId,status:_this.status},_this.optionContent)
            _this.DialogPatent.option.events.warchResult(option);
            setTimeout(() => {
                _this.closeEvent()
            }, 100);
        }

        this.$el.find('#stop').bind('click', function () {
            _this.$api.forceFinish({ rwId: _this.rwId }, (res) => {
                if (res.code == 200) {
                    // clearInterval(timer);
                    _this.$el.find('#statusTitle').html('强行终止')
                    _this.$el.find('#watch').hide()
                    _this.$el.find('#stop').hide()
                    _this.$el.find('#countDown').html(_this.jindu + '%')
                    _this.$el.find('#progressId').css('width', _this.jindu + '%')
                    setTimeout(() => {
                        _this.closeEvent()
                    }, 100);
                }
            })
        })
    },

    setProgress: function (statusData) {
        var _this = this
        var thisDate = new Date($.ajax({async:false}).getResponseHeader("Date"));
        if (this.index < 10) {
            this.index = this.index + 1
            // this.jindu = this.jindu + Math.ceil(Math.random() * 15)
            this.jindu = this.jindu + 10
            // _this.$el.find('#countDown').html(this.jindu + '%')
            _this.$el.find('#progressId').css('width', this.jindu + '%')
            if (statusData.data.executingState == '7') {
                _this.$el.find('#statusTitle').html('分析完成')
                _this.$el.find('#watch').show()
                _this.loadingElement.hide()
                _this.$el.find('#stop').hide()
                // _this.$el.find('#countDown').html('100%')
                _this.$el.find('#progressId').css('width', '100%')
                warchResult();
            }
        }
        _this.count++;
        _this.$el.find('#countDown').html(showNum(parseInt(_this.count / 60 / 60)) + ':' + showNum(parseInt(_this.count / 60) % 60) + ':' + showNum(_this.count % 60));
        
        var hour = thisDate.getHours();
        var minute = thisDate.getMinutes();
        var second = thisDate.getSeconds();
        var text = '[' + hour + ':' + minute + ':' + second + ']';
        var itemHtml = $('<div class="item" id="msg">' + text + statusData.data.executingStateCN + '</div>')
        _this.$el.find('#analyzeContent').append(itemHtml)
        // 2021-05-18 陈薪名 修改 滚动条自动下滚
        var beforeHeight = $(".analyzeContent").scrollTop();
        $(".analyzeContent").scrollTop(beforeHeight+50);

        function showNum(num) {
            if (num < 10) {
                return '0' + num
            }
            return num
        }
    },

    destroy: function () {

    }
}