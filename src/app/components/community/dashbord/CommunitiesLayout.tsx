

import { CommunityModel } from "@/models/Community";
import CommunitieCard from "./CommunitieCard";

interface ViewProps {
    communities: CommunityModel[]
}

export default function CommunitiesLayout({
    communities
}: ViewProps) {


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {communities?.map((community, index) => (
                    <CommunitieCard community={community} key={index} />
                ))}
            </div>
        </>
    )
}