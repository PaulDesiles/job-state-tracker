
export function reorder<T>(list: T[], sourceIndex: number, destIndex: number) : T[]
{
    const result = [...list];
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destIndex, 0, removed);

    return result;
};

export interface movedLists<T> {
  source: T[];
  destination: T[];
}

export function move<T>(sourceList: T[], destinationList: T[], sourceIndex: number, destinationIndex: number) 
: movedLists<T>
{
  const sourceClone = [...sourceList];
  const destClone = [...destinationList];
  const [removed] = sourceClone.splice(sourceIndex, 1);

  destClone.splice(destinationIndex, 0, removed);

  return {
    source: sourceClone,
    destination: destClone
  };
};