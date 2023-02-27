import { View, Text, ScrollView, Image, StatusBar, SafeAreaView } from 'react-native';
import React, { FC } from 'react';
import { commonStyles } from '../../../constants/CommonStyles';
import { ROUTES, String } from '../../../constants';
import { BackButton } from '../../../components/BackButton/BackButton';
import { Images } from '../../../assets';
import { SyncSuccess } from '../../../assets/icons/SyncSuccess';
import { ButtonWithIcon } from '../../../components/ButtonWithIcon/ButtonWithIcon';
import { style } from './style';
import { Colour } from '../../../theme';
import {
  useNavigation,
  useRoute,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import * as LocalStorage from '../../../services/LocalStorage';
import { LocalStorageKeys } from '../../../constants/LocalStorageKeys';
const Synced: FC = () => {
  const navigation: any = useNavigation();
  return (
  
    <>
    <StatusBar barStyle={String.lightContent} backgroundColor={Colour.white} />
    <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: Colour.PrimaryBlue }} >
    <ScrollView style={[commonStyles.blueBackGround]}
      showsVerticalScrollIndicator={false}
    >
      <Image source={Images.synced2} style={style.image} />
      <View style={style.syncIcon}>
        <SyncSuccess height={44} width={44} color={Colour.primaryGreen} />
      </View>

      <Text style={commonStyles.title}>{String.syncReady}</Text>
      <Text style={[style.subTitle]}>{String.syncSubText}</Text>
      <ButtonWithIcon
        buttonText={String.continue}
        onPress={() => {
          LocalStorage.setValue(LocalStorageKeys.syncWatchSkip, 'yes');

          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.TabNavigation }]
          })

        }}
        wraperStyle={style.buttonWrapper}
      />
    </ScrollView>
    </SafeAreaView>
    </>
  );
};
export default Synced;
