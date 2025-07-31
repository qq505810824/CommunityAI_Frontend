import { useAppContext } from '@/context/app-context';
import { useCommunityOperations } from '@/hooks/useCommunityData';
import { CommunityModel } from '@/models/Community';
import { useState } from 'react';

interface ViewProps {
    payload: any;
    submit: () => void;
    cancel: any;
}

export default function JoinCommunityView({ payload, submit, cancel }: ViewProps) {
    const { joinCommunity, searchCommunity } = useCommunityOperations();
    const { user_id } = useAppContext();
    const [submitting, setSubmitting] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单自动跳转和刷新
        setSubmitting(true);
        const res = await searchCommunity({ code: code });
        if (res.data && res.data.length == 0) {
            setSubmitting(false);
            setError('Not found');
            return;
        }
        const community = res.data[0] as CommunityModel;
        // console.log('res', res);

        const joinRes = await joinCommunity({
            owner: community.owner,
            account: user_id,
            community: community.id
        });
        setSubmitting(false);
        // console.log('joinRes', joinRes);
        if (joinRes.error) {
            setError(joinRes.error.toString());
            return;
        }

        submit();
    };

    return (
        <>
            <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold  mb-4">Join an Community</h4>
                <form onSubmit={onSubmit} className=" ">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Community Code</label>
                            <input
                                type="text"
                                value={code}
                                name={'code'}
                                required={true}
                                onChange={(e) => {
                                    setError('');
                                    setCode(e.target.value);
                                }}
                                placeholder="code"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            {error && <label className=" text-red-500 text-sm">*{error}</label>}
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                disabled={submitting}
                                onClick={cancel}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Comfirm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
