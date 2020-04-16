import React, { useEffect, useState } from 'react';
//import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';  //view é igual a div que temos no html.
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';  //view é igual a div que temos no html.

import api from './services/api';

//Não possuem valor semântico (significado).
//Não possuem estilização própria.
//Todos os componentes possuem por padrão "display: flex"

//View: div, footer, header, main, aside, section
//Text: p, span, strong, h1, h2, h3

export default function App() {    //exportando um componente chamdo app
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    })
  }, []); //Ja que nao tenho variavel no array ele vai disparar uma unica vez.


  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    const project = response.data

    setProjects([...projects, project]); //criar novo vetor, repeitado conceito de imutabilidade
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

      <SafeAreaView style={styles.container}>
        <FlatList 
          // style={styles.container}
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />

        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* <View style={styles.container}>
        {projects.map(project => (
        <Text style={styles.project} key={project.id}>{project.title}</Text>
        ))}
      </View>   */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#FFF',
    fontSize: 30,
  },

  button: {
    // alignSelf: 'stretch',
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});