import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeneficiariesView from './BeneficiariesView';

export default function LegacyView(props: any) {
    return (
        <>
            <div id="legacy" className="section ">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font-bold text-gold-400 mb-2">
                        Legacy Planning
                    </h1>
                    <p className="text-gray-300">
                        Secure and transfer your network assets to future generations
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* <!-- Network Asset Overview --> */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                        <h3 className="text-xl font-semibold text-gold-400 mb-4">
                            Network Asset Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                <span className="text-white">Total Network Value</span>
                                <span className="text-gold-400 font-semibold">$2,847,000</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                <span className="text-white">Transferable Connections</span>
                                <span className="text-white">623</span>{' '}
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-gray-700">
                                <span className="text-white">Blockchain Secured</span>{' '}
                                <span className="text-green-400">
                                    <i className="fas fa-check"></i> Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-white">Beneficiaries Assigned</span>
                                <span className="text-white">2</span>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Legacy Tools --> */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20">
                        <h3 className="text-xl font-semibold text-gold-400 mb-4">
                            Legacy Management Tools
                        </h3>
                        <div className="space-y-4">
                            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg text-left">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Beneficiary Management</div>
                                        <div className="text-gray-400 text-sm">
                                            Assign and manage network heirs
                                        </div>{' '}
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="text-gold-400"
                                    />
                                </div>{' '}
                            </button>
                            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg text-left">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Transfer Protocols</div>
                                        <div className="text-gray-400 text-sm">
                                            Configure inheritance conditions
                                        </div>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="text-gold-400"
                                    />
                                </div>{' '}
                            </button>
                            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg text-left">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Network Preservation</div>
                                        <div className="text-gray-400 text-sm">
                                            Ensure long-term relationship value
                                        </div>{' '}
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="text-gold-400"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                    <BeneficiariesView />
                </div>
            </div>
        </>
    );
}
