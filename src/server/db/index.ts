import * as mysql from 'mysql';
import config from '../config';
import ZappyTypingTest from './zappy_typing_test'

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(error => {
    if (error) {
        console.log (error);
    }
})
export default {
    ZappyTypingTest
}