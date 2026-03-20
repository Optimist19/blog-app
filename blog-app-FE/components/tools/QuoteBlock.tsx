import React from "react";

interface QuotePropsType {
  data: {
    alignment: string;
    caption: string;
    text: string;
  };
  id: string;
}
function QuoteBlock(props: QuotePropsType) {
  const {
    data: { alignment, caption, text },
    id
  } = props;

  return (
    <figure className="my-6" key={id}>
      <blockquote
        className={`border-l-4 pl-4 italic text-lg text-[${alignment}]`}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500">
          — {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default QuoteBlock;
