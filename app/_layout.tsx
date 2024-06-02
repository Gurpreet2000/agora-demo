import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
	return (
		<SafeAreaProvider style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
				<StatusBar style="light" />
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
