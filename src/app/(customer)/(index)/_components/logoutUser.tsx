"use client"
import { Button } from '@/components/ui/button'
import { ActionResult } from '@/types'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useFormState } from 'react-dom'
import { Logout } from '../lib/action'
import { useRouter } from 'next/navigation'



export default function LogoutUser() {
  const handleLogout = async () => {
    try {
    await Logout()
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <Button className="flex items-center gap-2" onClick={handleLogout}>
        <LogOut width={20} height={20} /> Logout
    </Button>
  );
}