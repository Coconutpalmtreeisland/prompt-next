"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// signIn,signOut 로그인 로그아웃 구현 // useSession 현재 세션 정보를 가져옴 // getProviders 인증을 위한 공급자(구글, 페이스북 등) 정보를 가져옴 // Provider 인증 공급자들을 렌더링
import Provider from './Provider';

const Nav = () => {
    const isUserLoggedIn = true;    // useSession을 사용하여 세션상태에 따라 로그인 여부 결정 // 로그인 하지 않은 경우(=const isUserLoggedIn = false;)

    const [providers, setProviders] = useState(null);   // providers에 인증 공급자 정보 저장
    const [toggleDropdown, setToggleDropdown] = useState(false);    //드롭다운 메뉴의 표시 상태

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();

            setProviders(response); // getProviders(타 계정 정보) 호출하여 providers 상태에 저장
        }

        setProviders();
    }, [])  // 컴포넌트가 마운트될 때([] 의존성 배열로 인해 처음 한 번만 실행) 비동기적으로 인증 공급자 정보를 가져오는 함수 실행

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg"
                    alt='Promptivortex Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptivortex</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>글쓰기</Link>

                        <button type='button' onClick={signOut} className='outline_btn'>로그아웃</button>

                        <Link href='/profile'>
                            <Image
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={Provider.name}
                                onClick={() => signIn(provider.id)}
                                className='black_btn'
                            >
                                회원가입
                            </button>
                        ))}
                    </>
                )}

                {/* Mobile Navigation */}
                <div className='sm:hidden flex relative'>
                    {isUserLoggedIn ? (
                        <div className='flex'>
                            <Image
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />

                            {toggleDropdown && (
                                <div className='dropdown'>
                                    <Link
                                        href="/profile"
                                        className='dropdown_link'
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className='dropdown_link'
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <Link
                                        type='button'
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                        className='mt-5 w-full black_btn'
                                    >
                                        로그아웃
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* providers 객체에 대해 Object.values() 메서드를 사용하여 값을 배열로 반환하고  */}
                            {providers && Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={Provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    회원가입
                                </button>
                            ))}
                        </>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Nav