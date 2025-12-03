import AuthGuard from '@/components/Admin/AuthGuard'
import CreateContent from '@/components/Admin/CreateContent'
import React from 'react'

function page() {
  return (
    <AuthGuard><CreateContent/></AuthGuard>

  )
}

export default page