let pagination = {
    pageIndex: 0,
    limit: 10,
};

pagination = {
    pageIndex: pagination.pageIndex + 1,
    limit: 10,
};

pagination = { ...pagination, pageIndex: pagination.pageIndex + 1 };
