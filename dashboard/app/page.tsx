
"use client";

import {
  PageContainer,
  ProCard,
  ProLayout,
  StatisticCard
} from '@ant-design/pro-components';
import {
  AlertTwoTone,
  SafetyCertificateTwoTone,
  RiseOutlined,
  FallOutlined,
  UserOutlined,
  UnlockOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined as Shield
} from '@ant-design/icons';
import { Space, Table, Tag, Button, Avatar, Dropdown, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Divider } = StatisticCard;

// Mock Data - Military/High Security Context
const inmates = [
  { key: '1', id: 'MAHKUM-9921', name: 'Alparslan "Yıkıcı" Çelik', status: 'TECRİT', cell: 'HÜCRE-A1', risk: 'KRİTİK', crime: 'Vatana İhanet', sentence: 'Müebbet' },
  { key: '2', id: 'MAHKUM-9922', name: 'Buse "Gölge" Yılmaz', status: 'KOĞUŞ-B', cell: 'BLOK-B2', risk: 'YÜKSEK', crime: 'Siber Casusluk', sentence: '25 Yıl' },
  { key: '3', id: 'MAHKUM-9923', name: 'Cemal "Kasap" Demir', status: 'SORGODA', cell: 'SORGU-1', risk: 'AŞIRI', crime: 'Silahlı Terör', sentence: 'Müebbet' },
  { key: '4', id: 'MAHKUM-9924', name: 'Davut Kaya', status: 'REVİR', cell: 'MED-01', risk: 'ORTA', crime: 'Askeri Mühimmat Kaçakçılığı', sentence: '15 Yıl' },
  { key: '5', id: 'MAHKUM-9925', name: 'Emre Can', status: 'İŞTİMA', cell: 'BLOK-A3', risk: 'DÜŞÜK', crime: 'Emre İtaatsizlik', sentence: '3 Yıl' },
];

const columns: ColumnsType<any> = [
  { title: 'SİCİL NO', dataIndex: 'id', key: 'id', render: (text) => <Tag color="#5b8c00" style={{ fontWeight: 'bold' }}>{text}</Tag> },
  { title: 'KİMLİK', dataIndex: 'name', key: 'name', render: (text) => <b style={{ color: '#d9d9d9' }}>{text}</b> },
  {
    title: 'MEVCUT KONUM', dataIndex: 'status', key: 'status', render: (status) => (
      <Tag color={status === 'TECRİT' || status === 'SORGODA' ? '#8c1616' : status === 'İŞTİMA' ? '#135200' : '#faad14'}>
        {status}
      </Tag>
    )
  },
  { title: 'BİRİM', dataIndex: 'cell', key: 'cell' },
  {
    title: 'TEHDİT SEVİYESİ', dataIndex: 'risk', key: 'risk', render: (risk) => (
      <Tag color={risk === 'KRİTİK' || risk === 'AŞIRI' ? '#5c0011' : risk === 'YÜKSEK' ? '#cf1322' : '#faad14'}>
        {risk}
      </Tag>
    )
  },
  { title: 'SUÇ / İTHAM', dataIndex: 'crime', key: 'crime' },
  {
    title: 'OPERASYON', key: 'action', render: (_, record) => (
      <Space size="small">
        <Button size="small" type="primary" style={{ background: '#237804', borderColor: '#237804' }}>Dosya</Button>
        <Button size="small" type="primary" danger>Müdahale</Button>
      </Space>
    ),
  },
];

export default function Dashboard() {
  const { token } = theme.useToken();

  return (
    <div style={{ height: '100vh', overflow: 'auto', background: '#000', colorScheme: 'dark' }}>
      <ProLayout
        title="APS KOMUTA MERKEZİ"
        logo={null}
        layout="mix"
        splitMenus={false}
        contentWidth="Fluid"
        fixedHeader
        fixSiderbar
        token={{
          sider: {
            colorMenuBackground: '#141414',
            colorTextMenu: '#a6a6a6',
            colorTextMenuSelected: '#52c41a',
            colorBgMenuItemSelected: 'rgba(82, 196, 26, 0.1)',
          },
          header: {
            colorBgHeader: '#1f1f1f',
            colorHeaderTitle: '#52c41a',
            colorTextMenu: '#d9d9d9',
          },
          pageContainer: {
            colorBgPageContainer: '#000000',
          }
        }}
        avatarProps={{
          src: 'https://cdn-icons-png.flaticon.com/512/3588/3588628.png',
          title: <span style={{ color: '#d9d9d9', fontWeight: 'bold' }}>KOMUTAN YILMAZ</span>,
          size: 'small',
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    { key: 'protocol', icon: <SettingOutlined />, label: 'Savunma Protokolleri' },
                    { key: 'logout', icon: <LogoutOutlined />, label: 'Nöbeti Devret' },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <Tag color="#8c1616" style={{ cursor: 'pointer', fontWeight: 'bold', border: '1px solid #ff4d4f' }}>
              <AlertTwoTone twoToneColor="#f5222d" /> DEFCON 3
            </Tag>,
            <BellOutlined key="BellOutlined" style={{ fontSize: 18, color: '#d9d9d9' }} />,
          ];
        }}
        menuDataRender={() => [
          { path: '/', name: 'ANA KARARGAH', icon: <SafetyCertificateTwoTone twoToneColor="#52c41a" /> },
          { path: '/inmates', name: 'MAHKUM KÜTÜĞÜ', icon: <UserOutlined /> },
          { path: '/cells', name: 'HÜCRE BLOKLARI', icon: <UnlockOutlined /> },
          { path: '/guards', name: 'VARDİYA TİMİ', icon: <Shield /> },
          { path: '/incidents', name: 'VUKUAT RAPORU', icon: <AlertTwoTone twoToneColor="#faad14" /> },
        ]}
      >
        <PageContainer
          content={
            <div style={{ marginBottom: 24, fontSize: 16, color: '#d9d9d9', borderLeft: '4px solid #52c41a', paddingLeft: 12 }}>
              <b>SİSTEM DURUMU: </b> <span style={{ color: '#52c41a', fontWeight: 'bold' }}>ALPHA - GÜVENLİ</span>
              <span style={{ marginLeft: 24 }}><b>GÖREV SÜRESİ:</b> 04:23:12</span>
              <span style={{ marginLeft: 24, color: '#faad14' }}><b>TEHDİT SEVİYESİ:</b> DÜŞÜK</span>
            </div>
          }
          style={{ minHeight: '100vh', background: '#000' }}
        >
          <ProCard.Group direction="row" gutter={16} style={{ marginBottom: 24 }} ghost>
            <ProCard style={{ background: '#141414', border: '1px solid #303030' }}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>MEVCUT MEVCUDU</span>,
                  value: 1248,
                  valueStyle: { color: '#d9d9d9' },
                  icon: <UserOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
                  description: <StatisticCard.Statistic title="KAPASİTE" value="88%" suffix=" DOLU" valueStyle={{ color: '#52c41a', fontSize: 12 }} />
                }}
              />
            </ProCard>
            <ProCard style={{ background: '#141414', border: '1px solid #303030' }}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>AKTİF VUKUAT</span>,
                  value: 2,
                  valueStyle: { color: '#cf1322' },
                  icon: <AlertTwoTone twoToneColor="#cf1322" style={{ fontSize: 24 }} />,
                  description: <span style={{ color: '#a61d24', fontSize: 12 }}>BLOK-C İSYAN GİRİŞİMİ</span>
                }}
              />
            </ProCard>
            <ProCard style={{ background: '#141414', border: '1px solid #303030' }}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>SAVUNMA HATTI</span>,
                  value: "TAM GÜÇ",
                  valueStyle: { color: '#52c41a' },
                  icon: <Shield style={{ color: '#52c41a', fontSize: 24 }} />,
                  description: <StatisticCard.Statistic title="PERSONEL" value="45/45" valueStyle={{ color: '#d9d9d9', fontSize: 12 }} />
                }}
              />
            </ProCard>
            <ProCard style={{ background: '#141414', border: '1px solid #303030' }}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>KARANTİNA/TECRİT</span>,
                  value: 'AKTİF',
                  valueStyle: { color: '#faad14' },
                  icon: <UnlockOutlined style={{ fontSize: 24, color: '#faad14' }} />
                }}
              />
            </ProCard>
          </ProCard.Group>

          <ProCard.Group title={<span style={{ color: '#d9d9d9', fontWeight: 'bold' }}>ROBOTİK VE OTONOM SİSTEMLER</span>} direction="row" gutter={16} style={{ marginBottom: 24 }} ghost>
            <ProCard style={{ background: '#141414', border: '1px solid #303030' }} colSpan={6}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>DEVRIYE MODÜLÜ</span>,
                  value: 'AKTİF',
                  valueStyle: { color: '#52c41a' },
                  icon: <RobotOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                        <span>PatrolBot-01</span> <Badge status="processing" color="green" text={<span style={{ color: '#73d13d' }}>Devriyede</span>} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12, marginTop: 4 }}>
                        <span>PatrolBot-02</span> <Badge status="success" color="green" text={<span style={{ color: '#73d13d' }}>Şarjda (%85)</span>} />
                      </div>
                    </div>
                  )
                }}
              />
            </ProCard>

            <ProCard style={{ background: '#141414', border: '1px solid #303030' }} colSpan={6}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>SALDIRI TİMİ (K9)</span>,
                  value: 'BEKLEMEDE',
                  valueStyle: { color: '#faad14' },
                  icon: <AimOutlined style={{ color: '#faad14', fontSize: 24 }} />,
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                        <span>DogBot Alpha</span> <span style={{ color: '#faad14' }}>Standby</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12, marginTop: 4 }}>
                        <span>DogBot Beta</span> <span style={{ color: '#faad14' }}>Standby</span>
                      </div>
                    </div>
                  )
                }}
              />
            </ProCard>

            <ProCard style={{ background: '#141414', border: '1px solid #303030' }} colSpan={6}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>HAVA SAHASI</span>,
                  value: 'TARANIYOR',
                  valueStyle: { color: '#13c2c2' },
                  icon: <ThunderboltOutlined style={{ color: '#13c2c2', fontSize: 24 }} />,
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                        <span>Drone Swarm</span> <span>İrtifa: 150m</span>
                      </div>
                      <Progress percent={92} size="small" strokeColor="#13c2c2" trailColor="#303030" showInfo={false} />
                    </div>
                  )
                }}
              />
            </ProCard>

            <ProCard style={{ background: '#141414', border: '1px solid #303030' }} colSpan={6}>
              <StatisticCard
                statistic={{
                  title: <span style={{ color: '#8c8c8c' }}>OTONOM KAPILAR</span>,
                  value: 'KİLİTLİ',
                  valueStyle: { color: '#52c41a' },
                  icon: <GatewayOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
                  description: (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                        <span>Ana Kapı</span> <CheckCircleFilled style={{ color: '#52c41a' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12, marginTop: 4 }}>
                        <span>Sektör C</span> <CheckCircleFilled style={{ color: '#52c41a' }} />
                      </div>
                    </div>
                  )
                }}
              />
            </ProCard>
          </ProCard.Group>

          <ProCard split="vertical" bordered headerBordered ghost gutter={16}>
            <ProCard title={<span style={{ fontWeight: 'bold', color: '#d9d9d9' }}>VUKUAT VE SİCİL TAKİBİ</span>} colSpan="70%" style={{ background: '#141414', border: '1px solid #303030' }}>
              <Table
                columns={columns}
                dataSource={inmates}
                pagination={false}
                size="small"
                rowClassName={() => 'dark-row'}
              />
            </ProCard>
            <ProCard title={<span style={{ fontWeight: 'bold', color: '#d9d9d9' }}>HIZLI MÜDAHALE</span>} colSpan="30%" style={{ background: '#141414', border: '1px solid #303030' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Button type="primary" danger size="large" icon={<AlertTwoTone twoToneColor="#fff" />} block style={{ background: '#5c0011', borderColor: '#8c1616', height: '50px', fontWeight: 'bold' }}>
                  KIRMIZI ALARM (RED CODE)
                </Button>
                <Button type="dashed" ghost block icon={<UserOutlined />} style={{ color: '#d9d9d9', borderColor: '#434343' }}>Yeni Mahkum Kaydı</Button>
                <Button block ghost icon={<BellOutlined />} style={{ color: '#d9d9d9', borderColor: '#434343' }}>Genel Emir Geç</Button>

                <Divider style={{ borderColor: '#303030' }} />

                <div style={{ marginTop: 0 }}>
                  <h4 style={{ color: '#a6a6a6' }}>HÜCRE DOLULUK ORANLARI</h4>

                  <div style={{ marginBottom: 4, marginTop: 12, display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                    <span>BLOK A (Düşük)</span> <span>95%</span>
                  </div>
                  <div style={{ height: 6, background: '#303030', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: '95%', background: '#389e0d', height: '100%' }}></div>
                  </div>

                  <div style={{ marginBottom: 4, marginTop: 12, display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                    <span>BLOK B (Orta)</span> <span>80%</span>
                  </div>
                  <div style={{ height: 6, background: '#303030', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: '80%', background: '#d48806', height: '100%' }}></div>
                  </div>

                  <div style={{ marginBottom: 4, marginTop: 12, display: 'flex', justifyContent: 'space-between', color: '#d9d9d9', fontSize: 12 }}>
                    <span>BLOK C (Yüksek/Tecrit)</span> <span>40%</span>
                  </div>
                  <div style={{ height: 6, background: '#303030', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: '40%', background: '#cf1322', height: '100%' }}></div>
                  </div>
                </div>
              </div>
            </ProCard>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
}

