const express = require('express');
const cors = require('cors');
const port = 8080;

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
})

require('./src/routes/books.routes')(app);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);   
});