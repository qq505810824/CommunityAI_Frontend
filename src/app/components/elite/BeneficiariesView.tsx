export default function BeneficiariesView(props: any) {
    return (
        <>
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                <h3 className="text-xl font-semibold text-gold-400 mb-4">Designated Beneficiaries</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">ED</span>
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-white">Emily Davidson</div>
                            <div className="text-gray-400 text-sm">Daughter • 65% Network Allocation</div>
                        </div>
                        <div className="text-gold-400">$1.85M</div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"> <span className="text-white font-semibold">MD</span> </div>
                        <div className="flex-1">
                            <div className="font-medium text-white">Michael Davidson</div>
                            <div className="text-gray-400 text-sm">Son • 35% Network Allocation</div> </div>
                        <div className="text-gold-400">$996K</div>
                    </div>
                </div>
            </div>

        </>
    )
}