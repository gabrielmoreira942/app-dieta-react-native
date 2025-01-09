import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { colors } from "@/constants/colors";
export default function Index() {
  return (
    <View
    style={styles.container}
    >
      <Image
        source={require("../assets/images/logo.png")}
      />
      <Text style={styles.title}>
        Dieta<Text style={{color: colors.white}}>.AI</Text>
      </Text>
      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Gerar dieta</Text>
      </Pressable>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.green
  },
  text: {
    fontSize: 16,
    color: colors.white,
    width: 300,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    width: '100%',
    alignItems: "center",
    padding: 12,
    marginTop: 36
    // justifyContent: "center",
    // height: 40
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  }
})