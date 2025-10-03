import React, { useEffect, useState } from 'react';
import {
    ImageBackground as CrownBg,
    View as CrownBox,
    Dimensions as CrownDims,
    Image as CrownImg,
    Text as CrownTxt,
    TouchableOpacity as CrownPress,
    SafeAreaView as CrownSafe,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TwoLandsGoldMumiButton from '../TwoLandsCrownDialoguesComponents/TwoLandsGoldMumiButton';
import { fonts as crownFonts } from '../fonts';

type CrownHomeProps = {
    landsPageNow: string;
    setLandsPageNow: (next: string | { screen: string; initialSelectedCase?: number }) => void;
};

const TwoLandsCrownHomeDialoguesPage: React.FC<CrownHomeProps> = ({ setLandsPageNow }) => {
    const { width: winW, height: winH } = CrownDims.get('window');
    const [crowns, setCrowns] = useState(0);

    useEffect(() => {
        (async () => {
            const storedCrowns = await AsyncStorage.getItem('twoLandsCrowns');
            if (storedCrowns) setCrowns(Number(storedCrowns));
        })();
    }, []);

    const navButtons = [
        { label: 'START DIALOGUE', screen: 'Two Lands Crown Dialogues Page' },
        { label: 'SCROLLS', screen: 'Two Lands Crown Scrolls Dialogues Page' },
    ];

    return (
        <CrownSafe style={{ flex: 1 }}>
            {/* Верхній бар */}
            <CrownBox
                style={{
                    alignSelf: 'center',
                    width: winW * 0.91,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <CrownBg
                    source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')}
                    resizeMode="stretch"
                    style={{
                        flexDirection: 'row',
                        height: winH * 0.07,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: winW * 0.35,
                    }}
                >
                    <CrownTxt
                        style={{
                            marginRight: winW * 0.02,
                            color: '#F0B16D',
                            fontSize: winW * 0.07,
                            fontFamily: crownFonts.twoLandsPoppinsBold,
                        }}
                    >
                        👑 {crowns}
                    </CrownTxt>
                </CrownBg>

                <CrownPress onPress={() => setLandsPageNow('Two Lands Crown Profile Dialogues Page')}>
                    <CrownImg
                        source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsProfile.png')}
                        style={{ width: winH * 0.07, height: winH * 0.07 }}
                    />
                </CrownPress>
            </CrownBox>

            {/* Кнопки меню */}
            <CrownBox
                style={{
                    bottom: winH * 0.01,
                    position: 'absolute',
                    alignSelf: 'center',
                    alignItems: 'center',
                }}
            >
                {navButtons.map((btn) => (
                    <TwoLandsGoldMumiButton
                        twoLandsMumiBtnHeight={winH * 0.08}
                        onPress={() => setLandsPageNow(btn.screen)}
                        fontSize={winW * 0.036}
                        color="yellow"
                        twoLandsMumiTxtBtn={btn.label}
                        twoLandsMumiBtnWidth={winW * 0.91}
                        style={{ marginBottom: winH * 0.02 }}
                        key={btn.label}
                    />
                ))}
            </CrownBox>
        </CrownSafe>
    );
};

export default TwoLandsCrownHomeDialoguesPage;
