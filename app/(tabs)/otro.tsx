// import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Otro() {
  return (
    <View style={styles.container}>
      <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti molestiae dolores ea cum
        quae voluptas obcaecati repudiandae fugiat commodi soluta? Dolore totam temporibus aperiam
        quisquam nemo porro doloremque ipsa odit.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
