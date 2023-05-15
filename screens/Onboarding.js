import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, TextInput } from "react-native";
import { setItem, setMultipleItems } from "../utils/asyncStorage";
import { useCallback, useEffect, useState } from "react";

export default function Onboarding({ setIsOnboardingCompleted }) {
    const [name, setName] = useState("");
    const [nameHasError, setNameHasError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailHasError, setEmailHasError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");

    const emailCheck = useCallback(() => {
        if (email.trim() === "") {
            setEmailErrorMsg("Email address is required, please.");
            return false;
        } else if (!(/^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(email))) {
            setEmailErrorMsg("Invalid email address.");
            return false;
        }

        return true;

    }, [email]);
    
    useEffect(() => {
        if (nameHasError && name.trim().length >= 3) {
            setNameHasError(false);
        }
    }, [name]);

    const onboardCheck = useCallback(() => {
        let errorFlag = false;
        // nameCheck
        if (name.trim().length < 3) {
            setNameHasError(true);
            errorFlag = true;
        }

        if (!emailCheck()) {
            setEmailHasError(true);
            errorFlag = true;
        } else {
            setEmailHasError(false);
        }

        if (errorFlag) return;
        
        setMultipleItems([
            ['isOnboardingCompleted', "true"], ["firstName", name], ["email", email]
        ], () => {
            setIsOnboardingCompleted(() => true);
        })
    }, [name, email]);

    return (
        <View style={styles.Onboarding}>
            <Text style={styles.Title}>Let's get to know you!</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "position"}
                contentContainerStyle={styles.TextInputs}
            >
                <View style={styles.TextInput}>
                    <TextInput
                        style={styles.InputBar}
                        value={name}
                        onChangeText={setName}
                        placeholder="First Name"
                        keyboardType="default"
                    />
                    {nameHasError ? <Text style={styles.ErrorMessage}>Name can't be shorter than 3 letters.</Text> : ""}
                </View>
                <View style={styles.TextInput}>
                    <TextInput
                        style={styles.InputBar}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email address"
                        keyboardType="email-address"
                    />
                    {emailHasError ? <Text style={styles.ErrorMessage}>{emailErrorMsg}</Text> : ""}
                </View>
            </KeyboardAvoidingView>
            <View style={styles.ButtonLine}>
                <Pressable onPress={onboardCheck} style={styles.ContinueButton} >
                    <Text style={styles.ButtonText}>Continue</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Onboarding: {
        padding: 20,
        flex: 1
    },
    Title: {
        marginTop: 36,
        marginBottom: 48,
        fontSize: 28,
        fontWeight: "500",
        textAlign: "center",
        color: "#495E57"
    },
    TextInputs: {
        gap: 24
    },
    TextInput: {

    },
    InputBar: {
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 10,
        fontSize: 20,
    },
    ErrorMessage: {
        color: "red",
        paddingLeft: 16,
        marginTop: 8
    },
    ButtonLine: {
        marginTop: "auto",
        marginBottom: 10,
        alignItems: "flex-end"
    },
    ContinueButton: {
        backgroundColor: "#495E57",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    ButtonText: {
        fontSize: 24,
        color: "white"
    }
});