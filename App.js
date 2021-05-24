/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Api from './src/lib/api';
import Helper from './src/lib/helper';

const App: () => React$Node = () => {
  const [userWord, setUserWord] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [definition, setDefinition] = useState(null);

  const onUserWordChange = (text) => {
    setUserWord(text);
  };

  const onSearch = async () => {
    if (userWord.length <= 0) {
      setErrMsg('Please specify the word to lookup');
      return;
    }
    try {
      setLoading(true);
      let lemmas = await Api.getLemmas(userWord);
      console.log('lemmas', lemmas);
      if (lemmas.success) {
        let headWord = Helper.carefullyGetValue(
          lemmas,
          [
            'payload',
            'results',
            '0',
            'lexicalEntries',
            '0',
            'inflectionOf',
            '0',
            'id',
          ],
          '',
        );
        console.log('Headword is: ', headWord);
        if (headWord.length > 0) {
          let wordDefinition = await Api.getDefinition(headWord);
          if (wordDefinition.success) {
            setErrMsg('');
            setLoading(false);
            setDefinition(wordDefinition.payload);
            console.log('Word Definition: ', wordDefinition.payload);
          } else {
            setErrMsg(
              'Unable to get result from Oxford:' + wordDefinition.message,
            );
            setLoading(false);
            setDefinition(null);
          }
        } else {
          setErrMsg('Invalid word. Please specify a valid word.');
          setLoading(false);
          setDefinition(null);
        }
      } else {
        setErrMsg('Unable to get result from Oxford:' + lemmas.message);
        setLoading(false);
        setDefinition(null);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrMsg(err.message);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={[styles.column, styles.header]}>
            <Image style={styles.logo} source={require('./assets/icon.png')} />
            <Text style={styles.sectionTitle}>React-Native Dictionary</Text>
          </View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            onChangeText={(text) => onUserWordChange(text)}
            placeholder={'Key in the word to search'}
            value={userWord}
          />
          <View style={{minHeight: 10, maxHeight: 10}}></View>
          <Button title="Search" onPress={() => onSearch()} />
          {errMsg.length > 0 && <Text style={styles.errMsg}>{errMsg}</Text>}
          {loading && (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color={'#219bd9'}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#219bd930',
    color: '#ff0000',
  },
  scrollView: {
    padding: 6,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#219bd9',
  },
  logo: {
    width: 100,
    height: 100,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  errMsg: {
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
  },
});

export default App;
