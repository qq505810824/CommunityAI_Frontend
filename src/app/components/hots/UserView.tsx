import { AccountModel } from '@/models/Account';
import { Typography } from '@mui/joy';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import classNames from 'classnames';

interface ViewProps {
    user?: AccountModel;
    imgClassName?: any;
    textClassName?: any;
}

export default function UserView(props: ViewProps) {
    const { user, imgClassName, textClassName } = props;
    const supabase = createClientComponentClient();

    const getImageUrl = (path: string | null) => {
        if (!path) return '../avatar.webp';
        if (path.startsWith('http')) return path;

        const {
            data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(path);

        return publicUrl;
    };
    // <img
    //     alt="avatar"
    //     src={getImageUrl(user?.avatar || '')}
    //     className={classNames(`rounded-full mr-1`, imgClassName)}
    // />
    return (
        <>
            <Typography
                className="text-xs text-gray-500 flex flex-row items-center"
                startDecorator={
                    // <Avatar
                    //     alt="avatar"
                    //     src={getImageUrl(user?.avatar || '')}
                    //     sx={{
                    //         width: 18,
                    //         height: 18,
                    //         ...imgClassName
                    //     }}
                    // />
                    <img
                        alt="avatar"
                        src={getImageUrl(user?.avatar || '')}
                        className={classNames(`rounded-full mr-1`, imgClassName)}
                    />
                }
                sx={{
                    color: '#333',
                    fontSize: 12,
                    ...textClassName
                }}
            >
                {user?.name || '游客'}
            </Typography>
        </>
    );
}
