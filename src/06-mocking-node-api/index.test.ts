// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);
    expect(spySetTimeout).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const spySetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 5);
    expect(spySetInterval).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously('./index.ts');
    expect(pathJoin).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    expect(await readFileAsynchronously('./index.ts')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile');

    expect(await readFileAsynchronously('./index.ts')).not.toBeNull();
  });
});
