import React from "react";
import { Toaster } from "./ui/sonner";
import { Button } from "./ui/button";
import {
  useAppDispatch,
  useAppSelector
} from "@/globalStore/GlobalStoreProvider/hooks";
import Image from "next/image";
import {
  changeDescFtn,
  changeTitleFtn,
  isPublishModalFtn,
  publishBlogBtnFtn
} from "@/globalStore/blogSlice";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function PublishForm() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const {
    banner,
    title,
    contentWithDesc: { desc, content },
    err
  } = useAppSelector((state) => state.blog);

  function handleCloseEvent() {
    dispatch(isPublishModalFtn());
  }

  function handleBlogTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    dispatch(changeTitleFtn(input));
  }
  function handleBlogDescChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const input = e.target.value;
    dispatch(changeDescFtn(input));
  }

  function truncateText(text: string, maxLength = 50) {
    if (!text) return "";

    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  async function publishPreview() {
 
      if (!banner || !title || content.length === 0 || !desc) {
      toast.warning("Please, ensure you leave no input empty", {
        position: "top-center"
      });

      return;
    }

    try {
      await dispatch(
        publishBlogBtnFtn({ banner, title, desc, content })
      );
      // dispatch(isPublishModalFtn());
      toast.success("Published Blog", { position: "top-center" });
      route.push("/blogs");
    } catch (error) {
      toast.error(err, { position: "top-center" });
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <Toaster />

      <div className="w-full max-w-4xl bg-background rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Publish Preview</h2>

          <X className="cursor-pointer" onClick={handleCloseEvent} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Preview</p>

            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={banner || "/blog-banner.jpg"}
                alt="Blog banner"
                fill
                className="object-cover"
              />
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight line-clamp-2">
              {title || "Blog title goes here"}
            </h1>

            <p className="mt-2 text-muted-foreground line-clamp-3">
              {truncateText(desc) ||
                "Short blog description or excerpt preview"}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Blog Title
              </label>
              <input
                onChange={handleBlogTitleChange}
                type="text"
                defaultValue={title}
                placeholder="Enter blog title"
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                onChange={handleBlogDescChange}
                defaultValue={desc}
                placeholder="Short blog description"
                rows={4}
                className="w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" className="cursor-pointer" onClick={handleCloseEvent}>
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={publishPreview}>Publish Blog</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PublishForm;
