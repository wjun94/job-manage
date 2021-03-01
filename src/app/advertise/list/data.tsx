import * as React from 'react';
export const adColumns = [
    {
        title: '广告名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '开始时间',
        dataIndex: 'createAt',
        key: 'createAt',
    },
    {
        title: '播放天数',
        dataIndex: 'days',
        key: 'days',
    }, {
        title: '播放位置',
        dataIndex: 'pos',
        key: 'pos',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '剩余时间',
        dataIndex: 'endAt',
        key: 'endAt',
    }, {
        title: '操作',
        dataIndex: 'operating',
        key: 'operating',
        render: () => <p><span>刷新</span></p>
    }
];

export const noAdColumns = [
    {
        title: '广告名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '开始时间',
        dataIndex: 'createAt',
        key: 'createAt',
    },
    {
        title: '播放天数',
        dataIndex: 'day',
        key: 'day',
    }, {
        title: '播放位置',
        dataIndex: 'pos',
        key: 'pos',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '剩余时间',
        dataIndex: 'endAt',
        key: 'endAt',
    }
];
