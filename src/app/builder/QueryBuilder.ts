import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modleQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    (this.modleQuery = modelQuery), (this.query = query);
  }

  // serach
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modleQuery = this.modleQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  // filter
  filter() {
    const queryObj = { ...this.query }; // copy
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.map((ele) => delete queryObj[ele]);
    this.modleQuery = this.modleQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  // sort
  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.modleQuery = this.modleQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modleQuery = this.modleQuery.skip(skip).limit(limit);
    return this;
  }
}
export default QueryBuilder;
