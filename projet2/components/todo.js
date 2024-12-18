import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ToDoApp = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Faire les courses',
      description: 'Acheter de la nourriture pour la semaine',
    },
    {
      id: '2',
      title: 'Aller à la salle de sport 3 fois par semaine',
      description: 'Rester en forme et en bonne santé',
    },
    {
      id: '3',
      title: 'Monter à plus de 5000m d\'altitude',
      description: 'Relever un défi physique et personnel',
    },
    {
      id: '4',
      title: 'Acheter mon premier appartement',
      description: 'Devenir propriétaire et investir dans l\'immobilier',
    },
    {
      id: '5',
      title: 'Perdre 5 kgs',
      description: 'Atteindre mon objectif de poids idéal',
    },
    {
      id: '6',
      title: 'Gagner en productivité',
      description: 'Optimiser mon temps et mes tâches au quotidien',
    },
    {
      id: '7',
      title: 'Apprendre un nouveau langage',
      description: 'Développer de nouvelles compétences linguistiques',
    },
    {
      id: '8',
      title: 'Faire une mission en freelance',
      description: 'Acquérir de l\'expérience dans le travail indépendant',
    },
    {
      id: '9',
      title: 'Organiser un meetup autour de la tech',
      description: 'Créer une communauté locale autour de mes centres d\'intérêt',
    },
    {
      id: '10',
      title: 'Faire un triathlon',
      description: 'Relever un défi sportif et atteindre un nouvel objectif',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = () => {
    setShowModal(true);
    setCurrentTask(null);
    setTitle('');
    setDescription('');
  };

  const saveTask = () => {
    if (currentTask) {
      const updatedTasks = tasks.map((t) => (t.id === currentTask.id ? { id: currentTask.id, title, description } : t));
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, { id: Math.random().toString(36).substr(2, 9), title, description }]);
    }
    setShowModal(false);
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setShowModal(true);
  };

  return (
    <ImageBackground source={{ uri: '/api/placeholder/1920/1080' }} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Objectifs</Text>
        <ScrollView style={styles.taskList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <View>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
              </View>
              <TouchableOpacity onPress={() => editTask(task)}>
                <MaterialIcons name="edit" size={24} color="#9333ea" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Ajouter un objectif</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentTask ? 'Modifier un objectif' : 'Ajouter un objectif'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Titre"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.button} onPress={saveTask}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  taskList: {
    flex: 1,
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  addButton: {
    backgroundColor: '#9333ea',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#9333ea',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ToDoApp;