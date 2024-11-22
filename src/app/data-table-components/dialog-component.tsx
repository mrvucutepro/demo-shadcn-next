import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export interface IUser {
    id: number;
    name: string;
    email?: string;
    avatar?: string;
    address?: string;
    status?: string;
}

export function DialogDemo({
    open,
    onClose,
    onSave,
    user = { name: '', email: '', avatar: '', address: '', status: 'Active' },
    isEdit = false,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (user: IUser) => void;
    user:IUser;
}) {
    const [formData, setFormData] = useState({
        
        name: '',
        email: '',
        avatar: '', 
        address: '',
        status: 'Active' 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSave = () => {
        if (
            formData.name ||
            formData.email ||
            formData.avatar ||
            formData.address
        )
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {isEdit ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-lg text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            className="col-span-3"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-lg text-left">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={formData.email}
                            className="col-span-3"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-lg text-left">
                            Avatar
                        </Label>
                        <Input
                            type="file"
                            id="avatar"
                            className="col-span-3"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFormData((prevUser) => ({
                                        ...prevUser,
                                        avatar: file.name,
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-lg text-left">
                            Address
                        </Label>
                        <Input
                            id="address"
                            value={formData.address}
                            className="col-span-3"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSave}
                        type="button"
                        className="w-full text-lg"
                    >
                        {isEdit ? 'Save Changes' : 'Add User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
