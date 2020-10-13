let triviaStructure = {
  categories: [
    { categoryName: 'General Knowledge', categoryNumber: 0 },
    { categoryName: 'Entertainment: Books', categoryNumber: 1 },
    { categoryName: 'Entertainment: Film', categoryNumber: 2 },
    { categoryName: 'Entertainment: Music', categoryNumber: 3 },
    { categoryName: 'Entertainment: Musicals & Theatres', categoryNumber: 4 },
    { categoryName: 'Entertainment: Television', categoryNumber: 5 },
    { categoryName: 'Entertainment: Video Games', categoryNumber: 6 },
    { categoryName: 'Entertainment: Board Games', categoryNumber: 7 },
    { categoryName: 'Science & Nature', categoryNumber: 8 },
    { categoryName: 'Science: Computers', categoryNumber: 9 },
    { categoryName: 'Science: Mathematics', categoryNumber: 10 },
    { categoryName: 'Mythology', categoryNumber: 11 },
    { categoryName: 'Sports', categoryNumber: 12 },
    { categoryName: 'Geography', categoryNumber: 13 },
    { categoryName: 'History', categoryNumber: 14 },
    { categoryName: 'Politics', categoryNumber: 15 },
    { categoryName: 'Art', categoryNumber: 16 },
    { categoryName: 'Celebrities', categoryNumber: 17 },
    { categoryName: 'Animals', categoryNumber: 18 },
    { categoryName: 'Vehicles', categoryNumber: 19 },
    { categoryName: 'Entertainment: Comics', categoryNumber: 20 },
    { categoryName: 'Science: Gadgets', categoryNumber: 21 },
    {
      categoryName: 'Entertainment: Japanese Anime & Manga',
      categoryNumber: 22,
    },
    {
      categoryName: 'Entertainment: Cartoons & Animations',
      categoryNumber: 23,
    },
  ],
  difficulties: ['Easy', 'Medium', 'Hard'],
  questionTypes: ['Any', 'Multiple Choice', 'True/False'],
  questionTypeValues: [0, 'multiple', 'boolean'],
}

triviaStructure.categories = triviaStructure.categories.sort((a, b) =>
  a.categoryName < b.categoryName
    ? -1
    : a.categoryName > b.categoryName
    ? 1
    : 0,
)

export default triviaStructure
