/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ChartComponent } from '@/components/custom-component/custom-chart';
import { DialogComponent } from '@/components/custom-component/custom-dialog';
import { TaskTable } from '@/components/custom-component/task-table';
import { PaginationProvider } from '@/ContextApi/paginationContext';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
    address: string;
    status: string;
}

const UserPage = () => {
    const [data, setData] = useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const handleAddUser = (newUser: { name: string; email: string, avatar:string ,address:string }) => {
        const lastUserId = data[data.length - 1].id;
        const newUserWithId = {
            ...newUser,
            id: lastUserId + 1, 
            status: 'Active', 
        };
        setData((prevData) => [...prevData, newUserWithId]); 
        setIsDialogOpen(false); 
        console.log(newUserWithId);
    };
    
    const handleDeleteUser = (userId: number) => {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
    }
    
    return (
        <div>
            {!isDialogOpen && <DialogComponent onSave={handleAddUser}/>}
            <PaginationProvider data={data}>
                <TaskTable data={data} 
                // onDeleteUser={onDeleteUser}
                />
            </PaginationProvider>
            <ChartComponent />
        </div>
    );
};

export default UserPage;
