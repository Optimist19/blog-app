import { DataType } from "@/types/editorjs-marker";

interface PropsType {
  data: DataType;
  id: string;
}

function ParagraphBlock({ data, id }: PropsType) {
  return (
    <p
      key={id}
      className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4"
      dangerouslySetInnerHTML={{ __html: data.text }}
    />
  );
}
export default ParagraphBlock;
