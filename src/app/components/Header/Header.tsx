'use client'

import { FC, memo, useCallback, useMemo, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/app/services-client'
import { Container, ModalAuth } from '@/app/components'
import { User } from '@/app/types'
import styles from './Header.module.css'
import HeaderMenu from './HeaderMenu'

const authApi = new AuthService()

const defaultMenuItems = [
  {
    label: 'Оборудование',
    href: '/equipment',
  },
  {
    label: 'Упражнения',
    href: '/exercises',
  },
  {
    label: 'Клуб',
    href: '/users',
  },
]

export type Header = {
  user?: User
}

const Header: FC<Header> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<'menu' | 'user' | boolean>(false)
  const [modalAuthOpen, setModalAuthOpen] = useState(false)
  const router = useRouter()

  const menuItems = useMemo(() => {
    const res = [...defaultMenuItems]

    if (user?._id) {
      res.push({
        label: 'Тренировки',
        href: `/trainings/${user?._id}`,
      })
    }

    return res
  }, [user?._id])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleModalAuth = useCallback(
    () => setModalAuthOpen(draft => !draft),
    [],
  )

  const userMenuItems = [
    {
      label: 'Профиль',
      onClick: () => {
        handleClose()
        router.push(`/users/${user?._id}/edit`)
      },
    },
    {
      label: 'Выйти',
      onClick: () => {
        handleClose()
        authApi.signOut()
        router.refresh()
        router.push('/')
      },
    },
  ]

  return (
    <>
      <header
        className={classNames(
          'z-10 fixed  bg-black top-0 w-full transition-all',
          !isOpen && 'bg-opacity-50',
        )}
      >
        <Container>
          <div className="flex items-center justify-start lg:justify-between h-14 lg:h-28">
            <div
              className="w-5 mr-5 lg:hidden"
              onClick={() => setIsOpen('menu')}
            >
              <div className="w-full border-b-2 border-white mb-1" />
              <div
                className={classNames(
                  'w-full border-b-2 border-white mb-1 transition-all',
                  isOpen === 'menu' && 'translate-x-1',
                )}
              />
              <div
                className={classNames(
                  'w-full border-b-2 border-white transition-all',
                  isOpen === 'menu' && 'translate-x-2',
                )}
              />
            </div>

            <div className="relative h-10 w-24 lg:h-12 lg:w-32 lg:-translate-y-1">
              <Link href="/">
                <Image src="/images/logo-white.png" alt="X-fit" fill />
              </Link>
            </div>

            <nav className="hidden lg:block">
              <ul className="flex">
                {menuItems.map(({ label, href }) => (
                  <li
                    className={`${styles.item} text-white px-4 relative cursor-pointer`}
                    key={label}
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {user?._id ? (
              <button
                className="text-white ml-auto lg:ml-0"
                onClick={() => setIsOpen('user')}
              >
                {`${user?.firstName ? `${user?.firstName[0]}. ` : ''}${
                  user?.lastName
                }`}
              </button>
            ) : (
              <button
                className="text-white flex items-center ml-auto lg:ml-0"
                onClick={toggleModalAuth}
              >
                <p className="hidden lg:inline">Вход</p>
                <div className="relative w-10 h-10 lg:ml-5 lg:translate-y-1">
                  <Image src="/icons/enter.svg" alt="->" fill />
                </div>
              </button>
            )}
          </div>
        </Container>
      </header>

      <HeaderMenu open={isOpen === 'menu'} onClose={handleClose}>
        <Container>
          <nav>
            <ul>
              {menuItems.map(({ label, href }) => (
                <li
                  className="text-white relative text-3xl mb-5 cursor-pointer"
                  onClick={handleClose}
                  key={label}
                >
                  <Link className="outline-none" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </HeaderMenu>

      <HeaderMenu open={isOpen === 'user'} onClose={handleClose}>
        <Container>
          <nav>
            <ul>
              {userMenuItems.map(({ label, onClick }) => (
                <li
                  className="text-white relative text-3xl mb-5 text-right cursor-pointer"
                  onClick={onClick}
                  key={label}
                >
                  {label}
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </HeaderMenu>

      <ModalAuth open={modalAuthOpen} onClose={toggleModalAuth} />
    </>
  )
}

export default memo(Header)
