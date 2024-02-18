import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useMessageContext } from 'stream-chat-expo';
import { Audio } from 'expo-av';
import AppButton from '../../component/AppButton';
import { RFPercentage } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    loadingIndicatorContainer: {
      padding: 7,
    },
    container: {
      padding: 5,
      width: 250,
    },
    audioPlayerContainer: {flexDirection: 'row', alignItems: 'center'},
    progressDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressDetailsText: {
      paddingHorizontal: 5,
      color: 'grey',
      fontSize: 10,
    },
    progressIndicatorContainer: {
      flex: 1,
      backgroundColor: '#e2e2e2',
    },
    progressLine: {
      borderWidth: 1,
      borderColor: 'black',
    },
  });

export const VoiceMessageAttachment = ({ audio_length, asset_url, type }) => {
  const { message } = useMessageContext();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(audio_length);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(audio_length);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: asset_url },
      { shouldPlay: true }
    );
    setSound(sound);
    setIsLoading(false);
  };

  const onStartPlay = async () => {
    setIsLoading(true);
    await loadSound();
    setIsPlaying(true);
  };

  const onPausePlay = async () => {
    await sound.pauseAsync();
    setIsPlaying(false);
  };

  const onStopPlay = async () => {
    await sound.stopAsync();
    setIsPlaying(false);
    setCurrentPositionSec(0);
    setPlayTime(0);
  };

  if (type !== 'voice-message') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.audioPlayerContainer}>
        {isLoading ? (
          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator size="small" />
          </View>
        ) : isPlaying ? (
          <AppButton title={'Pause'}  textStyle={{fontSize:RFPercentage(1.5)}} onPress={onPausePlay} />
        ) : (
          <AppButton title={'Start'} textStyle={{fontSize:RFPercentage(1.5)}}  onPress={onStartPlay} />
        )}
        <View style={styles.progressIndicatorContainer}>
          <View
            style={[
              styles.progressLine,
              {
                width: `${(currentPositionSec / currentDurationSec) *  100}%`,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.progressDetailsContainer}>
        <Text style={styles.progressDetailsText}>Progress: {playTime}</Text>
        <Text style={styles.progressDetailsText}>Duration: {duration}</Text>
      </View>
    </View>
  );
};
