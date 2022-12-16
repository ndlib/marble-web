module.exports = {
  settings: {
    index: {
      number_of_shards: 4,
      number_of_replicas: 0,
    },
    analysis: {
      filter: {
        english_stop: {
          type:       'stop',
          stopwords:  '_english_',
        },
      },
      char_filter: {
        // this is used for the id filters people do not always know the punctuation
        // in the id and sometimes do not know the leading zeros
        // we are removing all the characters people do not always know for the test.
        specialCharactersFilter: {
          pattern: '[^A-Za-z1-9]',
          type: 'pattern_replace',
          replacement: '',
        },
      },
      analyzer: {
        folded_analyzer: {
          tokenizer: 'standard',
          stopwords: '_english_',
          filter: [
            'lowercase',
            'asciifolding',
            'stemmer',
            'english_stop',
          ],
        },
        stopword_analyzer: {
          tokenizer: 'standard',
          filter: [
            'english_stop',
            'stemmer',
          ],
        },
        no_punctuation_keyword: {
          tokenizer: 'keyword',
          char_filter: [
            'specialCharactersFilter',
          ],
          filter: [
            'lowercase',
            'trim',
          ],
        },
      },
    },
  },
  mappings: {
    properties : {
      allMetadata : {
        type: 'text',
        analyzer: 'stopword_analyzer',
        fields: {
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      name: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      creator: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      collection: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      identifier: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          idMatch: {
            type: 'text',
            analyzer: 'no_punctuation_keyword',
          },
        },
      },
      uniqueIdentifier: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          idMatch: {
            type: 'text',
            analyzer: 'no_punctuation_keyword',
          },
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      date: {
        type: 'text',
      },
      hasImages: {
        type: 'boolean',
      },
    },
  }
}
