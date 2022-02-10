const express = require('express');
const cors = require('cors');
const { triggerAsyncId } = require('async_hooks');
const multer = require('multer');

const port = 8080;
const app = express();

const upload = multer({
    dest : 'uploads/'
})


app.use(cors( { origin : 'http://localhost:3000' } ));
app.use(express.json());

app.post('/', upload.single('image'), async (req, res) => {
    
    try{
        console.log(req.headers);
        console.log(req.body);
        console.log(req.file);

        res.status(201).send('ok');
    }
    catch(err) {
        console.log(err);
        res.status(400).send('error');
    }

})

app.listen(port, () => {
    console.log('listening at http://localhost:'+ port);
})
