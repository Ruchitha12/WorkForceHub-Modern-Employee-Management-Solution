import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalContextProvider ({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [form, setForm] = useState('')
  const [editId, setEditId] = useState('')
  const [formData, setFormData] = useState('')
  const [loading, setLoading] = useState(false)

  function closeModal () {
    setIsOpen(false)
  }
  function openModal () {
    setIsOpen(true)
  }
  const state = {
    isOpen,
    setIsOpen,
    form,
    setForm,
    closeModal,
    openModal,
    isEdit,
    setIsEdit,
    loading,
    setLoading,
    editId,
    setEditId,
    formData,
    setFormData
  }
  return <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
}
export function useModalContext () {
  return useContext(ModalContext)
}
