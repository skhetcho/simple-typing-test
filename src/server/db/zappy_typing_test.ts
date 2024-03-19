import { Connection } from './index';
export const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * from typing_tests', (error, results) => {
            if (error) {
                return reject(error);
            }
            else {
                resolve(results);
            }
        })

    })
}
export const newTester = async (userKey, Date, Name) => {
    return new Promise((resolve, reject) => {
        Connection.query("INSERT INTO `nvnasgte_zappy_typing_test`.`typing_tests` (`user_key`, `date_created`, `name`) VALUES ('" + `${userKey}`+"', '"+`${Date}`+"', '"+`${Name}`+"');", (error, results) => {
            if (error) {
                return reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

export default {
    all,
    newTester
}