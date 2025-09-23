// temp.ts
const checkNetworkConnectivity = async () => {
    console.log('--- Starting Network Connectivity Check ---');

    // 1. Check a reliable internet source (Google)
    try {
        const googleResponse = await fetch('http://www.google.com');
        if (googleResponse.ok) {
            console.log('✅ Success: Internet connectivity to Google is working.');
        } else {
            console.log('❌ Failure: Internet connectivity is not working.');
        }
    } catch (error) {
        console.log('❌ Failure: Network request to Google failed (No internet connection).');
        console.error(error);
    }

    // 2. Check your local backend server
    const localServerUrl = 'http://localhost:5000/';

    try {
        const localResponse = await fetch(localServerUrl);

        // Check if the response was successful
        if (localResponse.ok) {
            // Read the response body as text
            const responseText = await localResponse.text();
            console.log('✅ Success: Local server is reachable!', responseText);
        } else {
            console.log(`⚠️ Warning: Local server responded, but with status ${localResponse.status}.`);
        }
    } catch (error) {
        console.log('❌ Failure: Cannot reach local server. (Potential firewall/IP issue)');
        console.error('Error:', error);
    }
    console.log('--- Network Connectivity Check Complete ---');
};

checkNetworkConnectivity();