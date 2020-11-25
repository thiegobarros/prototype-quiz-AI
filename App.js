import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CustomButton,
  CustomButtonText
} from './Style';

function HomeScreen({ navigation }) {
  const question_opt = ['Como estava a comida?', 'Como estava o posto?'];
  const question = question_opt[Math.floor(Math.random() * question_opt.length)];
  const answers = [
    {
      text: 'Ótimo'
    },
    {
      text: 'Bom'
    },
    {
      text: 'Regular'
    },
    {
      text: 'Ruim'
    },
    {
      text: 'Péssimo'
    }
  ];
  const answer_type = true;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: '5%' }}>Aperte 'OK' para iniciar questionário</Text>
      <Button
        title="OK"
        onPress={() => navigation.navigate('Quiz', {
          question: question,
          answers: answers,
          answer_type: answer_type
        })}
      />
    </View>
  );
}

function DetailsScreen({route}) {
  const [count, setCount] = React.useState(0);
  const {question, answers, answer_type} = route.params;

  setTimeout( () => {
    setCount(count + 1);
  }, 1);

  function onPress() {
    let valorInicial = 0
    console.log(
      {
        question_length: question.length,
        answers_num: answers.length,
        answers_length: answers.reduce((acc, n) => acc+n.text.length, valorInicial),
        answer_type: answer_type,
        time_at: count
      }
    );
    // window.location.reload(false);
  };

  const alternatives = answers.map((alternative, index) =>
    <CustomButton key={index} onPress={onPress}>
      <CustomButtonText>{alternative.text}</CustomButtonText>
    </CustomButton>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text>{question}</Text>
      {alternatives}
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;