import Modal from 'react-modal';
import { addHours } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useEffect, useMemo, useState } from 'react';
import { differenceInSeconds } from 'date-fns/esm';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks';
import { RiSave3Fill } from 'react-icons/ri';
registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        'Fechas invalidas',
        'Por favor ingrese fechas validas',
        'error'
      );
    }
    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onDateChanged = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1 className="text-2xl font-bold p-2"> Evento </h1>
      <hr />
      <form className="mt-2 p-2" onSubmit={onSubmit}>
        <div className="form-group my-1 flex flex-col ">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="bg-gray-50 border text-gray-900 text-md  focus:ring-blue-500 focus:border-blue-500 rounded-lg  block w-full p-2.5"
            onChange={event => onDateChanged(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-4 flex flex-col ">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="bg-gray-50 border text-gray-900 text-md  focus:ring-blue-500 focus:border-blue-500 rounded-lg  block w-full p-2.5"
            onChange={event => onDateChanged(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mt-4 flex flex-col ">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`bg-gray-50 border text-gray-900 text-md  focus:ring-blue-500 focus:border-blue-500 rounded-lg  block w-full p-2.5 ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group my-3 flex flex-col ">
          <textarea
            type="text"
            className="bg-gray-50 border text-gray-900 text-md border-blue-500 rounded-lg block w-full p-2.5"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 flex items-center rounded-md"
        >
          <RiSave3Fill size="25px" />
          <span> &nbsp; Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
