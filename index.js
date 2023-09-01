var express = require('express');
var app = express();
const fsExtra = require('fs-extra');
const path = './comentar.json';
var bodyParser = require('body-parser')

const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://dwi-joko-wedding.vercel.app',
        'https://dwi-joko-wedding-git-main-amarkusuma.vercel.app',
    ]
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// fsExtra.ensureFileSync(path, [])
// fsExtra.createWriteStream(path, { overwrite: false });

fsExtra.exists(path, function(exists) {
    if(exists) {
      console.log('File json exists')
    }
    else {
        fsExtra.createWriteStream(path, { overwrite: false });
        fsExtra.writeJson(path,  [{
            "id": 1,
            "name": "Fulanah",
            "comments": "barakallahu laka wa baarakaa alaika wa jamaa bainakumaa fii khoir",
            "date": "09:00 2/10/2023"
            }
        ]);
        console.log("Create File Json", path);
    }
});

app.get('/comments', async function (req, res) {
    try {
        const comentar = await fsExtra.readJson(path);

        res.setHeader('Content-Type', 'application/json');
        res.send(comentar);

    } catch (error) {
        console.log(error);
    }
});

app.post('/comments', async function (req, res) {
    try {
        let comentar;
        let old_data = await fsExtra.readJson(path);
        
        if (old_data.length > 0) {
            comentar = [...[req.body], ...old_data]
        }else {
            comentar = [req.body]
        }

        await fsExtra.writeJson(path, comentar);
        
        res.setHeader('Content-Type', 'application/json');
        res.send(comentar);

    } catch (error) {
        console.log(error);
    }
})
app.listen(3004);