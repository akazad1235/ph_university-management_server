import { Student } from './student.model';

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };
  console.log(queryObject['queryObject']);

  const studentSerachFields = ['name', 'contactNo'];
  // serach
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  // fitler
  const excludeField = ['searchTerm', 'limit', 'sort'];
  excludeField.forEach((element) => {
    delete queryObject[element];
  });
  const searcheQuery = Student.find({
    $or: studentSerachFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const filterQuery = searcheQuery
    .find(queryObject)
    .populate('academicSemester')
    .populate('user');

  // sort
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  // limit
  let limit = 2;
  if (query.limit) {
    limit = query.limit;
  }
  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

export const StudentService = {
  getAllStudentIntoDB,
};
