import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import { Card, CardContent, Typography } from '@mui/joy';

interface ViewProps {
    data?: any;
}

function AdminView(props: ViewProps) {
    const { data } = props;
    return (
        <>
            <BreadcrumbsView />
            <div className='flex flex-row justify-between'>
                <Typography level="h4" textColor="inherit">Prompt应用统计</Typography>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 my-4'>
                <Card variant="solid" color='primary'>
                    <CardContent>
                        <Typography level="h4" textColor="inherit">{data?.total_view}</Typography>
                        <Typography textColor="inherit"> 总浏览数</Typography>
                    </CardContent>
                </Card>
                <Card variant="solid"
                    sx={{
                        bgcolor: '#f87171'
                    }}>
                    <CardContent>
                        <Typography level="h4" textColor="inherit">{data?.total_focus}</Typography>
                        <Typography textColor="inherit"> 总关注数</Typography>
                    </CardContent>
                </Card>
                <Card variant="solid" sx={{
                    bgcolor: '#fb923c'
                }}>
                    <CardContent>
                        <Typography level="h4" textColor="inherit">{data?.total_collect}</Typography>
                        <Typography textColor="inherit"> 总收藏数</Typography>
                    </CardContent>
                </Card>
                <Card variant="solid"
                    sx={{
                        bgcolor: '#8098f9'
                    }}>
                    <CardContent>
                        <Typography level="h4" textColor="inherit">{data?.total_share}</Typography>
                        <Typography textColor="inherit"> 总分享数</Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default AdminView;
