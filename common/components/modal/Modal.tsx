'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ModalPortal from '@plextype/components/modal/ModalPortal'

const Modal = ({ state, close, children }) => {
  const [modalState, setModalState] = useState(false)
  useEffect(() => {
    setModalState(state)
  }, [state])

  // useEffect(() => {
  //   if (modalState === true) {
  //     let $body = document.querySelector('body')
  //     const overflow = $body?.style.overflow
  //     if ($body instanceof Element) $body?.style.overflow = 'hidden'
  //     return () => {
  //       $body.style.overflow = overflow
  //     }
  //   }
  // }, [modalState])
  useEffect(() => {
    if (modalState === true) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [modalState])

  const variants = {
    openModal: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.3 },
    },
    closeModal: {
      opacity: 0,
      y: '-10%',
      transition: { duration: 0.3 },
    },
  }
  const modalVariants = {
    openModal: {
      opacity: 1,
      y: '0%',
      x: '-50%',
      transition: { duration: 0.3 },
    },
    closeModal: {
      opacity: 0,
      y: '-10%',
      x: '-50%',
      transition: { duration: 0.3 },
    },
  }
  const exit = {
    opacity: 0,
    transition: { duration: 0.3 },
  }
  const handleCloseModal = () => {
    close(false)
  }
  return (
    <>
      <AnimatePresence>
        {state && (
          <>
            <ModalPortal>
              <motion.div
                initial={{ opacity: 0, y: '-10%', x: '-50%' }}
                animate={modalState === true ? 'openModal' : 'closeModal'}
                variants={modalVariants}
                exit={exit}
                className="bootom-1 z-101 dark:bg-dark-950/90 dark:border-dark-900/75 dark:border-t-dark-800 fixed left-1/2 top-20 mx-auto mb-2 w-full max-w-screen-md -translate-x-1/2 overflow-hidden rounded-xl bg-white/90 text-white backdrop-blur-lg lg:mb-10 dark:border"
              >
                <div className="" onClick={handleCloseModal}></div>
                <motion.div
                  initial={{ opacity: 0, y: '-10%' }}
                  animate={{
                    opacity: 1,
                    y: '0%',
                    transition: { duration: 0.5 },
                  }}
                  exit={{
                    opacity: 1,
                    y: '-10%',
                    transition: { duration: 0.5 },
                  }}
                  className="z-101"
                >
                  {children}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={modalState === true ? 'openModal' : 'closeModal'}
                variants={variants}
                exit={exit}
                onClick={handleCloseModal}
                className="dark: z-100 fixed inset-0 bg-gray-950/70 backdrop-blur dark:bg-transparent"
              ></motion.div>
            </ModalPortal>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Modal
