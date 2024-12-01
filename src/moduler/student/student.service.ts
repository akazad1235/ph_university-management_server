import QueryBuilder from '../../app/builder/QueryBuilder';
import { Student } from './student.model';

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };
  console.log(queryObject);

  const studentSerachFields = ['name', 'contactNo'];
  // // serach
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // // fitler
  // const excludeField = ['searchTerm', 'limit', 'sort'];
  // excludeField.forEach((element) => {
  //   delete queryObject[element];
  // });
  // const searcheQuery = Student.find({
  //   $or: studentSerachFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // const filterQuery = searcheQuery
  //   .find(queryObject)
  //   .populate('academicSemester')
  //   .populate('user');

  // // sort
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // limit
  // let limit = 2;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // const limitQuery = sortQuery.limit(limit);

  // // paginate
  // let page = 1;
  // let skip = 0;

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQeury = await limitQuery.skip(skip);

  const studentQuery = new QueryBuilder(
    Student.find().populate('academicSemester').populate('user'),
    query,
  )
    .search(studentSerachFields)
    .filter()
    .sort()
    .paginate();

  const result = await studentQuery.modleQuery;
  return result;
};

export const StudentService = {
  getAllStudentIntoDB,
};
