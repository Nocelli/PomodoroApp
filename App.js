import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import Icon from './assets/Icon'
import { vibrate } from './utils'

export default function App() {
  const [durations, setDurations] = useState({})
  const [count, setCount] = useState(1500)
  const [isPaused, setIsPaused] = useState(false)
  const [isWorkTime, setIsWorkTime] = useState(true)

  useEffect(() => {
    setDurations({ 'work': 1500, 'break': 300 })
  }, [])

  useEffect(() => {
    let current = setInterval(() => {
      dencrement()
    }, 1000)

    return () => clearInterval(current);
  }, [count, isPaused, isWorkTime])


  const dencrement = () => {
    if (isPaused)
      return
    if (count - 1 < 1) {
      vibrate()
      setCount(!isWorkTime ? durations.work : durations.break)
      setIsWorkTime(!isWorkTime)
    } else {
      setCount(count - 1)
    }
  }

  const sToTime = duration => {
    let seconds = parseInt((duration) % 60)
      , minutes = parseInt((duration / 60) % 60)

    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + "m " + seconds + "s";
  }

  const toggleWork = () => {
    setIsWorkTime(!isWorkTime)
    setCount(!isWorkTime ? durations.work : durations.break)
  }

  return (
    <View style={styles.container}>
      <Icon/>
      <Text style={styles.text}>{sToTime(count)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { setCount(isWorkTime ? durations.work : durations.break) }}>
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { setIsPaused(!isPaused) }}>
          <Text style={styles.buttonText}>{isPaused ? 'Continuar' : 'Pausar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switch}>
        <Switch
          style={styles.switchToggle}
          trackColor={{ false: "#767577", true: "#6C63FF" }}
          thumbColor={isWorkTime ? "#f0f0f5" : "#f4f3f4"}
          onValueChange={toggleWork}
          value={isWorkTime} />
        <Text style={styles.switchText}>{isWorkTime ? 'Trabalho' : 'Intervalo'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 72,
    color: '#1d1d1f'
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'uppercase',
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 16,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchText: {
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: '#444',
    textTransform: 'uppercase',
  },
  switchToggle: {
    marginRight: 10,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
});
