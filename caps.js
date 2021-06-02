'use strict';


const events = require('./events');
const vendor = require('./vendor');
const driver = require ('./driver');

setInterval(()=>{

  vendor.newOrder();

},5000);

events.on('pickUp', driver.pickUp);
events.on('inTransit',driver.delivered);
events.on('delivered', vendor.thank);

