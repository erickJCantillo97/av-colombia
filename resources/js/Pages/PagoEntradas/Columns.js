

const columns = [
    {
        header: "Adultos Nacionales",
        field: "title",
        filter: true,
    },
    {
        header: "Adultos Extranjeros",
        field: "total_cost",
        type: "currency",
    },
    {
        header: "Niños Extranjeros",
        field: "type",
        filter: true,
    },
    {
        header: "Niños Nacionales",
        field: "city",
        filter: true,
    },
    {
        header: 'tipo_movimiento',
        field: 'tipo_movimiento',
        filter: true,
    }
];
export default columns;