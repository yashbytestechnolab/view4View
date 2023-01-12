import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { Colors, F40014 } from '../Theme'

interface dropDownItem {
    value: string | number | any,
    onChange?: (item: any) => {} | any,
    data: number | string | any
}
export const CommonDropDown = (props: dropDownItem) => {
    const { value, onChange, data } = props
    return (
        <Dropdown
            selectedTextStyle={[F40014.main, styles.paddingLeft]}
            containerStyle={styles.dropContain}
            confirmSelectItem={false}
            iconStyle={styles.icon}
            style={styles.dropDownContainer}
            labelField="label"
            valueField="value"
            placeholder='0'
            placeholderStyle={styles.paddingLeft22}
            data={data}
            showsVerticalScrollIndicator={false}
            value={value}
            renderItem={(item) => {
                return (
                    <View style={styles.renderItem}>
                        <Text style={styles.renderValue}>
                            {item?.value}
                        </Text>
                    </View>
                )
            }}
            onChange={onChange}
            maxHeight={100}
        />
    )
}

const styles = StyleSheet.create({
    paddingLeft: { paddingLeft: 20 },
    dropContain: { width: 81, flex: 1, },
    icon: { right: 15, },
    dropDownContainer: { width: 81, left: 20, justifyContent: "center", alignItems: "center" },
    paddingLeft22: { paddingLeft: 22 },
    renderItem: { flex: 1, marginVertical: 3 },
    renderValue: { color: "black", textAlign: "center" }
})