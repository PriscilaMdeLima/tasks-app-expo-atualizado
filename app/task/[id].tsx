import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { useTaskStore } from '../../src/store/useTaskStore';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const task = useTaskStore((state) => state.tasks.find((item) => item._id === id));

  if (!task) {
    return <Text>Tarefa não encontrada.</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{task.text}</Text>
      <Text>Status: {task.completed ? 'Concluída' : 'Pendente'}</Text>
      {task.dueDate && <Text>Data limite: {new Date(task.dueDate).toLocaleDateString()}</Text>}
    </View>
  );
}
