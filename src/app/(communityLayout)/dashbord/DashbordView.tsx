import CommunitiesLayout from '@/app/components/community/dashbord/CommunitiesLayout';
import NewsfeedLayout from '@/app/components/community/dashbord/NewsfeedLayout';
import { CommunityModel } from '@/models/Community';


interface ViewProps {
    communities: CommunityModel[]
}


export default function DashbordView({
    communities
}: ViewProps) {



    return (
        <>
            <div className="flex-1 p-6 bg-gray-50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
                        <p className="text-gray-600">Here's what's happening in your communities</p>
                    </div>

                    {/* Enhanced Community Overview Cards */}
                    <CommunitiesLayout communities={communities} />

                    {/* Enhanced Newsfeed */}
                    <NewsfeedLayout />
                </div>
            </div>
        </>
    )
}