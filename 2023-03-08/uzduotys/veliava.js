import chalk from 'chalk';

let rezultatas = '';
const juosta = (process.stdout.rows / 3);

for(let i = 0; i < process.stdout.columns; i++) {
    rezultatas += '*';
}

for(let i = 0; i < juosta; i++) {
    console.log(chalk.yellow(rezultatas));
}

for(let i = 0; i < juosta; i++) {
    console.log(chalk.green(rezultatas));
}

for(let i = 0; i < juosta; i++) {
    console.log(chalk.red(rezultatas));
}
