// import { Audio, RecordingOptionsPresets } from "expo-av";
// import { useEffect, useState } from "react";
// import { TouchableOpacity, StyleSheet,View } from "react-native";
// import { FontAwesome} from '@expo/vector-icons'

// export const InputBox = () => {
// const [isRecording, setIsRecording] = useState(false);
// const [recording, setRecording] = useState(null);
// const [recordingStatus, setRecordingStatus] = useState("idle");
// const [audioPermission, setAudioPermission] = useState(null);
// const [recordedAudio, setRecordedAudio] = useState(null);
// useEffect(() => {
//   async function getPermission() {
//     await Audio.requestPermissionsAsync()
//       .then((permission) => {
//         console.log("Permission Granted: " + permission.granted);
//         setAudioPermission(permission.granted);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   getPermission();
//   return () => {
//     if (recording) {
//       stopRecording();
//     }
//   };
// }, []);
// async function handleRecordButtonPress() {
//   setRecordedAudio(null);
//   setRecording(null);
//   if (recording) {
//     const audioUri = await stopRecording(recording);
//     if (audioUri) {
//       console.log("Saved audio file to", savedUri);
//     }
//   } else {
//     await startRecording();
//   }
// }
// async function startRecording() {
//   setIsRecording(true);
//   setRecording(null);
//   setRecordedAudio(null);

//   // Check if a recording is already in progress
//   if (isRecording) {
//     console.warn("A recording is already in progress");
//     return;
//   }

//   // Check for permissions before starting the recording
//   if (!audioPermission) {
//     console.warn("Audio permission is not granted");
//     return;
//   }
//   try {
//     // needed for IOS, If you develop mainly on IOS device or emulator, 
//     // there will be error if you don't include this.
//     if (audioPermission) {
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });
//     }

//     const newRecording = new Audio.Recording();
//     console.log("Starting Recording");
//     await newRecording.prepareToRecordAsync(
//       Audio.RecordingOptionsPresets.HIGH_QUALITY
//     );
//     await newRecording.startAsync();
//     setRecording(newRecording);
//     setRecordingStatus("recording");
//   } catch (error) {
//     console.error("Failed to start recording", error);
//   }
// }
// async function stopRecording() {
//   setIsRecording(false);
//   try {
//     if (recordingStatus === "recording") {
//       console.log("Stopping Recording");
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();

//       setRecordedAudio({
//         uri,
//         name: `recording-${Date.now()}.m4a`, // Change the file extension to .m4a
//         type: "audio/m4a", // Update the type to M4A
//       });

//       // resert our states to record again
//       setRecording(null);
//       setRecordingStatus("stopped");
//     }
//   } catch (error) {
//     console.error("Failed to stop recording", error);
//   }
// }
//  return (
//   <View style={styles.voiceContainer}>
//   <TouchableOpacity
//     style={styles.voiceButton}
//     onPress={handleRecordButtonPress}
//   >
//     <FontAwesome name="microphone" size={24} color="white" />
//   </TouchableOpacity>
// </View>
//  )
// };

// const styles = StyleSheet.create({
//   voiceButton: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   voiceContainer: {
//     paddingTop: 4,
//     // flex: 1,
//     // alignItems: "left",
//     // justifyContent: "left",
//   },
// });