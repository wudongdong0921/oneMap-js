import renderView from '../../../commont/renderView'


var destroyEvent = function () { };


export default  {
    render: function () {
        renderView(this.$el, '/professional/search/event/0/1/0/0', {
            from: true,
        });
    },
    destroy: function () {
        destroyEvent();
    },
}