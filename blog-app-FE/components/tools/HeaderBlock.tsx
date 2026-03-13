import { DataType } from "@/types/editorjs-marker";

interface PropsType {
  data: DataType;
  id: string;
}

function HeaderBlock({ data, id }: PropsType) {
  if (data?.level === 2) {
    return <h2 key={id}>{data.text}</h2>;
  }
  return <h3 key={id}>{data.text}</h3>;
}

export default HeaderBlock;
