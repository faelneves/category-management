export interface ICategory {
  id: string;
  name: string;
  hierarchyLevel: number;
  active: boolean;
  parentId?: string | null;
}
