import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { Colors } from '../constant/styles';

export default function Timer() {
    const [timer,setTimer] = useState(0)
    useEffect(() => {
        if (timer > 0) {
          const timerId = setInterval(() => {
            setTimer(timer - 1);
          }, 1000);
      
          return () => {
            clearInterval(timerId);
          };
        } else {
          // Timer has reached 0, perform action (e.g., enable Resend OTP button)
        }
      }, [timer]);
      
  return (
    <Text style={{color:Colors.primaryColor}}>{timer}</Text>
  )
}
