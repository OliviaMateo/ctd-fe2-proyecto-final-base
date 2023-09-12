import { useCallback, useEffect, useState } from "react";
import { obtenerNoticias } from "../fakeRest";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "../styled";
import { INoticiasNormalizadas } from "../hooks/contracts";
import { toFront } from "../hooks/normalize";
import ModalSubscripcion from "./modal/ModalSub";
import ModalPremium from "./modal/ModalPremium";
import CardNoticias from "./CardNoticias";

// Implemente el principio SOLID de responsabilidad única, de esta manera se puede liberar al componente "Noticias" de ciertas tareas que no le corresponden.
// En un primer momento, separe las funciones encargadas de normalizar las noticias recibidas: capitalizeWords, calculateMinutes y noticias.mapper.
// Además, separe en tres componentes distintos que pueden reutilizarse y hacen que el código sea más legible: modalPremium, modalSubscripcion y cardNoticias.
// También movi la función obtenerInformacion fuera del efecto y la agregue como dependencia.
// De esta manera, me asegure de que la función se cree solo una vez y no en cada renderizado.

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  const obtenerInformacion = useCallback(async () => {
    const respuesta = await obtenerNoticias();
    const noticiasNormalizadas = toFront(respuesta);
    setNoticias(noticiasNormalizadas);
  }, []);

  useEffect(() => {
    obtenerInformacion();
  }, [obtenerInformacion]);

  const getModal = useCallback(() => {
    if (!modal) {
      return undefined;
    }
    if (modal?.esPremium) {
      return (
        <ModalSubscripcion
          onClose={() => setModal(null)}
          onSubscription={() =>
            setTimeout(() => {
              alert("Suscripto!");
              setModal(null);
            }, 1000)
          }
        />
      );
    }
    return <ModalPremium {...modal} onClose={() => setModal(null)} />;
  }, [modal]);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        <CardNoticias noticias={noticias} handleVerMasClick={setModal} />
        <>{getModal()}</>
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;

