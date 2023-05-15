import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import profile from "../images/Profile.png";
import logo from "../images/Logo.png";
import arrowLeft from "../images/arrowLeft.png";

const BackButton = ({ navigation }) => (
  <Pressable style={styles.BackButton} onPress={() => { navigation.goBack() }} >
    <Image source={arrowLeft} style={{tintColor: "white"}} />
  </Pressable>
);

export default Header = ({ navigation, profileButton }) => {
  const [backButtonActive, setBackButtonActive] = useState(false);

  useEffect(() => {
    if (navigation?.canGoBack()) {
      setBackButtonActive(true);
    } else {
      setBackButtonActive(false);
    }
  }, [navigation]);
  
  return (
    <View style={styles.Header}>
      {backButtonActive ? (<BackButton navigation={navigation} />) : (<></>)}
      <Image source={logo} style={styles.Logo} />
      {profileButton ? (
        <Pressable style={styles.ProfileContainer} onPress={() => { navigation.push("Profile") }} >
          <Image source={profile} style={styles.Profile} />
        </Pressable>
      ) : (<></>)}
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  BackButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
    color: "white",
    backgroundColor: "#495E57",
    borderRadius: 50,
  },
  ProfileContainer: {
    position: "absolute",
    right: 24,
    top: 12,
  },
  Profile: {
    width: 64,
    height: 64,
  }
});