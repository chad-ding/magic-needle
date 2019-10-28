import program from 'commander';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import analysis from './compiler/xlsx';

const optionalPrompt = [
	{
		type: 'list',
		name: 'size',
		message: 'What size do you need?',
		choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
		filter: function(val: string): string {
			return val.toLowerCase();
		}
	}
];

program.version(require('../package.json').version).usage('<command> [options]');

program
	.command('run <filepath>')
	.description('输入文件路径进行编译')
	.option('-x, --xlsx', '编译xlsx文件')
	.action((name, cmd) => {
		if (cmd.xlsx) {
			analysis(name);
		} else {
			console.error('未提供文件类型');
		}
	});

program
	.command('print')
	.description('打印参数')
	.action(() => {
		inquirer.prompt(optionalPrompt).then(answers => {
			console.log(answers);
		});
	});

program.on('--help', () => {
	console.log(`Run ${chalk.cyan('mn <command> --help')} for detailed usage of given command.`);
});

setTimeout(() => {
	program.parse(process.argv);
	if (!process.argv.slice(2).length) {
		program.outputHelp();
	}
}, 0);
