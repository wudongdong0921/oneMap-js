define(['jquery'], function ($) {
    // 2021-04-07 陈薪名 修改 成果审查与管理审批表 自动回填功能
    // console.log('----------------------国土空间规划审批表-----------------');
    function setValue(data,resultType) {
        var array = [];
        array.push(data.planningResultName);
        array.push(resultType);
        array.push(data.administrativeDivision);
        array.push(data.adCode);
        array.push(data.currentBaseYear);
        array.push(data.planStartYear);
        array.push(data.planTargetYear);
        array.push(data.organizationUnit);
        array.push(data.specificationRange);
        array.push(data.specificationArea);
        array.push(data.planPopulation);
        array.push(data.resultsVersion);
        array.push(data.approvalUnit);
        array.push(data.approvalTime);
        var arrayIndex = 0;
        $('tr').each(function(index){
            // console.log($(this).find('input'));
            // 下标0是table的标题
            if (index > 0) {
                $(this).find('input').each(function(){
                    $(this).attr("readOnly","true");
                    $(this).val(array[arrayIndex]);
                    arrayIndex = arrayIndex + 1;
                })
            }
        });
    }
    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    window.addEventListener('message', function (event) {
        // console.log('--------国土空间规划审批表-----window.addEventListener----------------');
		if (event.data.indexOf('postMessage$$$@@@gtkjghspb') != -1) {
			var res = event.data.replace('postMessage$$$@@@gtkjghspb', '');
            var array = [];
            array = res.split('|');
			res = JSON.parse(array[0]);
            resultType = array[1];
            // console.log(res);
            // console.log(resultType);
            setValue(res,resultType);
		};
		if (event.data.indexOf('deleteImport') !== -1) {
            console.log('-------------error----------------');
		}
	});

    // 2021-04-07 陈薪名 修改 关闭按钮失效问题，隐藏该按钮，开放iframe 窗口关闭按钮
    $('.nav.nav-pills.no-margin').find('li a').each(function () {
		var text = $(this).text().trim();
		if (text == '关闭') {
            $(this).hide();
            // $(this).removeAttr('href');
            // $(this).unbind('click');
			// $(this).click(function () {
            //     console.log('----------------关闭---------');
			// });
		};
	})

    // var workid = $('input[name="workId"]').val();
    // var trankid = $('input[name="trackId"]').val();
    // var workflowId = $('input[name="flowId"]').val();
    // var userId = $('input[name="userId"]').val()
    // var iframe = $('iframe[data-type=receivingInformation]');
    // var accessToken = getQueryVariable('accessToken');
    // var readonly = getQueryVariable('readonly');

});