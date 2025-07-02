import { CalendarModel } from '@/models/Calendar';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button } from '@mui/joy';

interface ViewProps {
    product?: CalendarModel;
}

export default function ReferenceUrlView(props: ViewProps) {
    const { product } = props;

    return (
        <>
            {product?.reference_url && (
                <Button
                    startDecorator={<ShareOutlinedIcon sx={{ width: '18px' }} />}
                    onClick={() => {
                        window.open(product?.reference_url, '_blank');
                    }}
                >
                    相關網址
                </Button>
            )}
        </>
    );
}
