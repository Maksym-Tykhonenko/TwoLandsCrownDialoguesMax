import React, { useState as useTwoLandsDlgState, useEffect as useTwoLandsDlgEffect } from 'react';
import {
    Linking,
    Share,
    Alert,
    SafeAreaView as TwoLandsDlgSafe,
    Image as TwoLandsDlgImg,
    Text as TwoLandsDlgTxt,
    TouchableOpacity as TwoLandsDlgPress,
    ImageBackground as TwoLandsDlgBg,
    ScrollView,
    View as TwoLandsDlgBox,
    TextInput as TwoLandsDlgInput,
    Dimensions as TwoLandsDlgDims,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import twoLandsCrownScrolls from '../TwoLandsCrownDialoguesData/twoLandsCrownScrolls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TwoLandsGoldMumiButton from '../TwoLandsCrownDialoguesComponents/TwoLandsGoldMumiButton';
import { fonts as twoLandsDlgFonts } from '../fonts';
import { LinearGradient } from 'react-native-linear-gradient';


type TwoLandsDlgScrollProps = {
    setLandsPageNow: (next: string | { screen: string; initialSelectedCase?: number }) => void;
    landsPageNow: string;
};

const TwoLandsCrownProfileDialoguesPage: React.FC<TwoLandsDlgScrollProps> = ({ setLandsPageNow }) => {
    const { width: twoLandsDlgW, height: twoLandsDlgH } = TwoLandsDlgDims.get('window');
    const [isTwoAboutOpen, setIsTwoAboutOpen] = useTwoLandsDlgState(false);

    const profileImages = [
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profile1.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profile2.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profile3.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profile4.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profile5.png'),
    ];

    const editImage = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profileEdit.png');
    const checkImage = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profileCheck.png');
    const resetImage = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/profileReset.png');

    const [currentProfileIdx, setCurrentProfileIdx] = useTwoLandsDlgState(0);
    const [profileName, setProfileName] = useTwoLandsDlgState('Your nickname');
    const [musicOn, setMusicOn] = useTwoLandsDlgState(true);
    const [isEditingName, setIsEditingName] = useTwoLandsDlgState(false);
    const [inputName, setInputName] = useTwoLandsDlgState(profileName);

    // Load nickname and profile index from AsyncStorage on mount
    useTwoLandsDlgEffect(() => {
        (async () => {
            const storedName = await AsyncStorage.getItem('profileName');
            if (storedName) {
                setProfileName(storedName);
                setInputName(storedName);
            }
            const storedIdx = await AsyncStorage.getItem('profileIdx');
            if (storedIdx !== null) {
                setCurrentProfileIdx(Number(storedIdx));
            }
        })();
    }, []);

    // Save nickname to AsyncStorage
    const saveProfileName = async (name: string) => {
        setProfileName(name);
        setInputName(name);
        setIsEditingName(false);
        await AsyncStorage.setItem('profileName', name);
    };

    // Save profile index to AsyncStorage
    const saveProfileIdx = async (idx: number) => {
        setCurrentProfileIdx(idx);
        await AsyncStorage.setItem('profileIdx', String(idx));
    };

    const shopBackgrounds = [
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/shopBg1.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/shopBg2.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/shopBg3.png'),
        require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/shopBg4.png'),
    ];


    const [isShopOpen, setIsShopOpen] = useTwoLandsDlgState(false);
    const [shopIdx, setShopIdx] = useTwoLandsDlgState(0);
    const [crowns, setCrowns] = useTwoLandsDlgState(0);
    const [unlocked, setUnlocked] = useTwoLandsDlgState([false, false, false, false]);

    useTwoLandsDlgEffect(() => {
        (async () => {
            const storedCrowns = await AsyncStorage.getItem('twoLandsCrowns');
            if (storedCrowns) setCrowns(Number(storedCrowns));
            const storedUnlocked = await AsyncStorage.getItem('shopUnlocked');
            if (storedUnlocked) setUnlocked(JSON.parse(storedUnlocked));
        })();
    }, []);

    const handleUnlock = async () => {
        if (crowns < 15) {
            Alert.alert('Not enough crowns', 'You do not have enough crowns to unlock this background.');
            return;
        }
        if (!unlocked[shopIdx]) {
            const newCrowns = crowns - 15;
            const newUnlocked = unlocked.slice();
            newUnlocked[shopIdx] = true;
            setCrowns(newCrowns);
            setUnlocked(newUnlocked);
            await AsyncStorage.setItem('twoLandsCrowns', String(newCrowns));
            await AsyncStorage.setItem('shopUnlocked', JSON.stringify(newUnlocked));
            // Add to owned backgrounds
            let owned = [];
            try {
                const ownedRaw = await AsyncStorage.getItem('ownedTwoLandsEkrans');
                if (ownedRaw) owned = JSON.parse(ownedRaw);
            } catch { }
            if (!owned.includes(shopIdx)) {
                owned.push(shopIdx);
                await AsyncStorage.setItem('ownedTwoLandsEkrans', JSON.stringify(owned));
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <TwoLandsDlgSafe style={{ flex: 1 }}>
                {/* Header */}
                <TwoLandsDlgBox
                    style={{
                        marginTop: twoLandsDlgH * 0.02,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: twoLandsDlgH * 0.03,
                        position: 'relative',
                    }}
                >
                    {/* Back */}
                    <TwoLandsDlgPress
                        onPress={() => {
                            if (isShopOpen) setIsShopOpen(false);
                            else if (isTwoAboutOpen) setIsTwoAboutOpen(false);
                            else setLandsPageNow('Two Lands Crown Home Dialogues');
                        }}
                    >
                        <TwoLandsDlgImg
                            source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBackArrow.png')}
                            style={{ width: twoLandsDlgH * 0.064, height: twoLandsDlgH * 0.064 }}
                            resizeMode="contain"
                        />
                    </TwoLandsDlgPress>

                    {/* Title */}
                    <TwoLandsDlgBg
                        source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')}
                        style={{
                            alignItems: 'center',
                            height: twoLandsDlgH * 0.07,
                            width: isShopOpen ? twoLandsDlgW * 0.55 : twoLandsDlgW * 0.8,
                            justifyContent: 'center',
                        }}
                        resizeMode="stretch"
                    >
                        <TwoLandsDlgTxt
                            style={{
                                color: '#F0B16D',
                                fontSize: twoLandsDlgW * 0.05,
                                fontFamily: twoLandsDlgFonts.twoLandsPoppinsBold,
                                textAlign: 'center',
                            }}
                        >
                            {isShopOpen ? 'ADORNMENTS' : 'CARTOUCHE'}
                        </TwoLandsDlgTxt>
                    </TwoLandsDlgBg>
                    {isShopOpen && (
                        <TwoLandsDlgBg
                            source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')}
                            style={{
                                alignItems: 'center',
                                height: twoLandsDlgH * 0.07,
                                width: twoLandsDlgW * 0.18,
                                justifyContent: 'center',
                                marginLeft: twoLandsDlgW * 0.03
                            }}
                            resizeMode="stretch"
                        >
                            <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TwoLandsDlgTxt
                                    style={{
                                        color: '#F0B16D',
                                        fontSize: twoLandsDlgW * 0.05,
                                        fontFamily: twoLandsDlgFonts.twoLandsPoppinsBold,
                                    }}
                                >
                                    👑 {crowns}
                                </TwoLandsDlgTxt>
                            </TwoLandsDlgBox>
                        </TwoLandsDlgBg>
                    )}
                </TwoLandsDlgBox>

                {/* Content */}
                {isShopOpen ? (
                    // SHOP SCREEN replaces all content
                    <TwoLandsDlgBox style={{ flex: 1,}}>

                        {/* Main card */}
                        <TwoLandsDlgBox style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <LinearGradient
                                colors={['#73001E', '#C90032', '#FF5757']}
                                style={{
                                    width: twoLandsDlgW * 0.88,
                                    height: twoLandsDlgH * 0.62,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: twoLandsDlgW * 0.06,
                                }}
                            >
                                <TwoLandsDlgImg
                                    source={shopBackgrounds[shopIdx]}
                                    style={{
                                        width: twoLandsDlgW * 0.7,
                                        height: twoLandsDlgH * 0.38,
                                        borderRadius: twoLandsDlgW * 0.04,
                                        marginTop: twoLandsDlgH * 0.04,
                                        marginBottom: twoLandsDlgH * 0.03,
                                    }}
                                    resizeMode="cover"
                                />
                                {/* Price */}
                                {!unlocked[shopIdx] && (
                                    <TwoLandsDlgBg
                                        source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBtnImgRed.png')}
                                        style={{
                                            width: twoLandsDlgW * 0.28,
                                            height: twoLandsDlgH * 0.06,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: twoLandsDlgH * 0.01,
                                        }}
                                        resizeMode="stretch"
                                    >
                                        <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <TwoLandsDlgTxt
                                                style={{
                                                    color: '#F0B16D',
                                                    fontSize: twoLandsDlgW * 0.05,
                                                    fontFamily: twoLandsDlgFonts.twoLandsPoppinsBold,
                                                }}
                                            >
                                                👑 15
                                            </TwoLandsDlgTxt>
                                        </TwoLandsDlgBox>
                                    </TwoLandsDlgBg>
                                )}
                                {/* Unlock button */}
                                {!unlocked[shopIdx] ? (
                                    <TwoLandsGoldMumiButton
                                        twoLandsMumiTxtBtn="UNLOCK"
                                        twoLandsMumiBtnWidth={twoLandsDlgW * 0.6}
                                        fontSize={twoLandsDlgW * 0.045}
                                        onPress={handleUnlock}
                                        twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                        style={{
                                            alignSelf: 'center',
                                            marginTop: twoLandsDlgH * 0.01,
                                        }}
                                        color="yellow"
                                    />
                                ) : (
                                    <TwoLandsGoldMumiButton
                                        twoLandsMumiTxtBtn="UNLOCKED"
                                        twoLandsMumiBtnWidth={twoLandsDlgW * 0.6}
                                        fontSize={twoLandsDlgW * 0.045}
                                        onPress={() => { }}
                                        twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                        style={{
                                            alignSelf: 'center',
                                            marginTop: twoLandsDlgH * 0.01,
                                        }}
                                        color="yellow"
                                    />
                                )}
                            </LinearGradient>
                        </TwoLandsDlgBox>

                        {/* Navigation arrows and dots */}
                        <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: twoLandsDlgH * 0.04 }}>
                            <TwoLandsDlgPress onPress={() => setShopIdx((shopIdx - 1 + shopBackgrounds.length) % shopBackgrounds.length)}>
                                <TwoLandsDlgImg
                                    source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/twoLandsBackArrow.png')}
                                    style={{ width: twoLandsDlgW * 0.09, height: twoLandsDlgW * 0.09 }}
                                    resizeMode="contain"
                                />
                            </TwoLandsDlgPress>
                            <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: twoLandsDlgW * 0.04 }}>
                                {shopBackgrounds.map((_, idx) => (
                                    <TwoLandsDlgBox
                                        key={idx}
                                        style={{
                                            width: twoLandsDlgW * 0.022,
                                            height: twoLandsDlgW * 0.022,
                                            borderRadius: twoLandsDlgW * 0.011,
                                            backgroundColor: shopIdx === idx ? '#F6D233' : '#7B1B13',
                                            marginHorizontal: twoLandsDlgW * 0.01,
                                        }}
                                    />
                                ))}
                            </TwoLandsDlgBox>
                            <TwoLandsDlgPress onPress={() => setShopIdx((shopIdx + 1) % shopBackgrounds.length)}>
                                <TwoLandsDlgImg
                                    source={require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/shopArrowRight.png')}
                                    style={{ width: twoLandsDlgW * 0.09, height: twoLandsDlgW * 0.09 }}
                                    resizeMode="contain"
                                />
                            </TwoLandsDlgPress>
                        </TwoLandsDlgBox>
                    </TwoLandsDlgBox>
                ) : !isTwoAboutOpen ? (
                    <TwoLandsDlgBox style={{ flex: 1 }}>
                        {/* Large profile image */}
                        <TwoLandsDlgBox style={{ alignItems: 'center', marginTop: twoLandsDlgH * 0.01 }}>
                            <TwoLandsDlgImg
                                source={profileImages[currentProfileIdx]}
                                style={{
                                    marginBottom: twoLandsDlgH * 0.02,
                                    height: twoLandsDlgW * 0.38,
                                    borderColor: '#F6D233',
                                    borderRadius: twoLandsDlgW * 0.19,
                                    borderWidth: 3,
                                    width: twoLandsDlgW * 0.38,
                                }}
                                resizeMode="cover"
                            />
                            {/* Profile selection row */}
                            <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: twoLandsDlgH * 0.02 }}>
                                {profileImages.map((img, idx) => (
                                    <TwoLandsDlgPress key={idx} onPress={() => saveProfileIdx(idx)}>
                                        <TwoLandsDlgImg
                                            source={img}
                                            style={{
                                                marginHorizontal: twoLandsDlgW * 0.01,
                                                borderColor: currentProfileIdx === idx ? '#F6D233' : 'transparent',
                                                width: twoLandsDlgW * 0.13,
                                                borderRadius: twoLandsDlgW * 0.065,
                                                borderWidth: currentProfileIdx === idx ? 2 : 0,
                                                height: twoLandsDlgW * 0.13,
                                            }}
                                            resizeMode="cover"
                                        />
                                    </TwoLandsDlgPress>
                                ))}
                            </TwoLandsDlgBox>
                        </TwoLandsDlgBox>

                        {/* Name field and edit/check button */}
                        <TwoLandsDlgBox style={{ flexDirection: 'row', alignItems: 'center', marginBottom: twoLandsDlgH * 0.03, width: twoLandsDlgW * 0.88, alignSelf: 'center' }}>
                            <TwoLandsDlgBox
                                style={{
                                    borderWidth: twoLandsDlgW * 0.003,
                                    borderRadius: twoLandsDlgW * 0.01,
                                    paddingHorizontal: twoLandsDlgW * 0.03,
                                    borderColor: '#F6D233',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    height: twoLandsDlgH * 0.07,
                                    minWidth: twoLandsDlgW * 0.5,
                                    flex: 1,
                                    backgroundColor: '#7B1B13',
                                }}
                            >
                                {isEditingName ? (
                                    <TwoLandsDlgInput
                                        autoFocus
                                        onChangeText={setInputName}
                                        style={{
                                            color: '#F0B16D',
                                            fontSize: twoLandsDlgW * 0.05,
                                            fontFamily: twoLandsDlgFonts.twoLandsPoppinsMedium,
                                            width: '100%',
                                        }}
                                        returnKeyType="done"
                                        placeholderTextColor="#F0B16D"
                                        value={inputName}
                                        onSubmitEditing={() => saveProfileName(inputName)}
                                        placeholder="Your nickname"
                                    />
                                ) : (
                                    <TwoLandsDlgTxt
                                        style={{
                                            color: '#F0B16D',
                                            fontSize: twoLandsDlgW * 0.05,
                                            fontFamily: twoLandsDlgFonts.twoLandsPoppinsMedium,
                                        }}
                                    >
                                        {profileName}
                                    </TwoLandsDlgTxt>
                                )}
                            </TwoLandsDlgBox>
                            <TwoLandsDlgPress
                                style={{ marginLeft: twoLandsDlgW * 0.03 }}
                                onPress={() => {
                                    if (isEditingName) {
                                        saveProfileName(inputName);
                                    } else {
                                        setIsEditingName(true);
                                    }
                                }}
                            >
                                <TwoLandsDlgImg
                                    source={isEditingName ? checkImage : editImage}
                                    style={{
                                        width: twoLandsDlgH * 0.075,
                                        height: twoLandsDlgH * 0.075,
                                    }}
                                    resizeMode="contain"
                                />
                            </TwoLandsDlgPress>
                        </TwoLandsDlgBox>

                        {/* ABOUT button */}
                        <TwoLandsDlgBox style={{ width: '100%', marginBottom: twoLandsDlgH * 0.02 }}>
                            <TwoLandsGoldMumiButton
                                twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                fontSize={twoLandsDlgW * 0.04}
                                twoLandsMumiBtnWidth={twoLandsDlgW * 0.91}
                                twoLandsMumiTxtBtn="ABOUT"
                                style={{
                                    alignSelf: 'center',
                                }}
                                color="red"
                                onPress={() => setIsTwoAboutOpen(true)}
                            />
                        </TwoLandsDlgBox>

                        {/* RESET button */}
                        <TwoLandsDlgBox style={{ width: '100%', marginBottom: twoLandsDlgH * 0.02 }}>
                            <TwoLandsGoldMumiButton
                                twoLandsMumiBtnWidth={twoLandsDlgW * 0.91}
                                fontSize={twoLandsDlgW * 0.04}
                                twoLandsMumiTxtBtn="RESET"
                                onPress={() => {
                                    Alert.alert(
                                        'Reset App Data',
                                        'Are you sure you want to clear all app data?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Yes',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    await AsyncStorage.clear();
                                                    setProfileName('Your nickname');
                                                    setInputName('Your nickname');
                                                    setCurrentProfileIdx(0);
                                                    setMusicOn(true);
                                                },
                                            },
                                        ]
                                    );
                                }}
                                style={{
                                    alignSelf: 'center',
                                }}
                                twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                color="red"
                            />
                        </TwoLandsDlgBox>

                        {/* PRIVACY POLICY button */}
                        <TwoLandsDlgBox style={{ width: '100%', marginBottom: twoLandsDlgH * 0.02 }}>
                            <TwoLandsGoldMumiButton
                                fontSize={twoLandsDlgW * 0.04}
                                twoLandsMumiBtnWidth={twoLandsDlgW * 0.91}
                                twoLandsMumiTxtBtn="PRIVACY POLICY"
                                onPress={() => {
                                    Linking.openURL('https://www.freeprivacypolicy.com/live/d70d0246-ae7d-4df7-a9f1-d865cdfdbbc0');
                                }}
                                twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                style={{
                                    alignSelf: 'center',
                                }}
                                color="red"
                            />
                        </TwoLandsDlgBox>

                        <TwoLandsDlgBox style={{ width: '100%', marginBottom: twoLandsDlgH * 0.02 }}>
                            <TwoLandsGoldMumiButton
                                fontSize={twoLandsDlgW * 0.04}
                                twoLandsMumiBtnWidth={twoLandsDlgW * 0.91}
                                twoLandsMumiTxtBtn="SHOP"
                                onPress={() => setIsShopOpen(true)}
                                twoLandsMumiBtnHeight={twoLandsDlgH * 0.08}
                                style={{
                                    alignSelf: 'center',
                                }}
                                color="red"
                            />
                        </TwoLandsDlgBox>
                    </TwoLandsDlgBox>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingHorizontal: twoLandsDlgW * 0.04,
                            paddingBottom: twoLandsDlgH * 0.1,
                        }}
                    >
                        <TwoLandsDlgBox
                            style={{
                                width: twoLandsDlgW * 0.95,
                                paddingVertical: twoLandsDlgH * 0.04,
                                borderRadius: twoLandsDlgW * 0.06,
                                paddingHorizontal: twoLandsDlgW * 0.04,
                                marginTop: twoLandsDlgH * 0.01,
                                alignItems: 'center',
                            }}
                        >
                            <TwoLandsDlgTxt
                                style={{
                                    color: '#F0B16D',
                                    fontFamily: twoLandsDlgFonts.twoLandsPoppinsMedium,
                                    fontSize: twoLandsDlgW * 0.044444,
                                    textAlign: 'left',
                                    lineHeight: twoLandsDlgW * 0.055,
                                }}
                            >
                                {`An interactive riddle journey set beneath the desert sky. You speak with a mummy bound to the Double Crown, trading messages about history, myth, and royal lore. Each correct answer breaks the chains on ancient relics, earns tribute to adorn your chat chamber, and opens the way to the next trial.

Unroll scrolls of knowledge along your path—stories of rivers, temples, symbols, and kings—woven into the journeys of the Two Lands. Learn as you play: speak the right names, unlock the right doors, and follow the whisper of the crown deeper into the halls.

Words have power here. Answer wisely, seeker. 🌙📜`}
                            </TwoLandsDlgTxt>
                        </TwoLandsDlgBox>
                    </ScrollView>
                )}
            </TwoLandsDlgSafe>
        </TouchableWithoutFeedback>
    );
};

export default TwoLandsCrownProfileDialoguesPage;
