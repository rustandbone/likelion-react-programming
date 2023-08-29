import { create } from 'zustand';
import { produce } from 'immer';

//스토어(상태 관리 저장소) 작성
const catsStore = (set) => {
  //상태(state)
  //명사(속성), 동사(함수 : 액션)
  return {
    cats: [
      { id: crypto.randomUUID(), name: '찐빵', age: 2, gender: 'male' },
      { id: crypto.randomUUID(), name: '뭉치', age: 2, gender: 'male' },
    ],

    //추가
    /* 추가할 고양이 정보: 이름, 나이, 성별 */
    addCat(catInfo) {
      //Immer 라이브러리(설치 필요) 후, 미들웨어 구성
      return set(
        produce((state) => {
          //JavaScript 불변, 객체 업데이트 방식 사용 가능
          state.cats.push({
            id: crypto.randomUUID(),
            ...catInfo,
          });
        })
      );
    },

    //제거
    removeCat(removeCatName) {
      return set(
        produce((state) => {
          const removeCatindex = state.cats.findIndex(
            (cat) => cat.name === removeCatName
          );
          if (removeCatindex > 0) state.cats.splice(removeCatindex, 1);
        })
      );
    },
  };
};

//use 훅 생성(내보내기)
export const useCatsStore = create(catsStore);
