// src/features/home/components/AppMenu.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CalendarCheckIcon,
  CalendarStarIcon,
  ChartBarIcon,
  GearIcon,
  NewspaperIcon,
  UserCircleIcon,
  UsersThreeIcon,
} from 'phosphor-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { HOME_MENU_OPTIONS, MenuOption, UserRole } from '@/constants/menuConfig';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';

// Map Phosphor icon names to their components.
// Add to this map whenever you add a new menu item.
const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string; weight?: any }>> = {
  CalendarCheck: CalendarCheckIcon,
  CalendarStar: CalendarStarIcon,
  ChartBar: ChartBarIcon,
  Gear: GearIcon,
  Newspaper: NewspaperIcon,
  UserCircle: UserCircleIcon,
  UsersThree: UsersThreeIcon,
};

interface AppMenuProps {
  currentUserRole: UserRole;
}

export const AppMenu = ({ currentUserRole }: AppMenuProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menuOptions = HOME_MENU_OPTIONS.filter(
    (option) => !option.isSpecial && option.allowedRoles.includes(currentUserRole)
  );

  const renderIcon = (option: MenuOption) => {
    const IconComponent = ICON_MAP[option.iconName];
    if (!IconComponent) return null;
    return <IconComponent size={32} color={colors.primary} weight="duotone" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>App Menu</Text>
      </View>

      <View style={styles.menuGrid}>
        {menuOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuItem}
            onPress={() => option.navigateTo && navigation.navigate(option.navigateTo as any)}
            activeOpacity={0.7}
          >
            <View style={styles.iconTile}>{renderIcon(option)}</View>
            <Text style={styles.menuItemText} numberOfLines={2}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  sectionHeader: {
    marginBottom: spacing.m,
    marginTop: spacing.m,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  menuItem: {
    flexBasis: '22.5%',
    flexGrow: 0,
    flexShrink: 0,
    aspectRatio: 0.8,
    backgroundColor: '#1A2C20',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  iconTile: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#213828',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2E4D35',
  },
  menuItemText: {
    color: colors.text.primary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 2,
    lineHeight: 14,
  },
});