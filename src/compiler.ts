import * as fs from 'fs';
import chalk from 'chalk';
import xlsx from 'node-xlsx';

interface Sheet {
	name: string;
	data: string[][];
}

export function analysis(input: string): void {
	const workSheets: Sheet[] = xlsx.parse(fs.readFileSync(input));

	if (workSheets.length < 1) {
		console.info(chalk.red("文件为空"));
		return;
	}

	const compiledSheet: Sheet = compile(workSheets[0]);

	writeExcel(compiledSheet);
}

function writeExcel(sheet: Sheet): void {
	const sheets: Sheet[] = [sheet];
	const buffer = xlsx.build(sheets);

	fs.writeFile('/Users/chad/Downloads/analysis.xlsx', buffer, 'utf8', err => {
		console.error(chalk.red(JSON.stringify(err)));
	});
}

interface Performance {
	[key: string]: number;
	launcher_time: number;
	page_time: number;
	render_time: number;
	msg_create_application_time: number;
}

function getPerformance(params: string) {
	const subExp = /.*performance=(\{[^\}]+\}).*/;
	const replaceExp = /([^\{,]\w+)=([^,\}]+)/g;

	return params.replace(subExp, '$1').replace(/\s/g, '').replace(replaceExp, (match, p1, p2) => {
		return `"${p1}":${isNaN(p2) ? "p2" : p2}`;
	})
}

function compile(sheet: Sheet): Sheet {

	let i: number = 1;
	const data: string[][] = sheet.data;

	const compiledSheet: Sheet = {
		name: '性能指标',
		data: []
	};

	compiledSheet.data.push(['日期', '启动时间', '页面展示时间', '渲染时间', '应用创建时间']);

	let tempData: { [key: string]: { [key: string]: {total: number, count: number } } } = {};

	const indicator: string[] = ['launcher_time', 'page_time', 'render_time', 'msg_create_application_time'];

	while (i < data.length) {
		const item: string[] = data[i];
		const day = item[item.length - 1];
		const params: string = item[5];
		i++;

		let performanceString = getPerformance(params);
		let performance: Performance;
		try {
			performance = JSON.parse(performanceString);
		} catch (e) {
			console.error(chalk.yellow(e));
			continue;
		}

		if (tempData[day]) {
			const temp = tempData[day];
			const keys: string[] = Object.getOwnPropertyNames(performance);
			keys.forEach((item: string) => {
				if(!indicator.includes(item)) {
					return;
				}
				temp[item].total += performance[item];
				temp[item].count += 1;
			});
		} else {
			let temp: {
				[key: string]: {total: number, count: number };
			} = {};

			const keys: string[] = Object.getOwnPropertyNames(performance);
			keys.forEach((item: string) => {
				temp[item] = {
					total: 0,
					count: 0
				};
				temp[item].total = performance[item];
				temp[item].count = 1;
			});

			tempData[day] = temp;
		}
	}

	Object.getOwnPropertyNames(tempData).forEach((key: string) => {
		const performance = tempData[key];
		const data: string[] = [
			key,
			Math.round(performance.launcher_time.total / performance.launcher_time.count).toString(),
			Math.round(performance.page_time.total / performance.page_time.count).toString(),
			Math.round(performance.render_time.total / performance.render_time.count).toString(),
			Math.round(performance.msg_create_application_time.total / performance.msg_create_application_time.count).toString()
		];
		
		compiledSheet.data.push(data);
	});


	return compiledSheet;
}

analysis('/Users/chad/Downloads/hive20191024092330.xlsx');