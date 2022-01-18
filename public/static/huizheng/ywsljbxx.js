var formjs = {};
define(['jquery'], function ($) {

	formjs.operator = function () {
		alert(1);
	};

	formjs.onOperator = function (obj) {
		alert(obj);
	};





	window.Set_TDKCDJJSSMS_value = function (_data) {

		// var _data = {
		// 	'gsbbh': '格式版本号',
		// 	'sjcsdw': '数据产生单位',
		// 	'sjcsrq': '2020-12-20',
		// 	'zbx': 'value1',
		// 	'jdfd': '几度分带',
		// 	'tylx': '投影类型',
		// 	'jldw': '计量单位',
		// 	'dh': '带号',
		// 	'jd': '精度',
		// 	'zhcs': 'X,Y,Z,X,Y,Z,AAAAA',
		// }


		$('[name=HZ9180927227809801723b0714d41f18_KCR]').val(_data.sjcsdw);
		$('[name=HZ9180927227809801723b0714d41f18_RQ]').val(_data.sjcsrq);
		$('[name=HZ9180927227809801723b0714d41f18_DH]').val(_data.dh);
		$('[name=HZ9180927227809801723b0714d41f18_CHBH]').val(_data.chbh);

		$('[name=HZ9180927227809801723b0714d41f18_JD]').val(_data.jd);
		$('[name=HZ9180927227809801723b0714d41f18_JD]').find("option[text='" + _data.jd + "']").attr("selected", true);
		var _jd = $('[name=HZ9180927227809801723b0714d41f18_JD]').val();
		if (_jd) {
			$('[name=HZ9180927227809801723b0714d41f18_JD]').parent().find('.chosen-container span').text(_jd);
		};
		
		$('[name=HZ9180927227809801723b0714d41f18_ZBX]').val(_data.zbx)
		$('[name=HZ9180927227809801723b0714d41f18_ZBX]').find("option[text='" + _data.zbx + "']").attr("selected", true);
		var _zbx = $('[name=HZ9180927227809801723b0714d41f18_ZBX]').val();
		if (_zbx) {
			$('[name=HZ9180927227809801723b0714d41f18_ZBX]').parent().find('.chosen-container span').text(_zbx);
		};

		$('[name=HZ9180927227809801723b0714d41f18_TYLX]').val(_data.tylx)
		$('[name=HZ9180927227809801723b0714d41f18_TYLX]').find("option[text='" + _data.tylx + "']").attr("selected", true);
		var _tylx = $('[name=HZ9180927227809801723b0714d41f18_TYLX]').val();
		if (_tylx) {
			$('[name=HZ9180927227809801723b0714d41f18_TYLX]').parent().find('.chosen-container span').text(_tylx);
		};

		$('[name=HZ9180927227809801723b0714d41f18_DW]').val(_data.jldw)
		$('[name=HZ9180927227809801723b0714d41f18_DW]').find("option[text='" + _data.jldw + "']").attr("selected", true);
		var _jldw = $('[name=HZ9180927227809801723b0714d41f18_DW]').val();
		if (_jldw) {
			$('[name=HZ9180927227809801723b0714d41f18_DW]').parent().find('.chosen-container span').text(_jldw);
		};

		$('[name=HZ9180927227809801723b0714d41f18_JDFD]').val(_data.jdfd)
		$('[name=HZ9180927227809801723b0714d41f18_JDFD]').find("option[text='" + _data.jdfd + "']").attr("selected", true);
		var _jdfd = $('[name=HZ9180927227809801723b0714d41f18_JDFD]').val();
		if (_jdfd) {
			$('[name=HZ9180927227809801723b0714d41f18_JDFD]').parent().find('.chosen-container span').text(_jdfd);
		};

		var zhcs = _data.zhcs.split(',');
		if (zhcs[0] == _data.zhcs) {
			zhcs = _data.zhcs.split('|');
		}

		$('[name=HZ9180927227809801723b0714d41f18_XPY]').val(zhcs[0]);
		$('[name=HZ9180927227809801723b0714d41f18_YPY]').val(zhcs[1]);
		$('[name=HZ9180927227809801723b0714d41f18_ZPY]').val(zhcs[2]);
		$('[name=HZ9180927227809801723b0714d41f18_XXZ]').val(zhcs[3]);
		$('[name=HZ9180927227809801723b0714d41f18_YXZ]').val(zhcs[4]);
		$('[name=HZ9180927227809801723b0714d41f18_ZXZ]').val(zhcs[5]);
		$('[name=HZ9180927227809801723b0714d41f18_CD]').val(zhcs[6]);
	};
	window.Remove_TDKCDJJSSMS_value = function (_data) {
		$('[name=HZ9180927227809801723b0714d41f18_DH]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_XPY]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_YPY]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_ZPY]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_XXZ]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_YXZ]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_ZXZ]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_CD]').val('');

		$('[name=HZ9180927227809801723b0714d41f18_JD]').val('');
		$('[name=HZ9180927227809801723b0714d41f18_JD]').find("option[text='']").attr("selected", true);
		$('[name=HZ9180927227809801723b0714d41f18_JD]').parent().find('.chosen-container span').text('');
		
		$('[name=HZ9180927227809801723b0714d41f18_ZBX]').val('')
		$('[name=HZ9180927227809801723b0714d41f18_ZBX]').find("option[text='']").attr("selected", true);
		$('[name=HZ9180927227809801723b0714d41f18_ZBX]').parent().find('.chosen-container span').text('');

		$('[name=HZ9180927227809801723b0714d41f18_TYLX]').val('')
		$('[name=HZ9180927227809801723b0714d41f18_TYLX]').find("option[text='']").attr("selected", true);
		$('[name=HZ9180927227809801723b0714d41f18_TYLX]').parent().find('.chosen-container span').text('');

		$('[name=HZ9180927227809801723b0714d41f18_DW]').val('')
		$('[name=HZ9180927227809801723b0714d41f18_DW]').find("option[text='']").attr("selected", true);
		$('[name=HZ9180927227809801723b0714d41f18_DW]').parent().find('.chosen-container span').text('');

		$('[name=HZ9180927227809801723b0714d41f18_JDFD]').val('')
		$('[name=HZ9180927227809801723b0714d41f18_JDFD]').find("option[text='']").attr("selected", true);
		$('[name=HZ9180927227809801723b0714d41f18_JDFD]').parent().find('.chosen-container span').text('');
	}

	window.addEventListener('message', function (event) {
		if (event.data.indexOf('postMessage$$$') != -1) {
			var res = event.data.replace('postMessage$$$', '');
			res = JSON.parse(res);
			Set_TDKCDJJSSMS_value(res);
		};
		if (event.data.indexOf('deleteImport') !== -1) {
			Remove_TDKCDJJSSMS_value(res);
		}
	});


});

printForm = function (printFormId, formId, viewId, subtableId, type) {
	var dataId = $('input[name="' + formId + '_ID"]').val();
	horizon.open({ url: horizon.config.path.designer + '/template/horizon.form.html?id=' + printFormId + '&formDataId=' + dataId + '&viewId=' + viewId + '&subtableId=' + subtableId + '&type=' + type });
}

/**
 * 表单加载完成后执行
 */
horizon.impl_load = function () {
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) { return pair[1]; }
		}
		return (false);
	}

	//-------------------1.1建设项目用地预审（县区局）---------
	//更新建设项目用地预审申请表项目名称
	//将C_XMXX表中的XMMC字段
	var C_XMXX_XMMC = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	//带入到C_JSYDYSSQB_XMMC字段中
	var C_JSYDYSSQB_XMMC = $("input[name='HZ9180927227809801723b40558823d9_XMMC']");
	//C_XMXX_XMMC发生变化，同步到C_JSYDYSSQB_XMMC
	C_XMXX_XMMC.change(function () {
		C_JSYDYSSQB_XMMC.val(C_XMXX_XMMC.val());
	});
	//3.如果C_JSYDYSSQB_XMMC字段为空，默认使用C_XMXX_XMMC字段
	if (!C_JSYDYSSQB_XMMC.val()) {
		C_JSYDYSSQB_XMMC.val(C_XMXX_XMMC.val());
	};
	//更新建设项目用地预审申请表项目名称结束

	//更新建设项目用地预审申请表关联ID
	var C_XMXX_XMBH_GLID = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDYSSQB_GLID = $("input[name='HZ9180927227809801723b40558823d9_GLID']");
	C_XMXX_XMBH_GLID.change(function () {
		C_JSYDYSSQB_GLID.val(C_XMXX_XMBH_GLID.val());
	});
	if (!C_JSYDYSSQB_GLID.val()) {
		C_JSYDYSSQB_GLID.val(C_XMXX_XMBH_GLID.val());
	};
	//更新建设项目用地预审申请表关联ID结束


	//更新建设项目用地预审申请表项目编号
	var C_XMXX_XMBH = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDYSSQB_XMBH = $("input[name='HZ9180927227809801723b40558823d9_XMBH']");
	C_XMXX_XMBH.change(function () {
		C_JSYDYSSQB_XMBH.val(C_XMXX_XMBH.val());
	});
	if (!C_JSYDYSSQB_XMBH.val()) {
		C_JSYDYSSQB_XMBH.val(C_XMXX_XMBH.val());
	};
	//更新建设项目用地预审申请表项目编号结束

	//更新建设项目用地预审审批表关联ID
	var C_XMXX_XMBH_GLID1 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDYSSPB_XMBH = $("input[name='HZ918092722780980172403dec1e6c35_GLID']");
	C_XMXX_XMBH_GLID1.change(function () {
		C_JSYDYSSPB_XMBH.val(C_XMXX_XMBH_GLID1.val());
	});
	if (!C_JSYDYSSPB_XMBH.val()) {
		C_JSYDYSSPB_XMBH.val(C_XMXX_XMBH_GLID1.val());
	};
	//更新建设项目用地预审审批表关联ID结束	

	//更新建设项目用地预审审批表拟建项目名称
	var C_XMXX_XMMC1 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_JSYDYSSPB_NJXMMC = $("input[name='HZ918092722780980172403dec1e6c35_NJXMMC']");
	C_XMXX_XMMC1.change(function () {
		C_JSYDYSSPB_NJXMMC.val(C_XMXX_XMMC1.val());
	});
	if (!C_JSYDYSSPB_NJXMMC.val()) {
		C_JSYDYSSPB_NJXMMC.val(C_XMXX_XMMC1.val());
	};
	//更新建设项目用地预审审批表拟建项目名称结束	
	//更新建设用地预审会审表建设项目名称
	var C_XMXX_XMMC2 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_JSYDYSHSB_JSXMMC = $("input[name='HZ91809272278098017240a7b15e75ae_JSXMMC']");
	C_XMXX_XMMC2.change(function () {
		C_JSYDYSHSB_JSXMMC.val(C_XMXX_XMMC2.val());
	});
	if (!C_JSYDYSHSB_JSXMMC.val()) {
		C_JSYDYSHSB_JSXMMC.val(C_XMXX_XMMC2.val());
	};
	//更新建设用地预审会审表建设项目名称结束	

	//更新建设用地预审会审表申请用地单位
	var C_JSYDYSHPB_NYDDW = $("input[name='HZ918092722780980172403dec1e6c35_NYDDW']");
	var C_JSYDYSHSB_SQYDDW = $("input[name='HZ91809272278098017240a7b15e75ae_SQYDDW']");
	C_JSYDYSHPB_NYDDW.change(function () {
		C_JSYDYSHSB_SQYDDW.val(C_JSYDYSHPB_NYDDW.val());
	});
	if (!C_JSYDYSHSB_SQYDDW.val()) {
		C_JSYDYSHSB_SQYDDW.val(C_JSYDYSHPB_NYDDW.val());
	};
	//更新建设用地预审会审表申请用地单位结束	


	//更新建设用地预审会审表关联ID
	var C_XMXX_XMBH_GLID2 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDYSHSB_GLID = $("input[name='HZ91809272278098017240a7b15e75ae_GLID']");
	C_XMXX_XMBH_GLID2.change(function () {
		C_JSYDYSHSB_GLID.val(C_XMXX_XMBH_GLID2.val());
	});
	if (!C_JSYDYSHSB_GLID.val()) {
		C_JSYDYSHSB_GLID.val(C_XMXX_XMBH_GLID2.val());
	};
	//更新建设用地预审会审表关联ID结束

	//更新建设用地预审会审表申请用地面积
	var C_JSYDYSSQB_YDZMJ = $("input[name='HZ9180927227809801723b40558823d9_YDZMJ']");
	var C_JSYDYSHSB_SQYDMJ = $("input[name='HZ91809272278098017240a7b15e75ae_SQYDMJ']");
	C_JSYDYSSQB_YDZMJ.change(function () {
		C_JSYDYSHSB_SQYDMJ.val(C_JSYDYSSQB_YDZMJ.val());
	});
	if (!C_JSYDYSHSB_SQYDMJ.val()) {
		C_JSYDYSHSB_SQYDMJ.val(C_JSYDYSSQB_YDZMJ.val());
	};
	//更新建设用地预审会审表申请用地面积结束
	//-------------------1.1建设项目用地预审（县区局）结束---------------------------

	//-------------------1.2建设项目用地预审（市局）开始---------------------------
	//1.1已涵盖
	//-------------------1.2建设项目用地预审（市局）结束---------------------------

	//-------------------2.1农村三项用地（分批次）业务-------------------------------

	//更新勘测定界表关联ID
	var C_XMXX_XMBH_GLID13 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_KCDJB_GLID13 = $("input[name='HZ9180927227809801722bcc568e3b08_GLID']");
	C_XMXX_XMBH_GLID13.change(function () {
		C_KCDJB_GLID13.val(C_XMXX_XMBH_GLID13.val());
	});
	if (!C_KCDJB_GLID13.val()) {
		C_KCDJB_GLID13.val(C_XMXX_XMBH_GLID13.val());
	};
	//更新勘测定界表关联ID结束

	//更新勘测定界表项目名称
	var C_XMXX_XMMC10 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_KCDJB_XMMC10 = $("input[name='HZ9180927227809801722bcc568e3b08_XMMC']");
	C_XMXX_XMMC10.change(function () {
		C_KCDJB_XMMC10.val(C_XMXX_XMMC10.val());
	});
	if (!C_KCDJB_XMMC10.val()) {
		C_KCDJB_XMMC10.val(C_XMXX_XMMC10.val());
	};
	//更新勘测定界表项目名称结束

	//更新土地勘测定界技术说明关联ID
	var C_XMXX_XMBH_GLID14 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_TDKCDJJSSM_GLID14 = $("input[name='HZ9180927227809801723b0714d41f18_DLID']");
	C_XMXX_XMBH_GLID14.change(function () {
		C_TDKCDJJSSM_GLID14.val(C_XMXX_XMBH_GLID14.val());
	});
	if (!C_TDKCDJJSSM_GLID14.val()) {
		C_TDKCDJJSSM_GLID14.val(C_XMXX_XMBH_GLID14.val());
	};
	//更新土地勘测定界技术说明关联ID结束

	//更新土地勘测定界技术说明项目名称
	var C_XMXX_XMMC11 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_TDKCDJJSSM_XMMC11 = $("input[name='HZ9180927227809801723b0714d41f18_XMMC']");
	C_XMXX_XMMC11.change(function () {
		C_TDKCDJJSSM_XMMC11.val(C_XMXX_XMMC11.val());
	});
	if (!C_TDKCDJJSSM_XMMC11.val()) {
		C_TDKCDJJSSM_XMMC11.val(C_XMXX_XMMC11.val());
	};
	//更新土地勘测定界技术说明项目名称结束

	//更新一书四方案封皮关联ID
	var C_XMXX_XMBH_GLID15 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_YSSFA_GLID15 = $("input[name='HZ9180927227809801724040b4a76c58_GLID']");
	C_XMXX_XMBH_GLID15.change(function () {
		C_YSSFA_GLID15.val(C_XMXX_XMBH_GLID15.val());
	});
	if (!C_YSSFA_GLID15.val()) {
		C_YSSFA_GLID15.val(C_XMXX_XMBH_GLID15.val());
	};
	//更新一书四方案封皮关联ID结束

	//更新建设项目用地呈报说明书关联ID
	var C_XMXX_XMBH_GLID16 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSXMYDCBSMS_GLID16 = $("input[name='HZ9180927227809801722fabc08b6f99_DLID']");
	C_XMXX_XMBH_GLID16.change(function () {
		C_JSXMYDCBSMS_GLID16.val(C_XMXX_XMBH_GLID16.val());
	});
	if (!C_JSXMYDCBSMS_GLID16.val()) {
		C_JSXMYDCBSMS_GLID16.val(C_XMXX_XMBH_GLID16.val());
	};
	//更新建设项目用地呈报说明书关联ID结束

	//更新建设项目用地呈报说明书项目名称
	var C_XMXX_XMMC12 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_JSXMYDCBSMS_XMMC12 = $("input[name='HZ9180927227809801722fabc08b6f99_JSYDXMMC']");
	C_XMXX_XMMC12.change(function () {
		C_JSXMYDCBSMS_XMMC12.val(C_XMXX_XMMC12.val());
	});
	if (!C_JSXMYDCBSMS_XMMC12.val()) {
		C_JSXMYDCBSMS_XMMC12.val(C_XMXX_XMMC12.val());
	};

	//更新农用地转用方案关联ID
	var C_XMXX_XMBH_GLID17 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_NYDZYFA_GLID17 = $("input[name='HZ918092722780980172309af1297f96_GLID']");
	C_XMXX_XMBH_GLID17.change(function () {
		C_NYDZYFA_GLID17.val(C_XMXX_XMBH_GLID17.val());
	});
	if (!C_NYDZYFA_GLID17.val()) {
		C_NYDZYFA_GLID17.val(C_XMXX_XMBH_GLID17.val());
	};


	//更新补充耕地方案关联ID
	var C_XMXX_XMBH_GLID18 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_BCGDFA_GLID18 = $("input[name='HZ91809272278098017230c087c30373_GLID']");
	C_XMXX_XMBH_GLID18.change(function () {
		C_BCGDFA_GLID18.val(C_XMXX_XMBH_GLID18.val());
	});
	if (!C_BCGDFA_GLID18.val()) {
		C_BCGDFA_GLID18.val(C_XMXX_XMBH_GLID18.val());
	};

	//更新征收土地方案关联ID
	var C_XMXX_XMBH_GLID19 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZSTDFA_GLID19 = $("input[name='HZ91809272278098017230e6a80d066c_GLID']");
	C_XMXX_XMBH_GLID19.change(function () {
		C_ZSTDFA_GLID19.val(C_XMXX_XMBH_GLID19.val());
	});
	if (!C_ZSTDFA_GLID19.val()) {
		C_ZSTDFA_GLID19.val(C_XMXX_XMBH_GLID19.val());
	};


	//更新供地方案关联ID
	var C_XMXX_XMBH_GLID20 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GDFA_GLID20 = $("input[name='HZ918092722780980172311bbbac0d75_GLID']");
	C_XMXX_XMBH_GLID20.change(function () {
		C_GDFA_GLID20.val(C_XMXX_XMBH_GLID20.val());
	});
	if (!C_GDFA_GLID20.val()) {
		C_GDFA_GLID20.val(C_XMXX_XMBH_GLID20.val());
	};

	//更新建设用地申请表项目名称
	var C_XMXX_XMMC13 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_JSYDSQB_JSXMMC13 = $("input[name='HZ9180927227809801723144218c100f_JSXMMC']");
	C_XMXX_XMMC13.change(function () {
		C_JSYDSQB_JSXMMC13.val(C_XMXX_XMMC13.val());
	});
	if (!C_JSYDSQB_JSXMMC13.val()) {
		C_JSYDSQB_JSXMMC13.val(C_XMXX_XMMC13.val());
	};

	//更新建设用地申请表建设用地申请单位
	var C_ZDCHD_JSYDDWMC = $("input[name='HZ9180927227809801722abd455b2568_JSYDDWMC']");
	var C_JSYDSQBB_JSYDSQDW = $("input[name='HZ9180927227809801723144218c100f_JSYDSQDW']");
	C_ZDCHD_JSYDDWMC.change(function () {
		C_JSYDSQBB_JSYDSQDW.val(C_ZDCHD_JSYDDWMC.val());
	});
	if (!C_JSYDSQBB_JSYDSQDW.val()) {
		C_JSYDSQBB_JSYDSQDW.val(C_ZDCHD_JSYDDWMC.val());
	};

	//更新建设用地申请表建关联ID
	var C_XMXX_XMBH_GLID21 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDSQB_GLID21 = $("input[name='HZ9180927227809801723144218c100f_GLID']");
	C_XMXX_XMBH_GLID21.change(function () {
		C_JSYDSQB_GLID21.val(C_XMXX_XMBH_GLID21.val());
	});
	if (!C_JSYDSQB_GLID21.val()) {
		C_JSYDSQB_GLID21.val(C_XMXX_XMBH_GLID21.val());
	};

	//更新建设用地申请表土地坐落
	var C_KCDJB_TDZL3 = $("input[name='HZ9180927227809801722bcc568e3b08_TDZL']");
	var C_JSYDSQB_TDZL3 = $("input[name='HZ9180927227809801723144218c100f_TDZL']");
	C_KCDJB_TDZL3.change(function () {
		C_JSYDSQB_TDZL3.val(C_KCDJB_TDZL3.val());
	});
	if (!C_JSYDSQB_TDZL3.val()) {
		C_JSYDSQB_TDZL3.val(C_KCDJB_TDZL3.val());
	};

	//更新建设用地申请表项目编号
	var C_XMXX_XMBH_GLID22 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDSQB_XMBH22 = $("input[name='HZ9180927227809801723144218c100f_XMBH']");
	C_XMXX_XMBH_GLID22.change(function () {
		C_JSYDSQB_XMBH22.val(C_XMXX_XMBH_GLID22.val());
	});
	if (!C_JSYDSQB_XMBH22.val()) {
		C_JSYDSQB_XMBH22.val(C_XMXX_XMBH_GLID22.val());
	};

	//更新建设用地报批会审表建设项目名称
	var C_XMXX_XMMC14 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_SYDBPHSB_JSXMMC14 = $("input[name='HZ918092722780980172411a7d447e1a_JSXMMC']");
	C_XMXX_XMMC14.change(function () {
		C_SYDBPHSB_JSXMMC14.val(C_XMXX_XMMC14.val());
	});
	if (!C_SYDBPHSB_JSXMMC14.val()) {
		C_SYDBPHSB_JSXMMC14.val(C_XMXX_XMMC14.val());
	};

	//更新建设用地报批会审表申请用地单位
	var C_ZDCHD_JSYDDWMC1 = $("input[name='HZ9180927227809801722abd455b2568_JSYDDWMC']");
	var C_JSYDBPHSB_SQYDDW1 = $("input[name='HZ918092722780980172411a7d447e1a_SQYDDW']");
	C_ZDCHD_JSYDDWMC1.change(function () {
		C_JSYDBPHSB_SQYDDW1.val(C_ZDCHD_JSYDDWMC1.val());
	});
	if (!C_JSYDBPHSB_SQYDDW1.val()) {
		C_JSYDBPHSB_SQYDDW1.val(C_ZDCHD_JSYDDWMC1.val());
	};

	//更新建设用地报批会审表关联ID
	var C_XMXX_XMBH_GLID23 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_JSYDBPHSB_GLID23 = $("input[name='HZ918092722780980172411a7d447e1a_GLID']");
	C_XMXX_XMBH_GLID23.change(function () {
		C_JSYDBPHSB_GLID23.val(C_XMXX_XMBH_GLID23.val());
	});
	if (!C_JSYDBPHSB_GLID23.val()) {
		C_JSYDBPHSB_GLID23.val(C_XMXX_XMBH_GLID23.val());
	};

	//更新建设用地报批会审表申请用地面积
	var C_JSYDSQB_SQYDMJ = $("input[name='HZ9180927227809801723144218c100f_SQYDMJ']");
	var C_JSYDBPHSB_SQYDMJ = $("input[name='HZ918092722780980172411a7d447e1a_SQYDMJ']");
	C_JSYDSQB_SQYDMJ.change(function () {
		C_JSYDBPHSB_SQYDMJ.val(C_JSYDSQB_SQYDMJ.val());
	});
	if (!C_JSYDBPHSB_SQYDMJ.val()) {
		C_JSYDBPHSB_SQYDMJ.val(C_JSYDSQB_SQYDMJ.val());
	};
	//-------------------2.1农村三项用地（分批次）业务结束----------------------
	//-------------------2.2单独选址建设用地审批（市局）业务开始----------------------
	//2.3已涵盖
	//-------------------2.2单独选址建设用地审批（市局）业务开始----------------------
	//-------------------2.3单独选址建设用地审批（区县局）业务开始----------------------
	//更新单独选址建设用地审批（区县局）申请表项目编号
	var C_XMXX_XMBH13 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_DDXZJSYDSPQXJSQB_XMBH13 = $("input[name='HZ9180927227809801722bb3acf53813_XMBH']");
	C_XMXX_XMBH13.change(function () {
		C_DDXZJSYDSPQXJSQB_XMBH13.val(C_XMXX_XMBH13.val());
	});
	if (!C_DDXZJSYDSPQXJSQB_XMBH13.val()) {
		C_DDXZJSYDSPQXJSQB_XMBH13.val(C_XMXX_XMBH13.val());
	};

	//更新单独选址建设用地审批（区县局）申请表建设项目名称
	var C_XMXX_XMMC27 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_DDXZJSYDSPQXJSQB_XMMC27 = $("input[name='HZ9180927227809801722bb3acf53813_JSXMMC']");
	C_XMXX_XMMC27.change(function () {
		C_DDXZJSYDSPQXJSQB_XMMC27.val(C_XMXX_XMMC27.val());
	});
	if (!C_DDXZJSYDSPQXJSQB_XMMC27.val()) {
		C_DDXZJSYDSPQXJSQB_XMMC27.val(C_XMXX_XMMC27.val());
	};


	//更新单独选址建设用地审批（区县局）申请表关联ID
	var C_XMXX_XMBH_GLID51 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_DDXZJSYDSPQXJSQB_GLID51 = $("input[name='HZ9180927227809801722bb3acf53813_GLID']");
	C_XMXX_XMBH_GLID51.change(function () {
		C_DDXZJSYDSPQXJSQB_GLID51.val(C_XMXX_XMBH_GLID51.val());
	});
	if (!C_DDXZJSYDSPQXJSQB_GLID51.val()) {
		C_DDXZJSYDSPQXJSQB_GLID51.val(C_XMXX_XMBH_GLID51.val());
	};
	//更新勘测定界表土地坐落
	var C_XDDXZJSYDSPQXJSQB_TDZL = $("input[name='HZ9180927227809801722bb3acf53813_TDZL']");
	var C_KCDJB_TDZL4 = $("input[name='HZ9180927227809801722bcc568e3b08_TDZL']");
	C_XDDXZJSYDSPQXJSQB_TDZL.change(function () {
		C_KCDJB_TDZL4.val(C_XDDXZJSYDSPQXJSQB_TDZL.val());
	});
	if (!C_KCDJB_TDZL4.val()) {
		C_KCDJB_TDZL4.val(C_XDDXZJSYDSPQXJSQB_TDZL.val());
	};
	//更新会审表申请用地单位
	var C_XDDXZJSYDSPQXJSQB_JSYDSQDW = $("input[name='HZ9180927227809801722bb3acf53813_JSYDSQDW']");
	var C_JSYDBPHSB_JSYDSQDW2 = $("input[name='HZ918092722780980172411a7d447e1a_SQYDDW']");
	C_XDDXZJSYDSPQXJSQB_JSYDSQDW.change(function () {
		C_JSYDBPHSB_JSYDSQDW2.val(C_XDDXZJSYDSPQXJSQB_JSYDSQDW.val());
	});
	if (!C_JSYDBPHSB_JSYDSQDW2.val()) {
		C_JSYDBPHSB_JSYDSQDW2.val(C_XDDXZJSYDSPQXJSQB_JSYDSQDW.val());
	};
	//更新会审表申请用地面积
	var C_XDDXZJSYDSPQXJSQB_SQYDMJ = $("input[name='HZ9180927227809801722bb3acf53813_SQYDMJ']");
	var C_JSYDBPHSB_SQYDMJ2 = $("input[name='HZ918092722780980172411a7d447e1a_SQYDMJ']");
	C_XDDXZJSYDSPQXJSQB_SQYDMJ.change(function () {
		C_JSYDBPHSB_SQYDMJ2.val(C_XDDXZJSYDSPQXJSQB_SQYDMJ.val());
	});
	if (!C_JSYDBPHSB_SQYDMJ2.val()) {
		C_JSYDBPHSB_SQYDMJ2.val(C_XDDXZJSYDSPQXJSQB_SQYDMJ.val());
	};
	//-------------------2.3单独选址建设用地审批（区县局）业务结束----------------------

	//-------------------2.4城市分批次建设项目选址业务开始----------------------
	//更新宗地测绘单建设用地单位名称
	var C_NCSXYDJSYDSQB_JSYDSQDW = $("input[name='HZ9180927227809801723144218c100f_JSYDSQDW']");
	var C_ZDCHD_JSYDDWMC3 = $("input[name='HZ9180927227809801722abd455b2568_JSYDDWMC']");
	C_NCSXYDJSYDSQB_JSYDSQDW.change(function () {
		C_ZDCHD_JSYDDWMC3.val(C_NCSXYDJSYDSQB_JSYDSQDW.val());
	});
	if (!C_ZDCHD_JSYDDWMC3.val()) {
		C_ZDCHD_JSYDDWMC3.val(C_NCSXYDJSYDSQB_JSYDSQDW.val());
	};
	//更新勘测定界表土地坐落
	var C_NCSXYDJSYDSQB_TDZL = $("input[name='HZ9180927227809801723144218c100f_TDZL']");
	var C_KCDJB_TDZL5 = $("input[name='HZ9180927227809801722bcc568e3b08_TDZL']");
	C_NCSXYDJSYDSQB_TDZL.change(function () {
		C_KCDJB_TDZL5.val(C_NCSXYDJSYDSQB_TDZL.val());
	});
	if (!C_KCDJB_TDZL5.val()) {
		C_KCDJB_TDZL5.val(C_NCSXYDJSYDSQB_TDZL.val());
	};
	//更新会审表申请用地单位
	var C_NCSXYDJSYDSQB_JSYDSQDW1 = $("input[name='HZ9180927227809801723144218c100f_JSYDSQDW']");
	var C_JSYDBPHSB_JSYDSQDW3 = $("input[name='HZ918092722780980172411a7d447e1a_SQYDDW']");
	C_NCSXYDJSYDSQB_JSYDSQDW1.change(function () {
		C_JSYDBPHSB_JSYDSQDW3.val(C_NCSXYDJSYDSQB_JSYDSQDW1.val());
	});
	if (!C_JSYDBPHSB_JSYDSQDW3.val()) {
		C_JSYDBPHSB_JSYDSQDW3.val(C_NCSXYDJSYDSQB_JSYDSQDW1.val());
	};
	//-------------------2.4城市分批次建设项目选址业务结束----------------------

	//-------------------2.5城市分批次建设项目审批（市局）业务开始----------------------
	//2.4和2.1已涵盖
	//-------------------2.5城市分批次建设项目审批（市局）业务结束----------------------

	//-------------------3.1临时用地业务----------------------------------------

	//更新临时用地申请表项目名称
	var C_XMXX_XMMC3 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_LSYDSQB_XMMC = $("input[name='HZ9180927227809801722f85d9736d80_XMMC']");
	C_XMXX_XMMC3.change(function () {
		C_LSYDSQB_XMMC.val(C_XMXX_XMMC3.val());
	});
	if (!C_LSYDSQB_XMMC.val()) {
		C_LSYDSQB_XMMC.val(C_XMXX_XMMC3.val());
	}

	//更新临时用地申请表项目编号
	var C_XMXX_XMBH1 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_LSYDSQB_XMBH = $("input[name='HZ9180927227809801722f85d9736d80_XMBH']");
	C_XMXX_XMBH1.change(function () {
		C_LSYDSQB_XMBH.val(C_XMXX_XMBH1.val());
	});
	if (!C_LSYDSQB_XMBH.val()) {
		C_LSYDSQB_XMBH.val(C_XMXX_XMBH1.val());
	};

	//更新临时用地申请表项目受理人
	var C_XMXX_SJR = $("input[name='HZ918092721d319701721e41a5c40c44_SJR']");
	var C_LSYDSQB_SLR = $("input[name='HZ9180927227809801722f85d9736d80_SLR']");
	C_XMXX_SJR.change(function () {
		C_LSYDSQB_SLR.val(C_XMXX_SJR.val());
	});
	if (!C_LSYDSQB_SLR.val()) {
		C_LSYDSQB_SLR.val(C_XMXX_SJR.val());
	};

	//更新临时用地申请表项目受理日期
	var C_XMXX_CJRQ = $("input[name='HZ918092721d319701721e41a5c40c44_CJRQ']");
	var C_LSYDSQB_SLRQ = $("input[name='HZ9180927227809801722f85d9736d80_SLRQ']");
	C_XMXX_CJRQ.change(function () {
		C_LSYDSQB_SLRQ.val(C_XMXX_CJRQ.val());
	});
	if (!C_LSYDSQB_SLRQ.val()) {
		C_LSYDSQB_SLRQ.val(C_XMXX_CJRQ.val());
	};

	//更新临时用地申请表关联ID
	var C_XMXX_XMBH_GLID3 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_LSYDSQB_GLID = $("input[name='HZ9180927227809801722f85d9736d80_GLID']");
	C_XMXX_XMBH_GLID3.change(function () {
		C_LSYDSQB_GLID.val(C_XMXX_XMBH_GLID3.val());
	});
	if (!C_LSYDSQB_GLID.val()) {
		C_LSYDSQB_GLID.val(C_XMXX_XMBH_GLID3.val());
	};

	//更新临时用地审批表关联ID
	var C_XMXX_XMBH_GLID4 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_LSYDSPB_GLID = $("input[name='HZ9180927227809801722f9ed0c46eee_GLID']");
	C_XMXX_XMBH_GLID4.change(function () {
		C_LSYDSPB_GLID.val(C_XMXX_XMBH_GLID4.val());
	});
	if (!C_LSYDSPB_GLID.val()) {
		C_LSYDSPB_GLID.val(C_XMXX_XMBH_GLID4.val());
	};

	//更新临时用地会审表建设项目名称
	var C_XMXX_XMMC15 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_LSYDHSB_JSXMMC15 = $("input[name='HZ91809272448b8001724f7e0a7f12fb_JSXMMC']");
	C_XMXX_XMMC15.change(function () {
		C_LSYDHSB_JSXMMC15.val(C_XMXX_XMMC15.val());
	});
	if (!C_LSYDHSB_JSXMMC15.val()) {
		C_LSYDHSB_JSXMMC15.val(C_XMXX_XMMC15.val());
	};

	//更新临时用地会审表申请用地单位
	var C_LSYDSQ_DWMC = $("input[name='HZ9180927227809801722f85d9736d80_DWMC']");
	var C_LSYDHSB_SQYDDW = $("input[name='HZ91809272448b8001724f7e0a7f12fb_SQYDDW']");
	C_LSYDSQ_DWMC.change(function () {
		C_LSYDHSB_SQYDDW.val(C_LSYDSQ_DWMC.val());
	});
	if (!C_LSYDHSB_SQYDDW.val()) {
		C_LSYDHSB_SQYDDW.val(C_LSYDSQ_DWMC.val());
	};

	//更新临时用地会审表关联ID
	var C_XMXX_XMBH_GLID24 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_LSYDHSB_GLID24 = $("input[name='HZ91809272448b8001724f7e0a7f12fb_GLID']");
	C_XMXX_XMBH_GLID24.change(function () {
		C_LSYDHSB_GLID24.val(C_XMXX_XMBH_GLID24.val());
	});
	if (!C_LSYDHSB_GLID24.val()) {
		C_LSYDHSB_GLID24.val(C_XMXX_XMBH_GLID24.val());
	};

	//更新临时用地会审表申请用地面积
	var C_LSYDSPB_YDMJ = $("input[name='HZ9180927227809801722f9ed0c46eee_YDMJ']");
	var C_LSYDHSB_SQYDMJ = $("input[name='HZ91809272448b8001724f7e0a7f12fb_SQYDMJ']");
	C_LSYDSPB_YDMJ.change(function () {
		C_LSYDHSB_SQYDMJ.val(C_LSYDSPB_YDMJ.val());
	});
	if (!C_LSYDHSB_SQYDMJ.val()) {
		C_LSYDHSB_SQYDMJ.val(C_LSYDSPB_YDMJ.val());
	};
	/*   ------------------重复-----------------
	//更新宗地测绘单项目名称
	var C_XMXX_XMMC4 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_ZDCHD_XMMC = $("input[name='HZ9180927227809801722abd455b2568_XMMC']");	
	C_XMXX_XMMC4.change(function(){		
		C_ZDCHD_XMMC.val(C_XMXX_XMMC4.val());
	});
	if(!C_ZDCHD_XMMC.val()){
		C_ZDCHD_XMMC.val(C_XMXX_XMMC4.val());
	}
	//更新宗地测绘单项目编号
	var C_XMXX_XMBH2 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZDCHD_XMBH = $("input[name='HZ9180927227809801722abd455b2568_XMBH']");	
	C_XMXX_XMBH2.change(function(){		
		C_ZDCHD_XMBH.val(C_XMXX_XMBH2.val());
	});
	if(!C_ZDCHD_XMBH.val()){
		C_ZDCHD_XMBH.val(C_XMXX_XMBH2.val());
	};
	
	//更新宗地测绘单关联ID
	var C_XMXX_XMBH_GLID5 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZDCHD_GLID = $("input[name='HZ9180927227809801722abd455b2568_GLID']");	
	C_XMXX_XMBH_GLID5.change(function(){		
		C_ZDCHD_GLID.val(C_XMXX_XMBH_GLID5.val());
	});
	if(!C_ZDCHD_GLID.val()){
		C_ZDCHD_GLID.val(C_XMXX_XMBH_GLID5.val());
	};	
	
	----------------------重复--------------------------------------------------------*/
	//-------------------3.1临时用地业务结束---------------------------------------- 

	//-------------------3.2企业改制业务----------------------------------------
	//更新企业改制土地资产处置申请表项目编号
	var C_XMXX_XMBH3 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_QYGZTDZCCZSQB_XMBH = $("input[name='HZ9180927227809801722be1743e3ccd_XMBH']");
	C_XMXX_XMBH3.change(function () {
		C_QYGZTDZCCZSQB_XMBH.val(C_XMXX_XMBH3.val());
	});
	if (!C_QYGZTDZCCZSQB_XMBH.val()) {
		C_QYGZTDZCCZSQB_XMBH.val(C_XMXX_XMBH3.val());
	}

	//更新企业改制土地资产处置申请表受理人
	var C_XMXX_SJR1 = $("input[name='HZ918092721d319701721e41a5c40c44_SJR']");
	var C_QYGZTDZCCZSQB_SLR = $("input[name='HZ9180927227809801722be1743e3ccd_SLR']");
	C_XMXX_SJR1.change(function () {
		C_QYGZTDZCCZSQB_SLR.val(C_XMXX_SJR1.val());
	});
	if (!C_QYGZTDZCCZSQB_SLR.val()) {
		C_QYGZTDZCCZSQB_SLR.val(C_XMXX_SJR1.val());
	};

	//更新企业改制土地资产处置申请表受理日期
	var C_XMXX_SJRQ = $("input[name='HZ918092721d319701721e41a5c40c44_CJRQ']");
	var C_QYGZTDZCCZSQB_SLRQ = $("input[name='HZ9180927227809801722be1743e3ccd_SLRQ']");
	C_XMXX_SJRQ.change(function () {
		C_QYGZTDZCCZSQB_SLRQ.val(C_XMXX_SJRQ.val());
	});
	if (!C_QYGZTDZCCZSQB_SLRQ.val()) {
		C_QYGZTDZCCZSQB_SLRQ.val(C_XMXX_SJRQ.val());
	};

	//更新企业改制土地资产处置申请表关联ID
	var C_XMXX_XMBH_GLID6 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZDCHD_GLID = $("input[name='HZ9180927227809801722be1743e3ccd_GLID']");
	C_XMXX_XMBH_GLID6.change(function () {
		C_ZDCHD_GLID.val(C_XMXX_XMBH_GLID6.val());
	});
	if (!C_ZDCHD_GLID.val()) {
		C_ZDCHD_GLID.val(C_XMXX_XMBH_GLID6.val());
	};

	//-------------------3.2企业改制业务结束------------------------------------

	//-------------------3.3农村设施用地业务------------------------------------
	//更新乌鲁木齐市设施农业用地备案表关联ID
	var C_XMXX_XMBH_GLID7 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_WLMQSSSNYYDBAB_GLID = $("input[name='HZ9180927227809801722befe6b33dfb_GLID']");
	C_XMXX_XMBH_GLID7.change(function () {
		C_WLMQSSSNYYDBAB_GLID.val(C_XMXX_XMBH_GLID7.val());
	});
	if (!C_WLMQSSSNYYDBAB_GLID.val()) {
		C_WLMQSSSNYYDBAB_GLID.val(C_XMXX_XMBH_GLID7.val());
	}

	//更新乌鲁木齐市设施农业用地备案表项目名称
	var C_XMXX_XMMC5 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_WLMQSSSNYYDBAB_XMMC = $("input[name='HZ9180927227809801722befe6b33dfb_XMMC']");
	C_XMXX_XMMC5.change(function () {
		C_WLMQSSSNYYDBAB_XMMC.val(C_XMXX_XMMC5.val());
	});
	if (!C_WLMQSSSNYYDBAB_XMMC.val()) {
		C_WLMQSSSNYYDBAB_XMMC.val(C_XMXX_XMMC5.val());
	};

	//更新乌鲁木齐市设施农业用地备案表申请单位
	var C_XMXX_SQR = $("input[name='HZ918092721d319701721e41a5c40c44_SQR']");
	var C_WLMQSSSNYYDBAB_SQDWGRMC = $("input[name='HZ9180927227809801722befe6b33dfb_SQDWGRMC']");
	C_XMXX_SQR.change(function () {
		C_WLMQSSSNYYDBAB_SQDWGRMC.val(C_XMXX_SQR.val());
	});
	if (!C_WLMQSSSNYYDBAB_SQDWGRMC.val()) {
		C_WLMQSSSNYYDBAB_SQDWGRMC.val(C_XMXX_SQR.val());
	};

	//-------------------3.3农村设施用地业务结束------------------------------------

	//-------------------3.4划拨方式取得的土地使用权转让业务------------------------------------
	//更新国有建设用地使用权划转申请表关联ID
	var C_XMXX_XMBH_GLID8 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDSYQHZSQB_GLID = $("input[name='HZ9180927227809801722c0db77c40a5_GLID']");
	C_XMXX_XMBH_GLID8.change(function () {
		C_GYJSYDSYQHZSQB_GLID.val(C_XMXX_XMBH_GLID8.val());
	});
	if (!C_GYJSYDSYQHZSQB_GLID.val()) {
		C_GYJSYDSYQHZSQB_GLID.val(C_XMXX_XMBH_GLID8.val());
	}

	//更新国有建设用地使用权划转申请表项目名称
	var C_XMXX_XMMC6 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_GYJSYDSYQHZSQB_XMMC = $("input[name='HZ9180927227809801722c0db77c40a5_XMMC']");
	C_XMXX_XMMC6.change(function () {
		C_GYJSYDSYQHZSQB_XMMC.val(C_XMXX_XMMC6.val());
	});
	if (!C_GYJSYDSYQHZSQB_XMMC.val()) {
		C_GYJSYDSYQHZSQB_XMMC.val(C_XMXX_XMMC6.val());
	};

	//更新国有建设用地使用权划转申请表受理人
	var C_XMXX_SJR2 = $("input[name='HZ918092721d319701721e41a5c40c44_SJR']");
	var C_GYJSYDSYQHZSQB_SLR = $("input[name='HZ9180927227809801722c0db77c40a5_SLR']");
	C_XMXX_SJR2.change(function () {
		C_GYJSYDSYQHZSQB_SLR.val(C_XMXX_SJR2.val());
	});
	if (!C_GYJSYDSYQHZSQB_SLR.val()) {
		C_GYJSYDSYQHZSQB_SLR.val(C_XMXX_SJR2.val());
	};

	//更新国有建设用地使用权划转申请表受理日期
	var C_XMXX_SJR2 = $("input[name='HZ918092721d319701721e41a5c40c44_CJRQ']");
	var C_GYJSYDSYQHZSQB_SLRQ = $("input[name='HZ9180927227809801722c0db77c40a5_SLRQ']");
	C_XMXX_SJR2.change(function () {
		C_GYJSYDSYQHZSQB_SLRQ.val(C_XMXX_SJR2.val());
	});
	if (!C_GYJSYDSYQHZSQB_SLRQ.val()) {
		C_GYJSYDSYQHZSQB_SLRQ.val(C_XMXX_SJR2.val());
	};

	//-------------------3.4划拨方式取得的土地使用权转让业务结束------------------------------------

	//-------------------3.5协议出让自建房业务开始------------------
	//更新协议出让自建房申请表项目编号
	var C_XMXX_XMBH7 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_XYCRZJF_XMBH7 = $("input[name='HZ9180927227809801722b00b22f2ad9_XMBH']");
	C_XMXX_XMBH7.change(function () {
		C_XYCRZJF_XMBH7.val(C_XMXX_XMBH7.val());
	});
	if (!C_XYCRZJF_XMBH7.val()) {
		C_XYCRZJF_XMBH7.val(C_XMXX_XMBH7.val());
	};

	//更新协议出让自建房申请表项目名称
	var C_XMXX_XMMC16 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_XYCRZJF_XMMC16 = $("input[name='HZ9180927227809801722b00b22f2ad9_XMMC']");
	C_XMXX_XMMC16.change(function () {
		C_XYCRZJF_XMMC16.val(C_XMXX_XMMC16.val());
	});
	if (!C_XYCRZJF_XMMC16.val()) {
		C_XYCRZJF_XMMC16.val(C_XMXX_XMMC16.val());
	};


	//更新协议出让自建房申请表关联ID
	var C_XMXX_XMBH_GLID25 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_XYCRZJF_GLID25 = $("input[name='HZ9180927227809801722b00b22f2ad9_GLID']");
	C_XMXX_XMBH_GLID25.change(function () {
		C_XYCRZJF_GLID25.val(C_XMXX_XMBH_GLID25.val());
	});
	if (!C_XYCRZJF_GLID25.val()) {
		C_XYCRZJF_GLID25.val(C_XMXX_XMBH_GLID25.val());
	};

	//更新协议出让自建房申请表受理人
	var C_XMXX_SJR3 = $("input[name='HZ918092721d319701721e41a5c40c44_SJR']");
	var C_XYCRZJF_SLR3 = $("input[name='HZ9180927227809801722b00b22f2ad9_SLR']");
	C_XMXX_SJR3.change(function () {
		C_XYCRZJF_SLR3.val(C_XMXX_SJR3.val());
	});
	if (!C_XYCRZJF_SLR3.val()) {
		C_XYCRZJF_SLR3.val(C_XMXX_SJR3.val());
	};

	//协议出让自建房申请表受理日期
	var C_XMXX_SJRQ3 = $("input[name='HZ918092721d319701721e41a5c40c44_CJRQ']");
	var C_XYCRZJF_SLRQ3 = $("input[name='HZ9180927227809801722b00b22f2ad9_SLRQ']");
	C_XMXX_SJRQ3.change(function () {
		C_XYCRZJF_SLRQ3.val(C_XMXX_SJRQ3.val());
	});
	if (!C_XYCRZJF_SLRQ3.val()) {
		C_XYCRZJF_SLRQ3.val(C_XMXX_SJRQ3.val());
	};

	//更新协议出让自建房审批表关联ID
	var C_XMXX_XMBH_GLID26 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_XYCRZJFSP_GLID26 = $("input[name='HZ9180927227809801722b7b4a4931ea_GLID']");
	C_XMXX_XMBH_GLID26.change(function () {
		C_XYCRZJFSP_GLID26.val(C_XMXX_XMBH_GLID26.val());
	});
	if (!C_XYCRZJFSP_GLID26.val()) {
		C_XYCRZJFSP_GLID26.val(C_XMXX_XMBH_GLID26.val());
	};

	//更新协议出让自建房审批表受让方
	var C_XYCRZJFSQ_SRF = $("input[name='HZ9180927227809801722b00b22f2ad9_SRF']");
	var C_XYCRZJFSP_SRFMC = $("input[name='HZ9180927227809801722b7b4a4931ea_SRFMC']");
	C_XYCRZJFSQ_SRF.change(function () {
		C_XYCRZJFSP_SRFMC.val(C_XYCRZJFSQ_SRF.val());
	});
	if (!C_XYCRZJFSP_SRFMC.val()) {
		C_XYCRZJFSP_SRFMC.val(C_XYCRZJFSQ_SRF.val());
	};


	//更新协议出让自建房审批表受让方地址
	var C_XYCRZJFSQ_SRFTXDZ = $("input[name='HZ9180927227809801722b00b22f2ad9_SRFTXDZ']");
	var C_XYCRZJFSP_SRFDZ = $("input[name='HZ9180927227809801722b7b4a4931ea_SRFDZ']");
	C_XYCRZJFSQ_SRFTXDZ.change(function () {
		C_XYCRZJFSP_SRFDZ.val(C_XYCRZJFSQ_SRFTXDZ.val());
	});
	if (!C_XYCRZJFSP_SRFDZ.val()) {
		C_XYCRZJFSP_SRFDZ.val(C_XYCRZJFSQ_SRFTXDZ.val());
	};

	//更新协议出让自建房审批表土地坐落
	var C_XYCRZJFSQ_NSRTDZL = $("input[name='HZ9180927227809801722b00b22f2ad9_NSRTDZL']");
	var C_XYCRZJFSP_TDZL = $("input[name='HZ9180927227809801722b7b4a4931ea_TDZL']");
	C_XYCRZJFSQ_NSRTDZL.change(function () {
		C_XYCRZJFSP_TDZL.val(C_XYCRZJFSQ_NSRTDZL.val());
	});
	if (!C_XYCRZJFSP_TDZL.val()) {
		C_XYCRZJFSP_TDZL.val(C_XYCRZJFSQ_NSRTDZL.val());
	};

	//-------------------3.5协议出让自建房业务结束------------------

	//-------------------3.6合同录入业务开始------------------
	//更新国有建设用地划拨决定书-1关联ID
	var C_XMXX_XMBH_GLID27 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HBJDS_GLID27 = $("input[name='HZ918092722780980172309e93937fd9_GLID']");
	C_XMXX_XMBH_GLID27.change(function () {
		C_HBJDS_GLID27.val(C_XMXX_XMBH_GLID27.val());
	});
	if (!C_HBJDS_GLID27.val()) {
		C_HBJDS_GLID27.val(C_XMXX_XMBH_GLID27.val());
	};
	//更新国有建设用地划拨决定书-2关联ID
	var C_XMXX_XMBH_GLID28 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HBJDS_GLID28 = $("input[name='HZ91809272278098017230b46439018c_GLID']");
	C_XMXX_XMBH_GLID28.change(function () {
		C_HBJDS_GLID28.val(C_XMXX_XMBH_GLID28.val());
	});
	if (!C_HBJDS_GLID28.val()) {
		C_HBJDS_GLID28.val(C_XMXX_XMBH_GLID28.val());
	};
	//更新国有建设用地划拨决定书-3关联ID
	var C_XMXX_XMBH_GLID29 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HBJDS_GLID29 = $("input[name='HZ91809272278098017230d8c0ee05d0_GLID']");
	C_XMXX_XMBH_GLID29.change(function () {
		C_HBJDS_GLID29.val(C_XMXX_XMBH_GLID29.val());
	});
	if (!C_HBJDS_GLID29.val()) {
		C_HBJDS_GLID29.val(C_XMXX_XMBH_GLID29.val());
	};
	//更新国有建设用地划拨决定书-4关联ID
	var C_XMXX_XMBH_GLID30 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HBJDS_GLID30 = $("input[name='HZ9180927227809801723be201d930cb_GLID']");
	C_XMXX_XMBH_GLID30.change(function () {
		C_HBJDS_GLID30.val(C_XMXX_XMBH_GLID30.val());
	});
	if (!C_HBJDS_GLID30.val()) {
		C_HBJDS_GLID30.val(C_XMXX_XMBH_GLID30.val());
	};
	//更新国有建设用地划拨决定书-5关联ID
	var C_XMXX_XMBH_GLID31 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HBJDS_GLID31 = $("input[name='HZ9180927227809801723109cedf0b05_GLID']");
	C_XMXX_XMBH_GLID31.change(function () {
		C_HBJDS_GLID31.val(C_XMXX_XMBH_GLID31.val());
	});
	if (!C_HBJDS_GLID31.val()) {
		C_HBJDS_GLID31.val(C_XMXX_XMBH_GLID31.val());
	};
	//更新国有建设用地使用权出让合同 -1关联ID
	var C_XMXX_XMBH_GLID32 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID32 = $("input[name='HZ9180927227809801722baf5872373f_GLID']");
	C_XMXX_XMBH_GLID32.change(function () {
		C_CRHT_GLID32.val(C_XMXX_XMBH_GLID32.val());
	});
	if (!C_CRHT_GLID32.val()) {
		C_CRHT_GLID32.val(C_XMXX_XMBH_GLID32.val());
	};
	//更新国有建设用地使用权出让合同 -2关联ID
	var C_XMXX_XMBH_GLID33 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID33 = $("input[name='HZ9180927227809801722bda084a3c13_GLID']");
	C_XMXX_XMBH_GLID33.change(function () {
		C_CRHT_GLID33.val(C_XMXX_XMBH_GLID33.val());
	});
	if (!C_CRHT_GLID33.val()) {
		C_CRHT_GLID33.val(C_XMXX_XMBH_GLID33.val());
	};
	//更新国有建设用地使用权出让合同 -3关联ID
	var C_XMXX_XMBH_GLID34 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID34 = $("input[name='HZ9180927227809801722c12181740d7_GLID']");
	C_XMXX_XMBH_GLID34.change(function () {
		C_CRHT_GLID34.val(C_XMXX_XMBH_GLID34.val());
	});
	if (!C_CRHT_GLID34.val()) {
		C_CRHT_GLID34.val(C_XMXX_XMBH_GLID34.val());
	};
	//更新国有建设用地使用权出让合同 -4关联ID
	var C_XMXX_XMBH_GLID35 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID35 = $("input[name='HZ9180927227809801722c5618e64806_GLID']");
	C_XMXX_XMBH_GLID35.change(function () {
		C_CRHT_GLID35.val(C_XMXX_XMBH_GLID35.val());
	});
	if (!C_CRHT_GLID35.val()) {
		C_CRHT_GLID35.val(C_XMXX_XMBH_GLID35.val());
	};
	//更新国有建设用地使用权出让合同 -5关联ID
	var C_XMXX_XMBH_GLID36 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID36 = $("input[name='HZ91809272448b800172507af64a246e_GLID']");
	C_XMXX_XMBH_GLID36.change(function () {
		C_CRHT_GLID36.val(C_XMXX_XMBH_GLID36.val());
	});
	if (!C_CRHT_GLID36.val()) {
	};
	//更新国有建设用地使用权出让合同 -6关联ID
	var C_XMXX_XMBH_GLID37 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_CRHT_GLID37 = $("input[name='HZ9180927227809801722fae190e6fb4_GLID']");
	C_XMXX_XMBH_GLID37.change(function () {
		C_CRHT_GLID37.val(C_XMXX_XMBH_GLID37.val());
	});
	if (!C_CRHT_GLID37.val()) {
		C_CRHT_GLID37.val(C_XMXX_XMBH_GLID37.val());
	};
	//-------------------3.6合同录入业务结束------------------

	//-------------------3.7国有建设用地使用权协议出让业务开始------------------
	//更新国有建设用地使用权协议出让申请表项目编号
	var C_XMXX_XMBH8 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDSYQXICRSQ_XMBH8 = $("input[name='HZ91809272448b8001725112c40b3327_XMBH']");
	C_XMXX_XMBH8.change(function () {
		C_GYJSYDSYQXICRSQ_XMBH8.val(C_XMXX_XMBH8.val());
	});
	if (!C_GYJSYDSYQXICRSQ_XMBH8.val()) {
		C_GYJSYDSYQXICRSQ_XMBH8.val(C_XMXX_XMBH8.val());
	};

	//更新国有建设用地使用权协议出让申请表项目名称
	var C_XMXX_XMMC17 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_GYJSYDSYQXICRSQ_JSXMMC17 = $("input[name='HZ91809272448b8001725112c40b3327_JSXMMC']");
	C_XMXX_XMMC17.change(function () {
		C_GYJSYDSYQXICRSQ_JSXMMC17.val(C_XMXX_XMMC17.val());
	});
	if (!C_GYJSYDSYQXICRSQ_JSXMMC17.val()) {
		C_GYJSYDSYQXICRSQ_JSXMMC17.val(C_XMXX_XMMC17.val());
	};


	//更新国有建设用地使用权协议出让申请表关联ID
	var C_XMXX_XMBH_GLID38 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDSYQXICRSQ_GLID38 = $("input[name='HZ91809272448b8001725112c40b3327_GLID']");
	C_XMXX_XMBH_GLID38.change(function () {
		C_GYJSYDSYQXICRSQ_GLID38.val(C_XMXX_XMBH_GLID38.val());
	});
	if (!C_GYJSYDSYQXICRSQ_GLID38.val()) {
		C_GYJSYDSYQXICRSQ_GLID38.val(C_XMXX_XMBH_GLID38.val());
	};

	//更新国有建设用地使用权出让审理表关联ID
	var C_XMXX_XMBH_GLID39 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDSYQCRSLB_GLID39 = $("input[name='HZ91809272448b800172511bb7c533f3_GLID']");
	C_XMXX_XMBH_GLID39.change(function () {
		C_GYJSYDSYQCRSLB_GLID39.val(C_XMXX_XMBH_GLID39.val());
	});
	if (!C_GYJSYDSYQCRSLB_GLID39.val()) {
		C_GYJSYDSYQCRSLB_GLID39.val(C_XMXX_XMBH_GLID39.val());
	};
	//更新国有建设用地使用权出让审理表用地面积
	var C_GYJSYDSYQXICRSQ_SQYDMJ = $("input[name='HZ91809272448b8001725112c40b3327_SQYDMJ']");
	var C_GYJSYDSYQCRSLB_YDMJ = $("input[name='HZ91809272448b800172511bb7c533f3_YDMJ']");
	C_GYJSYDSYQXICRSQ_SQYDMJ.change(function () {
		C_GYJSYDSYQCRSLB_YDMJ.val(C_GYJSYDSYQXICRSQ_SQYDMJ.val());
	});
	if (!C_GYJSYDSYQCRSLB_YDMJ.val()) {
		C_GYJSYDSYQCRSLB_YDMJ.val(C_GYJSYDSYQXICRSQ_SQYDMJ.val());
	};
	//更新国有建设用地使用权出让审理表用地单位
	var C_GYJSYDSYQXICRSQ_SQYDDWMC = $("input[name='HZ91809272448b8001725112c40b3327_SQYDDWMC']");
	var C_GYJSYDSYQCRSLB_YDDW = $("input[name='HZ91809272448b800172511bb7c533f3_YDDW']");
	C_GYJSYDSYQXICRSQ_SQYDDWMC.change(function () {
		C_GYJSYDSYQCRSLB_YDDW.val(C_GYJSYDSYQXICRSQ_SQYDDWMC.val());
	});
	if (!C_GYJSYDSYQCRSLB_YDDW.val()) {
		C_GYJSYDSYQCRSLB_YDDW.val(C_GYJSYDSYQXICRSQ_SQYDDWMC.val());
	};

	//更新土地供应会审表项目名称
	var C_XMXX_XMMC18 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_TDGYHSB_XMMC18 = $("input[name='HZ91809272448b800172543336c05896_JSXMMC']");
	C_XMXX_XMMC18.change(function () {
		C_TDGYHSB_XMMC18.val(C_XMXX_XMMC18.val());
	});
	if (!C_TDGYHSB_XMMC18.val()) {
		C_TDGYHSB_XMMC18.val(C_XMXX_XMMC18.val());
	};

	//更新土地供应会审表关联ID
	var C_XMXX_XMBH_GLID40 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_TDGYHSB_GLID40 = $("input[name='HZ91809272448b800172543336c05896_GLID']");
	C_XMXX_XMBH_GLID40.change(function () {
		C_TDGYHSB_GLID40.val(C_XMXX_XMBH_GLID40.val());
	});
	if (!C_TDGYHSB_GLID40.val()) {
		C_TDGYHSB_GLID40.val(C_XMXX_XMBH_GLID40.val());
	};
	//更新土地供应会审表用地面积
	var C_GYJSYDSYQXICRSQ_SQYDMJ1 = $("input[name='HZ91809272448b8001725112c40b3327_SQYDMJ']");
	var C_TDGYHSB_SQYDMJ = $("input[name='HZ91809272448b800172543336c05896_SQYDMJ']");
	C_GYJSYDSYQXICRSQ_SQYDMJ1.change(function () {
		C_TDGYHSB_SQYDMJ.val(C_GYJSYDSYQXICRSQ_SQYDMJ1.val());
	});
	if (!C_TDGYHSB_SQYDMJ.val()) {
		C_TDGYHSB_SQYDMJ.val(C_GYJSYDSYQXICRSQ_SQYDMJ1.val());
	};
	//更新土地供应会审表用地单位
	var C_GYJSYDSYQXICRSQ_SQYDDWMC1 = $("input[name='HZ91809272448b8001725112c40b3327_SQYDDWMC']");
	var C_TDGYHSB_SQYDDW = $("input[name='HZ91809272448b800172543336c05896_SQYDDW']");
	C_GYJSYDSYQXICRSQ_SQYDDWMC1.change(function () {
		C_TDGYHSB_SQYDDW.val(C_GYJSYDSYQXICRSQ_SQYDDWMC1.val());
	});
	if (!C_TDGYHSB_SQYDDW.val()) {
		C_TDGYHSB_SQYDDW.val(C_GYJSYDSYQXICRSQ_SQYDDWMC1.val());
	};
	//-------------------3.7国有建设用地使用权协议出让业务结束------------------

	//-------------------3.8国有建设用地使用权协议出让（分局）业务开始---------------
	//更新供地方案申请单位名称
	var C_GYJSYDSYQXICRSQ_SQYDDWMC2 = $("input[name='HZ91809272448b8001725112c40b3327_SQYDDWMC']");
	var C_GDFA_SQDWMC = $("input[name='HZ9180927227809801722afa80d42a49_SQDWMC']");
	C_GYJSYDSYQXICRSQ_SQYDDWMC2.change(function () {
		C_GDFA_SQDWMC.val(C_GYJSYDSYQXICRSQ_SQYDDWMC2.val());
	});
	if (!C_GDFA_SQDWMC.val()) {
		C_GDFA_SQDWMC.val(C_GYJSYDSYQXICRSQ_SQYDDWMC2.val());
	};

	//-------------------3.8国有建设用地使用权协议出让（分局）业务结束---------------

	//-------------------3.9国有建设用地划拨业务开始---------------
	//更新国有建设用地划拨申请表项目编号
	var C_XMXX_XMBH9 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDHB_XMBH9 = $("input[name='HZ918092722780980172300d5e1f77c9_XMBH']");
	C_XMXX_XMBH9.change(function () {
		C_GYJSYDHB_XMBH9.val(C_XMXX_XMBH9.val());
	});
	if (!C_GYJSYDHB_XMBH9.val()) {
		C_GYJSYDHB_XMBH9.val(C_XMXX_XMBH9.val());
	};

	//更新国有建设用地划拨申请表项目名称
	var C_XMXX_XMMC19 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_GYJSYDHB_JSXMMC19 = $("input[name='HZ918092722780980172300d5e1f77c9_JSXMMC']");
	C_XMXX_XMMC16.change(function () {
		C_GYJSYDHB_JSXMMC19.val(C_XMXX_XMMC16.val());
	});
	if (!C_GYJSYDHB_JSXMMC19.val()) {
		C_GYJSYDHB_JSXMMC19.val(C_XMXX_XMMC16.val());
	};


	//更新国有建设用地划拨申请表关联ID
	var C_XMXX_XMBH_GLID41 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDHB_GLID41 = $("input[name='HZ918092722780980172300d5e1f77c9_GLID']");
	C_XMXX_XMBH_GLID41.change(function () {
		C_GYJSYDHB_GLID41.val(C_XMXX_XMBH_GLID41.val());
	});
	if (!C_GYJSYDHB_GLID41.val()) {
		C_GYJSYDHB_GLID41.val(C_XMXX_XMBH_GLID41.val());
	};

	//更新土地供应会审表项目名称
	var C_XMXX_XMMC20 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_TDGYHSB_XMMC20 = $("input[name='HZ91809272448b800172553bd0ad674e_JSXMMC']");
	C_XMXX_XMMC20.change(function () {
		C_TDGYHSB_XMMC20.val(C_XMXX_XMMC20.val());
	});
	if (!C_TDGYHSB_XMMC20.val()) {
		C_TDGYHSB_XMMC20.val(C_XMXX_XMMC20.val());
	};
	//更新土地供应会审表关联ID
	var C_XMXX_XMBH_GLID42 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_TDGYHSB_GLID42 = $("input[name='HZ91809272448b800172553bd0ad674e_GLID']");
	C_XMXX_XMBH_GLID42.change(function () {
		C_TDGYHSB_GLID42.val(C_XMXX_XMBH_GLID42.val());
	});
	if (!C_TDGYHSB_GLID42.val()) {
		C_TDGYHSB_GLID42.val(C_XMXX_XMBH_GLID42.val());
	};
	//更新土地供应会审表用地面积
	var C_GYJSYDHBSQ_SQYDMJ = $("input[name='HZ918092722780980172300d5e1f77c9_SQYDMJ']");
	var C_TDGYHSB_SQYDMJ = $("input[name='HZ91809272448b800172553bd0ad674e_SQYDMJ']");
	C_GYJSYDHBSQ_SQYDMJ.change(function () {
		C_TDGYHSB_SQYDMJ.val(C_GYJSYDHBSQ_SQYDMJ.val());
	});
	if (!C_TDGYHSB_SQYDMJ.val()) {
		C_TDGYHSB_SQYDMJ.val(C_GYJSYDHBSQ_SQYDMJ.val());
	};
	//更新土地供应会审表用地单位
	var C_GYJSYDHBSQ_SQYDDWMC = $("input[name='HZ918092722780980172300d5e1f77c9_SQYDDWMC']");
	var C_TDGYHSB_SQYDDW2 = $("input[name='HZ91809272448b800172553bd0ad674e_SQYDDW']");
	C_GYJSYDHBSQ_SQYDDWMC.change(function () {
		C_TDGYHSB_SQYDDW2.val(C_GYJSYDHBSQ_SQYDDWMC.val());
	});
	if (!C_TDGYHSB_SQYDDW2.val()) {
		C_TDGYHSB_SQYDDW2.val(C_GYJSYDHBSQ_SQYDDWMC.val());
	};

	//-------------------3.9国有建设用地划拨业务结束---------------
	//-------------------3.10国有建设用地划拨（分局）业务开始---------------
	//更新国有建设用地使用权划拨审理表关联ID
	var C_XMXX_XMBH_GLID43 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_GYJSYDSYQHBSLB_GLID43 = $("input[name='HZ91809272448b800172557ec5646a81_GLID']");
	C_XMXX_XMBH_GLID43.change(function () {
		C_GYJSYDSYQHBSLB_GLID43.val(C_XMXX_XMBH_GLID43.val());
	});
	if (!C_GYJSYDSYQHBSLB_GLID43.val()) {
		C_GYJSYDSYQHBSLB_GLID43.val(C_XMXX_XMBH_GLID43.val());
	};
	//更新供地方案申请单位名称
	var C_GYJSYDHBSQ_SQYDDWMC1 = $("input[name='HZ918092722780980172300d5e1f77c9_SQYDDWMC']");
	var C_GDFA_SQDWMC1 = $("input[name='HZ9180927227809801722afa80d42a49_SQDWMC']");
	C_GYJSYDHBSQ_SQYDDWMC1.change(function () {
		C_GDFA_SQDWMC1.val(C_GYJSYDHBSQ_SQYDDWMC1.val());
	});
	if (!C_GDFA_SQDWMC1.val()) {
		C_GDFA_SQDWMC1.val(C_GYJSYDHBSQ_SQYDDWMC1.val());
	};
	//更新土地供应会审表项目名称
	var C_XMXX_XMMC21 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_TDGYHSB_XMMC21 = $("input[name='HZ91809272448b800172560063317170_JSXMMC']");
	C_XMXX_XMMC21.change(function () {
		C_TDGYHSB_XMMC21.val(C_XMXX_XMMC21.val());
	});
	if (!C_TDGYHSB_XMMC21.val()) {
		C_TDGYHSB_XMMC21.val(C_XMXX_XMMC21.val());
	};
	//更新土地供应会审表关联ID
	var C_XMXX_XMBH_GLID44 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_TDGYHSB_GLID44 = $("input[name='HZ91809272448b800172560063317170_GLID']");
	C_XMXX_XMBH_GLID44.change(function () {
		C_TDGYHSB_GLID44.val(C_XMXX_XMBH_GLID44.val());
	});
	if (!C_TDGYHSB_GLID44.val()) {
		C_TDGYHSB_GLID44.val(C_XMXX_XMBH_GLID44.val());
	};
	//更新土地供应会审表用地面积
	var C_GYJSYDHBSQ_SQYDMJ1 = $("input[name='HZ918092722780980172300d5e1f77c9_SQYDMJ']");
	var C_TDGYHSB_SQYDMJ1 = $("input[name='HZ91809272448b800172560063317170_SQYDMJ']");
	C_GYJSYDHBSQ_SQYDMJ1.change(function () {
		C_TDGYHSB_SQYDMJ1.val(C_GYJSYDHBSQ_SQYDMJ1.val());
	});
	if (!C_TDGYHSB_SQYDMJ1.val()) {
		C_TDGYHSB_SQYDMJ1.val(C_GYJSYDHBSQ_SQYDMJ1.val());
	};
	//更新土地供应会审表用地单位
	var C_GYJSYDHBSQ_SQYDDWMC2 = $("input[name='HZ918092722780980172300d5e1f77c9_SQYDDWMC']");
	var C_TDGYHSB_SQYDDW3 = $("input[name='HZ91809272448b800172560063317170_SQYDDW']");
	C_GYJSYDHBSQ_SQYDDWMC2.change(function () {
		C_TDGYHSB_SQYDDW3.val(C_GYJSYDHBSQ_SQYDDWMC2.val());
	});
	if (!C_TDGYHSB_SQYDDW3.val()) {
		C_TDGYHSB_SQYDDW3.val(C_GYJSYDHBSQ_SQYDDWMC2.val());
	};
	//-------------------3.10国有建设用地划拨（分局）业务结束---------------
	//-------------------3.11国有建设用地招拍挂（分局）业务开始---------------
	//更新国有建设用地招拍挂申请表项目编号
	var C_XMXX_XMBH10 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZPGFJ_XMBH10 = $("input[name='HZ9180927227809801722a72bdbc212d_XMBH']");
	C_XMXX_XMBH10.change(function () {
		C_ZPGFJ_XMBH10.val(C_XMXX_XMBH10.val());
	});
	if (!C_ZPGFJ_XMBH10.val()) {
		C_ZPGFJ_XMBH10.val(C_XMXX_XMBH10.val());
	};

	//更新国有建设用地招拍挂申请表项目名称
	var C_XMXX_XMMC22 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_ZPGFJ_XMMC22 = $("input[name='HZ9180927227809801722a72bdbc212d_XMMC']");
	C_XMXX_XMMC22.change(function () {
		C_ZPGFJ_XMMC22.val(C_XMXX_XMMC22.val());
	});
	if (!C_ZPGFJ_XMMC22.val()) {
		C_ZPGFJ_XMMC22.val(C_XMXX_XMMC22.val());
	};


	//更新国有建设用地招拍挂申请表关联ID
	var C_XMXX_XMBH_GLID45 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZPGFJ_GLID45 = $("input[name='HZ9180927227809801722a72bdbc212d_GLID']");
	C_XMXX_XMBH_GLID45.change(function () {
		C_ZPGFJ_GLID45.val(C_XMXX_XMBH_GLID45.val());
	});
	if (!C_ZPGFJ_GLID45.val()) {
		C_ZPGFJ_GLID45.val(C_XMXX_XMBH_GLID45.val());
	};
	//更新供地方案申请单位名称
	var C_ZPGFJSQ_SQR = $("input[name='HZ9180927227809801722a72bdbc212d_SQR']");
	var C_GDFA_SQDWMC2 = $("input[name='HZ9180927227809801722afa80d42a49_SQDWMC']");
	C_ZPGFJSQ_SQR.change(function () {
		C_GDFA_SQDWMC2.val(C_ZPGFJSQ_SQR.val());
	});
	if (!C_GDFA_SQDWMC2.val()) {
		C_GDFA_SQDWMC2.val(C_ZPGFJSQ_SQR.val());
	};
	//更新土地供应会审表项目名称
	var C_XMXX_XMMC23 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_TDGYHSB_XMMC23 = $("input[name='HZ91809272448b80017258cb495b1023_JSXMMC']");
	C_XMXX_XMMC23.change(function () {
		C_TDGYHSB_XMMC23.val(C_XMXX_XMMC23.val());
	});
	if (!C_TDGYHSB_XMMC23.val()) {
		C_TDGYHSB_XMMC23.val(C_XMXX_XMMC23.val());
	};
	//更新土地供应会审表关联ID
	var C_XMXX_XMBH_GLID46 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_TDGYHSB_GLID46 = $("input[name='HZ91809272448b80017258cb495b1023_GLID']");
	C_XMXX_XMBH_GLID46.change(function () {
		C_TDGYHSB_GLID46.val(C_XMXX_XMBH_GLID46.val());
	});
	if (!C_TDGYHSB_GLID46.val()) {
		C_TDGYHSB_GLID46.val(C_XMXX_XMBH_GLID46.val());
	};
	//更新土地供应会审表用地面积
	var C_ZPGFJSQ_TDMJ = $("input[name='HZ9180927227809801722a72bdbc212d_TDMJ']");
	var C_TDGYHSB_SQYDMJ2 = $("input[name='HZ91809272448b80017258cb495b1023_SQYDMJ']");
	C_ZPGFJSQ_TDMJ.change(function () {
		C_TDGYHSB_SQYDMJ2.val(C_ZPGFJSQ_TDMJ.val());
	});
	if (!C_TDGYHSB_SQYDMJ2.val()) {
		C_TDGYHSB_SQYDMJ2.val(C_ZPGFJSQ_TDMJ.val());
	};
	//更新土地供应会审表用地单位
	var C_ZPGFJSQ_SQR1 = $("input[name='HZ9180927227809801722a72bdbc212d_SQR']");
	var C_TDGYHSB_SQYDDW4 = $("input[name='HZ91809272448b80017258cb495b1023_SQYDDW']");
	C_ZPGFJSQ_SQR1.change(function () {
		C_TDGYHSB_SQYDDW4.val(C_ZPGFJSQ_SQR1.val());
	});
	if (!C_TDGYHSB_SQYDDW4.val()) {
		C_TDGYHSB_SQYDDW4.val(C_ZPGFJSQ_SQR1.val());
	};

	//-------------------3.11国有建设用地招拍挂（分局）业务结束---------------

	//-------------------3.12国有建设用地招拍挂（市局）业务开始---------------

	//3.11已涵盖
	//-------------------3.12国有建设用地招拍挂（市局）业务结束---------------
	//-------------------3.13核发建设用地批准书业务开始--------------
	//更新核发建设用地批准书申请表项目编号
	var C_XMXX_XMBH11 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HFJSYDPZSSQB_XMBH11 = $("input[name='HZ918092721d3197017226cc80ce6ef0_XMBH']");
	C_XMXX_XMBH11.change(function () {
		C_HFJSYDPZSSQB_XMBH11.val(C_XMXX_XMBH11.val());
	});
	if (!C_HFJSYDPZSSQB_XMBH11.val()) {
		C_HFJSYDPZSSQB_XMBH11.val(C_XMXX_XMBH11.val());
	};

	//更新核发建设用地批准书申请表建设项目名称
	var C_XMXX_XMMC24 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_HFJSYDPZSSQB_XMMC24 = $("input[name='HZ918092721d3197017226cc80ce6ef0_JSXMMC']");
	C_XMXX_XMMC24.change(function () {
		C_HFJSYDPZSSQB_XMMC24.val(C_XMXX_XMMC24.val());
	});
	if (!C_HFJSYDPZSSQB_XMMC24.val()) {
		C_HFJSYDPZSSQB_XMMC24.val(C_XMXX_XMMC24.val());
	};

	//更新核发建设用地批准书申请表关联ID
	var C_XMXX_XMBH_GLID47 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HFJSYDPZSSQB_GLID47 = $("input[name='HZ918092721d3197017226cc80ce6ef0_GLID']");
	C_XMXX_XMBH_GLID47.change(function () {
		C_HFJSYDPZSSQB_GLID47.val(C_XMXX_XMBH_GLID47.val());
	});
	if (!C_HFJSYDPZSSQB_GLID47.val()) {
		C_HFJSYDPZSSQB_GLID47.val(C_XMXX_XMBH_GLID47.val());
	};

	//更新核发建设用地批准书项目名称
	var C_XMXX_XMMC25 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_HFJSYDPZS_XMMC25 = $("input[name='HZ918092721d31970172274355bd764c_XMMC']");
	C_XMXX_XMMC25.change(function () {
		C_HFJSYDPZS_XMMC25.val(C_XMXX_XMMC25.val());
	});
	if (!C_HFJSYDPZS_XMMC25.val()) {
		C_HFJSYDPZS_XMMC25.val(C_XMXX_XMMC25.val());
	};

	//更新核发建设用地批批准书关联ID
	var C_XMXX_XMBH_GLID48 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_HFJSYDPZS_GLID48 = $("input[name='HZ918092721d31970172274355bd764c_GLID']");
	C_XMXX_XMBH_GLID48.change(function () {
		C_HFJSYDPZS_GLID48.val(C_XMXX_XMBH_GLID48.val());
	});
	if (!C_HFJSYDPZS_GLID48.val()) {
		C_HFJSYDPZS_GLID48.val(C_XMXX_XMBH_GLID48.val());
	};
	//更新核发建设用地批批准书用地单位名称
	var C_HFJSYDPZSSQB_DWMC = $("input[name='HZ918092721d3197017226cc80ce6ef0_DWMC']");
	var C_HFJSYDPZS_YDDWMC = $("input[name='HZ918092721d31970172274355bd764c_YDDWMC']");
	C_HFJSYDPZSSQB_DWMC.change(function () {
		C_HFJSYDPZS_YDDWMC.val(C_HFJSYDPZSSQB_DWMC.val());
	});
	if (!C_HFJSYDPZS_YDDWMC.val()) {
		C_HFJSYDPZS_YDDWMC.val(C_HFJSYDPZSSQB_DWMC.val());
	};
	//更新核发建设用地批批准书批准用地面积
	var C_HFJSYDPZSSQB_PZYDMJ = $("input[name='HZ918092721d3197017226cc80ce6ef0_PZYDMJ']");
	var C_HFJSYDPZS_PZYDMJ = $("input[name='HZ918092721d31970172274355bd764c_PZYDMJ']");
	C_HFJSYDPZSSQB_PZYDMJ.change(function () {
		C_HFJSYDPZS_PZYDMJ.val(C_HFJSYDPZSSQB_PZYDMJ.val());
	});
	if (!C_HFJSYDPZS_PZYDMJ.val()) {
		C_HFJSYDPZS_PZYDMJ.val(C_HFJSYDPZSSQB_PZYDMJ.val());
	};
	//更新核发建设用地批批准书建、构筑物占地面积
	var C_HFJSYDPZSSQB_JGZWZDMJ = $("input[name='HZ918092721d3197017226cc80ce6ef0_JGZWZDMJ']");
	var C_HFJSYDPZS_JGZWZDMJ = $("input[name='HZ918092721d31970172274355bd764c_JGZWZDMJ']");
	C_HFJSYDPZSSQB_JGZWZDMJ.change(function () {
		C_HFJSYDPZS_JGZWZDMJ.val(C_HFJSYDPZSSQB_JGZWZDMJ.val());
	});
	if (!C_HFJSYDPZS_JGZWZDMJ.val()) {
		C_HFJSYDPZS_JGZWZDMJ.val(C_HFJSYDPZSSQB_JGZWZDMJ.val());
	};
	//更新核发建设用地批批准书批准用地机关
	var C_HFJSYDPZSSQB_PZJG = $("input[name='HZ918092721d3197017226cc80ce6ef0_PZJG']");
	var C_HFJSYDPZS_PZYDJG = $("input[name='HZ918092721d31970172274355bd764c_PZYDJG']");
	C_HFJSYDPZSSQB_PZJG.change(function () {
		C_HFJSYDPZS_PZYDJG.val(C_HFJSYDPZSSQB_PZJG.val());
	});
	if (!C_HFJSYDPZS_PZYDJG.val()) {
		C_HFJSYDPZS_PZYDJG.val(C_HFJSYDPZSSQB_PZJG.val());
	};
	//更新核发建设用地批批准书批准文号
	var C_HFJSYDPZSSQB_PZWH = $("input[name='HZ918092721d3197017226cc80ce6ef0_PZWH']");
	var C_HFJSYDPZS_PZWH = $("input[name='HZ918092721d31970172274355bd764c_PZWH']");
	C_HFJSYDPZSSQB_PZWH.change(function () {
		C_HFJSYDPZS_PZWH.val(C_HFJSYDPZSSQB_PZWH.val());
	});
	if (!C_HFJSYDPZS_PZWH.val()) {
		C_HFJSYDPZS_PZWH.val(C_HFJSYDPZSSQB_PZWH.val());
	};
	//更新核发建设用地批批准书四至_东
	var C_HFJSYDPZSSQB_SZD = $("input[name='HZ918092721d3197017226cc80ce6ef0_SZD']");
	var C_HFJSYDPZS_SZD = $("input[name='HZ918092721d31970172274355bd764c_SZD']");
	C_HFJSYDPZSSQB_SZD.change(function () {
		C_HFJSYDPZS_SZD.val(C_HFJSYDPZSSQB_SZD.val());
	});
	if (!C_HFJSYDPZS_SZD.val()) {
		C_HFJSYDPZS_SZD.val(C_HFJSYDPZSSQB_SZD.val());
	};
	//更新核发建设用地批批准书四至_西
	var C_HFJSYDPZSSQB_SZX = $("input[name='HZ918092721d3197017226cc80ce6ef0_SZX']");
	var C_HFJSYDPZS_SZX = $("input[name='HZ918092721d31970172274355bd764c_SZX']");
	C_HFJSYDPZSSQB_SZX.change(function () {
		C_HFJSYDPZS_SZX.val(C_HFJSYDPZSSQB_SZX.val());
	});
	if (!C_HFJSYDPZS_SZX.val()) {
		C_HFJSYDPZS_SZX.val(C_HFJSYDPZSSQB_SZX.val());
	};
	//更新核发建设用地批批准书四至_南
	var C_HFJSYDPZSSQB_SZN = $("input[name='HZ918092721d3197017226cc80ce6ef0_SZN']");
	var C_HFJSYDPZS_SZN = $("input[name='HZ918092721d31970172274355bd764c_SZN']");
	C_HFJSYDPZSSQB_SZN.change(function () {
		C_HFJSYDPZS_SZN.val(C_HFJSYDPZSSQB_SZN.val());
	});
	if (!C_HFJSYDPZS_SZN.val()) {
		C_HFJSYDPZS_SZN.val(C_HFJSYDPZSSQB_SZN.val());
	};
	//更新核发建设用地批批准书四至_北
	var C_HFJSYDPZSSQB_SZB = $("input[name='HZ918092721d3197017226cc80ce6ef0_SZB']");
	var C_HFJSYDPZS_SZB = $("input[name='HZ918092721d31970172274355bd764c_SZB']");
	C_HFJSYDPZSSQB_SZB.change(function () {
		C_HFJSYDPZS_SZB.val(C_HFJSYDPZSSQB_SZB.val());
	});
	if (!C_HFJSYDPZS_SZB.val()) {
		C_HFJSYDPZS_SZB.val(C_HFJSYDPZSSQB_SZB.val());
	};

	//-------------------3.13核发建设用地批准书业务结束--------------

	//-------------------3.14自建房转让业务开始------------
	//更新自建房转让申请表项目编号
	var C_XMXX_XMBH12 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZJFZRSQB_XMBH12 = $("input[name='HZ9180927227809801723176f2e213e5_XMBH']");
	C_XMXX_XMBH12.change(function () {
		C_ZJFZRSQB_XMBH12.val(C_XMXX_XMBH12.val());
	});
	if (!C_ZJFZRSQB_XMBH12.val()) {
		C_ZJFZRSQB_XMBH12.val(C_XMXX_XMBH12.val());
	};

	//更新自建房转让申请表建设项目名称
	var C_XMXX_XMMC26 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var C_ZJFZRSQB_SQXMMC26 = $("input[name='HZ9180927227809801723176f2e213e5_SQXMMC']");
	C_XMXX_XMMC26.change(function () {
		C_ZJFZRSQB_SQXMMC26.val(C_XMXX_XMMC26.val());
	});
	if (!C_ZJFZRSQB_SQXMMC26.val()) {
		C_ZJFZRSQB_SQXMMC26.val(C_XMXX_XMMC26.val());
	};

	//更新自建房转让申请表关联ID
	var C_XMXX_XMBH_GLID49 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZJFZRSQB_GLID49 = $("input[name='HZ9180927227809801723176f2e213e5_GLID']");
	C_XMXX_XMBH_GLID49.change(function () {
		C_ZJFZRSQB_GLID49.val(C_XMXX_XMBH_GLID49.val());
	});
	if (!C_ZJFZRSQB_GLID49.val()) {
		C_ZJFZRSQB_GLID49.val(C_XMXX_XMBH_GLID49.val());
	};

	//更新自建房转让审批表关联ID
	var C_XMXX_XMBH_GLID50 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var C_ZJFZRSPB_GLID50 = $("input[name='HZ91809272278098017230d65fc20598_GLID']");
	C_XMXX_XMBH_GLID50.change(function () {
		C_ZJFZRSPB_GLID50.val(C_XMXX_XMBH_GLID50.val());
	});
	if (!C_ZJFZRSPB_GLID50.val()) {
		C_ZJFZRSPB_GLID50.val(C_XMXX_XMBH_GLID50.val());
	};
	//更新自建房转让审批表转让方
	var C_ZJFZRSQB_ZRF = $("input[name='HZ9180927227809801723176f2e213e5_ZRF']");
	var C_ZJFZRSPB_ZRF = $("input[name='HZ91809272278098017230d65fc20598_ZRF']");
	C_ZJFZRSQB_ZRF.change(function () {
		C_ZJFZRSPB_ZRF.val(C_ZJFZRSQB_ZRF.val());
	});
	if (!C_ZJFZRSPB_ZRF.val()) {
		C_ZJFZRSPB_ZRF.val(C_ZJFZRSQB_ZRF.val());
	};
	//更新自建房转让审批表转让法人代表
	var C_ZJFZRSQB_ZRFFRDB = $("input[name='HZ9180927227809801723176f2e213e5_ZRFFRDB']");
	var C_ZJFZRSPB_ZRFFRDB = $("input[name='HZ91809272278098017230d65fc20598_ZRFFRDB']");
	C_ZJFZRSQB_ZRFFRDB.change(function () {
		C_ZJFZRSPB_ZRFFRDB.val(C_ZJFZRSQB_ZRFFRDB.val());
	});
	if (!C_ZJFZRSPB_ZRFFRDB.val()) {
		C_ZJFZRSPB_ZRFFRDB.val(C_ZJFZRSQB_ZRFFRDB.val());
	};
	//更新自建房转让审批表受让方
	var C_ZJFZRSQB_SRF = $("input[name='HZ9180927227809801723176f2e213e5_SRF']");
	var C_ZJFZRSPB_SRF = $("input[name='HZ91809272278098017230d65fc20598_SRF']");
	C_ZJFZRSQB_SRF.change(function () {
		C_ZJFZRSPB_SRF.val(C_ZJFZRSQB_SRF.val());
	});
	if (!C_ZJFZRSPB_SRF.val()) {
		C_ZJFZRSPB_SRF.val(C_ZJFZRSQB_SRF.val());
	};
	//更新自建房转让审批表受让法人代表
	var C_ZJFZRSQB_SRFFRDB = $("input[name='HZ9180927227809801723176f2e213e5_SRFFRDB']");
	var C_ZJFZRSPB_SRFFRDB = $("input[name='HZ91809272278098017230d65fc20598_SRFFRDB']");
	C_ZJFZRSQB_SRFFRDB.change(function () {
		C_ZJFZRSPB_SRFFRDB.val(C_ZJFZRSQB_SRFFRDB.val());
	});
	if (!C_ZJFZRSPB_SRFFRDB.val()) {
		C_ZJFZRSPB_SRFFRDB.val(C_ZJFZRSQB_SRFFRDB.val());
	};
	//更新自建房转让审批表宗地面积
	var C_ZJFZRSQB_ZDMJ = $("input[name='HZ9180927227809801723176f2e213e5_ZDMJ']");
	var C_ZJFZRSPB_ZDMJ = $("input[name='HZ91809272278098017230d65fc20598_ZDMJ']");
	C_ZJFZRSQB_ZDMJ.change(function () {
		C_ZJFZRSPB_ZDMJ.val(C_ZJFZRSQB_ZDMJ.val());
	});
	if (!C_ZJFZRSPB_ZDMJ.val()) {
		C_ZJFZRSPB_ZDMJ.val(C_ZJFZRSQB_ZDMJ.val());
	};
	//更新自建房转让审批表四至东
	var C_ZJFZRSQB_DONG = $("input[name='HZ9180927227809801723176f2e213e5_DONG']");
	var C_ZJFZRSPB_DONG = $("input[name='HZ91809272278098017230d65fc20598_DONG']");
	C_ZJFZRSQB_DONG.change(function () {
		C_ZJFZRSPB_DONG.val(C_ZJFZRSQB_DONG.val());
	});
	if (!C_ZJFZRSPB_DONG.val()) {
		C_ZJFZRSPB_DONG.val(C_ZJFZRSQB_DONG.val());
	};
	//更新自建房转让审批表四至南
	var C_ZJFZRSQB_NAN = $("input[name='HZ9180927227809801723176f2e213e5_NAN']");
	var C_ZJFZRSPB_NAN = $("input[name='HZ91809272278098017230d65fc20598_NAN']");
	C_ZJFZRSQB_NAN.change(function () {
		C_ZJFZRSPB_NAN.val(C_ZJFZRSQB_NAN.val());
	});
	if (!C_ZJFZRSPB_NAN.val()) {
		C_ZJFZRSPB_NAN.val(C_ZJFZRSQB_NAN.val());
	};
	//更新自建房转让审批表四至西
	var C_ZJFZRSQB_XI = $("input[name='HZ9180927227809801723176f2e213e5_XI']");
	var C_ZJFZRSPB_XI = $("input[name='HZ91809272278098017230d65fc20598_XI']");
	C_ZJFZRSQB_XI.change(function () {
		C_ZJFZRSPB_XI.val(C_ZJFZRSQB_XI.val());
	});
	if (!C_ZJFZRSPB_XI.val()) {
		C_ZJFZRSPB_XI.val(C_ZJFZRSQB_XI.val());
	};
	//更新自建房转让审批表四至北
	var C_ZJFZRSQB_BEI = $("input[name='HZ9180927227809801723176f2e213e5_BEI']");
	var C_ZJFZRSPB_BEI = $("input[name='HZ91809272278098017230d65fc20598_BEI']");
	C_ZJFZRSQB_BEI.change(function () {
		C_ZJFZRSPB_BEI.val(C_ZJFZRSQB_BEI.val());
	});
	if (!C_ZJFZRSPB_BEI.val()) {
		C_ZJFZRSPB_BEI.val(C_ZJFZRSQB_BEI.val());
	};

	//-------------------3.14自建房转让业务结束------------
	//-------------------3.15补办用地手续业务开始-----------------------
	//----3.16业务已涵盖
	//-------------------3.15补办用地手续业务结束-----------------------

	//-------------------3.16补办用地手续（分局）业务开始------------------
	//补办用地手续申请表
	//更新项目名称						    
	var C_XMXX_XMMC7 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var BBYDSXSQB_JSXMMC = $("input[name='HZ9180927227809801722cc1247b4ebc_JSXMMC']");
	C_XMXX_XMMC7.change(function () {
		BBYDSXSQB_JSXMMC.val(C_XMXX_XMMC7.val());
	});
	if (!BBYDSXSQB_JSXMMC.val()) {
		BBYDSXSQB_JSXMMC.val(C_XMXX_XMMC7.val());
	};


	//更新项目编号					    
	var C_XMXX_XMBH4 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var BBYDSXSQB_XMBH = $("input[name='HZ9180927227809801722cc1247b4ebc_XMBH']");
	C_XMXX_XMBH4.change(function () {
		BBYDSXSQB_XMBH.val(C_XMXX_XMBH4.val());
	});
	if (!BBYDSXSQB_XMBH.val()) {
		BBYDSXSQB_XMBH.val(C_XMXX_XMBH4.val());
	};


	//更新关联ID					    
	var C_XMXX_XMBH_GLID9 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var BBYDSXSQB_GLID = $("input[name='HZ9180927227809801722cc1247b4ebc_GLID']");
	C_XMXX_XMBH_GLID9.change(function () {
		BBYDSXSQB_GLID.val(C_XMXX_XMBH_GLID9.val());
	});
	if (!BBYDSXSQB_GLID.val()) {
		BBYDSXSQB_GLID.val(C_XMXX_XMBH_GLID9.val());
	};

	//补办用地手续报批表
	//更新项目名称					    
	var C_XMXX_XMBH5 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var BBYDSXBPB_JSXMMC = $("input[name='HZ91809272278098017230afbc1a012e_XMMC']");
	C_XMXX_XMBH5.change(function () {
		BBYDSXBPB_JSXMMC.val(C_XMXX_XMBH5.val());
	});
	if (!BBYDSXBPB_JSXMMC.val()) {
		BBYDSXBPB_JSXMMC.val(C_XMXX_XMBH5.val());
	};

	//更新关联ID
	var C_XMXX_XMBH_GLID10 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var BBYDSXBPB_GLID = $("input[name='HZ91809272278098017230afbc1a012e_GLID']");
	C_XMXX_XMBH_GLID10.change(function () {
		BBYDSXBPB_GLID.val(C_XMXX_XMBH_GLID10.val());
	});
	if (!BBYDSXBPB_GLID.val()) {
		BBYDSXBPB_GLID.val(C_XMXX_XMBH_GLID10.val());
	};
	//更新用地单位名称
	var C_BBYDSXSQB_SQDWMC = $("input[name='HZ9180927227809801722cc1247b4ebc_SQDWMC']");
	var BBYDSXBPB_YDDWMC = $("input[name='HZ91809272278098017230afbc1a012e_YDDWMC']");
	C_BBYDSXSQB_SQDWMC.change(function () {
		BBYDSXBPB_YDDWMC.val(C_BBYDSXSQB_SQDWMC.val());
	});
	if (!BBYDSXBPB_YDDWMC.val()) {
		BBYDSXBPB_YDDWMC.val(C_BBYDSXSQB_SQDWMC.val());
	};

	//更新土地坐落
	var C_BBYDSXSQB_TDZL = $("input[name='HZ9180927227809801722cc1247b4ebc_TDZL']");
	var BBYDSXBPB_TDZL = $("input[name='HZ91809272278098017230afbc1a012e_TDZL']");
	C_BBYDSXSQB_TDZL.change(function () {
		BBYDSXBPB_TDZL.val(C_BBYDSXSQB_TDZL.val());
	});
	if (!BBYDSXBPB_TDZL.val()) {
		BBYDSXBPB_TDZL.val(C_BBYDSXSQB_TDZL.val());
	};

	//更新土地总面积
	var C_BBYDSXSQB_TDZMJ = $("input[name='HZ9180927227809801722cc1247b4ebc_TDZMJ']");
	var BBYDSXBPB_TDZMJ = $("input[name='HZ91809272278098017230afbc1a012e_TDZMJ']");
	C_BBYDSXSQB_TDZMJ.change(function () {
		BBYDSXBPB_TDZMJ.val(C_BBYDSXSQB_TDZMJ.val());
	});
	if (!BBYDSXBPB_TDZMJ.val()) {
		BBYDSXBPB_TDZMJ.val(C_BBYDSXSQB_TDZMJ.val());
	};

	//更新年限
	var C_BBYDSXSQB_NX = $("input[name='HZ9180927227809801722cc1247b4ebc_NX']");
	var BBYDSXBPB_NX = $("input[name='HZ91809272278098017230afbc1a012e_NX']");
	C_BBYDSXSQB_NX.change(function () {
		BBYDSXBPB_NX.val(C_BBYDSXSQB_NX.val());
	});
	if (!BBYDSXBPB_NX.val()) {
		BBYDSXBPB_NX.val(C_BBYDSXSQB_NX.val());
	};

	//更新改变用途面积
	var C_BBYDSXSQB_GBYTMJ = $("input[name='HZ9180927227809801722cc1247b4ebc_GBYTMJ']");
	var BBYDSXBPB_GBYTMJ = $("input[name='HZ91809272278098017230afbc1a012e_GBYTMJ']");
	C_BBYDSXSQB_GBYTMJ.change(function () {
		BBYDSXBPB_GBYTMJ.val(C_BBYDSXSQB_GBYTMJ.val());
	});
	if (!BBYDSXBPB_GBYTMJ.val()) {
		BBYDSXBPB_GBYTMJ.val(C_BBYDSXSQB_GBYTMJ.val());
	};

	//更新原最大容积率
	var C_BBYDSXSQB_YZDRJL = $("input[name='HZ9180927227809801722cc1247b4ebc_YZDRJL']");
	var BBYDSXBPB_YZDRJL = $("input[name='HZ91809272278098017230afbc1a012e_YZDRJL']");
	C_BBYDSXSQB_YZDRJL.change(function () {
		BBYDSXBPB_YZDRJL.val(C_BBYDSXSQB_YZDRJL.val());
	});
	if (!BBYDSXBPB_YZDRJL.val()) {
		BBYDSXBPB_YZDRJL.val(C_BBYDSXSQB_YZDRJL.val());
	};

	//更新现容积率
	var C_BBYDSXSQB_XRJL = $("input[name='HZ9180927227809801722cc1247b4ebc_XRJL']");
	var BBYDSXBPB_XRJL = $("input[name='HZ91809272278098017230afbc1a012e_XRJL']");
	C_BBYDSXSQB_XRJL.change(function () {
		BBYDSXBPB_XRJL.val(C_BBYDSXSQB_XRJL.val());
	});
	if (!BBYDSXBPB_XRJL.val()) {
		BBYDSXBPB_XRJL.val(C_BBYDSXSQB_XRJL.val());
	};

	//更新原土地面积
	var C_BBYDSXSQB_YTDMJ = $("input[name='HZ9180927227809801722cc1247b4ebc_YTDMJ']");
	var BBYDSXBPB_YTDMJ = $("input[name='HZ91809272278098017230afbc1a012e_YTDMJ']");
	C_BBYDSXSQB_YTDMJ.change(function () {
		BBYDSXBPB_YTDMJ.val(C_BBYDSXSQB_YTDMJ.val());
	});
	if (!BBYDSXBPB_YTDMJ.val()) {
		BBYDSXBPB_YTDMJ.val(C_BBYDSXSQB_YTDMJ.val());
	};

	//更新变更后面积
	var C_BBYDSXSQB_BGHMJ = $("input[name='HZ9180927227809801722cc1247b4ebc_BGHMJ']");
	var BBYDSXBPB_BGHMJ = $("input[name='HZ91809272278098017230afbc1a012e_BGHMJ']");
	C_BBYDSXSQB_BGHMJ.change(function () {
		BBYDSXBPB_BGHMJ.val(C_BBYDSXSQB_BGHMJ.val());
	});
	if (!BBYDSXBPB_BGHMJ.val()) {
		BBYDSXBPB_BGHMJ.val(C_BBYDSXSQB_BGHMJ.val());
	};

	//宗地测绘单
	//更新项目名称                                            
	var C_XMXX_XMMC8 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var ZDCHD_XMMC8 = $("input[name='HZ9180927227809801722abd455b2568_XMMC']");
	C_XMXX_XMMC8.change(function () {
		ZDCHD_XMMC8.val(C_XMXX_XMMC8.val());
	});
	if (!ZDCHD_XMMC8.val()) {
		ZDCHD_XMMC8.val(C_XMXX_XMMC8.val());
	};

	//更新项目编号                                            
	var C_XMXX_XMBH6 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var ZDCHD_XMBH6 = $("input[name='HZ9180927227809801722abd455b2568_XMBH']");
	C_XMXX_XMBH6.change(function () {
		ZDCHD_XMBH6.val(C_XMXX_XMBH6.val());
	});
	if (!ZDCHD_XMBH6.val()) {
		ZDCHD_XMBH6.val(C_XMXX_XMBH6.val());
	};

	//更新关联ID
	var C_XMXX_XMBH_GLID11 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var ZDCHD_GLID11 = $("input[name='HZ9180927227809801722abd455b2568_GLID']");
	C_XMXX_XMBH_GLID11.change(function () {
		ZDCHD_GLID11.val(C_XMXX_XMBH_GLID11.val());
	});
	if (!ZDCHD_GLID11.val()) {
		ZDCHD_GLID11.val(C_XMXX_XMBH_GLID11.val());
	};


	//供地方案
	//更新项目名称					    
	var C_XMXX_XMMC9 = $("input[name='HZ918092721d319701721e41a5c40c44_XMMC']");
	var GDFA_XMMC9 = $("input[name='HZ9180927227809801722afa80d42a49_XMMC']");
	C_XMXX_XMMC9.change(function () {
		GDFA_XMMC9.val(C_XMXX_XMMC9.val());
	});
	if (!GDFA_XMMC9.val()) {
		GDFA_XMMC9.val(C_XMXX_XMMC9.val());
	};

	//更新关联ID
	var C_XMXX_XMBH_GLID12 = $("input[name='HZ918092721d319701721e41a5c40c44_XMBH']");
	var GDFA_GLID12 = $("input[name='HZ9180927227809801722afa80d42a49_GLID']");
	C_XMXX_XMBH_GLID12.change(function () {
		GDFA_GLID12.val(C_XMXX_XMBH_GLID12.val());
	});
	if (!GDFA_GLID12.val()) {
		GDFA_GLID12.val(C_XMXX_XMBH_GLID12.val());
	};
	//更新用地单位名称
	var C_BBYDSXSQB_SQDWMC1 = $("input[name='HZ9180927227809801722cc1247b4ebc_SQDWMC']");
	var GDFA_SQDWMC1 = $("input[name='HZ9180927227809801722afa80d42a49_SQDWMC']");
	C_BBYDSXSQB_SQDWMC1.change(function () {
		GDFA_SQDWMC1.val(C_BBYDSXSQB_SQDWMC1.val());
	});
	if (!GDFA_SQDWMC1.val()) {
		GDFA_SQDWMC1.val(C_BBYDSXSQB_SQDWMC1.val());
	};

	//更新土地坐落
	var C_BBYDSXSQB_TDZL1 = $("input[name='HZ9180927227809801722cc1247b4ebc_TDZL']");
	var BBYDSXBPB_TDZL1 = $("input[name='HZ9180927227809801722afa80d42a49_TDZL']");
	C_BBYDSXSQB_TDZL1.change(function () {
		BBYDSXBPB_TDZL1.val(C_BBYDSXSQB_TDZL1.val());
	});
	if (!BBYDSXBPB_TDZL1.val()) {
		BBYDSXBPB_TDZL1.val(C_BBYDSXSQB_TDZL1.val());
	};
	//-------------------3.16补办用地手续（分局）业务结束-------------------
	//分隔

	//土地供应：自建房转让流程，下拉框赋值
	$(document).ready(function () {
		$("select[name='HZ9180927227809801723176f2e213e5_TDYT']").change(function () {
			var flag = $("select[name='HZ9180927227809801723176f2e213e5_TDYT']").find("option:selected").text();
			$("input[name='HZ91809272278098017230d65fc20598_TDYT']").val(flag);
		});
	});





	////////////////////////////////////////////////
	// 自定义按钮调用方法事件
	// DevSpeed
	// 2020-06-13 18:18:49
	////////////////////////////////////////////////

	var workid = $('input[name="workId"]').val();

	var funDownload = function (content, filename) {
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		var blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	};

	$("a[data-operate=Assignmentontract]").unbind();
	$("a[data-operate=Assignmentontract]").off();
	$("a[data-operate=Assignmentontract]").click(function (event) {
		// 覆盖慧正原有点击事件
		event.stopPropagation();
		event.preventDefault();
		horizon.notice.loading('下载中,请稍等...');
		$.ajax({
			method: 'post',
			crossDomain: true,
			xhrFields: {
				withCredentials: false
			},
			url: 'http://192.168.0.230:10008/natureResource/exportXml/exportAssignmentContract?workid=' + workid,
			success: function (res) {
				if (res && res.code == '0') {
					var url = res.data
					$.ajax({
						url: url,
						beforeSend: function (request) {
							request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						},
						success: function (res) {
							horizon.notice.closeAll()
							funDownload(res.documentElement.outerHTML, url.substring(url.lastIndexOf("/") + 1, url.length));
						},
						error: function () {
							horizon.notice.closeAll()
							horizon.notice.open('下载失败')
						},
					});
				} else {
					horizon.notice.closeAll();
					horizon.notice.open('起始环节无法下载出让合同')
				};
			},
			error: function () {
				horizon.notice.closeAll()
				horizon.notice.open('下载失败')
			},
		});
	});
	$("a[data-operate=close]").on("click", function (event) {
		$.ajax({
			method: 'post',
			url: 'http://192.168.0.230:10008/natureResource/sjbp/deleteByWorkId?workid=' + workid,
		});
	});
	$("a[data-operate=planning]").unbind();
	$("a[data-operate=planning]").off();
	$("a[data-operate=planning]").click(function (event) {
		// 覆盖慧正原有点击事件
		event.stopPropagation();
		event.preventDefault();
		horizon.notice.loading('下载中,请稍等...');
		$.ajax({
			method: 'post',
			url: 'http://192.168.0.230:10008/natureResource/exportXml/exportPlanningDecision?workid=' + workid,
			crossDomain: true,
			xhrFields: {
				withCredentials: false
			},
			success: function (res) {
				if (res && res.code == '0') {
					var url = res.data
					$.ajax({
						url: url,
						processData: false,
						beforeSend: function (request) {
							request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						},
						success: function (res) {
							horizon.notice.closeAll()
							funDownload(res.documentElement.outerHTML, url.substring(url.lastIndexOf("/") + 1, url.length));
						},
						error: function () {
							horizon.notice.closeAll()
							horizon.notice.open('下载失败')
						},
					});
				} else {
					horizon.notice.closeAll(); l
					horizon.notice.open('起始环节无法下载规划决定书')
				};
			},
			error: function () {
				horizon.notice.closeAll()
				horizon.notice.open('下载失败')
			},
		});
	});

	var showsubmit = getQueryVariable('showsubmit');
	if (showsubmit != 1) {
		$('.nav.nav-pills.no-margin').find('li a').each(function () {
			var text = $(this).text().trim();
			if (text == '拿回' || text == '关闭') { } else {
				$(this).hide();
			};
		});
	};

	$('.nav.nav-pills.no-margin').find('li a').each(function () {
		var text = $(this).text().trim();
		if (text == '提交') {
			$(this).click(function () {
				setTimeout(function () {
					var _errorLength = $('[id$=-error]');
					if (_errorLength.length > 0) {
						horizon.notice.error({
							title: '表单填写不完整，请检查',
							text: ''
						});
						var _parent = _errorLength.eq(0).parents('.tab-pane');
						var parentName = _parent.attr('id');
						var tabAttr = $('[href=#' + parentName + ']');
						tabAttr.click();
					};
				}, 50);
			});
		};
	})

};



/**
 * 表单提交前执行
 */
horizon.impl_beforeSubmit = function () {
	console.log('impl_beforeSubmit');
};

/**
 * 表单提交后执行
 */
horizon.impl_afterSubmitSuccess = function () {
	console.log('impl_afterSubmitSuccess');
};
