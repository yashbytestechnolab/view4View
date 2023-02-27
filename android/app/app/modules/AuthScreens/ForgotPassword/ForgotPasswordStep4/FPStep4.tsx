import {View, Text, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {Colour} from '../../../../theme';
import {ForgotBack} from '../../../../components/ForgotBack';
import {ROUTES, String} from '../../../../constants';
import {commonStyles} from '../../../../constants/CommonStyles';
import {CommonButton} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {SyncSuccess} from '../../../../assets/icons/SyncSuccess';
import {style} from './style';

const FPStep4: FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={style.main}>
      <StatusBar
        backgroundColor={Colour?.white}
        barStyle={String.darkContent}
      />
      <View style={style.IconWrapper}>
        <SyncSuccess height={23} width={23} color={Colour.PrimaryBlue} />
      </View>

      <Text style={commonStyles.forgotPwdTitle}>
        {String.forgotPasswordStep4.forgotPwdTitle}
      </Text>
      <Text style={[commonStyles.forgotPasswordSubText, style.textWrapper]}>
        {String.forgotPasswordStep4.subTitle}
      </Text>

      <CommonButton
        buttonText={String.continue}
        onPress={() => {
          navigation.navigate(ROUTES.Login);
        }}
        buttonStyle={style.buttonWrapper}
      />

      <ForgotBack />
    </View>
  );
};

export default FPStep4;
