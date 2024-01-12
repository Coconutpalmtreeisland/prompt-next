// Mongoose 라이브러리를 사용하여 MongoDB 데이터베이스에 대한 'User' 모델을 정의
// 서버 측에서 사용자 관련 데이터를 처리하기 위해 'User' 모델을 생성하고, 이 모델을 통해 MongoDB에서 사용자 데이터를 조회, 삽입, 업데이트, 삭제하는 데 필요한 메서드들을 사용할 수 있게 하기 위해 코드 작성

import { Schema, model, models } from 'mongoose';

// 새로운 Schema 객체를 생성 및 'User' 모델의 구조를 정의
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, '이미 가입된 이메일입니다!'],    // 중복 불가
        required: [true, '이메일을 입력해야 가입할 수 있습니다!']   // 반드시 입력
    },
    username: {
        type: String,
        required: [true, '아이디를 입력해주세요!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, '아이디 형식이 잘못되었습니다. 8~20자의 영어나 숫자를 포함한 고유한 아이디어야 합니다.']   // 유효성 정규식
    },
    image: {
        type: String,
    }
});

const User = models.User || model('User', UserSchema);

// 'models'는 Mongoose 라이브러리에 의해 제공되며, 모든 등록된 모델들을 저장합니다.
// models.User를 확인하여 만약 'User'라는 이름의 모델이 'models' 객체 안에 이미 존재한다면, 그 존재하는 모델을 'User' 변수에 할당합니다.
// 이는 같은 모델이 여러 번 생성되는 것을 방지하고, 기존의 모델이 재사용될 수 있게 합니다.

// 만약 'User'라는 이름의 모델이 'models' 객체 안에 존재하지 않는다면, Mongoose의 'model' 함수가 호출되어 새로운 모델을 생성합니다.
// 그리고 새롭게 생성된 모델은 'User' 변수에 할당됩니다.

export default User;