type Props<T extends unknown> = {
  list: T[];
  none: React.ReactElement;
  render: (item: T, index: number, list: T[]) => React.ReactElement;
};

function List<T extends unknown>({ list, none, render }: Props<T>) {
  if (list.length === 0) {
    return none;
  }
  return <>{list.map(render)}</>;
}

export default List;
