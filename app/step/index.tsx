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
import { router } from "expo-router";
import { useDataStore } from "@/store/data";

const schema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    weight: z.string().min(1, { message: 'O peso é obrigatório' }),
    height: z.string().min(1, { message: 'A altura é obrigatória' }),
    age: z.string().min(1, { message: 'A idade é obrigatória' }),

    // gender: z.string().min(1, {message: 'O gênero é obrigatório'}),
    // objective: z.string().min(1, {message: 'O objetivo é obrigatório'}),
    // level: z.string().min(1, {message: 'O nível é obrigatório'})
})
type FormData = z.infer<typeof schema> //vai respeitar as regras de validação do schema
export default function Step() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            weight: '',
            height: '',
            age: '',
        }
    })

    const {setPageOne} = useDataStore()

    function onSubmit(data: FormData) {
       setPageOne({
        ...data
       })
        router.push('/create')
    }

    return (
        <View style={styles.container}>
            <Header step={`Passo 1`} title="Vamos começar" />
            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    name="name"
                    control={control}
                    placeholder="Digite o seu nome..."
                    // rules={{required: true}}
                    error={errors.name?.message}
                    keyboardType="default"
                />
                <Text style={styles.label}>Seu peso atual:</Text>
                <Input
                    name="weight"
                    control={control}
                    placeholder="Ex: 80"
                    error={errors.weight?.message}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Sua altura atual:</Text>
                <Input
                    name="height"
                    control={control}
                    placeholder="Ex: 182"
                    error={errors.height?.message}
                    // rules={{required: true}}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Sua idade atual:</Text>
                <Input
                    name="age"
                    control={control}
                    placeholder="Ex: 25"
                    error={errors.age?.message}
                    
                    keyboardType="default"
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
    }
})
