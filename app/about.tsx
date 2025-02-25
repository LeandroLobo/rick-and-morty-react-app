import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { Pressable, ScrollView, Text } from 'react-native';

export default function About() {
  return (
    <ScrollView>
      <Link asChild href="/">
        <Pressable className="mb-2 flex-row items-center justify-center">
          <AntDesign name="home" size={24} color="black" />
          <Text className="ml-4 text-2xl">Ir al Inicio</Text>
        </Pressable>
      </Link>
      <Text className="pl-8 text-3xl">About</Text>
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
