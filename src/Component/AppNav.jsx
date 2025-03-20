
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Alert, Button, Image, ImageBackground, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import UserDetails from './Details';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
const Stack = createNativeStackNavigator();;

const NavigateUsingStack = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { width, height } = useWindowDimensions(); // Dynamically get width of the screen
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async (size) => {
            try {
                const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`);
                const data = await response.json();
                setUsers(data);
                setLoading(false);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                Alert.alert('Error', 'An error occurred while fetching data. Please try again later.');
            }
            // finally {
            //     setLoading(false); // This will run whether there is an error or not
            // }
        };
        fetchUsers(80);
    }, []);

    if (loading) {
        return (
          
            <LinearGradient
                colors={['#ffffff', '#3a506b',]} // for Gradient Colors
                style={styles.linearContainer}
            >
            {/* // <ImageBackground
            //     source={require('../images/Loading.jpg')}
            //     // source={{ uri: 'https://your-image-url.com/bg.jpg' }} // For uri image
            //     style={{
            //         flex: 1,
            //         // height: height,
            //         // width: width,

            //     }}
            //     resizeMode="cover"
            // > */}
                <SafeAreaView >
                    <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} translucent />
                    <ActivityIndicator size="large" color="black" style={styles.loader} />
                </SafeAreaView>
            {/* // </ImageBackground> */}
            </LinearGradient>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="UserDetails"
                    component={UserDetails}
                    initialParams={{ users, index: 0, userslength: users.length }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigateUsingStack

const styles = StyleSheet.create({
    loader: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    linearContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
})