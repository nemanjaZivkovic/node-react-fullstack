const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there pips' });
});

//heroku dynamic port for local env use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);