import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("contatos4.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS contato (id INTEGER PRIMARY KEY, nome TEXT, celular TEXT, foto TEXT, lat TEXT, lng TEXT, createdAt TEXT);',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                }
            );
        });
    });

    return promise;
}

export const inserirContato = (id, nome, celular, foto, lat, lng, createdAt) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO contato (id, nome, celular, foto, lat, lng, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    id,
                    nome,
                    celular,
                    foto,
                    lat,
                    lng,
                    createdAt
                ],
                (_, resultado) => {
                    resolve(resultado)
                },
                (_, err) => {
                    reject(err)
                }
            );
        });
    });

    return promise;
}

export const buscarContatos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM contato',
                [],
                (_, resultado) => {
                    resolve(resultado)
                },
                (_, err) => {
                    reject(err)
                }
            );
        });
    });
    return promise;
};
