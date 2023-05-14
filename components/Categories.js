import { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export const CategoryButton = ({ title, activeCategory, setActiveCategory }) => {
    const onPressButton = useCallback(() => {
        if (activeCategory != title) {
            setActiveCategory(title);
        } else {
            setActiveCategory("");
        }
    }, [activeCategory]);
    
    return (
        <Pressable onPress={onPressButton}
            style={{ ...styles.CategoryButton, ...((activeCategory === title) ? styles.CategoryButtonActive : null) }}
        >
            <Text style={{ ...styles.CategoryButtonText, ...((activeCategory === title) ? styles.CategoryButtonTextActive : null) }}>
                {title}
            </Text>
        </Pressable>
    );
};

export default function Categories({ categories, activeCategory, setActiveCategory }) {
    return (
        <View style={styles.Categories}>
            <Text style={styles.Title}>Order For Delivery!</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.Buttons}>
                {categories.map(title => (
                    <CategoryButton
                        key={title}
                        title={title}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    Categories: {
        padding: 20,

    },
    Title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    Buttons: {
        marginTop: 12,
        columnGap: 16
    },
    CategoryButton: {
        backgroundColor: "#EDEFEE",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20
    },
    CategoryButtonText: {
        fontSize: 18,
        color: "#333333",
        lineHeight: 24
    },
    CategoryButtonActive: {
        backgroundColor: "#EE9972"
    },
    CategoryButtonTextActive: {
        fontSize: 20,
        color: "white"
    },
});