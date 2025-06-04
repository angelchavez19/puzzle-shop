export interface ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryEntity implements ICategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attrs: ICategory) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.createdAt = attrs.createdAt;
    this.updatedAt = attrs.updatedAt;
  }

  static create(attrs: { name: string }) {
    const now = new Date();
    return new CategoryEntity({
      id: crypto.randomUUID(),
      name: attrs.name,
      createdAt: now,
      updatedAt: now,
    });
  }
}
