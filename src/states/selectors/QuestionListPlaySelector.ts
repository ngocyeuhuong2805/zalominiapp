import { selector, selectorFamily } from 'recoil'
import { Question } from '../../models/Question'
import { QuestionListPlayAtom } from '../atoms/QuestionListPlayAtom'

//lấy tất cả câu hỏi trong trò chơi 
export const QuestionListPlaySelector = selector<Question[]>({
  key: 'QuestionListPlaySelector',
  get: ({ get }) => {
    const gameData = get(QuestionListPlayAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: Question[]) => {
    set(QuestionListPlayAtom, newValue as Question[]);
  },
});

export const QuestionListPlayLengthSelector = selector<number>({
  key: 'QuestionListPlayLengthSelector',
  get: ({ get }) => {
    const gameData = get(QuestionListPlayAtom);
    return gameData.length;
  }
});

//lấy questionText của câu hỏi để play
export const QuestionTextPlaySelector = selectorFamily<string, string>({
  key: 'QuestionTextPlaySelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(QuestionListPlayAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].questionText;
  },
});

//lấy result của câu hỏi để cho biết đáp án đúng hay không
export const QuestionResultPlaySelector = selectorFamily<string, string>({
  key: 'QuestionResultPlaySelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(QuestionListPlayAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].result;
  },
});

//Lấy câu trả lời của trò chơi để chơi
export const QuestionPlaySelector = selectorFamily<string[], { id: string, planIndex: number }>({
  key: 'PlansPlaySelector',
  get: ({ id }) => ({ get }) => {
    const gameData = get(QuestionListPlayAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].plans;
  },
});




export const QuestionByOrderSelector = selectorFamily<Question | undefined, number>({
  key: 'QuestionByOrderSelector',
  get: (order: number) => ({ get }) => {
    const questions = get(QuestionListPlayAtom);
    return questions.find(question => question.order === order);
  },
});