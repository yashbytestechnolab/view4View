import {View} from 'react-native';
import React from 'react';
import {Centavizer} from '../../assets/icons/Centavizer';
import Logo from '../../assets/icons/logo';
export default function CentavizerLogo() {
  return (
    <View>
      <View style={{alignSelf: 'center', marginTop: 50}}>
        <Logo height={37} width={73} />
      </View>
      <View style={{alignSelf: 'center', marginTop: 19}}>
        <Centavizer />
      </View>
    </View>
  );
}
