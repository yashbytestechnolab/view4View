import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {style} from '../CommonButton/Style';

interface customDropDown {
  data?: any;
  labelField: any;
  valueField?: any;
  onChange?: any;
  style?: any;
  maxHeight?: any;
  placeholder?: any;
  value?: any;
}
export default function DropDown(props: customDropDown) {
  const {
    data,
    labelField,
    valueField,
    onChange,
    style,
    maxHeight,
    placeholder,
    value,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View>
      <Dropdown
        data={data}
        dropdownPosition={'bottom'}
        style={style.dropdown2}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={!isFocus ? '0' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}></Dropdown>
    </View>
  );
}
