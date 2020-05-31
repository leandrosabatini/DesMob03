import React, { useState } from 'react';
import Cores from '../constantes/Cores';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import PreviewDoMapa from './PreviewDoMapa'
import { combineReducers } from 'redux';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';

const CapturaLocalizacao = (props) => {
    const [estaCapturando, setEstaCapturando] = useState(false);
    const [localizacaoSelecionada, setLocalizacaoSelecionada] = useState();

    const capturarLocalizacao = async () => {
        
        const temPermissao = await verificarPermissoes();
        if (temPermissao) {
            setEstaCapturando(true);
            try {
                const localizacao = await Location.getCurrentPositionAsync({
                    timeout:
                    8000
                });
                setLocalizacaoSelecionada({
                    lat: localizacao.coords.latitude,
                    lng: localizacao.coords.longitude
                });

                props.handleLocalizacao(localizacao.coords.latitude, localizacao.coords.longitude);
            }
            catch (err) {
                Alert.alert(
                    "Impossível obter localização",
                    "Tente novamente mais tarde ou escolha uma no mapa",
                    [{ text: "Ok" }]
                );
            }
            setEstaCapturando(false);
        }
    };

    const verificarPermissoes = async () => {
        const resultado = await Permissions.askAsync(Permissions.LOCATION);
        if (resultado.status !== "granted") {
            Alert.alert(
                'Sem permissão para uso do mecanismo de localização',
                "É preciso liberar acesso ao mecanismo de localização",
                [{ text: "Ok" }]
            )
            return false;
        }
        return true;
    }

    return (
        <View style={estilos.capturaLocalizacao}>
            <PreviewDoMapa
                style={estilos.previewDoMapa}
                localizacao={localizacaoSelecionada}
            >
                {
                    estaCapturando ?
                        <ActivityIndicator
                            size="large"
                            color={Cores.primary}
                        /> :
                        <Text>Nenhuma localização disponível.</Text>
                }
            </PreviewDoMapa>
            <Button
                title="Obter localização"
                color={Cores.primary}
                onPress={capturarLocalizacao}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    capturaLocalizacao: {
        marginBottom: 15
    },
    previewDoMapa: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#DDD',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CapturaLocalizacao;
