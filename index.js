'use strict';
/**
 * Created by Krasnodaretc on 27.10.17.
 */
const mongodb = require('mongodb');
const mongoUrl = require('./settings').mongo;

const helperName = process.env.helper_name;
const helper = require('./' + helperName);
start();

async function start () {
  console.time('helper ' + helperName + ' time');
  const db = await mongodb.connect(mongoUrl);
  let result = await helper(db);

  console.timeEnd('helper ' + helperName + ' time');
  console.log('result : ', result);
  process.exit();
}