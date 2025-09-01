import { useCommonUtilities } from "@/composable/useCommonUtilities";
import { router } from "@inertiajs/vue3";
import { getErrorMessage, getSuccessMessage } from "@/composable/Toats";

export default class GeneralService {

    url = null;

    assignMatchingKeys(source, target) {
      Object.keys(source).forEach((key) => {
        if (key in target) {
          target[key] = source[key];
        }
      });
    }

    submit(data, id = null) {
        if (id) {
            return router.put(route(this.url + '.update', id), data, {
                onSuccess: () => {
                    getSuccessMessage("Actualizado Exitosamente");
                },
                onError: (error) => {
                    getErrorMessage(error.response.data.message || "Error al actualizar");
                }
            });
        }
        return router.post(route(this.url + '.store'), data, {
            onSuccess: () => {
                getSuccessMessage("Guardado Exitosamente");
            },
            onError: (error) => {
                getErrorMessage(error.response.data.message || "Error al guardar");
            }
        });
    }

    delete(id) {
        return router.delete(route(this.url + '.destroy', id), {
            onSuccess: () => {
                getSuccessMessage("Eliminado Exitosamente");
            },
            onError: (error) => {
                getErrorMessage(error.response.data.message || "Error al eliminar");
            }
        });
    }
}
