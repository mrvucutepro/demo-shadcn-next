/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChartComponent } from '@/components/custom-component/custom-chart';
import { TaskTable } from '@/components/custom-component/task-table';

const UserPage = async () => {
    // const res = await fetch('/mock-data.json');
    const res = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await res.json();
    return (
        <div>
            {/* <TaskTable data={data} />
            <ChartComponent /> */}
            <h1>User Page</h1>
        </div>
    );
};

export default UserPage;
