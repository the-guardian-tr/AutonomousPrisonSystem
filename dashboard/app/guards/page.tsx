"use client";

import DashboardShell from '@/components/DashboardShell';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Tag, Avatar, Badge } from 'antd';
import { Shield, UserOutlined } from '@ant-design/icons';

const guardsData = [
    { id: 'GRD-001', name: 'Yüzbaşı Veli Kaya', rank: 'TİM KOMUTANI', shift: '08:00 - 20:00', status: 'GÖREVDE', unit: 'ALPHA TEAM' },
    { id: 'GRD-002', name: 'Asb. Caner Erkin', rank: 'KIDEMLİ', shift: '08:00 - 20:00', status: 'DEVRIYE', unit: 'ALPHA TEAM' },
    { id: 'GRD-005', name: 'Uzm. Çvş. Mehmet Öztürk', rank: 'MUHAFIZ', shift: '08:00 - 20:00', status: 'KAPI KONTROL', unit: 'ALPHA TEAM' },
    { id: 'GRD-012', name: 'Onb. Ali Vural', rank: 'ER', shift: '20:00 - 08:00', status: 'İSTİRAHAT', unit: 'BRAVO TEAM' },
    { id: 'GRD-015', name: 'Onb. Hasan Şaş', rank: 'ER', shift: '20:00 - 08:00', status: 'İSTİRAHAT', unit: 'BRAVO TEAM' },
];

export default function GuardsPage() {
    return (
        <DashboardShell>
            <PageContainer title="VARDİYA TİMİ VE PERSONEL DURUMU">
                <ProList
                    rowKey="name"
                    headerTitle={<span style={{ color: '#d9d9d9' }}>AKTİF PERSONEL LİSTESİ</span>}
                    dataSource={guardsData}
                    showActions="hover"
                    metas={{
                        title: {
                            dataIndex: 'name',
                            render: (text) => <span style={{ color: '#d9d9d9', fontWeight: 'bold' }}>{text}</span>
                        },
                        avatar: {
                            dataIndex: 'id',
                            render: () => <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#52c41a' }} />
                        },
                        description: {
                            dataIndex: 'rank',
                            render: (text, row) => (
                                <span style={{ color: '#8c8c8c' }}>{text} - <span style={{ fontFamily: 'monospace' }}>{row.id}</span></span>
                            )
                        },
                        subTitle: {
                            dataIndex: 'unit',
                            render: (text) => <Tag color="blue">{text}</Tag>
                        },
                        actions: {
                            render: (text, row) => [
                                <Badge status={row.status === 'İSTİRAHAT' ? 'default' : 'processing'} text={row.status} style={{ color: row.status === 'İSTİRAHAT' ? '#595959' : '#52c41a' }} key="status" />
                            ],
                        },
                    }}
                    style={{ background: '#141414', border: '1px solid #303030' }}
                    cardProps={{ bodyStyle: { padding: '0 16px' } }}
                />
            </PageContainer>
        </DashboardShell>
    );
}
