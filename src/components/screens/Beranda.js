import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';

const cats = [
  {
    id: '1',
    name: 'Kucing Onde Mande',
    price: '2,000,000 IDR',
    image: 'https://i.pinimg.com/474x/10/be/fa/10befad13247f1ee2a82ac7a81496575.jpg',
    description: 'Kucing yang siap menghadiri rapat adat Minangkabau, lengkap dengan mahkota kebanggaan! Onde mande, jangan macam-macam sama dia! 😼',
  },
  {
    id: '2',
    name: 'Kucing Sigma',
    price: '1,800,000 IDR',
    image: 'https://i.pinimg.com/474x/13/d2/e6/13d2e68e67bbd1e58c3aa5ef95c63331.jpg',
    description: 'Kucing ini punya aura sigma male yang kuat—tatapan tajam, rahang tegas, dan sikap seolah berkata, "Aku tidak butuh manusia, manusia yang butuh aku" 🐱💼',
  },
  {
    id: '3',
    name: 'Kucing Akmal',
    price: '3,500,000 IDR',
    image: 'https://i.pinimg.com/736x/7d/10/e4/7d10e40d8dbe1aab7b8968bbf5892e17.jpg',
    description: 'Kucing ini tampaknya telah resmi menjadi bagian dari tim baseball favoritnya! Dengan topi merah bergaya, dia siap untuk bermain home run atau sekadar nge-gang di lapangan parkir. Jangan main-main, dia punya aura MVP (Most Valuable Puss)! 🐾⚾',
  },
  {
    id: '4',
    name: 'Kucing Menggoda',
    price: '4,320,000 IDR',
    image: 'https://i.pinimg.com/736x/e9/98/ce/e998cecc8929cad4d8be213f4ec61f6b.jpg',
    description: 'Kucing ini sepertinya sedang menjalankan jurus menggoda level maksimal! Dengan ekspresi penuh percaya diri dan lidah yang terjulur sedikit, dia bilang, "Mau jadian sama aku atau nyesel seumur hidup?" 😏🐾',
  },
  {
    id: '4',
    name: 'Kucing Cina',
    price: '5,230,000 IDR',
    image: 'https://i.pinimg.com/236x/71/37/16/713716f9471fb7ec013b17d29ea2811c.jpg',
    description: 'Ini kucing udah jadi boss final, bro. Topi merahnya auto flex, kumisnya on point, tatapannya bilang, "Lu gak bakal survive, hayyaaa~" Vibes-nya kayak guru silat yang lagi roasting murid noob. 🐾🔥',
  },
  {
    id: '4',
    name: 'Kucing Suss',
    price: '3,500,000 IDR',
    image: 'https://i.pinimg.com/736x/c7/52/1b/c7521bf031dcb72a2732ab9e2f0e57b8.jpg',
    description: 'Pas kucing lo pulang dengan alis hasil DIY terus ngira dia udah glow up maksimal kayak cewek-cewek di TikTok yang vibe-nya hot banget, tapi realitanya malah mirip karakter random di drama 18+ yang cuma muncul buat plot twist receh.',
  },
  {
    id: '4',
    name: 'Kucing Berotot',
    price: '7,000,000 IDR',
    image: 'https://i.pinimg.com/236x/a6/eb/a9/a6eba9c1a35d6e4364964b5edf7620cb.jpg',
    description: 'Ini nih kucing gym bro yang udah nggak main-main sama workout-nya. Otot lehernya gede banget, kayak tiap malam dia nge-gym sambil dengerin playlist motivasi. Pasti nih kucing tipe yang kalau nongkrong suka flex otot dulu biar kelihatan alpha banget. Ngajak sparring? Mending mundur deh, lo bakal kalah mental duluan sebelum mulai!" 😎💪🐾',
  },
];

const Beranda = () => {
  const [search, setSearch] = useState('');
  const filteredCats = cats.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuy = (catName) => {
    Alert.alert('Purchase Successful', `You have bought ${catName}!`);
  };

  const renderCatCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => handleBuy(item.name)}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=1080&q=80',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Available Cats for Sale</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search cats..."
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredCats}
          renderItem={renderCatCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default Beranda;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Warna putih
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  searchBar: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 16,
    color: '#6A6A6A',
    marginBottom: 5,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6A6A6A',
    marginBottom: 10,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
