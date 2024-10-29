import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

/**
 * first time generate student unique id
 * code format year-code-number. like 2024030001
 */

const firstGenerateStudentId = async (payload: TAcademicSemester) => {
  // last student id get
  const lastStudent = await User.findOne({ role: 'student' }) // Filter by role "student"
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .exec();
  // 2024030001 slice id to get 0001
  const sliceId = Number(lastStudent?.id.substring(6));
  // if  student data have, get student last 4 digit otherwise return 1
  const checkId = sliceId > 0 ? sliceId + 1 : 1;

  const currentId = checkId.toString().padStart(4, '0'); // generate id 0001
  // 2024030001
  return `${payload.year}${payload.code}${currentId}`;
};
export default firstGenerateStudentId;
