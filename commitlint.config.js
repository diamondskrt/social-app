export const helperFactory = function (type) {
  return {
    error(arg) {
      return [2, type, arg];
    },

    warn(arg) {
      return [1, type, arg];
    },

    info(arg) {
      return [0, type, arg];
    },
  };
};

const { always, never } = {
  always: helperFactory('always'),
  never: helperFactory('never'),
};

export default {
  extends: [],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(\w+)(?: #(\d+))?(!)? (?:\[(.*?)\] )?(?:([^[]*?)(?: - (.*)|:?))$/,
      headerCorrespondence: [
        'type',
        'ticket',
        'breaking',
        'scope',
        'subject',
        'description',
      ],
      issuePrefixes: ['#'],
    },
  },
  rules: {
    'header-max-length': always.error(100),
    'scope-case': never.error([]),
    'type-case': always.error('sentence-case'),
    'type-enum': always.error([
      'build',
      'chore',
      'ci',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'fix',
      'feat',
      'revert',
    ]),
    'body-max-line-length': [0, 'always'],
  },
};
