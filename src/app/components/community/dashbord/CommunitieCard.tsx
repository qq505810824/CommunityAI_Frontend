

import { CommunityModel } from "@/models/Community";
import { useRouter } from "next/navigation";

interface ViewProps {
    community: CommunityModel;
}

export default function CommunitieCard({
    community
}: ViewProps) {

    const router = useRouter()

    const handleClickCommuity = (commuity: any) => {
        router.push(`/communitys/${commuity?.id}`)
    }
    return (
        <>

            <div
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="flex items-center space-x-3 mb-4">
                    <div
                        className={`w-12 h-12 bg-${community.theme}-100 rounded-full flex items-center justify-center text-xl`}
                    >
                        {community.logo}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {community.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {community.accounts_count} members
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                            {community.channels_count}
                        </div>
                        <div className="text-xs text-gray-500">Channels</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                            {community.courses_count}
                        </div>
                        <div className="text-xs text-gray-500">Courses</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">
                            {community.events_count}
                        </div>
                        <div className="text-xs text-gray-500">Events</div>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Unread posts</span>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            {community.unreadPosts || 0}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Revenue (30d)</span>
                        <span className="text-green-600 font-medium">
                            ${community.revenue || 0}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        // setSelectedCommunity(community);
                        // setCurrentView('community');
                        handleClickCommuity(community)
                    }}
                    className={`w-full mt-4 bg-${community.theme}-500 text-white py-2 rounded-lg hover:bg-${community.theme}-600 transition-colors`}
                >
                    Enter Community
                </button>
            </div>
        </>
    )
}