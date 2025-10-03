import TwoLandsGoldMumiButton from '../TwoLandsCrownDialoguesComponents/TwoLandsGoldMumiButton';
import React, { useState as useCrownState } from 'react';
import {
    Share,
    SafeAreaView as CrownSafe,
    Dimensions as CrownDims,
    Image as CrownImg,
    Text as CrownTxt,
    TouchableOpacity as CrownPress,
    ImageBackground as CrownBg,
    ScrollView,
    View as CrownBox,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import twoLandsCrownScrolls from '../TwoLandsCrownDialoguesData/twoLandsCrownScrolls';
import { fonts as crownFonts } from '../fonts';


type CrownScrollProps = {
    setLandsPageNow: (next: string | { screen: string; initialSelectedCase?: number }) => void;
    landsPageNow: string;
};

const TwoLandsCrownScrollsDialoguesPage: React.FC<CrownScrollProps> = ({ setLandsPageNow }) => {
    const [activeScroll, setActiveScroll] = useCrownState<null | typeof twoLandsCrownScrolls[0]>(null);
    const { width: twoLandsWid, height: twoLandsHei } = CrownDims.get('window');

    return (
        <CrownSafe style={{ flex: 1 }}>
            {/* Header */}
            <CrownBox
                style={{
                    position: 'relative',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: twoLandsHei * 0.03,
                    alignItems: 'center',
                    marginTop: twoLandsHei * 0.02,
                }}
            >
                {/* Back */}
                <CrownPress
                    onPress={() => {
                        if (activeScroll) setActiveScroll(null);
                        else setLandsPageNow('Two Lands Crown Home Dialogues');
                    }}
                >
                    <CrownImg
                        source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBackArrow.png')}
                        style={{ width: twoLandsHei * 0.064, height: twoLandsHei * 0.064 }}
                        resizeMode="contain"
                    />
                </CrownPress>

                {/* Title */}
                <CrownBg
                    source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: activeScroll ? twoLandsWid * 0.64 : twoLandsWid * 0.8,
                        height: twoLandsHei * 0.07,
                    }}
                    resizeMode="stretch"
                >
                    <CrownTxt
                        style={{
                            textAlign: 'center',
                            fontFamily: crownFonts.twoLandsPoppinsBold,
                            fontSize: twoLandsWid * 0.05,
                            color: '#F0B16D',
                        }}
                    >
                        SCROLLS
                    </CrownTxt>
                </CrownBg>

                {activeScroll && (
                    <CrownPress
                        onPress={() => {
                            Share.share({
                                message: `${activeScroll.title}\n\n${activeScroll.story}`,
                            });
                        }}
                        style={{ marginLeft: twoLandsWid * 0.019 }}
                    >
                        <CrownImg
                            source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsShare.png')}
                            style={{ width: twoLandsHei * 0.064, height: twoLandsHei * 0.064 }}
                            resizeMode="contain"
                        />
                    </CrownPress>
                )}
            </CrownBox>

            {/* Content */}
            {!activeScroll ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingHorizontal: twoLandsWid * 0.05,
                        paddingBottom: twoLandsHei * 0.1,
                    }}
                >
                    {twoLandsCrownScrolls.map((scroll) => (
                        <CrownBox
                            key={scroll.id}
                            style={{
                                justifyContent: 'center',
                                height: twoLandsHei * 0.19,
                                alignItems: 'center',
                                marginBottom: twoLandsHei * 0.02,
                                borderRadius: twoLandsWid * 0.02,
                                width: twoLandsWid * 0.9,
                            }}
                        >
                            <LinearGradient
                                end={{ x: 0.5, y: 0 }}
                                start={{ x: 0.5, y: 1 }}
                                colors={['#73001E', '#C90032', '#FF5757']}
                                style={{
                                    borderRadius: twoLandsWid * 0.02,
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                            <CrownTxt
                                style={{
                                    lineHeight: twoLandsWid * 0.055,
                                    paddingHorizontal: twoLandsWid * 0.025,
                                    fontFamily: crownFonts.twoLandsPoppinsBold,
                                    textAlign: 'center',
                                    fontSize: twoLandsWid * 0.045,
                                    marginBottom: twoLandsHei * 0.015,
                                    color: '#F0B16D',
                                }}
                            >
                                {scroll.title.toUpperCase()}
                            </CrownTxt>
                            <TwoLandsGoldMumiButton
                                onPress={() => setActiveScroll(scroll)}
                                twoLandsMumiBtnWidth={twoLandsWid * 0.5}
                                twoLandsMumiBtnHeight={twoLandsHei * 0.06}
                                style={{ alignSelf: 'center' }}
                                fontSize={twoLandsWid * 0.04}
                                twoLandsMumiTxtBtn="READ"
                            />
                        </CrownBox>
                    ))}
                </ScrollView>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingBottom: twoLandsHei * 0.1,
                        paddingHorizontal: twoLandsWid * 0.04,
                        alignItems: 'center',
                    }}
                >
                    <CrownBox
                        style={{
                            alignItems: 'center',
                            borderRadius: twoLandsWid * 0.06,
                            paddingHorizontal: twoLandsWid * 0.04,
                            marginTop: twoLandsHei * 0.01,
                            paddingVertical: twoLandsHei * 0.04,
                            width: twoLandsWid * 0.95,
                        }}
                    >
                        <CrownTxt
                            style={{
                                lineHeight: twoLandsWid * 0.055,
                                fontSize: twoLandsWid * 0.044444,
                                textAlign: 'left',
                                fontFamily: crownFonts.twoLandsPoppinsMedium,
                                color: '#F0B16D',
                            }}
                        >
                            {activeScroll.story}
                        </CrownTxt>
                    </CrownBox>
                </ScrollView>
            )}
        </CrownSafe>
    );
};

export default TwoLandsCrownScrollsDialoguesPage;
