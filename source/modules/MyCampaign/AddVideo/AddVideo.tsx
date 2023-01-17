import { Alert, SafeAreaView, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colorBackGround, darkBackGround, F40012, F50012, F60016, } from '../../../Theme'
import { ButtonComponent, Header, InputComponent } from '../../../components'
import { ROUTES, String, addVideoText } from '../../../constants'
import { styles } from './styles'
import { InputContextProvide } from '../../../context/CommonContext'
import { useNavigation } from '@react-navigation/native'

export const AddVideo = () => {
    const navigation = useNavigation()
    const { headerTitle, commonString } = String
    const [addVideoUrl, setVideoUrl] = useState("")
    const { storeCreator: { campaignData: { getCampaignData }, darkModeTheme } }: any = useContext(InputContextProvide)
    const onAddVideo = () => {
        let youtubeUrl = 'https://youtu.be/'
        let expetedViewNotRepeat = false
        addVideoUrl == "" || !youtubeUrl.includes(addVideoUrl.slice(0, 16)) ? null
            :
            (
                getCampaignData.length > 0 &&
                getCampaignData?.map((res: { video_url: string | undefined; remaining_view: number | any }) => {
                    (res?.video_url == addVideoUrl && res?.remaining_view > 0) ? expetedViewNotRepeat = true : false
                }),
                !expetedViewNotRepeat ? (navigation?.navigate(ROUTES?.CREATE_CAMPAIGN, { url: addVideoUrl, }), setVideoUrl("")) :
                    (Alert.alert("current campaign are running"))
            )
    }

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <View style={[styles.mainWrapper, darkBackGround(darkModeTheme)]}>
                <Header
                    showBacKIcon={true}
                    title={headerTitle?.AddYourVideo} />
                <View style={styles.childWrapper}>
                    <Text style={[F50012.main, F50012.fontStyleVideo, colorBackGround(darkModeTheme)]}>{commonString?.Addvideolink}</Text>
                    <View style={styles.link}>
                        <InputComponent
                            value={addVideoUrl}
                            onChangeText={(value: string | number | any) => setVideoUrl(value)}
                            viewStyle={styles.inputStyle}
                            placeholder={commonString?.pasteyourvideolinkhere}
                        />
                    </View>
                    <View style={styles.button}>
                        <ButtonComponent
                            wrapperStyle={styles.buttonWrap}
                            buttonTitle={commonString.Addnow}
                            onPrees={() => { onAddVideo() }}
                        />
                    </View>
                    <View style={styles.discretion}>
                        <Text style={[F60016.textStyle, F60016.campaign, colorBackGround(darkModeTheme)]}>
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
        </>
    )
}


