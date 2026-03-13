declare module "@editorjs/marker";

export interface Blog {
  outputData: OutputData;
  upLoadedImgUrl: string;
  blogTitle: string;
}


export interface PublishReviewType {
  banner: string;
  title: string;
  content: [];
  desc: string;
  // author: string;
}


export interface ItemsType {
  content: string;
  meta: {
    checked: boolean;
  };
  items: [];
}

export interface DataType {
  level: number;
  alignment: string;
  caption: string;
  text: string;
  file: {
    url: string;
  };
  stretched: boolean;
  withBackground: boolean;
  withBorder: boolean;
  items: ItemsType[];
  meta: { start: undefined; counterType: string };
  meta: object;
  style: string;
}

//This is how the structure of the output from EditorJs is, the tools used formed the structure, so if you are going to add or include other tools, ensure you check the structure and find away to include it in the data:DataTypes. Becareful when checking how to go about the structure(types), remember you saved each tool to localstorage to know the structure each tool has.
export interface BlockType {
  data: DataType;
  id: string;
  type: string;
}
