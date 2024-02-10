// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(55);
    expect(bankAccount.getBalance()).toBe(55);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(55);
    expect(() => bankAccount.withdraw(60)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      const bankAccount = getBankAccount(55);
      const bankAccountTo = getBankAccount(10);
      bankAccountTo.transfer(40, bankAccount);
    }).toThrowError('Insufficient funds: cannot withdraw more than 10');
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(55);
    expect(() => bankAccount.transfer(40, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(55);
    expect(bankAccount.deposit(60).getBalance()).toBe(115);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(115);
    expect(bankAccount.withdraw(60).getBalance()).toBe(55);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(55);
    const bankAccountTo = getBankAccount(50);
    expect([
      bankAccountTo.transfer(40, bankAccount).getBalance(),
      bankAccount.getBalance(),
    ]).toStrictEqual([10, 95]);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(55);
    jest.spyOn(lodash, 'random').mockReturnValue(0.5);

    const res = await bankAccount.fetchBalance();
    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(55);
    const oldBalance = bankAccount.getBalance();
    jest.spyOn(lodash, 'random').mockReturnValue(0.5);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance() === oldBalance).toBeFalsy();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(55);
    jest.spyOn(lodash, 'random').mockReturnValue(0);

    expect(async () => {
      await bankAccount.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
