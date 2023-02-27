import {View, } from 'react-native';
import React from 'react';
import {Colour} from '../../theme';

interface selectcat {
  Icon?: any;
  selectIcon?: boolean;
  IconName?: String;
  iconColor?:String;
  iconBgColor?:String
}
export default function SelectCategory(props: selectcat) {
  const {Icon, selectIcon, IconName,iconBgColor,iconColor} = props;
 return (
    <View>
      {selectIcon === false ? (
         
        <View>
          <Icon />
        </View>
      ) : (
        <Icon BGcolor={iconBgColor ?iconBgColor:Colour.PrimaryBlue} color={iconColor?iconColor:Colour.primaryGreen} />
      )}
    </View>
  );
}