import { AccountModel } from "@/models/Account";
import { Typography } from "@mui/joy";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface ViewProps {
    user?: AccountModel;
}

export default function UserView(props: ViewProps) {
    const {
        user
    } = props
    const supabase = createClientComponentClient();

    const getImageUrl = (path: string | null) => {
        if (!path) return '/default-avatar.png';
        if (path.startsWith('http')) return path;

        const {
            data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(path);

        return publicUrl;
    };

    return (
        <>
            <Typography
                className="text-xs text-gray-500 flex flex-row items-center"
                startDecorator={
                    <img
                        alt="avatar"
                        src={getImageUrl(user?.avatar || '')}
                        className=" rounded-full w-4 min-w-4 mr-1"
                    />
                }
                sx={{
                    color: '#000',
                    fontSize: 14
                }}
            >
                {user?.name}
            </Typography>
        </>
    )
}