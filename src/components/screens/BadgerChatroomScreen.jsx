import { StyleSheet, Text, View, ScrollView, Button, Modal, Alert } from "react-native";

import CS571 from '@cs571/mobile-client';
import BadgerChatMessage from "../helper/BadgerChatMessage";
import { useEffect, useState } from 'react';
import { TextInput } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const [user, setUser] = useState("");
    //for add post
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${activePage}`,{
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            getUsername()
        })
    }
    useEffect(loadMessages, [props]);

    function nextpage(){
        const curpage = activePage;
        setActivePage(curpage+1);
    }
    function prevpage(){
        const curpage = activePage;
        setActivePage(curpage-1);
    }

    useEffect(loadMessages, [activePage]);

    function addPost() {
        setModalVisible(true)
    }

    function handle_vis() {
        setModalVisible(false)
    }

    function handle_post(){
        
        SecureStore.getItemAsync("jwt").then(result => {
            fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Authorization": "Bearer " + result,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        }).then(res => {
            if(res.status == 200){
                Alert.alert("Successfully posted")
                setModalVisible(false)
                loadMessages()
            }
        })
        })
    }


    function getUsername(){
        SecureStore.getItemAsync("username").then(result => {
            if(result){
                setUser(result);
            }
        })

    }

    return <View style={{ flex: 1}}>
         

        <ScrollView>
        {(messages.length === 0)?
        <><Text style={{margin: 100}}>Loading messages......</Text></>
        :
        messages.map(message => {
            
            return <BadgerChatMessage  key={message.id} title={message.title}
            id={message.id} 
            poster={message.poster}content={message.content} 
            author={message.author} created={message.created}
            username={user} loadMessages={loadMessages}></BadgerChatMessage>
            
            
        })
        
        }
    </ScrollView >
    
    <View style={{height: 100}}>
    <Text style={{fontSize: 20, textAlign: "center"}}>Your are on page {activePage} of 4</Text>
    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
        <Button title="PREVIOUS PAGE" disabled={activePage==1} onPress={prevpage}></Button>
        <Button title="NEXT PAGE" disabled={activePage==4} onPress={nextpage}></Button>
    </View>
    
    <Button title="ADD POST" color="red" onPress={addPost} disabled={props.guest}></Button>
    </View>


        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}

        >
            <View style={styles.modalView}>
                <Text style={{fontSize: 20}}>Create A Post</Text>
                <Text>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle}></TextInput>
                <Text>Body</Text>
                <TextInput multiline style={styles.bodyInput} value={body} onChangeText={setBody}></TextInput>
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                <Button title="CREATE" disabled={title.length==0 || body.length==0} onPress={handle_post}></Button>
                <Button title="CANCEL" onPress={handle_vis}></Button>
                </View>
            </View>
        </Modal>
        </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },input: {
        height: 30,
        width: 150,
        margin: 12,
        borderWidth: 1,
        padding: 0,
      },bodyInput: {
        height: 150,
        width: 150,
        margin: 12,
        borderWidth: 1,
        padding: 0,
      },modalView: {
        marginTop: 200,
        margin: 50,
        backgroundColor: "white",
        borderRadius:20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      },
});

export default BadgerChatroomScreen;