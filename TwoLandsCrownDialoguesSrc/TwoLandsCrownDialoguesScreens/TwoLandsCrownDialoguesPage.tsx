import TwoLandsGoldMumiButton from '../TwoLandsCrownDialoguesComponents/TwoLandsGoldMumiButton';
import React, { useState, useRef } from 'react';
import {
    SafeAreaView as CrownSafe,
    Dimensions as CrownDims,
    Image as CrownImg,
    Text as CrownTxt,
    Share,
    TouchableOpacity as CrownPress,
    View as CrownBox,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ImageBackground as CrownBg,
} from 'react-native';
import riddles from '../TwoLandsCrownDialoguesData/riddles';
import answersPool from '../TwoLandsCrownDialoguesData/answers';
import { fonts as crownFonts } from '../fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';


type CrownScrollProps = {
    setLandsPageNow: (next: string | { screen: string; initialSelectedCase?: number }) => void;
    landsPageNow: string;
};

const MUMMY_AVATAR = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/mummyAvatar.png');
const RELIC_CHAINED = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/relicChained.png');
const BOT_BUBBLE_BG = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/bubbleBot.png');
const USER_BUBBLE_BG = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/bubbleUser.png');
const RIGHT_BUBBLE_BG = require('../TwoLandsCrownDialoguesAssets/TwoLandsCrownDialoguesImages/bubbleRight.png');

const initialBotMessages = [
    {
        type: 'bot',
        text: "Seeker... you have stepped into my chamber. I am the voice bound to the Double Crown, and I will test your memory of the Two Lands. Answer true, and the chains of the relics will break. Speak false, and the sands will swallow your words.",
    },
    {
        type: 'bot',
        text: "Are you ready for your first trial?",
    }
];

const TwoLandsCrownDialoguesPage: React.FC<CrownScrollProps> = ({ setLandsPageNow }) => {
    const { width: twoLandsWid, height: twoLandsHei } = CrownDims.get('window');
    const [chat, setChat] = useState<{ type: 'bot' | 'user' | 'wrong' | 'right', text: string }[]>(initialBotMessages);
    const [step, setStep] = useState(0); // riddle index
    const [input, setInput] = useState('');
    const [awaitingAnswer, setAwaitingAnswer] = useState(false);
    const [showRelicBtn, setShowRelicBtn] = useState(false);
    const [twoLandsCrowns, setTwoLandsCrowns] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    // Load crowns on mount
    React.useEffect(() => {
        (async () => {
            const storedCrowns = await AsyncStorage.getItem('twoLandsCrowns');
            if (storedCrowns) setTwoLandsCrowns(Number(storedCrowns));
        })();
    }, []);

    // Start first riddle after "Yes"
    const handleYes = () => {
        setChat(prev => [
            ...prev,
            { type: 'user', text: 'Yes' },
            { type: 'bot', text: riddles[step].question }
        ]);
        setAwaitingAnswer(true);
    };

    // Handle user answer
    const handleSend = async () => {
        if (!input.trim()) return;
        setChat(prev => [...prev, { type: 'user', text: input }]);
        const answer = riddles[step].answer.toLowerCase();
        const userText = input.trim().toLowerCase();
        if (userText.includes(answer)) {
            // Correct answer
            const rightMsg = answersPool.right[Math.floor(Math.random() * answersPool.right.length)];
            setChat(prev => [...prev, { type: 'right', text: rightMsg }]);
            setShowRelicBtn(true);
            setAwaitingAnswer(false);
            // Update crowns
            const newCrowns = twoLandsCrowns + 1;
            setTwoLandsCrowns(newCrowns);
            await AsyncStorage.setItem('twoLandsCrowns', String(newCrowns));
        } else {
            // Wrong answer
            const wrongMsg = answersPool.wrong[Math.floor(Math.random() * answersPool.wrong.length)];
            setChat(prev => [...prev, { type: 'wrong', text: wrongMsg }]);
        }
        setInput('');
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    // Handle relic break and next riddle
    const handleRelicBreak = () => {
        if (step + 1 < riddles.length) {
            setStep(step + 1);
            setChat(prev => [
                ...prev,
                { type: 'bot', text: riddles[step + 1].question }
            ]);
            setShowRelicBtn(false);
            setAwaitingAnswer(true);
        } else {
            setChat(prev => [
                ...prev,
                { type: 'bot', text: "You have solved all the riddles of the Two Lands! The Double Crown is yours." }
            ]);
            setShowRelicBtn(false);
            setAwaitingAnswer(false);
        }
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    // Render chat bubbles
    const renderBubble = (msg: { type: string, text: string }, idx: number) => {
        if (msg.type === 'bot' || msg.type === 'wrong') {
            return (
                <CrownBox key={idx} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: twoLandsHei * 0.01 }}>
                    {idx === 0 && (
                        <CrownImg source={MUMMY_AVATAR} style={{ width: twoLandsWid * 0.12, height: twoLandsHei * 0.12, marginRight: twoLandsWid * 0.02 }} resizeMode='contain'/>
                    )}
                    <CrownBg
                        source={BOT_BUBBLE_BG}
                        resizeMode="stretch"
                        style={{
                            borderRadius: twoLandsWid * 0.03,
                            paddingHorizontal: twoLandsWid * 0.04,
                            paddingVertical: twoLandsHei * 0.023,
                            maxWidth: twoLandsWid * 0.8,
                            justifyContent: 'center',
                        }}
                    >
                        <CrownTxt
                            style={{
                                color: '#F0B16D',
                                fontSize: twoLandsWid * 0.042,
                                fontFamily: crownFonts.twoLandsPoppinsMedium,
                                top: -twoLandsHei * 0.014,
                            }}
                        >
                            {msg.text}
                        </CrownTxt>
                    </CrownBg>
                </CrownBox>
            );
        }
        if (msg.type === 'right') {
            return (
                <CrownBox key={idx} style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: twoLandsHei * 0.01 }}>
                    <CrownBg
                        source={RIGHT_BUBBLE_BG}
                        resizeMode="stretch"
                        style={{
                            borderRadius: twoLandsWid * 0.03,
                            paddingHorizontal: twoLandsWid * 0.04,
                            paddingVertical: twoLandsHei * 0.018,
                            maxWidth: twoLandsWid * 0.8,
                            justifyContent: 'center',
                        }}
                    >
                        <CrownTxt
                            style={{
                                color: '#fff',
                                fontSize: twoLandsWid * 0.042,
                                fontFamily: crownFonts.twoLandsPoppinsMedium,
                            }}
                        >
                            {msg.text}
                        </CrownTxt>
                    </CrownBg>
                </CrownBox>
            );
        }
        if (msg.type === 'user') {
            return (
                <CrownBox key={idx} style={{ alignItems: 'flex-end', marginBottom: twoLandsHei * 0.01 }}>
                    <CrownBg
                        source={USER_BUBBLE_BG}
                        resizeMode="stretch"
                        style={{
                            borderRadius: twoLandsWid * 0.03,
                            paddingHorizontal: twoLandsWid * 0.04,
                            paddingVertical: twoLandsHei * 0.018,
                            maxWidth: twoLandsWid * 0.8,
                            justifyContent: 'center',
                            minWidth: twoLandsWid * 0.35,
                            alignItems: 'center',
                        }}
                    >
                        <CrownTxt
                            style={{
                                color: '#7B1B13',
                                fontSize: twoLandsWid * 0.042,
                                fontFamily: crownFonts.twoLandsPoppinsMedium,
                                top: -twoLandsHei * 0.01,
                            }}
                        >
                            {msg.text}
                        </CrownTxt>
                    </CrownBg>
                </CrownBox>
            );
        }
        return null;
    };

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
                        if (chat.length > 2) {
                            setChat(initialBotMessages);
                            setStep(0);
                            setAwaitingAnswer(false);
                            setShowRelicBtn(false);
                        } else {
                            setLandsPageNow('Two Lands Crown Home Dialogues');
                        }
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
                        flexDirection: 'row',
                        width: chat.length > 2 ? twoLandsWid * 0.64 : twoLandsWid * 0.8,
                        alignItems: 'center',
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
                        MESSAGES
                    </CrownTxt>
                    <CrownTxt
                        style={{
                            fontFamily: crownFonts.twoLandsPoppinsBold,
                            color: '#F0B16D',
                            fontSize: twoLandsWid * 0.05,
                            marginLeft: twoLandsWid * 0.03,
                        }}
                    >
                        👑{twoLandsCrowns}
                    </CrownTxt>
                </CrownBg>

                {chat.length > 2 && (
                    <CrownPress
                        onPress={() => {
                            Share.share({
                                message: `${chat[chat.length - 1].text}\n\n${chat[chat.length - 2].text}`,
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

            {/* Chat */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    ref={scrollRef}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingHorizontal: twoLandsWid * 0.05,
                        paddingBottom: twoLandsHei * 0.1,
                    }}
                    onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                >
                    {chat.map(renderBubble)}
                    {showRelicBtn && (
                        <CrownBox style={{ alignItems: 'center', marginTop: twoLandsHei * 0.02, alignSelf: 'flex-start' }}>
                            <CrownPress onPress={handleRelicBreak}>
                                <CrownImg
                                    source={RELIC_CHAINED}
                                    style={{
                                        height: twoLandsWid * 0.3,
                                        marginBottom: twoLandsHei * 0.01,
                                        width: twoLandsWid * 0.3,
                                    }}
                                    resizeMode="contain"
                                />
                            </CrownPress>
                        </CrownBox>
                    )}
                </ScrollView>
                {/* Input */}
                {awaitingAnswer && (
                    <CrownBox
                        style={{
                            paddingBottom: twoLandsHei * 0.03,
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            paddingHorizontal: twoLandsWid * 0.05,
                            flexDirection: 'row',
                        }}
                    >
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder="Type your answer..."
                            placeholderTextColor="#F0B16D"
                            style={{
                                paddingHorizontal: twoLandsWid * 0.04,
                                backgroundColor: '#7B1B13',
                                paddingVertical: twoLandsHei * 0.018,
                                fontSize: twoLandsWid * 0.045,
                                fontFamily: crownFonts.twoLandsPoppinsMedium,
                                borderRadius: twoLandsWid * 0.02,
                                flex: 1,
                                marginRight: twoLandsWid * 0.03,
                                color: '#F0B16D',
                            }}
                            returnKeyType="send"
                            onSubmitEditing={handleSend}
                        />
                        <TwoLandsGoldMumiButton
                            twoLandsMumiTxtBtn="SEND"
                            twoLandsMumiBtnWidth={twoLandsWid * 0.22}
                            fontSize={twoLandsWid * 0.04}
                            onPress={handleSend}
                            twoLandsMumiBtnHeight={twoLandsHei * 0.07}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                    </CrownBox>
                )}
                {/* First YES button */}
                {!awaitingAnswer && chat.length === 2 && (
                    <TwoLandsGoldMumiButton
                        twoLandsMumiTxtBtn="YES"
                        twoLandsMumiBtnWidth={twoLandsWid * 0.91}
                        fontSize={twoLandsWid * 0.04}
                        onPress={handleYes}
                        twoLandsMumiBtnHeight={twoLandsHei * 0.08}
                        style={{
                            alignSelf: 'center',
                            bottom: twoLandsHei * 0.028,
                            position: 'absolute',
                        }}
                    />
                )}
            </KeyboardAvoidingView>
        </CrownSafe>
    );
};

export default TwoLandsCrownDialoguesPage;
