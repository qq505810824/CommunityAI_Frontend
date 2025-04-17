import { Sheet } from '@mui/joy';
import Table from '@mui/joy/Table';
import React from 'react';

interface ViewProps {
    children: React.ReactNode;
    className?: string;
}

function TableSheet(props: ViewProps) {
    return (
        <Sheet
            className={`OrderTableContainer border-none ${props.className}`}
            sx={{
                display: 'initial',
                width: '100%',
                borderRadius: 'sm',
                flexShrink: 1,
                overflow: 'auto',
                minHeight: 0,
                backgroundColor: 'white' // 明确设置背景颜色
            }}

            // sx={(theme) => ({
            //     '--TableCell-height': '40px',
            //     // the number is the amount of the header rows.
            //     '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
            //     // height: '200',
            //     overflow: 'scroll',
            //     background: `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            //                             linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            //                             radial-gradient(
            //                             farthest-side at 50% 0,
            //                             rgba(0, 0, 0, 0.12),
            //                             rgba(0, 0, 0, 0)
            //                             ),
            //                             radial-gradient(
            //                                 farthest-side at 50% 100%,
            //                                 rgba(0, 0, 0, 0.12),
            //                                 rgba(0, 0, 0, 0)
            //                             )
            //                             0 100%`,
            //     backgroundSize: '100% 40px, 100% 40px, 100% 14px, 100% 14px',
            //     backgroundRepeat: 'no-repeat',
            //     backgroundAttachment: 'local, local, scroll, scroll',
            //     backgroundPosition:
            //         '0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%',
            //     backgroundColor: 'background.surface',
            // })}
        >
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                borderAxis="both"
                // hoverRow
                sx={{
                    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                    // '--Table-headerUnderlineThickness': '1px',
                    // '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                    '--TableCell-paddingY': '4px',
                    '--TableCell-paddingX': '8px',
                    '& tbody tr': {
                        borderWidth: '0'
                    },
                    '& tbody tr.selected-row': {
                        outline: '1px solid var(--joy-palette-primary-500)',
                        outlineOffset: '-1px'
                    },
                    backgroundColor: 'white' // 明确设置背景颜色
                }}
            >
                {props.children}
            </Table>
        </Sheet>
    );
}
export default TableSheet;
