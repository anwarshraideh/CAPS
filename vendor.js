'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');
const store_Name = process.env.STORE;

function createOrder() {

  let order = {
    store: store_Name,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  return order;
}

function newOrder() {
  console.log('New order is ready to pickup');
  events.emit('pickUp', {
    event: 'pickUp',
    time: new Date().toISOString(),
    payload: createOrder(), 
  });
}


function thank(payload) {

  payload.event = 'delivered';
  payload.time = new Date().toISOString();

  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
  
  console.log('EVENT', payload);
}

module.exports = {
  newOrder,
  thank,
};