const shortcut = require('../index');

(async () => {

  console.log('before');

  try {

    const result = await shortcut({
      directory: '~/Desktop/',
      name: 'test1',
      uri: 'ddd',
    });
    console.log(result);

  } catch (err) {

    console.error(err);

  }

  try {

    const result = await shortcut({
      directory: './test/',
      name: 2,
      uri: 'file:///Users/mhulse/Desktop/2f5ed8331535554703.5892797.jpg',
    });
    console.log(result);

  } catch (err) {

    console.error(err);

  }

  try {

    const result = await shortcut({
      directory: './test',
      name: 'test3',
      uri: 'https://blah.com',
    });
    console.log(result);

  } catch (err) {

    console.error(err);

  }

  console.log('after');

})();
