<a href="https://youtu.be/wm5gMKuwSYk?si=wuja5ARlg9NTxu07" target="_blank">참고한 영상</a>
[참고한 영상](https://youtu.be/wm5gMKuwSYk?si=wuja5ARlg9NTxu07){:target="_blank" rel="noopener"}

### 사용한 기술
- Next.js
- MongoDB
- NextAuth
- TailwindCSS

### `CSR`과 `SSR`관점에서 보는 `React` 와 `Next`의 차이점 :
`CSR중심인 React`는 동적이고 상호작용이 많은 사용자 인터페이스를 구축하고 브라우저에서 렌더링 되기 때문에 사용자와 실시간으로 상호작용이 가능합니다. 하지만 브라우저에서 렌더링 하다보니 초기 로딩 시간이 길어져서 페이지 전체의 콘텐츠를 볼 수 없기 떄문에 검색 엔진 최적화(SEO)에 취약합니다.

반면, `Next.js는 SSR 중심`이기 때문에 사용자의 요청에 따라 서버에서 페이지의 전체 HTML을 미리 생성함으로써 로딩 시간이 줄어듭니다. 결과적으로 검색엔진이 Next.js로 만든 사이트를 더 잘 이해하고 저장하기 때문에 SEO가 개선되고 사용자는 웹사이트에 빠르게 접근할 수 있기 떄문에 사용자 경험이 향상됩니다.

그러나 Next.js는 필요에 따라 CSR이 가능합니다.
Next.js에서 SSR 컴포넌트를 CSR 컴포넌트로 변환하고 싶은 경우 추가 작업이 필요합니다. 페이지 상단에 'use client' 지시문을 추가하면 CSR 컴포넌트로 변환되어 useState, useEffect 등의 사용이 가능합니다. 이를 활요해 CSR과 SSR을 모두 사용함으로써 SSR의 이점 뿐만 아니라 동적이고 상호작용이 많은 UI를 구축할 수 있습니다.

> [!NOTE]  
> 공식 문서에 따른 렌더링 방식 가이드 :  <br/><br/>
    - SSR: 데이터를 가져올 때, 백엔드 리소스에 직접 액세스할 때, 서버에 센서 정보, 액세스 토큰, API 키 등이 있는 경우, 클라이언트 측 JavaScript를 최소화하고자 할 때.  <br/><br/>
    - CSR: 클릭 또는 변경과 같은 상호작용 또는 이벤트 리스너를 사용할 때, useState와 useEffect와 같은 훅을 사용하는 경우, 브라우저 전용 API에 의존하는 사용자 정의 훅을 사용하는 경우, React 클래스 컴포넌트를 사용하는 경우.


next.js 설치하기  
`npx create-next-app@latest ./`

√ Would you like to use TypeScript? ... `No` / Yes  
√ Would you like to use ESLint? ... `No` / Yes  
√ Would you like to use Tailwind CSS? ... No / `Yes`  
√ Would you like to use `src/` directory? ... `No` / Yes  
√ Would you like to use App Router? (recommended) ... No / `Yes`  
√ Would you like to customize the default import alias (@/*)? ... No / `Yes`  
√ What import alias would you like configured? ... @/*  
Creating a new Next.js app in C:\Users\line\Desktop\share_prompts_next.js.

<details>
    <summary>Next.js의 구조</summary>

    ⋄ layout.js :
    layout.js에 모든 컴포넌트가 자식 요소로 들어갑니다.
    layout.js에 생성하는 코드는 모든 라우트 페이지에 표시됩니다.
    즉, 이 파일에 포함되는 컴포넌트는 전체 페이지에 공유됩니다.
    모든 페이지에 네비게이션 바나 푸터, Redux 같은 공통된 레이아웃이나 템플릿을 제공할 수 있습니다.

    ⋄ page.js :
    page.js 파일은 애플리케이션의 홈페이지 경로를 나타냅니다.

    ⋄ Next.js의 라우팅 시스템 :
    원하는 경로에 해당하는 폴더를 생성하면 해당 폴더 이름으로 경로 이름이 라우팅됩니다.
    동적인 라우팅 주소는 [id]폴더를 만들고 폴더 안에 page.js를 파일 생성으로 구현됩니다.
    (예) posts - [postId] - page.js : /posts/blog-post-1 /posts/blog-post-2 /posts/blog-post-3 ...

    ⋄ loading.js :
    페이지가 로드될 때까지 로딩중을 렌더링합니다.

    ⋄ error.js :
    에러가 생성될 때 자동으로 실행되며 사용자에게 에러를 표시합니다.
    예시

    ```
    'use client'; // 에러 컴포넌트는 반드시 클라이언트 컴포넌트에 있어야합니다. 사용자에게 실시간으로 피드백을 제공하여 UX를 향상시킵니다.

    import { useEffect } from 'react';


    const Error = ({ error, reset }) => {
        useEffect(() => {
            // 사용자에게 에러 메세지 표시
            console.log(error);
        }, [error]);

        return (
            <div>
                <h2>오류 발생!</h2>
                <button
                    onClick={
                        // 에러 리셋
                        () => reset()
                    }
                >
                    재실행하기
                </button>
            </div>
        )
    }

    export default Error;
    ```

</details><br />


Data Fetching(데이터 가져오기 , 3가지 방법) :
1. Server Side Redering (SSR)
2. Static Site Generation (SSG)
3. Incremental Static Generation (ISR)

    <details>
        <summary>용어 설명</summary>

        ⋆ SSG : build 할 때 웹 페이지를 미리 생성하는 방식.
        사용자 요청이 있을 때 마다 이미 생성된 정적 페이지를 제공하여 빠르게 응답하고 SEO에 유리합니다. 다만, build 시간이 길어질 수 있고 실시간 업데이트가 어렵습니다.

        ⋆ ISR : 빌드 시점에서 일부 페이지만 미리 생성하고, 이후 사용자의 요청에 따라 필요한 페이지를 뒷담에서 렌더링하여 정적 파일로 추가하는 방식.
        사용자는 빠르게 페이지에 접근할 수 있으며, 실시간 데이터 업데이트가 가능하기 때문에 동적인 웹사이트에도 적합합니다.

    </details>

****

### 간단한 GET 요청을 위한 Express.js 서버 라우트를 설정하는 기본 방법
```javascript
const express = require('express');
const app = express();

// /api.users에 대한 GET 요청시
app.get('/api/users', (req, res) => {
    const users = [
        //데이터베이스에서 사용자를 가져오거나 생성
    ];

    // 데이터베이스에서 서버가 요청한 데이터 찾아서 보내기
    res.json(users);
});

// 클라이언트와 데이터를 주고 받기 위해 서버 설정 및 3000 포트에서 서버 시작
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
```

### Next.js에서 라우팅을 처리하는 방법[`페이지 기반 라우팅` & `API 라우팅`]
36분쯤부터 설명
https://jjongbin.tistory.com/50 참고 나중에 다시 이해하기;;;
-app
    -api
        -user.js

-app
    -posts
        -page.js
    -page.js
    -rotue.js

다이나믹 로우터 파일이 곧 주소

HTTP methods
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS


### SEO를 개선하기 위해 메타데이터를 관리하는 방법 [`정적` & `동적`]
41분부터 설명 나중에 다시 이해하기
정적 메타데이터
```javascript
export const metadata = {
    title: 'Home',
};

export default function Page(){
    return(
        <h1>정적 메타데이터를 가진 Next.js 페이지</h1>
    )
}
```

동적 메타데이터
```javascript
// 비동기 함수
export async function generateMetadata({ params, searchParams }){
    const product = await getProduct(params.id);
    return { title: product.title };
}

export default function Page(){
    return(
        <h1>동적 메타데이터를 가진 Next.js 페이지</h1>
    )
}
```


- 설치
`npm install bcrypt mongodb mongoose next-auth`
bcrypt 비밀번호 암호화
mongodb, mongoose 데이터베이스 관리
next-auth 로그인


### 트러블 슈팅
**1.** 
- 오류:  
./app/layout.jsx:1:0  
Can't resolve '@styles/globals.css';  
그리고 RootLayout 컴포넌트가 자식 컴포넌트를 렌더링하지 못함
```javascript
export const metadata = {
    title: "Promptivortex ",
    description: 'Discover & Share AI Promtpts, AI 프롬포트 검색 & 공유'
}

const RootLayout = () => {
    return (
        <html lang='ko'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    {children}
                </main>
            </body>
        </html>
    )
}
```
- 해결:
    - jsconfig.json 변경
    ```javascript
    {                           |    {
        "compilerOptions": {    |        "compilerOptions": {
            "paths": {          |            "paths": {
                "@/*": [        |                "@*": [
                    "./*"      -->                  "./*"
                ]               |                ]
            }                   |            }
        }                       |        }
    }                           |    }
    ```
    @ 뒤에 오는 경로에서 슬래시(/)를 포함하지 않고 매칭하도록 설정을 변경.
    *****
    - layout.jsx 변경
    ```javascript
    const RootLayout = ({children}) => {
        return (
            <html lang='ko'>
                <body>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        {children}
                    </main>
                </body>
            </html>
        )
    }
    ```
    children을 props를 통해 전달
****

> 2. tailwind css 커스텀
- 오류:
./styles/globals.css:111:5
Syntax error: C:\Users\line\Desktop\share_prompts_next.jsxxxx\styles\globals.css The `shadow-[inset_10px_-50px_94px_0_rgb(199,` class does not exist. If `shadow-[inset_10px_-50px_94px_0_rgb(199,` is a custom class, make sure it is defined within a `@layer` directive.
```javascript
  109 | 
  110 | .copy_btn {
> 111 |     @apply w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)] backdrop-blur flex justify-center items-center cursor-pointer;
      |     ^
  112 | }
  113 | 
```
- 해결: 커스텀 css 설정 tailwindcss 문법에 맞게 수정!
    <a href="https://tailwindcss.com/docs/box-shadow">참고 문서</a>
    - tailwind.config.js 추가
    ```javascript
    boxShadow: {
        'inner': '10px -50px 94px 0 rgba(199, 199, 199, 0.2)',
    }
    ```
    tailwind.config.js에서 shadow-inner 설정을 커스텀 설정으로 바꿈.

    - globals.css 변경
    ```javascript
    .copy_btn {
        @apply w-7 h-7 rounded-full bg-white/10 shadow-inner backdrop-blur flex justify-center items-center cursor-pointer;
    }

    .glassmorphism {
        @apply rounded-xl border border-gray-200 bg-white/20 shadow-inner backdrop-blur p-5;
    }
    ```
    glabals.css에서 shadow 설정을 shadow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)]에서 shadow-inner로 바꿈.

    - css 적용시 
    ```javascript
    className="shaodow-[inset_10px_-50px_94px_0_rgb(199, 199, 199, 0.2)]"
    ```
****

> 3. react-hook 사용
- 오류:
./components\Nav.jsx
ReactServerComponentsError:
You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
Learn more: https://nextjs.org/docs/getting-started/react-essentials
Maybe one of these should be marked as a client entry with "use client":
  ./components\Nav.jsx
  ./app\layout.jsx
```javascript
   ╭─[C:\Users\line\Desktop\prompt-next\components\Nav.jsx:1:1]
 1 │ import Link from 'next/link';
 2 │ import Image from 'next/image';
 3 │ import { useState, useEffect } from 'react';
   ·                    ─────────
 4 │ import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
 5 │ 
 5 │ const Nav = () => {
   ╰────
```
- 해결:
    - Nav.jsx
    ```javascript
    "use client";
    ```
    react-hook을 사용하려면 Nav.jsx에 `"use client";`를 상단에 명시해야 함!
****

**4. 이미지 태그 사용**
- 오류:
Unhandled Runtime Error  
Error: Image with src "/assets/images/logo.svg" is missing required "width" property.
```javascript
<Image src="/assets/images/logo.svg" />
```
- 해결: 넓이, 높이 속성도 지정해야 함.
```javascript
<Image
    src="/assets/images/logo.svg"
    alt='Promptivortex Logo'
    width={30}
    height={30}
    className='object-contain'
/>
```
<br>
****

**5. 구글 로그인 엑세스 차단**
- 오류:  
<img src="https://raw.githubusercontent.com/Coconutpalmtreeisland/prompt-next/main/public/assets/img/troubleshooting05.png">
Error 400: redirect_uri_mismatch

- 해결:  
NEXTAUTH_URL,NEXTAUTH_URL_INTERNAL 값이 오타로 인해 승인된 리디렉션 URI와 달라서 발생했기 때문에 오타를 수정함.
[참고한 공식 문서](https://next-auth.js.org/getting-started/rest-api#getpost-apiauthcallbackprovider){:target="_blank" rel="noopener"}
구글 클라우드 콘솔 promptivortex 프로젝트 > 사용자 인증 서비스 > 사용자 인증 정보 > OAuth 2.0 클라이언트 ID > 사용하는 ID의 승인된 리디렉션 URI에 http://localhost:3000/api/auth/callback/google 추가함.

**6. Next.js 업데이트로 바뀐 사항들**
- 오류:  
next.config.js에서 경고 문구가 뜸
Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'appDir' at "experimental"
 ⚠     The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
```javascript
experimental: {
        appDir: true,   // 새로운 앱 디렉토리 구조를 활성화
        serverComponentsExternalPackages: ["mongoose"], // 서버 컴포넌트에서 외부 패키지를 사용할 수 있도록 설정 --> "mongoose"를 추가하여 사용
    },
images: {
        domains: ['lh3.googleusercontent.com'], // 외부 도메인의 이미지를 Next.js 이미지 최적화 기능을 통해 사용할 수 있도록 허용하는 도메인을 명시 --> 구글 사용자 프로필 이미지 같은 경우 이 설정을 통해 허용됨
    },
```
- 해결:  
```javascript
experimental: {
        serverComponentsExternalPackages: ["mongoose"], // 서버 컴포넌트에서 외부 패키지를 사용할 수 있도록 설정 --> "mongoose"를 추가하여 사용
    },
    // Next.js의 이미지 최적화
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                // 필요한 경우 pathname 속성을 추가할 수 있습니다.
            },
        ],
    },
```

### 용어 정리
<details>
    <summary>자세히 보기</summary>

- **비구조화 할당**: 배열이나 객체의 속성을 해체하여, 그 값을 개별 변수에 할당하는 것으로, 하나 이상의 변수에 배열이나 객체 속성을 간편하게 할당할 수 있으며, 코드의 가독성을 높이고 불필요한 반복을 줄일 수 있습니다.  
    <details>
        <summary>자세히 보기</summary>

    |예시|변수|함수|
    |--|----|----|
    ||const user = { name: 'John Doe, 'age: 30, };|function getUser() { return { name: 'John Doe', age: 30, }; }|
    |할당|const { name, age } = user;|const { name, age } = getUser();|
    |설명|객체에서 name과 age 속성을 추출하여 각각의 변수로 할당|getUser 함수에서 반환된 객체를 비구조화하여 name과 age 변수에 할당|

    <br>

    |비구조화 할당을 실제 적용한 코드|반환된 객체를 임시 변수에 할당|
    |--|--|
    |const { data: session } = useSession();|const sessionData = useSession();<br>const session = sessionData.data;|
    |useSession 훅이 반환하는 객체에서 data 속성을 가져와서 session이라는 새로운 변수에 할당|useSession 훅이 반환하는 객체를 sessionData 변수에 할당<br> sessionData 객체 안에 data 속성을 session에 할당|

    **--> 비구조화 할당을 사용하면 코드의 양을 줄이고, 의도를 더 명확하게 표현할 수 있다!**
    </details>
<br>

- **옵셔널 체인징**: 객체의 속성을 읽을 때 해당 객체나 속성이 undefined 또는 null이 아닌지 확인하지 않고도 안전하게 접근할 수 있도록 하는 연산자이며, `?.`로 표시합니다. 
**객체의 속성이 존재하지 않을 경우에 오류를 발생시키지 않고 undefined를 반환할 수 있다!**

    > `session?.user`라는 코드에서 session 객체가 존재하지 않거나 session 객체 안에 user 속성이 없을 경우에는 undefined를 반환하고, 그렇지 않으면 user 속성의 값을 반환하여 `session && session.user` 대신 사용하므로 코드가 `간결`해집니다.