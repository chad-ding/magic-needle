interface NodeXlsx {
	parse(input: any): void
};

declare module 'node-xlsx' {
	const xlsx: NodeXlsx;
	export default xlsx;
}