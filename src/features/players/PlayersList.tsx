import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { CreateSessionFab } from '@/components/AddButton';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { RootStackParamList } from '@/navigation/types';

export const PlayersList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegisterPlayer = () => {
    navigation.navigate('MainTabs', {
      screen: 'Home',
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Players"
          leftIconName="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <CreateSessionFab onPress={handleRegisterPlayer} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
