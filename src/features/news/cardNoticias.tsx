import { INoticiasNormalizadas } from "./contracts";
import {
    TarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    BotonLectura,
} from "./styled";

export interface ICardNoticias {
    noticias: INoticiasNormalizadas[];
    handleVerMasClick: (n: INoticiasNormalizadas) => void;
}

const CardNoticias = ({ noticias, handleVerMasClick }: ICardNoticias) => {
    return (
        <>
            {noticias.map((n) => (
                <TarjetaNoticia key={n.id}>
                    <ImagenTarjetaNoticia src={n.imagen} />
                    <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
                    <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
                    <DescripcionTarjetaNoticia>
                        {n.descripcionCorta}
                    </DescripcionTarjetaNoticia>
                    <BotonLectura onClick={() => handleVerMasClick(n)}>Ver más</BotonLectura>
                </TarjetaNoticia>
            ))}
        </>
    );
};

export default CardNoticias;