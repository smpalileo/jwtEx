const jwt = require('jsonwebtoken');
// const user = require('../../models/dummyUser');
const crypto = require('cryptojs');
module.exports = (app) => {
    const payload = {
        data1: 'Data 1',
        data2: 'Data 2',
        data3: 'Data 3',
        data4: 'Data 4',
    }
    var token = jwt.sign(payload, 'secretKey', {expiresIn: '10s'});

    app.post('/home', (req, res) => {

        const signOptions = {
            expiresIn: '01m',
            algorithm: 'RS256'
        }

        req.headers.Authorization = 'Bearer ' + token;
        req.headers.Auth1 = req.headers.Authorization.split(' ')[0];
        req.headers.Auth2 = req.headers.Authorization.split(' ')[1]
        let decrypted = jwt.verify(token, 'secretKey');

        res.json({
            message: 'route works',
            data: req.body,
            data2: req.headers,
            encrypt: token,
            decrypted: decrypted
            // token: token
        });
    });
}

// jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//     if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;         next();
//       }
//     });
