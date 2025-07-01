"use client"

import CommunityDetailView from "./CommunityDetailView";
import { useAppDetailContext } from "./detail-context";

export default function CommunityDetailContainter() {
    const { appData } = useAppDetailContext()
    return (
        <>
            <CommunityDetailView
                {...{
                    community: appData
                }}
            />
        </>
    )
}