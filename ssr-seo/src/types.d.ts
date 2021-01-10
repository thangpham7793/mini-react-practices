export type QuestionItem = {
  question_id: string;
  owner: QuestionOwner;
  title: string;
  view_count: number;
  answer_count: number;
};

export type QuestionOwner = {
  profile_image: string;
  display_name: string;
};
