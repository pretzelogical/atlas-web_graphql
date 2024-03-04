const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');


const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: GraphQLString,
    title: GraphQLString,
    weight: GraphQLInt,
    description: GraphQLString
  }
});

module.exports = TaskType;
