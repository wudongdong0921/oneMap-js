import TreeView from './rramsfile_details_tree';
import renderView from '../../../commont/renderView'

export default {
    renderData: function () {
        return {}
    },
    render: function () {
        var _this = this;
        
        _this.renderData.$el = _this.$el;
        var _treeList = new TreeView(_this);

        _treeList.init(_this.$data.planningResultId);

        var fileView = renderView(this.$el.find('#pdf_point'), '/affixFileView', {});

        fileView.$el.css({
            width: '100%',
            height: '100%'
        });
        _treeList.onClick(function (event, treeId, treeNode) {
            console.log(event, treeId, treeNode);
            fileView.set(treeNode.cgfjxxbId, treeNode.accessoryName);
        });
    },
    destroy: function () {

    }
}
