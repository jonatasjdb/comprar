import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from './styles'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

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
      </View>
    </View>
  )
}

