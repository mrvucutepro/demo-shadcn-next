/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChartComponent } from '@/components/custom-component/custom-chart';
import { TaskTable } from '@/components/custom-component/task-table';
import { addUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

const UserPage = async () => {
    const res = await fetch("/mock-data.json'");
    const data = await res.json();
    const dispatch = useDispatch();
    return (
        <div>
            <TaskTable data={data} handleAddNewUser={handleAddNewUser} />
            <br />
            <ChartComponent />
    
        </div>
    );
};

export default UserPage;
