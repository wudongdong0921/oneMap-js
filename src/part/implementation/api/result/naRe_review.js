import request from '../../../../common/ajax';

var outputFileTree = function (data, success) {
    request.post({
        url: '/achievementQuality/getAttachmentTree',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        }
    });
};
var getAchievementInfo = function (id, success) {
  request.post({
      url: '/achievementQuality/getAchievementInfo',
      devUrl: 'implementService',
      query: id,
      success: function (res) {
          success(res);
      }
  });
}

var getReviewListTree = function (id, success) {
  request.post({
      url: '/resultsReview/getReviewListTree',
      devUrl: 'implementService',
      query: id,
      success: function (res) {
          success(res);
      }
  });
}

var resultsReview = function (id, success) {
  request.post({
      url: '/resultsReview/getRrListByCgid',
      devUrl: 'implementService',
      query: id,
      success: function (res) {
          success(res);
      }
  });
}

var updateResultsRilist = function (data, success) {
  request.post({
      url: '/resultsReview/updateResultsRilist',
      devUrl: 'implementService',
      data,
      success: function (res) {
          success(res);
      }
  });
}

var getAttachmentsByUser = function (data, success) {
  request.post({
      url: '/resultsReview/getAttachmentsByUser',
      devUrl: 'implementService',
      query: data,
      success: function (res) {
          success(res);
      }
  });
}



var getToDoList = function (data, success) {
  request.post({
      url: '/resultsReview/getToDoList',
      devUrl: 'implementService',
      query: data,
      success: function (res) {
          success(res);
      }
  });
}

var getDoneList = function (data, success) {
    request.post({
        url: '/resultsReview/getDoneList',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        }
    });
  }



var getReviewInquiryList = function (data, success) {
  request.post({
      url: '/resultsReview/getReviewInquiryList',
      devUrl: 'implementService',
      query: data,
      success: function (res) {
          success(res);
      }
  });
}

var getPlanResultType = function (data, success) {
    request.post({
        url: '/renren-admin/rramsPlanResultType/getPlanResultType',
        token: 'renren',
        devUrl: 'renrenService',
        query: {},
        success: function (res) {
            success(res);
        }
    });
};

var getAttachmentTree = function (data, success) {
    request.post({
        url: '/resultsReview/getAttachmentTree',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        }
    });
};

var createNewReview = function(data,success) {
    request.post({
        url: '/resultsReview/createNewReview',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        }
    });
}

var examination = function(data,success) {
    console.log(data);
    request.post({
        url: '/wintopachieve/examination',
        devUrl: 'commonServiceSF',
        data: data,
        success: function (res) {
            console.log(res);
            success(res);
        }
    });
}

var saveSignState = function(data,success) {
    request.post({
        url: '/resultsReview/saveSignState',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res);
        }
    });
}

var getButtonType = function (data, success) {
    request.post({
        url: '/wintoppublicinterfaceGW/workflow/openToButton',
        data: {
            accessToken: data.accessToken,
            workId: data.workid,
            trackId: data.trackid,
        },
        devUrl: 'commonService',
        success: function (res) {
            if (res.code == '200') {
                success(res.data);
            };
        },
    });
}

var updateReviewState = function (data, success) {
    request.post({
        url: '/resultsReview/updateReviewState',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res.data);
        }
    });
}
var deleteByid = function (data, success) {
    request.post({
        url: '/resultsReview/deleteById',
        devUrl: 'implementService',
        query: data,
        success: function (res) {
            success(res.data);
        }
    });
}


export default {
  outputFileTree,   //成果文件树
  getAchievementInfo,//查看质检成果信息表详情
  getReviewListTree,//审查要点
  resultsReview,//系统审查检测查看功能_Achievements_Speed_Examination_009
  updateResultsRilist, //批量保存审查状态
  getAttachmentsByUser, //我提交的
  getReviewInquiryList, //审查查询
  getToDoList, //待办已办
  getPlanResultType, //下拉字典
  getAttachmentTree, //新建审查获取下拉数据
  createNewReview, //新建审查
  getDoneList, //已办
  examination, //开始检测
  saveSignState, //审查要点选择
  getButtonType, // 获取流程按钮权限状态
  updateReviewState, // 更新系统辅助审查状态
  deleteByid//删除
}
