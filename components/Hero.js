import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView } from "react-native";
import hero from "../images/HeroImage.png";

export default function Hero({ searchTerm, setSearchTerm }) {
    return (
        <View style={styles.Hero}>
            <Text style={styles.Title}>Little Lemon</Text>
            <View style={styles.Infos}>
                <View style={styles.Texts}>
                    <Text style={styles.Location}>Chicago</Text>
                    <Text style={styles.Description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                </View>
                <Image source={hero} style={styles.HeroImage} resizeMode="cover" />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "position"}
            >
                <View style={styles.SearchBar}>
                    <TextInput
                        style={styles.SearchInput}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        placeholder="You may search on our menu!"
                        keyboardType="default"
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        backgroundColor: "#495E57",
        width: "100%",
        padding: 20

    },
    Title: {
        color: "#F4CE14",
        fontSize: 48,
        lineHeight: 60
    },
    Infos: {
        flexDirection: "row"
    },
    Texts: {
        flex: 1
    },
    Location: {
        color: "white",
        fontSize: 30
    },
    Description: {
        color: "white",
        fontSize: 18,
        marginTop: 8
    },
    HeroImage: {
        width: 140,
        height: 140,
        marginLeft: 12,
        marginTop: 20,
        borderRadius: 20
    },
    SearchBar: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 12,
        width: "100%",
        borderRadius: 10,
        justifyContent: "center",
        backgroundColor: "white"
    }
});