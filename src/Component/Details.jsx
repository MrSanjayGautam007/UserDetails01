import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
const UserDetails = ({ navigation, route }) => {
    const { users, index, } = route.params;
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const { width, height } = useWindowDimensions(); // Dynamically get width of the screen
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setUser(users[index]);
            setLoading(false);
        }, 400); // Simulate a loading delay for user details
    }, [index]);

    if (loading || !user) { // If loading is true or user is null
        return (
            // Show a loading spinner
            <LinearGradient
                colors={['#ffffff', '#3a506b', ]} // Gradient Colors
                style={styles.linearContainer}
            >
                <SafeAreaView style={styles.loaderContainer}>
                    <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
                    <ActivityIndicator size="large" color="black" style={styles.loader} />
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#ffffff', '#3a506b', ]} // Gradient Colors
            style={[styles.linearContainer,{height:height,width:width}]}

        >
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>User Details</Text>

                    {/* Avatar */}
                    <View style={styles.avatarView}>
                        {imageLoading &&
                            // <ActivityIndicator size={'large'} color="#0000ff" style={{ alignItems: 'center', justifyContent: 'center' }} />
                            <View style={styles.loaderContainer}>
                                <Text style={styles.loaderText}>⏳</Text>

                            </View>


                        }

                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatar}
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                        />


                    </View>

                    {/* User Details */}
                    {/* <Text style={styles.text}> ID: {user.id}</Text>
                <Text style={styles.text}> UID: {user.uid}</Text>
                <Text style={styles.text}> First Name: {user.first_name}</Text>
                <Text style={styles.text}> Last Name: {user.last_name}</Text>
                <Text style={styles.text}> Username: {user.username}</Text>
                <Text style={styles.text}> Email: {user.email}</Text>
                <Text style={styles.text}> Password: {user.password}</Text> */}
                    {/* User Info Card */}
                    <View
                        //  style={styles.card}
                        style={styles.cardView}
                    >
                        <InfoRow label="ID" value={user.id} />
                        <InfoRow label="UID" value={user.uid} />
                        <InfoRow label="First Name" value={user.first_name} />
                        <InfoRow label="Last Name" value={user.last_name} />
                        <InfoRow label="Username" value={user.username} />
                        <InfoRow label="Email" value={user.email} />
                        <InfoRow label="Password" value={user.password} />
                    </View>
                    {/* <Text>{users[index]}</Text> */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, index === 0 && styles.disabledButton]} // Disable the button if the index is the first user
                            onPress={() => navigation.push('UserDetails', { users, index: index - 1 })} // Navigate to the previous user
                            disabled={index === 0}
                            activeOpacity={0.7}
                        >
                            <AntDesign name="left" size={30} color="black" />
                            {/* <Text style={[styles.buttonText, index === 0 && styles.disableTextBtn]}>Previous</Text> */}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, index === users.length - 1 && styles.disabledButton]} // Disable the button if the index is the last user
                            onPress={() => navigation.push('UserDetails', { users, index: index + 1 })} // Navigate to the next user
                            disabled={index === users.length - 1}
                            activeOpacity={0.7}
                        >
                            {/* <Text style={[styles.buttonText, index === users.lenght - 1 && styles.disableTextBtn]}>Next</Text> */}
                            <AntDesign name="right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>

    );
};
// Reusable component for each row
const InfoRow = ({ label, value }) => (
    <View style={styles.card}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);
const styles = StyleSheet.create({
    linearContainer: {
        flex: 1,
       
    },
    container: {
        flex: 1,
        // padding: 20,
        // backgroundColor: '#fff',
        paddingHorizontal:20


    },
    scrollContainer: {
        alignItems: 'center',
       
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        // borderColor: '#007bff',
        // borderWidth: 0.5,

    },
    avatarView: {
        elevation: 30,
        backgroundColor: "#fff",
        borderRadius: 95,
        width: 120,
        height: 120,
        marginTop: 5,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '70%',
        marginVertical: 10,
        justifyContent: 'space-between',
       
    },

    button: {
        // backgroundColor: '#007bff',
        backgroundColor: '#6283f8',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        elevation: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    disabledButton: {
        backgroundColor: '#ccc', // Gray color when disabled
        opacity: 0.8, // Slightly transparent
    },
    disableTextBtn: {
        color: 'black'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    card: {
        width: '95%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        marginVertical: 8,
        // for card view comment the below line
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '400',
        maxWidth: '80%'
    },
    cardView: {
        // marginVertical: 20,
        paddingVertical: 5,
    },
    loaderContainer: {
        position: 'absolute', // Keep it centered while image loads
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    loaderText: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "#333",
    },

});

export default UserDetails;
