import { Blog, PublishReviewType } from "@/types/editorjs-marker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Contentwithdesc {
  content: [];
  desc: string;
}

export interface BlogType {
  title: string;
  banner: string;
  contentWithDesc: Contentwithdesc;
  isPublishModal: boolean;
  loading: boolean;
  err: string;
}

const initialState: BlogType = {
  title: "",
  banner: "",
  contentWithDesc: {
    content: [],
    desc: ""
  },

  isPublishModal: false,
  loading: false,
  err: ""
};

const resetBlogState = (state: {
  contentWithDesc: Contentwithdesc;
  title: string;
  banner: string;
  author: string;
}) => {
  state.banner = "";
  state.title = "";
  state.author = "";
  state.contentWithDesc = {
    content: [],
    desc: ""
  };
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBanner: (state, action: PayloadAction<string>) => {
      state.banner = action.payload;
    },
    isPublishModalFtn: (state) => {
      state.isPublishModal = !state.isPublishModal;
    },
    changeTitleFtn: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    changeDescFtn: (state, action: PayloadAction<string>) => {
      state.contentWithDesc.desc = action.payload;
    },
    publishBtnFtn: (state, actions: PayloadAction<Blog>) => {
      const { outputData, upLoadedImgUrl, blogTitle } = actions.payload;

      state.contentWithDesc.content = outputData;
      state.title = blogTitle;
      state.banner = upLoadedImgUrl;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(publishBlogBtnFtn.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishBlogBtnFtn.fulfilled, (state) => {
        // resetBlogState(state);
        state.isPublishModal = !state.isPublishModal;
        state.banner = "";
        state.title = "";
        state.contentWithDesc.content = [];
        state.contentWithDesc.desc = "";
      })
      .addCase(publishBlogBtnFtn.rejected, (state) => {
        state.err = "Publish failed";
      });
  }
});

export const publishBlogBtnFtn = createAsyncThunk(
  "blog/publishBlogBtnFtn",
  async (params: PublishReviewType) => {
    const { banner, title, content, desc } = params;

    const dataBody = { banner, title, content, desc };

    const response = await fetch("/api/create-blog", {
      method: "POST",
      body: JSON.stringify(dataBody),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      return "Publish failed";
    }

    const result = await response.json();

    return result;
  }
);

export const {
  getBanner,
  isPublishModalFtn,
  changeTitleFtn,
  changeDescFtn,
  publishBtnFtn
} = blogSlice.actions;

export default blogSlice.reducer;
