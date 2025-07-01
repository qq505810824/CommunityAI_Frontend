

import NewsfeedCard from "./NewsfeedCard";

export default function NewsfeedLayout() {


    const newsfeedData = [
        {
            id: 1,
            community: 'Digital Marketing Pros',
            type: 'channel-post',
            channel: 'announcements',
            author: 'Sarah Chen',
            content:
                '🎉 New advanced SEO course launching next week! Premium members get early access.',
            timestamp: '2 hours ago',
            likes: 24,
            isAIGenerated: false
        },
        {
            id: 2,
            community: 'Creative Designers Hub',
            type: 'course-update',
            course: 'Design Fundamentals',
            content: "New module added: 'Color Theory in Modern Design' - 5 new lessons available",
            timestamp: '4 hours ago',
            isAIGenerated: false
        },
        {
            id: 3,
            community: 'Fitness & Wellness',
            type: 'event-reminder',
            event: 'Morning Yoga Session',
            content: "Reminder: Your registered event 'Morning Yoga Session' starts in 2 hours!",
            timestamp: '6 hours ago',
            isAIGenerated: false
        },
        {
            id: 4,
            community: 'Digital Marketing Pros',
            type: 'ai-summary',
            content:
                "AI Summary: This week's highlights include 3 new channel posts, 2 course updates, and upcoming SEO masterclass with 67 registrations.",
            timestamp: '1 day ago',
            isAIGenerated: true
        }
    ];


    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border ">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Community Updates</h3>
                </div>

                <div className="divide-y">
                    {newsfeedData.map((item, index) => (
                        <NewsfeedCard item={item} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}