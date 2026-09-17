const DB_NAME = "SalaryAppDB";
const DB_VERSION = 5;

let db = null;


/* =========================
   データベースを開く
========================= */

function requestDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(DB_NAME, DB_VERSION);


    request.onupgradeneeded = (event) => {

      const database =
        event.target.result;


      // プロフィール
      if (
        !database.objectStoreNames.contains("profile")
      ) {

        database.createObjectStore(
          "profile",
          { keyPath: "id" }
        );

      }


      // 給与
      if (
        !database.objectStoreNames.contains("salaries")
      ) {

        database.createObjectStore(
          "salaries",
          {
            keyPath: "id",
            autoIncrement: true
          }
        );

      }


      // 賞与
      if (
        !database.objectStoreNames.contains("bonuses")
      ) {

        database.createObjectStore(
          "bonuses",
          {
            keyPath: "id",
            autoIncrement: true
          }
        );

      }


      // 健康
      if (
        !database.objectStoreNames.contains("health")
      ) {

        database.createObjectStore(
          "health",
          { keyPath: "id" }
        );

      }


      // 資格
      if (
        !database.objectStoreNames.contains("qualification")
      ) {

        database.createObjectStore(
          "qualification",
          { keyPath: "id" }
        );

      }


      // 家族
      if (
        !database.objectStoreNames.contains("family")
      ) {

        database.createObjectStore(
          "family",
          { keyPath: "id" }
        );

      }

    };


    request.onsuccess = (event) => {

      db =
        event.target.result;

      resolve(db);

    };


    request.onerror = () => {

      reject(request.error);

    };


    request.onblocked = () => {

      console.warn(
        "データベースの更新がブロックされています。"
      );

    };

  });

}


/* =========================
   プロフィール取得
========================= */

function getProfile(database) {

  return new Promise((resolve, reject) => {

    const transaction =
      database.transaction(
        "profile",
        "readonly"
      );

    const store =
      transaction.objectStore("profile");

    const request =
      store.get("main");


    request.onsuccess = () => {

      resolve(request.result || null);

    };


    request.onerror = () => {

      reject(request.error);

    };

  });

}


/* =========================
   プロフィール保存
========================= */

function saveProfile(database, data) {

  return new Promise((resolve, reject) => {

    const transaction =
      database.transaction(
        "profile",
        "readwrite"
      );

    const store =
      transaction.objectStore("profile");

    const request =
      store.put(data);


    request.onsuccess = () => {

      resolve();

    };


    request.onerror = () => {

      reject(request.error);

    };

  });

}