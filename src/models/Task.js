const { Schema, model } = require('mongoose');

const TaskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true },
);

module.exports = model('Task', TaskSchema);
