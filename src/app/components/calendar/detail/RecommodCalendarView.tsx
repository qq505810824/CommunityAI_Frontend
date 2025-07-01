import { randomCalendarData, showCalendarValues } from '@/hooks/useCalendarData';
import { CalendarModel } from '@/models/Calendar';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
interface ViewProps { }

export default function RecommodCalendarView(props: ViewProps) {
    const router = useRouter();
    const [products, setProducts] = useState<CalendarModel[]>([]);
    const [filters, setFilters] = useState<any>({
        p_limit: 5,
        category: '',
        region: ''
    });
    const { data, isLoading, isError, mutate } = randomCalendarData({ ...filters });

    useEffect(() => {
        if (data) {
            // console.log('data', data);

            const newData = data?.map((item) => {
                return showCalendarValues(item);
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleClick = (product: CalendarModel) => {
        router.push(`/calendar/${product.id}`);
    };

    return (
        <>
            <div className="mt-10 w-full flex items-center rounded-md text-white text-sm font-medium bg-orange-500 p-2 ">
                <LocalFireDepartmentOutlinedIcon sx={{ color: 'white' }} /> 其他精彩活動
            </div>
            <div className="flex-col  space-y-1  my-2  w-full ">
                {products?.map((product, index) => (
                    <div
                        key={index}
                        className="border-l-4 rounded-l-md border-l-orange-500 rounded-md space-y-4 hover:bg-gray-200 cursor-pointer bg-white"
                        onClick={() => handleClick(product)}
                    >
                        <div className="p-2">
                            <div className="flex flex-row space-x-2 justify-between ">
                                <div className="space-y-2 word-break">
                                    <p
                                        className="text-sm font-bold"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            WebkitLineClamp: 1,
                                            height: '1.5em' // 根据行高设置最大高度
                                        }}
                                    >
                                        {product.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row text-sm  my-1 justify-between items-center">
                                {product.from_date} - {product.to_date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
