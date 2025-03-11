import { ScrollView, Text, Image, View } from 'react-native';

export default function Historia() {
  return (
    <ScrollView className="bg-orange-50">
      <Text className="p-8 text-center text-4xl font-bold text-orange-600">Rick and Morty</Text>

      <View className="mb-6 items-center">
        <Image
          source={{
            uri: 'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg',
          }}
          className="h-48 w-72 rounded-lg"
        />
      </View>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Rick and Morty</Text> es una serie animada de comedia de ciencia
        ficción creada por Justin Roiland y Dan Harmon para Adult Swim. La serie sigue las
        desventuras de un científico genio pero sociópata, Rick Sánchez, y su nieto fácilmente
        influenciable, Morty Smith.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        La serie se estrenó el 2 de diciembre de 2013 y ha sido aclamada por la crítica por su
        originalidad, creatividad y humor. Ha ganado un culto de seguidores y es conocida por su
        humor negro, sus referencias culturales y su exploración de temas existenciales.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl font-bold text-orange-600">
        Personajes Principales
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Rick Sánchez:</Text> Un científico genio alcohólico y cínico que
        es abuelo de Morty y padre de Beth. Rick es conocido por sus inventos, su escepticismo, su
        actitud nihilista y su desprecio por las convenciones sociales y la autoridad.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Morty Smith:</Text> El nieto de 14 años de Rick, frecuentemente
        arrastrado a las aventuras peligrosas de su abuelo. Morty es tímido, fácilmente estresado y
        a menudo incómodo, pero con el tiempo va ganando confianza.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Summer Smith:</Text> La hermana mayor de Morty, de 17 años.
        Inicialmente se la presenta como una adolescente típica que se preocupa por mejorar su
        estatus social en la escuela secundaria, pero gradualmente comienza a participar en las
        aventuras de Rick y Morty.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Beth Smith:</Text> La hija de Rick y madre de Morty y Summer.
        Beth es cirujana de caballos y a menudo se debate entre su amor por su padre y su
        conocimiento de lo problemático que puede ser.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        <Text className="font-bold">Jerry Smith:</Text> El padre inseguro de Morty y Summer y esposo
        de Beth. Jerry tiene una relación tensa con Rick, quien constantemente lo menosprecia por su
        falta de inteligencia y determinación.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl font-bold text-orange-600">
        Universo y Multiverso
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        Rick and Morty introduce el concepto del multiverso, donde existen infinitas realidades
        alternativas con diferentes versiones de los personajes. Esto permite a los creadores
        explorar diferentes escenarios y situaciones hipotéticas, a menudo con resultados cómicos o
        filosóficamente provocativos.
      </Text>

      <Text className="mb-4 pl-8 pr-8 text-xl">
        El show también presenta una amplia variedad de alienígenas, desde humanoides hasta
        criaturas bizarras, así como tecnología avanzada como portales interdimensionales,
        dispositivos de clonación y armas de alta tecnología.
      </Text>

      <Text className="mb-6 pl-8 pr-8 text-xl font-bold text-orange-600">Impacto Cultural</Text>

      <Text className="mb-8 pl-8 pr-8 text-xl">
        Rick and Morty se ha convertido en un fenómeno cultural, inspirando memes, merchandising y
        teorías de fans. Su enfoque único de la ciencia ficción, combinado con su humor inteligente
        y a menudo oscuro, ha asegurado su estatus como una de las series animadas más innovadoras e
        influyentes de la década de 2010.
      </Text>

      <Text className="mb-8 pl-8 pr-8 text-center text-lg italic text-gray-600">
        Esta aplicación fue desarrollada como un proyecto de aprendizaje y no está afiliada
        oficialmente con Adult Swim o los creadores de Rick and Morty.
      </Text>
    </ScrollView>
  );
}
