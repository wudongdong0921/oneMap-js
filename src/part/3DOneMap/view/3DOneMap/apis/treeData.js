
var MapIndex = 0
var FolderIndex = 0

var data = [
    // {
    //     name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
    //     children: [
    //         {
    //             name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
    //             children: [
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //                 { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //             ]
    //         },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //     ]
    // },
    // { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    // { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    // {
    //     name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
    //     children: [
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //     ]
    // },
    // { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    // { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    // {
    //     name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
    //     children: [
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //         { name: 'MapText' + MapIndex++ + '', mapId: icu.util.uuid(), type: '3DMap', mapType: '' },
    //     ]
    // }, {
    //     name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
    //     children: []
    // },
    // { name: '2D 地图测试(影像地图)', mapId: icu.util.uuid(), type: '3DMap', mapType: '', url: 'http://192.168.0.38:8090/iserver/services/map-CSGH-2/rest/maps/%E5%9F%8E%E9%95%87%E5%BC%80%E5%8F%91%E8%BE%B9%E7%95%8C_%E7%BB%8F%E7%BA%AC%E5%BA%A6' },
    { name: '3D S3M图层(OSGB 地图)', mapId: icu.util.uuid(), type: '3DMap', mapType: 'S3MB', url: 'http://192.168.0.38:8090/iserver/services/3D-BaiShanShiJiangYuanQu/rest/realspace/datas/Config_5' },
    // { name: '3D 地形图层(DEM 地图)', mapId: icu.util.uuid(), type: '3DMap', mapType: 'DEM', url: 'http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace/datas/srtm_54_07@zhufeng' },
    // { name: '3D 测试地形', mapId: icu.util.uuid(), type: '3DMap', mapType: 'DEM', url: 'http://192.168.0.38:8090/iserver/services/3D-90DEM/rest/realspace/datas/DEM90@DEM90_Terrain' },
    { name: '3D DEM', mapId: icu.util.uuid(), type: '3DMap', mapType: 'DEM', url: 'http://192.168.0.38:8090/iserver/services/3D-local3DCache-DEM90DEM90/rest/realspace/datas/DEM90@DEM90' },
    { name: '2D 测试影像', mapId: icu.util.uuid(), type: '3DMap', mapType: '', url: ' http://192.168.0.62:8090/iserver/services/map-DT/rest/maps/%E5%BD%B1%E5%83%8F%E5%BA%95%E5%9B%BE_%E7%BB%8F%E7%BA%AC%E5%BA%A6' },
    
];

export default data;