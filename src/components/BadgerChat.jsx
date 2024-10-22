import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerSignupScreen from "./screens/BadgerSignupScreen";

import CS571 from '@cs571/mobile-client';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  const [jwt, setJwt] = useState("");
  const [guest, setGuest] = useState(false);

  useEffect(() => {

    fetch("https://cs571.org/api/f23/hw9/chatrooms",{
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)})
  
  }, []);

  function handleLogin(username, password) {
    
    setIsLoggedIn(true); 
  }

  function handleSignup(username, password) {

    setIsLoggedIn(true); 
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} guest={guest}/>}
              </ChatDrawer.Screen>
            })
          }
          {guest?
          <>
            <ChatDrawer.Screen name="Signup"  >
            {(props) => <BadgerSignupScreen setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} setGuest={setGuest}></BadgerSignupScreen>}
            </ChatDrawer.Screen>
          </>
          :
          <ChatDrawer.Screen name="Logout"  >
            {(props) => <BadgerLogoutScreen setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} style={{backgroundColor: "red"}}></BadgerLogoutScreen>}
          </ChatDrawer.Screen>
          }
          
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} jwt={jwt} setJwt={setJwt} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} jwt={jwt} setJwt={setJwt} setIsLoggedIn={setIsLoggedIn} setGuest={setGuest}/>
  }
}