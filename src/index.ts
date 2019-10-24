import program from 'commander';
import * as inquirer from 'inquirer';
import chalk from 'chalk';

const questions: { type: string; name: string; message: string }[] = [
	{
		type: 'input',
		name: 'username',
		message: '请输入用户名'
	},
	{
		type: 'password',
		name: 'password',
		message: '请输入用户密码'
	}
];

program
	.version(require('../package.json').version)
	.usage('<command> [options]');

program
	.command('run <filepath>')
	.description('输入文件路径进行编译')
	.action(name => {
		inquirer.prompt(questions).then((result: any) => {
			console.log('您选择的平台类型信息如下：');
			console.log(JSON.stringify(result));
		});
	});

program.on('--help', () => {
	console.log(
		`Run ${chalk.cyan(
			`xat <command> --help`
		)} for detailed usage of given command.`
	);
});

setTimeout(() => {
	program.parse(process.argv);
	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
}, 0);
