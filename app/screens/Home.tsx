import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useClickCount } from "./ClickCountContext"; // Import the custom hook
import { MaterialIcons } from "@expo/vector-icons"; // Importing the icon library

// Define the type for the item data (nutritional product data)
interface Item {
  product_name: string;
  brands: string;
  nutrition_grades: string;
  image_url: string | null;
}

const API_URL =
  "https://world.openfoodfacts.org/cgi/search.pl?search_terms=kids&search_simple=1&json=true&fields=product_name,brands,nutrition_grades,image_url";

const Home = ({ route }: any) => {
  const { username } = route.params; // Extract the username passed as a parameter
  const { clickCount, incrementClickCount } = useClickCount(); // Use the context to access and update the count
  const [items, setItems] = useState<Item[]>([]); // State to store fetched items
  const [showUsername, setShowUsername] = useState(false); // State to control username visibility

  // Fetch data from the Open Food Facts API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data.products); // Update the state with the fetched items
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Render each item as a card
  const renderItem = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity onPress={incrementClickCount} style={styles.card}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.image} />
        ) : (
          <Text>No image available</Text>
        )}
        <Text style={styles.status}>{item.product_name}</Text>
        <Text style={styles.description}>
          Brand: {item.brands || "Unknown"} | Nutrition Grade:{" "}
          {item.nutrition_grades || "N/A"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.usernameCard}><Text style={styles.username}>Hello, {username}</Text></View>

      <Text style={styles.subHeader}>Focus On</Text>
      <Text style={styles.header}>Nutrition</Text>
      <Text style={styles.subHeader}>Your Child Gets</Text>

      <View style={styles.DescriptionCard}>
      <Text style={styles.text}>Nutrition Grade: A fun and easy way to see how healthy your food is! Grade A means super healthy, helping you grow strong and feel great! Keep it up and aim for more Grade A foods to stay happy and energized!</Text>
      </View>

      {/* Render the list of items */}
      <View style={styles.CardContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Floating button at the bottom to show the click count */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>{clickCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  CardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Karla_700Bold",
    color: "#000",
    textAlign: "left",
  },
  subHeader: {
    fontSize: 18,
    fontFamily: "Karla_400Regular",
    color: "#666",
    textAlign: "left",
  },
  text: {
    fontSize: 16,
    fontFamily: "Karla_400Regular",
    color: "#fff",
    textAlign: "left",
  },
  username: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
    textAlign: "center",
  },
  usernameCard: {
    backgroundColor: "#F8F5E2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  DescriptionCard: {
    backgroundColor: "#69D4DC",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    marginTop: 20,
    width: 350,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: 300,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
    backgroundColor: "#69D4DC",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  threeDotsIcon: {
    position: "absolute",
    top: 30,
    right: 20,
  },
});

export default Home;
