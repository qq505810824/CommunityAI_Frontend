
import {
    BarChart2,
    Eye,
    FileText,
    Settings,
    User
} from 'lucide-react';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Submission } from './FormSubmissionsContainer';

interface ViewProps {
    submissions: Submission[];
    formDetails: any;
    meta: any;
    handleCheckin: any;
    handleCheckout: any;
    handleResendEmail: any;
}

function FormSubmissionsView(props: ViewProps) {
    const {
        submissions,
        formDetails,
        meta,
        handleCheckin,
        handleCheckout,
        handleResendEmail
    } =
        props;
    const params = useParams();
    const [showFormDetails, setShowFormDetails] = useState(false);
    const router = useRouter();
    return (
        <>
            <div className="mx-auto p-4">
                <div className="flex flex-row items-center justify-between mb-4 hidden">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFormDetails(!showFormDetails)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2 text-sm"
                        >
                            <Eye className="w-4 h-4" />
                            {showFormDetails ? '隱藏表單內容' : '顯示表單內容'}
                        </button>
                        {/* <ExportToXlsxButton name="submissions" datas={submissions} disabled={false} /> */}
                    </div>
                </div>

                {showFormDetails && formDetails && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold flex items-center">
                                <FileText className="w-6 h-6 mr-2" /> 表單內容
                            </h2>
                            <button
                                onClick={() => router.push(`/admin/forms/${params['id']}/settings`)}
                                className="text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
                            >
                                <Settings className="w-5 h-5" />
                                表單設置
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="bg-gray-50 p-4 rounded">
                                    <p className="mb-2">
                                        <span className="font-medium">表單標題：</span>
                                        {formDetails.json_schema?.title}
                                    </p>
                                    <div className="mb-2">
                                        <span className="font-medium">表單描述：</span>
                                        <div
                                            className="mt-1"
                                            dangerouslySetInnerHTML={{
                                                __html: formDetails.json_schema?.description || ''
                                            }}
                                        />
                                    </div>
                                    <p>
                                        <span className="font-medium">創建時間：</span>
                                        {moment(formDetails.created_at).format('YYYY-MM-DD HH:mm')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">表單統計</h3>
                                <div className="bg-gray-50 p-4 rounded">
                                    <p className="mb-2">
                                        <span className="font-medium">總提交數：</span>
                                        {meta?.total_count || 0}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">已入場人數：</span>
                                        {submissions.filter((s) => s.checked_in).length}
                                    </p>
                                    <p>
                                        <span className="font-medium">未入場人數：</span>
                                        {submissions.filter((s) => !s.checked_in).length}
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <h3 className="font-semibold mb-2">表單欄位</h3>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formDetails.json_schema?.properties &&
                                            Object.entries(formDetails.json_schema.properties).map(
                                                ([key, field]: [string, any]) => {
                                                    if (!field) return null;
                                                    return (
                                                        <div key={key} className="flex flex-col">
                                                            <span className="font-medium">
                                                                {field.title}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                類型：{field.type}
                                                                {formDetails.json_schema.required?.includes(
                                                                    key
                                                                ) && (
                                                                        <span className="text-red-500 ml-2">
                                                                            必填
                                                                        </span>
                                                                    )}
                                                            </span>
                                                            {field.enum && (
                                                                <span className="text-sm text-gray-600">
                                                                    選項：{field.enum.join(', ')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <User className="w-6 h-6 mr-2" /> 報名者列表({meta?.total_count || 0})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full my-4 bg-white border table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border-b px-4 py-2 text-center whitespace-nowrap">
                                        編號
                                    </th>
                                    {formDetails?.json_schema?.properties &&
                                        Object.entries(formDetails.json_schema.properties).map(
                                            ([key, field]: [string, any]) => (
                                                <th
                                                    key={key}
                                                    className="border-b px-4 py-2 text-left whitespace-nowrap"
                                                >
                                                    <div className="font-medium">{field.title}</div>
                                                </th>
                                            )
                                        )}
                                    {/* <th className="border-b px-4 py-2 text-left whitespace-nowrap">
                                        入場狀態
                                    </th>
                                    <th className="border-b px-4 py-2 text-left whitespace-nowrap">
                                        入場時間
                                    </th> */}
                                    <th className="border-b px-4 py-2 text-left whitespace-nowrap">
                                        報名時間
                                    </th>
                                    <th className="border-b px-4 py-2 text-left">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions?.map((submission, index) => (
                                    <tr key={submission.qrcode_id} className="hover:bg-gray-100">
                                        <td className="border-b px-4 py-2 text-center">{index + 1}</td>
                                        {formDetails?.json_schema?.properties &&
                                            Object.entries(formDetails.json_schema.properties).map(
                                                ([key, field]: [string, any]) => {
                                                    const value = submission.submission_data[key];
                                                    return (
                                                        <td
                                                            key={key}
                                                            className="border-b px-4 py-2 whitespace-nowrap"
                                                        >
                                                            {Array.isArray(value)
                                                                ? value.join(', ')
                                                                : value}
                                                        </td>
                                                    );
                                                }
                                            )}
                                        {/* <td className="border-b px-4 py-2 whitespace-nowrap">
                                            {submission.checked_in ? (
                                                <div className="flex flex-row items-center text-sm">
                                                    <span className="text-green-500 flex items-center">
                                                        已入場
                                                    </span>
                                                    <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                                                </div>
                                            ) : (
                                                <span className="text-red-500">未入場</span>
                                            )}
                                        </td>
                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                            {submission.check_in_at
                                                ? moment(submission.check_in_at).format('MM-DD HH:mm')
                                                : ''}
                                        </td> */}
                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                            {moment(submission.created_at).format('MM-DD HH:mm')}
                                        </td>
                                        <td className="border-b px-4 py-2 whitespace-nowrap">
                                            <div className="flex flex-row items-center hidden">
                                                {!submission.checked_in ? (
                                                    <span
                                                        className="text-blue-500 text-sm flex items-center cursor-pointer"
                                                        onClick={() => {
                                                            if (window.confirm('確定要簽到嗎？')) {
                                                                handleCheckin(submission.qrcode_id);
                                                            }
                                                        }}
                                                    >
                                                        簽到
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-blue-500 text-sm flex items-center cursor-pointer"
                                                        onClick={() => {
                                                            if (window.confirm('確定要取消簽到嗎？')) {
                                                                handleCheckout(submission.qrcode_id);
                                                            }
                                                        }}
                                                    >
                                                        取消簽到
                                                    </span>
                                                )}
                                                <span className="mx-2">|</span>
                                                <span
                                                    className="text-blue-500 text-sm flex items-center cursor-pointer"
                                                    onClick={() => {
                                                        if (window.confirm('確定要重發Email嗎？')) {
                                                            handleResendEmail(submission.id);
                                                        }
                                                    }}
                                                >
                                                    重發Email
                                                </span>
                                                {/* <span className="mx-2">|</span>
                                                <span
                                                    className="text-red-500 text-sm flex items-center cursor-pointer"
                                                    onClick={() => {
                                                        if (window.confirm('確定要刪除嗎？')) {
                                                            handleDeleteFormSubmission(submission.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2Icon className="w-4 h-4 ml-1 text-red-500" />
                                                </span> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* {loading && <div className="text-center mt-10">Loading...</div>} */}
                <div className="hidden">
                    <h2 className="text-xl font-semibold flex items-center">
                        <BarChart2 className="w-6 h-6 mr-2" /> 統計數據
                    </h2>
                    {/* 集成圖表庫來展示統計數據 */}
                </div>
                <div className="mt-4 flex justify-end fixed bottom-6 right-2">
                    {/* <ScanButton /> */}
                </div>
            </div>
        </>
    )
}


export default FormSubmissionsView;
