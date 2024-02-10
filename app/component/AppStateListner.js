import React, { useState, useEffect } from 'react';
import { AppState } from 'react-native';

const AppStateListener = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
      console.log(`AppState changed to ${nextAppState}`);
    };

    // Add the event listener
    AppState.addEventListener('change', handleAppStateChange);

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return null
};

export default AppStateListener;
