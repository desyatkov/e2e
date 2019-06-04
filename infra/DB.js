const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('infra/db.json');
const db = low(adapter);

export const DB = db.get('tests').value();
