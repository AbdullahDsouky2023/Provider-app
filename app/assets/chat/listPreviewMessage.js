import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChannelPreviewMessage } from 'stream-chat-expo';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  voiceMessagePreview: {
    flexDirection: 'row',
  },
  voiceMessagePreviewText: {
    marginHorizontal:  5,
    color: 'grey',
    fontSize:  12,
  },
});

export const ListPreviewMessage = ({ latestMessagePreview }) => {
  const latestMessageAttachments =
    latestMessagePreview.messageObject?.attachments;

  if (
    latestMessageAttachments &&
    latestMessageAttachments.length ===  1 &&
    latestMessageAttachments[0].type === 'voice-message'
  ) {
    return (
      <View style={styles.voiceMessagePreview}>
        <Ionicons name="mic" size={15} color="grey" />
        <Text style={styles.voiceMessagePreviewText}>Voice Message</Text>
      </View>
    );
  }

  return <ChannelPreviewMessage latestMessagePreview={latestMessagePreview} />;
};
