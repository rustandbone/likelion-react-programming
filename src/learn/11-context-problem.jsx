import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './partials/Header';
import Main from './partials/Main';

//Context를 사용하면 요소를 사용하지 않는 자식 컴포넌트도 리렌더링이 모두 일어남
//성능에 큰 영향을 미치지 않지만, 
//그 이슈를 해결하고자 zustand 같은 앱 상태 관리 사용

function ReactContextIssue() {
  return (
    <>
      <Helmet>
        <title>React Context Issue - Learn</title>
      </Helmet>
      <DemoApp />
    </>
  );
}

export default ReactContextIssue;

/* -------------------------------------------------------------------------- */

export const DemoAppContext = createContext();

function DemoApp() {
  // -----------------------------------------------------------------

  const itemRef = useRef(null);

  // -----------------------------------------------------------------

  const [list, setList] = useState([]);

  const addItem = useCallback((newItem) => {
    setList((list) => [
      ...list,
      {
        id: crypto.randomUUID(),
        title: newItem,
      },
    ]);
  }, []);

  const deleteItem = useCallback((deleteId) => {
    setList((list) => list.filter((item) => item.id !== deleteId));
  }, []);

  const listValue = useMemo(
    () => ({
      data: list,
      addItem,
      deleteItem,
    }),
    [list, addItem, deleteItem]
  );

  // -----------------------------------------------------------------

  const [count, setCount] = useState(() => list.length);

  const incrementCount = useCallback((by) => {
    setCount((count) => count + by); //큐 대기열을 사용하기 위함
  }, []);

  const decrementCount = useCallback((by) => {
    setCount((count) => count - by);
  }, []);

  const countValue = useMemo(
    () => ({
      data: count,
      incrementCount,
      decrementCount,
    }),
    [count, decrementCount, incrementCount]
  );

  const value = useMemo(() => {
    return {
      itemRef,
      list: listValue,
      count: countValue,
    };
  }, [listValue, countValue]);

  // -----------------------------------------------------------------

  return (
    <DemoAppContext.Provider value={value}>
      <Header />
      <Main />
    </DemoAppContext.Provider>
  );
}
