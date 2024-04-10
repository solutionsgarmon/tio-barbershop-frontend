import { getLabels } from "./get";

export async function getEtiqueta(IdEtiquetaOK) {
try {
      const labels = await getLabels();
      const etiqueta = labels.find(
        (label) => label.IdEtiquetaOK === IdEtiquetaOK
      );
      return etiqueta.valores
    } catch (e) {
      console.error("Error al obtener Etiquetas:", e);
    }
}