import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Pressable, ScrollView } from "react-native";
import { eraseAll, getItem, setItem, setMultipleItems } from "../utils/asyncStorage";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Profile({ setIsOnboardingCompleted }) {
    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstNameHasError, setFirstNameHasError] = useState(false);
    const [phoneHasError, setPhoneHasError] = useState(false);
    const [emailHasError, setEmailHasError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [orderStatuses, setOrderStatuses] = useState(false);
    const [passwordChanges, setPasswordChanges] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(false);
    const [newsletters, setNewsletters] = useState(false);

    const checkDb = useCallback(async () => {
        const firstNameDb = await getItem("firstName");
        const lastNameDb = await getItem("lastName");
        const emailDb = await getItem("email");
        const phoneDb = await getItem("phone");

        if (firstNameDb !== null) setFirstName(firstNameDb); else setFirstName("");
        if (lastNameDb !== null) setLastName(lastNameDb); else setLastName("");
        if (emailDb !== null) setEmail(emailDb); else setEmail("");
        if (phoneDb !== null) setPhone(phoneDb); else setPhone("");

        const orderStatusesDb = await getItem("orderStatuses");
        const passwordChangesDb = await getItem("passwordChanges");
        const specialOffersDb = await getItem("specialOffers");
        const newslettersDb = await getItem("newsletters");

        if (orderStatusesDb !== null) setOrderStatuses(() => (orderStatusesDb === "true") ? true : false);
        else setOrderStatuses(false);
        if (passwordChangesDb !== null) setPasswordChanges(() => (passwordChangesDb === "true") ? true : false);
        else setPasswordChanges(false);
        if (specialOffersDb !== null) setSpecialOffers(() => (specialOffersDb === "true") ? true : false);
        else setSpecialOffers(false);
        if (newslettersDb !== null) setNewsletters(() => (newslettersDb === "true") ? true : false);
        else setNewsletters(false);

        setTimeout(() => {
            setIsLoading(() => false);
        }, 0);
    }, []);

    useEffect(() => {
        checkDb();
    }, []);

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
        if (firstNameHasError && firstName.trim().length >= 3) {
            setFirstNameHasError(false);
        }
    }, [firstName]);

    const onSaveCheck = () => {
        let errorFlag = false;
        // nameCheck
        if (firstName.trim().length < 3) {
            setFirstNameHasError(true);
            errorFlag = true;
        }

        if (!emailCheck()) {
            setEmailHasError(true);
            errorFlag = true;
        } else {
            setEmailHasError(false);
        }

        if (phone.length > 0 && phone.length < 10) {
            setPhoneHasError(true);
            errorFlag = true;
        } else {
            setPhoneHasError(false);
        }

        if (errorFlag) return;

        setMultipleItems([
            ["firstName", firstName],
            ["lastName", lastName],
            ["email", email],
            ["phone", phone],
            ["orderStatuses", `${orderStatuses}`],
            ["passwordChanges", `${passwordChanges}`],
            ["specialOffers", `${specialOffers}`],
            ["newsletters", `${newsletters}`],
        ], () => {
            alert("Your information updated.")
        });

    };

    const handleLogout = useCallback(() => {
        eraseAll(() => {
            setItem('isOnboardingCompleted', "false", () => {
                setIsOnboardingCompleted(() => false);
            });
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.Profile}>
            <Text style={styles.Title}>Personal Information</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "position"}
                contentContainerStyle={styles.TextInputs}
            >
                <View style={styles.TextInput}>
                    <Text style={styles.InputBarLabel}>First name</Text>
                    <TextInput
                        style={styles.InputBar}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="First Name"
                        keyboardType="default"
                    />
                    {firstNameHasError ? <Text style={styles.ErrorMessage}>Name can't be shorter than 3 letters.</Text> : ""}
                </View>
                <View style={styles.TextInput}>
                    <Text style={styles.InputBarLabel}>Last name</Text>
                    <TextInput
                        style={styles.InputBar}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Last Name"
                        keyboardType="default"
                    />
                </View>
                <View style={styles.TextInput}>
                    <Text style={styles.InputBarLabel}>Email</Text>
                    <TextInput
                        style={styles.InputBar}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email address"
                        keyboardType="email-address"
                    />
                    {emailHasError ? <Text style={styles.ErrorMessage}>{emailErrorMsg}</Text> : ""}
                </View>
                <View style={styles.TextInput}>
                    <Text style={styles.InputBarLabel}>Phone number</Text>
                    <TextInput
                        style={styles.InputBar}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                    />
                    {phoneHasError ? <Text style={styles.ErrorMessage}>Phone number should be 10 digits.</Text> : ""}
                </View>
            </KeyboardAvoidingView>
            <Text style={styles.Title}>Email Notifications</Text>
            {!isLoading ? (<View style={styles.ChechBoxes}>
                <BouncyCheckbox
                    size={20}
                    fillColor="#495E57"
                    unfillColor="#FFFFFF"
                    text="Order Statuses"
                    textStyle={{ textDecorationLine: "none" }}
                    innerIconStyle={{ borderRadius: 10 }}
                    isChecked={orderStatuses}
                    onPress={(isChecked) => { setOrderStatuses(isChecked); }}
                />
                <BouncyCheckbox
                    size={20}
                    fillColor="#495E57"
                    unfillColor="#FFFFFF"
                    text="Password Changes"
                    textStyle={{ textDecorationLine: "none" }}
                    innerIconStyle={{ borderRadius: 10 }}
                    isChecked={passwordChanges}
                    onPress={(isChecked) => { setPasswordChanges(isChecked); }}
                />
                <BouncyCheckbox
                    size={20}
                    fillColor="#495E57"
                    unfillColor="#FFFFFF"
                    text="Special Offers"
                    textStyle={{ textDecorationLine: "none" }}
                    innerIconStyle={{ borderRadius: 10 }}
                    isChecked={specialOffers}
                    onPress={(isChecked) => { setSpecialOffers(isChecked); }}
                />
                <BouncyCheckbox
                    size={20}
                    fillColor="#495E57"
                    unfillColor="#FFFFFF"
                    text="Newsletters"
                    textStyle={{ textDecorationLine: "none" }}
                    innerIconStyle={{ borderRadius: 10 }}
                    isChecked={newsletters}
                    onPress={(isChecked) => { setNewsletters(isChecked); }}
                />

            </View>) : <></>}
            <Pressable style={styles.LogOutButton} onPress={handleLogout}>
                <Text style={styles.LogOutButtonText}>Log Out</Text>
            </Pressable>
            <View style={styles.ChangeButtons}>
                <Pressable style={styles.DiscardButton} onPress={checkDb}>
                    <Text style={styles.DiscardButtonText}>Discard Changes</Text>
                </Pressable>
                <Pressable style={styles.SaveButton} onPress={onSaveCheck}>
                    <Text style={styles.SaveButtonText}>Save Changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Profile: {
        padding: 20
    },
    Title: {
        marginTop: 12,
        marginBottom: 24,
        fontSize: 24,
        fontWeight: "500",
        color: "#495E57"
    },
    TextInputs: {
        gap: 24
    },
    InputBar: {
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 10,
        fontSize: 20,
    },
    InputBarLabel: {
        color: "#333333",
        marginBottom: 4,
        marginLeft: 4
    },
    ErrorMessage: {
        color: "red",
        paddingLeft: 16,
        marginTop: 8
    },
    LogOutButton: {
        marginTop: 24,
        padding: 12,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#F4CE1488",
        width: "100%",
        backgroundColor: "#F4CE14"
    },
    LogOutButtonText: {
        color: "#495E57",
        textAlign: "center"
    },
    ChangeButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 24
    },
    DiscardButton: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#495E57",
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    DiscardButtonText: {
        color: "#495E57"
    },
    SaveButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#495E57",
    },
    SaveButtonText: {
        color: "white"
    },
});