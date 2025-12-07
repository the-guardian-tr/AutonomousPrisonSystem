"use client";

import DashboardShell from '@/components/DashboardShell';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Tag, Space } from 'antd';
import { AlertOutlined, SafetyCertificateOutlined, InfoCircleOutlined } from '@ant-design/icons';

const incidentsData = [
    { title: 'Hücre Blok B - İzinsiz Hareket', time: '14:22:01', severity: 'HIGH', type: 'GÜVENLİK İHLALİ', description: 'Blok B koridorunda yetkisiz personel tespit edildi. PatrolBot sevk edildi.' },
    { title: 'Ana Kapı - Sistem Testi', time: '12:00:00', severity: 'LOW', type: 'SİSTEM', description: 'Rutin kapı kilit mekanizma testi başarıyla tamamlandı.' },
    { title: 'Kantin - Kavga İhbarı', time: '10:45:33', severity: 'MEDIUM', type: 'ASAYİŞ', description: 'Mahkumlar arası sözlü tartışma fiziksel müdahaleye dönüştü. Gardiyan timi müdahale etti.' },
    { title: 'Drone Swarm - Batarya Uyarısı', time: '09:15:00', severity: 'LOW', type: 'BAKIM', description: 'Drone #4 batarya seviyesi %15 altına düştü. Otomatik şarja döndü.' },
    { title: 'Gece Sayımı - Tamamlandı', time: '06:00:00', severity: 'INFO', type: 'RUTİN', description: 'Tüm mahkumlar eksiksiz.' },
];

export default function IncidentsPage() {
    return (
        <DashboardShell>
            <PageContainer title="VUKUAT RAPORU VE GÜNLÜK LOGLAR">
                <ProList
                    rowKey="time"
                    dataSource={incidentsData}
                    metas={{
                        title: {
                            dataIndex: 'title',
                            render: (text, row) => (
                                <Space>
                                    {row.severity === 'HIGH' ? <AlertOutlined style={{ color: '#f5222d' }} /> : row.severity === 'MEDIUM' ? <InfoCircleOutlined style={{ color: '#faad14' }} /> : <SafetyCertificateOutlined style={{ color: '#52c41a' }} />}
                                    <span style={{ color: '#d9d9d9', fontWeight: 'bold' }}>{text}</span>
                                </Space>
                            )
                        },
                        subTitle: {
                            dataIndex: 'type',
                            render: (text) => <Tag color="#262626" style={{ border: '1px solid #434343' }}>{text}</Tag>
                        },
                        description: {
                            dataIndex: 'description',
                            render: (text) => <span style={{ color: '#8c8c8c' }}>{text}</span>
                        },
                        actions: {
                            render: (text, row) => [
                                <div key="time" style={{ color: '#52c41a', fontFamily: 'monospace' }}>{row.time}</div>
                            ]
                        }
                    }}
                    style={{ background: '#141414', border: '1px solid #303030' }}
                />
            </PageContainer>
        </DashboardShell>
    );
}
