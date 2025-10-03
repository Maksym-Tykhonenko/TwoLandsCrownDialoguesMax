import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {
    useLayoutEffect as useCrownLayoutEff,
    useRef as useCrownRef,
    useEffect as useCrownEff,
} from 'react';

import {
    Animated,
    ImageBackground as CrownBg,
    View as CrownBox,
    Dimensions as CrownDims,
} from 'react-native';
import { useNavigation as useCrownNav } from '@react-navigation/native';

const ONBOARD_KEY_CROWN = 'twoLands_onboard';

const TwoLandsCrownDialoguesLoading: React.FC = () => {
    const { width: twoLandsWid, height: twoLandsHei } = CrownDims.get('window');
    const navigation = useCrownNav();

    // refs для анімацій точок
    const dotAnim1 = useCrownRef(new Animated.Value(0)).current;
    const dotAnim2 = useCrownRef(new Animated.Value(0)).current;
    const dotAnim3 = useCrownRef(new Animated.Value(0)).current;
    const dotAnim4 = useCrownRef(new Animated.Value(0)).current;
    const dotAnim5 = useCrownRef(new Animated.Value(0)).current;

    useCrownEff(() => {
        const bounceAnim = (val: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(val, {
                        toValue: -20,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(val, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.delay(1200 - delay),
                ])
            );

        const anims = [
            bounceAnim(dotAnim1, 0),
            bounceAnim(dotAnim2, 150),
            bounceAnim(dotAnim3, 300),
            bounceAnim(dotAnim4, 450),
            bounceAnim(dotAnim5, 600),
        ];

        anims.forEach(a => a.start());
        return () => anims.forEach(a => a.stop());
    }, []);

    const renderDot = (animVal: Animated.Value) => (
        <Animated.View
            style={{
                borderRadius: 6,
                height: 12,
                marginHorizontal: 8,
                width: 12,
                backgroundColor: '#fff',
                transform: [{ translateY: animVal }],
            }}
        />
    );

    useCrownLayoutEff(() => {
        let goOnboarding = false;
        let goRegister = false;

        const init = async () => {
            try {
                const [flagOnboard, user] = await Promise.all([
                    AsyncStorage.getItem(ONBOARD_KEY_CROWN),
                    AsyncStorage.getItem('twoLandsUser'),
                ]);

                if (!flagOnboard && !user) {
                    goOnboarding = true;
                    await AsyncStorage.setItem(ONBOARD_KEY_CROWN, 'true');
                } else if (flagOnboard && !user) {
                    goRegister = true;
                }
            } catch (err) {
                if (__DEV__) console.warn('TwoLandsCrownDialoguesLoading error:', err);
            }

            //setTimeout(() => {
            //    navigation.replace(
            //        goOnboarding
            //            ? 'TwoLandsCrownDialoguesOnboarding'
            //            : 'TwoLandsCrownRootDialogues'
            //    );
            //}, 2537);
        };

        init();
    }, [navigation]);

    return (
        <CrownBox style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CrownBg
                source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsLoading.png')}
                style={{
                    zIndex: -1,
                    width: twoLandsWid,
                    height: twoLandsHei,
                    position: 'absolute',
                    alignSelf: 'center',
                }}
                resizeMode="cover"
            />
            <CrownBox
                style={{
                    justifyContent: 'center',
                    bottom: 80,
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                }}
            >
                {renderDot(dotAnim1)}
                {renderDot(dotAnim2)}
                {renderDot(dotAnim3)}
                {renderDot(dotAnim4)}
                {renderDot(dotAnim5)}
            </CrownBox>
        </CrownBox>
    );
};

export default TwoLandsCrownDialoguesLoading;
