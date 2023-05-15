import { openDatabase } from 'expo-sqlite';

const db = openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS menuitems (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price FLOAT, category TEXT, image TEXT, description TEXT)'
        );
      },
      reject,
      resolve
    );
  });
};

export async function getCategories() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT DISTINCT category FROM menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export function saveMenuItems(menuItems) {
  let sqlQuery = "INSERT INTO menuitems (name, price, category, description, image) VALUES ";
  menuItems.forEach((item, index) => {
    Object.keys(item).forEach(key => { try { item[key] = item[key].replace("'", "''") } catch { } }) // escaping single quotes in texts

    let queryString = `('${item.name}', ${item.price}, '${item.category}', '${item.description}', '${item.image}')`;
    if (index === menuItems.length - 1) {
      sqlQuery += queryString;
    } else {
      sqlQuery += queryString + ", ";
    }
  });
  db.transaction((tx) => {
    tx.executeSql(sqlQuery);
  });
};

export async function filterByQueryAndCategories(searchTerm, activeCategory) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      let querySql = "SELECT * FROM menuitems";
      if (!(activeCategory === "" && searchTerm === "")) {
        querySql += ` WHERE ${activeCategory === "" ? "" : `category='${activeCategory}'`}${activeCategory !== "" && searchTerm !== "" ? " AND " : ""}${searchTerm === "" ? "" : `name LIKE '%${searchTerm}%'`}`;
      }

      tx.executeSql(querySql, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};