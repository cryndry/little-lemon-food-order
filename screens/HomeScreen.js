import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import {
    createTable,
    getCategories,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
} from '../database.js';

export default function HomeScreen() {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function checkData() {
            await createTable();
            let menuItems = await getMenuItems();
            if (!menuItems.length) {
                fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json")
                    .then(response => response.json())
                    .then(result => {
                        setMenuItems(result.menu);
                        saveMenuItems(result.menu);
                    });
                return;
            }
            setMenuItems(menuItems);
            const categories = await getCategories();
            setCategories(() => categories.map(obj => obj.category));
        };
        checkData();
    }, []);

    useEffect(() => {
        (async () => {
            const menuItems = await filterByQueryAndCategories(searchTerm, activeCategory);
            setMenuItems(menuItems);
        })();
    }, [searchTerm, activeCategory]);

    return (
        <ScrollView>
            <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Categories
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <Menu menuItems={menuItems} />
        </ScrollView>
    );
};