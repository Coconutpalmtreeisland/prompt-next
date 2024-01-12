"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

// 세션 상태에 따라 동적으로 반응하며, 사용자의 로그인 여부에 따라 적절한 UI를 제공
const Nav = () => {
    const { data: session } = useSession();   // 비구조화 할당을 통해 session 변수에 세션 데이터를 할당, useSession을 사용하여 세션 상태에 따라 로그인 여부 결정 --> session 객체 내부에 사용자 정보가 있으면 로그인 상태로 보고, 그렇지 않으면 로그아웃 상태 봄 // data:는 useSession 훅이 반환하는 객체에서 data 속성을 session 변수로 이름을 변경하여 할당하는 것

    const [providers, setProviders] = useState(null);   // providers에 인증 공급자 정보 저장
    const [toggleDropdown, setToggleDropdown] = useState(false);    //드롭다운 메뉴의 표시 상태

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response); // getProviders(타 계정 정보) 호출하여 providers 상태에 저장
        }

        setUpProviders();
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

            {/* {alert(session?.user)} --> undefined */}
            {/* {alert(providers)} --> null */}
            {/* useEffect 안에 변수 setProviders라고 선언해서 중복되었음 --> setUpProviders로 변경 */}

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (  // 옵셔널 체인징을 사용하여 session 객체 내에 user 속성이 존재하는지 확인 --> 사용자가 로그인되어 있으면 session.user에는 사용자 정보가 있기 때문에 로그인된 사용자에게 보여줄 UI를 렌더링하게 됨
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>게시글 작성</Link>

                        <button type='button' onClick={signOut} className='outline_btn'>로그아웃</button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* session.user가 undefined 또는 null인 경우 */}
                        {/* providers 객체에 대해 Object.values() 메서드를 사용하여 객체의 모든 값을 배열로 반환하고 반복 작업 수행 ??왜 providers가 유효한 객체일 때만 실행해야 하는지 아직 모르겠음 */}
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    로그인
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
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
                                    내 프로필
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    게시글 작성
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    로그아웃
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    로그인
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav