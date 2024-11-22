'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export function DialogComponent({
    open,
    onClose,
    onSave,
    user = null,
    isEdit = false,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (user: {
        id?: number;
        name: string;
        email: string;
        avatar: string;
        address: string;
        status?: string;
    }) => void;
    user?: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        address: string;
        status: string;
    } | null;
    isEdit?: boolean;
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        avatar: '',
        status: 'Active',
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleSave = () => {
        if (
            formData.name ||
            formData.email ||
            formData.avatar ||
            formData.address
        ) {
            onSave(formData);
            onClose();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">{isEdit ? 'Edit User' : 'Add New'}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit User' : 'Add New'}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatar" className="text-right">
                            Avatar
                        </Label>
                        <Input
                            id="avatar"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFormData((prevUser) => ({
                                        ...prevUser,
                                        avatar: file.name,
                                    }));
                                }
                            }}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    {isEdit && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Input
                                id="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        className="w_full"
                        type="button"
                        onClick={handleSave}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
