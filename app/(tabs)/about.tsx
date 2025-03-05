import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, Text } from 'react-native';

export default function About() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'cyan',
          },
          headerBackTitle: 'Back',
          headerBackVisible: true,
          headerTintColor: 'black',
          headerTitle: 'About',
          headerRight: () => '',
        }}
      />
      <Text className="pl-8 text-3xl">App Info</Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
      <Text className="mb-4 pl-8 pr-8 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur officia quibusdam,
        in modi fugit ut qui dolore tempora, voluptate minima magni nobis voluptates voluptatum
        porro animi? Delectus, dolor consequatur.
      </Text>
    </ScrollView>
  );
}
