import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import CS571 from '@cs571/mobile-client';

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [passwordEmpty, setPasswordEmpty] = useState(true);

    function detectEmpty(){
        if(password.length === ""){
            setPasswordEmpty(true);
        }else{
            setPasswordEmpty(false);
        }
        

    }
    function handle_register(){

        if(password != repeatPassword){
            Alert.alert("Your passwords do not match!");
            return ;
        }
        let success = 0;

        fetch("https://cs571.org/api/f23/hw9/register", {
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
            if(res.status === 409){
                Alert.alert("The username has already been taken!")
                
            }
            if(res.status === 200){
                Alert.alert("Signup successful!")
                props.handleSignup(username, password)
                success = 1;
                return res.json()
            }

        }).then(json => {
            if(success == 1){
                SecureStore.setItemAsync("jwt", json.token)
            }
        })
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername}></TextInput>
        <Text>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} onChange={detectEmpty} secureTextEntry={true}></TextInput>
        <Text>Confirm Password</Text>
        <TextInput style={styles.input} value={repeatPassword} onChangeText={setRepeatPassword} secureTextEntry={true}></TextInput>
        <TextInput></TextInput>
        {passwordEmpty? 
        <Text>Please enter a password</Text>
        :<></>}
        <Button color="crimson" title="Signup" disabled={passwordEmpty} onPress={() => {
            handle_register()
            }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;