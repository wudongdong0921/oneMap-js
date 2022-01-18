function map(option,el,max){
  if(option.title){
      option =  {
          tooltip : {
              trigger: 'item'
          },
          dataRange: {
              min: 0,
              max,
              text:['高','低'],
              bottom: 50,
              left: 20
          },
          geo: {
              itemStyle: {
                  normal: {
                      areaColor: 'rgb(76, 158, 255)'
                  }
              }
          },
          series : [
              {
                  name: '90分以上',
                  type: 'map',
                  mapType: 'china',
                  roam: true,
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '重庆',value: Math.round(Math.random()*1000)},
                      {name: '河北',value: Math.round(Math.random()*1000)},
                      {name: '河南',value: Math.round(Math.random()*1000)},
                      {name: '云南',value: Math.round(Math.random()*1000)},
                      {name: '辽宁',value: Math.round(Math.random()*1000)},
                      {name: '黑龙江',value: Math.round(Math.random()*1000)},
                      {name: '湖南',value: Math.round(Math.random()*1000)},
                      {name: '安徽',value: Math.round(Math.random()*1000)},
                      {name: '山东',value: Math.round(Math.random()*1000)},
                      {name: '新疆',value: Math.round(Math.random()*1000)},
                      {name: '江苏',value: Math.round(Math.random()*1000)},
                      {name: '浙江',value: Math.round(Math.random()*1000)},
                      {name: '江西',value: Math.round(Math.random()*1000)},
                      {name: '湖北',value: Math.round(Math.random()*1000)},
                      {name: '广西',value: Math.round(Math.random()*1000)},
                      {name: '甘肃',value: Math.round(Math.random()*1000)},
                      {name: '山西',value: Math.round(Math.random()*1000)},
                      {name: '内蒙古',value: Math.round(Math.random()*1000)},
                      {name: '陕西',value: Math.round(Math.random()*1000)},
                      {name: '吉林',value: Math.round(Math.random()*1000)},
                      {name: '福建',value: Math.round(Math.random()*1000)},
                      {name: '贵州',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '青海',value: Math.round(Math.random()*1000)},
                      {name: '西藏',value: Math.round(Math.random()*1000)},
                      {name: '四川',value: Math.round(Math.random()*1000)},
                      {name: '宁夏',value: Math.round(Math.random()*1000)},
                      {name: '海南',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ]
              },
              {
                  name: '60-80分',
                  type: 'map',
                  mapType: 'china',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '重庆',value: Math.round(Math.random()*1000)},
                      {name: '河北',value: Math.round(Math.random()*1000)},
                      {name: '河南',value: Math.round(Math.random()*1000)},
                      {name: '云南',value: Math.round(Math.random()*1000)},
                      {name: '辽宁',value: Math.round(Math.random()*1000)},
                      {name: '黑龙江',value: Math.round(Math.random()*1000)},
                      {name: '湖南',value: Math.round(Math.random()*1000)},
                      {name: '安徽',value: Math.round(Math.random()*1000)},
                      {name: '山东',value: Math.round(Math.random()*1000)},
                      {name: '新疆',value: Math.round(Math.random()*1000)},
                      {name: '江苏',value: Math.round(Math.random()*1000)},
                      {name: '浙江',value: Math.round(Math.random()*1000)},
                      {name: '江西',value: Math.round(Math.random()*1000)},
                      {name: '湖北',value: Math.round(Math.random()*1000)},
                      {name: '广西',value: Math.round(Math.random()*1000)},
                      {name: '甘肃',value: Math.round(Math.random()*1000)},
                      {name: '山西',value: Math.round(Math.random()*1000)},
                      {name: '内蒙古',value: Math.round(Math.random()*1000)},
                      {name: '陕西',value: Math.round(Math.random()*1000)},
                      {name: '吉林',value: Math.round(Math.random()*1000)},
                      {name: '福建',value: Math.round(Math.random()*1000)},
                      {name: '贵州',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '青海',value: Math.round(Math.random()*1000)},
                      {name: '西藏',value: Math.round(Math.random()*1000)},
                      {name: '四川',value: Math.round(Math.random()*1000)},
                      {name: '宁夏',value: Math.round(Math.random()*1000)},
                      {name: '海南',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ],
                  itemStyle: {
                      normal: {
                          areaColor: 'rgb(76, 158, 255)'
                      }
                  }
              },
              {
                  name: '60分以下',
                  type: 'map',
                  mapType: 'china',
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ],
                  itemStyle: {
                      normal: {
                          color: "yellow" //颜色
                      },
                      emphasis: {
                          borderColor: "#fff",
                          borderWidth: 1
                      }
                  },
              }
          ]
      }
  }else{
      option = {
          tooltip : {
              trigger: 'item'
          },
          legend: {
              orient: 'vertical',
              right: '50',
              bottom: '100',
              data:['超载','可载','临界超载']
          },
          dataRange: {
              min: 0,
              max,
              text:['高','低'],
              bottom: 50,
              left: 20
          },
          geo: {
              itemStyle: {
                  normal: {
                      areaColor: 'rgb(76, 158, 255)'
                  }
              }
          },
          series : [
              {
                  name: '临界超载',
                  type: 'map',
                  mapType: 'china',
                  roam: true,
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '重庆',value: Math.round(Math.random()*1000)},
                      {name: '河北',value: Math.round(Math.random()*1000)},
                      {name: '河南',value: Math.round(Math.random()*1000)},
                      {name: '云南',value: Math.round(Math.random()*1000)},
                      {name: '辽宁',value: Math.round(Math.random()*1000)},
                      {name: '黑龙江',value: Math.round(Math.random()*1000)},
                      {name: '湖南',value: Math.round(Math.random()*1000)},
                      {name: '安徽',value: Math.round(Math.random()*1000)},
                      {name: '山东',value: Math.round(Math.random()*1000)},
                      {name: '新疆',value: Math.round(Math.random()*1000)},
                      {name: '江苏',value: Math.round(Math.random()*1000)},
                      {name: '浙江',value: Math.round(Math.random()*1000)},
                      {name: '江西',value: Math.round(Math.random()*1000)},
                      {name: '湖北',value: Math.round(Math.random()*1000)},
                      {name: '广西',value: Math.round(Math.random()*1000)},
                      {name: '甘肃',value: Math.round(Math.random()*1000)},
                      {name: '山西',value: Math.round(Math.random()*1000)},
                      {name: '内蒙古',value: Math.round(Math.random()*1000)},
                      {name: '陕西',value: Math.round(Math.random()*1000)},
                      {name: '吉林',value: Math.round(Math.random()*1000)},
                      {name: '福建',value: Math.round(Math.random()*1000)},
                      {name: '贵州',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '青海',value: Math.round(Math.random()*1000)},
                      {name: '西藏',value: Math.round(Math.random()*1000)},
                      {name: '四川',value: Math.round(Math.random()*1000)},
                      {name: '宁夏',value: Math.round(Math.random()*1000)},
                      {name: '海南',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ]
              },
              {
                  name: '超载',
                  type: 'map',
                  mapType: 'china',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '重庆',value: Math.round(Math.random()*1000)},
                      {name: '河北',value: Math.round(Math.random()*1000)},
                      {name: '河南',value: Math.round(Math.random()*1000)},
                      {name: '云南',value: Math.round(Math.random()*1000)},
                      {name: '辽宁',value: Math.round(Math.random()*1000)},
                      {name: '黑龙江',value: Math.round(Math.random()*1000)},
                      {name: '湖南',value: Math.round(Math.random()*1000)},
                      {name: '安徽',value: Math.round(Math.random()*1000)},
                      {name: '山东',value: Math.round(Math.random()*1000)},
                      {name: '新疆',value: Math.round(Math.random()*1000)},
                      {name: '江苏',value: Math.round(Math.random()*1000)},
                      {name: '浙江',value: Math.round(Math.random()*1000)},
                      {name: '江西',value: Math.round(Math.random()*1000)},
                      {name: '湖北',value: Math.round(Math.random()*1000)},
                      {name: '广西',value: Math.round(Math.random()*1000)},
                      {name: '甘肃',value: Math.round(Math.random()*1000)},
                      {name: '山西',value: Math.round(Math.random()*1000)},
                      {name: '内蒙古',value: Math.round(Math.random()*1000)},
                      {name: '陕西',value: Math.round(Math.random()*1000)},
                      {name: '吉林',value: Math.round(Math.random()*1000)},
                      {name: '福建',value: Math.round(Math.random()*1000)},
                      {name: '贵州',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '青海',value: Math.round(Math.random()*1000)},
                      {name: '西藏',value: Math.round(Math.random()*1000)},
                      {name: '四川',value: Math.round(Math.random()*1000)},
                      {name: '宁夏',value: Math.round(Math.random()*1000)},
                      {name: '海南',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ],
                  itemStyle: {
                      normal: {
                          areaColor: 'rgb(76, 158, 255)'
                      }
                  }
              },
              {
                  name: '可载',
                  type: 'map',
                  mapType: 'china',
                  data:[
                      {name: '北京',value: Math.round(Math.random()*1000)},
                      {name: '天津',value: Math.round(Math.random()*1000)},
                      {name: '上海',value: Math.round(Math.random()*1000)},
                      {name: '广东',value: Math.round(Math.random()*1000)},
                      {name: '台湾',value: Math.round(Math.random()*1000)},
                      {name: '香港',value: Math.round(Math.random()*1000)},
                      {name: '澳门',value: Math.round(Math.random()*1000)}
                  ],
                  itemStyle: {
                      normal: {
                          color: "yellow" //颜色
                      },
                      emphasis: {
                          borderColor: "#fff",
                          borderWidth: 1
                      }
                  },
              }
          ]
      };
  }
  let echc = echarts.init(el);
  echc.setOption(option);
}

export default map