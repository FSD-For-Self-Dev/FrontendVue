export const ru = {
  message: {
    vocabulary: 'Словарь',
    learningLanguages: 'Изучаемые языки',
  },
  activityStatus: ({ named }) => {
    if (named('status') === 'Inactive') {
      return 'Неактивное'
    } else if (named('status') === 'Active') {
      return 'Активное'
    } else if (named('status') === 'Mastered') {
      return 'Усвоенное'
    }
    return ''
  },
}
