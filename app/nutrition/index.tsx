import { useDataStore } from '@/store/data';
import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { Data } from '@/types/data';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
interface ResponseData {
  data: Data;
}
export default function Nutrition() {

  const { user } = useDataStore();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['nutrition'],
    queryFn: async () => {
      try {
        if (!user) throw new Error('Falha ao gerar dieta');

        const response = await api.post<ResponseData>('/nutrition', user);
        // const response = await api.get<ResponseData>('/teste');
        return response.data.data
      }
      catch (error) {
        console.log(error);
      }
    }
  })

 async function handleShare() {
  try {
    if(data &&Object.keys(data).length ===0)  return;

    const supplements = `${data?.suplementos.map((item) => ` ${item}`)}` 
    const foods = `${data?.refeicoes.map(item => `\n- Nome: ${item.nome}\n- Horario: ${item.horario}\n- Alimentos: ${item.
      alimentos.map(alimento => `${alimento}`)}`)}`

    const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\nDica Suplemento: ${supplements}`

      await Share.share({
        message: message
      })
  }catch (error) {
    console.log(error);
  }
    console.log('clicou')
  }
  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta...</Text>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta</Text>
        <Link href="/create">
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>

        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>

          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>

            <Text style={styles.label}>Refeições: </Text>
            <ScrollView>
              <View style={styles.foods}>
                {data.refeicoes.map((refeicao, i) => (
                  <View style={styles.food} key={i}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{refeicao.nome}</Text>
                      <Ionicons name="restaurant-outline" size={13} />
                    </View>
                    <View style={styles.foodContent}>
                      <Ionicons name="time-outline" size={15} />
                      <Text>Horário: {refeicao.horario}</Text>
                    </View>
                    <Text style={styles.foodText}>Alimentos:</Text>
                    {refeicao.alimentos.map((alimento, i) => (
                      <Text style={{ marginBottom: 4 }} key={i}>{alimento}</Text>
                    ))}
                  </View>
                ))}
              </View>
              <View style={styles.supplements}>
                <Text style={styles.foodName}>Dica de Suplementos:</Text>
                {data.suplementos.map((suplemento, i) => (
                  <Text style={{ marginBottom: 4 }} key={i}>{suplemento}</Text>
                ))}
              </View>
              <Pressable style={styles.button} onPress={() => { router.replace('/') }}>
                <Text style={styles.buttonText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 16,

  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.background
  },
  buttonShare: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    padding: 8,
  },
  buttonShareText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8
  },
  objective: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8
  },
  foods: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 14,
    marginTop: 8,
    gap: 8,
  },
  food: {
    backgroundColor: '#ececec',
    borderRadius: 8,
    padding: 8,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodContentText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  supplements: {
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.black
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }

});