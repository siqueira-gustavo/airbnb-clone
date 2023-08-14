'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('User registered successfully')
        registerModal.onClose()
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div
      className='
        flex
        flex-col
        gap-4
      '
    >
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account!'
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required={isLoading}
      />
      <Input
        id='email'
        type='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required={isLoading}
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div
      className='
        flex
        flex-col
        gap-4
        mt-3
      '
    >
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label='Continue with GitHub'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
          mt-4
          font-light
          text-center
          text-neutral-500
        '
      >
        <div
          className='
            gap-2
            flex
            flex-row
            item-center
            justify-center
          '
        >
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className='
              cursor-pointer
              hover:underline
              text-neutral-500
            '
          >
            Login
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
