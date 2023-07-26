'use client'
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { motion } from 'framer-motion'

const Nav = () => {
    const ref = useRef()

    const { data: session } = useSession()

    const [loading, setLoading] = useState(false)
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setUpProviders()

        document.addEventListener('click', (e) => {
            if (!ref.current.contains(e.target)) {
                setToggleDropdown(false)
            }
        })
    }, [])

    return (
        <motion.nav
            className="flex-between w-full mb-16 pt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                    src='assets/images/logo.svg'
                    width={30}
                    height={30}
                    alt="PromptAI logo"
                    className="object-contain"
                />
                <p className="logo_text">PromptAI</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <motion.div
                        className="flex gap-3 md:gap-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Link
                            href={'/create-prompt'}
                            className="black_btn"
                        >
                            Create Prompt
                        </Link>
                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="user image"
                            />
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {session?.user ? (
                            <div className="flex gap-3 md:gap-5">
                                <Link
                                    href={'/create-prompt'}
                                    className="black_btn"
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={signOut}
                                    className="outline_btn"
                                >
                                    Sign Out
                                </button>
                                <Link href={'/profile'}>
                                    <Image
                                        src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className="rounded-full"
                                        alt="user image"
                                    />
                                </Link>
                            </div>
                        ) : (
                            <>
                                {providers ? (
                                    Object.values(providers).map((provider) =>
                                    (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                            className="black_btn ml-2"
                                        >
                                            Sign In Width
                                            <Image
                                                width={15}
                                                height={15}
                                                src={`/assets/icons/${provider.id}.png`}
                                                alt="google"
                                                style={{ marginLeft: '10px' }}
                                            />
                                        </button>
                                    ))

                                ) : (
                                    <div className="flex gap-3 md:gap-5">
                                        <Image
                                            src={'assets/icons/loader.svg'}
                                            width={37}
                                            height={37}
                                            className="rounded-full"
                                            alt="loader"
                                        />
                                    </div>
                                )
                                }

                            </>
                        )}

                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative" ref={ref}>
                {session?.user ? (
                    <div className="flex ">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="user image"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown" >
                                <Link
                                    href={'/profile'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={'/create-prompt'}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => (
                                        signOut()
                                    )}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>

                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {session?.user ? (
                            <div className="flex ">
                                <Image
                                    src={'assets/icons/loader.svg'}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="loader"
                                />
                            </div>
                        ) : (

                            <>

                                {providers ? (
                                    Object.values(providers).map((provider) => (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                            className="black_btn"
                                        >
                                            Sign In Width
                                            <Image
                                                width={15}
                                                height={15}
                                                src={'/assets/icons/google.png'}
                                                alt="google"
                                                style={{ marginLeft: '7px' }}
                                            />
                                        </button>
                                    ))
                                ) : (
                                    <div className="flex">
                                        <Image
                                            src={'assets/icons/loader.svg'}
                                            width={37}
                                            height={37}
                                            className="rounded-full"
                                            alt="loader"

                                        />
                                    </div>
                                )
                                }

                            </>
                        )
                        }

                    </>
                )}
            </div>
        </motion.nav >
    )
}

export default Nav


