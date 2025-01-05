"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/redux/store";
import { handleAuthStateChanged } from "@/lib/redux/slices/userSlice";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store();
        storeRef.current.dispatch(handleAuthStateChanged());
    }

    useEffect(() => {}, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
