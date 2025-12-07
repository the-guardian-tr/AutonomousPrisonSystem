"use client";

import React from 'react';
import { ProLayout } from '@ant-design/pro-components';
import {
    SafetyCertificateOutlined as Shield,
    UserOutlined,
    UnlockOutlined,
    LogoutOutlined,
    SettingOutlined,
    BellOutlined,
    AlertTwoTone,
    TableOutlined
} from '@ant-design/icons';
import { Dropdown, Badge, Avatar, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const { token } = theme.useToken();
    const pathname = usePathname();
    const router = useRouter();

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
                location={{
                    pathname,
                }}
                menuItemRender={(item, dom) => (
                    <Link href={item.path || '/'} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {dom}
                    </Link>
                )}
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
                    src: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    title: <span style={{ color: '#d9d9d9' }}>Komutan YUNUS</span>,
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'profile',
                                            icon: <UserOutlined />,
                                            label: 'Komutan Profili',
                                        },
                                        {
                                            key: 'settings',
                                            icon: <SettingOutlined />,
                                            label: 'Sistem Ayarları',
                                        },
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: 'Güvenli Çıkış',
                                        },
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
                        <Badge count={3} key="notifications" size="small" offset={[-5, 5]}>
                            <BellOutlined style={{ color: '#d9d9d9', fontSize: 18 }} />
                        </Badge>,
                        <AlertTwoTone key="alert" twoToneColor="#f5222d" style={{ fontSize: 18, marginLeft: 16 }} />
                    ];
                }}
                route={{
                    path: '/',
                    routes: [
                        {
                            path: '/',
                            name: 'ANA KARARGAH',
                            icon: <Shield />,
                        },
                        {
                            path: '/inmates',
                            name: 'MAHKUM KÜTÜĞÜ',
                            icon: <UserOutlined />,
                        },
                        {
                            path: '/cells',
                            name: 'HÜCRE BLOKLARI',
                            icon: <TableOutlined />,
                        },
                        {
                            path: '/guards',
                            name: 'VARDİYA TİMİ',
                            icon: <Shield />,
                        },
                        {
                            path: '/incidents',
                            name: 'VUKUAT RAPORU',
                            icon: <UnlockOutlined />,
                        },
                    ],
                }}
            >
                {children}
            </ProLayout>
        </div>
    );
}
