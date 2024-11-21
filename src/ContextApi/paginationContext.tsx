'use client'
import { createContext, useContext, useState } from "react";

interface PaginationState {
    pageIndex: number;
    pageSize: number;
  }

const PaginationContext = createContext<{
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    paginatedData
  } | null>(null);

export function usePagination() {
    const context = useContext(PaginationContext);
    if (!context) {
      throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
  }

export const PaginationProvider : React.FC<{ children: React.ReactNode, data }>=({children, data}) => {
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  
    const paginatedData = data.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
  
    const contextValue = {
      pagination,
      setPagination,
      paginatedData,
    };

    return (
      <PaginationContext.Provider value={contextValue}>
        {children}
      </PaginationContext.Provider>
    );
  };