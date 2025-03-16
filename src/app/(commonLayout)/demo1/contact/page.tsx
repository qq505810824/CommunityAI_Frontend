import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>联系我们 - 科技公司官网</title>
                <meta name="description" content="联系科技公司获取更多信息" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="container mx-auto py-16 px-4">
                <Typography variant="h2" className="text-center mb-8">
                    联系我们
                </Typography>
                <div className="bg-white shadow-md rounded-lg p-8">
                    <Typography variant="h5" className="mb-4">
                        联系方式
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                        电话：[电话号码]
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                        邮箱：[邮箱地址]
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                        地址：[公司地址]
                    </Typography>
                    <Typography variant="h5" className="mt-8 mb-4">
                        在线咨询
                    </Typography>
                    <form>
                        <TextField label="姓名" variant="outlined" fullWidth className="mb-4" />
                        <TextField label="邮箱" variant="outlined" fullWidth className="mb-4" />
                        <TextField label="电话" variant="outlined" fullWidth className="mb-4" />
                        <FormControl variant="outlined" fullWidth className="mb-4">
                            <InputLabel>咨询类型</InputLabel>
                            <Select label="咨询类型">
                                <MenuItem value="产品咨询">产品咨询</MenuItem>
                                <MenuItem value="合作咨询">合作咨询</MenuItem>
                                <MenuItem value="其他咨询">其他咨询</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="咨询内容"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            className="mb-4"
                        />
                        <Button variant="contained" color="primary">
                            提交咨询
                        </Button>
                    </form>
                </div>
            </div>
            {/* 使用独立的 Footer 组件 */}
            <Footer />
        </div>
    );
};

export default ContactPage;
