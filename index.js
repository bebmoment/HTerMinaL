/* 
server
TODO:
remove global state dependence
docker or tauri or electron
*/
let DANGEROUS_MODE = false; // silly global state that i'm trying to get rid of

// imports and initializations
import express from 'express';
import { exec } from 'child_process';
import bodyParser from 'body-parser'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import favicon from 'serve-favicon';

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(`${__dirname}/public`)); // the one thing that makes css work again
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));

app.get('/', (req, res) => {
	bebRender(req, res, 'index.ejs', "", DANGEROUS_MODE);
})
app.get('/login', (req, res) => {
	res.render('hack.ejs', {output: ""});
});

app.post('/login', (req, res) => {
	exec(`./public/hack ${req.body.login}`, (err, stdout, stderr) => {
		bebRender(req, res, err ? 'hack.ejs' : 'index.ejs', err ? stderr : stdout, !err);
		DANGEROUS_MODE = !err;
	});
});

// handling command
// trying to remove state dependence is a bit difficult
app.post('/', (req, res) => {
	// const line = (DANGEROUS_MODE) ? req.body.cmd : `echo ${req.body.cmd}`
	exec((DANGEROUS_MODE) ? req.body.cmd : `echo ${req.body.cmd}`, (err, stdout, stderr) => { // no way this is it
		bebRender(req, res, 'index.ejs', err ? stderr : stdout, DANGEROUS_MODE);
	});
});

app.put('/', (req, res) => {
	DANGEROUS_MODE = false;
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

function bebRender(req, res, page, out, danger) { // TODO: possible return type to indicate dangerous mode
	res.render(page, {output: out, DANGEROUS_MODE: danger})
}