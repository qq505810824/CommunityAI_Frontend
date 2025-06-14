import ChatWindow from './ChatWindow';

export default function MessagingView(props: any) {
    return (
        <>
            <div id="messaging" className="section">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font-bold text-gold-400 mb-2">
                        Secure Communications
                    </h1>
                    <p className="text-gray-300">
                        End-to- end encrypted messaging with AI assistance
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
                    {/* <!-- Contacts List --> */}
                    <div className="bg-gray-800 rounded-xl p-4 border border-gold-400/20">
                        <h3 className="text-lg font-semibold text-gold-400 mb-4">
                            Recent Conversations
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">SC</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium">Sarah Chen</div>
                                    <div className="text-gray-400 text-sm truncate">
                                        Looking forward to our meeting...
                                    </div>{' '}
                                </div>
                                <div className="w-3 h-3 bg-green-400 rounded-full network-pulse"></div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">MR</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium">Marcus Rodriguez</div>
                                    <div className="text-gray-400 text-sm truncate">
                                        The investment opportunity...
                                    </div>{' '}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">AL</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium">Alexandra Liu</div>
                                    <div className="text-gray-400 text-sm truncate">
                                        Event details attached
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ChatWindow />
                </div>
            </div>
        </>
    );
}
