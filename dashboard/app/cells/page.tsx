"use client";

import DashboardShell from '@/components/DashboardShell';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Badge, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const CellBlock = ({ name, cells }: { name: string, cells: any[] }) => (
    <ProCard title={<span style={{ fontWeight: 'bold', color: '#d9d9d9' }}>{name}</span>} bordered style={{ background: '#141414', border: '1px solid #303030', marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 12 }}>
            {cells.map((cell) => (
                <Tooltip title={`${cell.id} - ${cell.occupant || 'BOŞ'}`} key={cell.id}>
                    <div style={{
                        height: 80,
                        background: cell.status === 'DOLU' ? '#261214' : '#132115',
                        border: `1px solid ${cell.status === 'DOLU' ? '#8c1616' : '#237804'}`,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        position: 'relative'
                    }}>
                        <span style={{ fontSize: 10, color: '#8c8c8c', position: 'absolute', top: 4, left: 4 }}>{cell.id}</span>
                        {cell.status === 'DOLU' ? <UserOutlined style={{ fontSize: 24, color: '#f5222d' }} /> : <span style={{ color: '#237804', fontSize: 10 }}>BOŞ</span>}
                        {cell.status === 'DOLU' && <span style={{ fontSize: 9, color: '#d9d9d9', marginTop: 4 }}>{cell.occupant.split(' ')[0]}</span>}
                    </div>
                </Tooltip>
            ))}
        </div>
    </ProCard>
);

const generateCells = (prefix: string, count: number, occupancyRate: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `${prefix}-${i + 1}`,
        status: Math.random() < occupancyRate ? 'DOLU' : 'BOŞ',
        occupant: Math.random() < occupancyRate ? `Mahkum ${Math.floor(Math.random() * 9000) + 1000}` : null
    }));
};

export default function CellsPage() {
    const blockACells = generateCells('A', 20, 0.4); // Low security
    const blockBCells = generateCells('B', 15, 0.7); // Mid security
    const blockCCells = generateCells('C', 10, 0.9); // High security (Isolation)

    return (
        <DashboardShell>
            <PageContainer title="HÜCRE BLOKLARI (CANLI İZLEME)">
                <CellBlock name="BLOK A - DÜŞÜK GÜVENLİK" cells={blockACells} />
                <CellBlock name="BLOK B - ORTA GÜVENLİK" cells={blockBCells} />
                <CellBlock name="BLOK C - YÜKSEK GÜVENLİK (TECRİT)" cells={blockCCells} />

                <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, background: '#261214', border: '1px solid #8c1616' }}></div>
                        <span style={{ color: '#d9d9d9' }}>DOLU / KİLİTLİ</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, background: '#132115', border: '1px solid #237804' }}></div>
                        <span style={{ color: '#d9d9d9' }}>BOŞ / MÜSAİT</span>
                    </div>
                </div>
            </PageContainer>
        </DashboardShell>
    );
}
