'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { incomeType, categories } from './data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { CalendarDatePicker } from '@/components/calendar-date-picker';
import { useState } from 'react';
import { DataTableViewOptions } from './data-table-view-options';
import { TrashIcon } from 'lucide-react';
import { DialogDemo, IUser } from './dialog-component';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    // const [users, setUsers] = useState<IUser[]>([]);
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    });

    const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
        setDateRange({ from, to });
        table.getColumn('date')?.setFilterValue([from, to]);
    };

    const handleSelect = (user: IUser) => {
        setSelectedUser(user);
    };
    
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    // const handleSeletedUser = () => {
        // const rowModel = table.getRowModel();
        // const selectedUser = rowModel.rows.map(row => row.original).id; 
    // }
        

    // const rowModel = table.getRowModel();
    // const selectedRow = rowModel.rows.find((row) => row.getIsSelected());
    // const selectedUser = selectedRow.original;
    // console.log(selectedUser);
    

    // const handleAddUser = (newUser: IUser) => {
    //     const newId = users.length ? users[users.length - 1].id! + 1 : 1;
    //     const userWithId = { ...newUser, id: newId };
    //     setUsers([...users, userWithId]);
    //     handleCloseAddDialog();
    //     alert('User added successfully!');
    // };

    // const handleEditUser = (editedUser: IUser) => {
    //     setUsers((prevUsers) =>
    //         prevUsers.map((user) =>
    //             user.id === editedUser.id ? editedUser : user
    //         )
    //     );
    //     handleCloseEditDialog();
    //     alert('User updated successfully!');
    // };

    return (
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <div>
                <Button onClick={handleOpenDialog}>Add New Now</Button>
                <DialogDemo
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    // onSave={handleAddUser}
                    isEdit={false}
                />
                <DialogDemo
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    // onSave={handleEditUser} 
                    // user={selectedUser} 
                    isEdit={true}
                />
                </div>
                <Input
                    placeholder="Filter labels..."
                    value={
                        (table.getColumn('id')?.getFilterValue() as string) ??
                        ''
                    }
                    onChange={(event) => {
                        table
                            .getColumn('id')
                            ?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('name') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('name')}
                        title="Category"
                        options={categories}
                    />
                )}
                {table.getColumn('avatar') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('avatar')}
                        title="Avatar"
                        options={incomeType}
                    />
                )}
                {table.getColumn('email') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('email')}
                        title="Email"
                        options={incomeType}
                    />
                )}
                {table.getColumn('address') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('address')}
                        title="Address"
                        options={incomeType}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
                <CalendarDatePicker
                    date={dateRange}
                    onDateSelect={handleDateSelect}
                    className="h-9 w-[250px]"
                    variant="outline"
                />
            </div>

            <div className="flex items-center gap-2">
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete (
                        {table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                ) : null}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
