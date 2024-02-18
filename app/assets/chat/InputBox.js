import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AttachButton,
  SendButton,
  useChatContext,
  useMessageInputContext,
  useMessagesContext,
  ImageUploadPreview,
  FileUploadPreview,
  AutoCompleteInput,
  useChannelContext,
} from 'stream-chat-expo';
import { Audio } from 'expo-av';

import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

import * as Permissions from 'expo-permissions';
import { Colors } from '../../constant/styles';

export const InputBox = () => {
  const { client } = useChatContext();
  const { text, giphyActive, imageUploads, fileUploads, toggleAttachmentPicker } = useMessageInputContext();
  const { updateMessage } = useMessagesContext();
  const { channel } = useChannelContext();

  const [recordingActive, setRecordingActive] = useState(false);
  const [recording, setRecording] = useState(null);

  async function requestAudioPermissions() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Permission to access audio recording was denied');
    }
  }
  useEffect(()=>{

    requestAudioPermissions()
  },[])
  const sendVoiceMessage = async () => {
    if (!recording) return;
  
    try {
      // Stop the recording and get the URI
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const duration =   0; // Placeholder value for duration
  
      // Upload the file to Stream Chat.
      const res = await channel.sendFile(uri, 'voice_message.mp3', 'audio/mp3');
      const message = {
        // Do not set created_at manually
        attachments: [
          {
            asset_url: res.file,
            file_size:   200, // You may need to calculate the actual file size.
            mime_type: 'audio/mp3',
            title: 'voice_message.mp3',
            type: 'voice-message',
            audio_length: duration, // Use the placeholder duration
          },
        ],
        mentioned_users: [],
        id: `random-id-${new Date().toTimeString()}`,
        status: 'sending',
        type: 'regular',
        user: client.user,
      };
  
      // Add the message optimistically to local state first.
      updateMessage(message);
  
      // Send the message on channel.
      await channel.sendMessage(message);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };
  
  
  
  const onStartRecord = async () => {
    setRecordingActive(true);

    const recordingObject = new Audio.Recording();
    await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recordingObject.startAsync();
    setRecording(recordingObject);
  };

  const onStopRecord = async () => {
    setRecordingActive(false);

    await sendVoiceMessage();
    setRecording(null);
  };

  const emptyInput = !text && !imageUploads.length && !fileUploads.length && !giphyActive;

  return (
    <View style={styles.fullWidth}>
      <ImageUploadPreview />
      <FileUploadPreview />
      <View style={[styles.fullWidth, styles.row, styles.inputContainer]}>
        {!recordingActive ? (
          <View style={[styles.flex, styles.row]}>
            <AttachButton handleOnPress={toggleAttachmentPicker} />
            <View style={styles.autoCompleteInputContainer}>
              <AutoCompleteInput />
            </View>
          </View>
        ) : (
          <View style={styles.flex}>
            <Text style={{color:Colors.primaryColor}}>Recording Voice</Text>
          </View>
        )}
        {emptyInput ? (
          <TouchableOpacity
            onLongPress={onStartRecord}
            onPressOut={onStopRecord}>
        <Ionicons name="mic" size={22} color="grey" />
          </TouchableOpacity>
        ) : (
          <SendButton />
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    flex: {flex: 1},
    fullWidth: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      height: 40,
    },
    autoCompleteInputContainer: {
      marginHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'center',
    },
  });
  