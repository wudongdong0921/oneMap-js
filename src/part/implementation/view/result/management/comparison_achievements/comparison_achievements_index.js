////////////////////////////////////////////////
// 规划成果管理-规划成果对比
// 杨爽
// 2020-10-14 11:30:28
////////////////////////////////////////////////

import formEvent from './formEvent';
import renderView from '../../../../commont/renderView'
//import selectTreeE from "../../../../../../../public/static/libs/zTree/selectTreeEt";
import selectTreeE from "./selectTreeEt";

export default {
    renderData: function () {
        return {}
    },
    render: function () {
        var _this = this;
        _this.renderData.$el = _this.$el;
        var leftForm = new formEvent();
        leftForm.form.checkFile.initdata((treeData) => {
            selectTreeE.initSelectTree("leftFormComparisonSelect", false, { "Y": "ps", "N": "s" }, treeData, "", 2, _this);
        })
        var rightForm = new formEvent();
        rightForm.form.checkFile.initdata((treeData) => {
            selectTreeE.initSelectTree("rightFormComparisonSelect", false, { "Y": "ps", "N": "s" }, treeData, "", 2, _this);
        })
        this.$el.find('.section_left').append(leftForm.form.$html);
        this.$el.find('#comparisonSelect').attr('id','leftFormComparisonSelect')
        leftForm.on('onPlanningResultCodeChange', function (value, type) {
            // console.log("选中规划成果类型继续选择行政区划");
            //成果对比获取目录-左
            _this.$el.find('.left_view').find('.affixFileView').find('.viewBox').empty()
            if(!type.planningResultCode){
                _this.$api.selectResultNameByGhcglxIdAndXzqh({
                    ghcglxId: type.planningResultCode.value,
                    xzqh: type.rightAdministrativeDivision
                }, function (res) {
                    if (res && res.data) {
                        leftForm.form.set({
                            mc: res.data
                        });
                        if(_this.$el.find('.selectCheckFile')){
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelect").next().remove();
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("value", '');
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("title", '');
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").val('');
                            // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                        }
                    }
                }, function (res){
                    leftForm.form.set({
                        mc: []
                    });
                    if(_this.$el.find('.selectCheckFile')){
                                _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelect").next().remove();
                                _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("value", '');
                                _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("title", '');
                                _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").val('');
                                // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                            }
                });
            }
        });
        leftForm.on('rightAdministrativeDivision', function (value, type) {
            _this.$el.find('.left_view').find('.affixFileView').find('.viewBox').empty()
            if(type.planningResultCode != null){
                _this.$api.selectResultNameByGhcglxIdAndXzqh({
                    ghcglxId: type.planningResultCode.value,
                    xzqh: type.rightAdministrativeDivision
                }, function (res) {
                    if (res && res.data) {
                        leftForm.form.set({
                            mc: res.data
                        });
                        if(_this.$el.find('.selectCheckFile')){
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelect").next().remove();
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("value", '');
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("title", '');
                            _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").val('');
                            // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                        }
                    }
                }, function (res){
                    leftForm.form.set({
                        mc: []
                    });
                    if(_this.$el.find('.selectCheckFile')){
                        _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelect").next().remove();
                        _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("value", '');
                        _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").attr("title", '');
                        _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").val('');
                        // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                    }
                });
            }


        });
        //预览附件
        var leftFileViewBox = renderView(this.$el.find('.left_view'), '/affixFileView', {});
        leftFileViewBox.$el.css({
            width: '100%',
            height: '100%'
        });
        // checkFile
        // leftForm.on('checkFile', function (type, value) {
        //     leftFileViewBox.set(value.checkFile.cgfjxxbId, value.checkFile.accessoryName);
        // });

        leftForm.on('mc', function (value, type) {
            _this.$el.find('.left_view').find('.affixFileView').find('.viewBox').empty()
            //成果对比获取文件-左
            _this.$api.selectFileTreeByCgId({
                planningResultId: type.mc.planningResultId
            }, function (res) {
                if (res && res.data) {
                    // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                    leftForm.form.checkFile.setTreeData(res.data)
                }
            });
        });

        rightForm.on('onPlanningResultCodeChange', function (value, type) {
            _this.$el.find('.right_view').find('.affixFileView').find('.viewBox').empty()
            console.log(type);
            // console.log("选中规划成果类型继续选择行政区划");
            //成果对比获取目录-右
            if(!type.planningResultCode){
                _this.$api.selectResultNameByGhcglxIdAndXzqh({
                    ghcglxId: type.planningResultCode.value,
                    xzqh: type.rightAdministrativeDivision
                }, function (res) {
                    if (res && res.data) {
                        rightForm.form.set({
                            mc: res.data
                        });
                        if(_this.$el.find('.selectCheckFile')){
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelect").next().remove();
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("value", '');
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("title", '');
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").val('');
                            // _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").text('');
                        }
    
                    }
                }, function (res){
                    rightForm.form.set({
                        mc: []
                    });
                    if(_this.$el.find('.selectCheckFile')){
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelect").next().remove();
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("value", '');
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("title", '');
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").val('');
                        // _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").text('');
                    }
                });
            }
        });
        rightForm.on('rightAdministrativeDivision', function (value, type) {
            _this.$el.find('.right_view').find('.affixFileView').find('.viewBox').empty()
            if(type.planningResultCode != null){
                _this.$api.selectResultNameByGhcglxIdAndXzqh({
                    ghcglxId: type.planningResultCode.value,
                    xzqh: type.rightAdministrativeDivision
                }, function (res) {
                    if (res && res.data) {
                        rightForm.form.set({
                            mc: res.data
                        });
                        if(_this.$el.find('.selectCheckFile')){
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelect").next().remove();
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("value", '');
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("title", '');
                            _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").val('');
                            // _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").text('');
                        }

                    }
                }, function (res){
                    rightForm.form.set({
                        mc: []
                    });
                    if(_this.$el.find('.selectCheckFile')){
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelect").next().remove();
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("value", '');
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").attr("title", '');
                        _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").val('');
                        // _this.$el.find('.selectCheckFile').find("#rightFormComparisonSelectShow").text('');
                    }
                });
            }

        });
        rightForm.on('mc', function (value, type) {
            //成果对比获取文件-右
            _this.$el.find('.right_view').find('.affixFileView').find('.viewBox').empty()
            _this.$api.selectFileTreeByCgId({
                planningResultId: type.mc.planningResultId
            }, function (res) {
                if (res && res.data) {
                    // _this.$el.find('.selectCheckFile').find("#leftFormComparisonSelectShow").text('');
                    rightForm.form.checkFile.setTreeData(res.data)
                }
            });
        });

        //预览附件
        var rightFileViewBox = renderView(this.$el.find('.right_view'), '/affixFileView', {});
        rightFileViewBox.$el.css({
            width: '100%',
            height: '100%'
        });
        // checkFile
        // rightForm.on('checkFile', function (type, value) {
        //     rightFileViewBox.set(value.checkFile.cgfjxxbId, value.checkFile.accessoryName);
        // });

        this.$el.find('.section_right').append(rightForm.form.$html);
        this.$el.find('#comparisonSelect').attr('id','rightFormComparisonSelect')
        //规划成果类型-左
        _this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                leftForm.form.set({
                    planningResultCode: res.data
                });
            }
        });
        //规划成果类型-右
        _this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                rightForm.form.set({
                    planningResultCode: res.data
                });
            }
        });

    },
    destroy: function () {

    },
};