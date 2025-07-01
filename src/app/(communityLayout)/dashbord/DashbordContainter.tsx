"use client"

import { useCommunityData } from "@/hooks/useCommunityData";
import DashbordView from "./DashbordView";

export default function DashbordContainer() {
    const { data, isLoading, isError, mutate } = useCommunityData();

    return (
        <>
            <DashbordView
                {...{
                    communities: data
                }}
            />
        </>
    )
}