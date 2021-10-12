const { normalizeMappings } = require('../utils');

test('normalizeMappings', async () => {
  expect(normalizeMappings()).toEqual({});

  expect(
    normalizeMappings({
      'PingFangSC-Regular': {
        fontFamily: "'PingFang SC', sans-serif",
        fontWeight: 400,
      },
    })
  ).toEqual({
    'PingFangSC-Regular': {
      fontFamily: "'PingFang SC', sans-serif",
      fontWeight: 400,
    },
  });

  expect(
    normalizeMappings({
      'PingFangSC-Regular': ["'PingFang SC', sans-serif", 400],
    })
  ).toEqual({
    'PingFangSC-Regular': {
      fontFamily: "'PingFang SC', sans-serif",
      fontWeight: 400,
    },
  });
});
