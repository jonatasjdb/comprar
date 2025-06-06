import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { FilterStatus } from "@/types/FilterStatus";

import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  {id: "1", status: FilterStatus.DONE, description: "1 package coffe"},
  {id: "2", status: FilterStatus.DONE, description: "3 package coffe"},
  {id: "3", status: FilterStatus.PENDING, description: "6 package coffe"},
]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.image} />

      <View style={styles.form}>
        <Input placeholder="Digite aqui..." />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
        {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
        ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEMS}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Item data={{status: item.status, description: String(item.description)}}
              onStatus={() => console.log('Status')}
              onRemove={() => console.log('Remove')}
            />
          )}
          ItemSeparatorComponent={() =><View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  )
}

