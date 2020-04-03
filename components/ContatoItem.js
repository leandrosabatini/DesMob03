import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import cores from '../cores/cores'
import medidas from '../medidas/medidas';

const ContatoItem = (props) =>{
    return (
        <TouchableOpacity onLongPress={props.onDelete.bind(this, props.chave)}>
            <View style={styles.itemNaLista}>
                <Text>#{props.chave}</Text>
                <Text>Nome: {props.nome}</Text>
                <Text>Celular: {props.celular}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemNaLista: {
        padding: medidas.PEQUENO,
        backgroundColor: cores.CINZA,
        borderColor: cores.PRETO,
        borderWidth: medidas.MINIMO,
        marginBottom: medidas.PEQUENO,
        borderRadius: medidas.PEQUENO
    }
});

export default ContatoItem;
