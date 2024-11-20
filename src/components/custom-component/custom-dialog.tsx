'use client';

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

export function DialogComponent({isDialogOpen,closeDialog,
    handleAddNewUser
}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [address, setAddress] = useState('');

    const handleSubmit = () => {
        const newUser = {
            name,
            email,
            address,
            avatar,
        };
        handleAddNewUser(newUser);
        closeDialog();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setAvatar(file);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                {/* <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatar" className="text-left">
                            Avatar
                        </Label>
                        <Input
                            id="avatar"
                            className="col-span-3"
                            type="file"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-left">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-left">
                            Address
                        </Label>
                        <Input
                            id="address"
                            className="col-span-3"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                </div> */}
                <DialogFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Add New
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
