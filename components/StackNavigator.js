import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './Header';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/Onboarding';
import Profile from '../screens/Profile';
import { getItem, getOnboardingState } from '../utils/asyncStorage';

const transitionConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.51,
      restSpeedThreshold: 0.51,
    },
  };

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const onboardCheck = async () => {
            const result = await getOnboardingState();
            setIsOnboardingCompleted(() => result);
            setIsLoading(false);
        };
        onboardCheck();
    }, []);

    if (isLoading) return <></>;

    return (
        <Stack.Navigator >
            {isOnboardingCompleted ? (<>
                <Stack.Screen name="Home" component={HomeScreen}
                    options={{ header: (navProps) => <Header navigation={navProps.navigation} profileButton={true} /> }}
                />
                <Stack.Screen name="Profile"
                    options={{ animation: "slide_from_right", animationDuration: 300, header: (navProps) => <Header navigation={navProps.navigation} profileButton={false} /> }}>
                    {(props) => <Profile {...props} setIsOnboardingCompleted={setIsOnboardingCompleted} />}
                </Stack.Screen>
            </>) : (
                <Stack.Screen name="Onboarding" options={{ header: () => <Header profileButton={false} /> }}>
                    {(props) => <OnboardingScreen {...props} setIsOnboardingCompleted={setIsOnboardingCompleted} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
};