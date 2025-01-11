import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform
} from "react-native";

import { Feather } from '@expo/vector-icons';
import { colors } from "@/constants/colors";
import {router } from "expo-router";
interface HeaderProps {
    step: string;
    title: string;
}
export function Header({step, title}: HeaderProps) {
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Pressable onPress={() => { router.back()}}>
                        <Feather name="arrow-left" size={24} color="#000" />
                    </Pressable>
                    <Text style={styles.text}>
                        {step} <Feather name="refresh-ccw" size={20} color="#000" />
                    </Text>
                </View>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        marginBottom: 14,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 34 : 34
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 34,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 8,
        color: colors.background
    }
})