'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost/test_base';

MongoClient.connect(url, (err, db) => {
  if(err) console.log('Невозможно подключиться к базе:', err);
  else {
    let pokemons = db.collection('pokemon'),
        pokemon1 = {name: 'Pikachu', level: 5},
        pokemon2 = {name: 'Skvirtl', level: 12},
        pokemon3 = {name: 'Bulbazavr', level: 8},
        pokemon4 = {name: 'Charmander', level: 2};

    pokemons.insert([pokemon1, pokemon2, pokemon3, pokemon4], (err, result) => {
      if (err) console.log('Не удалось добавить документы:', err);
      else {
        pokemons.find().toArray((err, result) => {
          if (err) console.log('Не удалось получить документы из коллекции:', err);
          else if (result.length) {
            console.log('Документы:');
            console.log(result);
          }
          else console.log('Нет документов');
        });
        pokemons.remove();
      }
      db.close();
    });
  }
});
