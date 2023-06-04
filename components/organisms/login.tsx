'use client';

import { useLoginModal, useRegisterModal } from '@/lib';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Button, Heading, Input } from '../atoms';
import { Modal } from '../molecules';

const LoginForm = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((response) => {
      setIsLoading(false);

      if (response?.ok) {
        toast.success('Login Successfull');
        router.refresh();
        loginModal.close();
      }

      if (response?.error) {
        toast.error(response.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.close();
    registerModal.open();
  }, [loginModal, registerModal]);

  const body = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to your account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <footer className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <p>
          <span>First time using Airbnb? </span>
          <span
            onClick={onToggle}
            className='
              cursor-pointer
              text-neutral-800
              hover:underline
            '
          >
            Create an account
          </span>
        </p>
      </div>
    </footer>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.show}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.close}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};

export { LoginForm };
