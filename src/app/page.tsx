'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { motion } from 'framer-motion'
import DefaultLayout from 'src/layouts/default/Layout'

export default function Page() {
  const parentVariants = {
    onscreen: {
      transition: { staggerChildren: 0.2 },
    },
    offscreen: {
      transition: { staggerChildren: 0.2, staggerDirection: -1 },
    },
  }
  const variants = {
    onscreen: {
      y: 0,
      opacity: [0, 1],
      transition: {
        duration: 0.4,
      },
    },
    offscreen: {
      y: 25,
      opacity: 0,
    },
  }

  return (
    <DefaultLayout>
      <div>111</div>
    </DefaultLayout>
  )
}
