// src/constants/menuConfig.ts
import { RootStackParamList } from '@/navigation/types';

export type UserRole = 'coach' | 'admin' | 'player';

export interface MenuOption {
  id: string;
  label: string;
  navigateTo?: keyof RootStackParamList;
  // Phosphor icon name — import the matching component from 'phosphor-react-native'
  // e.g. iconName: 'CalendarCheck' → import { CalendarCheckIcon } from 'phosphor-react-native'
  iconName: string;
  allowedRoles: UserRole[];
  isSpecial?: boolean;
}

export const HOME_MENU_OPTIONS: MenuOption[] = [
  {
    id: 'start_session',
    label: 'Start Session',
    navigateTo: 'MarkAttendance',
    iconName: 'QrCode',
    allowedRoles: ['coach', 'admin'],
    isSpecial: true,
  },
  {
    id: 'sessions',
    label: 'Sessions',
    navigateTo: 'Sessions',
    iconName: 'CalendarCheck',
    allowedRoles: ['coach', 'admin', 'player'],
  },
  {
    id: 'batches',
    label: 'Batches',
    navigateTo: 'Batches',
    iconName: 'UsersThree',
    allowedRoles: ['coach', 'admin'],
  },
  {
    id: 'players',
    label: 'Players',
    navigateTo: 'Players',
    iconName: 'UserCircle',
    allowedRoles: ['coach', 'admin'],
  },
  {
    id: 'news',
    label: 'News',
    iconName: 'Newspaper',
    allowedRoles: ['coach', 'admin', 'player'],
  },
  {
    id: 'events',
    label: 'Events',
    iconName: 'CalendarStar',
    allowedRoles: ['coach', 'admin', 'player'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    iconName: 'ChartBar',
    allowedRoles: ['coach', 'admin'],
  },
  {
    id: 'account',
    label: 'Account',
    navigateTo: 'Account',
    iconName: 'Gear',
    allowedRoles: ['coach', 'admin', 'player'],
  },
];