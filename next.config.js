// Next.js 프로젝트에서 웹팩의 최신 JavaScript 기능을 사용하거나 특정 호스팅 도메인의 이미지를 다루고, 몇 가지 실험적인 기능을 적용하는 코드

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 실험적인 기능을 활성화
    experimental: {
        appDir: true,   // 새로운 앱 디렉토리 구조를 활성화
        serverComponentsExternalPackages: ["mongoose"], // 서버 컴포넌트에서 외부 패키지를 사용할 수 있도록 설정 --> "mongoose"를 추가하여 사용
    },
    // Next.js의 이미지 최적화
    images: {
        domains: ['lh3.googleusercontent.com'], // 외부 도메인의 이미지를 Next.js 이미지 최적화 기능을 통해 사용할 수 있도록 허용하는 도메인을 명시 --> 구글 사용자 프로필 이미지 같은 경우 이 설정을 통해 허용됨
    },
    webpack(config) {   //webpack 함수는 Next.js가 내부적으로 사용하는 Webpack 설정을 커스터마이즈할 때 사용 --> 모듈 내에서 비동기 함수를 기다리기 위해 experiments 객체에 topLevelAwait를 추가하여 최상위 수준에서의 await 사용
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig