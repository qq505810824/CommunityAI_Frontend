'use client';

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Dropdowns from './components/Dropdowns';

const TableView = () => {
    const router = useRouter();
    const [rows] = React.useState([]);

    return (
        <>
            <React.Fragment>
                <Sheet
                    className="OrderTableContainer"
                    variant="outlined"
                    sx={{
                        display: { xs: 'none', sm: 'initial' },
                        width: '100%',
                        borderRadius: 'sm',
                        flexShrink: 1,
                        overflow: 'auto',
                        minHeight: 0
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        stickyHeader
                        hoverRow
                        sx={{
                            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                            '--Table-headerUnderlineThickness': '1px',
                            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                            '--TableCell-paddingY': '4px',
                            '--TableCell-paddingX': '8px'
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: 120, padding: '12px 6px' }}>Table Name</th>
                                <th style={{ width: 140, padding: '12px 6px' }}>updated_at</th>
                                {/* <th style={{ width: 140, padding: '12px 6px' }}>數據數量</th> */}
                                {/* <th style={{ width: 240, padding: '12px 6px' }}>擁有者</th> */}
                                <th style={{ width: 140, padding: '12px 6px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((row: any) => (
                                <tr key={row.id}>
                                    <td>
                                        <Link
                                            href={`/home/${row?.id}/info`}
                                            className=" text-blue-500"
                                        >
                                            {row.fields.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Typography level="body-xs">
                                            {moment(row.fields.updated_at).format(
                                                'YYYY-MM-DD HH:mm'
                                            )}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Dropdowns
                                                share={() => {}}
                                                edit={() => {}}
                                                remove={() => {}}
                                            />
                                        </Box>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
                {/* <PaginationMain /> */}
            </React.Fragment>
        </>
    );
};

export default TableView;
