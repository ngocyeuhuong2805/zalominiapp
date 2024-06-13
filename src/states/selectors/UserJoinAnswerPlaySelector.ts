import { selector, selectorFamily } from "recoil";
import { Question } from "../../models/Question";
import { UserAnswer } from "../../models/UserAnswer";
import { QuestionListPlayAtom } from "../atoms/QuestionListPlayAtom";
import { UserAnswerPlayAtom } from "../atoms/UserAnswerPlayAtom";
import { QuestionListPlayLengthSelector, QuestionListPlaySelector, QuestionPlaySelector } from "./QuestionListPlaySelector";

//Set câu trả lời của người chơi
export const UserAnswerSelector = selector<UserAnswer[]>({
  key: 'UserAnswerSelector',
  get: ({ get }) => {
    const userAnswer = get(UserAnswerPlayAtom);
    return userAnswer;
  },
  set: ({ get, set }, newValue: UserAnswer[]) => {
    set(UserAnswerPlayAtom, newValue as UserAnswer[])
  }
});

//Set câu trả lời của người chơi
export const UserAnswerCreateEmptyListSelector = selector<UserAnswer[]>({
  key: 'UserAnswerCreateEmptyListSelector',
  get: ({ get }) => {
    const questionListLength = get(QuestionListPlayLengthSelector); // Ensure this is an atom or selector that provides the question list length

    let answerList: UserAnswer[] = [];

    // Loop through from 1 to the length of the question list
    for (let i = 1; i <= questionListLength; i++) {
      // Push an object with orderQuestion and an empty answerUser to the answerList
      answerList.push({
        idQuestion: "",
        orderQuestion: i,
        answerUser: "",

      });
    }
    return answerList;
  }
});

export const UserSubmitAnswer = selectorFamily<string, number>({
  key: 'UserSubmitAnswer',
  get: (order: number) => ({ get }) => {
    // Get the current gameData
    const currentGameData: UserAnswer[] = get(UserAnswerPlayAtom);
    // Return the answer at the specified order
    return currentGameData[order]?.answerUser || '';
  },
  set: (order: number) => ({ get, set }, newValue: string) => {
    // Get the current gameData
    const currentGameData = get(UserAnswerPlayAtom);

    // Create a new array with updated answer
    const updatedGameData = currentGameData.map((item, index) =>
      item.orderQuestion === order ? { ...item, answerUser: newValue } : item
    );

    // Set the updated gameData
    set(UserAnswerPlayAtom, updatedGameData);
  },
});

// export const UserShowResultSelector = selector<number>({
//   key: 'UserShowResultSelector',
//   get: ({ get }) => {
//     let count = 0;
//     const listQuestion: Question[] = get(QuestionListPlaySelector);
//     const questionListLength: number = get(QuestionListPlayLengthSelector);
//     const listUserAnswer: UserAnswer[] = get(UserAnswerPlayAtom);
//     console.log(listUserAnswer)
//     const answerListLength: number = listUserAnswer.length
//     for (let i = 0; i < questionListLength; i++) {
//       for (let j = 0; j < answerListLength; j++) {
//         if (listQuestion[i].order === listUserAnswer[j].orderQuestion) {
//           if (listQuestion[i].result === listUserAnswer[i].answerUser) {
//             count++;
//           }
//         }
//       }
//     }
//     return count;
//   }
// });
