import {
    TouchableOpacity as GoldPress,
    GestureResponderEvent,
    ImageBackground as GoldBg,
    Text as GoldTxt,
} from 'react-native';
import React from 'react';

interface TwoLandsBtnProps {
    fontSize?: number;
    onPress: (e: GestureResponderEvent) => void;
    style?: object;
    addictedFontStyle?: object;
    twoLandsMumiBtnWidth?: number;
    twoLandsMumiTxtBtn?: string;
    content?: React.ReactNode;
    twoLandsMumiBtnHeight?: number;
    color?: 'yellow' | 'red';
}

const TwoLandsGoldMumiButton: React.FC<TwoLandsBtnProps> = ({
    style,
    addictedFontStyle = {},
    twoLandsMumiBtnWidth,
    fontSize,
    twoLandsMumiTxtBtn,
    twoLandsMumiBtnHeight,
    content,
    onPress,
    color
}) => {
    const marginTop = twoLandsMumiBtnHeight ? twoLandsMumiBtnHeight * 0.016 : 0;

    return (
        <GoldPress
            onPress={onPress}
            activeOpacity={0.8}
            style={[{ margin: marginTop }, style]}
        >
            <GoldBg
                source={color !== null && color === 'red' 
                    ? require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')
                    : require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImg.png')}
                resizeMode="stretch"
                style={{
                    width: twoLandsMumiBtnWidth,
                    height: twoLandsMumiBtnHeight,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {content ? (
                    content
                ) : (
                    <GoldTxt
                        style={[
                            {
                                fontSize: fontSize ? fontSize * 1.590345 : 16,
                                fontWeight: '700',
                                color: color !== null && color === 'red' ? '#F0B16D' : '#572E18',
                                textAlign: 'center',
                            },
                            addictedFontStyle,
                        ]}
                    >
                        {twoLandsMumiTxtBtn}
                    </GoldTxt>
                )}
            </GoldBg>
        </GoldPress>
    );
};

export default TwoLandsGoldMumiButton;
