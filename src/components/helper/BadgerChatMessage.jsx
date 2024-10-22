import { Text, Button, Alert } from "react-native";
import BadgerCard from "./BadgerCard"

import CS571 from '@cs571/mobile-client';
import * as SecureStore from "expo-secure-store";
function BadgerChatMessage(props) {

    const dt = new Date(props.created);

    function deletePost(){

        SecureStore.getItemAsync("jwt").then(result => {
            
            fetch('https://cs571.org/api/f23/hw9//messages?id='+props.id, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Authorization": "Bearer " + result,
                "Content-Type": "application/json"
            }
            })
            .then(res => {
                if(res.status === 200){
                    Alert.alert("Successfully deleted")
                    props.loadMessages()
                }
                props.loadMessages()
                // if(res.status == 200){
                //     Alert.alert("Successfully deleted")
                //     props.loadMessages()
                // }

            })
                
            
            })

    }

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        { props.username === props.poster? <Button title="DELETE POST" color="red" onPress={deletePost}></Button>: <></>}

    </BadgerCard>
}

export default BadgerChatMessage;