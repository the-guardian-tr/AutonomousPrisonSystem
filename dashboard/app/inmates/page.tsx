"use client";

import DashboardShell from '@/components/DashboardShell';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag, Space, Button, Avatar } from 'antd';
import { UserOutlined, FileSearchOutlined, AlertOutlined } from '@ant-design/icons';

const inmatesData = [
    { key: '1', id: 'MK-9921', name: 'Alparslan Çelik', status: 'TECRİT', risk: 'KRİTİK', block: 'A-1', crime: 'Vatana İhanet', entryDate: '2024-01-15' },
    { key: '2', id: 'MK-9922', name: 'Buse Yılmaz', status: 'KOĞUŞ', risk: 'YÜKSEK', block: 'B-2', crime: 'Siber Casusluk', entryDate: '2024-02-20' },
    { key: '3', id: 'MK-9923', name: 'Cemal Demir', status: 'SORGODA', risk: 'AŞIRI', block: 'S-1', crime: 'Terör Örgütü Lideri', entryDate: '2024-03-10' },
    { key: '4', id: 'MK-9924', name: 'Davut Kaya', status: 'REVİR', risk: 'ORTA', block: 'M-1', crime: 'Mühimmat Kaçakçılığı', entryDate: '2023-11-05' },
    { key: '5', id: 'MK-9925', name: 'Emre Can', status: 'KOĞUŞ', risk: 'DÜŞÜK', block: 'A-3', crime: 'Emre İtaatsizlik', entryDate: '2023-12-01' },
];

const columns = [
    {
        title: 'MAHKUM',
        dataIndex: 'name',
        render: (dom, entity) => (
            <Space>
                <Avatar shape="square" size="large" icon={<UserOutlined />} style={{ backgroundColor: '#1f1f1f', border: '1px solid #303030' }} />
                <div>
                    <div style={{ fontWeight: 'bold', color: '#d9d9d9' }}>{dom}</div>
                    <div style={{ fontSize: 10, color: '#595959' }}>{entity.id}</div>
                </div>
            </Space>
        ),
    },
    {
        title: 'STATÜ',
        dataIndex: 'status',
        render: (_, record) => (
            <Tag color={record.status === 'TECRİT' ? '#8c1616' : record.status === 'SORGODA' ? '#faad14' : '#135200'}>
                {record.status}
            </Tag>
        ),
    },
    {
        title: 'RİSK SEVİYESİ',
        dataIndex: 'risk',
        render: (_, record) => (
            <Space>
                {record.risk === 'KRİTİK' && <AlertOutlined style={{ color: '#f5222d' }} />}
                <span style={{ color: record.risk === 'KRİTİK' ? '#f5222d' : record.risk === 'YÜKSEK' ? '#faad14' : '#52c41a' }}>{record.risk}</span>
            </Space>
        ),
    },
    {
        title: 'HÜCRE BLOK',
        dataIndex: 'block',
        render: (dom) => <span style={{ color: '#a6a6a6', fontFamily: 'monospace' }}>[{dom}]</span>
    },
    {
        title: 'SUÇ',
        dataIndex: 'crime',
    },
    {
        title: 'GİRİŞ TARİHİ',
        dataIndex: 'entryDate',
        valueType: 'date',
    },
    {
        title: 'İŞLEMLER',
        valueType: 'option',
        render: () => [
            <Button key="view" type="text" icon={<FileSearchOutlined />} style={{ color: '#1890ff' }}>Görüntüle</Button>
        ],
    },
];

export default function InmatesPage() {
    return (
        <DashboardShell>
            <PageContainer title="MAHKUM KÜTÜĞÜ VE SİCİL TARAMA">
                <ProTable
                    columns={columns}
                    dataSource={inmatesData}
                    rowKey="key"
                    search={{
                        labelWidth: 'auto',
                        filterType: 'light',
                    }}
                    options={{
                        setting: false,
                        density: false,
                    }}
                    pagination={{
                        pageSize: 10,
                    }}
                    headerTitle={<span style={{ color: '#d9d9d9' }}>KAYITLI MAHKUM LİSTESİ</span>}
                    tableStyle={{ border: '1px solid #303030' }}
                    cardProps={{ bodyStyle: { padding: 0 }, style: { background: '#141414', border: '1px solid #303030' } }}
                />
            </PageContainer>
        </DashboardShell>
    );
}
