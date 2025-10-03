import React, { useState as useCrownState } from 'react';
import {
    View as CrownBox,
    Dimensions as CrownDims,
    TouchableOpacity as TwoLandsPress,
    Image as CrownImg,
} from 'react-native';
import TwoLandsCrownDialoguesButton from '../TwoLandsCrownDialoguesComponents/TwoLandsGoldMumiButton';
import { useNavigation as useCrownNav } from '@react-navigation/native';

const crownSlides = [
    require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsOnboardings/twoLand1.png'),
    require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsOnboardings/twoLand2.png'),
    require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsOnboardings/twoLand3.png'),
    require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsOnboardings/twoLand4.png'),
];

const TwoLandsCrownDialoguesOnboarding: React.FC = () => {
    const { width: twoLandsWid, height: twoLandsHei } = CrownDims.get('window');
    const navigation = useCrownNav();
    const [currentSlide, setCurrentSlide] = useCrownState(0);
    

    const goNext = () => {
        if (currentSlide < crownSlides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigation.replace?.('TwoLandsCrownRootDialogues');
        }
    };

    const SlideScreen = () => {
        const slideImg = crownSlides[currentSlide];
        return (
            <>
                <TwoLandsPress style={{
                    position: 'absolute',
                    top: twoLandsHei * 0.1,
                    right: twoLandsWid * 0.05,
                    zIndex: 10
                }} onPress={() => navigation.replace?.('TwoLandsCrownRootDialogues')}>
                    <CrownImg 
                        source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsClose.png')}
                        style={{ width: twoLandsHei * 0.07, height: twoLandsHei * 0.07,  }}
                        resizeMode='contain'
                    />
                </TwoLandsPress>
                <CrownImg
                    style={{ width: twoLandsWid, height: twoLandsHei, zIndex: 0 }}
                    resizeMode="cover"
                    source={slideImg}
                />
                <TwoLandsCrownDialoguesButton
                    twoLandsMumiTxtBtn="Next"
                    twoLandsMumiBtnWidth={twoLandsWid * 0.91}
                    fontSize={twoLandsWid * 0.04}
                    onPress={goNext}
                    twoLandsMumiBtnHeight={twoLandsHei * 0.08}
                    style={{
                        alignSelf: 'center',
                        bottom: twoLandsHei * 0.0280472384,
                        position: 'absolute',
                    }}
                />
            </>
        );
    };

    return (
        <CrownBox style={{ flex: 1, alignItems: 'center' }}>
            <SlideScreen />
        </CrownBox>
    );
};

export default TwoLandsCrownDialoguesOnboarding;
