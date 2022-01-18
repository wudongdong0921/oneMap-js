import renderView from '../../../commont/renderView'


var destroyEvent = function () { };

export default  {
    render: function (template, params, event) {
        renderView(this.$el, '/professional/search/event/0/0/0/0', {
            from: true,
        });
    },
    destroy: function () {

    },
}