import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { FilterStatus } from "@/types/FilterStatus";

import { styles } from './styles'
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Você não digitou nada! 😳")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await getItems()

    setDescription("")
    setFilter(FilterStatus.PENDING)
  }

  async function getItems() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      Alert.alert("Erro", "Não deu pra mostrar os items amigo.. 😔")
    }
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)
      await getItems()
    } catch (error) {
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  async function handleToggleItemStatus(id: string){
    try {
      await itemsStorage.toogleStatus(id)
      await getItems()
    } catch(error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  function handleClear(){
    Alert.alert("Limpar", "Deseja remover todos os itens?", [
      {text: "Sim", onPress: () => onClear()},
      {text: "Não", style: "cancel"},
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover todos os itens.")
    }
  }

  useEffect(() => {
    getItems()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.image} />

      <View style={styles.form}>
        <Input
        placeholder="Digite aqui..."
        onChangeText={setDescription}
        value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
        {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)} />
        ))}
          <TouchableOpacity style={styles.clearButton} onPress={() => handleClear()}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Item data={{status: item.status, description: String(item.description)}}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          ItemSeparatorComponent={() =><View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

