import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
function BadgerSignupScreen(props) {

    function handle_signup(){

        props.setIsRegistering(true);
        props.setIsLoggedIn(false);
        props.setGuest(false);
        return;

    }

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make post!</Text>
        <Text/>
        <Button title="SIGNUP" color="darkred" onPress={handle_signup}/>

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

export default BadgerSignupScreen;