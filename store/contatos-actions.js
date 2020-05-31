import * as FileSystem from 'expo-file-system';
import { inserirContato, buscarContatos } from '../helpers/db';

export const ADD_CONTATO = 'ADD_CONTATO';
export const LISTA_CONTATOS = 'LISTA_CONTATOS';

export const listarContatos = () => {
    return async dispatch => {
        try {
            const resultadoDB = await buscarContatos();
            dispatch({ type: LISTA_CONTATOS, contatos: resultadoDB.rows._array });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};

export const addContato = (id, nome, celular, foto, lat, lng, createdAt) => {
    return async dispatch => {
        var novoPath = '';
        if (typeof foto !== 'undefined') {
            const nomeArquivo = foto.split("/").pop();
            novoPath = FileSystem.documentDirectory + nomeArquivo;

            try{
                await FileSystem.moveAsync({
                    from: foto,
                    to: novoPath
                })

            } catch (err) {
                console.log (err);
                throw err;
            }
        }

        const resultadoDB = await inserirContato(
            id,
            nome,
            celular,
            foto,
            lat,
            lng,
            createdAt
        );

        dispatch({
            type: ADD_CONTATO,
            dadosContato: {
                id: id,
                nome: nome,
                celular: celular,
                foto: novoPath,
                lat: lat,
                lng: lng,
                createdAt: createdAt
            }
        })
    }
}
