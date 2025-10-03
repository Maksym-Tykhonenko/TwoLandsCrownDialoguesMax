import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    useState as useRootDialoguesState,
    useEffect as useRootDialoguesEffect,
} from 'react';
import {
    Image as RootDialoguesImg,
    Platform as RootDialoguesPlatform,
    Dimensions as RootDialoguesDims,
    View as RootDialoguesBox,
} from 'react-native';

// --- Типи екранів ---
type RootDialoguesScreens =
    | 'Two Lands Crown Home Dialogues'
    | 'Two Lands Crown Profile Dialogues Page'
    | 'Two Lands Crown Scrolls Dialogues Page'
    | 'Two Lands Crown Dialogues Page'
    | 'Two Lands Crown Settings Dialogues';

import TwoLandsCrownProfileDialoguesPage from './TwoLandsCrownProfileDialoguesPage';
import TwoLandsCrownScrollsDialoguesPage from './TwoLandsCrownScrollsDialoguesPage';
import TwoLandsCrownDialoguesPage from './TwoLandsCrownDialoguesPage';
import TwoLandsCrownHomeDialoguesPage from './TwoLandsCrownHomeDialoguesPage';

// --- Головний компонент ---
const TwoLandsCrownRootDialogues: React.FC = () => {
    const [rootDialoguesDims, setRootDialoguesDims] = useRootDialoguesState(RootDialoguesDims.get('window'));
    const [rootDialoguesScreen, setRootDialoguesScreen] = useRootDialoguesState<RootDialoguesScreens>('Two Lands Crown Home Dialogues');

    // Ініціалізація AsyncStorage
    useRootDialoguesEffect(() => {
        const initMusicSetting = async () => {
            let value = await AsyncStorage.getItem('musicEnabled');
            if (value === null) {
                await AsyncStorage.setItem('musicEnabled', 'true');
                value = 'true';
            }
        };
        initMusicSetting();
    }, []);

    // Рендер екранів
    const renderRootDialoguesScreens = () => {
        switch (rootDialoguesScreen) {
            case 'Two Lands Crown Home Dialogues':
                return (
                    <TwoLandsCrownHomeDialoguesPage setLandsPageNow={setRootDialoguesScreen} />
                );
            case 'Two Lands Crown Profile Dialogues Page':
                return (
                    <TwoLandsCrownProfileDialoguesPage setLandsPageNow={setRootDialoguesScreen} />
                );
            case 'Two Lands Crown Scrolls Dialogues Page':
                return (
                    <TwoLandsCrownScrollsDialoguesPage setLandsPageNow={setRootDialoguesScreen} />
                );
            case 'Two Lands Crown Dialogues Page':
                return (
                    <TwoLandsCrownDialoguesPage setLandsPageNow={setRootDialoguesScreen} />
                );
            default:
                return null;
        }
    };

    return (
        <RootDialoguesBox
            style={{
                width: rootDialoguesDims.width,
                backgroundColor: '#00124C',
                flex: 1,
                height: rootDialoguesDims.height,
            }}
        >
            <RootDialoguesImg
                source={
                    rootDialoguesScreen === 'Two Lands Crown Home Dialogues'
                        ? require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsOnlyPrevBg.png')
                        : require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsGameBg.png')
                }
                style={{
                    left: 0,
                    height: rootDialoguesDims.height,
                    top: 0,
                    position: 'absolute',
                    width: rootDialoguesDims.width,
                    zIndex: 0,
                }}
            />
            {RootDialoguesPlatform.OS === 'android' && (
                    <RootDialoguesBox style={{ paddingTop: rootDialoguesDims.height * 0.03050345 }} />
                )}
            {renderRootDialoguesScreens()}
        </RootDialoguesBox>
    );
};

export default TwoLandsCrownRootDialogues;