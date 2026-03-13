import { BlockType } from "@/types/editorjs-marker";
import ParagraphBlock from "./tools/ParagraphBlock";
import HeaderBlock from "./tools/HeaderBlock";
import ImageBlock from "./tools/ImageBlock";
import ListBlock from "./tools/ListBlock";
import QuoteBlock from "./tools/QuoteBlock";

interface PropsType {
  content: BlockType[];
}
function RenderBlock(props: PropsType) {
  const { content } = props;
  return (
    <div>
      {content.map((obj: BlockType) => {
        switch (obj.type) {
          case "paragraph":
            return <ParagraphBlock key={obj.id} id={obj.id} data={obj.data} />;

          case "header":
            return <HeaderBlock key={obj.id} id={obj.id} data={obj.data} />;

          case "image":
            return <ImageBlock key={obj.id} id={obj?.id} data={obj?.data} />;

          case "list":
            return <ListBlock key={obj.id} id={obj.id} data={obj?.data} />;

          case "quote":
            return <QuoteBlock key={obj.id} id={obj.id} data={obj?.data} />;

          default:
            return null;
        }
      })}
    </div>
  );
}

export default RenderBlock;
