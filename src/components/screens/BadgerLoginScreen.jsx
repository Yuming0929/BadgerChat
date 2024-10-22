import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import CS571 from '@cs571/mobile-client';
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

function BadgerLoginScreen(props) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handle_login(){

        let success = 0;
        fetch("https://cs571.org/api/f23/hw9/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            if(res.status != 200){
                Alert.alert("Incorrect username or password")
                return;
            }
            if(res.status == 200){
                success = 1;
                Alert.alert("login successful!")
                props.handleLogin(username, password)
                return res.json()
            }
            
        }).then(json =>{
            if(success == 1){
                SecureStore.setItemAsync("jwt", json.token)
                SecureStore.setItemAsync("username", username)
            }
            
        })

    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername}></TextInput>
        <Text>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true}></TextInput>
        <Button color="crimson" title="Login" onPress={() => {

            handle_login();
            
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue As Guest" onPress={() => {
            props.setGuest(true);
            props.setIsLoggedIn(true)}}></Button>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 30,
        width: 150,
        margin: 12,
        borderWidth: 1,
        padding: 0,
      },
});

export default BadgerLoginScreen;