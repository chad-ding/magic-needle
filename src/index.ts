import * as fs from 'fs';
import xlsx from 'node-xlsx';

export function read(input: string): void {
	const fileName = '/Users/chad/Downloads/performance.xlsx';
	const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(fileName));

	console.log(workSheetsFromBuffer);
}

read('1');