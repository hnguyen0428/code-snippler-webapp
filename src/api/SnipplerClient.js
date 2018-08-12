import Auth from './services/Auth';
import Snippet from './services/Snippet';
import User from './services/User';
import Language from './services/Language';
import Comment from './services/Comment';


class SnipplerClient {
    constructor(config) {
        this.config = {
            baseUrl: config.baseUrl,
            clientKey: config.clientKey,
            apiKey: config.apiKey
        }

    }

    setApiKey(key) {
        this.config.apiKey = key;
    }

    setClientKey(key) {
        this.config.clientKey = key;
    }

    auth() {
        return new Auth(this.config);
    }

    snippet() {
        return new Snippet(this.config);
    }

    user() {
        return new User(this.config);
    }

    language() {
        return new Language(this.config);
    }

    comment() {
        return new Comment(this.config);
    }
}


const client = new SnipplerClient({
    baseUrl: 'http://localhost:8080',
    clientKey: 'vEysoE5HxX_rRADv1BDJ_v19KoKun6x49p4rq3ZYVxxTtYFc9r-beDh--a1Y8E5GbCpOKEHgJhCvsrnrtbFRomI8TNRNEyStBzUe6UUtgc9gsKBV8bDf6O71j6mk_WA-nYrD-AHHIhf3RI8rls7vNHmQLyPHxA2CDEjiDEkMhYA'
});


export default client;
