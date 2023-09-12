import {
    BotonSuscribir,
    CloseButton,
    ContenedorModal,
    CotenedorTexto,
    DescripcionModal,
    ImagenModal,
    TarjetaModal,
    TituloModal,
} from "../../styled";
import { SuscribeImage, CloseButton as Close } from "../../../../assets";

interface IModalSubscripcionProps {
    onClose: () => void;
    onSubscription: () => void;
}

const ModalSubscripcion = ({
    onClose,
    onSubscription,
}: IModalSubscripcionProps) => {
    return (
        <ContenedorModal data-testid="modal">
            <TarjetaModal>
                <CloseButton onClick={onClose}>
                    <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                    <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                    <DescripcionModal>
                        Suscríbete a nuestro newsletter y recibe noticias de nuestros
                        personajes favoritos.
                    </DescripcionModal>
                    <BotonSuscribir onClick={onSubscription}>Suscríbete</BotonSuscribir>
                </CotenedorTexto>
            </TarjetaModal>
        </ContenedorModal>
    );
};

export default ModalSubscripcion;