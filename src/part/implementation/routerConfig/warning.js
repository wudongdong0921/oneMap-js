////////////////////////////////////////////////
// 监测评估预警路由配置
// 吴野
// 2020-11-23 13:10:30
////////////////////////////////////////////////

export default {
    // -----首页-----
    '/warning/home': {
      title: '监测评估预警首页',
      path: 'warning/home/home',
      api: ['warning.warning']
    },
    '/warning/home/war-dialog': {
      title: '监测值走势',
      path: 'warning/home/war-dialog/war-dialog',
      api: ['']
    },
    '/warning/controlBoundary': {
      title: '管控边界',
      path: 'warning/controlBoundary/controlBoundary',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/constraintIndex': {
      title: '约束指标',
      path: 'warning/constraintIndex/constraintIndex',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/expectedIndex': {
      title: '预期指标',
      path: 'warning/expectedIndex/expectedIndex',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/alertOverview': {
      title: '预警总览',
      path: 'warning/alertOverview/alertOverview',
      api: ['warning.warning']
    },
    '/warning/alertDetails': {
      title: '预警详情',
      path: 'warning/alertDetails/alertDetails',
      api: ['warning.warning']
    },
    '/warning/alertDetails/detail-dialog': {
      title: '预警详情dialog',
      path: 'warning/alertDetails/detail_dialog/detail_dialog',
      api: ['warning.warning']
    },
    '/warning/breachOfProtection': {
      title: '违反保护要求预警',
      path: 'warning/breachOfProtection/breachOfProtection',
      api: ['']
    },
    '/warning/boundary': {
      title: '边界突破预警',
      path: 'warning/boundary/boundary',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/constraint': {
      title: '约束突破预警',
      path: 'warning/constraint/constraint',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/evaluationOverview': {
      title: '评估总览',
      path: 'warning/evaluationOverview/evaluationOverview',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/indexEvaluation': {
      title: '指标评估',
      path: 'warning/indexEvaluation/indexEvaluation',
      api: ['warning.map', 'warning.warning']
    },
    '/warning/implementation': {
      title: '实施评估',
      path: 'warning/implementation/implementation',
      api: ['warning.warning']
    },
    '/warning/implementation/check-dialog': {
      title: '实施评估查看dialog',
      path: 'warning/implementation/check-or-update-dialog/check-dialog',
      api: ['warning.warning']
    },
    '/warning/implementation/update-dialog': {
      title: '实施评估编辑dialog',
      path: 'warning/implementation/check-or-update-dialog/update-dialog',
      api: ['warning.warning']
    },
    '/warning/implementation/create-dialog': {
      title: '实施评估生成报告dialog',
      path: 'warning/implementation/check-or-update-dialog/create-report-dialog',
      api: ['warning.warning']
    },
    '/warning/major': {
      title: '重大项目监测',
      path: 'warning/major/major',
      api: ['']
    }
  }