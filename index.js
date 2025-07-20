// SET TO TRUE ONLY IF YOU WANT BOZOS RUNNING RANDOM SHELL COMMANDS ON YOUR PC
const DANGEROUS_MODE = true;

// imports and initializations
import express from 'express';
import { exec } from 'child_process';
const app = express();
const port = 3000;
import bodyParser from 'body-parser';
import { Bash } from 'node-bash';
app.set('view engine', 'ejs');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

// initial render
app.get('/', (req, res) => {
	res.render('index.ejs', {output: ""}) 
});

// start message
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
}
);

// handling command
app.post('/', (req, res) => {
	if (!DANGEROUS_MODE) {
		const ball = bashEcho(req.body.cmd);
		ball.then((x) => res.render('index.ejs', { output: `${x.raw}` }));
	} else {
		exec(req.body.cmd, (err, stdout, stderr) => { // this is a callback btw: that's why you couldn't make a return properly
			if (err) {
				res.render('index.ejs', {output: stderr.toString()});
			} else {
				res.render('index.ejs', {output: stdout.toString()});
			}
		})
	}
});

function bashEcho(what) {
	return Bash.$`echo ${what}`;
}
