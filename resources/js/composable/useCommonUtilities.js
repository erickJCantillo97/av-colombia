
const COP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});

export function truncatedString(string, maxLength) {
    return string.length > maxLength
        ? string.substring(0, maxLength) + "..."
        : string;
}
export function formatDate(date) {
    // console.log("formatDate", date);
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

export function currencyFormat(value) {
       return COP.format(value);
};
export function getTotalPaxByReservas(reservas) {
     return (reservas.reduce((total, reserva) => total + reserva.adults, 0));
}

export function getTotalBoysByReservas(reservas) {
    return (reservas.reduce((total, reserva) => total + reserva.boys, 0));
}

export function getTotalCostByReservas(reservas, proveedor) {
    
    return reservas.reduce((total, reserva) => {
        return total + getTotalCostByReservaAndProveedor(reserva, proveedor);
    }, 0);
}

export function getTotalCostByReservaAndProveedor(reserva, proveedor) {
    return reserva.proveedors.reduce((total, p) => {
        if (proveedor == p.proveedor_id) {
            return total + p.cost_total;
        }
        return total;
    }, 0);
}

/**
 * This function exports common utilities in JavaScript.
 */
export function useCommonUtilities() {

    const autoTruncateString = (string) => {
        const maxLength = 20;
        return string.length > maxLength
            ? string.substring(0, maxLength) + "..."
            : string;
    };

   
    const byteSizeFormatter = (bytes) => {
        const k = 1024;
        const dm = 1;
        const sizeType = ["B", "KB", "MB", "GB"];

        if (bytes === 0) {
            return `0 byte`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizeType[i]}`;
    };

    
    const calculateTimeDifference = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);

        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        const differenceMinutes = endTotalMinutes - startTotalMinutes;

        const differenceHours = differenceMinutes / 60;

        return `${differenceHours} H`;
    };

    const calculatePercentage = (data, total) => {
        let percentage = (data / total) * 100;

        if (percentage > 100) {
            percentage = 100;
        }

        if (percentage < 0) {
            percentage = 0;
        }

        return percentage.toFixed(0) > 100 ? 0 : percentage.toFixed(0);
    };


    const currencyFormat = (value) => {
       return COP.format(value);
    };

    function format24h(hora) {
        try {
            if (hora instanceof Date) {
                return hora.toLocaleString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                });
            } else if (hora.length > 6) {
                return new Date(hora).toLocaleString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                });
            } else {
                return new Date("1970-01-01T" + hora).toLocaleString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                });
            }
        } catch (error) {
            console.log(error);
            return "error";
        }
    }


    const format_ES_Date = (date) => {
        return new Date(date).toLocaleString("es-CO", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            weekday: "long",
        });
    };

   
 

    function formatDateTime24h(dateTime, options = {}) {
        const date = new Date(dateTime);
        // Obtener las opciones de formato personalizadas o usar valores predeterminados
        const {
            year = "numeric",
            month = "2-digit",
            day = "2-digit",
            hour = "2-digit",
            minute = "2-digit",
            second = "2-digit",
        } = options;
        // Formatear la fecha y hora en el formato deseado
        const formattedDate = date.toLocaleString("es-CO", {
            year,
            month,
            day,
            hour,
            minute,
            hour12: false
        });
        return formattedDate;
    }
 
    function formatTime(timeString) {
        if (typeof timeString !== "string") {
            console.error("Invalid timeString:", timeString);
            return "Invalid time";
        }
        //07:00.00000000
        // Verificar si la longitud del string es suficiente para recortar
        if (timeString.length >= 5) {
            return timeString.substring(0, 5);
        } else {
            console.error("Invalid timeString length:", timeString);
            return "Invalid time";
        }
    }

    function formatToPercentage(value) {
        const number = parseFloat(value);
        return `${(number * 100).toFixed(0)}%`;
    }

    // Este código es una función llamada `formatUTCOffset` que toma una `dateString` como entrada.
    // Crea un nuevo objeto `Date` usando `dateString`. Luego resta 5 horas de las horas de la fecha usando
    // `date.setHours(date.getHours() - 5)`. Finalmente, convierte la fecha de modificación a un formato de
    // cadena ISO usando `date.toISOString()` y devuelve la fecha formateada.
    const formatUTCOffset = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - 5);
        const formattedDate = date.toISOString();
        return formattedDate;
    };

    /**
     * The `getDays` function calculates the number of days between two given dates.
     * @param startDate - The `startDate` parameter in the `getDays` function represents the starting
     * date of a period for which you want to calculate the number of days. It should be provided in a
     * format that can be parsed by the `Date` constructor, such as a string in a valid date format or
     * a timestamp
     * @param endDate - The `endDate` parameter in the `getDays` function represents the date that
     * marks the end of a time period for which you want to calculate the number of days.
     * @returns The function `getDays` takes two date parameters, `startDate` and `endDate`, calculates
     * the difference in days between them, and returns the number of days as an integer. If the
     * calculated number of days is negative, it returns 0.
     */
    const getDays = (startDate, endDate) => {
        let date_1 = new Date(startDate);
        let date_2 = new Date(endDate);

        // Calcular la diferencia en milisegundos
        let diffMiliseconds = date_2 - date_1;

        // Calcular la diferencia en días
        let milisecondsPerDay = 24 * 60 * 60 * 1000; // Número de milisegundos en un día
        return Math.round(diffMiliseconds / milisecondsPerDay) < 0
            ? 0
            : Math.round(diffMiliseconds / milisecondsPerDay);
    };

    const renderIcon = (icon) => {
        if (typeof icon === "function") {
            return icon();
        }
        return `<i class="${icon}"></i>`;
    };

    function esMovil() {
        const dispositivos = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
        ];

        return dispositivos.some((dispositivo) => {
            return navigator.userAgent.match(dispositivo);
        });
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function createKey() {
        const min = Math.ceil(10000000);
        const max = Math.floor(99999999);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function deepCopy(obj) {
        if (obj === null || typeof obj !== "object") {
            return obj;
        }

        if (obj instanceof Date) {
            return new Date(obj);
        }

        if (Array.isArray(obj)) {
            return obj.map(deepCopy);
        }

        const copy = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }

        return copy;
    }

    /* The `return` statement in the `commonUtilities` function is creating an object that contains
    references to all the utility functions defined within the `commonUtilities` function. Each key
    in the object corresponds to a utility function, and the value associated with each key is the
    function itself. */
    return {
        autoTruncateString,
        byteSizeFormatter,
        calculateTimeDifference,
        calculatePercentage,
        createKey,
        currencyFormat,
        deepCopy,
        esMovil,
        format24h,
        format_ES_Date,
        formatDate,
        formatDateTime24h,
        formatTime,
        formatToPercentage,
        formatUTCOffset,
        getDays,
        getRandomInt,
        renderIcon,
    };
}
