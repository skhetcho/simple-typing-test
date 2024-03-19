import * as express from 'express';
import bodyParser from 'body-parser';
import DB from './db';


const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/typing_tests', async (req, res) => {
    try {
        let allDataOfTypingTests = await DB.ZappyTypingTest.all();
        res.json(allDataOfTypingTests)
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})
router.post('/api/addnew', urlencodedParser, function(req, res, next) {
    try{
        console.log(req.body);
        // console.log(req.method);
        // console.log(req.headers)
        res.status(200)
    }
    catch(error){
        console.log(error);
        res.sendStatus(500)
    }

    // var userEmail = req.email;

    // var text = "Follow the instructions below to reset your password"

    // email.sendEmailWithTemplate(userEmail,'PetS.o.S Password Reset', text);
});
export default router;