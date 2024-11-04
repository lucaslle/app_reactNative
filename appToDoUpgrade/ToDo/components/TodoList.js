import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Faire les courses', description: 'Acheter du fromage' },
    { id: '2', title: 'Sport', description: 'salle de sport 3 fois par semaine' },
    { id: '3', title: 'Marche', description: 'Monter à plus de 5000m d altitude' },
    { id: '4', title: 'Appartement', description: 'Acheter mon premier appartement' },
    { id: '5', title: 'Régime', description: 'Perdre 5 kgs' },
    { id: '6', title: 'Gagner en productivité', description: '' },
    { id: '7', title: 'S instruire', description: 'Apprendre un nouveau langage' },
    { id: '8', title: 'Travail', description: 'Faire une mission en freelance' },
    { id: '9', title: 'Organiser un meetup autour de la tech', description: '' },
    { id: '10', title: 'Faire un triathlon', description: 'Entrainement a la course' },

  ]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addOrUpdateTask = () => {
    if (editingTaskId) {
      setTasks(tasks.map(t => (t.id === editingTaskId ? { ...t, title, description } : t)));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), title, description }]);
    }
    setTitle('');
    setDescription('');
    setModalVisible(false);
  };

  const startEditingTask = (id, title, description) => {
    setEditingTaskId(id);
    setTitle(title);
    setDescription(description);
    setModalVisible(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setTitle('');
      setDescription('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Ajouter" onPress={() => setModalVisible(true)} color="#6200ee" />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => startEditingTask(item.id, item.title, item.description)}>
              <Text style={styles.taskText}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </TouchableOpacity>
            <Button title="Supprimer" onPress={() => deleteTask(item.id)} color="#6200ee" />
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              placeholder="Titre de la tâche"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Description de la tâche"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#888"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addOrUpdateTask}>
              <Text style={styles.textStyle}>Enregistrer</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                setTitle('');
                setDescription('');
              }}>
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#fff', 
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333', 
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff', // Couleur de fond de la modal
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: '80%',
  },
  buttonClose: {
    backgroundColor: '#6200ee', // Couleur de fond des boutons
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoList;
