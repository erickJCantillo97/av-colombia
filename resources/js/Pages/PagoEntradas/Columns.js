

const columns = [
    {
        header: "Cantidad de pasajeros",
        field: "title",
        filter: true,
    },
    {
        header: "Costo Total",
        field: "total_cost",
        type: "currency",
    },
    {
        header: "Servicio",
        field: "type",
        filter: true,
    },
    {
        header: "Proveedor",
        field: "city",
        filter: true,
    },
    
];

export default columns;