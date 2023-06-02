import PropTypes from 'prop-types';

const Modal = ({children}) => {
  return (
    <div className="fixed inset-0 items-center justify-center hidden w-full h-full bg-transparent peer-checked:flex">
        <div className="absolute inset-0 w-full h-full opacity-80 bg-slate-400" />
        <div className="z-50 flex flex-col items-center justify-center h-auto p-4 space-x-4 space-y-5 bg-white rounded-lg">
            {children}
        </div>
    </div>
  );
}

const ModalButton = ({title,id}) => {
    return (
        <>
            <label htmlFor={id} className="inline-block px-3 py-2 mt-2 font-medium text-white bg-teal-900 rounded cursor-pointer text-center hover:bg-teal-800">{title}</label>
            <input id={id} type="checkbox" className="hidden peer"  />
        </>
    );
}


ModalButton.propTypes = {
    id:  PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

Modal.propTypes = {
    children: PropTypes.element,
}

Modal.Button = ModalButton;
export default Modal