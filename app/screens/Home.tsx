import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useClickCount } from "./ClickCountContext"; // Import the custom hook

// Define the type for the item data (nutritional product data)
interface Item {
  product_name: string;
  brands: string;
  nutrition_grades: string;
  image_url: string | null;
}

const API_URL = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=kids&search_simple=1&json=true&fields=product_name,brands,nutrition_grades,image_url";

const Home = ({ route }: any) => {
  const { username } = route.params; // Extract the username passed as a parameter

  const { clickCount, incrementClickCount } = useClickCount(); // Use the context to access and update the count

  const [items, setItems] = useState<Item[]>([]); // State to store fetched items

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
          Brand: {item.brands || "Unknown"} | Nutrition Grade: {item.nutrition_grades || "N/A"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Home Page</Text>
      <Text style={styles.username}>Hello, {username}</Text>

      {/* Render the list of items */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    color: "#69D4DC",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: 300,
    alignItems: "center",
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
});

export default Home;
