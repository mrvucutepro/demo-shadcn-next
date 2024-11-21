'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { usePagination } from '@/ContextApi/paginationContext';

export function TaskTablePagination({ table }) {
    const { setPagination } = usePagination();
    return (
        <div className="flex w-1/4 items-center justify-around mt-4">
            <div>
                <Button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="font-bold text-lg hover:text-gray-500"
                >
                    {'<<'}
                </Button>
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="font-bold text-lg hover:text-gray-500"
                >
                    {'<'}
                </Button>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="font-bold text-lg hover:text-gray-500"
                >
                    {'>'}
                </Button>
                <Button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    className="font-bold text-lg hover:text-gray-500"
                >
                    {'>>'}
                </Button>
            </div>

            <div>
                Page{' '}
                <strong className="text-red-400">
                    {table.getState().pagination.pageIndex + 1}
                </strong>{' '}
                of{' '}
                <strong className="text-red-600">{table.getPageCount()}</strong>
            </div>
            <div>
                <Select
                    value={String(table.getState().pagination.pageSize)}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={String(pageSize)}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
