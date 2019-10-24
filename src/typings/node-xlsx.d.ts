interface NodeXlsx {
	parse(input: any): [],
	build(input: any[]): void
}

declare module 'node-xlsx' {
	const xlsx: NodeXlsx;
	export default xlsx;
}