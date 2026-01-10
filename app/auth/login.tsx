import { BrutalButton } from '@/components/ui/brutal-button';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { signInWithEmail, signUpWithEmail, isLoading } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        if (isSignUp) {
            const result = await signUpWithEmail(email, password);
            if (result.success) {
                Alert.alert('Success', 'Check your email for confirmation link');
                setIsSignUp(false);
            } else {
                Alert.alert('Error', result.error || 'Sign up failed');
            }
        } else {
            const result = await signInWithEmail(email, password);
            if (result.success) {
                router.dismiss();
            } else {
                Alert.alert('Error', result.error || 'Sign in failed');
            }
        }
    };

    return (
        <ScreenLayout>
            <ScreenHeader
                title={isSignUp ? 'Create Account' : 'Sign In'}
                showBackButton
            />

            <ScrollView
                className="flex-1 w-full mt-4"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    className="bg-white border-2 border-ink rounded-brutal p-6 shadow-brutal w-full"
                    style={{ borderColor: Colors.border }}
                >
                    <Text className="text-base font-w-medium mb-2" style={{ color: Colors.textMain }}>
                        Email
                    </Text>
                    <TextInput
                        className="bg-white border-2 rounded-brutal p-3 mb-4 font-w-medium text-base h-[50px]"
                        style={{ borderColor: Colors.border, color: Colors.textMain }}
                        placeholder="hello@vocade.app"
                        placeholderTextColor={Colors.gray400}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text className="text-base font-w-medium mb-2" style={{ color: Colors.textMain }}>
                        Password
                    </Text>
                    <TextInput
                        className="bg-white border-2 rounded-brutal p-3 mb-6 font-w-medium text-base h-[50px]"
                        style={{ borderColor: Colors.border, color: Colors.textMain }}
                        placeholder="••••••••"
                        placeholderTextColor={Colors.gray400}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <BrutalButton
                        onPress={handleAuth}
                        backgroundColor={Colors.primary}
                        pressableStyle={{ paddingVertical: 14 }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={Colors.textMain} />
                        ) : (
                            <Text className="font-w-bold text-lg text-center" style={{ color: Colors.textMain }}>
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </Text>
                        )}
                    </BrutalButton>

                    <BrutalButton
                        onPress={() => setIsSignUp(!isSignUp)}
                        backgroundColor="transparent"
                        pressableStyle={{ paddingVertical: 12, marginTop: 12 }}
                        style={{ borderWidth: 0, shadowOpacity: 0, elevation: 0 }}
                        disabled={isLoading}
                    >
                        <Text className="font-w-medium text-base text-center underline" style={{ color: Colors.textMuted }}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Text>
                    </BrutalButton>
                </View>

                {/* Test Credentials Hint */}
                <View className="mt-8 p-4 bg-gray-100 rounded-brutal border-2 border-gray-300 transform rotate-[-1deg]" style={{ borderColor: Colors.border }}>
                    <Text className="font-w-bold mb-2 text-base" style={{ color: Colors.textMain }}>⚠️ Test Area</Text>
                    <Text className="text-sm font-w-medium" style={{ color: Colors.gray600 }}>Email: <Text className="font-w-bold" style={{ color: Colors.textMain }}>test@vocade.app</Text></Text>
                    <Text className="text-sm font-w-medium" style={{ color: Colors.gray600 }}>Password: <Text className="font-w-bold" style={{ color: Colors.textMain }}>test1234</Text></Text>
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}
