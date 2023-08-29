import { useState, memo } from 'react';
import { motion } from 'framer-motion';

function FooterBar() {
  // 현재(오늘) 년도를 화면에 출력하는 상태를 설정
  const [currentYear] = useState(() => new Date().getFullYear());
  
  return (
    <footer className="p-5 grid place-content-center bg-black dark:border-t dark:border-t-zinc-50/20">
      <motion.small
        drag="x"
        dragConstraints={{
          left: -2,
          right: 2,
        }}
        className="text-base text-sky-500/90 hover:text-sky-500"
      >
        Copyright 2020-{currentYear} &copy; <strong>EUID</strong>
      </motion.small>
    </footer>
  );
}

//React.memo(Component)
//고차 컴포넌트 래핑
//리렌더링에 포함되지 않음 => 두 번째 인자값 주면 그 값이 변경될 때에만 리렌더링
export default memo(FooterBar);

/* 
컴포넌트 함수
React.memo 고차 함수
MemoizedComponent 고차 컴포넌트
향상된 컴포넌트 : props가 변경되지 않은 
*/
