const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const _ = require('lodash');
const Task = require('../models/task');
const Project = require('../models/project');


const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    project: {
      type: ProjectType,
      resolve: async (parent) => await Project.findById(parent.projectId).exec()
    },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async (parent) => await Task.find({ projectId: { $eq: parent.id }}).exec()
    },
    description: { type: GraphQLString }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const new_proj = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        await new_proj.save();
        return new_proj;
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args) => {
        const new_task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId
        });
        await new_task.save();
        return new_task;
      }
    }
  }
});

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (parent, args) => await Task.findById(args.id).exec()
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (parent, args) => await Project.findById(args.id).exec()
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async () => await Task.find({}).exec()
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async () => await Project.find({}).exec()
    }
  }
});

const schema = new GraphQLSchema({ query: rootQuery, mutation: Mutation });

exports.TaskType = TaskType;
exports.schema = schema;
exports.Mutation = Mutation;
