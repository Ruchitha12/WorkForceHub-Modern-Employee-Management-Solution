import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GrClose } from 'react-icons/gr'
import { useModalContext } from '../../context/ModalContext'
import { AddDepartmentForm } from '../Forms/addDepartmentForm'
import { AddEmployeeForm } from '../Forms/addEmployeeForm'
import { EditEmployeeForm } from '../Forms/editEmployeeForm'
import { DeleteEmployeeForm } from '../Forms/deleteEmployeeForm'
import { AddBankDetailsForm } from '../Forms/addBankDetailsForm'
import { ViewBankDetailsForm } from '../Forms/viewBankDetailsForm'
import { AddTimestampForm } from '../Forms/addTimeStampForm'
import { AddPayrollForm } from '../Forms/addPayrollForm'
import { EditPayrollForm } from '../Forms/editPayrollForm'

export const Modal = () => {
  const { isOpen, closeModal, form, setLoading } = useModalContext()
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className={`${
            isOpen
              ? 'fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] cursor-pointer inset-0 z-40 overflow-y-auto'
              : 'fixed inset-0 z-10 overflow-y-auto'
          } `}
          onClose={() => {
            setLoading(false)
            closeModal()
          }}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            <span
              className='inline-block bg-white h-screen z-10 align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={`${
                  form == 'editEmployeeForm' ||
                  form == 'addPayrollForm' ||
                  form == 'editPayrollForm' ||
                  form == 'addEmployeeForm'
                    ? 'max-w-3xl'
                    : 'max-w-xl'
                } w-full relative inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md`}
              >
                <button
                  type='button'
                  className='absolute right-5 inline-flex justify-center p-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none'
                  onClick={() => {
                    setLoading(false)
                    closeModal()
                  }}
                >
                  <GrClose size={15} />
                </button>
                {form == 'addDepartmentForm' && <AddDepartmentForm />}
                {form == 'addEmployeeForm' && <AddEmployeeForm />}
                {form == 'editEmployeeForm' && <EditEmployeeForm />}
                {form == 'deleteEmployeeForm' && <DeleteEmployeeForm />}
                {form == 'addBankDetailsForm' && <AddBankDetailsForm />}
                {form == 'viewBankDetailsForm' && <ViewBankDetailsForm />}
                {form == 'addTimestampForm' && <AddTimestampForm />}
                {form == 'addPayrollForm' && <AddPayrollForm />}
                {form == 'editPayrollForm' && <EditPayrollForm />}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}
