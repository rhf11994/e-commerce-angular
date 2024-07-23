export class AboutUs {
  public constructor(
    public title: string,
    public aboutImg: string,
    public subTitle: string,
    public qoute: string,
    public servicesDesc: string,
    public servicesType: ServicesType[]
  ) {}
}

export class ServicesType {
  public constructor(
    public id: number,
    public image: string,
    public name: string,
    public description: string
  ) {}
}
