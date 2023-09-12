import { INoticiasNormalizadas, INoticiasAPI } from "./contracts";
import { calcMinutes, capWords } from "./utils";

export const toFront = (noticias: INoticiasAPI[]): INoticiasNormalizadas[] => {
    return noticias.map((n) => ({
        id: n.id,
        titulo: capWords(n.titulo),
        descripcion: n.descripcion,
        fecha: `Hace ${calcMinutes(n.fecha)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
    }));
};
