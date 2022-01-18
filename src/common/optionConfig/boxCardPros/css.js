var layout = {
    screen: { width: 1920, height: 1080 },
    styles: {
        'card': {
            main: 'height: 259px; box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, .3); width: 305px;' +
                'max-height: 260px; margin-right: 28px; margin-top: 20px;'
        },
        'card:hover': { main: 'background-color: #eeeeee' },
        'card:active': { main: 'background-color: rgba(2, 125, 180, 0.101960784313725)' },
        'cardActive': { main: 'background-color: rgba(2, 125, 180, 0.101960784313725)' },
        'card .card-header': {
            main: '  position: relative; height: 42px; line-height: 42px;' +
                'padding: 0 5px; border-bottom: 1px solid #f6f6f6; color: #333; border-radius: 2px 2px 0 0;' +
                'font-size: 16px;'
        },
        'card .card-body': {
            main: 'height: 153px; overflow: auto; position: relative; padding: 10px 15px;line-height: 24px;'
        },
        'card .card-bottom': { main: ' box-sizing: border-box; width: 100%; border-top: 1px solid #f2f2f2; padding: 10px 15px;' },
        'card .card-header .card-title': { main: 'padding: 0 10px; height: 100%; display: flex; justify-content: space-between;font-size: 18px' },
        'card spans': { main: 'margin-right:5px;' },
        'card .bot-row-title': { main: 'display: flex; padding: 9px 5px;font-size: 16px' },
        'card .body_item_row': { main: 'position: absolute; right: 10px;' },
        'card .body_item_row .span_value': { main: 'font-size: 16px' },
        'card .body_item_row .value_unit': { main: 'font-size: 16px; font-weight: 700; padding: 10px;' }, 
        'card .toDoListSum': { main: 'position: absolute;right:15px' },
    },
    blocks: [{
        key: 'backgroundMark',
        style: {},
        class: ['play-line .paly-img'],
    }]
}

export default layout