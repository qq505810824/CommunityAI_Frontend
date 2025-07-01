"use client"

import { useCommunityData } from "@/hooks/useCommunityData";
import CommunityView from "./CommunitysView";

export default function CommunityContainter() {
    const { data, isLoading, isError, mutate } = useCommunityData();

    return (
        <>
            <CommunityView
                {...{
                    communities: data
                }}
            />
        </>
    )
}