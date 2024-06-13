import { selector, selectorFamily } from 'recoil'
import { QuestionListEditAtom } from '../atoms/QuestionListEditAtom'
import { Question } from '../../models/Question';

//Add số lượng câu hỏi
export const SetNumberOfQuestions = selectorFamily<Question[], number>({
  key: 'SetNumberOfQuestions',
  get: (numQuestions) => ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    return gameData;
  },
  set: (numQuestions) => ({ get, set }) => {
    const currentGameData = get(QuestionListEditAtom);

    const adjustedGameData = [...currentGameData];
    if (numQuestions > adjustedGameData.length) {
      // Add new questions
      for (let i = adjustedGameData.length; i < numQuestions; i++) {
        adjustedGameData.push({
          order: i + 1,
          questionText: "",
          result: "",
          plans: ["", "", "", ""],
          url: "",
          id: ""
        });
      }
    } else if (numQuestions < adjustedGameData.length) {
      // Remove excess questions
      adjustedGameData.length = numQuestions;
    }

    set(QuestionListEditAtom, adjustedGameData);
  },
});

//Lấy toàn bộ câu hỏi của trò chơi khi truyền 
export const QuestionListEditSelector = selector<Question[]>({
  key: 'QuestionListEditSelector',
  get: ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: Question[]) => {
    set(QuestionListEditAtom, newValue as Question[]);
  },
});

// //Lấy toàn bộ câu hỏi của trò chơi khi truyền 
// export const QuestionEditSelector = selectorFamily<Question[], Question>({
//   key: 'QuestionEditSelector',
//   get: (q: Question) => ({ get }) => {
//     const gameData = get(QuestionListEditAtom);
//     return gameData;
//   },
//   set: (q: Question) => ({ get, set }, newValue: Question[]) => {
//     const currentQuestions = get(QuestionListEditAtom);
//     const updatedQuestions = [...currentQuestions, q];
//     set(QuestionListEditAtom, updatedQuestions);
//   },
// });

//Lấy questionText của trò chơi
export const QuestionTextEditSelector = selectorFamily<string, string>({
  key: 'QuestionTextEditSelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].questionText;
  },
  set: (id: string|null) => ({ get, set }, newValue: string) => {
    const currentGameData = get(QuestionListEditAtom);
    if(typeof(id)!=undefined){
      const updatedGameData = currentGameData.map((question, i) =>
        question.id === id ? { ...question, questionText: newValue } : question
      );
      set(QuestionListEditAtom, updatedGameData);
    }
    
  },
});

//Lấy đáp án của trò chơi
export const QuestionResultEditSelector = selectorFamily<string, string>({
  key: 'QuestionResultEditSelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].result;
  },
  set: (id: string) => ({ get, set }, newValue: string) => {
    const currentGameData = get(QuestionListEditAtom);
    const index = parseInt(id || "", 10);
    const updatedGameData = currentGameData.map((question, i) =>
      question.order === index ? { ...question, result: newValue } : question
    );
    set(QuestionListEditAtom, updatedGameData);
  },
});

//Lấy url của trò chơi
export const QuestionUrlEditSelector = selectorFamily<string, string>({
  key: 'QuestionUrlEditSelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    const question = gameData.find(item => item.id === id);
    return question ? question.url : '';
  },
  set: (id: string) => ({ get, set }, newValue: string) => {
    const currentGameData = get(QuestionListEditAtom);
    const index = parseInt(id || "", 10);
    const updatedGameData = currentGameData.map((question, i) =>
      question.id === id ? { ...question, result: newValue } : question
    );
    set(QuestionListEditAtom, updatedGameData);
  },
});

//Lấy câu trả lời của trò chơi
export const PlansEditSelector = selectorFamily<string[], { id: string, planIndex: number }>({
  key: 'PlansEditSelector',
  get: ({ id }) => ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].plans;
  },
  set: ({ id, planIndex }) => ({ get, set }, newValue) => {
    const currentGameData = get(QuestionListEditAtom);
    const index = parseInt(id, 10);
    const updatedGameData = currentGameData.map((question, i) =>
      question.order === index ? {
        ...question,
        plans: question.plans.map((plan, pi) => pi === planIndex ? newValue : plan)
      } : question
    );
    set(QuestionListEditAtom, updatedGameData);
  },
});


// thêm phần tử mới vào sau phần tử cuối
export const AddQuestionSelector = selector({
  key: 'AppendQuestionSelector',
  get: ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    return gameData;
  },
  set: ({ get, set }) => {
    let gameData: Question[] = get(QuestionListEditAtom);
    const newQuestion: Question = {
      id: "",
      order: gameData.length + 1, // Assuming 'order' is a 1-based index
      questionText: "",
      result: "",
      plans: ["", "", "", ""], // Assuming four potential answers for each question
      url: "",
      
    };
    gameData = [...gameData, newQuestion]; // Append the new question
    set(QuestionListEditAtom, gameData);
  },
});

// xoá phần tử cuối của câu hỏi
export const RemoveLastQuestionSelector = selector({
  key: 'RemoveLastQuestionSelector',
  get: ({ get }) => {
    const gameData = get(QuestionListEditAtom);
    return gameData;
  },
  set: ({ get, set }) => {
    let gameData = get(QuestionListEditAtom);
    if (gameData.length > 0) {
      gameData = gameData.slice(0, gameData.length - 1); // Remove the last element
      set(QuestionListEditAtom, gameData);
    }
  },
});

export const QuestionByOrderSelector = selectorFamily<Question | undefined, number>({
  key: 'QuestionByOrderSelector',
  get: (index: number) => ({ get }) => {
    const questions = get(QuestionListEditAtom);
    return questions.find(question => question.order === index);
  },
  set: (index: number) => ({ get, set }, updatedProperties) => {
    const questions = get(QuestionListEditAtom);
    const updatedQuestions = questions.map(question =>
      question.order === index ? { ...question, ...updatedProperties } : question
    );
    console.log("🚀 ~ EditChoicesPage ~ question2:", updatedQuestions)

    set(QuestionListEditAtom, updatedQuestions);
  },
});
