import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Helper from '../../lib/helper';
import Sound from 'react-native-sound';

export default function WordDefinition({def}) {
  const [loadingMp3, setLoadingMp3] = useState(false);
  let word = Helper.carefullyGetValue(def, ['word']);

  if (word.length > 0) {
    word = Helper.capitalize(word);
    word = '[' + word + ']';
  } else {
    word = 'Definition not found';
  }
  let speakMp3 = Helper.carefullyGetValue(def, [
    'results',
    '0',
    'lexicalEntries',
    '0',
    'entries',
    '0',
    'pronunciations',
    '0',
    'audioFile',
  ]);
}
