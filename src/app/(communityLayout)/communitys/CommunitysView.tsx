import CommunitiesLayout from '@/app/components/community/dashbord/CommunitiesLayout';

export default function CommunityView() {

    return (
        <>
            <div className="flex-1 p-6 bg-gray-50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Communities</h2>
                        <p className="text-gray-600">My communities</p>
                    </div>

                    {/* Enhanced Community Overview Cards */}
                    <CommunitiesLayout />

                    {/* Enhanced Newsfeed */}
                    {/* <NewsfeedLayout /> */}
                </div>
            </div>
        </>
    )
}