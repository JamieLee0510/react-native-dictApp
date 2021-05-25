import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Helper from '../../lib/helper';
import PropTypes from 'prop-types';
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
  return (
    <>
      {def && (
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.word}>{word}</Text>
            {speakMp3.length > 0 && (
              <View>
                {loadingMp3 ? (
                  <ActivityIndicator
                    size="large"
                    color="#219bd9"
                    style={{marginLeft: 10}}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => playWord(speakMp3, setLoadingMp3)}>
                    <Text style={styles.speaker}>{'🔈'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View>{getLexicalEntries(def)}</View>
        </View>
      )}
    </>
  );
}

const playWord = (speakMp3, setLoadingMp3) => {
  setLoadingMp3(true);
  console.log('playing', speakMp3);
  //將Sound組件的類別設置為“播放”（Playback),這樣一來就算設備處於靜音狀態，app仍然可以播放
  Sound.setCategory('Playback');

  //新建Sound對象
  let player = new Sound(speakMp3, null, (error) => {
    if (error) {
      console.log('player error,failed to load the sound', error.message);
      setLoadingMp3(false);
      return;
    }
    //將音量設為最大
    player.setVolume(1);

    // Play the sound with an onEnd callback
    player.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      setLoadingMp3(false);
      player.release();
    });
  });
};

//獲取詞條函數
const getLexicalEntries = (def) => {
  //保存jsx元素
  const jsxEntries = [];

  var lexicalEntries = null;

  //檢查是否有詞條條目
  if (Helper.isNotNullAndUndefined(def, ['results', '0', 'lexicalEntries'])) {
    lexicalEntries = def.results[0].lexicalEntries;

    lexicalEntries.forEach((lexicalItem, index) => {
      jsxEntries.push(
        <View key={'lexicalEntry_' + index} style={styles.lexicalContent}>
          <Text style={styles.category}>
            {Helper.carefullyGetValue(
              lexicalItem,
              ['lexicalCategory', 'text'],
              '',
            )}
          </Text>
          {Helper.isNotNullAndUndefined(lexicalItem, [
            'entries',
            '0',
            'senses',
          ]) && getSenses(lexicalItem.entries[0].senses)}
        </View>,
      );
    });
  }
  return <>{jsxEntries}</>;
};

const getSenses = (senses) => {
  const jsxSenses = [];
  if (senses && senses.length > 0) {
    senses.forEach((sense, index) => {
      let example = Helper.carefullyGetValue(
        sense,
        ['examples', '0', 'text'],
        '',
      );
      if (example.length > 0) example = 'E.g. ' + example;

      if (sense.definitions) {
        // Only if sense have definition
        jsxSenses.push(
          <View style={styles.row} key={'sense_' + index}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <View style={styles.column}>
              <Text style={styles.definition}>
                {Helper.carefullyGetValue(sense, ['definitions', '0'], '')}
              </Text>
              <Text style={styles.example}>{example}</Text>
            </View>
          </View>,
        );
      }
    });
  }

  return <View style={{marginLeft: 10}}>{jsxSenses}</View>;
};

//定義PropTypes
WordDefinition.propTypes = {
  def: PropTypes.object,
};

WordDefinition.defaultProps = {
  def: null,
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  speaker: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  lexicalContent: {
    paddingTop: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  bullet: {
    maxWidth: 20,
    minWidth: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  definition: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  example: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999999',
    marginBottom: 10,
  },
});
