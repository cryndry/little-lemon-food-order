import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const MenuItem = ({ item }) => {
    return (
        <View style={styles.ItemContainer}>
            <View style={styles.ItemInfos}>
                <Text style={styles.ItemName}>{item.name}</Text>
                <Text style={styles.ItemDescription}>{item.description}</Text>
                <Text style={styles.ItemPrice}>${item.price}</Text>
            </View>
            <Image style={styles.ItemImage} source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} />
        </View>
    );

};

export default function Menu({menuItems}) {
    return (
        <View style={styles.Menu}>
            <FlatList
                data={menuItems}
                renderItem={MenuItem}
                style={{ marginTop: 16 }}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    Menu: {
        width: "100%",
    },
    ItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 20,
        gap: 16,
    },
    ItemInfos: {
        flex: 1,
        rowGap: 8
    },
    ItemName: {
        fontWeight: "bold",
        fontSize: 22
    },
    ItemDescription: {
        color: "#495E57",
        fontWeight: "500"
    },
    ItemPrice: {
        color: "#495E57",
        fontWeight: "bold",
        fontSize: 18
    },
    ItemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: "black"
    }
});