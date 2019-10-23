import * as fs from 'fs';
import xlsx from 'node-xlsx';

export function read(input: string): void {
	const fileName = '/Users/chad/Downloads/data.xlsx';
	const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(fileName));

	console.log(JSON.stringify(workSheetsFromBuffer));
}

read('1');