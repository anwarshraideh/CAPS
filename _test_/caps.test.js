'use strict';

const faker = require('faker');
const vendor = require('../vendor');
const driver = require('../driver');

describe('Events test', () => {
  let consoleSpy;

  let testOrder = {
    store: '1-206-flowers',
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  let testPayload = {
    event: 'pickUp',
    time: new Date().toISOString(),
    payload: testOrder,
  };

  jest.useFakeTimers();

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('starts new order', () => {
    vendor.newOrder();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it('driver picks up orders after 1 second', () => {
    driver.pickUp(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000);        
    }, 1000);
  });
  it('driver delivers orders after 3 second', () => {
    driver.delivered(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 3000);        
    }, 3000);

  });
  it('vendor sends thank you note', () => {
    vendor.thank(testPayload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenLastCalledWith(expect.any(Function), 3000);        
    }, 3000);
  });

  
});