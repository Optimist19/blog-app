import Quote from "@editorjs/quote";
import EditorjsList from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

async function uploadImageByUrl(e) {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });
  return link.then((url) => {
    return {
      success: 1,
      file: {
        url: url
      }
    };
  });
}

async function uploadImageByFile(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: data
    }
  );

  const uploadedImg = await res.json();

  return {
    success: 1,
    file: {
      url: uploadedImg.secure_url
    }
  };
}

export const tools = {
  list: {
    class: EditorjsList,
    inlineToolbar: true
  },
  image: {
    class: ImageTool,
    //The config from the Doc did not work.
    //   // config: {
    //   //   endpoints: {
    //   //     byFile: uploadImageByFile,
    //   //     byUrl: uploadImageByUrl
    //   //   }
    //   // }
    // config:{
    //   uploadByUrl: uploadImageByUrl,
    //   uploadByFile: uploadImageByFile
    // }
    config: {
      uploader: {
        uploadByFile: uploadImageByFile,
        uploadByUrl: uploadImageByUrl
      }
    }
  },

  header: {
    class: Header,
    config: {
      placeholder: "Enter a Heading",
      levels: [2, 3],
      defaultLevel: 2
    }
  },
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  marker: Marker,
  inlineCode: InlineCode
};
