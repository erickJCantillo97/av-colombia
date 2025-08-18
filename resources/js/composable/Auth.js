import { usePage } from '@inertiajs/vue3';
import { use } from 'marked';

const permissions = () => {
    try {
        return usePage().props.auth.user.permissions || [];
    } catch (error) {
        console.error("Error obteniendo permisos:", error);
        return []; // Devolver un array vacío en caso de error
    }
};

const rol = () => {
    try {
        return usePage().props.auth.user.rol || '';
    } catch (error) {
        console.error("Error obteniendo roles:", error);
        return '';
    }
}

export function usePermissions() {


    const hasPermissionTo = (name) => {
        const userPermissions = permissions();

        if (Array.isArray(name)) {
            return name.some(permiso => userPermissions.includes(permiso));
        }
        return userPermissions.includes(name);
    };

    const hasRole = (name) => {
        const userRol = rol();

        if (Array.isArray(name)) {
            return name.includes(userRol);
        }
        return userRol == name;
    }

    return { hasPermissionTo, hasRole };
}