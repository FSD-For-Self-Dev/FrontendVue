export const en = {
  message: {
    vocabulary: 'Vocabulary',
    learningLanguages: 'Learning languages',
    activityStatus: (status: string) => status,
  },
  activityStatus: ({ named }) => {
    return named('status')
  },
}