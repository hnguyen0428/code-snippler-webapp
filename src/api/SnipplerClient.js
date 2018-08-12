import Auth from './services/Auth';
import Snippet from './services/Snippet';
import User from './services/User';
import Language from './services/Language';
import Comment from './services/Comment';


export default class SnipplerClient {
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