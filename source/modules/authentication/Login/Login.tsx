import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LocalStorageKeys, ROUTES } from '../../../constants';
import { style } from './style';
import { InputComponent } from '../../../components/InputComponent';
import { ButtonComponent } from '../../../components/ButtonComponent';

import * as LocalStorage from '../../../services/LocalStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Login = () => {
  const navigation:any = useNavigation();
  const handleLogin = () => {
    LocalStorage.setValue(LocalStorageKeys?.UserId, 'token')
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.TABLIST }],
    });
  }
  return (
    <>
      <View style={[style.main,]}>
        <KeyboardAwareScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={[style.scroll,]}
          scrollEnabled={true}
          contentContainerStyle={[style.scrollContain,]}>
            <Text style={{textAlign:'center',marginTop:50,fontWeight:'400',fontSize:20}}>Login</Text>
          <InputComponent
            inputTitle={'email'}
            placeholder={'email'}
            keyboardType={'email'}
            value={''}
            onChangeText={(value) => {

            }}
          />

          <InputComponent
            inputTitle={'password'}
            placeholder={'password'}
            value={''}
            onChangeText={(value) => { }}
            isSecureIcon={false} />
          <View style={style.signIn}>
            <ButtonComponent
              onPrees={() => { handleLogin() }}
              buttonTitle={'sign'} />
          </View>


        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
