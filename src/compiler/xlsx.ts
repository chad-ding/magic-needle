import * as fs from 'fs';
import chalk from 'chalk';
import xlsx from 'node-xlsx';

interface Sheet {
	name: string;
	data: string[][];
};

interface Performance {
	[key: string]: number;
	launcher_time: number;
	page_time: number;
	render_time: number;
	msg_create_application_time: number;
};

export function analysis(file: string): void {
	const workSheets: Sheet[] = xlsx.parse(fs.readFileSync(file));

	if (workSheets.length < 1) {
		console.info(chalk.red("文件为空"));
		return;
	}

	const compiledSheet: Sheet = compile(workSheets[0]);

	const regExp: RegExp = /(.+)(\.xlsx)/;
	const disFile = file.replace(regExp, (m: string, p1: string, p2: string): string => {
		return `${p1}.analysisied${p2}`;
	});

	writeExcel(compiledSheet, disFile);
}

function writeExcel(sheet: Sheet, file: string): void {
	const sheets: Sheet[] = [sheet];
	const buffer = xlsx.build(sheets);

	fs.writeFile(file, buffer, 'utf8', err => {
		if (err) {
			console.error(chalk.red(JSON.stringify(err)));
		} else {
			console.error(chalk.green('文件写入成功'));
		}
	});
}

function compile(sheet: Sheet): Sheet {

	let i: number = 1;
	const data: string[][] = sheet.data;

	const compiledSheet: Sheet = {
		name: '性能指标',
		data: []
	};

	compiledSheet.data.push(['日期(day)', '机型', '引擎(hybrid_version)', '启动时间(launcher_time)', '页面展示时间(page_time)', '渲染时间(render_time)', '应用创建时间(msg_create_application_time)']);
	while (i < data.length) {
		const item: string[] = data[i];
		const day = item[item.length - 1];
		const params: string = item[5];
		i++;

		let paramJson: {
			performance: string;
			hybrid_version: string;
		},
			performance: Performance;

		try {
			paramJson = JSON.parse(params);
			performance = JSON.parse(paramJson.performance.replace(/(\w+)=/g, '"$1":'));
		} catch (e) {
			console.error(chalk.red(e));
		}

		compiledSheet.data.push([
			day,
			item[6],
			paramJson.hybrid_version,
			performance.launcher_time.toString(),
			performance.page_time.toString(),
			performance.render_time.toString(),
			performance.msg_create_application_time.toString()
		]);
	}

	return compiledSheet;
}

export default analysis;