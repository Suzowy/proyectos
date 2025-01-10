export class Project{
  static _id: string;
id: any|string;
http: any;
createdAt: string | number | Date | undefined;
	constructor(
		public _id: string,
		public name: string,
		public description: string,
		public category: string,
		public year: number,
		public langs: string,
		public image: string
	){}
}
