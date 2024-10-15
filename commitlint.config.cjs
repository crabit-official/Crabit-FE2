module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'content',
        'docs',
        'feat',
        'fix',
        'refactor',
        'style',
        'test',
        'deploy',
        'ci/cd'
      ],
    ],
    'subject-case': [0]
  },
  help: {
    type: {
      message: '커밋 메시지는 다음 유형 중 하나로 시작해야 합니다: build, chore, content, docs, feat, fix, refactor, style, test, deploy',
    },
  },
};
