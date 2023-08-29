import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

//store (define state & action)

// hook (bind component) <- store (define state & action)
//훅을 만들어서 내보냄
export const useListStore = create(
  persist(
    devtools((set /* setState */) => {
      //return store's state & actions
      return {
        //state
        //Read - Query
        list: [
          {
            id: crypto.randomUUID(),
            title: 'Zustand는 츄슈탄트로 발음한다',
          },
        ],

        //Write - Mutation
        addItem: (newItemTitle) =>
          set(
            (state) => ({
              list: [
                ...state.list,
                {
                  id: crypto.randomUUID(),
                  title: newItemTitle,
                },
              ],
            }),
            false,
            'list/addItem'
          ),

        deleteItem: (deleteId) =>
          set(
            (state) => ({
              list: state.list.filter((item) => item.id !== deleteId),
            }),
            false,
            'list/removeItem'
          ),
      };
    }),
    {
      name: 'app-store',
    }
  )
);
