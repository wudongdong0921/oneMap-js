////////////////////////////////////////////////
// 规划成果管理-成果一棵树
// 杨爽
// 2020-10-13 11:31:24
////////////////////////////////////////////////
import TreeView from './other_page/detail/left_tree';
import formEvent from './other_page/detail/select';
import renderView from '../../../../commont/renderView'

// import 
export default {
    renderData: function () {
        return {}
    },
    render: function () {
        var _this = this;
        var $adCode = '';
        var $ghcglxId = '';
        // var ghcglxIdMap = {};
        this.$api.getPlanResultType("",res => {
            //console.log(res);
            icu.optionSide.set(res.data, 'PlanResultType');
        })
        _this.renderData.$el = _this.$el;
        var _treeList = new TreeView(_this);

        var fileView = renderView(this.$el.find('#pdf_point'), '/affixFileView', {});

        fileView.$el.css({
            width: '100%',
            height: '100%'
        });
        _treeList.onClick(function (event, treeId, treeNode) {
            //console.log(event, treeId, treeNode);
            if (treeNode.type == '2') {
                fileView.set(treeNode.id, treeNode.name);
            }
            // fileView.set(treeNode.);
            // accessoryId: "d25f801833c142de9c70eb8a130b85bb"
            // accessoryName: "230000-05-县域空间规划图.jpg"
        });

        // _treeList.init($ghcglxId,$adCode);
        var topForm = new formEvent(this.$el.find('#area'));

        _this.$el.find('#selectForm').append(topForm.form.$html);
        _this.$api.getPlanResultType({}, function (res) {
            if (res && res.data) {
                // console.log(topForm.form );
                // topForm.form.planningResultCode.set({
                //     planningResultCode: res.data
                // });
                topForm.form.planningResultCode.setData(res.data);
                topForm.form.planningResultCode.set(res.data[0].value);
                _treeList.init(res.data[0].value, $adCode);
            }
        });
        topForm.on('onPlanningResultCodeChange', function (type, value) {
            $ghcglxId = value.planningResultCode.value;
            _treeList.init($ghcglxId, $adCode);

        });
        topForm.on('rightAdministrativeDivision', function (type, value) {
            // console.log(value)
            $adCode = value.rightAdministrativeDivision;
            //_treeList.init($ghcglxId, $adCode);
            if(value.planningResultCode){
                _treeList.init(value.planningResultCode.value,value.rightAdministrativeDivision);
            }

        });
    },
    destroy: function () {

    }
}
