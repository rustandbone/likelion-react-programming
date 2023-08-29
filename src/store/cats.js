import { create } from 'zustand';
import { produce } from 'immer';

export const useCatsStore = create((set) => ({
  cats: [
    { id: crypto.randomUUID(), name: '찐빵', age: 2, gender: 'male' },
    { id: crypto.randomUUID(), name: '뭉치', age: 2, gender: 'male' },
  ],

  addCat: (catInfo) =>
    set(
      produce((state) => {
        state.cats.push({
          id: crypto.randomUUID(),
          ...catInfo,
        });
      })
    ),

  removeCat: (removeCatName) =>
    set(
      produce((state) => {
        const removeCatindex = state.cats.findIndex(
          (cat) => cat.name === removeCatName
        );
        if (removeCatindex > 0) state.cats.splice(removeCatindex, 1);
      })
    ),
}));
