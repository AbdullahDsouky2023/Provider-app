import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../AppText";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <AppText style={styles.error} text ={error}/>;
}

const styles = StyleSheet.create({
  error: { color: "red" ,  fontSize:14
},
});

export default ErrorMessage;