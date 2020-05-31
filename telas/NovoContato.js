import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import BotaoCabecalho from '../components/BotaoCabecalho'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ContatoInput from '../components/ContatoInput';
import { useDispatch, useSelector } from 'react-redux';
import * as contatosActions from '../store/contatos-actions';
import * as firebase from 'firebase';
import ENV from '../env';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp(ENV.firebaseConfig);
}

const db = firebase.firestore()

const NovoContato = (props) => {
    const dispatch = useDispatch();
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        db.collection('contatos').onSnapshot((snapshot) => {
            let aux = [];
            snapshot.forEach(doc => {
                aux.push(doc.data());
            });
            setContatos(aux);
        });
    }, [dispatch]);


    const adicionarContato = (nome, celular, foto, lat, lng) => {
        var lastId = 8;
        contatos.forEach((item) => {
            if (item.id > lastId) {
                lastId = item.id;
            }
        })

        var now = new Date;

        db.collection('contatos').add({
            id: parseInt(lastId) + 2,
            nome: nome ? nome : ' ',
            celular: celular ? celular : ' ',
            foto: foto ? foto : ' ',
            lat: lat ? lat : ' ',
            lng: lng ? lng : ' ',
            data: now.toLocaleString()
        })

        // dispatch(contatosActions.addContato());
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View>
                <ContatoInput onAdicionarContato={adicionarContato} isEditando={false} />
            </View>
        </ScrollView>
    )
};

const estilos = StyleSheet.create({
});

NovoContato.navigationOptions = dadosNav => {
    return {
        headerTitle: "Cadastrar contato"
    }
}

export default NovoContato;
