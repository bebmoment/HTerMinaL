/* testing file */
import { Bash } from 'node-bash';
import { exec } from 'child_process'
// const out = await Bash.$`echo "hello from Bash"`
function bashEcho(what) {
    return Bash.$`echo ${what}`;
}

function justBash(that) {
    return Bash.$`${that}`
}
function ass(shit) {
    let out = ""
    exec(shit, (err, stdout, stderr) => {
        console.log(`err is ${err}`)
        if (err) {
            console.log(stderr.toString())
        } else {
            console.log(`out is ${out}`)
            out += stdout.toString()
            console.log(`now out is ${out}`)
        }
    })
    return out;
}
// bashEcho("helo").then((x) => console.log(x.raw));
// justBash("echo \"balls\" ").then((x) => console.log(x.raw))
console.log(`ass returned: ${ass('echo balls').then((x) => x)}`)
// some async bullshit going on here
// a callback was going on