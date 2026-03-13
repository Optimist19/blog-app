import { DataType, ItemsType } from "@/types/editorjs-marker";

interface PropsType {
  data: DataType;
  id: string;
}

function ListBlock({ data, id }: PropsType) {
  //data.items is the array and the property is content which will show you list of things

  const counterType = data?.meta?.counterType;

  //Check box list
  const style = data?.style;
  if (style === "checklist") {

    return (
      <div key={id}>
        {data.items.map((obj: ItemsType, i: number) => {
          return (
            
            <input
              key={i}
              type="checkbox"
              checked={!!obj?.meta?.checked}
              readOnly
            />
          );
        })}
      </div>
    );
  }

  //Order list
  if (counterType === "numeric") {

    return (
      <ol key={id}>
        {data.items.map((obj: ItemsType, i: number) => {
          return (
            <li key={i} className="pl-2">
              {" "}
              <span className="pr-2">{i + 1}.</span> {obj?.content}
            </li>
          );
        })}
      </ol>
    );
  }

  //Unorder list

  return (
    <ul key={id}>
      {Array.isArray(data.items) &&
        data.items.map((obj: ItemsType, i: number) => {
          return (
            <li key={i} className="pl-2">
              {" "}
              <span className="font-extrabold pr-2">.</span> {obj?.content}
            </li>
          );
        })}
    </ul>
  );
}

export default ListBlock;
