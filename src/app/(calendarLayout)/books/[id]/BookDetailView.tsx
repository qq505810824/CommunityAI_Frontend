import BackView from '@/app/components/base/back/BackView';
import PdfView from '@/app/components/common/Widget/PdfView';
import { BookModel } from '@/models/Book';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import './style.css';

interface ViewProps {
    product: BookModel;
}

function BookDetailView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView
                        title="Back"
                        onClick={() => {
                            router.push('/books');
                        }}
                    />
                    <div className="w-full px-4  flex flex-col justify-center space-y-4 ">
                        <div className="w-full flex flex-row items-start flex-wrap  ">
                            <div className="w-[200px] h-[250px]">
                                <img
                                    src={product.cover_url}
                                    className="w-full h-full object-cover rounded-t-3xlmd"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col  items-start space-y-2 px-2">
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: { xs: '22px', sm: '24px', md: '26px' }
                                    }}
                                >
                                    {product?.title}
                                </Typography>
                                <div className="flex flex-row space-x-2">
                                    <p className="text-sm">
                                        作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者:
                                    </p>
                                    <p className="text-sm">{product.author}</p>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <p className="text-sm">出&nbsp;&nbsp;版&nbsp;&nbsp;社:</p>
                                    <p className="text-sm">{product.publisher}</p>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <p className="text-sm">出版日期:</p>
                                    <p className="text-sm">{product.publish_date}</p>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <p className="text-sm">
                                        標&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籤:
                                    </p>
                                    <p className="text-sm">{product.category}</p>
                                </div>
                                {/* <OperationView {...{ product }} /> */}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-md font-semibold">簡介</p>
                            <p>{product.description}</p>
                        </div>
                        <PdfView content={product.file_url} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetailView;
