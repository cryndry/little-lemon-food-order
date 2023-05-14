import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.App}>
      <StatusBar style="auto" translucent={false} />
      <Header />
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: 'white'
  }
});