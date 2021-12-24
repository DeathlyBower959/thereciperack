let settings = {
    isDevMode: true,
    activeDevelopment: true,
    SERVER_URL: '',
}

if (settings.isDevMode) settings.SERVER_URL = 'http://localhost:5000'
else settings.SERVER_URL = 'https://thereciperack-api.deathlybower959.repl.co'

export default settings
