'use client';
import React from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Option, Select } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { iconButtonClasses } from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import TableFilter from './filter';

interface ViewProps {
    data: any[];
    columns: ColumnDef<any>[];
    showFilter?: boolean;
    showPagination?: boolean;
}

function ReactTableView({ data, columns, showFilter, showPagination }: ViewProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination
        }
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    });

    return (
        <div className="p-2 w-full">
            <Table
                aria-labelledby="tableTitle"
                // stickyHeader
                hoverRow
                sx={{
                    '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                    '--Table-headerUnderlineThickness': '1px',
                    '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                    '--TableCell-paddingY': '4px',
                    '--TableCell-paddingX': '8px',
                    border: 1,
                    borderColor: '#ddd'
                }}
            >
                <thead className="w-full">
                    {table.getHeaderGroups().map((headerGroup, index) => (
                        <tr key={index}>
                            {headerGroup.headers.map((header, index) => {
                                return (
                                    <th key={index} colSpan={header.colSpan} className="py-2">
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler()
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽'
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                        {header.column.getCanFilter() && showFilter ? (
                                            <div>
                                                <TableFilter column={header.column} />
                                            </div>
                                        ) : null}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => {
                        return (
                            <tr key={index} className="bg-white">
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id} className="   px-2">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className="h-2" />
            <Box
                className="Pagination-laptopUp flex-wrap"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: `${showPagination ? 'flex' : 'none'}`
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>

                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <label>Next</label>
                </Button>

                <Box sx={{ flex: 1 }} />

                <span className="flex items-center text-sm gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <Select
                    value={table.getState().pagination.pageSize}
                    onChange={(event: any, newValue: any) => {
                        table.setPageSize(Number(newValue));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <Option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </Option>
                    ))}
                </Select>
            </Box>

            <div className="flex items-center gap-2 hidden">
                <button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1 hidden">
                    | Go to page:
                    <input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default ReactTableView;
