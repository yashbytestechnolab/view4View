import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components';
import { ROUTES, String } from '../../constants';

import { GetVideoCampaign } from '../../services/FireStoreServices';
import { Colors } from '../../Theme';

export const CreateCamp = () => {

    const [showUrl, setShowUrl] = useState<boolean>(false);
    const [getUrl, setGetUrl] = useState<string>();
    const [expectedView, setExpectedView] = useState<string>('');
    const navigation = useNavigation<any>();

    const AddVideoUrl = () => {
        return (
            expectedView &&
            <View style={styles.urlWrapper}>
                <TextInput
                    onChangeText={value => {
                        setGetUrl(value);
                    }}
                    value={getUrl}
                    style={styles.textInputWrapper}
                />
                <TouchableOpacity
                    style={styles.addButtonWrapper}
                    onPress={() => {
                        CheckUniqUrl()
                    }}>
                    <Text style={[styles.plusIcon, { fontSize: 15 }]}>
                        {String?.homeTab?.add}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const getVideoUrl = async () => {
        GetVideoCampaign().then((res: any) => {
            const getVideoUrl: any = []
            res._docs?.filter((res: any) => {
                if (res?._data?.remiderView > 0) {
                    getVideoUrl.push(res?._data)
                    return res?._data
                }
            });
            return setExpectedView(getVideoUrl)
        })
    }
    useEffect(() => {
        getVideoUrl()
    }, [])
    const CheckUniqUrl = () => {
        let expetedViewNotRepeat = false
        expectedView &&
            expectedView?.map((res: { videoUrl: string | undefined; }) => {

                res?.videoUrl == getUrl ?
                    expetedViewNotRepeat = true : null
            })
        !expetedViewNotRepeat ?
            (setShowUrl(false),
                navigation?.navigate(ROUTES?.CREATE_CAMPAIGN, {
                    url: getUrl,
                })) : Alert.alert("please enter uniq url")

    }
    return (
        <View style={styles.container}>
            <Header title={String?.headerTitle?.home} />
            {showUrl && AddVideoUrl()}
            {!showUrl && (
                <View style={{ flex: 1 }}>
                    {
                        expectedView && expectedView.map((res: { videoId: string[]; remiderView: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; expectedView: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                            return (
                                <View>
                                    <Image source={{ uri: "http://img.youtube.com/vi/" + res?.videoId[0] + "/0.jpg" }} style={{ height: 80, width: 150, alignItems: 'center', marginHorizontal: 20, marginTop: 10 }} />
                                    <Text style={{ marginLeft: 20, marginTop: 5, color: 'green', fontSize: 20 }}>{res?.remiderView}/{res?.expectedView}</Text>
                                </View>
                            )
                        })
                    }

                    <TouchableOpacity
                        style={styles.iconWrapper}
                        activeOpacity={1}
                        onPress={() => {
                            setShowUrl(true);
                        }}>
                        <Text style={styles.plusIcon}>{String?.homeTab?.plus}</Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.white,
    },
    iconWrapper: {
        backgroundColor: Colors.pink,
        height: 40,
        width: 40,
        borderRadius: 20,
        position: 'absolute',
        bottom: 120,
        right: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        color: Colors.white,
        fontSize: 25,
        fontWeight: '400',
    },
    addButtonWrapper: {
        height: 35,
        width: 55,
        backgroundColor: Colors?.pink,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginLeft: 8,
    },
    textInputWrapper: {
        borderBottomColor: Colors?.gray,
        borderBottomWidth: 2,
        width: '80%',
    },
    urlWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});