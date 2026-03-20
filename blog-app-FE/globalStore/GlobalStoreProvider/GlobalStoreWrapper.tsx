"use client";

import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

function GlobalStoreWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default GlobalStoreWrapper;
