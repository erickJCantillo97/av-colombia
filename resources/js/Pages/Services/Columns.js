const  columns = [
  {
    header: "Nombre",
    field: "title",
    filter: true,
  },
  {
    header: "Tarifa Comercial",
    field: "adult_tarifa",
    type: "currency",
    role: "vendedor",
  },
  {
    header: "Tarifa Neta AV",
    field: "adults_price",
    type: "currency",
  },
  {
    header: "Tipo de Servicio",
    field: "type",
    filter: true,
  },
  {
    header: "Ciudad",
    field: "city",
    filter: true,
  },
  {
    header: "Descripción",
    field: "description",
    type: "html",
    filter: true,
  },
];

export default columns;