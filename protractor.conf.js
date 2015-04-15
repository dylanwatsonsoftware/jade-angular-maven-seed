exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/*_test.js'],
    baseUrl: 'http://127.0.0.1:9000',
    capabilities: {
        'browserName': 'chrome',
        'binary': 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    }
}