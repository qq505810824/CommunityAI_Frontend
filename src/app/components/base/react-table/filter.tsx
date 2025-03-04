import { Column } from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';

interface ViewProps {
    column: Column<any, unknown>;
}

export default function TableFilter({ column }: ViewProps) {
    const columnFilterValue = column.getFilterValue();

    return (
        <DebouncedInput
            className="w-full border shadow rounded p-1"
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
        />
    );
}
