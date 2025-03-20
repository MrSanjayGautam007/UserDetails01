import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNav from './src/Component/AppNav'

const App = () => {
  return (
    <SafeAreaProvider>
     <AppNav/>
    </SafeAreaProvider>
    
  )
}

export default App

const styles = StyleSheet.create({})