import { useEffect, useState, useContext, useRef, useReducer, useMemo, useCallback } from 'react'
import './App.css'
import MyInfoContext from './main';
import { SomeChild } from './SomeChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state, action) => {
  switch(action.type) {
    case 'increment': 
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const App = () => {

  const [count, setCount] = useState(0);   // データが変更されたら再レンダリングする
  const myInfo = useContext(MyInfoContext); // redux的な操作？
  const ref = useRef(); // referenceの略らしい_参照
  const [state, dispatch] = useReducer(reducer, 0); // あんま使うことはないらしい？そうなのか・・・？

  const handleClick = () => {
    // setCount(count + 1);
    /**
     * state 変数を相対的に変更する処理を行うときは、前の値を直接参照・変更するのは避けるって書いてあった
     * りあクトって本の2巻に
     * const plusThreeDirectly = () => [0, 1, 2].forEach((_) => setCount(count + 1));
     * const plusThreeWithFunction = () => [0, 1, 2].forEach((_) => setCount((c) => c + 1));
     * 上記だと前者は1しか加算されないらしい
     */
    setCount((c) => c + 1);
  };

  useEffect(() => {
    console.log('Hello Hooks');
    // setCount(count + 1); // 無限ループになる
  }, [count]); // 空配列の際はページのマウント時に発火する（副作用）

  const handleRef = () => {
    console.log(ref);
  };

  // useMemo メモ化することができる
  // => ブラウザのメモリに保存することができるらしい
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   // ただ重い処理
  //   let i = 0;
  //   while (i < 2000000) {
  //     i++;
  //   }
  //   return count02 * count02;
  // };

  const square = useMemo(() => {
    let i = 0;
    while (i < 20000) {
      i++;
    }
    return count02 * count02;
  }, [count02]); // ここで指定したものの状態が変わった時だけこれが走る
  // count01が変化してもcount02は変わらず、前に保存した状態を返す
  // なんか遅いなってときとかにチューニング目的につかうらしい
  // なんでもかんでもuseMemoを使うとすべてをブラウザのメモリに保存することになるので、
  // オーバーヘッドの原因になるらしい

  // useCallBack 関数のメモ化
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert(`これは重い処理です`);
  // }

  const showCount = useCallback(() => {
      alert(`これは重い処理です`);
  }, [counter]);
 

  // カスタムフック
  const [age, setAge] = useLocalStorage('age', 24); // keyとvalueを保存

  return (
    <div className='App'>
      <h1>useState, userEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{myInfo.name}</p>
      <p>{myInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type='text' ref={ref} />
      {/* input属性の文字列を取得したいときとかに使うらしい */}
      <button onClick={handleRef}>useRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>カウント:{state}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント1: {count01}</div>
      <div>カウント2: {count02}</div>
      <div>結果:{square}</div>
      <button onClick={() => setCount01((c) => c + 1)}>+</button>
      <button onClick={() => setCount02((c) => c + 1)}>+</button>

      <hr />
      <h1>useCallBack</h1>
      <SomeChild showCount={showCount} />

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </div>
  );
}

export default App
