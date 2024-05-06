export const paginate = (query, n) => {
    let {size, page} = query;
    if (!page)
        page = 1
    if (!size)
        size = 10
    page = parseInt(page)
    size = parseInt(size)
    const start = (page-1) * size;
    const end = page*size;
    const result = {};
    if (start > 1)
        result.prev = page-1
    if (end < n)
        result.next = page+1
    return [result, start, size]
}