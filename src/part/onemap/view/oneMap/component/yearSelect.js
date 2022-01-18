
var yearKey = [
    {
        lable: "2008年-2022年",
        value: "2008-2022"
    },
    {
        lable: "2023年-2037年",
        value: "2023-2037"
    }
]
var yearList = {
    "2008-2022": [
        {
            label: "2008年",
            value: "2008"
        },
        {
            label: "2009年",
            value: "2009"
        },
        {
            label: "2010年",
            value: "2010"
        },
        {
            label: "2011年",
            value: "2011"
        },
        {
            label: "2012年",
            value: "2012"
        },
        {
            label: "2013年",
            value: "2013"
        },
        {
            label: "2014年",
            value: "2014"
        },
        {
            label: "2015年",
            value: "2015"
        },
        {
            label: "2016年",
            value: "2016"
        },
        {
            label: "2017年",
            value: "2017"
        },
        {
            label: "2018年",
            value: "2018"
        },
        {
            label: "2019年",
            value: "2019"
        },
        {
            label: "2020年",
            value: "2020"
        },
        {
            label: "2021年",
            value: "2021"
        },
        {
            label: "2022年",
            value: "2022"
        }
    ],
    "2023-2037": [
        {
            label: "2023年",
            value: "2023"
        },
        {
            label: "2024年",
            value: "2024"
        },
        {
            label: "2025年",
            value: "2025"
        },
        {
            label: "2026年",
            value: "2026"
        },
        {
            label: "2027年",
            value: "2027"
        },
        {
            label: "2028年",
            value: "2028"
        },
        {
            label: "2029年",
            value: "2029"
        },
        {
            label: "2030年",
            value: "2030"
        },
        {
            label: "2031年",
            value: "2031"
        },
        {
            label: "2032年",
            value: "2032"
        },
        {
            label: "2033年",
            value: "2033"
        },
        {
            label: "2034年",
            value: "2034"
        },
        {
            label: "2035年",
            value: "2035"
        },
        {
            label: "2036年",
            value: "2036"
        },
        {
            label: "2037年",
            value: "20337"
        }

    ]
}
var html = `<div class="year-wrapper">
<div class="year-box">
    <div class="year-header">
        <div class="year-blobk" id="prev"><span class="layui-icon layui-icon-prev"></span></div>
        <div class="year-blobk"><input class="year-input" type="text" value="2015"></div>
        <div class="year-blobk" id="next"><span class="layui-icon layui-icon-next"></span></div>
    </div>
    <div class="year-content">
        <ul class="year-list">
        </ul>
    </div>
    <div class="year-footer">
        <div class="year-btn">
            <button class="layui-btn layui-btn-sm layui-btn-primary">清空</button>
            <button class="layui-btn layui-btn-sm layui-btn-primary" id="newYears">现在</button>
            <button id="submit-year" class="layui-btn layui-btn-sm layui-btn-normal">确定</button>
        </div>
    </div>
</div>
</div>`
var yearSelect = function (option) {
    this.option = option
    this.yearValue = "2015"
    this.yearHtml = $(html)


    this.event = {
        dataEvent: function () { },
        outYear: function () { }
    }
    
}
yearSelect.prototype.render = function (val) {
    this.yearValue = val
    this.init()
}
yearSelect.prototype.init = function () {
    var data = yearKey
    var list = []
    var start = ''
    var count = 0
    var end = ''
    var len = ''
    var yearKeyList = []
    var label = ""
    var htmlList = ""
    start = this.yearValue -7
    end = +this.yearValue + 7
    count = start
    for (let k = 0; k <= end - start; k++) {
        var values = count++
        list.push({
            label: values + '年',
            value: values
        })
    }
    label = start + '-' + end +'年'
    // for (let i = 0; i < data.length; i++) {
    //     start = +data[i].value.split('-')[0]
    //     count = start
    //     end = +data[i].value.split('-')[1]
    //     for (let k = 0; k <= end - start; k++) {
    //         var values = count++
    //         (data[i].children || (data[i].children = [])).push({
    //             label: values + '年',
    //             value: values
    //         })

    //         if (parseInt(this.yearValue) >= start && parseInt(this.yearValue) <= end) {
    //             list = data[i].children
    //             label = data[i].lable
    //         }

    //     }
    // }
    // for(let i=0;i<data.length;i++) {
    //     data[i].children = yearList[data[i].value]
    //     if(data[i].value.indexOf(this.yearValue) > -1) {
    //         label = data[i].label
    //     }
    // }
    // for(let i=0;i<data.length;i++) {
    //     for(let j =0;j<data[i].children.length;j++) {
    //         if(data[i].children[j].value.indexOf(this.yearValue) > -1) {
    //             list = data[i].children
    //             yearKeyList =  data[i]
    //         }
    //     }
    // }
    for (let i = 0; i < list.length; i++) {
        if(list[i].value == this.yearValue) {
            htmlList += '<li class="year-active" data-index="'+i+'" data-value="' + list[i].value + '" data-label="' + list[i].label + '">' + list[i].label + '</li>'
        } else{
            htmlList += '<li data-index="'+i+'" data-value="' + list[i].value + '" data-label="' + list[i].label + '">' + list[i].label + '</li>'
        }
        
    }
    this.templete(htmlList, label)
    this.option.el.append(this.yearHtml)
    this.yearHtml.find('#submit-year').click(() => {
        console.log('确定年份')
        this.event.outYear(this.yearValue)
        this.option.el.empty()
    })
    this.yearHtml.find('#newYears').click(() => {
        var date=new Date;
        var year = date.getFullYear()
        this.yearValue = year
        this.event.outYear(this.yearValue)
        this.option.el.empty()
    })
    this.yearHtml.find('#prev').click(() => {
        console.log('prev')
        var val = this.yearValue - 15
        this.render(val)
    })
    this.yearHtml.find('#next').click(() => {
        console.log('prev')
        var val = +this.yearValue + 15
        this.render(val)
    })
}
yearSelect.prototype.templete = function (htmlList, label) {
    var _this = this
    this.yearHtml.find('.year-list').html(htmlList)
    this.yearHtml.find('.year-input').val(label)
    this.yearHtml.find('.year-list').on('click', 'li', function () {
        $(this).addClass('year-active').siblings().removeClass('year-active');
        _this.yearValue = $(this).attr('data-value')
    })
    
}
yearSelect.prototype.getYear = function (event) {
    this.event.outYear = event
}
export default yearSelect