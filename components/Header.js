import { Image, Pressable, StyleSheet, View } from 'react-native';
import profile from "../images/Profile.png";
import logo from "../images/Logo.png";

export default Header = ({ navigation, profileButton }) => {
  return (
    <View style={styles.Header}>
      <Image source={logo} style={styles.Logo} />
      {profileButton ? (
        <Pressable style={styles.ProfileContainer} onPress={() => {navigation.replace("Home")}} >
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
    alignItems: "center"
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