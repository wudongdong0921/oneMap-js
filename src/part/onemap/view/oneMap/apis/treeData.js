
var MapIndex = 0
var FolderIndex = 0

var data = [
    {
        name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
        children: [
            {
                name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
                children: [
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
                ]
            },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
        ]
    },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
    {
        name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
        children: [
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
        ]
    },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
    {
        name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
        children: [
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
            { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
        ]
    }, {
        name: 'FolderText' + FolderIndex++ + '', id: icu.util.uuid(), type: 'folder',
        children: []
    },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
    { name: 'MapText' + MapIndex++ + '', id: icu.util.uuid(), type: 'map' },
];

export default data;