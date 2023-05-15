import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './Header';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/Onboarding';
import { getItem } from '../utils/asyncStorage';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

    useEffect(() => {
        const onboardCheck = async () => {
            const result = await getItem('isOnboardingCompleted');
            setIsOnboardingCompleted(() => result);
        };
        onboardCheck();
    }, []);

    return (
        <Stack.Navigator>
            {isOnboardingCompleted ? (
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{ header: (navProps) => <Header navigation={navProps.navigation} profileButton={true} /> }}
                />
            ) : (
                <Stack.Screen name="Onboarding" options={{ header: () => <Header profileButton={false} /> }}>
                    {(props) => <OnboardingScreen {...props} setIsOnboardingCompleted={setIsOnboardingCompleted} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
};