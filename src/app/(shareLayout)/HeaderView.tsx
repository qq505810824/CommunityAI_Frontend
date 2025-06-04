import { Typography } from '@mui/joy';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';

export default function HeaderView() {


    return (
        <>
            <Sheet
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    width: '100vw',
                    height: 'var(--Header-height)',
                    zIndex: 9995,
                    p: 2,
                    gap: 1,
                    borderBottom: '1px solid',
                    borderColor: 'background.level1',
                    boxShadow: 'sm'
                }}
            >
                <GlobalStyles
                    styles={(theme) => ({
                        ':root': {
                            '--Header-height': '52px'
                        }
                    })}
                />
                <div className="w-full sm:max-w-7xl flex justify-between ">
                    <div
                        className="flex flex-row items-center gap-2 cursor-pointer"
                        onClick={() => {
                            // router.push('/');
                        }}
                    >
                        {/* <img alt="" src="/logo/logo_p.png" className="w-12 h-8" /> */}
                        <Typography level={'h4'}>Career Calendar</Typography>
                    </div>
                </div>
            </Sheet>
        </>
    );
}
