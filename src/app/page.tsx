import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Expenses",
  description: "A Expense tracker build using Tanstack Table."
};

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/data-table-components",
    // "data.json"
    'mock-data.json'
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}


export interface IUser {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  address?: string;
  status?: string;
}

export default async function Page() {
  const data = await getData();
  const selectedData = 


  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={data} columns={columns} selectedData={undefined}/>
    </div>
  );
}
