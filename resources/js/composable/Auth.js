import { usePage } from '@inertiajs/vue3';

const permissions = () => {
    try {
        return usePage().props.auth.user.permissions || [];
    } catch (error) {
        console.error("Error obteniendo permisos:", error);
        return []; // Devolver un array vacío en caso de error
    }
};

export function usePermissions() {


    const hasPermissionTo = (name) => {
        const userPermissions = permissions();

        if (Array.isArray(name)) {
            return name.some(permiso => userPermissions.includes(permiso));
        }
        return userPermissions.includes(name);
    };

    return { hasPermissionTo };
}