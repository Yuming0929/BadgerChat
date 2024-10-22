import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
function BadgerLogoutScreen(props) {

    function handle_logout(){
        SecureStore.deleteItemAsync("jwt");
        props.setIsLoggedIn(false);
        props.setIsRegistering(false);
        return;

    }

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Are you sure you're done?</Text>
        <Text>Come back soon!</Text>
        <Text/>
        <Button title="Logout" color="darkred" onPress={handle_logout}/>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});

export default BadgerLogoutScreen;