"use client";

import StoreProvider from "@/state/redux";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
