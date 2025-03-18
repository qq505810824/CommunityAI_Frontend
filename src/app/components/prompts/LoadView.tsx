import { CircularProgress, Link } from '@mui/joy';

interface ViewProps {
    loading?: boolean
}

export default function LoadView(props: ViewProps) {
    const { loading } = props;
    return (
        <>
            <Link
                component="button"
                variant="plain"
                startDecorator={<CircularProgress />}
                sx={{ p: 1 }}
            >
                Loading...
            </Link>
        </>
    );
}
