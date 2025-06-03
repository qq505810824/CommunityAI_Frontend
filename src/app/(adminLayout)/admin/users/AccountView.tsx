import UserItem from '@/app/components/admin/users/UserItem';
import TableSheet from '@/app/components/base/table';
import SearchInputView from '@/app/components/common/Views/SearchInputView';
import { UserModel } from '@/hooks/useUserData';
import { AccountModel } from '@/models/Account';
import { Button, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    data: any;
    isLoading: any;
    accounts: AccountModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    onDelete: (id: string) => void;
}

function AccountView(props: ViewProps) {
    const { data, isLoading, accounts, onClose, handleSearch, searching, onDelete } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex justify-between items-center my-4">
                <Typography level="h3">用户列表</Typography>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={() => router.push('/admin/accounts/create')}
                >
                    +新增
                </Button>
            </div>
            <div>
                <SearchInputView
                    className={'w-full rounded-full mb-4'}
                    handleSearch={handleSearch}
                    loading={searching}
                    placeholder="Search"
                    sx={{
                        borderRadius: 100
                    }}
                />
            </div>
            {/* 给表格外层容器添加样式，使其内容超出时可横向滚动 */}
            <div className="w-full overflow-x-scroll">
                <TableSheet className=" ">
                    {' '}
                    {/* 给表格设置最小宽度 */}
                    <thead>
                        <tr>
                            {/* <th className="text-center whitespace-nowrap w-[200px]">用户名</th> */}
                            {/* <th className="text-center whitespace-nowrap w-[200px]">昵称</th> */}
                            <th className="text-center whitespace-nowrap w-[200px]">邮箱</th>
                            <th className="text-center whitespace-nowrap w-[200px]">创建时间</th>
                            <th className="text-center whitespace-nowrap w-[200px]">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(({ users }: any) =>
                            users?.map((user: UserModel, index: number) => (
                                <UserItem
                                    user={user}
                                    key={user.id}
                                    onDelete={() => onDelete(user.id)}
                                />
                            ))
                        )}

                    </tbody>
                </TableSheet>
            </div>
        </>
    );
}

export default AccountView;
