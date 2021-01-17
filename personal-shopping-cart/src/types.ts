export type List = {
  id: number;
  title: string;
};

export type Item = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  listId: number;
};

export type ItemRouteParams = {
  id: string;
};
