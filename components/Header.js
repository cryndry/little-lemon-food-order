import { Image, StyleSheet, Text, View } from 'react-native';
import profile from "../images/Profile.png";
import logo from "../images/Logo.png";

export default Header = () => {
  return (
    <View style={styles.Header}>
      <Image source={logo} style={styles.Logo} />
      <Image source={profile} style={styles.Profile} />
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    padding: 20,
    width: "100%",
    alignItems: "center"
  },
  Profile: {
    width: 64,
    height: 64,
    position: "absolute",
    right: 24,
    top:12,
  }
});