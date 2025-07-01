import CommunitiesLayout from '@/app/components/community/dashbord/CommunitiesLayout';
import { CommunityModel } from '@/models/Community';
interface ViewProps {
    communities: CommunityModel[]
}

export default function CommunityView({
    communities
}: ViewProps) {

    return (
        <>
            <div className="flex-1 p-6 bg-gray-50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Communities</h2>
                        <p className="text-gray-600">My communities</p>
                    </div>

                    {/* Enhanced Community Overview Cards */}
                    <CommunitiesLayout communities={communities} />

                    {/* Enhanced Newsfeed */}
                    {/* <NewsfeedLayout /> */}
                </div>
            </div>
        </>
    )
}