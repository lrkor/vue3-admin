export default interface PageModel<T> {
    data: T;
    pagination: {
        page: number;
        page_size: number;
        total_count: number;
    };
}
