import { Alert, SafeAreaView, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colorBackGround, darkBackGround, F40012, F50012, F60016, } from '../../../Theme'
import { ButtonComponent, Header, InputComponent } from '../../../components'
import { ROUTES, String, addVideoText } from '../../../constants'
import { styles } from './styles'
import { InputContextProvide } from '../../../context/CommonContext'
import { useNavigation } from '@react-navigation/native'
import { Anaylitics } from '../../../constants/analytics'
import { CamptionConformationModel } from '../../../components/CamptionConformationModel'

export const AddVideo = () => {
    const navigation = useNavigation()
    const { headerTitle, commonString } = String
    const { storeCreator: { coinBalance: { getBalance }, campaignData: { getCampaignData }, darkModeTheme, addVideoUrl, setVideoUrl } }: any = useContext(InputContextProvide)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [isDuplicateUrl, setIsDuplicateUrl] = useState(false)


    const onAddVideo = () => {
        let youtubeUrl = 'https://youtu.be/'
        let expetedViewNotRepeat = false

        addVideoUrl == "" || !youtubeUrl.includes(addVideoUrl?.slice(0, 16)) ?
            setIsVisibleModal(true)
            :
            (getCampaignData.length > 0 &&
                getCampaignData?.map((res: { video_url: string | undefined; remaining_view: number | any }) => {
                    (res?.video_url == addVideoUrl && res?.remaining_view > 0) ? expetedViewNotRepeat = true : false
                }),
                !expetedViewNotRepeat ? (navigation?.navigate(ROUTES?.CREATE_CAMPAIGN, { url: addVideoUrl, }), Anaylitics("add_video_click_url", { video_url: addVideoUrl, user_balance: getBalance })) :
                    (
                        setIsDuplicateUrl(true)))
    }
    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <View style={[styles.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header showBacKIcon={true}
                    title={headerTitle?.AddYourVideo} />
                <View style={styles.childWrapper}>
                    <Text style={[F50012.main, F50012.fontStyleVideo, colorBackGround(darkModeTheme)]}>{commonString?.Addvideolink}</Text>
                    <View style={styles.link}>
                        <InputComponent
                            value={addVideoUrl}
                            onChangeText={(value) => {
                                setVideoUrl(value)
                            }}
                            viewStyle={styles.inputStyle}
                            placeholder={commonString?.pasteyourvideolinkhere}
                        />
                    </View>
                    <View style={styles.button}>
                        <ButtonComponent
                            disable={(addVideoUrl?.length > 0) ? false : true}
                            wrapperStyle={styles.buttonWrap}
                            buttonTitle={commonString.Addnow}
                            onPrees={() => { onAddVideo() }}
                        />
                    </View>
                    <View style={styles.discretion}>
                        <Text style={[F60016.textStyle, F60016.campaign, F60016.bold, colorBackGround(darkModeTheme)]}>
                            {commonString.createContain}
                        </Text>
                        <View style={styles.disWrap}>
                            {addVideoText?.length > 0 && addVideoText?.map((item: { text: string }, index: number) => {
                                return (
                                    <View key={index.toString()}
                                        style={styles.vertical}>
                                        <Text style={[F40012.main, F40012.contain, { textAlign: "auto" }, colorBackGround(darkModeTheme)]}>
                                            {item?.text}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
            {isVisibleModal &&
                <CamptionConformationModel
                    titleText={'Invalid url'}
                    descriptionText={`Please enter valid url.`}
                    isVisible={isVisibleModal}
                    setIsVisible={setIsVisibleModal}
                    actionTitle={"Close"}
                    onPress={() => {
                        setIsVisibleModal(false)
                    }
                    }
                />
            }
            {isDuplicateUrl &&
                <CamptionConformationModel
                    titleText={'Warning!!'}
                    descriptionText={String?.commonString?.CampaignAlert}
                    isVisible={isDuplicateUrl}
                    setIsVisible={setIsDuplicateUrl}
                    actionTitle={"Close"}
                    onPress={() => {
                        setIsDuplicateUrl(false)
                    }
                    }
                />
            }
        </>
    )
}


