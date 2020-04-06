import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import api from '../services/api';

const Main = () => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function loadProducts() {
    console.log('try');
    console.log(loading, pages, page);
    const nextPage = page + 1;

    if (loading)
      return;
    if (pages > 0 && pages == page)
      return;

    setLoading(true);

    console.log('carregando');
    console.log(loading, pages, page);
    const response = await api.get(`/products/?page=${nextPage}`);

    setProducts([...products, ...response.data.docs]);
    setTotal(response.data.total);
    setPages(response.data.pages);
    console.log(response.data);
    setPage(nextPage);
    setLoading(false);
  }

  function navigateToProduct(product) {
    navigation.navigate('Product', { product });
  }


  useEffect(() => {
    loadProducts();
  }, []);

  function renderProduct({ item: product }) {
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.productButton} onPress={() => { navigateToProduct(product) }}>
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textApp}>App Main</Text>
      <FlatList
        data={products}
        contentContainerStyle={styles.list}
        keyExtractor={product => product._id}
        showsVerticalScrollIndicator={true}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.2}
        renderItem={renderProduct} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textApp: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    backgroundColor: "#da552f",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    padding: 5
  }
});

export default Main;
