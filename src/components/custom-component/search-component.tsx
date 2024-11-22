import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export function SearchComponent({ filtering, setFiltering }) {
    return (
        <div className="relative flex items-center mb-4 w-1/6">
            <Search className="absolute left-3 h-5 w-5 text-gray-500" />
            <Input
                type="text"
                placeholder="Your Input"
                className="pl-10"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
        </div>
    );
}
