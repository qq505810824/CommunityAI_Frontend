import CalendarCard from '@/app/components/calendar/CalendarCard';
import { CalendarModel } from '@/models/Calendar';
import { CalendarCategorys } from '@/utils/constant';
import { Typography } from '@mui/joy';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    data: any;
    isLoading: any;
    products: CalendarModel[];
    onClose: () => void;
    handleSearch: any;
    onSwitchCategory: any;
    searching?: boolean;
    filters?: any;
    setFilters?: any;
}

function EventView(props: ViewProps) {
    const {
        isLoading,
        products,
        onClose,
        handleSearch,
        onSwitchCategory,
        searching,
        filters,
        setFilters
    } = props;

    const router = useRouter();

    const [menu, setMenu] = useState('');
    const [keyword, setKeyword] = useState('');

    const switchMenu = (value: string) => {
        setMenu(value);
        // onSwitchCategory(value);
    };

    const handleCreatCourse = () => {
        router.push(`/courses/create`);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold">Events</h3>
                        <p className="text-gray-600 text-sm">
                            Virtual and in-person events for community members
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleCreatCourse();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Course</span>
                    </button>
                </div>

                {/* Event Filters */}
                <div className="flex items-center space-x-4">
                    {CalendarCategorys.map((category, index) => {
                        return (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-lg text-sm ${menu == category.value ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => {
                                    switchMenu(category.value);
                                    setFilters({
                                        ...filters,
                                        category: category.value
                                    });
                                }}
                            >
                                {category.name}
                            </button>
                        );
                    })}
                </div>

                {/* {(isLoading || searching) && <LoadView />} */}
                {products.length == 0 && !isLoading && !searching && (
                    <Typography level="h4" sx={{ padding: 10 }}>
                        No Data.
                    </Typography>
                )}
                <div className="flex-row   pb-10  grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                    {products?.map((product, index) => (
                        <CalendarCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default EventView;
