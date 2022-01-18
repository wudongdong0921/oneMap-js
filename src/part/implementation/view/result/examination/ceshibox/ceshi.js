import renderView from "../../../../commont/renderView";
// import _tree from '../../../viewComponent/treeModal/treeModal'
export default {
    render: function () {
        var _tree = renderView(this.$el.find('.ceshitree'), "/viewComponent/treeModal/treeModal",{
            options: {
              readonly: this.$query.readonly === 'false'? false : true,//true时为只读
              reviewState: this.$query.reviewState,
              icon: this.$query.icon === 'false'? false : true
            }
          });
        //var tree = new _tree();
        setTimeout(() => {
             var data = [{"reviewList":[{"examineContent":"新增生态修复面积不小于上级下达指标。","cgscxmId":"b5762a269ee9446d8a1ab29522c3388b","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"城乡建设用地规模是否不大于上级下达指标。","cgscxmId":"b0a60eb51642411cb20f966ad84fae81","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"国土开发强度不大于上级下达指标。","cgscxmId":"fb98bcc33ba44e6fa68ad5f934828b93","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"自然岸线保有率不小于上级下达指标。","cgscxmId":"86706625d4c741ee9fcccc730c0859a3","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"湿地面积不小于上级下达指标。","cgscxmId":"953c765334b9487fa81e7597d59c782e","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"基本草原面积不小于上级下达指标。","cgscxmId":"826497b9d17945c3aedbb16785759f58","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"林地保有量不小于上级下达指标。","cgscxmId":"d73ac1fb933a4b9eaa673d63661d87c8","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"用水总量不超过上级下达指标。","cgscxmId":"2c648f5178204cfd82c0bf4c09a3b26f","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"永久基本农田保护面积是否不小于上级下达指标。","cgscxmId":"52d40226288d4007b2708cc0770689a9","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"耕地保有量是否不小于上级下达指标。","cgscxmId":"3180d38009014db48736b378b6fdfc3e","examinProject":"上级规划划指标一致性","reviewState":"0"},{"examineContent":"生态保护红线面积是否不小于上级下达指标。","cgscxmId":"42b7c940a2a842d4b4c364b357421664","examinProject":"上级规划划指标一致性","reviewState":"0"}],"cgsclbId":"7664154523f84dc2b53b5afac68ca5bf","reviewCategory":"指标符合性"},{"reviewList":[{"examineContent":"永久基本农田范围与上级下达的空间布局是否一致","cgscxmId":"2f9d59eddfba42229d090ca279ba6f0d","examinProject":"规划布局","reviewState":"0"},{"examineContent":"城镇开发边界与上级下达的空间布局是否一致","cgscxmId":"0ae3c46b861342e3a9dd42b276ac6cee","examinProject":"规划布局","reviewState":"0"},{"examineContent":"生态保护红线范围与上级下达的空间布局是否一致","cgscxmId":"74ef7fcc55cf4fb989f81b0dcb2c14f8","examinProject":"规划布局","reviewState":"0"}],"cgsclbId":"e41b38ee9bfa4adaa94c680808fe5f1f","reviewCategory":"空间布局符合性"},{"reviewList":[{"examineContent":"国土用途规划分类图层中耕地统计结果不小于规划指标表中耕地保有量指标。","cgscxmId":"725ab11c44c3433abd50bb0e44a72780","examinProject":"空间数据与非空间数据一致性","reviewState":"0"},{"examineContent":"城镇开发边界图层统计结果不大于规划指标表中城镇空间指标。","cgscxmId":"66893c39214f4415bfdb7b8dd7f7f7bc","examinProject":"空间数据与非空间数据一致性","reviewState":"0"},{"examineContent":"永久基本农田图层统计结果不小于规划指标表中基本农田保护面积指标。","cgscxmId":"5fcb29ec37cc4b1baf7dbb3bb92e437a","examinProject":"空间数据与非空间数据一致性","reviewState":"0"},{"examineContent":"生态保护红线图层统计结果不小于规划指标表中生态保护红线面积指标。","cgscxmId":"5117fb3c39c4483ba26698dc59310617","examinProject":"空间数据与非空间数据一致性","reviewState":"0"}],"cgsclbId":"71c8de5e994a4ea59aa415a9053fd969","reviewCategory":"图数一致性"},{"reviewList":[{"examineContent":"规划必备图件之间所表达规划要素是否一致。","cgscxmId":"48d619463de84751843a3f87522fb9b9","examinProject":"规划成果间一致性","reviewState":"0"},{"examineContent":"规划文本与规划表格中主要控制指标是否一致。 容差 1 公顷。","cgscxmId":"e6e939aaf7254202af427bebbbd6ad35","examinProject":"规划成果间一致性","reviewState":"0"}],"cgsclbId":"28bc0e20c80a40439e100d37e98fbeb9","reviewCategory":"图文一致性"}]
            _tree.setdata(data);
        }, 100);
       
    },
    destroy: function () { },
}