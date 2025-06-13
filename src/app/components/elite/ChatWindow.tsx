import {
    faPaperPlane,
    faRobot,
    faShield
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ChatWindow(props: any) {

    return (
        <>
            <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gold-400/20 flex flex-col">
                <div className="p-4 border-b border-gray-700 ">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">SC</span>
                        </div> <div>
                            <div className="text-white font- medium">Sarah Chen</div>
                            <div className="text-green-400 text-sm flex items-center">
                                <FontAwesomeIcon icon={faShield} className="mr-2" />
                                End-to-end encrypted </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    <div className="flex justify-start">
                        <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                            <p className="text-white text-sm">Hi John! Looking forward to our meeting next week. I have some exciting opportunities
                                to discuss.</p>
                            <p className="text-gray-400 text-xs mt-1">2:34 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-gold-400 rounded-lg p-3 max-w-xs">
                            <p className="text-gray-900 text-sm">Absolutely! I'm excited to hear about them. Would Tuesday at 2 PM work for you?</ p>
                            <p className="text-gray-700 text-xs mt-1">2:36 PM</p>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                            <p className="text-white text-sm"> <FontAwesomeIcon icon={faRobot} className="mr-2" />AI Suggestion: Consider introducing Sarah to Marcus Rodriguez - high synergy potential in fintech investments.</p>
                            <p className="text-blue-200 text-xs mt-1">AI Assistant</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex space-x-2">
                        <input type="text"
                            placeholder="Type your message..." className="flex-1 bg-gray-700 text-white rounded- lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gold-400" />

                        <button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-4 py-2 rounded-lg">
                            <FontAwesomeIcon icon={faPaperPlane} className="" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}