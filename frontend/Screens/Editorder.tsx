import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('data.db');

export default function DataScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch API data

    const initDB = async () => {
      await db.transaction(tx => {
        tx.executeSql(
          `create table if not exists items (
            id integer primary key not null, 
            title text,
            done int);`
        );
      });
    };

    await initDB();
    
    // Save API data to SQLite
    saveData(responseJson); 
  };

  const saveData = async (data) => {
    await db.transaction(tx => {
      data.forEach(item => {
        tx.executeSql(`insert into items (title, done) values (?, ?)`, 
        [item.title, 0]);
      });
    });
  };

  const updateData = async (id, updatedData) => {
    await db.transaction(tx => {
      tx.executeSql(
        `update items set title = ?, done = ? where id = ?`,
        [updatedData.title, updatedData.done, id]  
      );
    });
  };

  const deleteData = async (id) => {
     await db.transaction(tx => {
       tx.executeSql(
         `delete from items where id = ?`,
         [id]
       );
     });
  };

  return (
    <View>
      // Display data from state
    </View>
  );
}