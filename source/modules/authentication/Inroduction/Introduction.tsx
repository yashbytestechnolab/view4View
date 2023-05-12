import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { colorBackGround, Colors, darkBackGround } from '../../../Theme';
import { LocalStorageKeys, ROUTES, String } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { IntroductionData } from '../../../services/jsonfile';
import { styles } from './style';
import { ButtonComponent } from '../../../components';
import { InputContextProvide } from '../../../context/CommonContext';
import * as LocalStorage from '../../../services/LocalStorage';
import { useTranslation } from 'react-i18next';

const { height } = Dimensions.get('window');

export const Introduction = () => {
    const { t } = useTranslation()

    /**
     * useContext is used for darkModetheme 
     */
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)

    const pageRef: React.MutableRefObject<undefined> = useRef();
    const navigation: any = useNavigation();
    const [getCurrentIndex, setGetCurrentIndex] = useState<number>()
    /**
         * buttonHandle handle swipe data and index
         */
    const buttonHandler = async () => {
        const index: number = pageRef.current?.getCurrentIndex();
        if (getCurrentIndex == 3) {
            await LocalStorage.setValue(LocalStorageKeys?.IsFirstTimeLogin, true)
        }
        if (index === IntroductionData?.length - 1) {

            navigation.reset({
                index: 0,
                routes: [{ name: ROUTES?.LOGIN }]
            })
        } else {
            pageRef.current.scrollToIndex({
                index: index + 1,
                animated: true,
            });
        }
    };
    /**
     * skipHandler  skip all swipe data and navigate login screen
     */
    const skipHandler = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: ROUTES?.LOGIN }]
        })
    }
    /**
        * renderDesign swipe data UI
        */

    const renderDesign = (item: { svg: JSX.IntrinsicAttributes | object; title: string; subTitle: string }) => {
        return (
            <View style={styles.child}>

                <item.svg height={height - 480} />
                <View style={styles.alignItems}>
                    <Text style={[styles.title, colorBackGround(darkModeTheme)]}>{t(`${item?.title}`)}</Text>
                    <Text style={[styles.subTitle, colorBackGround(darkModeTheme)]}>{t(`${item?.subTitle}`)}</Text>
                </View>

            </View>
        )
    }
    /**
        * main return with SwiperFlatList with sticky skip and next button
        */
    return (
        <SafeAreaView style={[styles.container, darkBackGround(darkModeTheme)]}>
            <StatusBar barStyle={String?.StatusBar?.darkContent} backgroundColor={Colors?.white} />
            <>
                <SwiperFlatList
                    ref={pageRef}
                    onChangeIndex={() => {
                        setGetCurrentIndex(pageRef.current?.getCurrentIndex())
                    }}
                    showPagination paginationActiveColor={Colors?.primaryRed}
                    paginationStyle={styles.pagenationStyle}
                    paginationStyleItem={styles.paginationStyle}
                    paginationDefaultColor={Colors.paginationGray}
                    // autoplay
                    autoplayDelay={5}
                    autoplayLoopKeepAnimation={true}
                    data={IntroductionData}
                    renderItem={({ item }) => (renderDesign(item))}

                />
                {
                    getCurrentIndex != 3 && <TouchableOpacity onPress={skipHandler} style={styles.skipWrapper}>
                        <Text style={[styles.skipText, colorBackGround(darkModeTheme)]}>{t("skip")}</Text>
                    </TouchableOpacity>
                }

                <ButtonComponent onPrees={() => { buttonHandler() }} wrapperStyle={styles.nextButtoun} buttonTitle={getCurrentIndex == 3 ? t("getStartedNow") : t("next")} />
            </>

        </SafeAreaView>
    )
}


