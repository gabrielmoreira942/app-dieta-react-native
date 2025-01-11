import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView
} from "react-native";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Select } from "@/components/input/select";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";
const schema = z.object({
    gender: z.string().min(1, { message: 'O sexo é obrigatório' }),
    objective: z.string().min(1, { message: 'O objetivo é obrigatório' }),
    level: z.string().min(1, { message: 'Selecione o seu level' })
})
type FormData = z.infer<typeof schema> //vai respeitar as regras de validação do schema
export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            gender: '',
            objective: '',
            level: ''
        }
    })

    const { setPageTwo } = useDataStore()

    function onSubmit(data: FormData) {
        setPageTwo({...data})
        router.push('/nutrition')
    }

    const genderOptions = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' }
    ];
    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
    ]
    return (
        <View style={styles.container}>
            <Header step={`Passo 2`} title="Finalizando dieta" />
            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                    control={control}
                    name="gender"
                    placeholder="Selecione o seu sexo..."
                    error={errors.gender?.message}
                    options={genderOptions}
                />

                <Text style={styles.label}>Selecione nível de atividade física:</Text>
                <Select
                    control={control}
                    name="level"
                    placeholder="Selecione o nível de atividade física"
                    error={errors.level?.message}
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione seu objetivo:</Text>
                <Select
                    control={control}
                    name="objective"
                    placeholder="Selecione o nível de atividade física"
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
        borderColor: 'red',
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    button: {
        backgroundColor: colors.blue,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
})
