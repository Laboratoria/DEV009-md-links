const { fn_myFileExist } = require("../data.js");

const file = 'prueba.md';

describe('fn_myFileExist', () => {


  test('el archivo existe', () => {
    return fn_myFileExist().then(fileExist => {
      expect(fileExist).toBe(true);
    });
  });

  test('el dato es peanut butter', () => {
    return expect(fn_myFileExist()).resolves.toBe(true);
  });

});