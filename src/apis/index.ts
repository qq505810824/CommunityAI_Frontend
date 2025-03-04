// index.js
import Authorization from './Authorization';
import User from './User';

export default class Api {
    Authorization: Authorization;
    User: User;

    constructor() {
        this.Authorization = new Authorization();
        this.User = new User();
    }
}
