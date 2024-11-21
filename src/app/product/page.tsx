/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ChartComponent } from '@/components/custom-component/custom-chart';
import { DialogComponent } from '@/components/custom-component/custom-dialog';
import { ConfirmDialog } from '@/components/custom-component/dialog-confirm';
import { DropdownMenuButton } from '@/components/custom-component/dropdown-button';
import { TaskTable } from '@/components/custom-component/task-table';
import {
    PaginationProvider,
    usePagination,
} from '@/ContextApi/paginationContext';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    address: string;
}

const UserPage = () => {
    const [data, setData] = useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/mock-data.json');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const jsonData = await res.json();
                setData(jsonData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const openConfirmDialog  = () => {
        setIsConfirmDialogOpen(false);
    };


    const handleAddUser = (newUser: {
        name: string;
        email: string;
        avatar: string;
        address: string;
    }) => {
        const lastUserId = data[data.length - 1].id;
        const newUserWithId = {
            ...newUser,
            id: lastUserId + 1,
        };
        setData((prevData) => [...prevData, newUserWithId]);
        setIsDialogOpen(false);
        alert('Add New User Successfully');
    };

    const columns = [
        {
            id: 'select',
            header: () => <input type="checkbox" />,
            enableSorting: true,
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={() => row.toggleSelected()}
                />
            ),
        },
        {
            accessorKey: 'id',
            header: () => 'ID',
            footer: (props) => props.column.getHeader(),
        },
        {
            accessorKey: 'name',
            header: () => 'Name',
            footer: (props) => props.column.id,
            enableSorting: true,
        },
        {
            accessorKey: 'avatar',
            header: () => 'Avatar',
            footer: (props) => props.column.id,
            cell: (info) => {
                return (
                    <span className="avatar-column">
                        <img
                            src={info.value}
                            alt="Avatar"
                            className="h-8 w-8 rounded-full"
                        />
                    </span>
                );
            },
        },
        {
            accessorKey: 'email',
            header: () => 'Email',
            footer: (props) => props.column.id,
            enableSorting: true,
        },
        {
            accessorKey: 'address',
            header: () => 'Address',
            footer: (props) => props.column.id,
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            footer: (props) => props.column.id,
            cell: (info) => {
                return (
                    <span
                        className={`${
                            info.getValue() === 'Active'
                                ? ' bg-green-500 text-gray-200 p-4 rounded-full'
                                : ' bg-red-500 text-black p-4 rounded-full'
                        }`}
                    >
                        {info.getValue()}
                    </span>
                );
            },
        },
        {
            id: 'action',
            header: () => 'Action',
            footer: (props) => props.column.id,
            cell: ({ row }) => {
                const userSeleted = row.original;
                return (
                    <DropdownMenuButton
                        onDelete={() => onDeleteUser(userSeleted.id)}
                        onEdit={() => onEditUser(userSeleted.id)}
                    />
                );
            },
        },
    ];

    const handleDeleteUser = (userId: number) => {

        setData((prevData) => prevData.filter((user) => user.id !== userId));
    };

    return (
        <div>
            {!isDialogOpen && <DialogComponent onSave={handleAddUser} />}
            {isDialogOpen && <ConfirmDialog isOpen={isConfirmDialogOpen} />}
            <PaginationProvider data={data}>
                <TaskTable
                    data={data}
                    onDeleteUser={handleDeleteUser}
                    columns={columns}
                />
            </PaginationProvider>
            <ChartComponent />
        </div>
    );
};

export default UserPage;
