import { BookModel } from '@/models/Book';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: BookModel;
}

export default function BookCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const handleClick = () => {
        router.push(`/books/${product.id}`);
    };

    return (
        <>
            <div
                className="border rounded-md space-y-2 hover:shadow-lg cursor-pointer bg-white"
                onClick={handleClick}
            >
                <div className="w-full h-[250px]">
                    <img
                        src={product.cover_url}
                        className="w-full h-full object-cover rounded-t-3xlmd"
                        alt=""
                    />
                </div>
                <div className="p-2">
                    <div className="flex flex-row space-x-2 justify-between ">
                        <div className="space-y-2 word-break">
                            <p
                                className="text-md font-bold hover:text-orange-500"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 1,
                                    height: '1.5em' // 根据行高设置最大高度
                                }}
                            >
                                {product.title}
                            </p>
                            <p
                                className="text-sm text-gray-400"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 1,
                                    height: '1.5em' // 根据行高设置最大高度
                                }}
                            >
                                {product.description.replace(/<[^>]*>/g, '')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
