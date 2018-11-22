const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const payload = {
        data1: 'Data 1',
        data2: 'Data 2',
        data3: 'Data 3',
        data4: 'Data 4',
    }
    
    let token = '';

    app.post('/login', (req, res) => {
        const { username } = req.body;
        const { password } = req.body;

        if(username === 'uname' && password === 'pword') {
            token = jwt.sign(payload, 'secretKey', { expiresIn: '10s' });
            res.send('Enjoy Your Token!');
        } else {
            res.send('Invalid Credentials!');
        }
        
    });

    app.post('/home', (req, res) => {
        if(token){
            req.headers.Authorization = 'Bearer ' + token;
            req.headers.Auth1 = req.headers.Authorization.split(' ')[0];
            req.headers.Auth2 = req.headers.Authorization.split(' ')[1];
        }
        
        let decrypted = jwt.verify(token, 'secretKey');

        res.json({
            message: 'route works',
            data: req.body,
            data2: req.headers,
            encrypt: token,
            decrypted: decrypted
        });
    });

    app.get('/sensitiveapi', (req,res) => {
        const preciousData = 'THIS IS THE CHEESE!';

        if(token) {
            req.headers.Authorization = 'Bearer ' + token;
            req.headers.Auth2 = req.headers.Authorization.split(' ')[1];
            jwt.verify(token, 'secretKey', (err, decryptedData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({ message: 'Token is Valid!', decrypted: decryptedData, treasure: preciousData });
                }
            });
        }
    });
}


