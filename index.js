// SET TO TRUE ONLY IF YOU WANT BOZOS RUNNING RANDOM SHELL COMMANDS ON YOUR PC
const DANGEROUS_MODE = false;

// imports and initializations
import express from 'express';
import { exec } from 'child_process';
import bodyParser from 'body-parser';
import { Bash } from 'node-bash';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(`${__dirname}/public`)); // the one thing that makes css work again
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

// initial render
app.get('/', (req, res) => {
	res.render('index.ejs', {output: ""}) 
});
app.get('/hack', (req, res) => {
	res.render('hack.ejs', {result: ""})
});
// start message
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
app.post('/hack', (req, res) => {
	const passedword = req.body.login;
	exec(`./hack ${req.body.login}`, (err, stdout, stderr) => {
		// exec(`./hack` , (err, stdout, stderr) => {
		if(err) {
			res.render('hack.ejs', {result: stderr})
		} else {
			res.render('hack.ejs', {result: stdout})
		}
	})
});
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
