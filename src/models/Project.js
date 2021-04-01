const { Schema, model } = require('mongoose');

const ProjectSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = model('Project', ProjectSchema);
