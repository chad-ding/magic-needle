import program from 'commander';
import chalk from 'chalk';

program
	.version(require('../package.json').version)
	.usage('<command> [options]')

program
	.command('run <filepath>')
	.description('输入文件路径进行编译')
	.action((name, cmd) => {
		console.log('ABCDE1122');
	})

program.on('--help', () => {
	console.log()
	console.log(`  Run ${chalk.cyan(`xat <command> --help`)} for detailed usage of given command.`)
	console.log()
});

setTimeout(() => {
	program.parse(process.argv)

	if (!process.argv.slice(2).length) {
		program.outputHelp()
	}
}, 0);  