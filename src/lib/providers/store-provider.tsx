"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { appStore, type AppStore } from "../store";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = appStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
