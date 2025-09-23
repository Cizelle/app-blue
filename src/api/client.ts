// client.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use this IP for Android emulator to access your host machine
// If you are using a physical device on the same Wi-Fi, use your local IP (e.g., 192.168.1.100)
const API_BASE_URL = 'http://localhost:5000/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the auth token to requests
apiClient.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('AsyncStorage could not be accessed.', error);
    }
    return config;
});

export default apiClient;