const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      arg: {
        id: GraphQLString
      },
      resolve(parent, args) {
        void 0;
      }
    }
  }
});

const schema = new GraphQLSchema({ query: rootQuery });

exports.TaskType = TaskType;
exports.schema = schema;
