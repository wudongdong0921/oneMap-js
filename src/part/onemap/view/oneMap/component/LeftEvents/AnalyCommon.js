////////////////////////////////////////////////
// 分析模板
// 吴东东
// 2021-02-04 08:48:06
////////////////////////////////////////////////
import subMenu from '../LeftBar/subMenu'
import ToolPopup from './../ToolPopup/popup'
import AnalysisProgress from './../LeftEvents/AnalysisProgress'
import Progress from './../LeftEvents/progress'
import Year from './../year'
import YearSelect from './../yearSelect'
import api from './../../apis/map'
import apiEd from './../../apis/mapEd'
import apiSd from './../../apis/mapSd'
var apiObj = {
	api: api,
	apiEd: apiEd,
	apiSd: apiSd,
}
//分析进度表头
const progressData = {
	columns: [
		{
			title: '名称',
			dataIndex: 'analysisTaskName',
		},
		{
			title: '状态',
			dataIndex: 'executingStateCN',
		},
	],
}

var AnalyCommon = function (_Analyse) {
	this._Analyse = _Analyse
	this.rwid = ''
	this.progressDom()
	this.yearDom()
}
AnalyCommon.prototype.yearDom = function () {
	var _ToolPopupYear = new ToolPopup()
	var date = new Date()
	var yearDefault = date.getFullYear()
	var _Year = new Year(yearDefault)

	_ToolPopupYear.handleShow({
		title: '分析条件设置',
		mask: false,
		width: '300px',
		left: '50%',
		top: '50%',
		height: '400px',
		content: 'content',
		//transform: 'translate(-50%,-50%)',
	})
	_ToolPopupYear.html.find('.layout-dialog-body').append(_Year.yearHtml)
	_ToolPopupYear.html.appendTo($('body'))

	var _YearSelect = new icu.SelectDataStatic({
		el: '#demoYear',
		type: 'year',
		showBottom: false,
		theme: '#188ae2',
	})

	this._ToolPopupYear = _ToolPopupYear
	this._YearSelect = _YearSelect

	this._Year = _Year
}
AnalyCommon.prototype.progressDom = function () {
	var progress = new Progress()
	var _ToolPopup = new ToolPopup()
	var _AnalysisProgress = new AnalysisProgress(_ToolPopup)
	_ToolPopup.handleShow({
		title: '分析控制台',
		mask: true,
		icon: true,
		width: '500px',
		left: '50%',
		top: '50%',
		height: '400px',
		content: 'content',
		//transform: 'translate(-50%,-50%)',
	})
	_ToolPopup.html.find('.layout-dialog-body').append(_AnalysisProgress.html)
	_ToolPopup.html.appendTo($('body'))
	this._AnalysisProgress = _AnalysisProgress
	this._ToolPopup = _ToolPopup
	this.progress = progress
}
AnalyCommon.prototype.handleClickAnalyse = function (obj, parent) {
	this.api = apiObj[obj.api]
	this.parent = parent
	this.data = obj.data
	this.obj = obj
	var _YearSelect = this._YearSelect
	var _Year = this._Year
	var _ToolPopupYear = this._ToolPopupYear
	var _ToolPopup = this._ToolPopup
	var _AnalysisProgress = this._AnalysisProgress
	var list = this.getMapGeojsons ? this.getMapGeojsons.geometry : []
	var geoObj = ''
    var epsgCode = this.epsgCode
	var arr = []
	//可优化
	if (this.typeFlag === 1) {
		geoObj = [JSON.stringify(list.coordinates)]
	} else if (this.typeFlag === 2) {
		geoObj = [JSON.stringify(list)]
	} else if (this.typeFlag === 3) {
		for (let i = 0; i < list.coordinates.length; i++) {
			var item = list.coordinates[i]
			arr.push(JSON.stringify(item))
		}
		geoObj = arr
	} else {
		geoObj = this.getMapGeojsons
	}
	if (this.getMapGeojsons || this.obj.type === '2') {
		// _ToolPopup.html.show()
		var param = {
			ywfxId: obj.data.analyzeBusinessId,
			year: '',
			type: obj.type,
			xzqh: obj.xzqh,
            epsgCode: epsgCode,
			// geojson: {
			//     type: 'Polygon',
			//     coordinates: this.parent.getMapGeojsons.geometry.coordinates
			// }
			geojson: geoObj, //this.parent.typeFlag === 1 ? [JSON.stringify(this.parent.getMapGeojsons.geometry.coordinates)] : [JSON.stringify(this.parent.getMapGeojsons.geometry)]
		}
		if (obj.data.isTimeIndex === '0') {
			_YearSelect.on('onChange', function (val) {
				_Year.yearHtml.find('input').val(val)
			})
			_ToolPopupYear.html.show()
			_Year.handleSubmit(() => {
				var val = _Year.yearHtml.find('input').val()
				param.year = val
				this.year = val
				this.abotr = this.api.createMapStatus(param, (res) => {
					if (!config.gpService) {
						// this.api.executeTaskJava();
					} else {
						this.api.executeImplementSupervision()
					}
					var result = res.data
					param.rwbmIds = result
					this.rwid = result
					this.gpServiceCumcon({
						callback: () => {
							_ToolPopupYear.html.hide()
							_ToolPopup.html.show()
							_AnalysisProgress.openTiming()
							this.LookAnalyse(result)
						},
					})
					_AnalysisProgress.handleStopStatus(() => {
						this.stopStatus(res.data)
					})
				})
			})
			_Year.handleClose(() => {
				_ToolPopupYear.html.hide()
			})
		} else {
			param.year = ''
			this.year = ''
			this.abotr = this.api.createMapStatus(param, (res) => {
				if (!config.gpService) {
					// this.api.executeTaskJava();
				} else {
					this.api.executeImplementSupervision()
				}
				var result = res.data
				param.rwbmIds = result
				this.rwid = result
				this.gpServiceCumcon({
					callback: () => {
						_ToolPopup.html.show()
						_AnalysisProgress.openTiming()
						this.LookAnalyse(result)
					},
				})
				_AnalysisProgress.handleStopStatus(() => {
					this.stopStatus(res.data)
				})
			})
		}
	} else {
		layer.msg('无数据,请绘制图形')
	}
}
AnalyCommon.prototype.gpServiceCumcon = function (obj) {
	if (!config.gpService) {
		this.abotr = this.api.executeTaskJava(null, (res) => {
			obj.callback()
		})
		return false
	}
	obj.callback()
}
AnalyCommon.prototype.stopStatus = function (data) {
	clearInterval(this.timer)
	this.abotr.abort()
	this.api.closeAnalysStatus(data, (res) => {
		console.log(res)
	})
}
AnalyCommon.prototype.LookAnalyse = function (arrIdList) {
	clearInterval(this.timer)
	//查询任务状态
	if (arrIdList.length == 0) {
		return false
	}
	this.timer = setInterval(() => {
		var count = 0
		var on = false
		var progress_ele = null
		this.abotr = this.api.checkTaskStatus(arrIdList, (res) => {
			if (res.code != 200) {
				progress_ele.remove()
				this.progressVisible = false
				clearInterval(this.timer)
			}
			var param = {
				columns: progressData.columns,
				dataSorce: res.data,
			}
			progress_ele = this.progress.render(param, this.timer)
			this.progressData = res.data
			var len = res.data.length
			var date = new Date()
			res.data[0].timer = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
			this._AnalysisProgress.setAnalysisResult(
				res.data[0],
				count,
				len,
				this.timer,
				progress_ele
			)
			for (let i = 0; i < len; i++) {
				var date = new Date()
				res.data[
					i
				].timer = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

				if (
					res.data[i].executingState == 7 ||
					res.data[i].executingState == 8 ||
					res.data[i].executingState == -1
				) {
					count++
				}
				//_AnalysisProgress.setAnalysisResult(res.data[i],count,len,this.timer)
			}
			if (len == count) {
				on = true
			}
			if (on) {
				progress_ele.remove()
				this.progressVisible = false
				clearInterval(this.timer)
				this.api.getDistributeAnalysis(
					this.data.analyzeBusinessId,
					this.year,
					this.obj.type,
					arrIdList,
					(res) => {
						this._AnalysisProgress.closeProgress()
						this._Analyse.show(
							res.data,
							this.parent,
							arrIdList,
							this.obj
						)
					}
				)
			}
		})
	}, 2000)
}

AnalyCommon.prototype.getMapGeojson = function (obj) {
    const {data,type,_Analyse,flagType,epsgCode} = obj
	this.getMapGeojsons = data
	this.typeFlag = type
	this._Analyse = _Analyse
	this.flagType = flagType
    this.epsgCode = epsgCode
}
AnalyCommon.prototype.getCheckList = function () {}
AnalyCommon.prototype.render = function () {}
export default AnalyCommon
