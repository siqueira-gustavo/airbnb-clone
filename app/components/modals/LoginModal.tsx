'use client'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Logged in successfully.')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) toast.error(callback.error)
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
        title='Welcome back'
        subtitle='Login to your account!'
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
        onClick={() => {}}
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
            onClick={loginModal.onClose}
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
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
