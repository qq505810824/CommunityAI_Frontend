export default function RecentView(props: any) {
    return (
        <>
            <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                <h3 className="text-xl font-semibold text-gold-400 mb-4">Recent Network Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 py-3 border-b border-gray-700 last:border-b-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">SC</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">Sarah Chen accepted your connection</p>
                            <p className="text-gray-400 text-sm">Tech entrepreneur with $50M+ portfolio</p>
                        </div>
                        <div className="text-green-400 text-sm">+$12K value</div> </div>
                    <div className="flex items-center space-x-4 py-3 border-b border-gray-700 last:border-b-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">MR</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">Marcus Rodriguez shared deal flow</ p>
                            <p className="text-gray-400 text-sm">Venture partner at Sequoia Capital</p>
                        </div>
                        <div className="text-gold-400 text-sm">Collaboration</div>
                    </div>
                    <div className="flex items-center space-x-4 py-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">AL</span> </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">Alexandra Liu joined your event</p> <p className="text-gray-400 text-sm">Global head of M&A at Goldman Sachs</ p>
                        </div>
                        <div className="text-blue-400 text-sm">Event RSVP</div>
                    </div>
                </div>
            </div>
        </>
    );
}
