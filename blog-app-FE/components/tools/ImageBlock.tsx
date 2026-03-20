import { DataType } from "@/types/editorjs-marker";
import Image from "next/image";


interface PropsType {
  data: DataType;
  id: string;
}

function ImageBlock({ data, id }: PropsType) {
  const {
    caption,
    file: { url }
  } = data;
  return (
    <main key={id} className="min-h-screen bg-white">
      <figure className=" w-full max-h-[500px] overflow-hidden">
        <Image
          src={url}
          alt={caption}
          className="w-full object-cover"
          width={200}
          height={100}
        />
      </figure>
      <figcaption className="  text-center text-sm text-gray-500 ">
        {caption}
      </figcaption>
     
    </main>
  );
}

export default ImageBlock;
