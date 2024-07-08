export type QuestionType = 'yesno' | 'number';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  next: { [key: string]: number | 'end' } | ((answer: string | number) => number | 'end');
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Does your business operate in CA?",
    type: "yesno",
    next: { yes: 2, no: 'end' },
  },
  {
    id: 2,
    question: "How many employees do you have?",
    type: "number",
    next: (answer) => (parseInt(answer as string) > 100 ? 'end' : 3),
  },
  {
    id: 3,
    question: "Do you serve food?",
    type: "yesno",
    next: { yes: 4, no: 6 },
  },
  {
    id: 4,
    question: "Do you serve hot food?",
    type: "yesno",
    next: { yes: 5, no: 6 },
  },
  {
    id: 5,
    question: "Are you open past midnight?",
    type: "yesno",
    next: { yes: 6, no: 6 },
  },
  {
    id: 6,
    question: "Do you host live music?",
    type: "yesno",
    next: { yes: 'end', no: 'end' },
  },
];
