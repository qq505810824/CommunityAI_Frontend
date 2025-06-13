export default function FeaturedServicesView(props: any) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl overflow-hidden card-hover border border-gold-400/20">
                    <div className="h-48 gradient-gold"></div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-white">Harvard Executive Program</h3>
                            <span className="text-gold-400 text-sm">Education</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">Exclusive 12-week leadership program
                            for C-suite executives</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gold-400">$89K</span>
                            <button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-4 py-2 rounded-lg font-medium">Inquire</button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-xl overflow-hidden card-hover border border-gold-400/20">
                    <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600"></div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-white">Private Jet Charter</h3>
                            <span className="text-gold-400 text-sm">Travel</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">Global fleet of luxury aircraft with 24/7
                            concierge service</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gold-400">$25K/hr</span>
                            <button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-4 py-2 rounded-lg font-medium">Book</button>
                        </div> </div>
                </div>
                <div className="bg-gray-800 rounded-xl overflow-hidden card-hover border border-gold-400/20">
                    <div className="h-48 bg-gradient-to-br from-green-600 to-teal-600"></div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-white">Longevity Program</h3>
                            <span className="text-gold-400 text-sm">Wellness</span> </div>
                        <p className="text-gray-300 text-sm mb-4">Comprehensive health optimization
                            with world-className physicians</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gold-400">$150K</span>
                            <button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-4 py-2 rounded-lg font-medium">Consult</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}