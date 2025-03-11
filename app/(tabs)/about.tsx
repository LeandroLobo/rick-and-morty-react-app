import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View, Image, Linking, TouchableOpacity } from 'react-native';

export default function About() {
  return (
    <ScrollView className="flex-1 bg-orange-50">
      <Text className="p-6 text-center text-3xl font-bold text-orange-600">Rick and Morty App</Text>

      <View className="mb-6 items-center">
        <Image
          source={require('../../assets/ricksanchez.png')}
          className="h-48 w-48 rounded-lg"
          resizeMode="contain"
        />
      </View>

      <Text className="mb-4 px-8 text-xl font-bold text-orange-600">Sobre esta aplicación</Text>

      <Text className="mb-4 px-8 text-lg">
        Esta aplicación fue desarrollada como un proyecto para explorar y mostrar información sobre
        personajes de la serie Rick and Morty, utilizando la API pública de Rick and Morty.
      </Text>

      <Text className="mb-4 px-8 text-lg">
        Los usuarios pueden buscar personajes, ver detalles sobre ellos, y explorar información
        relacionada con sus apariciones en la serie.
      </Text>

      <Text className="mb-4 px-8 text-xl font-bold text-orange-600">Tecnologías utilizadas</Text>

      <View className="mb-2 px-8">
        <Text className="mb-1 text-lg font-bold">• React Native</Text>
        <Text className="mb-4 text-base">
          Framework para desarrollo de aplicaciones móviles multiplataforma
        </Text>

        <Text className="mb-1 text-lg font-bold">• Expo</Text>
        <Text className="mb-4 text-base">
          Plataforma para simplificar el desarrollo de aplicaciones React Native
        </Text>

        <Text className="mb-1 text-lg font-bold">• Expo Router</Text>
        <Text className="mb-4 text-base">
          Sistema de navegación basado en archivos para aplicaciones Expo
        </Text>

        <Text className="mb-1 text-lg font-bold">• NativeWind (Tailwind CSS)</Text>
        <Text className="mb-4 text-base">
          Herramienta para estilizar la interfaz usando clases de Tailwind
        </Text>

        <Text className="mb-1 text-lg font-bold">• TypeScript</Text>
        <Text className="mb-4 text-base">Superset de JavaScript con tipado estático</Text>

        <Text className="mb-1 text-lg font-bold">• Rick and Morty API</Text>
        <Text className="mb-4 text-base">API REST pública con información sobre la serie</Text>
      </View>

      <Text className="mb-4 px-8 text-xl font-bold text-orange-600">Desarrollador</Text>

      <Text className="mb-2 px-8 text-lg">Aplicación desarrollada por Leandro Lobo.</Text>

      <TouchableOpacity
        className="mx-8 mb-12 flex-row items-center rounded-lg bg-black p-4"
        onPress={() => Linking.openURL('https://github.com/LeandroLobo')}>
        <FontAwesome name="github" size={24} color="white" />
        <Text className="ml-4 text-lg text-white">Visitar mi GitHub</Text>
      </TouchableOpacity>

      <Text className="mb-8 px-8 text-center text-sm italic text-gray-500">
        Versión 1.0.0 • Esta aplicación es un proyecto educativo y no tiene fines comerciales. No
        está afiliada oficialmente con Adult Swim o los creadores de Rick and Morty.
      </Text>
    </ScrollView>
  );
}
