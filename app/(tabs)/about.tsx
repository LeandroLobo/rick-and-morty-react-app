import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'lib/context/ThemeContext';
import React from 'react';
import { ScrollView, Text, View, Image, Linking, TouchableOpacity } from 'react-native';

export default function About() {
  const { theme } = useTheme();

  return (
    <ScrollView className="bg-rick-50 dark:bg-dark-background flex-1">
      <Text className="text-rick-600 dark:text-rick-400 p-6 text-center text-3xl font-bold">
        Rick and Morty App
      </Text>

      <View className="mb-6 items-center">
        <Image
          source={require('../../assets/ricksanchez.png')}
          className="h-48 w-48 rounded-lg"
          resizeMode="contain"
        />
      </View>

      <Text className="text-rick-600 dark:text-rick-400 mb-4 px-8 text-xl font-bold">
        Sobre esta aplicación
      </Text>

      <Text className="dark:text-dark-text mb-4 px-8 text-lg text-black">
        Esta aplicación fue desarrollada como un proyecto para explorar y mostrar información sobre
        personajes de la serie Rick and Morty, utilizando la API pública de Rick and Morty.
      </Text>

      <Text className="dark:text-dark-text mb-4 px-8 text-lg text-black">
        Los usuarios pueden buscar personajes, ver detalles sobre ellos, guardar favoritos, y
        explorar información relacionada con sus apariciones en la serie.
      </Text>

      <Text className="text-rick-600 dark:text-rick-400 mb-4 px-8 text-xl font-bold">
        Características principales
      </Text>

      <View className="mb-2 px-8">
        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Búsqueda de personajes
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Busca cualquier personaje de la serie por su nombre en la pestaña "Personajes"
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Sistema de favoritos
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Guarda tus personajes favoritos tocando el ícono de corazón en cada tarjeta. Los favoritos
          se almacenan localmente en tu dispositivo.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Menú lateral
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Accede al menú deslizante desde cualquier pantalla tocando el ícono de menú en la esquina
          superior derecha. Aquí encontrarás accesos directos y tu lista de personajes favoritos.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Detalles de personajes
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Toca cualquier tarjeta de personaje para ver información detallada, incluyendo su primera
          aparición y resultados de búsqueda online.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Navegador integrado de Google
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Explora información detallada sobre cada personaje a través de un navegador integrado que
          muestra resultados de Google. Este navegador está configurado específicamente para
          mantenerte dentro del ecosistema de Google, permitiéndote explorar a fondo sin salir de la
          aplicación ni perder contexto.
        </Text>
      </View>

      <Text className="text-rick-600 dark:text-rick-400 mb-4 px-8 text-xl font-bold">
        Cómo usar la aplicación
      </Text>

      <View className="mb-2 px-8">
        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          1. Navegar por personajes
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          En la pantalla principal, usa el buscador y la paginación para encontrar personajes.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          2. Guardar favoritos
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Toca el ícono de corazón en la esquina superior derecha de cualquier tarjeta para añadir o
          quitar un personaje de tus favoritos.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          3. Acceder al menú lateral
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Toca el ícono de menú (tres líneas) en la esquina superior derecha para abrir el menú
          lateral. Aquí encontrarás una sección "Personajes Favoritos" con acceso rápido a todos tus
          favoritos.
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          4. Ver detalles y buscar información
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Toca cualquier tarjeta para ver información detallada sobre el personaje. Desde allí,
          puedes acceder al navegador integrado que te permite explorar resultados de Google sobre
          ese personaje. El navegador está configurado para permitirte navegar dentro de Google
          (búsquedas, imágenes, etc.) pero con restricciones que evitan que salgas a otros sitios
          web, manteniendo una experiencia segura y enfocada en la información del personaje.
        </Text>
      </View>

      <Text className="text-rick-600 dark:text-rick-400 mb-4 px-8 text-xl font-bold">
        Tecnologías utilizadas
      </Text>

      <View className="mb-2 px-8">
        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • React Native
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Framework para desarrollo de aplicaciones móviles multiplataforma
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">• Expo</Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Plataforma para simplificar el desarrollo de aplicaciones React Native
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">• Expo Router</Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Sistema de navegación basado en archivos para aplicaciones Expo
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • NativeWind (Tailwind CSS)
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Herramienta para estilizar la interfaz usando clases de Tailwind
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • AsyncStorage
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Almacenamiento local para guardar datos como los personajes favoritos
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">• Context API</Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Para manejar el estado global de favoritos a través de la aplicación
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">• TypeScript</Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          Superset de JavaScript con tipado estático
        </Text>

        <Text className="dark:text-dark-text mb-1 text-lg font-bold text-black">
          • Rick and Morty API
        </Text>
        <Text className="dark:text-dark-text mb-4 text-base text-black">
          API REST pública con información sobre la serie
        </Text>
      </View>

      <Text className="text-rick-600 dark:text-rick-400 mb-4 px-8 text-xl font-bold">
        Desarrollador
      </Text>

      <Text className="dark:text-dark-text mb-2 px-8 text-lg text-black">
        Aplicación desarrollada por Leandro Lobo.
      </Text>

      <TouchableOpacity
        className="dark:bg-dark-accent mx-8 mb-12 flex-row items-center rounded-lg bg-black p-4"
        onPress={() => Linking.openURL('https://github.com/LeandroLobo')}>
        <FontAwesome name="github" size={24} color={theme === 'dark' ? '#f9fafb' : 'white'} />
        <Text className="dark:text-dark-text ml-4 text-lg text-white">Visitar mi GitHub</Text>
      </TouchableOpacity>

      <Text className="mb-8 px-8 text-center text-sm italic text-gray-500 dark:text-gray-400">
        Versión 1.0.0 • Esta aplicación es un proyecto educativo y no tiene fines comerciales. No
        está afiliada oficialmente con Adult Swim o los creadores de Rick and Morty.
      </Text>
    </ScrollView>
  );
}
