import { FlatList, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
    telaPrincipalView: {
        padding: 50
    },
    contatoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    nomeInputText: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 2,
        marginBottom: 20
    },
    telefoneInputText: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 2
    },
    itemNaLista: {
        padding: 12,
        backgroundColor: '#CCC',
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 8,
        borderRadius: 8
    }
});

export default function App() {
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [contatos, setContatos] = useState('');
    const [contadorcontatos, setContadorcontatos] = useState(10);

    const capturarNome = (nome) => {
        setNome(nome)
    };

    const capturarCelular = (celular) => {
        setCelular(celular)
    };

    const adicionarContato = () => {
        setContatos((contatos) => {
            setContadorcontatos(contadorcontatos + 2);
            return [
                ...contatos,
                {
                    key: contadorcontatos.toString(),
                    nome: nome,
                    celular: celular
                }
            ];
        } );

        setNome('');
        setCelular('');
    }

    return (
        <View style={styles.telaPrincipalView}>
            <View style={styles.contatoView}>
                <TextInput
                    placeholder="Nome"
                    style={styles.nomeInputText}
                    onChangeText={capturarNome}
                    value={nome}
                />
            </View>
            <View style={styles.contatoView}>
                <TextInput
                    placeholder="Telefone"
                    style={styles.telefoneInputText}
                    onChangeText={capturarCelular}
                    value={celular}
                />
                <Button
                    title="+"
                    onPress={adicionarContato}
                />
            </View>
            <FlatList
                data={contatos}
                renderItem={
                    lembrete => (
                        <View style={styles.itemNaLista}>
                            <Text>#{lembrete.item.key}</Text>
                            <Text>Nome: {lembrete.item.nome}</Text>
                            <Text>Celular: {lembrete.item.celular}</Text>
                        </View>
                    )
                }
            />
        </View>
    );
}
