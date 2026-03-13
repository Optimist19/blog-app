"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type EditorJS from "@editorjs/editorjs";
import { isPublishModalFtn, publishBtnFtn } from "@/globalStore/blogSlice";
import {
  useAppDispatch,
  useAppSelector
} from "@/globalStore/GlobalStoreProvider/hooks";
import PublishForm from "@/components/PublishForm";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { Blog } from "@/types/editorjs-marker";
import { ToolConstructable } from "@editorjs/editorjs";

function BlogEditor() {
  const dispatch = useAppDispatch();
  const {
    contentWithDesc: { content },
    isPublishModal
  } = useAppSelector((state) => state.blog);
  const [upLoadedImgUrl, setUpLoadedImgUrl] = useState<string>("");

  const [blogTitle, setBlogTitle] = useState<string>("");
  const editorRef = useRef<EditorJS | null>(null);
  const isEditorReady = useRef(false);

  useEffect(() => {
    async function uploadImageByUrl(url: string) {
      return {
        success: 1,
        file: { url }
      };
    }

    async function uploadImageByFile(file: File) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_using_cloudinary");
      data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      const uploadedImg = await res.json();
      return {
        success: 1,
        file: { url: uploadedImg.secure_url }
      };
    }

    if (!editorRef.current) {
      Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/image"),
        import("@editorjs/quote"),
        import("@editorjs/marker"),
        import("@editorjs/inline-code")
      ]).then(
        ([
          { default: EditorJS },
          { default: Header },
          { default: EditorjsList },
          { default: ImageTool },
          { default: Quote },
          { default: Marker },
          { default: InlineCode }
        ]) => {
          editorRef.current = new EditorJS({
            holder: "editorjs",
            placeholder: "Start writing your blog post here...",
            // data: content,
            tools: {
              list: {
                class: EditorjsList,
                inlineToolbar: true
              },
              image: {
                class: ImageTool,
                config: {
                  uploader: {
                    uploadByFile: uploadImageByFile,
                    uploadByUrl: uploadImageByUrl
                  }
                }
              },
              header: {
                class: Header as unknown as ToolConstructable,
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
            },
            onReady: () => {
              isEditorReady.current = true;
            }
          });
        }
      );
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    if (!img) return;
    toast.loading("Uploading...", { position: "top-center" });
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "first_time_using_cloudinary");
    data.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: data }
    );

    const upLoadedImg = await res.json();
    if (!upLoadedImg.url) {
      toast.error("Failed to upload image", { position: "top-center" });
    } else {
      setUpLoadedImgUrl(upLoadedImg.url);
      toast.success("Image uploaded successfully", { position: "top-center" });
    }
    toast.dismiss();
  };

  function handleTitleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") e.preventDefault();
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const input = e.target;
    setBlogTitle(input.value);
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  }

  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    (e.target as HTMLImageElement).src = "/blog-banner.jpg";
  }

  async function handlePublish() {
    if (!editorRef.current || !isEditorReady.current) return;

    if (!upLoadedImgUrl) {
      return toast.error("Please upload a banner image before publishing.", {
        position: "top-center"
      });
    }
    if (!blogTitle.trim()) {
      return toast.error("Please enter a blog title before publishing.", {
        position: "top-center"
      });
    }

    try {
      const outputData = await editorRef.current.save();

      if (!outputData.blocks || outputData.blocks.length === 0) {
        toast.error("Please, write an article.", { position: "top-center" });
        return;
      }

      dispatch(isPublishModalFtn());

      const blog: Blog = {
        outputData: outputData?.blocks,
        upLoadedImgUrl,
        blogTitle
      };
      dispatch(publishBtnFtn(blog));
    } catch (error) {
      toast.error("Failed");
    }
  }
  return (
    <div className="relative">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-all duration-300 transform`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 -ml-2 transition-colors cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Button>
          </Link>

          {/* {Search input has to be here} */}
          <Button
            className="btn-dark py-2 cursor-pointer"
            onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </nav>
      <h1 className="text-lg py-6  font-semibold text-center">
        {blogTitle || "New Blog"}
      </h1>
      <section>
        <div className="mx-auto max-w-[900px] w-full">
          <label
            htmlFor="uploadBanner"
            className="relative block aspect-video hover:opacity-80 bg-white border-4 border-grey cursor-pointer">
            <Image
              src={upLoadedImgUrl || "/blog-banner.jpg"}
              alt="blog banner upload"
              fill
              className="object-cover"
              onError={handleError}
              sizes="(max-width: 900px) 100vw, 900px"
            />
            <input
              id="uploadBanner"
              accept=".png, .jpg, .jpeg"
              type="file"
              hidden
              onChange={handleBannerUpload}
            />
          </label>
        </div>
        <div className="px-[10%] flex justify-center items-center  my-4">
          <textarea
            // defaultValue={title}
            placeholder="Blog Title"
            className="text-4xl  font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          />
        </div>
      </section>
      <Separator orientation="horizontal" />
      <div>
        <div id="editorjs" />
        {isPublishModal && <PublishForm />}
      </div>
    </div>
  );
}

export default BlogEditor;
