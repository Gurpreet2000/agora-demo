import React, { useState } from 'react';
import AgoraUIKit, {
	ConnectionData,
	rtcCallbacks,
	rtmCallbacks,
} from 'agora-rn-uikit';
import { KeyboardAvoidingView, Linking, Platform, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';

export default function Index() {
	const [videoCall, setVideoCall] = useState(false);
	const [channelName, setChannelName] = useState('test');
	const [token, setToken] = useState(
		'007eJxTYOj4eUKuxNKqtEDP7ePBiJIZPo+m/HDWLyq29OM5oFB6ZqYCQ5JpqqFJsrGRcbJFmkmyqblFapplcoqFuUWakVFqspmFzo2YtIZARoY7QvVMjAwQCOKzMJSkFpcwMAAALwIfBw=='
	);
	const [appId, setAppId] = useState(
		process.env.EXPO_PUBLIC_AGORA_APP_ID || ''
	);
	const connectionData: ConnectionData = {
		appId: appId,
		channel: channelName,
		rtcToken: token,
	};
	const rtcCallbacks: rtcCallbacks = {
		EndCall: () => setVideoCall(false),
		JoinChannelSuccess: () => console.log('Joined'),
	};

	const rtmCallbacks: rtmCallbacks = {
		ConnectionStateChanged: (state, reason) =>
			console.log('Agora connection State: ', { state, reason }),
		TokenExpired: () => console.log('Token Expired'),
	};

	const join = () => {
		setVideoCall(true);
	};

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			{videoCall ? (
				<AgoraUIKit
					connectionData={connectionData}
					rtcCallbacks={rtcCallbacks}
					rtmCallbacks={rtmCallbacks}
				/>
			) : (
				<KeyboardAvoidingView
					behavior={Platform.select({ ios: 'padding' })}
					style={{ justifyContent: 'center', padding: '5%', flex: 1, gap: 15 }}
				>
					<Input
						value={appId}
						onChangeText={setAppId}
						placeholder="Type here..."
						label="App Id"
						secureTextEntry
					/>
					<Input
						value={channelName}
						onChangeText={setChannelName}
						placeholder="Type here..."
						label="Channel Name"
					/>
					<Input
						value={token}
						onChangeText={setToken}
						placeholder="Type here..."
						label="Token"
						secureTextEntry
						selectTextOnFocus
					/>
					<Text
						style={{
							color: 'blue',
							textDecorationLine: 'underline',
							textAlign: 'center',
						}}
						onPress={() =>
							Linking.openURL(
								'https://webdemo.agora.io/basicVideoCall/index.html#'
							)
						}
					>
						Web Demo
					</Text>
					<Button onPress={join} title={'Start'} />
				</KeyboardAvoidingView>
			)}
		</View>
	);
}
