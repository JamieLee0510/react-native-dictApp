import React from 'react';

const getLexicalEntries = (def) => {
  const jsxEntries = [];
  var lexicalEntries = null;

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
